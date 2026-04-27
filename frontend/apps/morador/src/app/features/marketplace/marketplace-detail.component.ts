import { Component, ChangeDetectionStrategy, inject, input, signal, effect } from '@angular/core';
import { DecimalPipe, Location } from '@angular/common';
import { ButtonComponent, BadgeComponent } from '@condomais/ui';
import { MarketplaceService } from '@condomais/core';
import type { MarketplaceItem } from '@condomais/core';

@Component({
  selector: 'cm-marketplace-detail',
  standalone: true,
  imports: [ButtonComponent, BadgeComponent, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="detail">
      <button class="back-btn" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Mercado
      </button>
      @if (item(); as current) {
        <div class="detail__img">
          @if (current.imageUrl) {
            <img [src]="current.imageUrl" [alt]="current.titulo">
          } @else {
            {{ categoryIcon(current.categoria) }}
          }
        </div>
        <cm-badge variant="neutral">{{ current.categoria }}</cm-badge>
        <h1 class="detail__title">{{ current.titulo }}</h1>
        <p class="detail__price">
          @if (current.preco !== null) {
            R$ {{ current.preco | number:'1.2-2' }}
          } @else {
            A combinar
          }
        </p>
        <p class="detail__desc">{{ current.descricao }}</p>
        <div class="detail__seller">
          <div class="seller-avatar">{{ initials(current.vendedor) }}</div>
          <div>
            <p class="seller-name">{{ current.vendedor || 'Morador' }}</p>
            <p class="seller-apto">{{ current.whatsapp || 'Contato pelo condominio' }}</p>
          </div>
        </div>
        <cm-button variant="whatsapp" size="lg" style="width:100%">
          Contatar via WhatsApp
        </cm-button>
      }
    </div>
  `,
  styleUrl: './marketplace-detail.component.css',
})
export class MarketplaceDetailComponent {
  private readonly marketplaceService = inject(MarketplaceService);

  readonly id = input<string>('');
  readonly location = inject(Location);
  readonly item = signal<MarketplaceItem | null>(null);

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) void this.loadItem(id);
    });
  }

  categoryIcon(category: string): string {
    return category.toLowerCase().includes('move') ? 'M' : '#';
  }

  initials(name?: string): string {
    return (name ?? 'Morador')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  private async loadItem(id: string): Promise<void> {
    this.item.set(await this.marketplaceService.loadById(id));
  }
}
