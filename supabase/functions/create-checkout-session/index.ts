import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14?target=deno';

function getPriceId(plan: string): string | null {
  const map: Record<string, string | undefined> = {
    basic:   Deno.env.get('STRIPE_PRICE_BASIC'),
    plus:    Deno.env.get('STRIPE_PRICE_PLUS'),
    premium: Deno.env.get('STRIPE_PRICE_PREMIUM'),
  };
  return map[plan] ?? null;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const jwt = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!jwt) return json({ error: 'Unauthorized' }, 401);

    // Service role for server-side DB operations
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Validate JWT — never trust frontend for identity
    const { data: { user }, error: authErr } = await supabase.auth.getUser(jwt);
    if (authErr || !user) return json({ error: 'Unauthorized' }, 401);

    const { planName, condominioId, successUrl, cancelUrl } = await req.json();

    if (!['basic', 'plus', 'premium'].includes(planName)) {
      return json({ error: 'Invalid plan' }, 400);
    }
    if (!condominioId || !successUrl || !cancelUrl) {
      return json({ error: 'Missing required fields' }, 400);
    }

    // Backend authorization — user must be sindico/conselho/master_admin of this tenant
    const { data: membership } = await supabase
      .from('user_condominios')
      .select('role')
      .eq('user_id', user.id)
      .eq('condominio_id', condominioId)
      .in('role', ['sindico', 'conselho', 'master_admin'])
      .eq('status', 'active')
      .maybeSingle();

    if (!membership) return json({ error: 'Forbidden' }, 403);

    const { data: tenant } = await supabase
      .from('condominios')
      .select('nome, email')
      .eq('id', condominioId)
      .single();

    if (!tenant) return json({ error: 'Tenant not found' }, 404);

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('condominio_id', condominioId)
      .maybeSingle();

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2024-06-20',
    });

    // Get or create Stripe customer (idempotent)
    let customerId = subscription?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        name:     tenant.nome,
        email:    tenant.email ?? undefined,
        metadata: { condominio_id: condominioId },
      });
      customerId = customer.id;

      await supabase.from('subscriptions').upsert(
        { condominio_id: condominioId, stripe_customer_id: customerId, plano_nome: 'free', status: 'TRIALING' },
        { onConflict: 'condominio_id' },
      );
    }

    const priceId = getPriceId(planName);
    if (!priceId) return json({ error: 'Price not configured' }, 500);

    const session = await stripe.checkout.sessions.create({
      customer:    customerId,
      mode:        'subscription',
      line_items:  [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url:  cancelUrl,
      metadata:    { condominio_id: condominioId, plano_nome: planName },
      subscription_data: {
        metadata: { condominio_id: condominioId, plano_nome: planName },
      },
    });

    return json({ url: session.url });
  } catch (err) {
    console.error('create-checkout-session:', err);
    return json({ error: 'Internal server error' }, 500);
  }
});

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
