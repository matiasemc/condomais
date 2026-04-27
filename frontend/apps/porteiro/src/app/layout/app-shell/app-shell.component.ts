import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { AppHeaderComponent } from '@condomais/core';

@Component({
  selector: 'cm-app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, BottomNavComponent, ToastModule, AppHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell">
      <cm-app-header></cm-app-header>
      <cm-sidebar class="shell__sidebar"></cm-sidebar>
      <main class="shell__main">
        <router-outlet></router-outlet>
      </main>
      <cm-bottom-nav class="shell__bottom-nav"></cm-bottom-nav>
      <p-toast></p-toast>
    </div>
  `,
  styleUrl: './app-shell.component.css',
})
export class AppShellComponent {}
