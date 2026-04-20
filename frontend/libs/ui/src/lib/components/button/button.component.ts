import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'accent' | 'ghost' | 'soft' | 'whatsapp';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'cm-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [class]="classes"
      [disabled]="disabled()"
      [type]="type()"
      (click)="clicked.emit($event)">
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size    = input<ButtonSize>('md');
  disabled = input(false);
  type    = input<'button' | 'submit' | 'reset'>('button');
  clicked = output<MouseEvent>();

  get classes(): string {
    return ['btn', `btn--${this.variant()}`, `btn--${this.size()}`].join(' ');
  }
}
