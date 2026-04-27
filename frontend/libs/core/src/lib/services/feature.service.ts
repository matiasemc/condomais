import { Injectable, inject, signal, effect } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';
import { AuthState } from '../state/auth.state';

export type FeatureCode =
  | 'entregas'
  | 'ocorrencias'
  | 'reservas'
  | 'marketplace'
  | 'relatorios'
  | 'integracao-google';

// Fallback when DB is unreachable â€” mirrors plano_features seed data
const FALLBACK: Record<string, FeatureCode[]> = {
  free:    ['entregas'],
  basic:   ['entregas', 'ocorrencias'],
  plus:    ['entregas', 'ocorrencias', 'reservas', 'integracao-google'],
  premium: ['entregas', 'ocorrencias', 'reservas', 'marketplace', 'relatorios', 'integracao-google'],
};

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly supabase   = inject(SUPABASE_CLIENT);
  private readonly authState  = inject(AuthState);

  private readonly _enabled = signal<Set<string>>(new Set(FALLBACK['free']));
  readonly isLoading        = signal(false);

  constructor() {
    effect(() => {
      const plano = this.authState.currentTenant()?.plano;
      if (plano) void this.loadForPlan(plano);
    });
  }

  hasFeature(code: string): boolean {
    return this._enabled().has(code);
  }

  async loadForPlan(planNome: string): Promise<void> {
    this.isLoading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('plano_features')
        .select('feature_code')
        .eq('plano_nome', planNome)
        .eq('enabled', true);

      if (error || !data?.length) {
        this._applyFallback(planNome);
        return;
      }

      this._enabled.set(new Set(data.map((r: any) => r.feature_code as string)));
    } catch {
      this._applyFallback(planNome);
    } finally {
      this.isLoading.set(false);
    }
  }

  private _applyFallback(planNome: string): void {
    const codes = FALLBACK[planNome] ?? FALLBACK['free'];
    this._enabled.set(new Set(codes));
  }
}
