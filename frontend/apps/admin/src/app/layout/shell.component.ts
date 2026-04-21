import { Component, inject, effect, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastComponent } from '@condomais/ui';
import { AuthService, AuthState, OccurrenceService, NotificationService } from '@condomais/core';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'cm-admin-shell',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell">
      <header class="shell__header">
        <b class="shell__brand">CondoMais Admin</b>
        <span class="shell__tenant">{{ state.currentTenant()?.nome }}</span>
        <nav class="shell__nav">
          <a class="shell__nav-link" routerLink="/dashboard">Painel</a>
          <a class="shell__nav-link" routerLink="/ocorrencias">Ocorrências</a>
        </nav>
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
      display: flex; align-items: center; gap: 16px;
      padding: 14px 24px; background: #2d6a4f; color: #fff;
    }
    .shell__brand { flex: 1; font-weight: 700; font-size: 16px; }
    .shell__tenant { font-size: 14px; opacity: 0.8; }
    .shell__nav { display: flex; gap: 8px; }
    .shell__nav-link { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 14px; padding: 4px 10px; border-radius: 6px; transition: background 0.15s; }
    .shell__nav-link:hover { background: rgba(255,255,255,0.15); }
    .shell__logout { background: rgba(255,255,255,0.15); border: none; color: #fff; cursor: pointer; padding: 6px 14px; border-radius: 6px; font-size: 14px; }
    .shell__main { padding: 24px; flex: 1; }
  `],
})
export class ShellComponent {
  readonly auth      = inject(AuthService);
  readonly state     = inject(AuthState);
  readonly toastSvc  = inject(ToastService);
  private readonly notifSvc      = inject(NotificationService);
  private readonly occurrenceSvc = inject(OccurrenceService);
  private lastShownId: string | null = null;

  constructor() {
    effect(() => {
      const tenant = this.state.currentTenant();
      if (tenant) {
        this.occurrenceSvc.subscribeToTenant(tenant.id);
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

    inject(DestroyRef).onDestroy(() => this.occurrenceSvc.stopRealtime());
  }
}