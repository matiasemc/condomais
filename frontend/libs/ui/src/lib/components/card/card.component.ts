import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div [class]="'card' + (accent() ? ' card--accent' : '') + (flat() ? ' card--flat' : '')"><ng-content></ng-content></div>`,
  styleUrl: './card.component.scss',
})
export class CardComponent {
  accent = input(false);
  flat   = input(false);
}
