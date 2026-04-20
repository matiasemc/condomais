import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '../../../../../libs/ui/src/lib/components/toast/toast.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'cm-app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, BottomNavComponent, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell">
      <cm-sidebar class="shell__sidebar"></cm-sidebar>
      <main class="shell__main">
        <router-outlet></router-outlet>
      </main>
      <cm-bottom-nav class="shell__bottom-nav"></cm-bottom-nav>
      <cm-toast [toast]="toastSvc.toast()"></cm-toast>
    </div>
  `,
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  toastSvc = inject(ToastService);
}
