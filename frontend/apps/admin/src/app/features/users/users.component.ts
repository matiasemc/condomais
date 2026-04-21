import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { SUPABASE_CLIENT, AuthState } from '@condomais/core';
import { BadgeComponent, EmptyStateComponent, SearchInputComponent } from '@condomais/ui';

interface UserRow {
  id: string;
  nome: string;
  email: string;
  role: string;
  unidade: string | null;
  ativo: boolean;
}

@Component({
  selector: 'cm-admin-users',
  standalone: true,
  imports: [BadgeComponent, EmptyStateComponent, SearchInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Usuários</h2>
        <span class="admin-page__count">{{ filtered().length }} usuário(s)</span>
      </div>

      <div class="admin-page__filters">
        <cm-search-input placeholder="Buscar por nome, e-mail ou unidade..."
          (valueChange)="search.set($event)"></cm-search-input>
        <div class="filter-tabs">
          @for (tab of tabs; track tab.id) {
            <button class="filter-tab" [class.filter-tab--active]="activeTab() === tab.id"
              (click)="activeTab.set(tab.id)">{{ tab.label }}</button>
          }
        </div>
      </div>

      @if (isLoading()) {
        <cm-empty-state icon="⏳" title="Carregando…" subtitle=""></cm-empty-state>
      } @else {
        <div class="user-table">
          @for (u of filtered(); track u.id) {
            <div class="user-row">
              <div class="user-row__avatar">{{ u.nome.charAt(0).toUpperCase() }}</div>
              <div class="user-row__body">
                <p class="user-row__name">{{ u.nome }}</p>
                <p class="user-row__email">{{ u.email }}{{ u.unidade ? ' · Unidade ' + u.unidade : '' }}</p>
              </div>
              <cm-badge [variant]="roleVariant(u.role)">{{ roleLabel(u.role) }}</cm-badge>
            </div>
          } @empty {
            <cm-empty-state icon="👥" title="Nenhum usuário encontrado" subtitle="Tente ajustar os filtros."></cm-empty-state>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .filter-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
    .filter-tab { padding: 6px 14px; background: #f3f4f6; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; color: #374151; }
    .filter-tab--active { background: #2d6a4f; color: #fff; }
    .user-table { display: flex; flex-direction: column; }
    .user-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
    .user-row:last-child { border-bottom: none; }
    .user-row__avatar { width: 38px; height: 38px; border-radius: 50%; background: #2d6a4f; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0; }
    .user-row__body { flex: 1; min-width: 0; }
    .user-row__name  { font-weight: 600; font-size: 14px; }
    .user-row__email { font-size: 12px; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  `],
})
export class AdminUsersComponent implements OnInit {
  private readonly supabase = inject(SUPABASE_CLIENT);
  private readonly state    = inject(AuthState);

  users     = signal<UserRow[]>([]);
  isLoading = signal(false);
  search    = signal('');
  activeTab = signal('all');

  tabs = [
    { id: 'all',      label: 'Todos' },
    { id: 'MORADOR',  label: 'Moradores' },
    { id: 'SINDICO',  label: 'Síndicos' },
    { id: 'PORTEIRO', label: 'Porteiros' },
  ];

  filtered = computed(() => {
    const tab   = this.activeTab();
    const query = this.search().toLowerCase();
    return this.users()
      .filter(u => tab === 'all' || u.role === tab)
      .filter(u => !query || u.nome.toLowerCase().includes(query) || u.email.toLowerCase().includes(query) || (u.unidade ?? '').toLowerCase().includes(query));
  });

  async ngOnInit(): Promise<void> {
    const tenant = this.state.currentTenant();
    if (!tenant) return;
    this.isLoading.set(true);
    const { data, error } = await this.supabase
      .from('user_condominios')
      .select('role, ativo, metadata, user:users(id, nome, email)')
      .eq('condominio_id', tenant.id)
      .eq('ativo', true)
      .order('role');
    this.isLoading.set(false);
    if (error || !data) return;
    this.users.set(
      (data as any[])
        .filter(row => row.user)
        .map(row => ({
          id:      row.user.id,
          nome:    row.user.nome,
          email:   row.user.email,
          role:    row.role,
          unidade: (row.metadata as any)?.unidade ?? null,
          ativo:   row.ativo,
        }))
    );
  }

  roleLabel(role: string): string {
    const map: Record<string, string> = {
      MORADOR: 'Morador', SINDICO: 'Síndico',
      CONSELHO: 'Conselho', PORTEIRO: 'Porteiro',
    };
    return map[role] ?? role;
  }

  roleVariant(role: string): 'accent' | 'warning' | 'success' {
    if (role === 'SINDICO' || role === 'CONSELHO') return 'accent';
    if (role === 'PORTEIRO') return 'warning';
    return 'success';
  }
}
