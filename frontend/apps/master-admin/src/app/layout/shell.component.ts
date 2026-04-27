import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthState, AppHeaderComponent } from '@condomais/core';

@Component({
  selector: 'cm-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AppHeaderComponent],
  template: `
    <div class="shell">
      <cm-app-header>
        <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Painel</a>
        <a routerLink="/tenants"   routerLinkActive="active">Tenants</a>
        <a routerLink="/users"     routerLinkActive="active">Usuários</a>
        <a routerLink="/plans"     routerLinkActive="active">Planos</a>
      </cm-app-header>
      <main class="shell__main"><router-outlet></router-outlet></main>
    </div>
  `,
  styles: [`
    .shell { display: flex; flex-direction: column; min-height: 100vh; background: #f8f9fa; }
    .shell__main { flex: 1; padding: 28px 24px; max-width: 1300px; width: 100%; margin: 0 auto; box-sizing: border-box; }
    @media (max-width: 768px) { .shell__main { padding: 16px; } }
  `],
})
export class ShellComponent {
  readonly state = inject(AuthState);
}