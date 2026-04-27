import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe, NgClass, DatePipe } from '@angular/common';
import { BillingService, AuthState, FeatureService } from '@condomais/core';
import type { Plano } from '@condomais/core';

const FEATURE_LABELS: Record<string, string> = {
  entregas:            'Entregas',
  ocorrencias:         'Ocorrências',
  reservas:            'Reservas',
  marketplace:         'Marketplace',
  relatorios:          'Relatórios',
  'integracao-google': 'Integração Google',
};

@Component({
  selector: 'cm-admin-billing',
  standalone: true,
  imports: [CurrencyPipe, NgClass, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Plano & Assinatura</h2>
      </div>

      @if (billingSvc.isLoading()) {
        <p class="hint">Carregando...</p>
      } @else {

        @if (billingSvc.subscription(); as sub) {
          <div class="section current-plan">
            <p class="current-plan__label">Plano atual</p>
            <p class="current-plan__name">{{ billingSvc.currentPlano()?.label ?? sub.plano_nome }}</p>
            <span class="status-badge" [ngClass]="'status-badge--' + sub.status.toLowerCase()">
              {{ statusLabel(sub.status) }}
            </span>
            @if (sub.current_period_end) {
              <p class="current-plan__expiry">Renova em {{ sub.current_period_end | date:'dd/MM/yyyy' }}</p>
            }
          </div>
        }

        <div class="section">
          <h3 class="section__title">Features habilitadas</h3>
          <ul class="feature-list">
            @for (entry of allFeatures; track entry.code) {
              <li class="feature-item" [ngClass]="{ 'feature-item--on': featureSvc.hasFeature(entry.code) }">
                <span class="feature-item__icon">{{ featureSvc.hasFeature(entry.code) ? '✓' : '✗' }}</span>
                {{ entry.label }}
              </li>
            }
          </ul>
        </div>

        <div class="section">
          <h3 class="section__title">Planos disponíveis</h3>
          @if (billingSvc.isPastDue()) {
            <div class="alert">Pagamento pendente — renove para evitar suspensão</div>
          }
          <div class="plan-grid">
            @for (plano of billingSvc.planos(); track plano.nome) {
              <div class="plan-card"
                   [ngClass]="{ 'plan-card--current': billingSvc.planNome() === plano.nome, 'plan-card--highlight': plano.nome === 'plus' }">
                @if (plano.nome === 'plus') {
                  <span class="popular-badge">Mais popular</span>
                }
                <h4 class="plan-card__name">{{ plano.label }}</h4>
                <p class="plan-card__price">
                  @if (plano.price_monthly_brl === 0) {
                    <span class="price-main">Grátis</span>
                  } @else {
                    <span class="price-main">{{ plano.price_monthly_brl | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}</span>
                    <span class="price-period">/mês</span>
                  }
                </p>
                <ul class="plan-features">
                  <li [ngClass]="{ 'on': plano.features.entregas }">{{ plano.features.entregas ? '✓' : '✗' }} Entregas</li>
                  <li [ngClass]="{ 'on': plano.features.ocorrencias }">{{ plano.features.ocorrencias ? '✓' : '✗' }} Ocorrências</li>
                  <li [ngClass]="{ 'on': plano.features.reservas }">{{ plano.features.reservas ? '✓' : '✗' }} Reservas</li>
                  <li [ngClass]="{ 'on': plano.features.marketplace }">{{ plano.features.marketplace ? '✓' : '✗' }} Marketplace</li>
                  <li class="on">Até {{ plano.features.max_unidades >= 999999 ? 'ilimitadas' : plano.features.max_unidades }} unidades</li>
                </ul>
                @if (billingSvc.planNome() === plano.nome) {
                  <button class="btn btn--current" disabled>Plano atual</button>
                } @else if (plano.nome !== 'free') {
                  <button class="btn btn--upgrade"
                          [disabled]="redirecting()"
                          (click)="subscribe(plano)">
                    {{ redirecting() ? 'Aguarde...' : (isDowngrade(plano) ? 'Mudar para ' + plano.label : 'Fazer upgrade') }}
                  </button>
                }
              </div>
            }
          </div>
        </div>

      }
    </div>
  `,
  styles: [`
    .page__header { margin-bottom: 24px; }
    .page__title  { font-size: 22px; font-weight: 700; margin: 0; }
    .section { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
    .section__title { font-size: 15px; font-weight: 600; margin: 0 0 16px; }
    .hint { color: #9ca3af; font-size: 13px; text-align: center; padding: 40px 0; }
    .alert { background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 12px 16px; color: #856404; font-size: 13px; margin-bottom: 16px; }

    .current-plan { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .current-plan__label  { font-size: 12px; color: #9ca3af; width: 100%; margin: 0; }
    .current-plan__name   { font-size: 20px; font-weight: 700; color: #111827; margin: 0; text-transform: capitalize; }
    .current-plan__expiry { font-size: 12px; color: #9ca3af; margin: 0; }
    .status-badge { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 99px; }
    .status-badge--active   { background: #d1fae5; color: #065f46; }
    .status-badge--trialing { background: #dbeafe; color: #1e40af; }
    .status-badge--past_due { background: #fef3c7; color: #92400e; }
    .status-badge--canceled { background: #fee2e2; color: #991b1b; }

    .feature-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
    .feature-item { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #d1d5db; }
    .feature-item--on { color: #111827; }
    .feature-item__icon { font-weight: 700; width: 16px; text-align: center; }

    .plan-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
    .plan-card { background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px 16px 16px; position: relative; display: flex; flex-direction: column; gap: 12px; }
    .plan-card--current   { border-color: #4f46e5; background: #fff; }
    .plan-card--highlight { border-color: #4f46e5; box-shadow: 0 4px 16px rgba(79,70,229,.12); background: #fff; }
    .popular-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: #4f46e5; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 10px; border-radius: 99px; white-space: nowrap; }
    .plan-card__name  { font-size: 15px; font-weight: 700; color: #111827; margin: 0; text-transform: capitalize; }
    .plan-card__price { margin: 0; }
    .price-main   { font-size: 22px; font-weight: 700; color: #111827; }
    .price-period { font-size: 12px; color: #9ca3af; margin-left: 2px; }
    .plan-features { list-style: none; padding: 0; margin: 0; font-size: 12px; display: flex; flex-direction: column; gap: 5px; flex: 1; color: #d1d5db; }
    .plan-features .on { color: #111827; }
    .btn { width: 100%; padding: 9px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; }
    .btn--current { background: #f3f4f6; color: #9ca3af; cursor: default; }
    .btn--upgrade { background: #4f46e5; color: #fff; }
    .btn--upgrade:disabled { opacity: .6; cursor: not-allowed; }
  `],
})
export class AdminBillingComponent implements OnInit {
  readonly billingSvc  = inject(BillingService);
  readonly featureSvc  = inject(FeatureService);
  private readonly authState = inject(AuthState);
  readonly redirecting = signal(false);

  readonly allFeatures = Object.entries(FEATURE_LABELS).map(([code, label]) => ({ code, label }));

  async ngOnInit(): Promise<void> {
    const tenantId = this.authState.currentTenant()?.id;
    if (tenantId) await this.billingSvc.loadForTenant(tenantId);
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      ACTIVE: 'Ativo', TRIALING: 'Trial', PAST_DUE: 'Pendente', CANCELED: 'Cancelado',
    };
    return map[status] ?? status;
  }

  isDowngrade(plano: Plano): boolean {
    const order = ['free', 'basic', 'plus', 'premium'];
    return order.indexOf(plano.nome) < order.indexOf(this.billingSvc.planNome());
  }

  async subscribe(plano: Plano): Promise<void> {
    const tenantId = this.authState.currentTenant()?.id;
    if (!tenantId) return;
    this.redirecting.set(true);
    const result = await this.billingSvc.subscribeToPlan(tenantId, plano.nome);
    if ('url' in result) {
      window.location.href = result.url;
    } else {
      console.error('Checkout error:', result.error);
      this.redirecting.set(false);
    }
  }
}
