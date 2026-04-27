import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BadgeComponent } from '@condomais/ui';
import { AuthState, MarketplaceService } from '@condomais/core';

@Component({
  selector: 'cm-marketplace',
  standalone: true,
  imports: [DecimalPipe, RouterLink, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Mercado do Condominio</h1>
        <p class="page__sub">Compre e venda com seus vizinhos</p>
      </div>
      <div class="grid">
        @for (item of items(); track item.id) {
          <a class="item-card" [routerLink]="['/marketplace', item.id]">
            <div class="item-card__img">
              @if (item.imageUrl) {
                <img [src]="item.imageUrl" [alt]="item.titulo">
              } @else {
                {{ categoryIcon(item.categoria) }}
              }
            </div>
            <div class="item-card__body">
              <cm-badge variant="neutral">{{ item.categoria }}</cm-badge>
              <p class="item-card__title">{{ item.titulo }}</p>
              <p class="item-card__price">
                @if (item.preco !== null) {
                  R$ {{ item.preco | number:'1.2-2' }}
                } @else {
                  A combinar
                }
              </p>
            </div>
          </a>
        }
      </div>
    </div>
  `,
  styleUrl: './marketplace.component.css',
})
export class MarketplaceComponent {
  private readonly marketplaceService = inject(MarketplaceService);
  private readonly authState = inject(AuthState);

  readonly items = this.marketplaceService.items;

  constructor() {
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant) void this.marketplaceService.loadForTenant(tenant.id);
    });
  }

  categoryIcon(category: string): string {
    return category.toLowerCase().includes('move') ? 'M' : '#';
  }
}
