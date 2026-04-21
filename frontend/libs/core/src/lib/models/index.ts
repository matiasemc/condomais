import type { User } from '@supabase/supabase-js';
export type { User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'MORADOR' | 'PORTEIRO' | 'SINDICO' | 'CONSELHO' | 'MASTER_ADMIN';

export interface Tenant {
  id: string;
  nome: string;
  slug: string;
  plano: 'free' | 'basic' | 'pro';
  ativo: boolean;
}

export interface Membership {
  id: string;
  userId: string;
  tenant: Tenant;
  role: UserRole;
  ativo: boolean;
  unidade?: string;
}

export interface AuthState {
  user: import("@supabase/supabase-js").User | null;
  memberships: Membership[];
  currentTenant: Tenant | null;
  currentRole: UserRole | null;
  isLoading: boolean;
  error: string | null;
}

export type NotificationType =
  | 'nova_entrega'
  | 'entrega_retirada'
  | 'nova_ocorrencia'
  | 'ocorrencia_atualizada';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  deliveryId?: string;
  ocorrenciaId?: string;
  read: boolean;
  createdAt: Date;
}

export type DeliveryStatus = 'pendente' | 'notificada' | 'retirada' | 'devolvida' | 'expirada' | 'cancelada';
export type DeliveryTipo = 'encomenda' | 'sedex' | 'cafe' | 'jantar' | 'documento' | 'medicamento' | 'outro';

export interface Delivery {
  id: string;
  condominioId: string;
  moradorId: string | null;
  porteiroId: string | null;
  recebidoPor: string | null;
  unidade: string;
  transportadora: string | null;
  codigoRastreamento: string | null;
  tipo: DeliveryTipo;
  descricao: string | null;
  fotoUrl: string | null;
  status: DeliveryStatus;
  dataRetirada: string | null;
  quemRetirou: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeliveryInput {
  condominioId: string;
  unidade: string;
  tipo: DeliveryTipo;
  moradorId?: string;
  transportadora?: string;
  descricao?: string;
}

export type OccurrenceStatus = 'aberta' | 'em_analise' | 'resolvida';
export type OccurrenceTipo =
  | 'entrada_suspeita'
  | 'ruido'
  | 'vandalismo'
  | 'acidente'
  | 'entrada_nao_autorizada'
  | 'outro';

export interface Occurrence {
  id: string;
  condominioId: string;
  userId: string | null;
  porteiroId: string | null;
  titulo: string | null;
  tipo: OccurrenceTipo;
  descricao: string;
  local: string | null;
  dataOcorrido: string;
  status: OccurrenceStatus;
  resolvidaPor: string | null;
  resolucao: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OccurrenceImage {
  id: string;
  ocorrenciaId: string;
  imageUrl: string;
  ordem: number;
  createdAt: string;
}

export interface CreateOccurrenceInput {
  condominioId: string;
  userId: string;
  titulo: string;
  tipo: OccurrenceTipo;
  descricao: string;
  local?: string;
}