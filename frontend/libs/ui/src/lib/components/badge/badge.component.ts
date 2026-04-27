import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warn' | 'warning' | 'danger';

@Component({
  selector: 'cm-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="'badge badge--' + variant()"><ng-content></ng-content></span>`,
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  variant = input<BadgeVariant>('neutral');
}
