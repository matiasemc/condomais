import { Injectable, inject } from '@angular/core';
import { AuthState } from '../state/auth.state';
import type { Tenant } from '../interfaces/index.model';

const TENANT_STORAGE_KEY = "cm_current_tenant";

@Injectable({ providedIn: "root" })
export class TenantService {
  private readonly state = inject(AuthState);

  set(tenant: Tenant): void {
    this.state.currentTenant.set(tenant);
    localStorage.setItem(TENANT_STORAGE_KEY, JSON.stringify(tenant));
  }

  clear(): void {
    this.state.currentTenant.set(null);
    localStorage.removeItem(TENANT_STORAGE_KEY);
  }

  restoreFromStorage(): void {
    try {
      const raw = localStorage.getItem(TENANT_STORAGE_KEY);
      if (!raw) return;
      const tenant = JSON.parse(raw) as Tenant;
      // Validate tenant is still in user memberships
      const valid = this.state.memberships().some(m => m.tenant.id === tenant.id && m.ativo);
      if (valid) this.state.currentTenant.set(tenant);
      else this.clear();
    } catch {
      this.clear();
    }
  }

  switchTo(tenant: Tenant): void {
    this.set(tenant);
  }
}