import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabBarComponent, BadgeComponent, ListRowComponent, SectionHeaderComponent, EmptyStateComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';
import type { TabItem } from '@condomais/ui';

interface Delivery {
  id: string;
  residentName: string;
  unit: string;
  description: string;
  arrivedAt: string;
  status: 'pendente' | 'retirada';
}

@Component({
  selector: 'cm-deliveries',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TabBarComponent, BadgeComponent, ListRowComponent, SectionHeaderComponent, EmptyStateComponent],
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.scss',
})
export class DeliveriesComponent {
  readonly tabs: TabItem[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'aguardando', label: 'Aguardando' },
    { id: 'retiradas', label: 'Retiradas' },
  ];

  activeTab = signal('todas');

  readonly allDeliveries = signal<Delivery[]>([
    { id: '1', residentName: 'Ana Lima',       unit: '101', description: 'Caixa Amazon',  arrivedAt: '2026-04-18T10:00:00', status: 'pendente' },
    { id: '2', residentName: 'Ana Lima',       unit: '101', description: 'Correios',      arrivedAt: '2026-04-17T14:30:00', status: 'pendente' },
    { id: '3', residentName: 'Carla Souza',    unit: '201', description: 'Mercado Livre', arrivedAt: '2026-04-19T09:00:00', status: 'pendente' },
    { id: '4', residentName: 'Elisa Ferreira', unit: '301', description: 'Shopee',        arrivedAt: '2026-04-20T08:00:00', status: 'pendente' },
    { id: '5', residentName: 'Bruno Costa',    unit: '102', description: 'iFood bag',     arrivedAt: '2026-04-10T12:00:00', status: 'retirada' },
    { id: '6', residentName: 'Felipe Nunes',   unit: '302', description: 'DHL',           arrivedAt: '2026-04-09T16:00:00', status: 'retirada' },
  ]);

  filtered = computed(() => {
    const tab = this.activeTab();
    return this.allDeliveries().filter(d =>
      tab === 'todas' ? true : tab === 'aguardando' ? d.status === 'pendente' : d.status === 'retirada'
    );
  });

  constructor(private toast: ToastService) {}

  marcarRetirada(d: Delivery) {
    this.allDeliveries.update(list => list.map(item =>
      item.id === d.id ? { ...item, status: 'retirada' as const } : item
    ));
    this.toast.show({ message: `Entrega de ${d.residentName} marcada como retirada`, type: "success" });
  }
}