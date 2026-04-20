import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { BadgeComponent } from '../../../../../libs/ui/src/lib/components/badge/badge.component';
import { Notification } from '../../core/models';

@Component({
  selector: 'cm-notifications',
  standalone: true,
  imports: [DatePipe, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  location = inject(Location);
  icons: Record<string, string> = { entrega: '📦', reserva: '📅', aviso: '📢', sistema: '🔔' };

  notifs = signal<Notification[]>([
    { id: '1', titulo: 'Entrega chegou!', mensagem: 'Mercado Livre · Portaria principal', lido: false, criadaEm: new Date(), tipo: 'entrega' },
    { id: '2', titulo: 'Reserva confirmada', mensagem: 'Salao A · 27 abr 19:00', lido: false, criadaEm: new Date(Date.now() - 3600000), tipo: 'reserva' },
    { id: '3', titulo: 'Novo aviso', mensagem: 'Manutencao da piscina 22-25 abr', lido: true, criadaEm: new Date(Date.now() - 86400000), tipo: 'aviso' },
  ]);

  markRead(id: string): void {
    this.notifs.update(ns => ns.map(n => n.id === id ? { ...n, lido: true } : n));
  }
}
