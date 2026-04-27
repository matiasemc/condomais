import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import type { ToastData } from '@condomais/ui';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly messageService = inject(MessageService);

  show(data: ToastData): void {
    this.messageService.add({
      severity: mapSeverity(data.type),
      detail: data.message,
      life: data.duration ?? 2400,
    });
  }
}

function mapSeverity(type: ToastData['type']): string {
  if (type === 'error') return 'error';
  if (type === 'warn') return 'warn';
  if (type === 'success') return 'success';
  return 'info';
}
