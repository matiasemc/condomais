import { Injectable, inject, signal } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';
import type { Announcement } from '../interfaces/index.model';

interface AnnouncementRow {
  id: string;
  condominio_id: string;
  titulo: string;
  mensagem: string;
  prioridade: 'baixa' | 'normal' | 'alta' | 'urgente';
  publicado_em: string | null;
  expira_em: string | null;
  image_url: string | null;
}

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  readonly announcements = signal<Announcement[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  async loadForTenant(condominioId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    const { data, error } = await this.supabase
      .from('avisos')
      .select('id,condominio_id,titulo,mensagem,prioridade,publicado_em,expira_em,image_url')
      .eq('condominio_id', condominioId)
      .eq('status', 'publicado')
      .order('publicado_em', { ascending: false })
      .limit(50);

    this.isLoading.set(false);

    if (error) {
      this.error.set(error.message);
      this.announcements.set([]);
      return;
    }

    this.announcements.set(((data ?? []) as AnnouncementRow[]).map(mapAnnouncement));
  }

  async loadById(id: string): Promise<Announcement | null> {
    const { data, error } = await this.supabase
      .from('avisos')
      .select('id,condominio_id,titulo,mensagem,prioridade,publicado_em,expira_em,image_url')
      .eq('id', id)
      .eq('status', 'publicado')
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return mapAnnouncement(data as AnnouncementRow);
  }
}

function mapAnnouncement(row: AnnouncementRow): Announcement {
  return {
    id: row.id,
    condominioId: row.condominio_id,
    titulo: row.titulo,
    mensagem: row.mensagem,
    prioridade: row.prioridade === 'normal' ? 'media' : row.prioridade,
    publicadoEm: row.publicado_em,
    expiraEm: row.expira_em,
    imageUrl: row.image_url,
    fixado: row.prioridade === 'alta' || row.prioridade === 'urgente',
  };
}
