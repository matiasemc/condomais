import { Injectable, inject } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';

export interface TenantUserRow {
  id: string;
  nome: string;
  email: string;
  role: string;
  unidade: string | null;
  ativo: boolean;
}

interface TenantUserMembershipRow {
  role: string;
  status?: string;
  metadata: { unidade?: string } | null;
  user: { id: string; nome: string; email: string } | { id: string; nome: string; email: string }[] | null;
}

@Injectable({ providedIn: 'root' })
export class AdminUserService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  async listForTenant(condominioId: string): Promise<TenantUserRow[]> {
    const { data, error } = await this.supabase
      .from('user_condominios')
      .select('role, status, metadata, user:users(id, nome, email)')
      .eq('condominio_id', condominioId)
      .eq('status', 'active')
      .order('role');

    if (error) {
      throw new Error(error.message);
    }

    return ((data ?? []) as TenantUserMembershipRow[])
      .map((row) => this.mapRow(row))
      .filter((row): row is TenantUserRow => row !== null);
  }

  private mapRow(row: TenantUserMembershipRow): TenantUserRow | null {
    const user = Array.isArray(row.user) ? row.user[0] : row.user;
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: row.role.toUpperCase(),
      unidade: row.metadata?.unidade ?? null,
      ativo: row.status === 'active',
    };
  }
}
