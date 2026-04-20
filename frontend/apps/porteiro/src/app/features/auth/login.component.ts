import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '@condomais/ui';

@Component({
  selector: 'cm-porteiro-login',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="login">
      <div class="login__hero">
        <div class="login__badge">Portaria</div>
        <h1 class="login__title">Condomais<br/><em>Portaria</em></h1>
      </div>
      <div class="login__form">
        <input class="login__input" type="text"   placeholder="Usuario" [(ngModel)]="user"/>
        <input class="login__input" type="password" placeholder="Senha" [(ngModel)]="senha"/>
        <cm-button variant="accent" size="lg" style="width:100%" (clicked)="entrar()">Entrar</cm-button>
      </div>
    </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user  = '';
  senha = '';
  constructor(private router: Router) {}
  entrar(): void { this.router.navigate(['/home']); }
}
