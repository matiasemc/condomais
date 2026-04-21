import { Component, inject, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SUPABASE_CLIENT } from '@condomais/core';

interface PlatformStats {
  total_tenants: number;
  tenants_trial: number;
  tenants_active: number;
  tenants_suspended: number;
  total_users: number;
  total_deliveries: number;
  pending_deliveries: number;
  total_occurrences: number;
  total_reservations: number;
}

interface RecentTenant {
  id: string;
  nome: string;
  subscription_status: string;
  plan: string;
  created_at: string;
}

@Component({
  selector: 'cm-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RouterLink],
  template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Painel da Plataforma</h2>
      </div>

      <div class="metrics">
        <div class="metric metric--blue">
          <p class="metric__value">{{ stats()?.total_tenants ?? '—' }}</p>
          <p class="metric__label">Tenants</p>
          <p class="metric__sub">{{ stats()?.tenants_active }} ativos · {{ stats()?.tenants_trial }} trial</p>
        </div>
        <div class="metric metric--green">
          <p class="metric__value">{{ stats()?.total_users ?? '—' }}</p>
          <p class="metric__label">Usuários globais</p>
        </div>
        <div class="metric metric--amber">
          <p class="metric__value">{{ stats()?.total_deliveries ?? '—' }}</p>
          <p class="metric__label">Entregas</p>
          <p class="metric__sub">{{ stats()?.pending_deliveries }} pendentes</p>
        </div>
        <div class="metric">
          <p class="metric__value">{{ stats()?.total_occurrences ?? '—' }}</p>
          <p class="metric__label">Ocorrências</p>
        </div>
        <div class="metric">
          <p class="metric__value">{{ stats()?.total_reservations ?? '—' }}</p>
          <p class="metric__label">Reservas</p>
        </div>
        <div class="metric metric--red">
          <p class="metric__value">{{ stats()?.tenants_suspended ?? '—' }}</p>
          <p class="metric__label">Tenants suspensos</p>
        </div>
      </div>

      <div class="section">
        <div class="section__header">
          <h3 class="section__title">Tenants recentes</h3>
          <a class="section__link" routerLink="/tenants">Ver todos</a>
        </div>
        @if (isLoading()) {
          <p class="hint">Carregando...</p>
        } @else {
          @for (t of recentTenants(); track t.id) {
            <div class="tenant-row">
              <div class="tenant-row__body">
                <p class="tenant-row__name">{{ t.nome }}</p>
                <p class="tenant-row__meta">Criado {{ t.created_at | date:'dd/MM/yyyy' }}</p>
              </div>
              <div class="tenant-row__right">
                <span class="badge" [class]="'badge--' + t.subscription_status">{{ t.subscription_status }}</span>
                <span class="plan-chip">{{ t.plan }}</span>
              </div>
            </div>
          } @empty {
            <p class="hint">Nenhum tenant</p>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .page__header { margin-bottom: 24px; }
    .page__title { font-size: 22px; font-weight: 700; margin: 0; }
    .metrics { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; margin-bottom: 32px; }
    .metric { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; border-left: 4px solid #e5e7eb; }
    .metric--blue  { border-left-color: #3b82f6; }
    .metric--green { border-left-color: #10b981; }
    .metric--amber { border-left-color: #f59e0b; }
    .metric--red   { border-left-color: #ef4444; }
    .metric__value { font-size: 2rem; font-weight: 700; color: #111827; line-height: 1; margin-bottom: 6px; }
    .metric__label { font-size: 13px; color: #6b7280; font-weight: 500; }
    .metric__sub   { font-size: 11px; color: #9ca3af; margin-top: 4px; }
    .section { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; }
    .section__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .section__title { font-size: 15px; font-weight: 600; margin: 0; }
    .section__link  { font-size: 13px; color: #3b82f6; text-decoration: none; }
    .tenant-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
    .tenant-row:last-child { border-bottom: none; }
    .tenant-row__name { font-weight: 500; font-size: 14px; }
    .tenant-row__meta { font-size: 12px; color: #9ca3af; }
    .tenant-row__right { display: flex; align-items: center; gap: 8px; }
    .badge { font-size: 11px; padding: 2px 8px; border-radius: 999px; font-weight: 600; }
    .badge--active    { background: #d1fae5; color: #065f46; }
    .badge--trial     { background: #dbeafe; color: #1e40af; }
    .badge--suspended { background: #fee2e2; color: #991b1b; }
    .badge--cancelled { background: #f3f4f6; color: #6b7280; }
    .plan-chip { font-size: 11px; background: #f3f4f6; color: #374151; padding: 2px 8px; border-radius: 6px; }
    .hint { color: #9ca3af; font-size: 14px; padding: 8px 0; }
  `],
})
export class DashboardComponent implements OnInit {
  private readonly supabase = inject(SUPABASE_CLIENT);

  stats         = signal<PlatformStats | null>(null);
  recentTenants = signal<RecentTenant[]>([]);
  isLoading     = signal(true);

  async ngOnInit(): Promise<void> {
    const [statsRes, tenantsRes] = await Promise.all([
      this.supabase.from('v_platform_stats').select('*').single(),
      this.supabase.from('condominios').select('id,nome,subscription_status,plan,created_at')
        .is('deleted_at', null).order('created_at', { ascending: false }).limit(8),
    ]);
    this.stats.set(statsRes.data as PlatformStats ?? null);
    this.recentTenants.set((tenantsRes.data ?? []) as RecentTenant[]);
    this.isLoading.set(false);
  }
}