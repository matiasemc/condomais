import { Component, ChangeDetectionStrategy, inject, computed, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardComponent, BadgeComponent, SectionHeaderComponent, AvatarComponent } from '@condomais/ui';
import { AnnouncementService, AuthState, DeliveryService, ReservationService } from '@condomais/core';

@Component({
  selector: 'cm-home',
  standalone: true,
  imports: [DatePipe, RouterLink, CardComponent, BadgeComponent, SectionHeaderComponent, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home">
      <div class="home__header">
        <div>
          <p class="home__greeting">Bom dia,</p>
          <h1 class="home__name">{{ userName() }}</h1>
        </div>
        <cm-avatar [name]="userName()" color="#E8D5C4" [size]="44"></cm-avatar>
      </div>

      @if (pendingDelivery(); as delivery) {
        <a class="home__hero" [routerLink]="['/entregas', delivery.id]">
          <cm-card [accent]="true">
            <p class="hero__eyebrow">Entrega aguardando</p>
            <h2 class="hero__title">Sua encomenda<br/>chegou na portaria.</h2>
            <p class="hero__sub">{{ delivery.transportadora || delivery.tipo }} - {{ delivery.createdAt | date:'dd/MM HH:mm' }}</p>
          </cm-card>
        </a>
      }

      <div class="home__actions">
        <a class="action" routerLink="/avisos">
          <div class="action__icon">i</div>
          <span>Avisos</span>
        </a>
        <a class="action" routerLink="/reservas">
          <div class="action__icon">R</div>
          <span>Reservar</span>
        </a>
        <a class="action" routerLink="/marketplace">
          <div class="action__icon">$</div>
          <span>Mercado</span>
        </a>
        <a class="action" routerLink="/perfil">
          <div class="action__icon">C</div>
          <span>Configurar</span>
        </a>
      </div>

      @if (nextReservation(); as reservation) {
        <div class="home__section">
          <cm-section-header title="Sua proxima reserva" eyebrow="Reservas"></cm-section-header>
          <cm-card [flat]="true">
            <cm-badge variant="success">Confirmada</cm-badge>
            <p class="res__title">{{ reservation.equipamento?.nome || 'Area comum' }}</p>
            <p class="res__sub">{{ reservation.data | date:'dd/MM/yyyy':'UTC' }} - {{ reservation.horaInicio }}-{{ reservation.horaFim }}</p>
          </cm-card>
        </div>
      }

      @if (pinnedAnnouncement(); as announcement) {
        <div class="home__section">
          <cm-section-header title="Aviso fixado" eyebrow="Comunicados"></cm-section-header>
          <cm-card [flat]="true">
            <div class="announce__bar"></div>
            <div class="announce__body">
              <cm-badge variant="warn">{{ announcement.prioridade }}</cm-badge>
              <p class="announce__title">{{ announcement.titulo }}</p>
              <p class="announce__msg">{{ announcement.mensagem }}</p>
            </div>
          </cm-card>
        </div>
      }
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly authState = inject(AuthState);
  private readonly deliveryService = inject(DeliveryService);
  private readonly reservationService = inject(ReservationService);
  private readonly announcementService = inject(AnnouncementService);

  readonly userName = computed(() => this.authState.profile()?.name ?? this.authState.user()?.email ?? 'Morador');

  readonly pendingDelivery = computed(() =>
    this.deliveryService.deliveries().find(delivery => delivery.status === 'pendente' || delivery.status === 'notificada') ?? null,
  );

  readonly nextReservation = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return this.reservationService.reservations()
      .filter(reservation => reservation.status === 'confirmada' && reservation.data >= today)
      .sort((a, b) => `${a.data} ${a.horaInicio}`.localeCompare(`${b.data} ${b.horaInicio}`))[0] ?? null;
  });

  readonly pinnedAnnouncement = computed(() =>
    this.announcementService.announcements().find(announcement => announcement.fixado) ?? null,
  );

  constructor() {
    effect(() => {
      const tenant = this.authState.currentTenant();
      const user = this.authState.user();
      if (!tenant || !user) return;
      void this.deliveryService.loadForUser(user.id, tenant.id);
      void this.reservationService.loadMyReservations(tenant.id, user.id);
      void this.announcementService.loadForTenant(tenant.id);
    });
  }
}
