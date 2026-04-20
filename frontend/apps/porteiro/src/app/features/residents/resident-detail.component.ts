import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BadgeComponent, ButtonComponent, AvatarComponent, SectionHeaderComponent, ListRowComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';

interface ResidentDelivery {
  id: string;
  description: string;
  arrivedAt: string;
  status: 'pendente' | 'retirada';
}

interface ResidentProfile {
  id: string;
  name: string;
  unit: string;
  phone: string;
  status: 'ativo' | 'inativo';
  deliveries: ResidentDelivery[];
}

@Component({
  selector: 'cm-resident-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe, BadgeComponent, ButtonComponent, AvatarComponent, SectionHeaderComponent, ListRowComponent],
  templateUrl: './resident-detail.component.html',
  styleUrl: './resident-detail.component.scss',
})
export class ResidentDetailComponent {
  private readonly db: ResidentProfile[] = [
    {
      id: '1', name: 'Ana Lima', unit: '101', phone: '11999990001', status: 'ativo',
      deliveries: [
        { id: 'd1', description: 'Caixa Amazon', arrivedAt: '2026-04-18T10:00:00', status: 'pendente' },
        { id: 'd2', description: 'Correios', arrivedAt: '2026-04-17T14:30:00', status: 'pendente' },
        { id: 'd3', description: 'iFood bag', arrivedAt: '2026-04-10T12:00:00', status: 'retirada' },
      ],
    },
    {
      id: '3', name: 'Carla Souza', unit: '201', phone: '11999990003', status: 'ativo',
      deliveries: [
        { id: 'd4', description: 'Mercado Livre', arrivedAt: '2026-04-19T09:00:00', status: 'pendente' },
      ],
    },
    {
      id: '5', name: 'Elisa Ferreira', unit: '301', phone: '11999990005', status: 'ativo',
      deliveries: [
        { id: 'd5', description: 'Shopee', arrivedAt: '2026-04-20T08:00:00', status: 'pendente' },
        { id: 'd6', description: 'DHL', arrivedAt: '2026-04-19T16:00:00', status: 'pendente' },
        { id: 'd7', description: 'Rappi', arrivedAt: '2026-04-18T20:00:00', status: 'pendente' },
      ],
    },
  ];

  resident = signal<ResidentProfile | null>(null);

  pendingDeliveries = computed(() => this.resident()?.deliveries.filter(d => d.status === 'pendente') ?? []);
  pastDeliveries    = computed(() => this.resident()?.deliveries.filter(d => d.status === 'retirada') ?? []);

  constructor(route: ActivatedRoute, private toast: ToastService) {
    const id = route.snapshot.paramMap.get('id') ?? '';
    const found = this.db.find(r => r.id === id) ?? {
      id, name: 'Morador', unit: '—', phone: '—', status: 'ativo' as const, deliveries: [],
    };
    this.resident.set(found);
  }

  notificar() {
    this.toast.show({ message: 'Notificação enviada via WhatsApp', type: 'success' });
  }
}
