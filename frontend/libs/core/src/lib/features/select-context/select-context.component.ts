import {
  Component, inject, signal, computed, ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from '../../state/auth.state';
import { ContextService, PLATFORM_LABELS } from '../../services/context.service';
import { AuthService } from '../../auth/auth.service';
import type { AppKey, Tenant } from '../../interfaces/index.model';

interface PlatformCard {
  key: AppKey;
  label: string;
  icon: string;
  color: string;
}

const PLATFORM_CARDS: PlatformCard[] = [
  { key: 'morador',      label: 'Morador',      icon: 'ðŸ ', color: '#2d6a4f' },
  { key: 'porteiro',     label: 'Porteiro',     icon: 'ðŸ›¡ï¸', color: '#1565c0' },
  { key: 'admin',        label: 'Admin',        icon: 'âš™ï¸',  color: '#e65100' },
  { key: 'master-admin', label: 'Master Admin', icon: 'â­', color: '#1a1a2e' },
];

@Component({
  selector: 'cm-select-context',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sc">
      <header class="sc__header">
        <span class="sc__logo">CondoMais</span>
        <h1 class="sc__title">Selecionar contexto</h1>
        <p class="sc__sub">Escolha a plataforma e o condomÃ­nio para continuar</p>
      </header>

      <section class="sc__section">
        <h2 class="sc__label">Plataforma</h2>
        <div class="sc__cards">
          @for (p of availablePlatformCards(); track p.key) {
            <button
              class="sc__card"
              [class.sc__card--active]="selectedPlatform() === p.key"
              [style.--card-color]="p.color"
              (click)="selectPlatform(p.key)"
            >
              <span class="sc__card-icon">{{ p.icon }}</span>
              <span class="sc__card-label">{{ p.label }}</span>
            </button>
          }
        </div>
      </section>

      @if (selectedPlatform() && tenantsForPlatform().length > 0) {
        <section class="sc__section">
          <h2 class="sc__label">CondomÃ­nio</h2>
          <div class="sc__tenants">
            @for (t of tenantsForPlatform(); track t.id) {
              <button
                class="sc__tenant"
                [class.sc__tenant--active]="selectedTenant()?.id === t.id"
                (click)="selectTenant(t)"
              >
                <span class="sc__tenant-name">{{ t.nome }}</span>
                <span class="sc__tenant-slug">{{ t.slug }}</span>
              </button>
            }
          </div>
        </section>
      }

      <div class="sc__actions">
        <button class="sc__confirm" [disabled]="!canConfirm()" (click)="confirm()">
          Entrar
        </button>
        <button class="sc__logout" (click)="logout()">Sair</button>
      </div>
    </div>
  `,
  styles: [`
    .sc {
      min-height: 100vh; display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 32px; padding: 24px; background: #f4f6f8;
      box-sizing: border-box;
    }
    .sc__header { text-align: center; }
    .sc__logo { font-size: 13px; font-weight: 700; letter-spacing: 1px; color: #888; text-transform: uppercase; }
    .sc__title { margin: 8px 0 4px; font-size: 22px; font-weight: 700; color: #1a1a2e; }
    .sc__sub { margin: 0; font-size: 14px; color: #666; }

    .sc__section { width: 100%; max-width: 520px; }
    .sc__label { font-size: 12px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px; }

    .sc__cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 10px; }
    .sc__card {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      padding: 16px 12px; border-radius: 12px; border: 2px solid #e0e0e0;
      background: #fff; cursor: pointer; font-size: 13px; font-weight: 500;
      color: #333; transition: border-color 0.15s, box-shadow 0.15s;
    }
    .sc__card:hover { border-color: var(--card-color); }
    .sc__card--active {
      border-color: var(--card-color);
      background: color-mix(in srgb, var(--card-color) 8%, #fff);
      color: var(--card-color); font-weight: 600;
      box-shadow: 0 2px 8px color-mix(in srgb, var(--card-color) 25%, transparent);
    }
    .sc__card-icon { font-size: 22px; }

    .sc__tenants { display: flex; flex-direction: column; gap: 8px; }
    .sc__tenant {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px; border-radius: 10px; border: 2px solid #e0e0e0;
      background: #fff; cursor: pointer; text-align: left; transition: border-color 0.15s;
    }
    .sc__tenant:hover { border-color: #2d6a4f; }
    .sc__tenant--active { border-color: #2d6a4f; background: #f0f7f4; }
    .sc__tenant-name { font-size: 14px; font-weight: 500; color: #1a1a2e; }
    .sc__tenant-slug { font-size: 12px; color: #999; }

    .sc__actions { display: flex; gap: 10px; width: 100%; max-width: 520px; }
    .sc__confirm {
      flex: 1; padding: 14px; border-radius: 10px; border: none;
      background: #2d6a4f; color: #fff; font-size: 15px; font-weight: 600;
      cursor: pointer; transition: opacity 0.15s;
    }
    .sc__confirm:disabled { opacity: 0.4; cursor: not-allowed; }
    .sc__confirm:not(:disabled):hover { opacity: 0.9; }
    .sc__logout {
      padding: 14px 20px; border-radius: 10px; border: 1.5px solid #ddd;
      background: #fff; color: #666; font-size: 14px; cursor: pointer;
    }
    .sc__logout:hover { background: #f5f5f5; }
  `],
})
export class SelectContextComponent {
  private readonly ctxSvc = inject(ContextService);
  private readonly auth   = inject(AuthService);
  private readonly router = inject(Router);

  readonly selectedPlatform = signal<AppKey | null>(null);
  readonly selectedTenant   = signal<Tenant | null>(null);

  readonly availablePlatformCards = computed(() => {
    const available = this.ctxSvc.getAvailablePlatforms();
    return PLATFORM_CARDS.filter(c => available.includes(c.key));
  });

  readonly tenantsForPlatform = computed(() => {
    const p = this.selectedPlatform();
    return p ? this.ctxSvc.getTenantsForPlatform(p) : [];
  });

  readonly canConfirm = computed(() => {
    const p = this.selectedPlatform();
    if (!p) return false;
    if (p === 'master-admin') return true;
    return this.selectedTenant() !== null;
  });

  selectPlatform(key: AppKey): void {
    this.selectedPlatform.set(key);
    this.selectedTenant.set(null);
    const tenants = this.ctxSvc.getTenantsForPlatform(key);
    if (tenants.length === 1) this.selectedTenant.set(tenants[0]);
  }

  selectTenant(t: Tenant): void {
    this.selectedTenant.set(t);
  }

  confirm(): void {
    const platform = this.selectedPlatform();
    if (!platform) return;

    const ctx = { platform, condominioId: this.selectedTenant()?.id ?? null };
    this.ctxSvc.setContext(ctx);
    this.ctxSvc.applyContext(ctx);

    const targetUrl = this.ctxSvc.resolveAppUrl(platform);
    const currentOrigin = `${window.location.protocol}//${window.location.host}`;
    const isSameApp = targetUrl === currentOrigin || targetUrl === currentOrigin + '/';

    if (isSameApp) {
      void this.router.navigateByUrl(this.ctxSvc.getDefaultRoute(platform));
    } else {
      window.location.href = targetUrl;
    }
  }

  logout(): void {
    void this.auth.logout();
  }
}
