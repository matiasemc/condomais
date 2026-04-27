import { Injectable, inject, signal } from '@angular/core';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from './supabase-client.service';
import type { Delivery, CreateDeliveryInput } from '../interfaces/index.model';

export interface DeliveryRealtimeEvent {
  eventType: 'INSERT' | 'UPDATE';
  delivery: Delivery;
}

export interface ResidentOption {
  id: string;
  name: string;
  unit: string;
}

const DELIVERY_COLUMNS = 'id,condominio_id,morador_id,porteiro_id,recebido_por,unidade,transportadora,codigo_rastreamento,tipo,descricao,foto_url,status,data_retirada,quem_retirou,created_at,updated_at';

function mapRow(row: any): Delivery {
  return {
    id: row.id,
    condominioId: row.condominio_id,
    moradorId: row.morador_id ?? null,
    porteiroId: row.porteiro_id ?? null,
    recebidoPor: row.recebido_por ?? null,
    unidade: row.unidade,
    transportadora: row.transportadora ?? null,
    codigoRastreamento: row.codigo_rastreamento ?? null,
    tipo: row.tipo,
    descricao: row.descricao ?? null,
    fotoUrl: row.foto_url ?? null,
    status: row.status,
    dataRetirada: row.data_retirada ?? null,
    quemRetirou: row.quem_retirou ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

@Injectable({ providedIn: 'root' })
export class DeliveryService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  readonly deliveries = signal<Delivery[]>([]);
  readonly isLoading  = signal(false);
  readonly error      = signal<string | null>(null);

  private channel: RealtimeChannel | null = null;

  readonly realtimeEvent = signal<DeliveryRealtimeEvent | null>(null);

  subscribeToTenant(condominioId: string): void {
    this.stopRealtime();
    this.channel = this.supabase
      .channel(`entregas:tenant:${condominioId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'entregas', filter: `condominio_id=eq.${condominioId}` },
        (payload) => this.handleRealtimeEvent(payload),
      )
      .subscribe();
  }

  subscribeForUser(userId: string): void {
    this.stopRealtime();
    this.channel = this.supabase
      .channel(`entregas:user:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'entregas', filter: `morador_id=eq.${userId}` },
        (payload) => this.handleRealtimeEvent(payload),
      )
      .subscribe();
  }

  stopRealtime(): void {
    if (this.channel) {
      this.supabase.removeChannel(this.channel);
      this.channel = null;
    }
  }

  private handleRealtimeEvent(payload: any): void {
    const { eventType, new: newRow, old: oldRow } = payload;
    if (eventType === 'INSERT') {
      const delivery = mapRow(newRow);
      this.deliveries.update(list => [delivery, ...list]);
      this.realtimeEvent.set({ eventType: 'INSERT', delivery });
    } else if (eventType === 'UPDATE') {
      const delivery = mapRow(newRow);
      if (newRow.deleted_at) {
        this.deliveries.update(list => list.filter(d => d.id !== delivery.id));
      } else {
        this.deliveries.update(list => list.map(d => d.id === delivery.id ? delivery : d));
        this.realtimeEvent.set({ eventType: 'UPDATE', delivery });
      }
    } else if (eventType === 'DELETE') {
      this.deliveries.update(list => list.filter(d => d.id !== oldRow.id));
    }
  }

  async loadForTenant(condominioId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    const { data, error } = await this.supabase
      .from('entregas')
      .select(DELIVERY_COLUMNS)
      .eq('condominio_id', condominioId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(100);
    this.isLoading.set(false);
    if (error) { this.error.set(error.message); return; }
    this.deliveries.set((data ?? []).map(mapRow));
    this.subscribeToTenant(condominioId);
  }

  async loadForUnit(condominioId: string, unidade: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    const { data, error } = await this.supabase
      .from('entregas')
      .select(DELIVERY_COLUMNS)
      .eq('condominio_id', condominioId)
      .eq('unidade', unidade)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(100);
    this.isLoading.set(false);
    if (error) { this.error.set(error.message); return; }
    this.deliveries.set((data ?? []).map(mapRow));
  }

  async loadById(id: string): Promise<Delivery | null> {
    const { data, error } = await this.supabase
      .from('entregas')
      .select(DELIVERY_COLUMNS)
      .eq('id', id)
      .is('deleted_at', null)
      .single();
    if (error || !data) return null;
    return mapRow(data);
  }

  async marcarRetirada(id: string, quemRetirou: string): Promise<boolean> {
    const now = new Date().toISOString();
    const { error } = await this.supabase
      .from('entregas')
      .update({ status: 'retirada', data_retirada: now, quem_retirou: quemRetirou })
      .eq('id', id);
    if (error) { this.error.set(error.message); return false; }
    this.deliveries.update(list =>
      list.map(d => d.id === id ? { ...d, status: 'retirada' as const, dataRetirada: now, quemRetirou } : d)
    );
    return true;
  }

  async loadForUser(userId: string, condominioId?: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    let query = this.supabase
      .from('entregas')
      .select(DELIVERY_COLUMNS)
      .eq('morador_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(100);
    if (condominioId) query = query.eq('condominio_id', condominioId);
    const { data, error } = await query;
    this.isLoading.set(false);
    if (error) { this.error.set(error.message); return; }
    this.deliveries.set((data ?? []).map(mapRow));
    this.subscribeForUser(userId);
  }

  async create(input: CreateDeliveryInput): Promise<Delivery | null> {
    const { data, error } = await this.supabase
      .from('entregas')
      .insert({
        condominio_id: input.condominioId,
        unidade:       input.unidade,
        morador_id:    input.moradorId ?? null,
        tipo:          input.tipo,
        transportadora: input.transportadora ?? null,
        descricao:     input.descricao ?? null,
        status:        'pendente',
      })
      .select(DELIVERY_COLUMNS)
      .single();
    if (error || !data) { this.error.set(error?.message ?? 'Erro ao criar entrega'); return null; }
    const delivery = mapRow(data);
    this.deliveries.update(list => [delivery, ...list]);
    return delivery;
  }

  async markAsReceived(id: string, userId: string): Promise<boolean> {
    return this.marcarRetirada(id, userId);
  }

  async loadResidents(condominioId: string): Promise<ResidentOption[]> {
    const { data, error } = await this.supabase
      .from('user_condominios')
      .select('metadata, user:users(id, nome)')
      .eq('condominio_id', condominioId)
      .eq('role', 'morador')
      .eq('status', 'active');
    if (error || !data) return [];
    return (data as any[])
      .filter(row => row.user)
      .map(row => ({
        id:   row.user.id as string,
        name: row.user.nome as string,
        unit: (row.metadata as any)?.unidade ?? '',
      }));
  }
}
