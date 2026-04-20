import { Component, input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ToastData {
  message: string;
  icon?: string;
  type?: 'success' | 'info' | 'warn' | 'error';
  duration?: number;
}

@Component({
  selector: 'cm-toast',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (toast()) {
      <div class="toast">
        @if (toast()!.icon) {
          <span class="toast__icon">{{ toast()!.icon }}</span>
        }
        <span class="toast__msg">{{ toast()!.message }}</span>
      </div>
    }
  `,
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  toast = input<ToastData | null>(null);
}
