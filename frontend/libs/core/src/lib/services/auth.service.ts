import { Injectable, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/client';
import { AuthState } from '../state/auth.state';
import { MembershipService } from './membership.service';
import { TenantService } from './tenant.service';

@Injectable({ providedIn: "root" })
export class AuthService implements OnDestroy {
  private readonly supabase = inject(SUPABASE_CLIENT);
  private readonly state    = inject(AuthState);
  private readonly memberships = inject(MembershipService);
  private readonly tenants  = inject(TenantService);
  private readonly router   = inject(Router);
  private authSub: { unsubscribe(): void } | null = null;

  init(): void {
    // Restore session on bootstrap
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        this.state.user.set(session.user);
        this.memberships.load(session.user.id).then(() => {
          this.tenants.restoreFromStorage();
        });
      }
    });
    // Subscribe to auth changes
    const { data } = this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        this.state.user.set(session.user);
      } else if (event === "SIGNED_OUT") {
        this.state.user.set(null);
        this.state.memberships.set([]);
        this.tenants.clear();
      } else if (event === "TOKEN_REFRESHED" && session?.user) {
        this.state.user.set(session.user);
      }
    });
    this.authSub = data.subscription;
  }

  async login(email: string, password: string): Promise<void> {
    this.state.isLoading.set(true);
    this.state.error.set(null);
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error("No user returned");

      this.state.user.set(data.user);
      await this.memberships.load(data.user.id);

      const active = this.state.activeMemberships();
      if (active.length === 0) {
        this.state.error.set("no_tenant");
        await this.supabase.auth.signOut();
        this.state.user.set(null);
        return;
      }
      if (active.length === 1) {
        this.tenants.set(active[0].tenant);
        this.router.navigate(["/home"]);
      } else {
        this.router.navigate(["/tenant-select"]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      this.state.error.set(msg);
    } finally {
      this.state.isLoading.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    this.tenants.clear();
    this.state.user.set(null);
    this.state.memberships.set([]);
    this.router.navigate(["/login"]);
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}