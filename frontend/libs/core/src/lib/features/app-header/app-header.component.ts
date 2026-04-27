import {
  Component, inject, signal, computed, ChangeDetectionStrategy, HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AuthState } from '../../state/auth.state';
import { ContextService, PLATFORM_LABELS } from '../../services/context.service';
import type { AppKey } from '../../interfaces/index.model';

const PLATFORM_COLOR: Record<AppKey, string> = {
  morador: '#2d6a4f',
  porteiro: '#1565c0',
  admin: '#e65100',
  'master-admin': '#1a1a2e',
};

@Component({
  selector: 'cm-app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="ah" [style.background]="platformColor()">
      <div class="ah__left">
        <span class="ah__logo">CondoMais</span>
        <span class="ah__platform">{{ platformLabel() }}</span>
      </div>

      <nav class="ah__nav">
        <ng-content></ng-content>
      </nav>

      @if (tenantName()) {
        <span class="ah__tenant">{{ tenantName() }}</span>
      }

      <div class="ah__right">
        <div class="ah__menu">
          <button class="ah__trigger" (click)="toggleMenu($event)" [attr.aria-expanded]="menuOpen()">
            <span class="ah__initial">{{ userInitial() }}</span>
            <span class="ah__email">{{ userEmail() }}</span>
            <svg class="ah__chevron" width="12" height="12" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2.5"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          @if (menuOpen()) {
            <div class="ah__dropdown">
              <button class="ah__dd-item" (click)="switchContext()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
                Trocar contexto
              </button>
              <div class="ah__dd-sep"></div>
              <button class="ah__dd-item ah__dd-item--danger" (click)="logout()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Sair
              </button>
            </div>
          }
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host { display: block; }

    .ah {
      display: flex; align-items: center; gap: 8px; flex-wrap: nowrap;
      padding: 0 20px; height: 52px; color: #fff;
      position: relative; z-index: 100;
    }

    .ah__left { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .ah__logo { font-weight: 700; font-size: 15px; letter-spacing: -0.3px; }
    .ah__platform {
      font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;
      background: rgba(255,255,255,0.18); padding: 2px 7px; border-radius: 999px;
    }

    .ah__nav {
      display: flex; align-items: center; gap: 2px; flex: 1; padding: 0 8px;
      overflow: hidden;
    }
    :host ::ng-deep .ah__nav a {
      color: rgba(255,255,255,0.75); text-decoration: none; font-size: 13px;
      padding: 5px 10px; border-radius: 6px; transition: background 0.15s, color 0.15s;
      white-space: nowrap;
    }
    :host ::ng-deep .ah__nav a:hover { background: rgba(255,255,255,0.12); color: #fff; }
    :host ::ng-deep .ah__nav a.active { background: rgba(255,255,255,0.2); color: #fff; font-weight: 600; }

    .ah__tenant {
      font-size: 12px; opacity: 0.7; white-space: nowrap; overflow: hidden;
      text-overflow: ellipsis; max-width: 160px; flex-shrink: 0;
    }

    .ah__right { margin-left: auto; flex-shrink: 0; }
    .ah__menu { position: relative; }

    .ah__trigger {
      display: flex; align-items: center; gap: 6px;
      background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
      color: #fff; cursor: pointer; padding: 5px 10px; border-radius: 8px;
      font-size: 13px; transition: background 0.15s;
    }
    .ah__trigger:hover { background: rgba(255,255,255,0.2); }

    .ah__initial {
      width: 22px; height: 22px; border-radius: 50%; background: rgba(255,255,255,0.25);
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700; flex-shrink: 0;
    }
    .ah__email { max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ah__chevron { flex-shrink: 0; opacity: 0.7; }

    .ah__dropdown {
      position: absolute; right: 0; top: calc(100% + 6px);
      background: #fff; border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06);
      min-width: 200px; overflow: hidden; z-index: 200;
    }

    .ah__dd-item {
      display: flex; align-items: center; gap: 8px;
      width: 100%; padding: 11px 14px; background: none; border: none;
      text-align: left; cursor: pointer; font-size: 13px; color: #333;
      transition: background 0.12s;
    }
    .ah__dd-item:hover { background: #f5f5f5; }
    .ah__dd-item--danger { color: #c62828; }
    .ah__dd-item--danger:hover { background: #fef2f2; }
    .ah__dd-sep { height: 1px; background: #f0f0f0; }

    @media (max-width: 600px) {
      .ah { padding: 0 14px; }
      .ah__email { display: none; }
      .ah__tenant { display: none; }
      .ah__nav :where(a) { font-size: 12px; padding: 4px 7px; }
    }
  `],
})
export class AppHeaderComponent {
  private readonly ctxSvc = inject(ContextService);
  private readonly auth   = inject(AuthService);
  readonly state          = inject(AuthState);
  private readonly router = inject(Router);

  readonly menuOpen = signal(false);

  readonly platform      = computed<AppKey>(() => this.ctxSvc.getContext()?.platform ?? 'morador');
  readonly platformLabel = computed(() => PLATFORM_LABELS[this.platform()]);
  readonly platformColor = computed(() => PLATFORM_COLOR[this.platform()]);
  readonly tenantName    = computed(() => this.state.currentTenant()?.nome ?? null);
  readonly userEmail     = computed(() => this.state.profile()?.email ?? this.state.user()?.email ?? '');
  readonly userInitial   = computed(() => (this.userEmail()[0] ?? '?').toUpperCase());

  @HostListener('document:click')
  closeMenu(): void { this.menuOpen.set(false); }

  toggleMenu(e: Event): void {
    e.stopPropagation();
    this.menuOpen.update(v => !v);
  }

  switchContext(): void {
    this.menuOpen.set(false);
    void this.router.navigate(['/select-context']);
  }

  logout(): void {
    this.menuOpen.set(false);
    void this.auth.logout();
  }
}
