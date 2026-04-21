import { Component, ChangeDetectionStrategy, signal, computed, inject, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BadgeComponent, EmptyStateComponent, SearchInputComponent, TabBarComponent } from '@condomais/ui';
import { OccurrenceService, AuthState } from '@condomais/core';
import type { TabItem } from '@condomais/ui';

@Component({
  selector: 'cm-admin-occurrences',
  standalone: true,
  imports: [RouterLink, DatePipe, BadgeComponent, EmptyStateComponent, SearchInputComponent, TabBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Ocorrências</h2>
        <span class="admin-page__count">{{ filtered().length }} resultado(s)</span>
      </div>

      <div class="admin-page__filters">
        <cm-search-input placeholder="Buscar por título ou descrição..."
          (valueChange)="search.set($event)"></cm-search-input>
        <cm-tab-bar [tabs]="tabs" [activeId]="activeTab()" (tabChange)="activeTab.set($event)"></cm-tab-bar>
      </div>

      @if (isLoading()) {
        <cm-empty-state icon="⏳" title="Carregando…" subtitle=""></cm-empty-state>
      } @else {
        <div class="occurrence-table">
          @for (o of filtered(); track o.id) {
            <a class="occurrence-row" [routerLink]="['/ocorrencias', o.id]">
              <div class="occurrence-row__body">
                <p class="occurrence-row__titulo">{{ o.titulo ?? o.tipo }}</p>
                <p class="occurrence-row__meta">{{ o.tipo }} · {{ o.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
              </div>
              <cm-badge [variant]="statusVariant(o.status)">{{ statusLabel(o.status) }}</cm-badge>
            </a>
          } @empty {
            <cm-empty-state icon="📋" title="Nenhuma ocorrência encontrada" subtitle="Tente ajustar os filtros."></cm-empty-state>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './occurrences.component.scss',
})
export class AdminOccurrencesComponent {
  private readonly occurrenceSvc = inject(OccurrenceService);
  private readonly authState     = inject(AuthState);

  tabs: TabItem[] = [
    { id: 'all',        label: 'Todas' },
    { id: 'aberta',     label: 'Abertas' },
    { id: 'em_analise', label: 'Em Análise' },
    { id: 'resolvida',  label: 'Resolvidas' },
  ];

  activeTab   = signal('all');
  search      = signal('');
  isLoading   = this.occurrenceSvc.isLoading;
  occurrences = this.occurrenceSvc.occurrences;

  filtered = computed(() => {
    const tab   = this.activeTab();
    const query = this.search().toLowerCase();
    return this.occurrences()
      .filter(o => tab === 'all' || o.status === tab)
      .filter(o => !query || (o.titulo ?? o.tipo).toLowerCase().includes(query) || o.descricao.toLowerCase().includes(query));
  });

  constructor() {
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant) {
        this.occurrenceSvc.loadForTenant(tenant.id);
      }
    });
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      aberta: 'Aberta', em_analise: 'Em análise',
      resolvida: 'Resolvida', encerrada: 'Encerrada',
    };
    return map[status] ?? status;
  }

  statusVariant(status: string): 'accent' | 'warning' | 'success' {
    if (status === 'aberta') return 'accent';
    if (status === 'em_analise') return 'warning';
    return 'success';
  }
}
