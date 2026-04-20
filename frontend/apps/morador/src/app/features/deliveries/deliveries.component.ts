import { Component, ChangeDetectionStrategy, signal, computed, inject, effect, DestroyRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TabBarComponent, BadgeComponent, EmptyStateComponent } from '@condomais/ui';
import { DeliveryService, AuthState } from '@condomais/core';
import type { TabItem } from '@condomais/ui';

@Component({
  selector: 'cm-deliveries',
  standalone: true,
  imports: [DatePipe, RouterLink, TabBarComponent, BadgeComponent, EmptyStateComponent],
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
        @if (isLoading()) {
          <cm-empty-state icon="⏳" title="Carregando…" subtitle="Buscando suas entregas"></cm-empty-state>
        } @else {
          @for (d of filtered(); track d.id) {
            <a class="delivery-row" [routerLink]="['/entregas', d.id]">
              <div class="delivery-row__icon">📦</div>
              <div class="delivery-row__body">
                <p class="delivery-row__title">{{ d.transportadora ?? d.tipo }}</p>
                <p class="delivery-row__sub">{{ d.tipo }} · {{ d.createdAt | date:'dd/MM HH:mm' }}</p>
              </div>
              <cm-badge [variant]="d.status === 'pendente' || d.status === 'notificada' ? 'accent' : 'success'">
                {{ d.status === 'retirada' ? 'Retirada' : 'Aguardando' }}
              </cm-badge>
            </a>
          } @empty {
            <cm-empty-state icon="📭" title="Nenhuma entrega"
              [subtitle]="'Você não tem entregas ' + (activeTab() === 'pendente' ? 'pendentes' : 'retiradas') + ' no momento.'">
            </cm-empty-state>
          }
        }
      </div>
    </div>
  `,
  styleUrl: './deliveries.component.scss',
})
export class DeliveriesComponent {
  private readonly deliveryService = inject(DeliveryService);
  private readonly authState       = inject(AuthState);

  tabs: TabItem[] = [
    { id: 'pendente', label: 'Aguardando' },
    { id: 'retirada', label: 'Retiradas' },
  ];

  activeTab  = signal('pendente');
  isLoading  = this.deliveryService.isLoading;
  deliveries = this.deliveryService.deliveries;

  filtered = computed(() => {
    const tab  = this.activeTab();
    const list = this.deliveries();
    if (tab === 'pendente') return list.filter(d => d.status === 'pendente' || d.status === 'notificada');
    return list.filter(d => d.status === 'retirada');
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => this.deliveryService.stopRealtime());
    effect(() => {
      const user   = this.authState.user();
      const tenant = this.authState.currentTenant();
      if (user && tenant) {
        this.deliveryService.loadForUser(user.id);
      }
    });
  }
}
