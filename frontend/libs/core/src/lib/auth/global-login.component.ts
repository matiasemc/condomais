import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthState } from '../state/auth.state';

@Component({
  selector: 'cm-global-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './global-login.component.html',
  styleUrl: './global-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalLoginComponent {
  private readonly auth = inject(AuthService);

  readonly state = inject(AuthState);

  email = '';
  password = '';

  loginWithGoogle(): Promise<void> {
    return this.auth.loginWithGoogle();
  }

  loginWithEmail(): Promise<void> {
    return this.auth.login(this.email, this.password);
  }
}
