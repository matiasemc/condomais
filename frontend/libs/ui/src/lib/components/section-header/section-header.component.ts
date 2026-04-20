import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-section-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-header">
      @if (eyebrow()) {
        <div class="section-header__eyebrow">{{ eyebrow() }}</div>
      }
      <h2 class="section-header__title">{{ title() }}</h2>
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  title   = input.required<string>();
  eyebrow = input<string>('');
}
