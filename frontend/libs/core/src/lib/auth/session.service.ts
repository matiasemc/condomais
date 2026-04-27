import { Injectable, InjectionToken, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../services/supabase-client.service';
import { AuthState } from '../state/auth.state';
import { MembershipService } from '../services/membership.service';
import { TenantService } from '../services/tenant.service';
import { ContextService } from '../services/context.service';
import type { AppKey, Membership, UserProfile, UserRole } from '../interfaces/index.model';

export const AUTH_APP_KEY = new InjectionToken<AppKey>('AUTH_APP_KEY');

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

const APP_DEV_PORT: Record<AppKey, string> = {
  morador: '4200',
  porteiro: '4201',
  admin: '4202',
  'master-admin': '4203',
};

@Injectable({ providedIn: 'root' })
export class SessionService implements OnDestroy {
  private readonly supabase = inject(SUPABASE_CLIENT);
  private readonly state = inject(AuthState);
  private readonly memberships = inject(MembershipService);
  private readonly tenants = inject(TenantService);
  private readonly ctxSvc = inject(ContextService);
  private readonly router = inject(Router);
  private readonly appKey = inject(AUTH_APP_KEY);

  private authSub: { unsubscribe(): void } | null = null;
  private lastSessionToken: string | null = null;

  async initialize(): Promise<void> {
    this.state.isReady.set(false);

    try {
      const { data: { session } } = await this.supabase.auth.getSession();
      await this.syncSession(session, { redirect: true, force: true });
    } catch (error) {
      this.clearState();
      this.state.error.set(error instanceof Error ? error.message : 'NÃ£o foi possÃ­vel restaurar a sessÃ£o.');
    } finally {
      this.state.isReady.set(true);
    }

    const { data } = this.supabase.auth.onAuthStateChange((event, session) => {
      void this.handleAuthStateChange(event, session);
    });

    this.authSub = data.subscription;
  }

  async syncSession(
    session: Session | null,
    options: { redirect: boolean; force?: boolean } = { redirect: false },
  ): Promise<void> {
    const token = session?.access_token ?? null;

    if (!options.force && token && token === this.lastSessionToken) {
      if (options.redirect) {
        await this.redirectForResolvedRole();
      }
      return;
    }

    if (!session?.user) {
      this.lastSessionToken = null;
      this.clearState();
      return;
    }

    this.state.user.set(session.user);
    this.lastSessionToken = token;

    const profile = await this.loadProfile(session.user);
    this.state.profile.set(profile);

    await this.memberships.load(session.user.id);
    this.restoreOrSelectTenant();

    if (options.redirect) {
      await this.redirectForResolvedRole();
    }
  }

  clearState(): void {
    this.state.user.set(null);
    this.state.profile.set(null);
    this.state.memberships.set([]);
    this.state.error.set(null);
    this.tenants.clear();
    this.ctxSvc.clearContext();
  }

  resolveTargetApp(): AppKey | null {
    const profile = this.state.profile();
    if (profile?.isMasterAdmin) {
      return 'master-admin';
    }

    const memberships = this.state.activeMemberships();
    if (!memberships.length) {
      return null;
    }

    const currentAppMembership = memberships.find((membership) =>
      this.roleIsAllowedInApp(membership.role, this.appKey)
    );
    if (currentAppMembership) {
      return this.appKey;
    }

    const currentRole = this.state.currentRole();
    if (currentRole) {
      const currentApp = this.roleToApp(currentRole);
      if (currentApp) {
        return currentApp;
      }
    }

    for (const role of ['ADMIN', 'SINDICO', 'CONSELHO', 'PORTEIRO', 'MORADOR'] satisfies UserRole[]) {
      const match = memberships.find((membership) => membership.role === role);
      if (match) {
        return this.roleToApp(role);
      }
    }

    return null;
  }

  async redirectForResolvedRole(): Promise<void> {
    const profile = this.state.profile();
    const memberships = this.state.activeMemberships();

    if (!profile) {
      return;
    }

    if (!profile.isMasterAdmin && !memberships.length) {
      this.state.error.set('Seu usuÃ¡rio nÃ£o possui condomÃ­nio vinculado.');
      await this.supabase.auth.signOut();
      this.clearState();
      await this.router.navigate(['/login']);
      return;
    }

    // Check stored context first â€” user's explicit choice wins
    const storedCtx = this.ctxSvc.restoreFromStorage();
    if (storedCtx) {
      this.navigateToApp(storedCtx.platform);
      return;
    }

    // Multiple options â†’ let user choose
    if (this.ctxSvc.needsContextSelection()) {
      const currentPath = (this.router.url || window.location.pathname).split('?')[0];
      if (currentPath !== '/select-context') {
        await this.router.navigate(['/select-context']);
      }
      return;
    }

    // Single option â†’ auto-select
    const autoCtx = this.ctxSvc.autoSelectContext();
    if (autoCtx) {
      this.ctxSvc.setContext(autoCtx);
      this.ctxSvc.applyContext(autoCtx);
      this.navigateToApp(autoCtx.platform);
      return;
    }
  }

  navigateToApp(targetApp: AppKey): void {
    if (targetApp === this.appKey) {
      const defaultRoute = APP_DEFAULT_ROUTE[targetApp];
      const currentPath = window.location.pathname || '/';
      const routerPath = (this.router.url || currentPath).split('?')[0];
      const isAuthEntry =
        currentPath === '/' ||
        currentPath === '/login' ||
        currentPath === '/select-context' ||
        currentPath === '/tenant-select' ||
        routerPath === '/' ||
        routerPath === '/login' ||
        routerPath === '/select-context' ||
        routerPath === '/tenant-select';

      if (isAuthEntry) {
        void this.router.navigateByUrl(defaultRoute);
      }
      return;
    }

  // Only cross-app redirect from auth/entry pages â€” never interrupt active use
  const crossPath = window.location.pathname || '/';
  const crossRouter = (this.router.url || crossPath).split('?')[0];
  const crossIsAuthEntry =
    crossPath === '/' || crossPath === '/login' ||
    crossPath === '/select-context' || crossPath === '/tenant-select' ||
    crossRouter === '/' || crossRouter === '/login' ||
    crossRouter === '/select-context' || crossRouter === '/tenant-select';

  if (crossIsAuthEntry) {
    window.location.href = this.resolveAppUrl(targetApp);
  }
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  private async handleAuthStateChange(event: AuthChangeEvent, session: Session | null): Promise<void> {
    try {
      if (event === 'SIGNED_OUT') {
        this.lastSessionToken = null;
        this.clearState();

        if (this.router.url !== '/login') {
          await this.router.navigate(['/login']);
        }

        return;
      }

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        await this.syncSession(session, { redirect: true });
      }
    } catch (error) {
      this.clearState();
      this.state.error.set(error instanceof Error ? error.message : 'NÃ£o foi possÃ­vel atualizar a sessÃ£o.');
    }
  }

  private async loadProfile(user: User): Promise<UserProfile> {
    const { data, error } = await this.supabase
      .from('users')
      .select('id,email,nome,is_master_admin')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: user.id,
      email: data?.email ?? user.email ?? '',
      name: data?.nome ?? user.user_metadata?.['name'] ?? user.email ?? 'UsuÃ¡rio',
      isMasterAdmin: data?.is_master_admin ?? false,
    };
  }

  private restoreOrSelectTenant(): void {
    // Try to restore full context (platform + tenant) first
    const ctx = this.ctxSvc.restoreFromStorage();
    if (ctx) return;

    // Fall back to tenant-only restore for backward compat
    this.tenants.restoreFromStorage();
  }

  private pickDefaultMembership(memberships: Membership[]): Membership | null {
    const currentTenant = this.state.currentTenant();
    if (currentTenant) {
      const currentMembership = memberships.find((membership) => membership.tenant.id === currentTenant.id);
      if (currentMembership) {
        return currentMembership;
      }
    }

    const priority: UserRole[] = ['ADMIN', 'SINDICO', 'CONSELHO', 'PORTEIRO', 'MORADOR'];

    for (const role of priority) {
      const match = memberships.find((membership) => membership.role === role);
      if (match) {
        return match;
      }
    }

    return memberships[0] ?? null;
  }

  private roleIsAllowedInApp(role: UserRole, app: AppKey): boolean {
    const allowedRolesByApp: Record<AppKey, UserRole[]> = {
      morador: ['MORADOR', 'SINDICO', 'CONSELHO'],
      porteiro: ['PORTEIRO'],
      admin: ['ADMIN', 'SINDICO', 'CONSELHO'],
      'master-admin': ['MASTER_ADMIN'],
    };

    return allowedRolesByApp[app].includes(role);
  }

  private roleToApp(role: UserRole): AppKey | null {
    if (role === 'ADMIN' || role === 'SINDICO' || role === 'CONSELHO') {
      return 'admin';
    }

    if (role === 'PORTEIRO') {
      return 'porteiro';
    }

    if (role === 'MORADOR') {
      return 'morador';
    }

    if (role === 'MASTER_ADMIN') {
      return 'master-admin';
    }

    return null;
  }

  private resolveAppUrl(targetApp: AppKey): string {
    const { protocol, hostname, port } = window.location;
    const targetPort = APP_DEV_PORT[targetApp];

    // In local development each Angular app runs on its own port.
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      if (targetPort && port !== targetPort) {
        return `${protocol}//${hostname}:${targetPort}`;
      }

      return `${protocol}//${hostname}${targetPort ? `:${targetPort}` : ''}`;
    }

    return APP_EXTERNAL_ROUTE[targetApp];
  }
}
