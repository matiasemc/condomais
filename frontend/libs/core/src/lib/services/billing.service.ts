import { Injectable, inject, signal, computed } from '@angular/core';
import { SUPABASE_CLIENT } from '../supabase/client';

export interface Plano {
  nome: string;
  label: string;
  price_monthly_brl: number;
  features: {
    entregas: boolean;
    ocorrencias: boolean;
    reservas: boolean;
    marketplace: boolean;
    max_unidades: number;
  };
}

export interface Subscription {
  id: string;
  condominio_id: string;
  plano_nome: string;
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'TRIALING';
  current_period_end: string | null;
  stripe_customer_id: string | null;
}

@Injectable({ providedIn: 'root' })
export class BillingService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  readonly subscription = signal<Subscription | null>(null);
  readonly planos       = signal<Plano[]>([]);
  readonly isLoading    = signal(false);

  // UX gating (derived from subscription signal — backend is authoritative)
  readonly planNome = computed(() => this.subscription()?.plano_nome ?? 'free');

  readonly isActive = computed(() => {
    const s = this.subscription()?.status;
    return s === 'ACTIVE' || s === 'TRIALING';
  });

  readonly isPastDue = computed(() => this.subscription()?.status === 'PAST_DUE');

  readonly canAccessOccurrences = computed(() =>
    this.isActive() && ['basic', 'plus', 'premium'].includes(this.planNome())
  );

  readonly canAccessReservations = computed(() =>
    this.isActive() && ['plus', 'premium'].includes(this.planNome())
  );

  readonly canAccessMarketplace = computed(() =>
    this.isActive() && this.planNome() === 'premium'
  );

  async loadForTenant(condominioId: string): Promise<void> {
    this.isLoading.set(true);
    const [subRes, planosRes] = await Promise.all([
      this.supabase
        .from('subscriptions')
        .select('id,condominio_id,plano_nome,status,current_period_end,stripe_customer_id')
        .eq('condominio_id', condominioId)
        .maybeSingle(),
      this.supabase
        .from('planos')
        .select('nome,label,price_monthly_brl,features')
        .order('price_monthly_brl'),
    ]);
    this.subscription.set((subRes.data as Subscription) ?? null);
    this.planos.set((planosRes.data ?? []) as Plano[]);
    this.isLoading.set(false);
  }

  async subscribeToPlan(condominioId: string, planName: string): Promise<{ url: string } | { error: string }> {
    const origin     = window.location.origin;
    const successUrl = `${origin}/billing?success=1`;
    const cancelUrl  = `${origin}/billing?canceled=1`;

    const { data, error } = await this.supabase.functions.invoke('create-checkout-session', {
      body: { planName, condominioId, successUrl, cancelUrl },
    });

    if (error) return { error: error.message };
    return { url: (data as any).url };
  }

  async getCurrentSubscription(condominioId: string): Promise<Subscription | null> {
    const { data } = await this.supabase
      .from('subscriptions')
      .select('id,condominio_id,plano_nome,status,current_period_end,stripe_customer_id')
      .eq('condominio_id', condominioId)
      .maybeSingle();
    const sub = (data as Subscription) ?? null;
    this.subscription.set(sub);
    return sub;
  }

  currentPlano(): Plano | undefined {
    return this.planos().find(p => p.nome === this.planNome());
  }
}
