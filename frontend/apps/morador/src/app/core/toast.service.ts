import { Injectable, signal } from '@angular/core';
import { ToastData } from '../../../../libs/ui/src/index';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toast = signal<ToastData | null>(null);
  private timer: ReturnType<typeof setTimeout> | null = null;

  show(data: ToastData): void {
    if (this.timer) clearTimeout(this.timer);
    this.toast.set(data);
    this.timer = setTimeout(() => this.toast.set(null), data.duration ?? 2400);
  }
}
