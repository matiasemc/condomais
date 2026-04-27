import { Component, signal, computed, inject, effect, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabBarComponent, BadgeComponent, ListRowComponent, SectionHeaderComponent, EmptyStateComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';
import { DeliveryService, AuthState } from '@condomais/core';
import type { TabItem } from '@condomais/ui';
import type { Delivery } from '@condomais/core';

@Component({
  selector: 'cm-deliveries',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TabBarComponent, BadgeComponent, ListRowComponent, SectionHeaderComponent, EmptyStateComponent],
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.css',
})
export class DeliveriesComponent {
  private readonly deliveryService = inject(DeliveryService);
  private readonly authState       = inject(AuthState);
  private readonly toast           = inject(ToastService);

  readonly tabs: TabItem[] = [
    { id: 'todas',      label: 'Todas' },
    { id: 'aguardando', label: 'Aguardando' },
    { id: 'retiradas',  label: 'Retiradas' },
  ];

  activeTab  = signal('todas');
  isLoading  = this.deliveryService.isLoading;
  deliveries = this.deliveryService.deliveries;

  filtered = computed(() => {
    const tab  = this.activeTab();
    const list = this.deliveries();
    if (tab === 'todas')      return list;
    if (tab === 'aguardando') return list.filter(d => d.status === 'pendente' || d.status === 'notificada');
    return list.filter(d => d.status === 'retirada');
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => this.deliveryService.stopRealtime());
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant) this.deliveryService.loadForTenant(tenant.id);
    });
  }

  async marcarRetirada(d: Delivery): Promise<void> {
    const user = this.authState.user();
    const quem = user?.email ?? 'Porteiro';
    const ok = await this.deliveryService.marcarRetirada(d.id, quem);
    if (ok) {
      this.toast.show({ message: `Apto ${d.unidade} â€” entrega marcada como retirada`, type: 'success' });
    } else {
      this.toast.show({ message: 'Erro ao atualizar entrega', type: 'error' });
    }
  }
}