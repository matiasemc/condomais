import { Injectable, inject } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';
import type {
  AddUserMembershipInput,
  UpdateUserManagementInput,
  UserManagementCondominioOption,
  UserManagementDbRole,
  UserManagementListItem,
  UserManagementMembership,
  UserManagementPage,
  UserManagementPageRequest,
  UserManagementRole,
  UserManagementUserDetail,
} from '../interfaces/index.model';

interface UserRow {
  id: string;
  email: string;
  nome: string;
  is_master_admin: boolean;
  created_at: string;
}

interface MembershipRow {
  user_id: string;
  condominio_id: string;
  role: UserManagementDbRole;
  status: string;
  condominio: { nome: string } | { nome: string }[] | null;
}

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  async getUsersPage(request: UserManagementPageRequest): Promise<UserManagementPage> {
    const first = Math.max(request.first, 0);
    const rows = Math.max(request.rows, 1);
    const last = first + rows - 1;
    const sortColumn = this.toUserSortColumn(request.sortField);

    let usersQuery = this.supabase
      .from('users')
      .select('id,email,nome,is_master_admin,created_at', { count: 'exact' });

    const filter = this.toSearchFilter(request.globalFilter);
    if (filter) {
      usersQuery = usersQuery.or(`nome.ilike.%${filter}%,email.ilike.%${filter}%`);
    }

    const usersRes = await usersQuery
      .order(sortColumn, { ascending: request.sortOrder !== -1 })
      .range(first, last);

    if (usersRes.error) {
      throw new Error(usersRes.error.message);
    }

    const users = (usersRes.data ?? []) as UserRow[];
    const userIds = users.map((user) => user.id);
    const counts = await this.getMembershipCounts(userIds);

    return {
      data: users.map((user) => this.mapListItem(user, counts)),
      totalRecords: usersRes.count ?? users.length,
    };
  }

  async getUsers(): Promise<UserManagementListItem[]> {
    const page = await this.getUsersPage({
      first: 0,
      rows: 100,
      sortField: 'name',
      sortOrder: 1,
    });

    return page.data;
  }

  private async getMembershipCounts(userIds: string[]): Promise<Map<string, Set<string>>> {
    const counts = new Map<string, Set<string>>();

    if (!userIds.length) {
      return counts;
    }

    const membershipsRes = await this.supabase
      .from('user_condominios')
      .select('user_id,condominio_id,status')
      .in('user_id', userIds)
      .eq('status', 'active');


    if (membershipsRes.error) {
      throw new Error(membershipsRes.error.message);
    }

    for (const membership of membershipsRes.data ?? []) {
      const userMemberships = counts.get(membership.user_id) ?? new Set<string>();
      userMemberships.add(membership.condominio_id);
      counts.set(membership.user_id, userMemberships);
    }

    return counts;
  }

  private mapListItem(user: UserRow, counts: Map<string, Set<string>>): UserManagementListItem {
    return {
      id: user.id,
      email: user.email,
      name: user.nome,
      isMasterAdmin: user.is_master_admin,
      condominioCount: counts.get(user.id)?.size ?? 0,
      createdAt: user.created_at,
    };
  }

  private toUserSortColumn(sortField: string | null | undefined): string {
    const fields: Record<string, string> = {
      name: 'nome',
      email: 'email',
      createdAt: 'created_at',
      isMasterAdmin: 'is_master_admin',
    };

    return fields[sortField ?? ''] ?? 'nome';
  }

  private toSearchFilter(value: string | null | undefined): string {
    return (value ?? '').trim().replace(/[%,()]/g, '').slice(0, 80);
  }

  async getUserWithMemberships(userId: string): Promise<UserManagementUserDetail> {
    const [userRes, membershipsRes] = await Promise.all([
      this.supabase
        .from('users')
        .select('id,email,nome,is_master_admin')
        .eq('id', userId)
        .single(),
      this.supabase
        .from('user_condominios')
        .select('user_id,condominio_id,role,status,condominio:condominios(nome)')
        .eq('user_id', userId)
        .order('created_at'),
    ]);

    if (userRes.error) {
      throw new Error(userRes.error.message);
    }

    if (membershipsRes.error) {
      throw new Error(membershipsRes.error.message);
    }

    const user = userRes.data as Omit<UserRow, 'created_at'>;

    return {
      id: user.id,
      email: user.email,
      name: user.nome,
      isMasterAdmin: user.is_master_admin,
      memberships: ((membershipsRes.data ?? []) as MembershipRow[])
        .map((membership) => this.mapMembership(membership))
        .sort((a, b) => a.condominioName.localeCompare(b.condominioName)),
    };
  }

  async getCondominios(): Promise<UserManagementCondominioOption[]> {
    const { data, error } = await this.supabase
      .from('condominios')
      .select('id,nome')
      .is('deleted_at', null)
      .order('nome');

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((condominio: { id: string; nome: string }) => ({
      id: condominio.id,
      name: condominio.nome,
    }));
  }

  async updateUser(input: UpdateUserManagementInput): Promise<void> {
    const { error } = await this.supabase
      .from('users')
      .update({
        nome: input.name.trim(),
        is_master_admin: input.isMasterAdmin,
      })
      .eq('id', input.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  async addMembership(input: AddUserMembershipInput): Promise<UserManagementMembership> {
    const duplicate = await this.supabase
      .from('user_condominios')
      .select('user_id', { head: true, count: 'exact' })
      .eq('user_id', input.userId)
      .eq('condominio_id', input.condominioId);

    if (duplicate.error) {
      throw new Error(duplicate.error.message);
    }

    if ((duplicate.count ?? 0) > 0) {
      throw new Error('Este usuÃ¡rio jÃ¡ possui vÃ­nculo com o condomÃ­nio selecionado.');
    }

    const { error } = await this.supabase
      .from('user_condominios')
      .insert({
        user_id: input.userId,
        condominio_id: input.condominioId,
        role: this.toDbRole(input.role),
        status: 'active',
      });

    if (error) {
      throw new Error(error.message);
    }

    return this.getMembership(input.userId, input.condominioId);
  }

  async updateMembershipRole(id: string, role: UserManagementRole): Promise<UserManagementMembership> {
    const key = this.parseMembershipId(id);
    const { error } = await this.supabase
      .from('user_condominios')
      .update({ role: this.toDbRole(role) })
      .eq('user_id', key.userId)
      .eq('condominio_id', key.condominioId);

    if (error) {
      throw new Error(error.message);
    }

    return this.getMembership(key.userId, key.condominioId);
  }

  async removeMembership(id: string): Promise<void> {
    const key = this.parseMembershipId(id);
    const { error } = await this.supabase
      .from('user_condominios')
      .delete()
      .eq('user_id', key.userId)
      .eq('condominio_id', key.condominioId);

    if (error) {
      throw new Error(error.message);
    }
  }

  private async getMembership(userId: string, condominioId: string): Promise<UserManagementMembership> {
    const { data, error } = await this.supabase
      .from('user_condominios')
      .select('user_id,condominio_id,role,status,condominio:condominios(nome)')
      .eq('user_id', userId)
      .eq('condominio_id', condominioId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return this.mapMembership(data as MembershipRow);
  }

  private mapMembership(membership: MembershipRow): UserManagementMembership {
    return {
      id: `${membership.user_id}:${membership.condominio_id}`,
      userId: membership.user_id,
      condominioId: membership.condominio_id,
      condominioName: this.getCondominioName(membership.condominio, membership.condominio_id),
      role: this.toUiRole(membership.role),
      status: membership.status,
    };
  }

  private getCondominioName(
    condominio: MembershipRow['condominio'],
    fallback: string,
  ): string {
    if (Array.isArray(condominio)) {
      return condominio[0]?.nome ?? fallback;
    }

    return condominio?.nome ?? fallback;
  }

  private toUiRole(role: UserManagementDbRole): UserManagementRole {
    const roles: Record<UserManagementDbRole, UserManagementRole> = {
      morador: 'MORADOR',
      porteiro: 'PORTEIRO',
      sindico: 'SINDICO',
      conselho: 'CONSELHO',
    };

    return roles[role];
  }

  private toDbRole(role: UserManagementRole): UserManagementDbRole {
    const roles: Record<UserManagementRole, UserManagementDbRole> = {
      MORADOR: 'morador',
      PORTEIRO: 'porteiro',
      SINDICO: 'sindico',
      CONSELHO: 'conselho',
    };

    return roles[role];
  }

  private parseMembershipId(id: string): { userId: string; condominioId: string } {
    const [userId, condominioId] = id.split(':');

    if (!userId || !condominioId) {
      throw new Error('Identificador de vÃ­nculo invÃ¡lido.');
    }

    return { userId, condominioId };
  }
}
