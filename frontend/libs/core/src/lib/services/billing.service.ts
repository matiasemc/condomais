import { Injectable, inject, signal, computed } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';
import { AuthState } from '../state/auth.state';
import { FeatureService } from './feature.service';

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

const DEFAULT_PLANOS: Plano[] = [
  {
    nome: 'free',
    label: 'Gratis',
    price_monthly_brl: 0,
    features: {
      entregas: true,
      ocorrencias: false,
      reservas: false,
      marketplace: false,
      max_unidades: 20,
    },
  },
  {
    nome: 'basic',
    label: 'Basico',
    price_monthly_brl: 99.9,
    features: {
      entregas: true,
      ocorrencias: true,
      reservas: false,
      marketplace: false,
      max_unidades: 50,
    },
  },
  {
    nome: 'plus',
    label: 'Plus',
    price_monthly_brl: 199.9,
    features: {
      entregas: true,
      ocorrencias: true,
      reservas: true,
      marketplace: false,
      max_unidades: 200,
    },
  },
  {
    nome: 'premium',
    label: 'Premium',
    price_monthly_brl: 399.9,
    features: {
      entregas: true,
      ocorrencias: true,
      reservas: true,
      marketplace: true,
      max_unidades: 999999,
    },
  },
];

@Injectable({ providedIn: 'root' })
export class BillingService {
  private readonly supabase     = inject(SUPABASE_CLIENT);
  private readonly authState    = inject(AuthState);
  private readonly featureSvc   = inject(FeatureService);

  readonly subscription = signal<Subscription | null>(null);
  readonly planos       = signal<Plano[]>(DEFAULT_PLANOS);
  readonly isLoading    = signal(false);

  // The app shell only needs UX gating, so it uses the tenant plan already loaded from condominios.
  readonly planNome = computed(() => this.subscription()?.plano_nome ?? 'free');

  readonly isActive = computed(() => {
    const s = this.subscription()?.status;
    return s === 'ACTIVE' || s === 'TRIALING';
  });

  readonly isPastDue = computed(() => this.subscription()?.status === 'PAST_DUE');

  readonly canAccessOccurrences = computed(() =>
    this.isActive() && this.featureSvc.hasFeature('ocorrencias')
  );

  readonly canAccessReservations = computed(() =>
    this.isActive() && this.featureSvc.hasFeature('reservas')
  );

  readonly canAccessMarketplace = computed(() =>
    this.isActive() && this.featureSvc.hasFeature('marketplace')
  );

  async loadForTenant(condominioId: string): Promise<void> {
    this.isLoading.set(true);

    try {
      this.planos.set(DEFAULT_PLANOS);
      this.subscription.set(this.subscriptionFromCurrentTenant(condominioId));
    } finally {
      this.isLoading.set(false);
    }
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
    const sub = this.subscriptionFromCurrentTenant(condominioId);
    this.subscription.set(sub);
    return sub;
  }

  currentPlano(): Plano | undefined {
    return this.planos().find(p => p.nome === this.planNome());
  }

  private subscriptionFromCurrentTenant(condominioId: string): Subscription | null {
    const tenant = this.authState.currentTenant();
    if (!tenant || tenant.id !== condominioId) return null;

    return {
      id: `tenant-plan:${condominioId}`,
      condominio_id: condominioId,
      plano_nome: tenant.plano,
      status: tenant.ativo ? 'TRIALING' : 'CANCELED',
      current_period_end: null,
      stripe_customer_id: null,
    };
  }
}
