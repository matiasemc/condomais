import { Component, ChangeDetectionStrategy, signal, computed, inject, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TabBarComponent, BadgeComponent, EmptyStateComponent, ButtonComponent } from '@condomais/ui';
import { OccurrenceService, AuthState } from '@condomais/core';
import type { TabItem } from '@condomais/ui';

@Component({
  selector: 'cm-occurrences',
  standalone: true,
  imports: [RouterLink, DatePipe, TabBarComponent, BadgeComponent, EmptyStateComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Ocorrências</h1>
        <a routerLink="/ocorrencias/nova">
          <cm-button size="sm">+ Nova</cm-button>
        </a>
      </div>
      <div class="page__tabs">
        <cm-tab-bar [tabs]="tabs" [activeId]="activeTab()" (tabChange)="activeTab.set($event)"></cm-tab-bar>
      </div>
      <div class="occurrence-list">
        @if (isLoading()) {
          <cm-empty-state icon="⏳" title="Carregando…" subtitle="Buscando suas ocorrências"></cm-empty-state>
        } @else {
          @for (o of filtered(); track o.id) {
            <a class="occurrence-row" [routerLink]="['/ocorrencias', o.id]">
              <div class="occurrence-row__icon">{{ tipoIcon(o.tipo) }}</div>
              <div class="occurrence-row__body">
                <p class="occurrence-row__title">{{ o.titulo ?? o.tipo }}</p>
                <p class="occurrence-row__sub">{{ o.tipo }} · {{ o.createdAt | date:'dd/MM HH:mm' }}</p>
              </div>
              <cm-badge [variant]="statusVariant(o.status)">{{ statusLabel(o.status) }}</cm-badge>
            </a>
          } @empty {
            <cm-empty-state icon="📋" title="Nenhuma ocorrência"
              [subtitle]="'Você não tem ocorrências ' + (activeTab() === 'aberta' ? 'abertas' : 'resolvidas') + '.'">
            </cm-empty-state>
          }
        }
      </div>
    </div>
  `,
  styleUrl: './occurrences.component.scss',
})
export class OccurrencesComponent {
  private readonly occurrenceSvc = inject(OccurrenceService);
  private readonly authState     = inject(AuthState);

  tabs: TabItem[] = [
    { id: 'aberta',    label: 'Abertas' },
    { id: 'resolvida', label: 'Resolvidas' },
  ];

  activeTab   = signal('aberta');
  isLoading   = this.occurrenceSvc.isLoading;
  occurrences = this.occurrenceSvc.occurrences;

  filtered = computed(() => {
    const tab  = this.activeTab();
    const list = this.occurrences();
    if (tab === 'aberta') return list.filter(o => o.status === 'aberta' || o.status === 'em_analise');
    return list.filter(o => o.status === 'resolvida' || o.status === 'encerrada');
  });

  constructor() {
    effect(() => {
      const user   = this.authState.user();
      const tenant = this.authState.currentTenant();
      if (user && tenant) {
        this.occurrenceSvc.loadMyOccurrences(tenant.id, user.id);
      }
    });
  }

  tipoIcon(tipo: string): string {
    const map: Record<string, string> = {
      ruido: '🔊', vandalismo: '🔨', acidente: '⚠️',
      entrada_suspeita: '👀', entrada_nao_autorizada: '🚫', outro: '📋',
    };
    return map[tipo] ?? '📋';
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
