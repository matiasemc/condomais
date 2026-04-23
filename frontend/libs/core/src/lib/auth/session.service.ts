import { Injectable, InjectionToken, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/client';
import { AuthState } from '../state/auth.state';
import { MembershipService } from '../services/membership.service';
import { TenantService } from '../services/tenant.service';
import type { AppKey, Membership, UserProfile, UserRole } from '../models';

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

@Injectable({ providedIn: 'root' })
export class SessionService implements OnDestroy {
  private readonly supabase = inject(SUPABASE_CLIENT);
  private readonly state = inject(AuthState);
  private readonly memberships = inject(MembershipService);
  private readonly tenants = inject(TenantService);
  private readonly router = inject(Router);
  private readonly appKey = inject(AUTH_APP_KEY);

  private authSub: { unsubscribe(): void } | null = null;
  private lastSessionToken: string | null = null;

  async initialize(): Promise<void> {
    this.state.isReady.set(false);

    try {
      const { data: { session } } = await this.supabase.auth.getSession();
      await this.syncSession(session, { redirect: false, force: true });
    } catch (error) {
      this.clearState();
      this.state.error.set(error instanceof Error ? error.message : 'Não foi possível restaurar a sessão.');
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
      this.state.error.set('Seu usuário não possui condomínio vinculado.');
      await this.supabase.auth.signOut();
      this.clearState();
      await this.router.navigate(['/login']);
      return;
    }

    const targetApp = this.resolveTargetApp();
    if (!targetApp) {
      return;
    }

    if (targetApp !== 'master-admin' && !this.state.currentTenant()) {
      const membership = this.pickDefaultMembership(memberships);
      if (membership) {
        this.tenants.set(membership.tenant);
      }
    }

    if (targetApp === this.appKey) {
      const defaultRoute = APP_DEFAULT_ROUTE[targetApp];
      const currentPath = window.location.pathname || '/';
      const routerPath = (this.router.url || currentPath).split('?')[0];
      const isAuthEntry =
        currentPath === '/' ||
        currentPath === '/login' ||
        currentPath === '/tenant-select' ||
        routerPath === '/' ||
        routerPath === '/login' ||
        routerPath === '/tenant-select';

      if (isAuthEntry) {
        await this.router.navigateByUrl(defaultRoute);
      }

      return;
    }

    window.location.href = APP_EXTERNAL_ROUTE[targetApp];
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
      this.state.error.set(error instanceof Error ? error.message : 'Não foi possível atualizar a sessão.');
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
      name: data?.nome ?? user.user_metadata?.['name'] ?? user.email ?? 'Usuário',
      isMasterAdmin: data?.is_master_admin ?? false,
    };
  }

  private restoreOrSelectTenant(): void {
    this.tenants.restoreFromStorage();

    if (this.state.currentTenant()) {
      return;
    }

    const membership = this.pickDefaultMembership(this.state.activeMemberships());
    if (membership) {
      this.tenants.set(membership.tenant);
    }
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
}
