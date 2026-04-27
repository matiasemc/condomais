import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import {
  PlanManagementService,
  type ManagedFeature,
  type ManagedPlan,
  type ManagedSubscriptionStatus,
  type ManagedTenantPlan,
} from '@condomais/core';

const PLAN_COLORS: Record<ManagedPlan, string> = {
  free:    '#9ca3af',
  basic:   '#6b7280',
  plus:    '#3b82f6',
  premium: '#8b5cf6',
};

const ALL_PLANS: ManagedPlan[] = ['free', 'basic', 'plus', 'premium'];

@Component({
  selector: 'cm-plans',
  standalone: true,
  imports: [DatePipe, SelectModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Planos</h2>
      </div>

      <!-- Feature matrix -->
      <div class="section" style="margin-bottom:24px">
        <h3 class="section__title">Features por Plano</h3>
        @if (featuresLoading()) {
          <p class="hint">Carregando features...</p>
        } @else {
          <div class="matrix-wrap">
            <table class="matrix">
              <thead>
                <tr>
                  <th class="matrix__feature-col">Feature</th>
                  @for (plan of allPlans; track plan) {
                    <th class="matrix__plan-col" [style.color]="planColor(plan)">{{ plan }}</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (f of features(); track f.code) {
                  <tr>
                    <td class="matrix__label">
                      <span class="matrix__code">{{ f.code }}</span>
                      @if (f.descricao) { <span class="matrix__desc">{{ f.descricao }}</span> }
                    </td>
                    @for (plan of allPlans; track plan) {
                      <td class="matrix__cell">
                        <label class="matrix__toggle">
                          <input
                            type="checkbox"
                            [checked]="isEnabled(plan, f.code)"
                            [disabled]="savingKey() === plan + ':' + f.code"
                            (change)="toggleFeature(plan, f.code, $any($event.target).checked)"
                          >
                        </label>
                      </td>
                    }
                  </tr>
                } @empty {
                  <tr><td [attr.colspan]="allPlans.length + 1" class="hint">Sem features cadastradas</td></tr>
                }
              </tbody>
            </table>
          </div>
          <p class="hint" style="margin-top:8px;text-align:left">
            Alterações aplicam imediatamente. Tenants já logados recebem na próxima troca de condomínio.
          </p>
        }
      </div>

      <!-- Tenant plan assignment -->
      <div class="section">
        <h3 class="section__title">Atribuição por Tenant</h3>
        @if (isLoading()) {
          <p class="hint">Carregando...</p>
        } @else {
          <div class="tenant-table">
            @for (t of tenants(); track t.id) {
              <div class="tenant-row">
                <div class="tenant-row__body">
                  <p class="tenant-row__name">{{ t.nome }}</p>
                  <p class="tenant-row__meta">
                    {{ t.subscription_status }}
                    @if (t.trial_ends_at) { · Trial até {{ t.trial_ends_at | date:'dd/MM/yyyy' }} }
                    @if (t.subscription_expires_at) { · Expira {{ t.subscription_expires_at | date:'dd/MM/yyyy' }} }
                  </p>
                </div>
                <div class="tenant-row__right">
                  <p-select
                    styleClass="plan-select"
                    [options]="planOptions"
                    [ngModel]="t.plan"
                    optionLabel="label"
                    optionValue="value"
                    appendTo="body"
                    (ngModelChange)="updatePlan(t.id, $event)"
                  ></p-select>
                  <p-select
                    styleClass="status-select"
                    [options]="statusOptions"
                    [ngModel]="t.subscription_status"
                    optionLabel="label"
                    optionValue="value"
                    appendTo="body"
                    (ngModelChange)="updateStatus(t.id, $event)"
                  ></p-select>
                </div>
              </div>
            } @empty {
              <p class="hint">Nenhum tenant</p>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .page__header { margin-bottom: 24px; }
    .page__title  { font-size: 22px; font-weight: 700; margin: 0; }
    .section { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; }
    .section__title { font-size: 15px; font-weight: 600; margin: 0 0 16px; }

    .matrix-wrap { overflow-x: auto; }
    .matrix { width: 100%; border-collapse: collapse; font-size: 13px; }
    .matrix th, .matrix td { padding: 8px 12px; border-bottom: 1px solid #f3f4f6; text-align: center; }
    .matrix__feature-col { text-align: left; min-width: 200px; }
    .matrix__plan-col { font-weight: 700; text-transform: capitalize; min-width: 80px; }
    .matrix__label { text-align: left; }
    .matrix__code { font-weight: 600; display: block; }
    .matrix__desc { font-size: 11px; color: #9ca3af; display: block; }
    .matrix__cell { }
    .matrix__toggle input { width: 16px; height: 16px; cursor: pointer; accent-color: #4f46e5; }
    .matrix__toggle input:disabled { cursor: wait; }

    .tenant-table { display: flex; flex-direction: column; }
    .tenant-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f3f4f6; flex-wrap: wrap; gap: 8px; }
    .tenant-row:last-child { border-bottom: none; }
    .tenant-row__name { font-weight: 600; font-size: 14px; }
    .tenant-row__meta { font-size: 12px; color: #9ca3af; margin-top: 2px; }
    .tenant-row__right { display: flex; gap: 8px; }
    .plan-select, .status-select { font-size: 13px; border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 5px 8px; cursor: pointer; }
    .hint { color: #9ca3af; font-size: 13px; padding: 8px 0; text-align: center; }
  `],
})
export class PlansComponent implements OnInit {
  private readonly planManagement = inject(PlanManagementService);

  readonly tenants        = signal<ManagedTenantPlan[]>([]);
  readonly features       = signal<ManagedFeature[]>([]);
  readonly planoFeatures  = signal<Map<string, boolean>>(new Map());
  readonly isLoading      = signal(true);
  readonly featuresLoading = signal(true);
  readonly savingKey      = signal<string | null>(null);

  readonly allPlans = ALL_PLANS;
  readonly planOptions = ALL_PLANS.map((plan) => ({ label: plan[0].toUpperCase() + plan.slice(1), value: plan }));
  readonly statusOptions: { label: string; value: ManagedSubscriptionStatus }[] = [
    { label: 'Trial', value: 'trial' },
    { label: 'Active', value: 'active' },
    { label: 'Suspended', value: 'suspended' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  planColor(plan: ManagedPlan): string { return PLAN_COLORS[plan]; }

  isEnabled(plan: ManagedPlan, featureCode: string): boolean {
    return this.planoFeatures().get(`${plan}:${featureCode}`) ?? false;
  }

  async ngOnInit(): Promise<void> {
    try {
      const snapshot = await this.planManagement.loadSnapshot();
      this.tenants.set(snapshot.tenants);
      this.features.set(snapshot.features);

      const map = new Map<string, boolean>();
      for (const row of snapshot.planFeatures) {
        map.set(`${row.plano_nome}:${row.feature_code}`, row.enabled);
      }
      this.planoFeatures.set(map);
    } finally {
      this.isLoading.set(false);
      this.featuresLoading.set(false);
    }
  }

  async toggleFeature(plan: ManagedPlan, featureCode: string, enabled: boolean): Promise<void> {
    const key = `${plan}:${featureCode}`;
    this.savingKey.set(key);

    try {
      await this.planManagement.setFeatureEnabled(plan, featureCode, enabled);
      this.planoFeatures.update(m => {
        const next = new Map(m);
        next.set(key, enabled);
        return next;
      });
    } finally {
      this.savingKey.set(null);
    }
  }

  async updatePlan(id: string, plan: ManagedPlan): Promise<void> {
    await this.planManagement.updatePlan(id, plan);
    this.tenants.update(list => list.map(t => t.id === id ? { ...t, plan } : t));
  }

  async updateStatus(id: string, subscription_status: ManagedSubscriptionStatus): Promise<void> {
    await this.planManagement.updateStatus(id, subscription_status);
    this.tenants.update(list => list.map(t => t.id === id ? { ...t, subscription_status } : t));
  }
}
