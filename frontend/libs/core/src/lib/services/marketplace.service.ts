import { Injectable, inject, signal } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';
import type { MarketplaceItem } from '../interfaces/index.model';

interface MarketplaceRow {
  id: string;
  condominio_id: string;
  morador_id: string;
  titulo: string;
  descricao: string;
  preco: number | string | null;
  categoria: string;
  imagens: unknown;
  status: string;
  created_at: string;
  vendedor?: { nome: string; telefone: string | null } | { nome: string; telefone: string | null }[] | null;
}

@Injectable({ providedIn: 'root' })
export class MarketplaceService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  readonly items = signal<MarketplaceItem[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  async loadForTenant(condominioId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    const { data, error } = await this.supabase
      .from('classificados')
      .select('id,condominio_id,morador_id,titulo,descricao,preco,categoria,imagens,status,created_at,vendedor:users(nome,telefone)')
      .eq('condominio_id', condominioId)
      .eq('status', 'ativo')
      .order('created_at', { ascending: false })
      .limit(50);

    this.isLoading.set(false);

    if (error) {
      this.error.set(error.message);
      this.items.set([]);
      return;
    }

    this.items.set(((data ?? []) as MarketplaceRow[]).map(mapMarketplaceItem));
  }

  async loadById(id: string): Promise<MarketplaceItem | null> {
    const { data, error } = await this.supabase
      .from('classificados')
      .select('id,condominio_id,morador_id,titulo,descricao,preco,categoria,imagens,status,created_at,vendedor:users(nome,telefone)')
      .eq('id', id)
      .eq('status', 'ativo')
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return mapMarketplaceItem(data as MarketplaceRow);
  }
}

function mapMarketplaceItem(row: MarketplaceRow): MarketplaceItem {
  const vendedor = Array.isArray(row.vendedor) ? row.vendedor[0] : row.vendedor;

  return {
    id: row.id,
    condominioId: row.condominio_id,
    moradorId: row.morador_id,
    titulo: row.titulo,
    descricao: row.descricao,
    preco: row.preco === null ? null : Number(row.preco),
    categoria: row.categoria,
    imageUrl: firstImageUrl(row.imagens),
    status: row.status,
    vendedor: vendedor?.nome,
    whatsapp: vendedor?.telefone ?? undefined,
    createdAt: row.created_at,
  };
}

function firstImageUrl(value: unknown): string | null {
  if (!Array.isArray(value) || !value.length) {
    return null;
  }

  const first = value[0];
  return typeof first === 'string' ? first : null;
}
