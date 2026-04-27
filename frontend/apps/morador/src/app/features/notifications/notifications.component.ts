import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { NotificationService } from '@condomais/core';
import type { NotificationType } from '@condomais/core';

@Component({
  selector: 'cm-notifications',
  standalone: true,
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  private readonly notificationService = inject(NotificationService);

  readonly location = inject(Location);
  readonly notifs = this.notificationService.notifications;
  readonly icons: Record<NotificationType, string> = {
    nova_entrega: 'EN',
    entrega_retirada: 'OK',
    nova_ocorrencia: 'OC',
    ocorrencia_atualizada: 'UP',
  };

  markRead(id: string): void {
    this.notificationService.markAsRead(id);
  }
}
