import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14?target=deno';

function mapStatus(s: string): string {
  switch (s) {
    case 'active':   return 'ACTIVE';
    case 'trialing': return 'TRIALING';
    case 'past_due': return 'PAST_DUE';
    default:         return 'CANCELED';
  }
}

function mapCondominiosStatus(s: string): string {
  switch (s) {
    case 'active':   return 'active';
    case 'trialing': return 'trial';
    default:         return 'suspended';
  }
}

Deno.serve(async (req: Request) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) return new Response('Missing signature', { status: 400 });

  const body          = await req.text();
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  if (!webhookSecret) return new Response('Webhook secret not configured', { status: 500 });

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-06-20' });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }

  // Service role: bypasses RLS — required for webhook server-side writes
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  try {
    switch (event.type) {
      // ── Checkout completed → activate subscription ──────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== 'subscription') break;

        const condominioId = session.metadata?.condominio_id;
        const planName     = session.metadata?.plano_nome;
        const subId        = session.subscription as string;
        const customerId   = session.customer as string;
        if (!condominioId || !planName) break;

        const stripeSub = await stripe.subscriptions.retrieve(subId);

        await supabase.from('subscriptions').upsert({
          condominio_id:          condominioId,
          stripe_customer_id:     customerId,
          stripe_subscription_id: subId,
          plano_nome:             planName,
          status:                 mapStatus(stripeSub.status),
          current_period_end:     new Date(stripeSub.current_period_end * 1000).toISOString(),
          updated_at:             new Date().toISOString(),
        }, { onConflict: 'condominio_id' });

        await supabase.from('condominios').update({
          plan: planName, subscription_status: 'active', subscription_id: subId,
        }).eq('id', condominioId);
        break;
      }

      // ── Successful payment → renew / keep active ─────────────────
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const subId   = invoice.subscription as string;
        if (!subId) break;

        const stripeSub    = await stripe.subscriptions.retrieve(subId);
        const condominioId = stripeSub.metadata?.condominio_id;
        const planName     = stripeSub.metadata?.plano_nome;
        if (!condominioId) break;

        await supabase.from('subscriptions').update({
          status:             'ACTIVE',
          ...(planName ? { plano_nome: planName } : {}),
          current_period_end: new Date(stripeSub.current_period_end * 1000).toISOString(),
          updated_at:         new Date().toISOString(),
        }).eq('stripe_subscription_id', subId);

        await supabase.from('condominios').update({
          subscription_status: 'active',
          ...(planName ? { plan: planName } : {}),
        }).eq('id', condominioId);
        break;
      }

      // ── Failed payment → past_due (grace period, Stripe retries) ─
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subId   = invoice.subscription as string;
        if (!subId) break;

        const stripeSub    = await stripe.subscriptions.retrieve(subId);
        const condominioId = stripeSub.metadata?.condominio_id;
        if (!condominioId) break;

        await supabase.from('subscriptions').update({
          status: 'PAST_DUE', updated_at: new Date().toISOString(),
        }).eq('stripe_subscription_id', subId);
        // Keep condominios.subscription_status 'active' during grace period
        break;
      }

      // ── Plan change / status change (upgrade / downgrade) ────────
      case 'customer.subscription.updated': {
        const stripeSub    = event.data.object as Stripe.Subscription;
        const condominioId = stripeSub.metadata?.condominio_id;
        const planName     = stripeSub.metadata?.plano_nome;
        if (!condominioId) break;

        await supabase.from('subscriptions').update({
          status:             mapStatus(stripeSub.status),
          ...(planName ? { plano_nome: planName } : {}),
          current_period_end: new Date(stripeSub.current_period_end * 1000).toISOString(),
          updated_at:         new Date().toISOString(),
        }).eq('stripe_subscription_id', stripeSub.id);

        await supabase.from('condominios').update({
          subscription_status: mapCondominiosStatus(stripeSub.status),
          ...(planName ? { plan: planName } : {}),
        }).eq('id', condominioId);
        break;
      }

      // ── Subscription deleted → downgrade to free + suspend ───────
      case 'customer.subscription.deleted': {
        const stripeSub    = event.data.object as Stripe.Subscription;
        const condominioId = stripeSub.metadata?.condominio_id;
        if (!condominioId) break;

        await supabase.from('subscriptions').update({
          status: 'CANCELED', updated_at: new Date().toISOString(),
        }).eq('stripe_subscription_id', stripeSub.id);

        await supabase.from('condominios').update({
          plan: 'free', subscription_status: 'suspended',
        }).eq('id', condominioId);
        break;
      }

      default:
        console.log(`Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error(`Error processing ${event.type}:`, err);
    return new Response('Processing error', { status: 500 }); // 500 = Stripe retries
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
