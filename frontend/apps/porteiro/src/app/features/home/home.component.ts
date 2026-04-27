import { Component, ChangeDetectionStrategy, computed, inject, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KpiCardComponent, BadgeComponent } from '@condomais/ui';
import { AnnouncementService, AuthState, DeliveryService, OccurrenceService } from '@condomais/core';

@Component({
  selector: 'cm-porteiro-home',
  standalone: true,
  imports: [RouterLink, KpiCardComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly authState = inject(AuthState);
  private readonly deliveryService = inject(DeliveryService);
  private readonly announcementService = inject(AnnouncementService);
  private readonly occurrenceService = inject(OccurrenceService);

  readonly deliveries = this.deliveryService.deliveries;

  readonly kpis = computed(() => {
    const deliveries = this.deliveryService.deliveries();
    const announcements = this.announcementService.announcements();
    const occurrences = this.occurrenceService.occurrences();
    const today = new Date().toISOString().slice(0, 10);

    return [
      {
        label: 'Entregas hoje',
        value: deliveries.filter(d => d.createdAt?.slice(0, 10) === today).length,
        inverted: true,
      },
      {
        label: 'Aguardando retirada',
        value: deliveries.filter(d => d.status === 'pendente' || d.status === 'notificada').length,
        inverted: false,
      },
      {
        label: 'Avisos ativos',
        value: announcements.length,
        inverted: false,
      },
      {
        label: 'Ocorrencias abertas',
        value: occurrences.filter(o => o.status === 'aberta' || o.status === 'em_analise').length,
        inverted: false,
      },
    ];
  });

  readonly recentDeliveries = computed(() => this.deliveries().slice(0, 3));

  constructor() {
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (!tenant) return;
      void this.deliveryService.loadForTenant(tenant.id);
      void this.announcementService.loadForTenant(tenant.id);
      void this.occurrenceService.loadForTenant(tenant.id);
    });
  }
}
