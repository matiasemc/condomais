import { EnvironmentProviders, makeEnvironmentProviders, inject, APP_INITIALIZER } from '@angular/core';
import { SUPABASE_CONFIG, SUPABASE_CLIENT, supabaseClientFactory, SupabaseConfig } from '../supabase/client';
import { AuthService } from '../auth/auth.service';
import { AUTH_APP_KEY } from '../auth/session.service';
import type { AppKey } from '../models';

export interface CoreConfig extends SupabaseConfig {
  appKey: AppKey;
}

export function provideCore(config: CoreConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: SUPABASE_CONFIG, useValue: config },
    { provide: AUTH_APP_KEY, useValue: config.appKey },
    {
      provide: SUPABASE_CLIENT,
      useFactory: (cfg: SupabaseConfig) => supabaseClientFactory(cfg),
      deps: [SUPABASE_CONFIG],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authSvc: AuthService) => () => authSvc.init(),
      deps: [AuthService],
      multi: true,
    },
  ]);
}
