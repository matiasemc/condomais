import { Component, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../core/toast.service';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { NotificationService, OccurrenceService, AuthState, BillingService } from '@condomais/core';

@Component({
  selector: 'cm-app-shell',
  standalone: true,
  imports: [RouterOutlet, BottomNavComponent, ToastModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell">
      <div class="ctx-bar">
        @if (authState.currentTenant(); as t) {
          <span class="ctx-bar__tenant">{{ t.nome }}</span>
        }
        <button class="ctx-bar__switch" (click)="switchContext()">Trocar contexto</button>
      </div>
      <main class="shell__content">
        <router-outlet></router-outlet>
      </main>
      <cm-bottom-nav
        [canReservas]="billingSvc.canAccessReservations()"
        [canOcorrencias]="billingSvc.canAccessOccurrences()">
      </cm-bottom-nav>
      <p-toast></p-toast>
    </div>
  `,
  styleUrl: './app-shell.component.css',
})
export class AppShellComponent {
  private readonly toastSvc = inject(ToastService);
  private readonly notifSvc      = inject(NotificationService);
  private readonly occurrenceSvc = inject(OccurrenceService);
  readonly authState             = inject(AuthState);
  readonly billingSvc            = inject(BillingService);
  private readonly router        = inject(Router);
  private lastShownId: string | null = null;

  constructor() {
    effect(() => {
      const list   = this.notifSvc.notifications();
      const latest = list[0];
      if (latest && !latest.read && latest.id !== this.lastShownId) {
        this.lastShownId = latest.id;
        this.toastSvc.show({ message: latest.body, icon: 'ðŸ“‹', duration: 3500 });
      }
    });

    effect(() => {
      const user = this.authState.user();
      if (user) {
        this.occurrenceSvc.subscribeForUser(user.id);
      }
    });

    effect(() => {
      const tenantId = this.authState.currentTenant()?.id;
      if (tenantId) this.billingSvc.loadForTenant(tenantId);
    });
  }

  switchContext(): void { void this.router.navigate(['/select-context']); }
}
