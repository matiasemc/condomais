import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '@condomais/ui';
import { ButtonComponent } from '@condomais/ui';
import { BadgeComponent } from '@condomais/ui';

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
