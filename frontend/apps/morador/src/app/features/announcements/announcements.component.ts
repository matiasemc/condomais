import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent } from '../../../../../libs/ui/src/lib/components/badge/badge.component';
import { Announcement } from '../../core/models';

@Component({
  selector: 'cm-announcements',
  standalone: true,
  imports: [RouterLink, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Avisos</h1>
      </div>
      <div class="list">
        @for (a of avisos(); track a.id) {
          <a class="announce-row" [routerLink]="['/avisos', a.id]">
            <div class="announce-row__bar" [class]="'announce-row__bar--' + a.prioridade"></div>
            <div class="announce-row__body">
              <div class="announce-row__top">
                <span class="announce-row__title">{{ a.titulo }}</span>
                @if (a.fixado) { <cm-badge variant="accent">Fixado</cm-badge> }
              </div>
              <p class="announce-row__msg">{{ a.mensagem }}</p>
              <span class="announce-row__date">{{ a.publicadoEm | date:'dd/MM/yyyy' }}</span>
            </div>
          </a>
        }
      </div>
    </div>
  `,
  styleUrl: './announcements.component.scss',
})
export class AnnouncementsComponent {
  avisos = signal<Announcement[]>([
    { id: '1', titulo: 'Manutenção da piscina', mensagem: 'A piscina estará fechada de 22 a 25 de abril.', prioridade: 'alta', publicadoEm: new Date(), fixado: true },
    { id: '2', titulo: 'Reunião de condôminos', mensagem: 'Reunião ordinária no salão principal no dia 30 às 19h.', prioridade: 'media', publicadoEm: new Date(Date.now() - 86400000), fixado: false },
    { id: '3', titulo: 'Limpeza das calçadas', mensagem: 'Calçadas serão lavadas na quinta-feira.', prioridade: 'baixa', publicadoEm: new Date(Date.now() - 2 * 86400000), fixado: false },
  ]);
}
