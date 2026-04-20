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