import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService, AuthState } from '@condomais/core';

@Component({
  selector: 'cm-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="shell">
      <header class="shell__header">
        <div class="shell__brand">
          <b class="shell__logo">CondoMais</b>
          <span class="shell__badge">Master Admin</span>
        </div>
        <nav class="shell__nav">
          <a class="shell__nav-link" routerLink="/dashboard" routerLinkActive="shell__nav-link--active" [routerLinkActiveOptions]="{exact:true}">Painel</a>
          <a class="shell__nav-link" routerLink="/tenants"   routerLinkActive="shell__nav-link--active">Tenants</a>
          <a class="shell__nav-link" routerLink="/users"     routerLinkActive="shell__nav-link--active">Usuários</a>
          <a class="shell__nav-link" routerLink="/plans"     routerLinkActive="shell__nav-link--active">Planos</a>
        </nav>
        <div class="shell__right">
          <span class="shell__user">{{ state.user()?.email }}</span>
          <button class="shell__logout" (click)="auth.logout()">Sair</button>
        </div>
      </header>
      <main class="shell__main"><router-outlet></router-outlet></main>
    </div>
  `,
  styles: [`
    .shell { display: flex; flex-direction: column; min-height: 100vh; background: #f8f9fa; }
    .shell__header {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
      padding: 12px 24px; background: #1a1a2e; color: #fff;
    }
    .shell__brand { display: flex; align-items: center; gap: 8px; }
    .shell__logo { font-weight: 700; font-size: 16px; }
    .shell__badge { font-size: 10px; background: #e63946; color: #fff; padding: 2px 7px; border-radius: 999px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .shell__nav { display: flex; gap: 2px; flex: 1; }
    .shell__nav-link { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px; padding: 6px 12px; border-radius: 6px; transition: background 0.15s; }
    .shell__nav-link:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .shell__nav-link--active { background: rgba(255,255,255,0.15); color: #fff; font-weight: 600; }
    .shell__right { display: flex; align-items: center; gap: 12px; margin-left: auto; }
    .shell__user { font-size: 12px; opacity: 0.6; }
    .shell__logout { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer; padding: 5px 12px; border-radius: 6px; font-size: 13px; }
    .shell__main { flex: 1; padding: 28px 24px; max-width: 1300px; width: 100%; margin: 0 auto; box-sizing: border-box; }
    @media (max-width: 768px) { .shell__nav-link { font-size: 12px; padding: 5px 8px; } .shell__main { padding: 16px; } }
  `],
})
export class ShellComponent {
  readonly auth  = inject(AuthService);
  readonly state = inject(AuthState);
}