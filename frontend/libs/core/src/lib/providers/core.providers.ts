import { EnvironmentProviders, makeEnvironmentProviders, inject, APP_INITIALIZER } from '@angular/core';
import { SUPABASE_CONFIG, SUPABASE_CLIENT, supabaseClientFactory, SupabaseConfig } from '../supabase/client';
import { AuthService } from '../services/auth.service';

export function provideCore(config: SupabaseConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: SUPABASE_CONFIG, useValue: config },
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