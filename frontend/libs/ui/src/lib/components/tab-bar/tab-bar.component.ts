import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'cm-tab-bar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tab-bar">
      @for (tab of tabs(); track tab.id) {
        <button class="tab-bar__item"
                [class.tab-bar__item--active]="activeId() === tab.id"
                (click)="tabChange.emit(tab.id)">
          {{ tab.label }}
        </button>
      }
    </div>
  `,
  styleUrl: './tab-bar.component.scss',
})
export class TabBarComponent {
  tabs     = input.required<TabItem[]>();
  activeId = input.required<string>();
  tabChange = output<string>();
}
