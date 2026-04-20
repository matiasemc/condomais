import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty">
      <div class="empty__icon">{{ icon() }}</div>
      <div class="empty__title">{{ title() }}</div>
      @if (subtitle()) {
        <div class="empty__subtitle">{{ subtitle() }}</div>
      }
    </div>
  `,
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  icon     = input('📭');
  title    = input.required<string>();
  subtitle = input<string>('');
}
