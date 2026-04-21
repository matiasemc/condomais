import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SUPABASE_CLIENT } from '@condomais/core';

interface GlobalUser {
  id: string;
  nome: string;
  email: string;
  created_at: string;
}

interface MembershipRow {
  user_id: string;
  condominio_id: string;
  condominio_nome: string;
  role: string;
  status: string;
}

interface TenantOption {
  id: string;
  nome: string;
}

@Component({
  selector: 'cm-users',
  standalone: true,
  imports: [FormsModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Usuários Globais</h2>
        <span class="page__count">{{ filtered().length }} usuário(s)</span>
      </div>

      <div class="filters">
        <input class="search-input" type="text" [(ngModel)]="searchText" placeholder="Buscar por nome ou e-mail..."/>
      </div>

      @if (isLoading()) {
        <p class="hint">Carregando...</p>
      } @else {
        <div class="user-table">
          @for (u of filtered(); track u.id) {
            <div class="user-section">
              <div class="user-row" (click)="toggle(u.id)">
                <div class="user-row__avatar">{{ u.nome.charAt(0).toUpperCase() }}</div>
                <div class="user-row__body">
                  <p class="user-row__name">{{ u.nome }}</p>
                  <p class="user-row__email">{{ u.email }} · desde {{ u.created_at | date:'MM/yyyy' }}</p>
                </div>
                <span class="user-row__chevron">{{ expanded() === u.id ? '▲' : '▼' }}</span>
              </div>

              @if (expanded() === u.id) {
                <div class="memberships">
                  <p class="memberships__label">Memberships</p>

                  @for (m of membershipsFor(u.id); track m.condominio_id) {
                    <div class="membership-row">
                      <span class="membership-row__tenant">{{ m.condominio_nome }}</span>
                      <span class="role-badge" [class]="'role-badge--' + m.role">{{ m.role }}</span>
                      <span class="membership-row__status">{{ m.status }}</span>
                      <button class="btn-remove" (click)="removeMembership(u.id, m.condominio_id)">Remover</button>
                    </div>
                  } @empty {
                    <p class="hint-sm">Sem memberships</p>
                  }

                  <div class="add-form">
                    <select class="input-sm" [(ngModel)]="addTenant[u.id]">
                      <option value="">Tenant...</option>
                      @for (t of tenants(); track t.id) {
                        <option [value]="t.id">{{ t.nome }}</option>
                      }
                    </select>
                    <select class="input-sm" [(ngModel)]="addRole[u.id]">
                      <option value="morador">Morador</option>
                      <option value="porteiro">Porteiro</option>
                      <option value="sindico">Síndico</option>
                      <option value="conselho">Conselho</option>
                    </select>
                    <button class="btn-add" [disabled]="!addTenant[u.id]" (click)="addMembership(u.id)">+ Adicionar</button>
                  </div>
                </div>
              }
            </div>
          } @empty {
            <p class="hint">Nenhum usuário encontrado</p>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page__header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
    .page__title  { font-size: 22px; font-weight: 700; margin: 0; }
    .page__count  { font-size: 13px; color: #9ca3af; }
    .filters { margin-bottom: 16px; }
    .search-input { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 14px; box-sizing: border-box; }
    .user-table { display: flex; flex-direction: column; gap: 1px; background: #e5e7eb; border-radius: 12px; overflow: hidden; }
    .user-section { background: #fff; }
    .user-row { display: flex; align-items: center; gap: 12px; padding: 12px 16px; cursor: pointer; }
    .user-row:hover { background: #f9fafb; }
    .user-row__avatar { width: 36px; height: 36px; border-radius: 50%; background: #1a1a2e; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; flex-shrink: 0; }
    .user-row__body { flex: 1; min-width: 0; }
    .user-row__name  { font-weight: 600; font-size: 14px; }
    .user-row__email { font-size: 12px; color: #9ca3af; }
    .user-row__chevron { color: #9ca3af; font-size: 11px; }
    .memberships { padding: 0 16px 14px 64px; background: #fafafa; border-top: 1px solid #f3f4f6; }
    .memberships__label { font-size: 11px; font-weight: 600; color: #6b7280; margin: 10px 0 6px; text-transform: uppercase; letter-spacing: 0.5px; }
    .membership-row { display: flex; align-items: center; gap: 8px; padding: 5px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
    .membership-row__tenant { flex: 1; font-weight: 500; }
    .membership-row__status { font-size: 11px; color: #9ca3af; }
    .btn-remove { font-size: 11px; color: #dc2626; background: none; border: 1px solid #dc2626; border-radius: 4px; padding: 2px 6px; cursor: pointer; }
    .add-form { display: flex; gap: 8px; align-items: center; margin-top: 10px; flex-wrap: wrap; }
    .input-sm { border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 5px 8px; font-size: 13px; }
    .btn-add { font-size: 12px; background: #1a1a2e; color: #fff; border: none; border-radius: 6px; padding: 5px 12px; cursor: pointer; }
    .btn-add:disabled { opacity: 0.5; }
    .hint    { color: #9ca3af; font-size: 14px; padding: 16px; text-align: center; }
    .hint-sm { color: #9ca3af; font-size: 12px; padding: 4px 0; }
    .role-badge { font-size: 11px; padding: 2px 7px; border-radius: 999px; font-weight: 600; }
    .role-badge--sindico  { background: #dbeafe; color: #1e40af; }
    .role-badge--morador  { background: #d1fae5; color: #065f46; }
    .role-badge--porteiro { background: #fef3c7; color: #92400e; }
    .role-badge--conselho { background: #ede9fe; color: #5b21b6; }
  `],
})
export class UsersComponent implements OnInit {
  private readonly supabase = inject(SUPABASE_CLIENT);

  users       = signal<GlobalUser[]>([]);
  memberships = signal<MembershipRow[]>([]);
  tenants     = signal<TenantOption[]>([]);
  isLoading   = signal(true);
  expanded    = signal<string | null>(null);
  searchText  = '';
  addTenant: Record<string, string> = {};
  addRole:   Record<string, string> = {};

  filtered = computed(() => {
    const q = this.searchText.toLowerCase();
    return this.users().filter(u => !q || u.nome.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  });

  membershipsFor(userId: string): MembershipRow[] {
    return this.memberships().filter(m => m.user_id === userId);
  }

  async ngOnInit(): Promise<void> {
    const [usersRes, membershipsRes, tenantsRes] = await Promise.all([
      this.supabase.from('users').select('id,nome,email,created_at').order('created_at', { ascending: false }),
      this.supabase.from('user_condominios').select('user_id,condominio_id,role,status,condominio:condominios(nome)'),
      this.supabase.from('condominios').select('id,nome').is('deleted_at', null).order('nome'),
    ]);
    this.users.set((usersRes.data ?? []) as GlobalUser[]);
    this.memberships.set(
      ((membershipsRes.data ?? []) as any[]).map(row => ({
        user_id:         row.user_id,
        condominio_id:   row.condominio_id,
        condominio_nome: (row.condominio as any)?.nome ?? row.condominio_id,
        role:            row.role,
        status:          row.status,
      }))
    );
    this.tenants.set((tenantsRes.data ?? []) as TenantOption[]);
    this.isLoading.set(false);
  }

  toggle(userId: string): void {
    this.expanded.update(cur => cur === userId ? null : userId);
    if (!this.addRole[userId]) this.addRole[userId] = 'morador';
  }

  async addMembership(userId: string): Promise<void> {
    const tenantId = this.addTenant[userId];
    const role     = this.addRole[userId] ?? 'morador';
    if (!tenantId) return;
    const { error } = await this.supabase.from('user_condominios').upsert(
      { user_id: userId, condominio_id: tenantId, role, status: 'active' },
      { onConflict: 'user_id,condominio_id' }
    );
    if (error) return;
    const tenantNome = this.tenants().find(t => t.id === tenantId)?.nome ?? tenantId;
    this.memberships.update(list => [
      ...list.filter(m => !(m.user_id === userId && m.condominio_id === tenantId)),
      { user_id: userId, condominio_id: tenantId, condominio_nome: tenantNome, role, status: 'active' },
    ]);
    this.addTenant[userId] = '';
  }

  async removeMembership(userId: string, tenantId: string): Promise<void> {
    if (!confirm('Remover esta membership?')) return;
    const { error } = await this.supabase.from('user_condominios')
      .delete().eq('user_id', userId).eq('condominio_id', tenantId);
    if (!error) this.memberships.update(list => list.filter(m => !(m.user_id === userId && m.condominio_id === tenantId)));
  }
}
