import { Injectable, inject } from '@angular/core';
import { AuthState } from '../state/auth.state';
import { TenantService } from './tenant.service';
import type { AppKey, Tenant, UserRole } from '../interfaces/index.model';

const CONTEXT_KEY = 'cm_context';

export interface AppContext {
  platform: AppKey;
  condominioId: string | null;
}

export const PLATFORM_LABELS: Record<AppKey, string> = {
  morador: 'Morador',
  porteiro: 'Porteiro',
  admin: 'Admin',
  'master-admin': 'Master Admin',
};

const APP_DEV_PORT: Record<AppKey, string> = {
  morador: '4200',
  porteiro: '4201',
  admin: '4202',
  'master-admin': '4203',
};

const APP_DEFAULT_ROUTE: Record<AppKey, string> = {
  morador: '/home',
  porteiro: '/home',
  admin: '/dashboard',
  'master-admin': '/dashboard',
};

const APP_EXTERNAL_ROUTE: Record<AppKey, string> = {
  morador: '/morador',
  porteiro: '/porteiro',
  admin: '/admin',
  'master-admin': '/master-admin',
};

export const PLATFORM_ALLOWED_ROLES: Record<AppKey, UserRole[]> = {
  morador: ['MORADOR', 'SINDICO', 'CONSELHO', 'ADMIN'],
  porteiro: ['PORTEIRO', 'SINDICO'],
  admin: ['ADMIN', 'SINDICO', 'CONSELHO'],
  'master-admin': [],
};

const ROLE_PLATFORMS: Record<UserRole, AppKey[]> = {
  MORADOR: ['morador'],
  PORTEIRO: ['porteiro'],
  SINDICO: ['admin', 'morador', 'porteiro'],
  CONSELHO: ['admin', 'morador'],
  ADMIN: ['admin', 'morador'],
  MASTER_ADMIN: ['master-admin'],
};

@Injectable({ providedIn: 'root' })
export class ContextService {
  private readonly state = inject(AuthState);
  private readonly tenants = inject(TenantService);

  setContext(ctx: AppContext): void {
    localStorage.setItem(CONTEXT_KEY, JSON.stringify(ctx));
  }

  getContext(): AppContext | null {
    try {
      const raw = localStorage.getItem(CONTEXT_KEY);
      return raw ? (JSON.parse(raw) as AppContext) : null;
    } catch {
      return null;
    }
  }

  clearContext(): void {
    localStorage.removeItem(CONTEXT_KEY);
  }

  isContextValid(ctx: AppContext): boolean {
    if (ctx.platform === 'master-admin') return this.state.isMasterAdmin();
    if (this.state.isMasterAdmin() && ctx.condominioId) return true;
    if (!ctx.condominioId) return false;
    const allowed = PLATFORM_ALLOWED_ROLES[ctx.platform];
    return this.state.activeMemberships().some(
      m => m.tenant.id === ctx.condominioId && allowed.includes(m.role) && m.ativo,
    );
  }

  applyContext(ctx: AppContext): void {
    if (ctx.platform === 'master-admin' || !ctx.condominioId) return;
    const membership = this.state.activeMemberships().find(m => m.tenant.id === ctx.condominioId);
    if (membership) this.tenants.set(membership.tenant);
  }

  restoreFromStorage(): AppContext | null {
    const ctx = this.getContext();
    if (!ctx) return null;
    if (!this.isContextValid(ctx)) {
      this.clearContext();
      return null;
    }
    this.applyContext(ctx);
    return ctx;
  }

  getAvailablePlatforms(): AppKey[] {
    const platforms = new Set<AppKey>();
    if (this.state.isMasterAdmin()) platforms.add('master-admin');
    for (const m of this.state.activeMemberships()) {
      for (const p of ROLE_PLATFORMS[m.role] ?? []) {
        platforms.add(p);
      }
    }
    return Array.from(platforms);
  }

  getTenantsForPlatform(platform: AppKey): Tenant[] {
    if (platform === 'master-admin') return [];
    const allowed = PLATFORM_ALLOWED_ROLES[platform];
    const seen = new Set<string>();
    return this.state
      .activeMemberships()
      .filter(m => allowed.includes(m.role) && !seen.has(m.tenant.id) && !!seen.add(m.tenant.id))
      .map(m => m.tenant);
  }

  needsContextSelection(): boolean {
    const ctx = this.getContext();
    if (ctx && this.isContextValid(ctx)) return false;

    const platforms = this.getAvailablePlatforms();
    if (platforms.length === 0) return false;
    if (platforms.length > 1) return true;

    const solo = platforms[0];
    if (solo === 'master-admin') return false;
    return this.getTenantsForPlatform(solo).length > 1;
  }

  autoSelectContext(): AppContext | null {
    const platforms = this.getAvailablePlatforms();
    if (platforms.length !== 1) return null;

    const platform = platforms[0];
    if (platform === 'master-admin') return { platform, condominioId: null };

    const tenants = this.getTenantsForPlatform(platform);
    if (tenants.length !== 1) return null;

    return { platform, condominioId: tenants[0].id };
  }

  resolveAppUrl(targetApp: AppKey): string {
    const { protocol, hostname, port } = window.location;
    const targetPort = APP_DEV_PORT[targetApp];

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      if (targetPort && port !== targetPort) {
        return `${protocol}//${hostname}:${targetPort}`;
      }
      return `${protocol}//${hostname}${targetPort ? `:${targetPort}` : ''}`;
    }

    return APP_EXTERNAL_ROUTE[targetApp];
  }

  getDefaultRoute(appKey: AppKey): string {
    return APP_DEFAULT_ROUTE[appKey];
  }
}
