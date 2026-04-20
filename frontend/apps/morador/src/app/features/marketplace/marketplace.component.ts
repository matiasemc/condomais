import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BadgeComponent } from '@condomais/ui';
import { MarketplaceItem } from '../../core/models';

@Component({
  selector: 'cm-marketplace',
  standalone: true,
  imports: [DecimalPipe, RouterLink, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Mercado do Condomínio</h1>
        <p class="page__sub">Compre e venda com seus vizinhos</p>
      </div>
      <div class="grid">
        @for (item of items(); track item.id) {
          <a class="item-card" [routerLink]="['/marketplace', item.id]">
            <div class="item-card__img">{{ item.categoria === 'Móveis' ? '🪑' : '📦' }}</div>
            <div class="item-card__body">
              <cm-badge variant="neutral">{{ item.categoria }}</cm-badge>
              <p class="item-card__title">{{ item.titulo }}</p>
              <p class="item-card__price">R$ {{ item.preco | number:'1.2-2' }}</p>
            </div>
          </a>
        }
      </div>
    </div>
  `,
  styleUrl: './marketplace.component.scss',
})
export class MarketplaceComponent {
  items = signal<MarketplaceItem[]>([
    { id: '1', titulo: 'Sofá 3 lugares', preco: 800, categoria: 'Móveis', descricao: 'Sofá em ótimo estado.', vendedor: 'Ana Costa', whatsapp: '11999990001', criadoEm: new Date() },
    { id: '2', titulo: 'Bicicleta ergométrica', preco: 350, categoria: 'Esportes', descricao: 'Uso leve, funciona perfeitamente.', vendedor: 'Carlos M.', whatsapp: '11999990002', criadoEm: new Date() },
    { id: '3', titulo: 'Mesa de escritório', preco: 420, categoria: 'Móveis', descricao: 'Mesa ampla com gavetas.', vendedor: 'Fernanda L.', whatsapp: '11999990003', criadoEm: new Date() },
    { id: '4', titulo: 'Livros variados', preco: 50, categoria: 'Livros', descricao: 'Lote com 20 livros.', vendedor: 'Pedro S.', whatsapp: '11999990004', criadoEm: new Date() },
  ]);
}
