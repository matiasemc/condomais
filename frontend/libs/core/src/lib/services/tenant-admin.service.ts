import { Injectable, inject } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';

export type TenantSubscriptionStatus = 'trial' | 'active' | 'suspended' | 'cancelled';
export type TenantPlan = 'basic' | 'plus' | 'premium';

export interface TenantAdminRow {
  id: string;
  nome: string;
  subdomain: string | null;
  email: string | null;
  plan: TenantPlan;
  subscription_status: TenantSubscriptionStatus;
  max_unidades: number;
  created_at: string;
}

export interface CreateTenantInput {
  nome: string;
  cnpj: string;
  subdomain: string | null;
  email: string | null;
  plan: TenantPlan;
  maxUnidades: number;
}

@Injectable({ providedIn: 'root' })
export class TenantAdminService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  async list(): Promise<TenantAdminRow[]> {
    const { data, error } = await this.supabase
      .from('condominios')
      .select('id,nome,subdomain,email,plan,subscription_status,max_unidades,created_at')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as TenantAdminRow[];
  }

  async create(input: CreateTenantInput): Promise<void> {
    const { error } = await this.supabase.from('condominios').insert({
      nome: input.nome,
      cnpj: input.cnpj,
      subdomain: input.subdomain,
      email: input.email,
      plan: input.plan,
      max_unidades: input.maxUnidades,
      subscription_status: 'trial',
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async updateStatus(id: string, subscriptionStatus: TenantSubscriptionStatus): Promise<void> {
    const { error } = await this.supabase
      .from('condominios')
      .update({ subscription_status: subscriptionStatus })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }

  async updatePlan(id: string, plan: TenantPlan): Promise<void> {
    const { error } = await this.supabase
      .from('condominios')
      .update({ plan })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }
}

