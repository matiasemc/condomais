import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';

@Component({
  selector: 'cm-app-shell',
  standalone: true,
  imports: [RouterOutlet, BottomNavComponent, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell">
      <main class="shell__content">
        <router-outlet></router-outlet>
      </main>
      <cm-bottom-nav></cm-bottom-nav>
      <cm-toast [toast]="toastSvc.toast()"></cm-toast>
    </div>
  `,
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  toastSvc = inject(ToastService);
}
