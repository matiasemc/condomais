import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../../../../../libs/ui/src/lib/components/avatar/avatar.component';
import { ButtonComponent } from '../../../../../libs/ui/src/lib/components/button/button.component';
import { BadgeComponent } from '../../../../../libs/ui/src/lib/components/badge/badge.component';

@Component({
  selector: 'cm-profile',
  standalone: true,
  imports: [RouterLink, AvatarComponent, ButtonComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  sair(): void {
    localStorage.removeItem('cm_logged');
    window.location.href = '/login';
  }
}
