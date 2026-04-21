import { Injectable, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/client';
import type {
  Reservation,
  Equipamento,
  CreateReservationInput,
  ReservationStatus,
} from '../models/index';

export interface ReservationRealtimeEvent {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  reservation: Reservation;
}

function mapEquipamentoRow(row: any): Equipamento {
  return {
    id:            row.id,
    condominioId:  row.condominio_id,
    nome:          row.nome,
    descricao:     row.descricao ?? null,
    capacidade:    row.capacidade ?? null,
    regras:        row.regras ?? {},
    horarioInicio: row.horario_inicio,
    horarioFim:    row.horario_fim,
    ativo:         row.ativo,
    imageUrl:      row.image_url ?? null,
    createdAt:     row.created_at,
    updatedAt:     row.updated_at,
  };
}

function mapRow(row: any): Reservation {
  return {
    id:               row.id,
    condominioId:     row.condominio_id,
    equipamentoId:    row.equipamento_id,
    moradorId:        row.morador_id,
    data:             row.data,
    horaInicio:       (row.hora_inicio as string)?.slice(0, 5) ?? row.hora_inicio,
    horaFim:          (row.hora_fim    as string)?.slice(0, 5) ?? row.hora_fim,
    motivo:           row.motivo ?? null,
    numConvidados:    row.num_convidados ?? 0,
    status:           row.status,
    googleEventId:    row.google_event_id ?? null,
    googleCalendarId: row.google_calendar_id ?? null,
    createdAt:        row.created_at,
    updatedAt:        row.updated_at,
    equipamento:      row.equipamento
      ? { id: row.equipamento.id, nome: row.equipamento.nome, imageUrl: row.equipamento.image_url ?? null }
      : undefined,
    morador: row.morador
      ? { id: row.morador.id, nome: row.morador.nome, email: row.morador.email }
      : undefined,
  };
}

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  readonly reservations = signal<Reservation[]>([]);
  readonly equipamentos  = signal<Equipamento[]>([]);
  readonly isLoading     = signal(false);
  readonly error         = signal<string | null>(null);

  private channel: RealtimeChannel | null = null;

  readonly realtimeEvents$ = new Subject<ReservationRealtimeEvent>();

  // ── Realtime ──────────────────────────────────────────────

  subscribeToTenant(condominioId: string): void {
    this.stopRealtime();
    this.channel = this.supabase
      .channel(`reservas:tenant:${condominioId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reservas', filter: `condominio_id=eq.${condominioId}` },
        (payload) => this.handleRealtimeEvent(payload),
      )
      .subscribe();
  }

  subscribeForUser(userId: string): void {
    this.stopRealtime();
    this.channel = this.supabase
      .channel(`reservas:user:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reservas', filter: `morador_id=eq.${userId}` },
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
      const reservation = mapRow(newRow);
      this.reservations.update(list => [reservation, ...list]);
      this.realtimeEvents$.next({ eventType: 'INSERT', reservation });
    } else if (eventType === 'UPDATE') {
      const reservation = mapRow(newRow);
      this.reservations.update(list =>
        list.map(r => r.id === reservation.id ? reservation : r),
      );
      this.realtimeEvents$.next({ eventType: 'UPDATE', reservation });
    } else if (eventType === 'DELETE') {
      const reservation = mapRow(oldRow);
      this.reservations.update(list => list.filter(r => r.id !== oldRow.id));
      this.realtimeEvents$.next({ eventType: 'DELETE', reservation });
    }
  }

  // ── Equipamentos ─────────────────────────────────────────

  async loadEquipamentos(condominioId: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('equipamentos')
      .select('*')
      .eq('condominio_id', condominioId)
      .eq('ativo', true)
      .order('nome');
    if (error) { this.error.set(error.message); return; }
    this.equipamentos.set((data ?? []).map(mapEquipamentoRow));
  }

  async loadAllEquipamentos(condominioId: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('equipamentos')
      .select('*')
      .eq('condominio_id', condominioId)
      .order('nome');
    if (error) { this.error.set(error.message); return; }
    this.equipamentos.set((data ?? []).map(mapEquipamentoRow));
  }

  async createEquipamento(input: {
    condominioId: string;
    nome: string;
    descricao?: string;
    capacidade?: number;
    horarioInicio?: string;
    horarioFim?: string;
  }): Promise<Equipamento | null> {
    const { data, error } = await this.supabase
      .from('equipamentos')
      .insert({
        condominio_id:  input.condominioId,
        nome:           input.nome,
        descricao:      input.descricao ?? null,
        capacidade:     input.capacidade ?? null,
        horario_inicio: input.horarioInicio ?? '08:00',
        horario_fim:    input.horarioFim    ?? '22:00',
      })
      .select()
      .single();
    if (error || !data) { this.error.set(error?.message ?? 'Erro ao criar equipamento'); return null; }
    const eq = mapEquipamentoRow(data);
    this.equipamentos.update(list => [...list, eq]);
    return eq;
  }

  async toggleEquipamento(id: string, ativo: boolean): Promise<boolean> {
    const { error } = await this.supabase
      .from('equipamentos')
      .update({ ativo })
      .eq('id', id);
    if (error) { this.error.set(error.message); return false; }
    this.equipamentos.update(list => list.map(e => e.id === id ? { ...e, ativo } : e));
    return true;
  }

  // ── Reservas ─────────────────────────────────────────────

  async loadMyReservations(condominioId: string, userId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    const { data, error } = await this.supabase
      .from('reservas')
      .select('*, equipamento:equipamentos(id,nome,image_url)')
      .eq('condominio_id', condominioId)
      .eq('morador_id', userId)
      .is('deleted_at', null)
      .order('data', { ascending: false })
      .order('hora_inicio', { ascending: false });
    this.isLoading.set(false);
    if (error) { this.error.set(error.message); return; }
    this.reservations.set((data ?? []).map(mapRow));
    this.subscribeForUser(userId);
  }

  async loadForTenant(condominioId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    const { data, error } = await this.supabase
      .from('reservas')
      .select('*, equipamento:equipamentos(id,nome,image_url), morador:users(id,nome,email)')
      .eq('condominio_id', condominioId)
      .is('deleted_at', null)
      .order('data', { ascending: false })
      .order('hora_inicio', { ascending: false });
    this.isLoading.set(false);
    if (error) { this.error.set(error.message); return; }
    this.reservations.set((data ?? []).map(mapRow));
    this.subscribeToTenant(condominioId);
  }

  async loadForDate(equipamentoId: string, data: string): Promise<Reservation[]> {
    const { data: rows, error } = await this.supabase
      .from('reservas')
      .select('*')
      .eq('equipamento_id', equipamentoId)
      .eq('data', data)
      .eq('status', 'confirmada')
      .is('deleted_at', null);
    if (error || !rows) return [];
    return rows.map(mapRow);
  }

  async create(input: CreateReservationInput): Promise<Reservation | null> {
    const { data, error } = await this.supabase
      .from('reservas')
      .insert({
        condominio_id:  input.condominioId,
        equipamento_id: input.equipamentoId,
        morador_id:     input.moradorId,
        data:           input.data,
        hora_inicio:    input.horaInicio,
        hora_fim:       input.horaFim,
        motivo:         input.motivo ?? null,
        num_convidados: input.numConvidados ?? 0,
        status:         'confirmada',
      })
      .select('*, equipamento:equipamentos(id,nome,image_url)')
      .single();
    if (error || !data) {
      this.error.set(error?.message ?? 'Erro ao criar reserva');
      return null;
    }
    const reservation = mapRow(data);
    this.reservations.update(list => [reservation, ...list]);
    return reservation;
  }

  async cancel(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('reservas')
      .update({ status: 'cancelada' as ReservationStatus })
      .eq('id', id);
    if (error) { this.error.set(error.message); return false; }
    this.reservations.update(list =>
      list.map(r => r.id === id ? { ...r, status: 'cancelada' as ReservationStatus } : r),
    );
    return true;
  }

  async updateGoogleEventId(id: string, googleEventId: string, googleCalendarId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('reservas')
      .update({ google_event_id: googleEventId, google_calendar_id: googleCalendarId })
      .eq('id', id);
    if (error) return false;
    this.reservations.update(list =>
      list.map(r => r.id === id ? { ...r, googleEventId, googleCalendarId } : r),
    );
    return true;
  }
}
