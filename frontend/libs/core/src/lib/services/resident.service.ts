import { Injectable, inject, signal } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';
import type { ResidentDelivery, ResidentProfile, ResidentSummary } from '../interfaces/index.model';

interface ResidentRow {
  user_id: string;
  status: string;
  metadata: { unidade?: string } | null;
  user: { nome: string; telefone: string | null } | { nome: string; telefone: string | null }[] | null;
}

interface DeliveryRow {
  id: string;
  transportadora: string | null;
  tipo: string;
  descricao: string | null;
  created_at: string;
  status: 'pendente' | 'notificada' | 'retirada';
}

@Injectable({ providedIn: 'root' })
export class ResidentService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  readonly residents = signal<ResidentSummary[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  async loadForTenant(condominioId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    const { data, error } = await this.supabase
      .from('user_condominios')
      .select('user_id,status,metadata,user:users(nome,telefone)')
      .eq('condominio_id', condominioId)
      .eq('role', 'morador')
      .order('joined_at', { ascending: false })
      .limit(100);

    if (error) {
      this.isLoading.set(false);
      this.error.set(error.message);
      this.residents.set([]);
      return;
    }

    const residents = ((data ?? []) as ResidentRow[]).map(mapResidentRow);
    const enriched = await Promise.all(
      residents.map(async resident => ({
        ...resident,
        pendingDeliveries: await this.countPendingDeliveries(condominioId, resident.unit),
      })),
    );

    this.residents.set(enriched);
    this.isLoading.set(false);
  }

  async loadProfile(condominioId: string, userId: string): Promise<ResidentProfile | null> {
    const { data, error } = await this.supabase
      .from('user_condominios')
      .select('user_id,status,metadata,user:users(nome,telefone)')
      .eq('condominio_id', condominioId)
      .eq('user_id', userId)
      .eq('role', 'morador')
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    const resident = mapResidentRow(data as ResidentRow);
    const deliveries = await this.loadDeliveries(condominioId, resident.unit);

    return {
      ...resident,
      pendingDeliveries: deliveries.filter(delivery => delivery.status === 'pendente').length,
      deliveries,
    };
  }

  private async countPendingDeliveries(condominioId: string, unidade: string): Promise<number> {
    if (!unidade) {
      return 0;
    }

    const { count, error } = await this.supabase
      .from('entregas')
      .select('id', { count: 'exact', head: true })
      .eq('condominio_id', condominioId)
      .eq('unidade', unidade)
      .in('status', ['pendente', 'notificada'])
      .is('deleted_at', null);

    return error ? 0 : count ?? 0;
  }

  private async loadDeliveries(condominioId: string, unidade: string): Promise<ResidentDelivery[]> {
    if (!unidade) {
      return [];
    }

    const { data, error } = await this.supabase
      .from('entregas')
      .select('id,transportadora,tipo,descricao,created_at,status')
      .eq('condominio_id', condominioId)
      .eq('unidade', unidade)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      return [];
    }

    return ((data ?? []) as DeliveryRow[]).map(row => ({
      id: row.id,
      description: row.descricao ?? row.transportadora ?? row.tipo,
      arrivedAt: row.created_at,
      status: row.status === 'retirada' ? 'retirada' : 'pendente',
    }));
  }
}

function mapResidentRow(row: ResidentRow): ResidentSummary {
  const user = Array.isArray(row.user) ? row.user[0] : row.user;

  return {
    id: row.user_id,
    name: user?.nome || 'Morador',
    unit: row.metadata?.unidade ?? '',
    phone: user?.telefone ?? '',
    pendingDeliveries: 0,
    status: row.status === 'active' ? 'ativo' : 'inativo',
  };
}
