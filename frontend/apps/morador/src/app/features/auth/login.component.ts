import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../libs/ui/src/lib/components/button/button.component';

@Component({
  selector: 'cm-login',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="login">
      <div class="login__hero">
        <p class="login__eyebrow">A melhor plataforma para seu condomínio</p>
        <h1 class="login__title">Bem-vindo<br/>ao <em>Condomais</em></h1>
      </div>

      <div class="login__form">
        <div class="login__field">
          <label class="login__label">E-mail</label>
          <input class="login__input" type="email" [(ngModel)]="email" placeholder="seu@email.com"/>
        </div>
        <div class="login__field">
          <label class="login__label">Senha</label>
          <input class="login__input" type="password" [(ngModel)]="senha" placeholder="••••••••"/>
        </div>
        <cm-button variant="accent" size="lg" style="width:100%" (clicked)="entrar()">
          Entrar
        </cm-button>
        <cm-button variant="whatsapp" size="md" style="width:100%" (clicked)="whatsapp()">
          Entrar com WhatsApp
        </cm-button>
      </div>
    </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private router: Router) {}

  entrar(): void {
    localStorage.setItem('cm_logged', '1');
    this.router.navigate(['/home']);
  }

  whatsapp(): void {
    this.entrar();
  }
}
