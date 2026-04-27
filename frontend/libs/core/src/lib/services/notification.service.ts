import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { DeliveryService } from './delivery.service';
import { OccurrenceService } from './occurrence.service';
import type { AppNotification } from '../interfaces/index.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly deliveryService = inject(DeliveryService);
  private readonly occurrenceService = inject(OccurrenceService);

  readonly notifications = signal<AppNotification[]>([]);
  readonly unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  constructor() {
    effect(() => {
      const event = this.deliveryService.realtimeEvent();
      if (!event) return;

      const delivery = event.delivery;
      if (event.eventType === 'INSERT') {
        this.push({
          id: crypto.randomUUID(),
          type: 'nova_entrega',
          title: 'Nova entrega',
          body: `${delivery.transportadora ?? delivery.tipo} chegou - Apto ${delivery.unidade}`,
          deliveryId: delivery.id,
          read: false,
          createdAt: new Date(),
        });
      } else if (event.eventType === 'UPDATE' && delivery.status === 'retirada') {
        this.push({
          id: crypto.randomUUID(),
          type: 'entrega_retirada',
          title: 'Entrega retirada',
          body: `Entrega do Apto ${delivery.unidade} foi retirada`,
          deliveryId: delivery.id,
          read: false,
          createdAt: new Date(),
        });
      }
    });

    effect(() => {
      const event = this.occurrenceService.realtimeEvent();
      if (!event) return;

      const occurrence = event.occurrence;
      if (event.eventType === 'INSERT') {
        this.push({
          id: crypto.randomUUID(),
          type: 'nova_ocorrencia',
          title: 'Nova ocorrencia',
          body: `${occurrence.titulo ?? occurrence.tipo} registrada`,
          ocorrenciaId: occurrence.id,
          read: false,
          createdAt: new Date(),
        });
        return;
      }

      const label: Partial<Record<typeof occurrence.status, string>> = {
        em_analise: 'Em analise',
        resolvida: 'Resolvida',
        encerrada: 'Encerrada',
      };
      const statusLabel = label[occurrence.status];
      if (statusLabel) {
        this.push({
          id: crypto.randomUUID(),
          type: 'ocorrencia_atualizada',
          title: 'Ocorrencia atualizada',
          body: `${occurrence.titulo ?? occurrence.tipo}: ${statusLabel}`,
          ocorrenciaId: occurrence.id,
          read: false,
          createdAt: new Date(),
        });
      }
    });
  }

  markAsRead(id: string): void {
    this.notifications.update(list => list.map(n => n.id === id ? { ...n, read: true } : n));
  }

  markAllAsRead(): void {
    this.notifications.update(list => list.map(n => ({ ...n, read: true })));
  }

  private push(notification: AppNotification): void {
    this.notifications.update(list => [notification, ...list].slice(0, 50));
  }
}
