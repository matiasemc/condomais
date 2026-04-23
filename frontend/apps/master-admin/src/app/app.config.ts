import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideCore } from '@condomais/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideCore({
      appKey: 'master-admin',
      supabaseUrl: environment.supabase.url,
      supabaseAnonKey: environment.supabase.anonKey,
    }),
  ],
};
