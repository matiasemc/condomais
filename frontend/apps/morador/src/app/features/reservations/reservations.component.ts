import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BadgeComponent } from '@condomais/ui';
import { ButtonComponent } from '@condomais/ui';
import { Reservation } from '../../core/models';

@Component({
  selector: 'cm-reservations',
  standalone: true,
  imports: [RouterLink, DatePipe, BadgeComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Reservas</h1>
        <cm-button variant="accent" size="sm" routerLink="/reservas/nova">+ Nova</cm-button>
      </div>

      <div class="spaces">
        <p class="spaces__label">Áreas comuns</p>
        <div class="spaces__grid">
          @for (s of espacos; track s.id) {
            <a class="space-card" [routerLink]="['/reservas/nova']" [queryParams]="{ espaco: s.id }">
              <span class="space-card__emoji">{{ s.emoji }}</span>
              <span class="space-card__name">{{ s.nome }}</span>
            </a>
          }
        </div>
      </div>

      <div class="list">
        <p class="list__label">Minhas reservas</p>
        @for (r of reservas(); track r.id) {
          <div class="res-row">
            <div class="res-row__icon">{{ r.espaco.includes('Salão') ? '🎉' : '🏊' }}</div>
            <div class="res-row__body">
              <p class="res-row__title">{{ r.espaco }}</p>
              <p class="res-row__sub">{{ r.data | date:'dd/MM' }} · {{ r.horaInicio }}–{{ r.horaFim }}</p>
            </div>
            <cm-badge [variant]="r.status === 'confirmada' ? 'success' : 'warn'">{{ r.status }}</cm-badge>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './reservations.component.scss',
})
export class ReservationsComponent {
  espacos = [
    { id: 'salao-a', emoji: '🎉', nome: 'Salão A' },
    { id: 'salao-b', emoji: '🥂', nome: 'Salão B' },
    { id: 'piscina', emoji: '🏊', nome: 'Piscina' },
    { id: 'churras', emoji: '🔥', nome: 'Churrasqueira' },
    { id: 'quadra',  emoji: '🎾', nome: 'Quadra' },
    { id: 'gym',     emoji: '🏋️', nome: 'Academia' },
  ];

  reservas = signal<Reservation[]>([
    { id: '1', espaco: 'Salão de Festas A', data: new Date(Date.now() + 7 * 86400000), horaInicio: '19:00', horaFim: '23:00', status: 'confirmada' },
    { id: '2', espaco: 'Piscina', data: new Date(Date.now() + 14 * 86400000), horaInicio: '10:00', horaFim: '12:00', status: 'pendente' },
  ]);
}
