import { Injectable, inject, signal, computed, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeliveryService } from './delivery.service';
import type { AppNotification } from '../models/index';

@Injectable({ providedIn: 'root' })
export class NotificationService implements OnDestroy {
  private readonly deliveryService = inject(DeliveryService);
  private readonly sub: Subscription;

  readonly notifications = signal<AppNotification[]>([]);
  readonly unreadCount   = computed(() => this.notifications().filter(n => !n.read).length);

  constructor() {
    this.sub = this.deliveryService.realtimeEvents$.subscribe(event => {
      if (event.eventType === 'INSERT') {
        const d = event.delivery;
        this.push({
          id:         crypto.randomUUID(),
          type:       'nova_entrega',
          title:      'Nova entrega',
          body:       `${d.transportadora ?? d.tipo} chegou — Apto ${d.unidade}`,
          deliveryId: d.id,
          read:       false,
          createdAt:  new Date(),
        });
      } else if (event.eventType === 'UPDATE' && event.delivery.status === 'retirada') {
        const d = event.delivery;
        this.push({
          id:         crypto.randomUUID(),
          type:       'entrega_retirada',
          title:      'Entrega retirada',
          body:       `Entrega do Apto ${d.unidade} foi retirada`,
          deliveryId: d.id,
          read:       false,
          createdAt:  new Date(),
        });
      }
    });
  }

  markAsRead(id: string): void {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this.notifications.update(list => list.map(n => ({ ...n, read: true })));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private push(n: AppNotification): void {
    this.notifications.update(list => [n, ...list].slice(0, 50));
  }
}
