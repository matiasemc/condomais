import { Component, inject, effect, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastComponent } from '@condomais/ui';
import { AuthService, AuthState, OccurrenceService, NotificationService, DeliveryService, ReservationService } from '@condomais/core';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'cm-admin-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell">
      <header class="shell__header">
        <b class="shell__brand">CondoMais</b>
        <span class="shell__role">Admin</span>
        <nav class="shell__nav">
          <a class="shell__nav-link" routerLink="/dashboard"   routerLinkActive="shell__nav-link--active" [routerLinkActiveOptions]="{exact:true}">Painel</a>
          <a class="shell__nav-link" routerLink="/entregas"    routerLinkActive="shell__nav-link--active">Entregas</a>
          <a class="shell__nav-link" routerLink="/ocorrencias" routerLinkActive="shell__nav-link--active">Ocorrências</a>
          <a class="shell__nav-link" routerLink="/reservas"    routerLinkActive="shell__nav-link--active">Reservas</a>
          <a class="shell__nav-link" routerLink="/usuarios"    routerLinkActive="shell__nav-link--active">Usuários</a>
        </nav>
        <span class="shell__tenant">{{ state.currentTenant()?.nome }}</span>
        <button class="shell__logout" (click)="auth.logout()">Sair</button>
      </header>
      <main class="shell__main">
        <router-outlet></router-outlet>
      </main>
      <cm-toast [toast]="toastSvc.toast()"></cm-toast>
    </div>
  `,
  styles: [`
    .shell { display: flex; flex-direction: column; min-height: 100vh; }
    .shell__header {
      display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
      padding: 12px 24px; background: #2d6a4f; color: #fff;
    }
    .shell__brand { font-weight: 700; font-size: 16px; }
    .shell__role { font-size: 11px; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 999px; }
    .shell__nav { display: flex; gap: 4px; flex: 1; flex-wrap: wrap; }
    .shell__nav-link {
      color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px;
      padding: 5px 11px; border-radius: 6px; transition: background 0.15s;
    }
    .shell__nav-link:hover { background: rgba(255,255,255,0.15); }
    .shell__nav-link--active { background: rgba(255,255,255,0.2); color: #fff; font-weight: 600; }
    .shell__tenant { font-size: 13px; opacity: 0.75; }
    .shell__logout { background: rgba(255,255,255,0.15); border: none; color: #fff; cursor: pointer; padding: 6px 14px; border-radius: 6px; font-size: 13px; }
    .shell__main { padding: 28px 24px; flex: 1; max-width: 1200px; width: 100%; margin: 0 auto; box-sizing: border-box; }
    @media (max-width: 768px) {
      .shell__nav-link { font-size: 12px; padding: 4px 8px; }
      .shell__main { padding: 16px; }
    }
  `],
})
export class ShellComponent {
  readonly auth     = inject(AuthService);
  readonly state    = inject(AuthState);
  readonly toastSvc = inject(ToastService);
  private readonly notifSvc       = inject(NotificationService);
  private readonly occurrenceSvc  = inject(OccurrenceService);
  private readonly deliverySvc    = inject(DeliveryService);
  private readonly reservationSvc = inject(ReservationService);
  private lastShownId: string | null = null;

  constructor() {
    effect(() => {
      const tenant = this.state.currentTenant();
      if (tenant) {
        this.occurrenceSvc.subscribeToTenant(tenant.id);
        this.deliverySvc.subscribeToTenant(tenant.id);
        this.reservationSvc.subscribeToTenant(tenant.id);
      }
    });

    effect(() => {
      const list   = this.notifSvc.notifications();
      const latest = list[0];
      if (
        latest && !latest.read &&
        latest.id !== this.lastShownId &&
        (latest.type === 'nova_ocorrencia' || latest.type === 'ocorrencia_atualizada')
      ) {
        this.lastShownId = latest.id;
        this.toastSvc.show({ message: latest.body, icon: '📋', duration: 4000 });
      }
    });

    inject(DestroyRef).onDestroy(() => {
      this.occurrenceSvc.stopRealtime();
      this.deliverySvc.stopRealtime();
      this.reservationSvc.stopRealtime();
    });
  }
}