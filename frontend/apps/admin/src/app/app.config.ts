import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideCore } from '@condomais/core';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideCore({
      appKey: 'admin',
      supabaseUrl: environment.supabase.url,
      supabaseAnonKey: environment.supabase.anonKey,
    }),
  ],
};
