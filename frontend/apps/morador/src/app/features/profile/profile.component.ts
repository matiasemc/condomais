import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@condomais/core';
import { AvatarComponent } from '@condomais/ui';
import { ButtonComponent } from '@condomais/ui';
import { BadgeComponent } from '@condomais/ui';

@Component({
  selector: 'cm-profile',
  standalone: true,
  imports: [RouterLink, AvatarComponent, ButtonComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private readonly auth = inject(AuthService);

  sair(): Promise<void> {
    return this.auth.logout();
  }
}
