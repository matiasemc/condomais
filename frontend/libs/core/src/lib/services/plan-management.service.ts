import { Injectable, inject } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';

export type ManagedPlan = 'free' | 'basic' | 'plus' | 'premium';
export type ManagedSubscriptionStatus = 'trial' | 'active' | 'suspended' | 'cancelled';

export interface ManagedTenantPlan {
  id: string;
  nome: string;
  plan: ManagedPlan;
  subscription_status: ManagedSubscriptionStatus;
  trial_ends_at: string | null;
  subscription_expires_at: string | null;
}

export interface ManagedFeature {
  code: string;
  descricao: string | null;
}

export interface ManagedPlanFeature {
  plano_nome: ManagedPlan;
  feature_code: string;
  enabled: boolean;
}

export interface PlanManagementSnapshot {
  tenants: ManagedTenantPlan[];
  features: ManagedFeature[];
  planFeatures: ManagedPlanFeature[];
}

@Injectable({ providedIn: 'root' })
export class PlanManagementService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  async loadSnapshot(): Promise<PlanManagementSnapshot> {
    const [tenantsRes, featuresRes, planFeaturesRes] = await Promise.all([
      this.supabase
        .from('condominios')
        .select('id,nome,plan,subscription_status,trial_ends_at,subscription_expires_at')
        .is('deleted_at', null)
        .order('nome'),
      this.supabase
        .from('features')
        .select('code,descricao')
        .eq('ativo', true)
        .order('code'),
      this.supabase
        .from('plano_features')
        .select('plano_nome,feature_code,enabled'),
    ]);

    if (tenantsRes.error) {
      throw new Error(tenantsRes.error.message);
    }

    if (featuresRes.error) {
      throw new Error(featuresRes.error.message);
    }

    if (planFeaturesRes.error) {
      throw new Error(planFeaturesRes.error.message);
    }

    return {
      tenants: (tenantsRes.data ?? []) as ManagedTenantPlan[],
      features: (featuresRes.data ?? []) as ManagedFeature[],
      planFeatures: (planFeaturesRes.data ?? []) as ManagedPlanFeature[],
    };
  }

  async setFeatureEnabled(plan: ManagedPlan, featureCode: string, enabled: boolean): Promise<void> {
    const { error } = await this.supabase
      .from('plano_features')
      .upsert({ plano_nome: plan, feature_code: featureCode, enabled });

    if (error) {
      throw new Error(error.message);
    }
  }

  async updatePlan(id: string, plan: ManagedPlan): Promise<void> {
    const { error } = await this.supabase
      .from('condominios')
      .update({ plan })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }

  async updateStatus(id: string, subscriptionStatus: ManagedSubscriptionStatus): Promise<void> {
    const { error } = await this.supabase
      .from('condominios')
      .update({ subscription_status: subscriptionStatus })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }
}

