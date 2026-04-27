import { Component, inject, effect, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AuthState, OccurrenceService, NotificationService, DeliveryService, ReservationService, AppHeaderComponent } from '@condomais/core';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'cm-admin-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ToastModule, AppHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell">
      <cm-app-header>
        <a routerLink="/dashboard"   routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Painel</a>
        <a routerLink="/entregas"    routerLinkActive="active">Entregas</a>
        <a routerLink="/ocorrencias" routerLinkActive="active">Ocorrências</a>
        <a routerLink="/reservas"    routerLinkActive="active">Reservas</a>
        <a routerLink="/usuarios"    routerLinkActive="active">Usuários</a>
        <a routerLink="/plano"       routerLinkActive="active">Plano</a>
      </cm-app-header>
      <main class="shell__main">
        <router-outlet></router-outlet>
      </main>
      <p-toast></p-toast>
    </div>
  `,
  styles: [`
    .shell { display: flex; flex-direction: column; min-height: 100vh; }
    .shell__main { padding: 28px 24px; flex: 1; max-width: 1200px; width: 100%; margin: 0 auto; box-sizing: border-box; }
    @media (max-width: 768px) { .shell__main { padding: 16px; } }
  `],
})
export class ShellComponent {
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
