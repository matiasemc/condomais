import { Component, ChangeDetectionStrategy, inject, computed, signal, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BadgeComponent, EmptyStateComponent, SearchInputComponent } from '@condomais/ui';
import { DeliveryService, AuthState } from '@condomais/core';

@Component({
  selector: 'cm-admin-deliveries',
  standalone: true,
  imports: [DatePipe, BadgeComponent, EmptyStateComponent, SearchInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Entregas</h2>
        <span class="admin-page__count">{{ filtered().length }} resultado(s)</span>
      </div>

      <div class="admin-page__filters">
        <cm-search-input placeholder="Buscar por unidade ou transportadora..."
          (valueChange)="search.set($event)"></cm-search-input>
        <div class="filter-tabs">
          @for (tab of tabs; track tab.id) {
            <button class="filter-tab" [class.filter-tab--active]="activeTab() === tab.id"
              (click)="activeTab.set(tab.id)">{{ tab.label }}</button>
          }
        </div>
      </div>

      @if (svc.isLoading()) {
        <cm-empty-state icon="⏳" title="Carregando…" subtitle=""></cm-empty-state>
      } @else {
        <div class="delivery-table">
          @for (d of filtered(); track d.id) {
            <div class="delivery-row">
              <div class="delivery-row__body">
                <p class="delivery-row__unit">Unidade {{ d.unidade }}</p>
                <p class="delivery-row__meta">{{ d.tipo }}{{ d.transportadora ? ' · ' + d.transportadora : '' }} · {{ d.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
              </div>
              <div class="delivery-row__right">
                <cm-badge [variant]="d.status === 'pendente' ? 'warning' : 'success'">{{ d.status }}</cm-badge>
                @if (d.status === 'pendente') {
                  <button class="btn-retirada" (click)="marcarRetirada(d.id)">Marcar retirada</button>
                }
              </div>
            </div>
          } @empty {
            <cm-empty-state icon="📦" title="Nenhuma entrega encontrada" subtitle="Tente ajustar os filtros."></cm-empty-state>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .filter-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
    .filter-tab { padding: 6px 14px; background: #f3f4f6; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; color: #374151; }
    .filter-tab--active { background: #2d6a4f; color: #fff; }
    .delivery-table { display: flex; flex-direction: column; gap: 0; }
    .delivery-row { display: flex; align-items: flex-start; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #e5e7eb; }
    .delivery-row:last-child { border-bottom: none; }
    .delivery-row__unit { font-weight: 600; font-size: 15px; }
    .delivery-row__meta { font-size: 13px; color: #6b7280; margin-top: 2px; }
    .delivery-row__right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
    .btn-retirada { font-size: 12px; background: #2d6a4f; color: #fff; border: none; border-radius: 6px; padding: 4px 10px; cursor: pointer; }
  `],
})
export class AdminDeliveriesComponent {
  protected readonly svc  = inject(DeliveryService);
  private  readonly state = inject(AuthState);

  tabs = [
    { id: 'all',      label: 'Todas' },
    { id: 'pendente', label: 'Pendentes' },
    { id: 'retirada', label: 'Retiradas' },
  ];
  activeTab = signal('all');
  search    = signal('');

  filtered = computed(() => {
    const tab   = this.activeTab();
    const query = this.search().toLowerCase();
    return this.svc.deliveries()
      .filter(d => tab === 'all' || d.status === tab)
      .filter(d => !query || d.unidade.toLowerCase().includes(query) || (d.transportadora ?? '').toLowerCase().includes(query));
  });

  constructor() {
    effect(() => {
      const tenant = this.state.currentTenant();
      if (tenant) this.svc.loadForTenant(tenant.id);
    });
  }

  async marcarRetirada(id: string): Promise<void> {
    const user = this.state.currentUser();
    if (!user) return;
    await this.svc.marcarRetirada(id, user.id);
  }
}
