import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, AuthState } from '@condomais/core';
@Component({
  selector: 'cm-login', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  auth  = inject(AuthService);
  state = inject(AuthState);
  email    = "";
  password = "";
  login() { this.auth.login(this.email, this.password); }
}