import { Injectable, inject } from '@angular/core';
import type { Session, User } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/client';
import { AuthState } from '../state/auth.state';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase = inject(SUPABASE_CLIENT);
  private readonly state = inject(AuthState);
  private readonly sessions = inject(SessionService);

  async init(): Promise<void> {
    await this.sessions.initialize();
  }

  async loginWithGoogle(): Promise<void> {
    this.state.isLoading.set(true);
    this.state.error.set(null);

    try {
      const { error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      this.state.error.set(error instanceof Error ? error.message : 'Não foi possível iniciar o login com Google.');
      this.state.isLoading.set(false);
    }
  }

  async login(email: string, password: string): Promise<void> {
    this.state.isLoading.set(true);
    this.state.error.set(null);

    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      await this.sessions.syncSession(data.session, { redirect: true, force: true });
    } catch (error) {
      this.state.error.set(error instanceof Error ? error.message : 'Não foi possível fazer login.');
    } finally {
      this.state.isLoading.set(false);
    }
  }

  async getSession(): Promise<Session | null> {
    const { data, error } = await this.supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  }

  async getUser(): Promise<User | null> {
    const { data, error } = await this.supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return data.user;
  }

  async logout(): Promise<void> {
    this.state.isLoading.set(true);

    try {
      await this.supabase.auth.signOut();
      this.sessions.clearState();
    } finally {
      this.state.isLoading.set(false);
    }
  }
}
