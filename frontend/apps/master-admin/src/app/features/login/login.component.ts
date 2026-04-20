import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, AuthState } from '@condomais/core';

@Component({
  selector: 'cm-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <div class="login-wrap">
      <div class="login-card">
        <h1 class="login-title">Master Admin</h1>
        @if (state.error()) { <p class="login-error">{{ state.error() }}</p> }
        <input class="login-input" type="email" [(ngModel)]="email" placeholder="E-mail" />
        <input class="login-input" type="password" [(ngModel)]="password" placeholder="Senha" />
        <button class="login-btn" (click)="login()" [disabled]="state.isLoading()">
          {{ state.isLoading() ? "Aguarde…" : "Entrar" }}
        </button>
      </div>
    </div>
  `,
  styles: [`.login-wrap{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f4f4f4}
    .login-card{background:#fff;padding:40px;border-radius:12px;display:flex;flex-direction:column;gap:16px;min-width:320px}
    .login-title{margin:0;font-size:22px;font-weight:700}
    .login-input{padding:10px 14px;border:1.5px solid #ddd;border-radius:8px;font-size:15px}
    .login-btn{padding:12px;background:#1C1A14;color:#fff;border:none;border-radius:8px;font-size:15px;cursor:pointer}
    .login-error{color:#c0392b;font-size:13px;margin:0}`],
})
export class LoginComponent {
  auth  = inject(AuthService);
  state = inject(AuthState);
  email    = "";
  password = "";

  login() { this.auth.login(this.email, this.password); }
}