import { Injectable, signal, computed } from '@angular/core';
import type { User } from '@supabase/supabase-js';
import type { Membership, Tenant, UserRole } from '../models/index';

@Injectable({ providedIn: "root" })
export class AuthState {
  readonly user           = signal<User | null>(null);
  readonly memberships    = signal<Membership[]>([]);
  readonly currentTenant  = signal<Tenant | null>(null);
  readonly isLoading      = signal(false);
  readonly error          = signal<string | null>(null);

  readonly currentRole = computed<UserRole | null>(() => {
    const tenant = this.currentTenant();
    if (!tenant) return null;
    return this.memberships().find(m => m.tenant.id === tenant.id && m.ativo)?.role ?? null;
  });

  readonly isAuthenticated  = computed(() => this.user() !== null);
  readonly activeMemberships = computed(() => this.memberships().filter(m => m.ativo));
  readonly hasMultipleTenants = computed(() => this.activeMemberships().length > 1);
}