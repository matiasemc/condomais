import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, AuthState } from '@condomais/core';
@Component({
  selector: 'cm-porteiro-login', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [FormsModule],
  template: `
    <div class="login">
      <div class="login-card">
        <span class="login-badge">Portaria</span>
        <h1 class="login-title">CondoMais</h1>
        @if (state.error()) { <p class="login-error">{{ state.error() }}</p> }
        <input type="email" [(ngModel)]="email" placeholder="E-mail" />
        <input type="password" [(ngModel)]="password" placeholder="Senha" />
        <button (click)="login()" [disabled]="state.isLoading()">{{ state.isLoading() ? "Aguarde…" : "Entrar" }}</button>
      </div>
    </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent { auth=inject(AuthService); state=inject(AuthState); email=""; password=""; login(){this.auth.login(this.email,this.password);} }