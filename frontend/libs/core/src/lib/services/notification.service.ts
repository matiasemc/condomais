import { Injectable, inject, signal, computed, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeliveryService } from './delivery.service';
import { OccurrenceService } from './occurrence.service';
import type { AppNotification } from '../models/index';

@Injectable({ providedIn: 'root' })
export class NotificationService implements OnDestroy {
  private readonly deliveryService   = inject(DeliveryService);
  private readonly occurrenceService = inject(OccurrenceService);
  private readonly sub = new Subscription();

  readonly notifications = signal<AppNotification[]>([]);
  readonly unreadCount   = computed(() => this.notifications().filter(n => !n.read).length);

  constructor() {
    this.sub.add(
      this.deliveryService.realtimeEvents$.subscribe(event => {
        const d = event.delivery;
        if (event.eventType === 'INSERT') {
          this.push({
            id: crypto.randomUUID(), type: 'nova_entrega', title: 'Nova entrega',
            body: `${d.transportadora ?? d.tipo} chegou — Apto ${d.unidade}`,
            deliveryId: d.id, read: false, createdAt: new Date(),
          });
        } else if (event.eventType === 'UPDATE' && d.status === 'retirada') {
          this.push({
            id: crypto.randomUUID(), type: 'entrega_retirada', title: 'Entrega retirada',
            body: `Entrega do Apto ${d.unidade} foi retirada`,
            deliveryId: d.id, read: false, createdAt: new Date(),
          });
        }
      })
    );

    this.sub.add(
      this.occurrenceService.realtimeEvents$.subscribe(event => {
        const o = event.occurrence;
        if (event.eventType === 'INSERT') {
          this.push({
            id: crypto.randomUUID(), type: 'nova_ocorrencia', title: 'Nova ocorrência',
            body: `${o.titulo ?? o.tipo} registrada`,
            ocorrenciaId: o.id, read: false, createdAt: new Date(),
          });
        } else if (event.eventType === 'UPDATE') {
          const label: Record<string, string> = {
            em_analise: 'Em análise', resolvida: 'Resolvida', encerrada: 'Encerrada',
          };
          const statusLabel = label[o.status];
          if (statusLabel) {
            this.push({
              id: crypto.randomUUID(), type: 'ocorrencia_atualizada',
              title: 'Ocorrência atualizada',
              body: `${o.titulo ?? o.tipo}: ${statusLabel}`,
              ocorrenciaId: o.id, read: false, createdAt: new Date(),
            });
          }
        }
      })
    );
  }

  markAsRead(id: string): void {
    this.notifications.update(list => list.map(n => n.id === id ? { ...n, read: true } : n));
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
