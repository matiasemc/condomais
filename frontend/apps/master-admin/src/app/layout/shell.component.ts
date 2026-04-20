import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService, AuthState } from '@condomais/core';

@Component({
  selector: 'cm-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `
    <div class="shell">
      <header class="shell__header">
        <span class="shell__logo">CondoMais · Master Admin</span>
        <button class="shell__logout" (click)="auth.logout()">Sair</button>
      </header>
      <main class="shell__main"><router-outlet></router-outlet></main>
    </div>
  `,
  styles: [`.shell{display:flex;flex-direction:column;min-height:100vh}
    .shell__header{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;background:#1C1A14;color:#fff}
    .shell__logo{font-weight:700;font-size:16px}
    .shell__logout{background:none;border:1px solid rgba(255,255,255,.3);color:#fff;padding:6px 12px;border-radius:6px;cursor:pointer}
    .shell__main{flex:1;padding:24px}`],
})
export class ShellComponent {
  auth    = inject(AuthService);
  state   = inject(AuthState);
}