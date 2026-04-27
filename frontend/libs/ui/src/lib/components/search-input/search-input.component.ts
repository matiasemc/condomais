import { Component, input, output, model, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cm-search-input',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="search">
      <svg class="search__icon" width="18" height="18" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
        <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
      </svg>
      <input class="search__input" type="search"
             [placeholder]="placeholder()"
             [(ngModel)]="value"
             (ngModelChange)="valueChange.emit($event)" />
    </div>
  `,
  styleUrl: './search-input.component.css',
})
export class SearchInputComponent {
  placeholder = input('Buscarâ€¦');
  value       = model('');
  valueChange = output<string>();
}
