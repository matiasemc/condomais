import { Component, ChangeDetectionStrategy, inject, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthState, DeliveryService, OccurrenceService, ReservationService } from '@condomais/core';
import { BadgeComponent } from '@condomais/ui';

@Component({
  selector: 'cm-dashboard',
  standalone: true,
  imports: [RouterLink, DatePipe, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Painel</h2>
        <span class="admin-page__subtitle">{{ state.currentTenant()?.nome }}</span>
      </div>

      <div class="metrics">
        <div class="metric-card metric-card--warn">
          <p class="metric-card__value">{{ pendingDeliveries() }}</p>
          <p class="metric-card__label">Entregas pendentes</p>
        </div>
        <div class="metric-card metric-card--accent">
          <p class="metric-card__value">{{ openOccurrences() }}</p>
          <p class="metric-card__label">Ocorrências abertas</p>
        </div>
        <div class="metric-card metric-card--success">
          <p class="metric-card__value">{{ todayReservations() }}</p>
          <p class="metric-card__label">Reservas hoje</p>
        </div>
        <div class="metric-card">
          <p class="metric-card__value">{{ totalDeliveries() }}</p>
          <p class="metric-card__label">Total de entregas</p>
        </div>
      </div>

      <div class="activity">
        <div class="activity__section">
          <div class="activity__header">
            <h3 class="activity__title">Últimas entregas</h3>
            <a class="activity__link" routerLink="/entregas">Ver todas</a>
          </div>
          @for (d of recentDeliveries(); track d.id) {
            <a class="activity-row" [routerLink]="['/entregas', d.id]">
              <div class="activity-row__body">
                <p class="activity-row__title">Unidade {{ d.unidade }}</p>
                <p class="activity-row__meta">{{ d.tipo }} · {{ d.createdAt | date:'dd/MM HH:mm' }}</p>
              </div>
              <cm-badge [variant]="d.status === 'pendente' ? 'warning' : 'success'">{{ d.status }}</cm-badge>
            </a>
          } @empty {
            <p class="activity__empty">Sem entregas recentes</p>
          }
        </div>

        <div class="activity__section">
          <div class="activity__header">
            <h3 class="activity__title">Últimas ocorrências</h3>
            <a class="activity__link" routerLink="/ocorrencias">Ver todas</a>
          </div>
          @for (o of recentOccurrences(); track o.id) {
            <a class="activity-row" [routerLink]="['/ocorrencias', o.id]">
              <div class="activity-row__body">
                <p class="activity-row__title">{{ o.titulo ?? o.tipo }}</p>
                <p class="activity-row__meta">{{ o.tipo }} · {{ o.createdAt | date:'dd/MM HH:mm' }}</p>
              </div>
              <cm-badge [variant]="occStatusVariant(o.status)">{{ o.status }}</cm-badge>
            </a>
          } @empty {
            <p class="activity__empty">Sem ocorrências recentes</p>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page__subtitle { font-size: 13px; color: rgba(0,0,0,0.45); margin-left: 8px; }
    .metrics { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; margin-bottom: 32px; }
    .metric-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; border-left: 4px solid #e5e7eb; }
    .metric-card--warn    { border-left-color: #f59e0b; }
    .metric-card--accent  { border-left-color: #3b82f6; }
    .metric-card--success { border-left-color: #10b981; }
    .metric-card__value { font-size: 2rem; font-weight: 700; color: #111827; line-height: 1; margin-bottom: 6px; }
    .metric-card__label { font-size: 13px; color: #6b7280; }
    .activity { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    @media (max-width: 768px) { .activity { grid-template-columns: 1fr; } }
    .activity__section { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; }
    .activity__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .activity__title { font-size: 15px; font-weight: 600; }
    .activity__link { font-size: 13px; color: #2563eb; text-decoration: none; }
    .activity__empty { color: #9ca3af; font-size: 14px; text-align: center; padding: 16px 0; }
    .activity-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; text-decoration: none; color: inherit; }
    .activity-row:last-child { border-bottom: none; }
    .activity-row:hover { background: #f9fafb; margin: 0 -8px; padding-left: 8px; padding-right: 8px; border-radius: 6px; }
    .activity-row__title { font-size: 14px; font-weight: 500; }
    .activity-row__meta  { font-size: 12px; color: #9ca3af; }
  `],
})
export class DashboardComponent implements OnInit {
  readonly state          = inject(AuthState);
  private readonly delSvc = inject(DeliveryService);
  private readonly occSvc = inject(OccurrenceService);
  private readonly resSvc = inject(ReservationService);

  pendingDeliveries  = computed(() => this.delSvc.deliveries().filter(d => d.status === 'pendente').length);
  totalDeliveries    = computed(() => this.delSvc.deliveries().length);
  openOccurrences    = computed(() => this.occSvc.occurrences().filter(o => o.status === 'aberta' || o.status === 'em_analise').length);
  todayReservations  = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return this.resSvc.reservations().filter(r => r.data === today && r.status === 'confirmada').length;
  });
  recentDeliveries   = computed(() => this.delSvc.deliveries().slice(0, 5));
  recentOccurrences  = computed(() => this.occSvc.occurrences().slice(0, 5));

  async ngOnInit(): Promise<void> {
    const tenant = this.state.currentTenant();
    if (!tenant) return;
    await Promise.all([
      this.delSvc.loadForTenant(tenant.id),
      this.occSvc.loadForTenant(tenant.id),
      this.resSvc.loadForTenant(tenant.id),
    ]);
  }

  occStatusVariant(status: string): 'accent' | 'warning' | 'success' {
    if (status === 'aberta') return 'accent';
    if (status === 'em_analise') return 'warning';
    return 'success';
  }
}
