import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="spinner" [style.width.px]="size()" [style.height.px]="size()">
      <svg viewBox="0 0 24 24" fill="none" [attr.width]="size()" [attr.height]="size()">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.2"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
  `,
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  size = input(24);
}
