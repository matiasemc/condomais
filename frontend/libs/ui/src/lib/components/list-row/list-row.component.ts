import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cm-list-row',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-row" [class.list-row--clickable]="clickable()" (click)="rowClick.emit()">
      @if (icon()) {
        <div class="list-row__icon">
          <span [innerHTML]="icon()"></span>
        </div>
      }
      <div class="list-row__body">
        <div class="list-row__title">{{ title() }}</div>
        @if (subtitle()) {
          <div class="list-row__subtitle">{{ subtitle() }}</div>
        }
      </div>
      <ng-content select="[slot=end]"></ng-content>
      @if (clickable()) {
        <svg class="list-row__chevron" width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      }
    </div>
  `,
  styleUrl: './list-row.component.scss',
})
export class ListRowComponent {
  title    = input.required<string>();
  subtitle = input<string>('');
  icon     = input<string>('');
  clickable = input(false);
  rowClick = output<void>();
}
