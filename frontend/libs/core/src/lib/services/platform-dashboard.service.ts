import { Injectable, inject } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';

export interface PlatformStats {
  total_tenants: number;
  tenants_trial: number;
  tenants_active: number;
  tenants_suspended: number;
  total_users: number;
  total_deliveries: number;
  pending_deliveries: number;
  total_occurrences: number;
  total_reservations: number;
}

export interface RecentTenant {
  id: string;
  nome: string;
  subscription_status: string;
  plan: string;
  created_at: string;
}

export interface PlatformDashboard {
  stats: PlatformStats | null;
  recentTenants: RecentTenant[];
}

@Injectable({ providedIn: 'root' })
export class PlatformDashboardService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  async getDashboard(): Promise<PlatformDashboard> {
    const [statsRes, tenantsRes] = await Promise.all([
      this.supabase.rpc('get_platform_stats').maybeSingle(),
      this.supabase
        .from('condominios')
        .select('id,nome,subscription_status,plan,created_at')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(8),
    ]);

    if (statsRes.error) {
      throw new Error(statsRes.error.message);
    }

    if (tenantsRes.error) {
      throw new Error(tenantsRes.error.message);
    }

    return {
      stats: statsRes.data as PlatformStats,
      recentTenants: (tenantsRes.data ?? []) as RecentTenant[],
    };
  }
}
