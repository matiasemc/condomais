import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SUPABASE_CLIENT } from '@condomais/core';

type Plan = 'basic' | 'plus' | 'premium';
type SubscriptionStatus = 'trial' | 'active' | 'suspended' | 'cancelled';

interface TenantPlan {
  id: string;
  nome: string;
  plan: Plan;
  subscription_status: SubscriptionStatus;
  trial_ends_at: string | null;
  subscription_expires_at: string | null;
}

const PLAN_FEATURES: Record<Plan, { label: string; color: string; features: string[] }> = {
  basic:   { label: 'Basic',   color: '#6b7280', features: ['Até 50 unidades', '2 porteiros', '10 equipamentos', '100 MB storage'] },
  plus:    { label: 'Plus',    color: '#3b82f6', features: ['Até 200 unidades', '5 porteiros', '25 equipamentos', '500 MB storage'] },
  premium: { label: 'Premium', color: '#8b5cf6', features: ['Ilimitado', 'Porteiros ilimitados', 'Equipamentos ilimitados', '5 GB storage'] },
};

@Component({
  selector: 'cm-plans',
  standalone: true,
  imports: [DatePipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Planos</h2>
      </div>

      <div class="plan-cards">
        @for (entry of planEntries; track entry.key) {
          <div class="plan-card" [style.border-top-color]="entry.value.color">
            <p class="plan-card__name" [style.color]="entry.value.color">{{ entry.value.label }}</p>
            <ul class="plan-card__features">
              @for (f of entry.value.features; track f) { <li>{{ f }}</li> }
            </ul>
            <p class="plan-card__count">{{ countByPlan(entry.key) }} tenant(s)</p>
          </div>
        }
      </div>

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
                  <select class="plan-select" [ngModel]="t.plan" (ngModelChange)="updatePlan(t.id, $event)">
                    <option value="basic">Basic</option>
                    <option value="plus">Plus</option>
                    <option value="premium">Premium</option>
                  </select>
                  <select class="status-select" [ngModel]="t.subscription_status" (ngModelChange)="updateStatus(t.id, $event)">
                    <option value="trial">Trial</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
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
    .plan-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-bottom: 32px; }
    .plan-card { background: #fff; border: 1px solid #e5e7eb; border-top: 4px solid; border-radius: 12px; padding: 20px; }
    .plan-card__name { font-size: 16px; font-weight: 700; margin: 0 0 12px; }
    .plan-card__features { margin: 0 0 12px; padding-left: 18px; }
    .plan-card__features li { font-size: 13px; color: #6b7280; margin-bottom: 4px; }
    .plan-card__count { font-size: 13px; font-weight: 600; background: #f3f4f6; border-radius: 6px; padding: 4px 10px; display: inline-block; }
    .section { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; }
    .section__title { font-size: 15px; font-weight: 600; margin: 0 0 16px; }
    .tenant-table { display: flex; flex-direction: column; }
    .tenant-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f3f4f6; flex-wrap: wrap; gap: 8px; }
    .tenant-row:last-child { border-bottom: none; }
    .tenant-row__name { font-weight: 600; font-size: 14px; }
    .tenant-row__meta { font-size: 12px; color: #9ca3af; margin-top: 2px; }
    .tenant-row__right { display: flex; gap: 8px; }
    .plan-select, .status-select { font-size: 13px; border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 5px 8px; cursor: pointer; }
    .hint { color: #9ca3af; font-size: 14px; padding: 16px 0; text-align: center; }
  `],
})
export class PlansComponent implements OnInit {
  private readonly supabase = inject(SUPABASE_CLIENT);

  tenants   = signal<TenantPlan[]>([]);
  isLoading = signal(true);

  planEntries = (Object.entries(PLAN_FEATURES) as [Plan, (typeof PLAN_FEATURES)[Plan]][])
    .map(([key, value]) => ({ key, value }));

  countByPlan(plan: Plan): number {
    return this.tenants().filter(t => t.plan === plan).length;
  }

  async ngOnInit(): Promise<void> {
    const { data } = await this.supabase
      .from('condominios')
      .select('id,nome,plan,subscription_status,trial_ends_at,subscription_expires_at')
      .is('deleted_at', null)
      .order('nome');
    this.tenants.set((data ?? []) as TenantPlan[]);
    this.isLoading.set(false);
  }

  async updatePlan(id: string, plan: Plan): Promise<void> {
    const { error } = await this.supabase.from('condominios').update({ plan }).eq('id', id);
    if (!error) this.tenants.update(list => list.map(t => t.id === id ? { ...t, plan } : t));
  }

  async updateStatus(id: string, subscription_status: SubscriptionStatus): Promise<void> {
    const { error } = await this.supabase.from('condominios').update({ subscription_status }).eq('id', id);
    if (!error) this.tenants.update(list => list.map(t => t.id === id ? { ...t, subscription_status } : t));
  }
}
