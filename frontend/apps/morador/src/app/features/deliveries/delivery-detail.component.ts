import { Component, ChangeDetectionStrategy, signal, inject, input, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ButtonComponent, BadgeComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';
import { DeliveryService, AuthState } from '@condomais/core';
import type { Delivery } from '@condomais/core';

@Component({
  selector: 'cm-delivery-detail',
  standalone: true,
  imports: [DatePipe, ButtonComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="detail">
      <button class="detail__back" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Voltar
      </button>

      @if (delivery(); as d) {
        <div class="detail__hero">
          <div class="detail__package-icon">📦</div>
          <cm-badge [variant]="d.status === 'pendente' || d.status === 'notificada' ? 'accent' : 'success'">
            {{ d.status === 'retirada' ? 'Retirada' : 'Aguardando retirada' }}
          </cm-badge>
          <h1 class="detail__title">{{ d.transportadora ?? d.tipo }}</h1>
          <p class="detail__sub">{{ d.tipo }}</p>
        </div>

        <div class="detail__info">
          <div class="detail__row">
            <span class="detail__label">Registrada em</span>
            <span class="detail__value">{{ d.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>
          @if (d.dataRetirada) {
            <div class="detail__row">
              <span class="detail__label">Retirada em</span>
              <span class="detail__value">{{ d.dataRetirada | date:'dd/MM/yyyy HH:mm' }}</span>
            </div>
          }
          @if (d.quemRetirou) {
            <div class="detail__row">
              <span class="detail__label">Retirada por</span>
              <span class="detail__value">{{ d.quemRetirou }}</span>
            </div>
          }
          <div class="detail__row">
            <span class="detail__label">Tipo</span>
            <span class="detail__value">{{ d.tipo }}</span>
          </div>
        </div>

        @if (d.status === 'pendente' || d.status === 'notificada') {
          <div class="detail__actions">
            <cm-button variant="accent" size="lg" style="width:100%" (clicked)="marcarRetirada()">
              Marcar como retirada
            </cm-button>
          </div>
        } @else if (d.status === 'retirada') {
          <div class="detail__success">
            <div class="success-check">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2.5" stroke-linecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <p>Entrega retirada com sucesso!</p>
          </div>
        }
      } @else if (isLoading()) {
        <p class="detail__loading">Carregando…</p>
      }
    </div>
  `,
  styleUrl: './delivery-detail.component.scss',
})
export class DeliveryDetailComponent implements OnInit {
  id       = input<string>('');
  location = inject(Location);
  toast    = inject(ToastService);

  private readonly deliveryService = inject(DeliveryService);
  private readonly authState       = inject(AuthState);

  delivery  = signal<Delivery | null>(null);
  isLoading = signal(false);

  async ngOnInit(): Promise<void> {
    const deliveryId = this.id();
    if (!deliveryId) return;
    this.isLoading.set(true);
    const d = await this.deliveryService.loadById(deliveryId);
    this.delivery.set(d);
    this.isLoading.set(false);
  }

  async marcarRetirada(): Promise<void> {
    const d    = this.delivery();
    const user = this.authState.user();
    if (!d) return;
    const quem = user?.email ?? 'Morador';
    const ok   = await this.deliveryService.marcarRetirada(d.id, quem);
    if (ok) {
      this.delivery.update(prev =>
        prev ? { ...prev, status: 'retirada', dataRetirada: new Date().toISOString(), quemRetirou: quem } : prev
      );
      this.toast.show({ message: 'Marcada como retirada', icon: '✔', duration: 2400 });
    } else {
      this.toast.show({ message: 'Erro ao atualizar entrega', type: 'error' });
    }
  }
}
