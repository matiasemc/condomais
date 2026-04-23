import { Injectable, inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/client';
import { AuthState } from '../state/auth.state';
import type { Membership, Tenant, UserRole } from '../models/index';

@Injectable({ providedIn: "root" })
export class MembershipService {
  private readonly supabase = inject(SUPABASE_CLIENT);
  private readonly state    = inject(AuthState);

  async load(userId: string): Promise<void> {
    const { data, error } = await this.supabase
      .from("user_condominios")
      .select("user_id, condominio_id, role, status, metadata, condominio:condominios(id, nome, slug, plano, ativo)")
      .eq("user_id", userId)
      .eq("status", "active");

    if (error) {
      this.state.error.set(error.message);
      return;
    }

    const memberships: Membership[] = (data ?? []).map((row: any) => ({
      id: `${row.user_id}:${row.condominio_id}`,
      userId,
      tenant: row.condominio as Tenant,
      role: this.toUserRole(row.role),
      ativo: row.status === 'active',
      unidade: (row.metadata as any)?.unidade ?? undefined,
    }));

    this.state.memberships.set(memberships);
  }

  private toUserRole(role: string): UserRole {
    const normalized = role.toUpperCase();

    if (normalized === 'MASTER_ADMIN') {
      return 'MASTER_ADMIN';
    }

    if (normalized === 'ADMIN') {
      return 'ADMIN';
    }

    if (normalized === 'MORADOR' || normalized === 'PORTEIRO' || normalized === 'SINDICO' || normalized === 'CONSELHO') {
      return normalized;
    }

    const dbRoleMap: Record<string, UserRole> = {
      morador: 'MORADOR',
      porteiro: 'PORTEIRO',
      sindico: 'SINDICO',
      conselho: 'CONSELHO',
      admin: 'ADMIN',
    };

    return dbRoleMap[role] ?? 'MORADOR';
  }
}
