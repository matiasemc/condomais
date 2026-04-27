import { Component, signal, computed, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchInputComponent, BadgeComponent, AvatarComponent, SectionHeaderComponent, EmptyStateComponent } from '@condomais/ui';
import { AuthState, ResidentService } from '@condomais/core';

@Component({
  selector: 'cm-residents',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SearchInputComponent, BadgeComponent, AvatarComponent, SectionHeaderComponent, EmptyStateComponent],
  templateUrl: './residents.component.html',
  styleUrl: './residents.component.css',
})
export class ResidentsComponent {
  private readonly authState = inject(AuthState);
  private readonly residentService = inject(ResidentService);

  search = signal('');
  activeFilter = signal<'todos' | 'com_entrega' | 'inativos'>('todos');

  readonly isLoading = this.residentService.isLoading;
  readonly residents = this.residentService.residents;

  readonly filters = [
    { id: 'todos' as const, label: 'Todos' },
    { id: 'com_entrega' as const, label: 'Com entrega' },
    { id: 'inativos' as const, label: 'Inativos' },
  ];

  readonly filtered = computed(() => {
    const q = this.search().toLowerCase();
    const f = this.activeFilter();
    return this.residents().filter(r => {
      const matchSearch = r.name.toLowerCase().includes(q) || r.unit.includes(q);
      const matchFilter = f === 'todos' ? true
        : f === 'com_entrega' ? r.pendingDeliveries > 0
        : r.status === 'inativo';
      return matchSearch && matchFilter;
    });
  });

  constructor() {
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant) void this.residentService.loadForTenant(tenant.id);
    });
  }

  setFilter(id: 'todos' | 'com_entrega' | 'inativos'): void {
    this.activeFilter.set(id);
  }
}
