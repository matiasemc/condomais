import { Injectable, inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/client';
import { AuthState } from '../state/auth.state';
import type { Membership, Tenant } from '../models/index';

@Injectable({ providedIn: "root" })
export class MembershipService {
  private readonly supabase = inject(SUPABASE_CLIENT);
  private readonly state    = inject(AuthState);

  async load(userId: string): Promise<void> {
    const { data, error } = await this.supabase
      .from("user_condominios")
      .select("id, role, ativo, metadata, condominio:condominios(id, nome, slug, plano, ativo)")
      .eq("user_id", userId)
      .eq("ativo", true);

    if (error) {
      this.state.error.set(error.message);
      return;
    }

    const memberships: Membership[] = (data ?? []).map((row: any) => ({
      id: row.id,
      userId,
      tenant: row.condominio as Tenant,
      role: row.role,
      ativo: row.ativo,
      unidade: (row.metadata as any)?.unidade ?? undefined,
    }));

    this.state.memberships.set(memberships);
  }
}