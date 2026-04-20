import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../../../../libs/ui/src/lib/components/card/card.component';
import { BadgeComponent } from '../../../../../libs/ui/src/lib/components/badge/badge.component';
import { SectionHeaderComponent } from '../../../../../libs/ui/src/lib/components/section-header/section-header.component';
import { AvatarComponent } from '../../../../../libs/ui/src/lib/components/avatar/avatar.component';
import { Delivery, Reservation, Announcement } from '../../core/models';

@Component({
  selector: 'cm-home',
  standalone: true,
  imports: [RouterLink, CardComponent, BadgeComponent, SectionHeaderComponent, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home">
      <!-- Header -->
      <div class="home__header">
        <div>
          <p class="home__greeting">Bom dia,</p>
          <h1 class="home__name">{{ userName }}</h1>
        </div>
        <cm-avatar [name]="userName" color="#E8D5C4" [size]="44"></cm-avatar>
      </div>

      <!-- Hero: entrega pendente -->
      @if (pendingDelivery()) {
        <a class="home__hero" [routerLink]="['/entregas', pendingDelivery()!.id]">
          <cm-card [accent]="true">
            <p class="hero__eyebrow">● Entrega aguardando</p>
            <h2 class="hero__title">Sua encomenda<br/>chegou na portaria.</h2>
            <p class="hero__sub">{{ pendingDelivery()!.remetente }} · há poucos minutos</p>
          </cm-card>
        </a>
      }

      <!-- Quick actions -->
      <div class="home__actions">
        <a class="action" routerLink="/avisos">
          <div class="action__icon">📢</div>
          <span>Avisos</span>
        </a>
        <a class="action" routerLink="/reservas">
          <div class="action__icon">🏊</div>
          <span>Reservar</span>
        </a>
        <a class="action" routerLink="/marketplace">
          <div class="action__icon">🛒</div>
          <span>Mercado</span>
        </a>
        <a class="action" routerLink="/perfil">
          <div class="action__icon">🔧</div>
          <span>Configurar</span>
        </a>
      </div>

      <!-- Próxima reserva -->
      @if (nextReservation()) {
        <div class="home__section">
          <cm-section-header title="Sua próxima reserva" eyebrow="Reservas"></cm-section-header>
          <cm-card [flat]="true">
            <cm-badge variant="success">Confirmada</cm-badge>
            <p class="res__title">{{ nextReservation()!.espaco }}</p>
            <p class="res__sub">{{ nextReservation()!.data | date:'dd MMM · EEEE':'':'pt-BR' }} · {{ nextReservation()!.horaInicio }}–{{ nextReservation()!.horaFim }}</p>
          </cm-card>
        </div>
      }

      <!-- Avisos fixados -->
      @if (pinnedAnnouncement()) {
        <div class="home__section">
          <cm-section-header title="Aviso fixado" eyebrow="Comunicados"></cm-section-header>
          <cm-card [flat]="true">
            <div class="announce__bar"></div>
            <div class="announce__body">
              <cm-badge variant="warn">{{ pinnedAnnouncement()!.prioridade }}</cm-badge>
              <p class="announce__title">{{ pinnedAnnouncement()!.titulo }}</p>
              <p class="announce__msg">{{ pinnedAnnouncement()!.mensagem }}</p>
            </div>
          </cm-card>
        </div>
      }
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  userName = 'João Silva';

  pendingDelivery = signal<Delivery | null>({
    id: '1', morador: 'João Silva', apto: '1204', torre: 'B',
    remetente: 'Mercado Livre', tipo: 'Caixa pequena',
    status: 'pendente', criadaEm: new Date(),
  });

  nextReservation = signal<Reservation | null>({
    id: '1', espaco: 'Salão de Festas A',
    data: new Date(Date.now() + 7 * 86400000),
    horaInicio: '19:00', horaFim: '23:00', status: 'confirmada',
  });

  pinnedAnnouncement = signal<Announcement | null>({
    id: '1', titulo: 'Manutenção da piscina',
    mensagem: 'A piscina estará fechada de 22 a 25 de abril para manutenção preventiva.',
    prioridade: 'alta', publicadoEm: new Date(), fixado: true,
  });
}
