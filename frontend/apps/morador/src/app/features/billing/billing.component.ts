import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe, NgClass, DatePipe } from '@angular/common';
import { BillingService, AuthState } from '@condomais/core';
import type { Plano } from '@condomais/core';

@Component({
  selector: 'cm-billing',
  standalone: true,
  imports: [CurrencyPipe, NgClass, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="billing">
      <header class="billing__header">
        <h1 class="billing__title">Planos e Assinatura</h1>
        @if (svc.isPastDue()) {
          <div class="billing__alert">
            Pagamento pendente — renove para evitar suspensão
          </div>
        }
      </header>

      @if (svc.isLoading()) {
        <div class="billing__loading">Carregando...</div>
      } @else {
        @if (svc.subscription(); as sub) {
          <section class="billing__current">
            <p class="billing__current-label">Plano atual</p>
            <p class="billing__current-plan">{{ svc.currentPlano()?.label ?? sub.plano_nome }}</p>
            <span class="billing__status" [ngClass]="'billing__status--' + sub.status.toLowerCase()">
              {{ statusLabel(sub.status) }}
            </span>
            @if (sub.current_period_end) {
              <p class="billing__period">Renova em {{ sub.current_period_end | date:'dd/MM/yyyy' }}</p>
            }
          </section>
        }

        <section class="billing__plans">
          @for (plano of svc.planos(); track plano.nome) {
            <div class="billing__card"
                 [ngClass]="{ 'billing__card--current': svc.planNome() === plano.nome, 'billing__card--highlight': plano.nome === 'plus' }">
              @if (plano.nome === 'plus') {
                <span class="billing__badge">Mais popular</span>
              }
              <h2 class="billing__card-name">{{ plano.label }}</h2>
              <p class="billing__card-price">
                @if (plano.price_monthly_brl === 0) {
                  <span class="billing__price-free">Grátis</span>
                } @else {
                  <span class="billing__price-amount">{{ plano.price_monthly_brl | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}</span>
                  <span class="billing__price-period">/mês</span>
                }
              </p>

              <ul class="billing__features">
                <li [ngClass]="{ 'billing__feature--on': plano.features.entregas }">
                  {{ plano.features.entregas ? '✓' : '✗' }} Entregas
                </li>
                <li [ngClass]="{ 'billing__feature--on': plano.features.ocorrencias }">
                  {{ plano.features.ocorrencias ? '✓' : '✗' }} Ocorrências
                </li>
                <li [ngClass]="{ 'billing__feature--on': plano.features.reservas }">
                  {{ plano.features.reservas ? '✓' : '✗' }} Reservas
                </li>
                <li [ngClass]="{ 'billing__feature--on': plano.features.marketplace }">
                  {{ plano.features.marketplace ? '✓' : '✗' }} Marketplace
                </li>
                <li class="billing__feature--on">
                  Até {{ plano.features.max_unidades >= 999999 ? 'ilimitadas' : plano.features.max_unidades }} unidades
                </li>
              </ul>

              @if (svc.planNome() === plano.nome) {
                <button class="billing__btn billing__btn--current" disabled>Plano atual</button>
              } @else if (plano.nome !== 'free') {
                <button class="billing__btn billing__btn--upgrade"
                        [disabled]="redirecting()"
                        (click)="subscribe(plano)">
                  {{ redirecting() ? 'Aguarde...' : (isDowngrade(plano) ? 'Mudar para ' + plano.label : 'Fazer upgrade') }}
                </button>
              }
            </div>
          }
        </section>
      }
    </div>
  `,
  styles: [`
    .billing { max-width: 900px; margin: 0 auto; padding: 1.5rem 1rem 5rem; }
    .billing__header { margin-bottom: 1.5rem; }
    .billing__title { font-size: 1.4rem; font-weight: 700; color: #1a1a2e; margin: 0 0 .5rem; }
    .billing__alert { background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: .75rem 1rem; color: #856404; font-size: .9rem; }
    .billing__loading { text-align: center; padding: 3rem; color: #666; }
    .billing__current { background: #f8f9fa; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .billing__current-label { font-size: .8rem; color: #666; width: 100%; margin: 0; }
    .billing__current-plan { font-size: 1.1rem; font-weight: 700; color: #1a1a2e; margin: 0; }
    .billing__status { font-size: .75rem; padding: .2rem .6rem; border-radius: 99px; font-weight: 600; }
    .billing__status--active { background: #d4edda; color: #155724; }
    .billing__status--trialing { background: #cce5ff; color: #004085; }
    .billing__status--past_due { background: #fff3cd; color: #856404; }
    .billing__status--canceled { background: #f8d7da; color: #721c24; }
    .billing__period { font-size: .8rem; color: #888; margin: 0; }
    .billing__plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .billing__card { background: #fff; border: 2px solid #e9ecef; border-radius: 16px; padding: 1.5rem 1.25rem 1.25rem; position: relative; display: flex; flex-direction: column; gap: .75rem; }
    .billing__card--current { border-color: #4f46e5; }
    .billing__card--highlight { border-color: #4f46e5; box-shadow: 0 4px 20px rgba(79,70,229,.15); }
    .billing__badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #4f46e5; color: #fff; font-size: .7rem; font-weight: 700; padding: .2rem .75rem; border-radius: 99px; white-space: nowrap; }
    .billing__card-name { font-size: 1.1rem; font-weight: 700; color: #1a1a2e; margin: 0; }
    .billing__card-price { margin: 0; }
    .billing__price-free { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; }
    .billing__price-amount { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; }
    .billing__price-period { font-size: .85rem; color: #888; }
    .billing__features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .4rem; font-size: .85rem; flex: 1; }
    .billing__features li { color: #bbb; }
    .billing__feature--on { color: #1a1a2e !important; }
    .billing__btn { width: 100%; padding: .65rem; border-radius: 8px; font-size: .9rem; font-weight: 600; cursor: pointer; border: none; }
    .billing__btn--current { background: #e9ecef; color: #666; cursor: default; }
    .billing__btn--upgrade { background: #4f46e5; color: #fff; }
    .billing__btn--upgrade:disabled { opacity: .6; cursor: not-allowed; }
  `],
})
export class BillingComponent implements OnInit {
  readonly svc             = inject(BillingService);
  private readonly authState = inject(AuthState);
  readonly redirecting       = signal(false);

  async ngOnInit(): Promise<void> {
    const tenantId = this.authState.currentTenant()?.id;
    if (tenantId) await this.svc.loadForTenant(tenantId);
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      ACTIVE: 'Ativo', TRIALING: 'Trial', PAST_DUE: 'Pendente', CANCELED: 'Cancelado',
    };
    return map[status] ?? status;
  }

  isDowngrade(plano: Plano): boolean {
    const order = ['free', 'basic', 'plus', 'premium'];
    return order.indexOf(plano.nome) < order.indexOf(this.svc.planNome());
  }

  async subscribe(plano: Plano): Promise<void> {
    const tenantId = this.authState.currentTenant()?.id;
    if (!tenantId) return;
    this.redirecting.set(true);
    const result = await this.svc.subscribeToPlan(tenantId, plano.nome);
    if ('url' in result) {
      window.location.href = result.url;
    } else {
      console.error('Checkout error:', result.error);
      this.redirecting.set(false);
    }
  }
}
