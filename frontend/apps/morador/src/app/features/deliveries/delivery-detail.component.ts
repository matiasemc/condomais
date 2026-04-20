import { Component, ChangeDetectionStrategy, signal, inject, input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ButtonComponent } from '../../../../../libs/ui/src/lib/components/button/button.component';
import { BadgeComponent } from '../../../../../libs/ui/src/lib/components/badge/badge.component';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'cm-delivery-detail',
  standalone: true,
  imports: [ButtonComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="detail">
      <button class="detail__back" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Voltar
      </button>

      <div class="detail__hero">
        <div class="detail__package-icon">📦</div>
        <cm-badge [variant]="status() === 'pendente' ? 'accent' : 'success'">
          {{ status() === 'pendente' ? 'Aguardando retirada' : 'Retirada' }}
        </cm-badge>
        <h1 class="detail__title">{{ remetente }}</h1>
        <p class="detail__sub">{{ tipo }}</p>
      </div>

      <div class="detail__info">
        <div class="detail__row">
          <span class="detail__label">Registrada em</span>
          <span class="detail__value">Hoje, 14:32</span>
        </div>
        <div class="detail__row">
          <span class="detail__label">Registrada por</span>
          <span class="detail__value">Rafael (porteiro)</span>
        </div>
        <div class="detail__row">
          <span class="detail__label">Tipo</span>
          <span class="detail__value">{{ tipo }}</span>
        </div>
      </div>

      @if (status() === 'pendente') {
        <div class="detail__actions">
          <cm-button variant="accent" size="lg" style="width:100%" (clicked)="marcarRetirada()">
            Marcar como retirada
          </cm-button>
        </div>
      } @else {
        <div class="detail__success">
          <div class="success-check">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" stroke-dasharray="40" stroke-dashoffset="0">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <p>Entrega retirada com sucesso!</p>
        </div>
      }
    </div>
  `,
  styleUrl: './delivery-detail.component.scss',
})
export class DeliveryDetailComponent implements OnInit {
  id       = input<string>('');
  location = inject(Location);
  toast    = inject(ToastService);

  status   = signal<'pendente' | 'retirada'>('pendente');
  remetente = 'Mercado Livre';
  tipo      = 'Caixa pequena';

  ngOnInit(): void {
    // In production: load from service by this.id()
  }

  marcarRetirada(): void {
    this.status.set('retirada');
    this.toast.show({ message: '✔ Marcada como retirada', icon: '✔', duration: 2400 });
    setTimeout(() => this.toast.show({ message: '✉ E-mail enviado ao morador', icon: '✉', duration: 2400 }), 2600);
  }
}
