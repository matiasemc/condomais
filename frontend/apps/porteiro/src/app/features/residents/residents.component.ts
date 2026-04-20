import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchInputComponent, BadgeComponent, AvatarComponent, SectionHeaderComponent, EmptyStateComponent } from '@condomais/ui';

interface Resident {
  id: string;
  name: string;
  unit: string;
  phone: string;
  pendingDeliveries: number;
  status: 'ativo' | 'inativo';
}

@Component({
  selector: 'cm-residents',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SearchInputComponent, BadgeComponent, AvatarComponent, SectionHeaderComponent, EmptyStateComponent],
  templateUrl: './residents.component.html',
  styleUrl: './residents.component.scss',
})
export class ResidentsComponent {
  search = signal('');
  activeFilter = signal<'todos' | 'com_entrega' | 'inativos'>('todos');

  readonly filters = [
    { id: 'todos' as const, label: 'Todos' },
    { id: 'com_entrega' as const, label: 'Com entrega' },
    { id: 'inativos' as const, label: 'Inativos' },
  ];

  readonly allResidents = signal<Resident[]>([
    { id: '1', name: 'Ana Lima',       unit: '101', phone: '11999990001', pendingDeliveries: 2, status: 'ativo' },
    { id: '2', name: 'Bruno Costa',    unit: '102', phone: '11999990002', pendingDeliveries: 0, status: 'ativo' },
    { id: '3', name: 'Carla Souza',    unit: '201', phone: '11999990003', pendingDeliveries: 1, status: 'ativo' },
    { id: '4', name: 'Diego Martins',  unit: '202', phone: '11999990004', pendingDeliveries: 0, status: 'inativo' },
    { id: '5', name: 'Elisa Ferreira', unit: '301', phone: '11999990005', pendingDeliveries: 3, status: 'ativo' },
    { id: '6', name: 'Felipe Nunes',   unit: '302', phone: '11999990006', pendingDeliveries: 0, status: 'ativo' },
  ]);

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    const f = this.activeFilter();
    return this.allResidents().filter(r => {
      const matchSearch = r.name.toLowerCase().includes(q) || r.unit.includes(q);
      const matchFilter = f === 'todos' ? true
        : f === 'com_entrega' ? r.pendingDeliveries > 0
        : r.status === 'inativo';
      return matchSearch && matchFilter;
    });
  });

  setFilter(id: 'todos' | 'com_entrega' | 'inativos') {
    this.activeFilter.set(id);
  }
}
