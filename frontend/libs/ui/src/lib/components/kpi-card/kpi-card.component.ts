import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-kpi-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="'kpi' + (inverted() ? ' kpi--inverted' : '')">
      <div class="kpi__label">{{ label() }}</div>
      <div class="kpi__value">{{ value() }}</div>
    </div>
  `,
  styleUrl: './kpi-card.component.css',
})
export class KpiCardComponent {
  label    = input.required<string>();
  value    = input.required<string | number>();
  inverted = input(false);
}
