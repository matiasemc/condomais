import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { ButtonComponent } from '@condomais/ui';
import { BadgeComponent } from '@condomais/ui';

@Component({
  selector: 'cm-marketplace-detail',
  standalone: true,
  imports: [ButtonComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="detail">
      <button class="back-btn" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Mercado
      </button>
      <div class="detail__img">🪑</div>
      <cm-badge variant="neutral">Móveis</cm-badge>
      <h1 class="detail__title">Sofá 3 lugares</h1>
      <p class="detail__price">R$ 800,00</p>
      <p class="detail__desc">Sofá em ótimo estado, pouco uso. Retirada no condomínio.</p>
      <div class="detail__seller">
        <div class="seller-avatar">AC</div>
        <div>
          <p class="seller-name">Ana Costa</p>
          <p class="seller-apto">Apto 502 · Torre A</p>
        </div>
      </div>
      <cm-button variant="whatsapp" size="lg" style="width:100%">
        Contatar via WhatsApp
      </cm-button>
    </div>
  `,
  styleUrl: './marketplace-detail.component.scss',
})
export class MarketplaceDetailComponent {
  id       = input<string>('');
  location = inject(Location);
}
