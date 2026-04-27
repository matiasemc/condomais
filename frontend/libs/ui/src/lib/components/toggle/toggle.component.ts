import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="toggle" [class.toggle--on]="checked()"
            role="switch" [attr.aria-checked]="checked()"
            (click)="toggled.emit(!checked())">
      <span class="toggle__thumb"></span>
    </button>
  `,
  styleUrl: './toggle.component.css',
})
export class ToggleComponent {
  checked = input(false);
  toggled = output<boolean>();
}
