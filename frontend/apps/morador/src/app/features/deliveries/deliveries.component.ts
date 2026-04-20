import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabBarComponent, TabItem } from '../../../../../libs/ui/src/lib/components/tab-bar/tab-bar.component';
import { BadgeComponent } from '../../../../../libs/ui/src/lib/components/badge/badge.component';
import { EmptyStateComponent } from '../../../../../libs/ui/src/lib/components/empty-state/empty-state.component';
import { Delivery } from '../../core/models';

@Component({
  selector: 'cm-deliveries',
  standalone: true,
  imports: [RouterLink, TabBarComponent, BadgeComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Minhas Entregas</h1>
      </div>
      <div class="page__tabs">
        <cm-tab-bar [tabs]="tabs" [activeId]="activeTab()" (tabChange)="activeTab.set($event)"></cm-tab-bar>
      </div>
      <div class="delivery-list">
        @for (d of filtered(); track d.id) {
          <a class="delivery-row" [routerLink]="['/entregas', d.id]">
            <div class="delivery-row__icon">📦</div>
            <div class="delivery-row__body">
              <p class="delivery-row__title">{{ d.remetente }}</p>
              <p class="delivery-row__sub">{{ d.tipo }} · {{ d.criadaEm | date:'dd/MM HH:mm' }}</p>
            </div>
            <cm-badge [variant]="d.status === 'pendente' ? 'accent' : 'success'">
              {{ d.status === 'pendente' ? 'Aguardando' : 'Retirada' }}
            </cm-badge>
          </a>
        } @empty {
          <cm-empty-state icon="📭" title="Nenhuma entrega"
            subtitle="Você não tem entregas {{ activeTab() === 'pendente' ? 'pendentes' : 'retiradas' }} no momento.">
          </cm-empty-state>
        }
      </div>
    </div>
  `,
  styleUrl: './deliveries.component.scss',
})
export class DeliveriesComponent {
  tabs: TabItem[] = [
    { id: 'pendente', label: 'Aguardando' },
    { id: 'retirada', label: 'Retiradas' },
  ];
  activeTab = signal('pendente');

  deliveries = signal<Delivery[]>([
    { id: '1', morador: 'João Silva', apto: '1204', torre: 'B', remetente: 'Mercado Livre', tipo: 'Caixa pequena', status: 'pendente', criadaEm: new Date() },
    { id: '2', morador: 'João Silva', apto: '1204', torre: 'B', remetente: 'Amazon', tipo: 'Envelope', status: 'pendente', criadaEm: new Date(Date.now() - 86400000) },
    { id: '3', morador: 'João Silva', apto: '1204', torre: 'B', remetente: 'Shopee', tipo: 'Caixa grande', status: 'retirada', criadaEm: new Date(Date.now() - 3 * 86400000) },
  ]);

  filtered = computed(() => this.deliveries().filter(d => d.status === this.activeTab()));
}
