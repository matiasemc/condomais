import { Injectable, inject, signal } from '@angular/core';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from './supabase-client.service';
import type { Occurrence, OccurrenceImage, OccurrenceStatus, CreateOccurrenceInput } from '../interfaces/index.model';

export interface OccurrenceRealtimeEvent {
  eventType: 'INSERT' | 'UPDATE';
  occurrence: Occurrence;
}

const OCCURRENCE_COLUMNS = 'id,condominio_id,user_id,porteiro_id,titulo,tipo,descricao,local,data_ocorrido,status,resolvida_por,resolucao,created_at,updated_at';
const OCCURRENCE_IMAGE_COLUMNS = 'id,ocorrencia_id,image_url,ordem,created_at';

function mapRow(row: any): Occurrence {
  return {
    id:           row.id,
    condominioId: row.condominio_id,
    userId:       row.user_id ?? null,
    porteiroId:   row.porteiro_id ?? null,
    titulo:       row.titulo ?? null,
    tipo:         row.tipo,
    descricao:    row.descricao,
    local:        row.local ?? null,
    dataOcorrido: row.data_ocorrido,
    status:       row.status,
    resolvidaPor: row.resolvida_por ?? null,
    resolucao:    row.resolucao ?? null,
    createdAt:    row.created_at,
    updatedAt:    row.updated_at,
  };
}

function mapImageRow(row: any): OccurrenceImage {
  return {
    id:           row.id,
    ocorrenciaId: row.ocorrencia_id,
    imageUrl:     row.image_url,
    ordem:        row.ordem,
    createdAt:    row.created_at,
  };
}

@Injectable({ providedIn: 'root' })
export class OccurrenceService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  readonly occurrences = signal<Occurrence[]>([]);
  readonly isLoading   = signal(false);
  readonly error       = signal<string | null>(null);

  private channel: RealtimeChannel | null = null;

  readonly realtimeEvent = signal<OccurrenceRealtimeEvent | null>(null);

  // â”€â”€ Subscriptions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  subscribeToTenant(condominioId: string): void {
    this.stopRealtime();
    this.channel = this.supabase
      .channel(`ocorrencias:tenant:${condominioId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ocorrencias', filter: `condominio_id=eq.${condominioId}` },
        (payload) => this.handleRealtimeEvent(payload),
      )
      .subscribe();
  }

  subscribeForUser(userId: string): void {
    this.stopRealtime();
    this.channel = this.supabase
      .channel(`ocorrencias:user:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ocorrencias', filter: `user_id=eq.${userId}` },
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
      const occurrence = mapRow(newRow);
      this.occurrences.update(list => [occurrence, ...list]);
      this.realtimeEvent.set({ eventType: 'INSERT', occurrence });
    } else if (eventType === 'UPDATE') {
      const occurrence = mapRow(newRow);
      this.occurrences.update(list => list.map(o => o.id === occurrence.id ? occurrence : o));
      this.realtimeEvent.set({ eventType: 'UPDATE', occurrence });
    } else if (eventType === 'DELETE') {
      this.occurrences.update(list => list.filter(o => o.id !== oldRow.id));
    }
  }

  // â”€â”€ Queries â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  async loadMyOccurrences(condominioId: string, userId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    const { data, error } = await this.supabase
      .from('ocorrencias')
      .select(OCCURRENCE_COLUMNS)
      .eq('condominio_id', condominioId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100);
    this.isLoading.set(false);
    if (error) { this.error.set(error.message); return; }
    this.occurrences.set((data ?? []).map(mapRow));
  }

  async loadForTenant(condominioId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    const { data, error } = await this.supabase
      .from('ocorrencias')
      .select(OCCURRENCE_COLUMNS)
      .eq('condominio_id', condominioId)
      .order('created_at', { ascending: false })
      .limit(100);
    this.isLoading.set(false);
    if (error) { this.error.set(error.message); return; }
    this.occurrences.set((data ?? []).map(mapRow));
  }

  async loadById(id: string): Promise<Occurrence | null> {
    const { data, error } = await this.supabase
      .from('ocorrencias')
      .select(OCCURRENCE_COLUMNS)
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return mapRow(data);
  }

  async loadImages(ocorrenciaId: string): Promise<OccurrenceImage[]> {
    const { data, error } = await this.supabase
      .from('ocorrencia_imagens')
      .select(OCCURRENCE_IMAGE_COLUMNS)
      .eq('ocorrencia_id', ocorrenciaId)
      .order('ordem')
      .limit(20);
    if (error || !data) return [];
    return data.map(mapImageRow);
  }

  async create(input: CreateOccurrenceInput): Promise<Occurrence | null> {
    const { data, error } = await this.supabase
      .from('ocorrencias')
      .insert({
        condominio_id: input.condominioId,
        user_id:       input.userId,
        titulo:        input.titulo,
        tipo:          input.tipo,
        descricao:     input.descricao,
        local:         input.local ?? null,
        status:        'aberta',
      })
      .select(OCCURRENCE_COLUMNS)
      .single();
    if (error || !data) { this.error.set(error?.message ?? 'Erro ao criar ocorrÃªncia'); return null; }
    const occurrence = mapRow(data);
    this.occurrences.update(list => [occurrence, ...list]);
    return occurrence;
  }

  async addImage(ocorrenciaId: string, imageUrl: string, ordem = 0): Promise<boolean> {
    const { error } = await this.supabase
      .from('ocorrencia_imagens')
      .insert({ ocorrencia_id: ocorrenciaId, image_url: imageUrl, ordem });
    return !error;
  }

  async updateStatus(id: string, status: OccurrenceStatus, resolucao?: string): Promise<boolean> {
    const patch: any = { status };
    if (resolucao !== undefined) patch.resolucao = resolucao;
    const { error } = await this.supabase
      .from('ocorrencias')
      .update(patch)
      .eq('id', id);
    if (error) { this.error.set(error.message); return false; }
    this.occurrences.update(list =>
      list.map(o => o.id === id ? { ...o, status, resolucao: resolucao ?? o.resolucao } : o)
    );
    return true;
  }
}
