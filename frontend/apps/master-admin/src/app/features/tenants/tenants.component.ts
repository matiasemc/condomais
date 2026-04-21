import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SUPABASE_CLIENT } from '@condomais/core';

type SubscriptionStatus = 'trial' | 'active' | 'suspended' | 'cancelled';
type Plan = 'basic' | 'plus' | 'premium';

interface TenantRow {
  id: string;
  nome: string;
  subdomain: string | null;
  email: string | null;
  plan: Plan;
  subscription_status: SubscriptionStatus;
  max_unidades: number;
  created_at: string;
}

@Component({
  selector: 'cm-tenants',
  standalone: true,
  imports: [DatePipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Tenants</h2>
        <button class="btn-primary" (click)="showForm.set(!showForm())">
          {{ showForm() ? 'Cancelar' : '+ Novo Tenant' }}
        </button>
      </div>

      @if (showForm()) {
        <div class="form-card">
          <h3 class="form-card__title">Novo Condomínio</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>Nome *</label>
              <input class="form-input" type="text" [(ngModel)]="form.nome" placeholder="Condomínio Solar"/>
            </div>
            <div class="form-field">
              <label>CNPJ *</label>
              <input class="form-input" type="text" [(ngModel)]="form.cnpj" placeholder="00.000.000/0000-00"/>
            </div>
            <div class="form-field">
              <label>Subdomínio</label>
              <input class="form-input" type="text" [(ngModel)]="form.subdomain" placeholder="solar"/>
            </div>
            <div class="form-field">
              <label>E-mail</label>
              <input class="form-input" type="email" [(ngModel)]="form.email" placeholder="adm@solar.com"/>
            </div>
            <div class="form-field">
              <label>Plano</label>
              <select class="form-input" [(ngModel)]="form.plan">
                <option value="basic">Basic</option>
                <option value="plus">Plus</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div class="form-field">
              <label>Máx. unidades</label>
              <input class="form-input" type="number" [(ngModel)]="form.maxUnidades"/>
            </div>
          </div>
          @if (formError()) { <p class="form-error">{{ formError() }}</p> }
          <button class="btn-primary" [disabled]="isSaving()" (click)="criar()">
            {{ isSaving() ? 'Salvando...' : 'Criar Tenant' }}
          </button>
        </div>
      }

      <div class="filters">
        <input class="search-input" type="text" [(ngModel)]="searchText" placeholder="Buscar por nome ou subdomínio..."/>
        <div class="filter-tabs">
          @for (tab of statusTabs; track tab.id) {
            <button class="filter-tab" [class.filter-tab--active]="activeTab() === tab.id"
              (click)="activeTab.set(tab.id)">{{ tab.label }}</button>
          }
        </div>
      </div>

      @if (isLoading()) {
        <p class="hint">Carregando...</p>
      } @else {
        <div class="tenant-table">
          @for (t of filtered(); track t.id) {
            <div class="tenant-row" [class.tenant-row--suspended]="t.subscription_status === 'suspended'">
              <div class="tenant-row__body">
                <p class="tenant-row__name">{{ t.nome }}</p>
                <p class="tenant-row__meta">
                  {{ t.subdomain ? '@' + t.subdomain : 'sem subdomínio' }} ·
                  {{ t.email ?? 'sem e-mail' }} ·
                  Criado {{ t.created_at | date:'dd/MM/yyyy' }}
                </p>
              </div>
              <div class="tenant-row__right">
                <span class="badge" [class]="'badge--' + t.subscription_status">{{ t.subscription_status }}</span>
                <select class="plan-select" [ngModel]="t.plan" (ngModelChange)="changePlan(t.id, $event)">
                  <option value="basic">Basic</option>
                  <option value="plus">Plus</option>
                  <option value="premium">Premium</option>
                </select>
                <button class="btn-toggle"
                  [class.btn-toggle--off]="t.subscription_status === 'suspended'"
                  (click)="toggleStatus(t)">
                  {{ t.subscription_status === 'suspended' ? 'Ativar' : 'Suspender' }}
                </button>
              </div>
            </div>
          } @empty {
            <p class="hint">Nenhum tenant encontrado</p>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .page__title  { font-size: 22px; font-weight: 700; margin: 0; }
    .btn-primary  { background: #1a1a2e; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-size: 14px; cursor: pointer; font-weight: 500; }
    .btn-primary:disabled { opacity: 0.6; }
    .form-card { background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .form-card__title { font-size: 15px; font-weight: 600; margin: 0 0 16px; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px; }
    .form-field { display: flex; flex-direction: column; gap: 4px; }
    .form-field label { font-size: 13px; font-weight: 500; color: #6b7280; }
    .form-input { border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 8px 10px; font-size: 14px; }
    .form-error { color: #dc2626; font-size: 13px; margin-bottom: 8px; }
    .filters { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 16px; }
    .search-input { flex: 1; min-width: 200px; border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 14px; }
    .filter-tabs { display: flex; gap: 4px; }
    .filter-tab { padding: 6px 12px; background: #f3f4f6; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; }
    .filter-tab--active { background: #1a1a2e; color: #fff; }
    .tenant-table { display: flex; flex-direction: column; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
    .tenant-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid #f3f4f6; flex-wrap: wrap; gap: 8px; }
    .tenant-row:last-child { border-bottom: none; }
    .tenant-row--suspended { opacity: 0.65; }
    .tenant-row__name { font-weight: 600; font-size: 15px; }
    .tenant-row__meta { font-size: 12px; color: #9ca3af; margin-top: 2px; }
    .tenant-row__right { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .badge { font-size: 11px; padding: 2px 8px; border-radius: 999px; font-weight: 600; }
    .badge--active    { background: #d1fae5; color: #065f46; }
    .badge--trial     { background: #dbeafe; color: #1e40af; }
    .badge--suspended { background: #fee2e2; color: #991b1b; }
    .badge--cancelled { background: #f3f4f6; color: #6b7280; }
    .plan-select { font-size: 12px; border: 1px solid #e5e7eb; border-radius: 6px; padding: 3px 8px; cursor: pointer; }
    .btn-toggle { font-size: 12px; padding: 4px 10px; border-radius: 6px; border: none; cursor: pointer; font-weight: 500; background: #fee2e2; color: #991b1b; }
    .btn-toggle--off { background: #d1fae5; color: #065f46; }
    .hint { color: #9ca3af; font-size: 14px; padding: 16px; text-align: center; }
  `],
})
export class TenantsComponent implements OnInit {
  private readonly supabase = inject(SUPABASE_CLIENT);

  tenants    = signal<TenantRow[]>([]);
  isLoading  = signal(true);
  isSaving   = signal(false);
  showForm   = signal(false);
  formError  = signal<string | null>(null);
  activeTab  = signal('all');
  searchText = '';

  form = { nome: '', cnpj: '', subdomain: '', email: '', plan: 'basic' as Plan, maxUnidades: 50 };

  statusTabs = [
    { id: 'all',       label: 'Todos' },
    { id: 'trial',     label: 'Trial' },
    { id: 'active',    label: 'Ativos' },
    { id: 'suspended', label: 'Suspensos' },
  ];

  filtered = computed(() => {
    const tab   = this.activeTab();
    const query = this.searchText.toLowerCase();
    return this.tenants()
      .filter(t => tab === 'all' || t.subscription_status === tab)
      .filter(t => !query || t.nome.toLowerCase().includes(query) || (t.subdomain ?? '').toLowerCase().includes(query));
  });

  async ngOnInit(): Promise<void> { await this.load(); }

  private async load(): Promise<void> {
    this.isLoading.set(true);
    const { data } = await this.supabase
      .from('condominios')
      .select('id,nome,subdomain,email,plan,subscription_status,max_unidades,created_at')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    this.tenants.set((data ?? []) as TenantRow[]);
    this.isLoading.set(false);
  }

  async criar(): Promise<void> {
    if (!this.form.nome || !this.form.cnpj) { this.formError.set('Nome e CNPJ obrigatórios'); return; }
    this.formError.set(null);
    this.isSaving.set(true);
    const { error } = await this.supabase.from('condominios').insert({
      nome:                this.form.nome,
      cnpj:                this.form.cnpj,
      subdomain:           this.form.subdomain || null,
      email:               this.form.email     || null,
      plan:                this.form.plan,
      max_unidades:        this.form.maxUnidades,
      subscription_status: 'trial',
    });
    this.isSaving.set(false);
    if (error) { this.formError.set(error.message); return; }
    this.form = { nome: '', cnpj: '', subdomain: '', email: '', plan: 'basic', maxUnidades: 50 };
    this.showForm.set(false);
    await this.load();
  }

  async toggleStatus(t: TenantRow): Promise<void> {
    const newStatus: SubscriptionStatus = t.subscription_status === 'suspended' ? 'active' : 'suspended';
    const { error } = await this.supabase.from('condominios').update({ subscription_status: newStatus }).eq('id', t.id);
    if (!error) this.tenants.update(list => list.map(r => r.id === t.id ? { ...r, subscription_status: newStatus } : r));
  }

  async changePlan(id: string, plan: Plan): Promise<void> {
    const { error } = await this.supabase.from('condominios').update({ plan }).eq('id', id);
    if (!error) this.tenants.update(list => list.map(r => r.id === id ? { ...r, plan } : r));
  }
}
