-- ============================================================
-- CondoMais — Schema Inicial v1.0
-- Multi-tenant SaaS Platform para Condomínios
-- Supabase / PostgreSQL 15+
-- ============================================================
-- Ordem de execução:
--   1. Extensions
--   2. Funções utilitárias (trigger)
--   3. Tabelas (ordem de dependência)
--   4. Índices
--   5. Funções helper (RLS)
--   6. RLS — Enable
--   7. RLS — Policies
--   8. Triggers
--   9. Trigger de sincronização auth → users
--  10. Seed data (ambiente dev)
-- ============================================================

-- ============================================================
-- 1. EXTENSIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ============================================================
-- 2. FUNÇÕES UTILITÁRIAS
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 3. TABELAS
-- ============================================================

-- ------------------------------------------------------------
-- 3.1 condominios — Tenant Raiz
-- ------------------------------------------------------------
CREATE TABLE public.condominios (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  cnpj             VARCHAR(20) NOT NULL CONSTRAINT uq_condominios_cnpj UNIQUE,
  nome             VARCHAR(200) NOT NULL,
  nome_fantasia    VARCHAR(100),

  subdomain        VARCHAR(50) CONSTRAINT uq_condominios_subdomain UNIQUE
                   CONSTRAINT ck_condominios_subdomain
                     CHECK (subdomain ~ '^[a-z0-9][a-z0-9\-]{1,48}[a-z0-9]$'),

  endereco         VARCHAR(500),
  cep              VARCHAR(10),
  cidade           VARCHAR(100),
  estado           CHAR(2),
  complemento      VARCHAR(200),

  telefone         VARCHAR(20),
  whatsapp         VARCHAR(20),
  email            VARCHAR(255),

  fachada_url      TEXT,
  logo_url         TEXT,
  cor_primaria     VARCHAR(7) DEFAULT '#2563EB'
                   CONSTRAINT ck_condominios_cor_primaria
                     CHECK (cor_primaria ~ '^#[0-9A-Fa-f]{6}$'),
  cor_secundaria   VARCHAR(7) DEFAULT '#64748B'
                   CONSTRAINT ck_condominios_cor_secundaria
                     CHECK (cor_secundaria ~ '^#[0-9A-Fa-f]{6}$'),

  settings         JSONB NOT NULL DEFAULT '{}',
  config_entregas  JSONB NOT NULL DEFAULT '{
    "foto_obrigatoria": false,
    "notificar_whatsapp": true,
    "alerta_telegram": false,
    "retencao_dias": 90
  }',
  config_avisos    JSONB NOT NULL DEFAULT '{
    "permitir_respostas": false,
    "expiracao_dias": 7,
    "permitir_anexos": true
  }',
  config_reservas  JSONB NOT NULL DEFAULT '{
    "antecedencia_minima_horas": 24,
    "permitir_cancelamento": true,
    "max_reservas_mes": 4,
    "horario_inicio": "08:00",
    "horario_fim": "22:00"
  }',
  config_classificados JSONB NOT NULL DEFAULT '{
    "permitir_fotos": true,
    "max_fotos": 5,
    "expiracao_dias": 30,
    "permitir_venda": true,
    "permitir_doacao": true,
    "permitir_servico": true
  }',

  features         JSONB NOT NULL DEFAULT '{
    "whatsapp": true,
    "google_calendar": false,
    "email_notifications": true,
    "push_notifications": true
  }',

  plan                    VARCHAR(20) NOT NULL DEFAULT 'basic'
                          CONSTRAINT ck_condominios_plan
                            CHECK (plan IN ('basic', 'plus', 'premium')),
  subscription_status     VARCHAR(20) NOT NULL DEFAULT 'trial'
                          CONSTRAINT ck_condominios_subscription_status
                            CHECK (subscription_status IN ('trial', 'active', 'suspended', 'cancelled')),
  trial_ends_at           TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  subscription_expires_at TIMESTAMPTZ,
  subscription_id         TEXT,

  max_unidades      INTEGER NOT NULL DEFAULT 50,
  max_porteiros     INTEGER NOT NULL DEFAULT 2,
  max_equipamentos  INTEGER NOT NULL DEFAULT 10,
  max_storage_mb    INTEGER NOT NULL DEFAULT 100,

  privacy_policy_url TEXT,
  terms_url          TEXT,

  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at   TIMESTAMPTZ,

  -- Garante que registros em trial sempre têm data de expiração
  CONSTRAINT ck_condominios_trial_integrity
    CHECK (subscription_status <> 'trial' OR trial_ends_at IS NOT NULL)
);

-- ------------------------------------------------------------
-- 3.2 users — Usuários Globais (espelho de auth.users)
-- ------------------------------------------------------------
CREATE TABLE public.users (
  id               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  email            TEXT NOT NULL CONSTRAINT uq_users_email UNIQUE,
  nome             VARCHAR(200) NOT NULL DEFAULT '',

  telefone         VARCHAR(20),
  profile_image_url TEXT,
  google_id        VARCHAR(255),

  preferences      JSONB NOT NULL DEFAULT '{
    "notificacoes_push": true,
    "notificacoes_email": true,
    "notificacoes_whatsapp": false,
    "idioma": "pt-BR",
    "tema": "system"
  }',

  accessibility    JSONB NOT NULL DEFAULT '{
    "alto_contraste": false,
    "leitor_tela": false
  }',

  push_tokens      JSONB NOT NULL DEFAULT '[]',
  fcm_token        TEXT,

  accept_terms_at   TIMESTAMPTZ,
  accept_privacy_at TIMESTAMPTZ,

  last_login_at    TIMESTAMPTZ,
  login_count      INTEGER NOT NULL DEFAULT 0,

  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 3.3 user_condominios — Membership (Junction Table)
-- ------------------------------------------------------------
CREATE TABLE public.user_condominios (
  user_id        UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  condominio_id  UUID NOT NULL REFERENCES public.condominios(id) ON DELETE CASCADE,

  role           VARCHAR(20) NOT NULL
                 CONSTRAINT ck_uc_role
                   CHECK (role IN ('morador', 'porteiro', 'sindico', 'conselho', 'master_admin')),

  status         VARCHAR(20) NOT NULL DEFAULT 'active'
                 CONSTRAINT ck_uc_status
                   CHECK (status IN ('pending', 'active', 'inactive', 'suspended')),

  invited_by     UUID REFERENCES public.users(id) ON DELETE SET NULL,
  invited_at     TIMESTAMPTZ,
  joined_at      TIMESTAMPTZ DEFAULT NOW(),

  metadata       JSONB NOT NULL DEFAULT '{}',

  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (user_id, condominio_id)
);

-- ------------------------------------------------------------
-- 3.4 equipamentos — Amenidades Reserváveis
-- ------------------------------------------------------------
CREATE TABLE public.equipamentos (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id  UUID NOT NULL REFERENCES public.condominios(id) ON DELETE CASCADE,

  nome           VARCHAR(100) NOT NULL,
  descricao      TEXT,
  capacidade     INTEGER,
  regras         JSONB NOT NULL DEFAULT '{}',

  horario_inicio TIME NOT NULL DEFAULT '08:00',
  horario_fim    TIME NOT NULL DEFAULT '22:00',
  CONSTRAINT ck_equipamentos_horario CHECK (horario_fim > horario_inicio),

  ativo          BOOLEAN NOT NULL DEFAULT TRUE,
  image_url      TEXT,

  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 3.5 avisos — Comunicados do Condomínio
-- ------------------------------------------------------------
CREATE TABLE public.avisos (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id  UUID NOT NULL REFERENCES public.condominios(id) ON DELETE CASCADE,
  criado_por     UUID REFERENCES public.users(id) ON DELETE SET NULL,

  titulo         VARCHAR(200) NOT NULL,
  mensagem       TEXT NOT NULL,

  prioridade     VARCHAR(20) NOT NULL DEFAULT 'normal'
                 CONSTRAINT ck_avisos_prioridade
                   CHECK (prioridade IN ('baixa', 'normal', 'alta', 'urgente')),

  status         VARCHAR(20) NOT NULL DEFAULT 'rascunho'
                 CONSTRAINT ck_avisos_status
                   CHECK (status IN ('rascunho', 'publicado', 'arquivado')),

  publicado_em   TIMESTAMPTZ,
  expira_em      TIMESTAMPTZ,
  image_url      TEXT,

  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 3.6 entregas — Controle de Encomendas
-- ------------------------------------------------------------
CREATE TABLE public.entregas (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id  UUID NOT NULL REFERENCES public.condominios(id) ON DELETE CASCADE,
  porteiro_id    UUID REFERENCES public.users(id) ON DELETE SET NULL,

  unidade        VARCHAR(20) NOT NULL,
  codigo_rastreamento VARCHAR(100),
  transportadora      VARCHAR(100),

  tipo           VARCHAR(50) NOT NULL DEFAULT 'encomenda'
                 CONSTRAINT ck_entregas_tipo
                   CHECK (tipo IN ('encomenda', 'sedex', 'cafe', 'jantar',
                                   'documento', 'medicamento', 'outro')),
  descricao      TEXT,
  foto_url       TEXT,

  status         VARCHAR(20) NOT NULL DEFAULT 'pendente'
                 CONSTRAINT ck_entregas_status
                   CHECK (status IN ('pendente', 'notificada', 'retirada',
                                     'devolvida', 'expirada', 'cancelada')),

  data_retirada  TIMESTAMPTZ,
  quem_retirou   VARCHAR(200),

  notificado_em           TIMESTAMPTZ,
  tentativas_notificacao  INTEGER NOT NULL DEFAULT 0,

  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at     TIMESTAMPTZ
);

-- ------------------------------------------------------------
-- 3.7 ocorrencias — Registros de Incidentes
-- ------------------------------------------------------------
CREATE TABLE public.ocorrencias (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id  UUID NOT NULL REFERENCES public.condominios(id) ON DELETE CASCADE,
  porteiro_id    UUID REFERENCES public.users(id) ON DELETE SET NULL,

  tipo           VARCHAR(50) NOT NULL
                 CONSTRAINT ck_ocorrencias_tipo
                   CHECK (tipo IN ('entrada_suspeita', 'ruido', 'vandalismo',
                                   'acidente', 'entrada_nao_autorizada', 'outro')),

  descricao      TEXT NOT NULL,
  local          VARCHAR(100),
  data_ocorrido  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  status         VARCHAR(20) NOT NULL DEFAULT 'aberta'
                 CONSTRAINT ck_ocorrencias_status
                   CHECK (status IN ('aberta', 'investigando', 'resolvida', 'encerrada')),

  resolvida_por  UUID REFERENCES public.users(id) ON DELETE SET NULL,
  resolucao      TEXT,

  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 3.8 ocorrencia_imagens — Fotos de Ocorrências
-- ------------------------------------------------------------
CREATE TABLE public.ocorrencia_imagens (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ocorrencia_id UUID NOT NULL REFERENCES public.ocorrencias(id) ON DELETE CASCADE,
  image_url     TEXT NOT NULL,
  ordem         INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 3.9 reservas — Reservas de Amenidades
-- ------------------------------------------------------------
CREATE TABLE public.reservas (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id   UUID NOT NULL REFERENCES public.condominios(id) ON DELETE CASCADE,
  equipamento_id  UUID NOT NULL REFERENCES public.equipamentos(id) ON DELETE RESTRICT,
  morador_id      UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,

  data            DATE NOT NULL,
  hora_inicio     TIME NOT NULL,
  hora_fim        TIME NOT NULL,
  CONSTRAINT ck_reservas_horario CHECK (hora_fim > hora_inicio),

  motivo          TEXT,
  num_convidados  INTEGER NOT NULL DEFAULT 0
                  CONSTRAINT ck_reservas_convidados CHECK (num_convidados >= 0),

  status          VARCHAR(20) NOT NULL DEFAULT 'confirmada'
                  CONSTRAINT ck_reservas_status
                    CHECK (status IN ('confirmada', 'cancelada', 'realizada', 'nao_compareceu')),

  google_event_id     TEXT,
  google_calendar_id  TEXT,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ,

  CONSTRAINT uq_reservas_slot UNIQUE (equipamento_id, data, hora_inicio)
);

-- ------------------------------------------------------------
-- 3.10 classificados — Marketplace Interno
-- ------------------------------------------------------------
CREATE TABLE public.classificados (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id  UUID NOT NULL REFERENCES public.condominios(id) ON DELETE CASCADE,
  morador_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  titulo         VARCHAR(200) NOT NULL,
  descricao      TEXT NOT NULL,
  preco          NUMERIC(10,2),

  categoria      VARCHAR(50) NOT NULL DEFAULT 'outros'
                 CONSTRAINT ck_classificados_categoria
                   CHECK (categoria IN ('venda', 'compra', 'troca', 'servico', 'doacao', 'outros')),

  imagens        JSONB NOT NULL DEFAULT '[]',

  status         VARCHAR(20) NOT NULL DEFAULT 'ativo'
                 CONSTRAINT ck_classificados_status
                   CHECK (status IN ('ativo', 'vendido', 'expirado', 'removido')),

  expira_em      TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  visualizacoes  INTEGER NOT NULL DEFAULT 0,

  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 4. ÍNDICES
-- ============================================================

-- condominios
CREATE INDEX idx_condominios_subdomain ON public.condominios(subdomain)
  WHERE subdomain IS NOT NULL;
CREATE INDEX idx_condominios_cnpj  ON public.condominios(cnpj);
CREATE INDEX idx_condominios_plan  ON public.condominios(plan);

-- users
CREATE INDEX idx_users_email ON public.users(email);

-- user_condominios (hot path para RLS)
CREATE INDEX idx_uc_user_id       ON public.user_condominios(user_id);
CREATE INDEX idx_uc_condominio_id ON public.user_condominios(condominio_id);
CREATE INDEX idx_uc_status        ON public.user_condominios(status);
CREATE INDEX idx_uc_role          ON public.user_condominios(role);
CREATE INDEX idx_uc_user_active
  ON public.user_condominios(user_id, condominio_id)
  WHERE status = 'active';
CREATE INDEX idx_uc_condominio_role_active
  ON public.user_condominios(condominio_id, role)
  WHERE status = 'active';

-- equipamentos
CREATE INDEX idx_equipamentos_condominio ON public.equipamentos(condominio_id);
CREATE INDEX idx_equipamentos_condominio_ativo
  ON public.equipamentos(condominio_id)
  WHERE ativo = TRUE;

-- avisos
CREATE INDEX idx_avisos_condominio_status
  ON public.avisos(condominio_id, status);
CREATE INDEX idx_avisos_condominio_created
  ON public.avisos(condominio_id, created_at DESC);
CREATE INDEX idx_avisos_publicado
  ON public.avisos(condominio_id, publicado_em DESC)
  WHERE status = 'publicado';

-- entregas
CREATE INDEX idx_entregas_condominio
  ON public.entregas(condominio_id);
CREATE INDEX idx_entregas_condominio_status
  ON public.entregas(condominio_id, status);
CREATE INDEX idx_entregas_condominio_created
  ON public.entregas(condominio_id, created_at DESC);
CREATE INDEX idx_entregas_unidade
  ON public.entregas(condominio_id, unidade);
CREATE INDEX idx_entregas_codigo
  ON public.entregas(codigo_rastreamento)
  WHERE codigo_rastreamento IS NOT NULL;
CREATE INDEX idx_entregas_pendente_created
  ON public.entregas(created_at)
  WHERE status = 'pendente';

-- ocorrencias
CREATE INDEX idx_ocorrencias_condominio
  ON public.ocorrencias(condominio_id);
CREATE INDEX idx_ocorrencias_condominio_status
  ON public.ocorrencias(condominio_id, status);
CREATE INDEX idx_ocorrencias_condominio_tipo
  ON public.ocorrencias(condominio_id, tipo);
CREATE INDEX idx_ocorrencias_porteiro
  ON public.ocorrencias(porteiro_id)
  WHERE porteiro_id IS NOT NULL;

-- ocorrencia_imagens
CREATE INDEX idx_ocorrencia_imagens_ocorrencia
  ON public.ocorrencia_imagens(ocorrencia_id);

-- reservas
CREATE INDEX idx_reservas_equipamento_data
  ON public.reservas(equipamento_id, data)
  WHERE status = 'confirmada';
CREATE INDEX idx_reservas_morador
  ON public.reservas(morador_id);
CREATE INDEX idx_reservas_condominio
  ON public.reservas(condominio_id);
CREATE INDEX idx_reservas_condominio_data
  ON public.reservas(condominio_id, data);

-- classificados
CREATE INDEX idx_classificados_condominio_status
  ON public.classificados(condominio_id, status);
CREATE INDEX idx_classificados_morador
  ON public.classificados(morador_id);
CREATE INDEX idx_classificados_categoria
  ON public.classificados(condominio_id, categoria)
  WHERE status = 'ativo';
CREATE INDEX idx_classificados_expira
  ON public.classificados(expira_em)
  WHERE status = 'ativo';

-- ============================================================
-- 5. FUNÇÕES HELPER (usadas nas RLS policies)
-- ============================================================

CREATE OR REPLACE FUNCTION public.is_master_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_condominios uc
    WHERE uc.user_id = auth.uid()
      AND uc.role = 'master_admin'
      AND uc.status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_member(p_condominio_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_condominios uc
    WHERE uc.user_id = auth.uid()
      AND uc.condominio_id = p_condominio_id
      AND uc.status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.get_user_role(p_condominio_id UUID)
RETURNS TEXT
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT uc.role
  FROM public.user_condominios uc
  WHERE uc.user_id = auth.uid()
    AND uc.condominio_id = p_condominio_id
    AND uc.status = 'active'
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.has_role(
  p_condominio_id UUID,
  p_role          TEXT
)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_condominios uc
    WHERE uc.user_id = auth.uid()
      AND uc.condominio_id = p_condominio_id
      AND uc.role = p_role
      AND uc.status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.has_any_role(
  p_condominio_id UUID,
  p_roles         TEXT[]
)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_condominios uc
    WHERE uc.user_id = auth.uid()
      AND uc.condominio_id = p_condominio_id
      AND uc.role = ANY(p_roles)
      AND uc.status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.get_my_memberships()
RETURNS TABLE (
  condominio_id        UUID,
  condominio_nome      VARCHAR(200),
  condominio_subdomain VARCHAR(50),
  role                 TEXT,
  status               TEXT,
  joined_at            TIMESTAMPTZ
)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.id,
    c.nome,
    c.subdomain,
    uc.role,
    uc.status,
    uc.joined_at
  FROM public.user_condominios uc
  JOIN public.condominios c ON c.id = uc.condominio_id
  WHERE uc.user_id = auth.uid()
    AND uc.status = 'active'
  ORDER BY c.nome;
$$;

-- ============================================================
-- 6. HABILITAR ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.condominios        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_condominios   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipamentos       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avisos             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entregas           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocorrencias        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocorrencia_imagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservas           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classificados      ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 7. RLS POLICIES
-- ============================================================

-- 7.1 condominios
CREATE POLICY "condominios_select_public"
  ON public.condominios FOR SELECT
  USING (deleted_at IS NULL);

CREATE POLICY "condominios_update_sindico"
  ON public.condominios FOR UPDATE
  USING (
    public.is_master_admin()
    OR public.has_role(id, 'sindico')
  )
  WITH CHECK (
    public.is_master_admin()
    OR public.has_role(id, 'sindico')
  );

CREATE POLICY "condominios_insert_master"
  ON public.condominios FOR INSERT
  WITH CHECK (public.is_master_admin());

CREATE POLICY "condominios_delete_master"
  ON public.condominios FOR DELETE
  USING (public.is_master_admin());

-- 7.2 users
CREATE POLICY "users_select_own"
  ON public.users FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "users_select_shared_tenant"
  ON public.users FOR SELECT
  USING (
    public.is_master_admin()
    OR EXISTS (
      SELECT 1 FROM public.user_condominios uc_me
      JOIN public.user_condominios uc_them
        ON uc_them.condominio_id = uc_me.condominio_id
       AND uc_them.user_id = public.users.id
       AND uc_them.status = 'active'
      WHERE uc_me.user_id = (SELECT auth.uid())
        AND uc_me.status = 'active'
    )
  );

CREATE POLICY "users_update_own"
  ON public.users FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- 7.3 user_condominios
CREATE POLICY "uc_select_own"
  ON public.user_condominios FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "uc_select_admin"
  ON public.user_condominios FOR SELECT
  USING (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  );

CREATE POLICY "uc_insert_sindico"
  ON public.user_condominios FOR INSERT
  WITH CHECK (
    public.is_master_admin()
    OR public.has_role(condominio_id, 'sindico')
  );

CREATE POLICY "uc_update_sindico"
  ON public.user_condominios FOR UPDATE
  USING (
    public.is_master_admin()
    OR public.has_role(condominio_id, 'sindico')
  )
  WITH CHECK (
    public.is_master_admin()
    OR public.has_role(condominio_id, 'sindico')
  );

CREATE POLICY "uc_delete_master"
  ON public.user_condominios FOR DELETE
  USING (public.is_master_admin());

-- 7.4 equipamentos
CREATE POLICY "equipamentos_select_member"
  ON public.equipamentos FOR SELECT
  USING (
    public.is_master_admin()
    OR public.is_member(condominio_id)
  );

CREATE POLICY "equipamentos_write_admin"
  ON public.equipamentos FOR ALL
  USING (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  )
  WITH CHECK (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  );

-- 7.5 avisos
CREATE POLICY "avisos_select_publicados"
  ON public.avisos FOR SELECT
  USING (
    public.is_member(condominio_id) AND status = 'publicado'
  );

CREATE POLICY "avisos_select_admin"
  ON public.avisos FOR SELECT
  USING (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  );

CREATE POLICY "avisos_insert_admin"
  ON public.avisos FOR INSERT
  WITH CHECK (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  );

CREATE POLICY "avisos_update_admin"
  ON public.avisos FOR UPDATE
  USING (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  )
  WITH CHECK (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  );

CREATE POLICY "avisos_delete_admin"
  ON public.avisos FOR DELETE
  USING (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  );

-- 7.6 entregas
CREATE POLICY "entregas_select_member"
  ON public.entregas FOR SELECT
  USING (
    (public.is_master_admin() OR public.is_member(condominio_id))
    AND deleted_at IS NULL
  );

CREATE POLICY "entregas_insert_porteiro"
  ON public.entregas FOR INSERT
  WITH CHECK (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['porteiro', 'sindico'])
  );

CREATE POLICY "entregas_update_porteiro"
  ON public.entregas FOR UPDATE
  USING (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['porteiro', 'sindico'])
  )
  WITH CHECK (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['porteiro', 'sindico'])
  );

CREATE POLICY "entregas_delete_sindico"
  ON public.entregas FOR DELETE
  USING (
    public.is_master_admin()
    OR public.has_role(condominio_id, 'sindico')
  );

-- 7.7 ocorrencias
CREATE POLICY "ocorrencias_select_member"
  ON public.ocorrencias FOR SELECT
  USING (
    public.is_master_admin()
    OR public.is_member(condominio_id)
  );

CREATE POLICY "ocorrencias_insert_staff"
  ON public.ocorrencias FOR INSERT
  WITH CHECK (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['porteiro', 'sindico', 'conselho'])
  );

CREATE POLICY "ocorrencias_update_staff"
  ON public.ocorrencias FOR UPDATE
  USING (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['porteiro', 'sindico', 'conselho'])
  )
  WITH CHECK (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['porteiro', 'sindico', 'conselho'])
  );

CREATE POLICY "ocorrencias_delete_sindico"
  ON public.ocorrencias FOR DELETE
  USING (
    public.is_master_admin()
    OR public.has_role(condominio_id, 'sindico')
  );

-- 7.8 ocorrencia_imagens
CREATE POLICY "ocorrencia_imagens_select"
  ON public.ocorrencia_imagens FOR SELECT
  USING (
    public.is_master_admin()
    OR EXISTS (
      SELECT 1 FROM public.ocorrencias o
      JOIN public.user_condominios uc
        ON uc.condominio_id = o.condominio_id
       AND uc.user_id = (SELECT auth.uid())
       AND uc.status = 'active'
      WHERE o.id = ocorrencia_imagens.ocorrencia_id
    )
  );

CREATE POLICY "ocorrencia_imagens_insert"
  ON public.ocorrencia_imagens FOR INSERT
  WITH CHECK (
    public.is_master_admin()
    OR EXISTS (
      SELECT 1 FROM public.ocorrencias o
      JOIN public.user_condominios uc
        ON uc.condominio_id = o.condominio_id
       AND uc.user_id = (SELECT auth.uid())
       AND uc.role IN ('porteiro', 'sindico', 'conselho')
       AND uc.status = 'active'
      WHERE o.id = ocorrencia_imagens.ocorrencia_id
    )
  );

CREATE POLICY "ocorrencia_imagens_delete"
  ON public.ocorrencia_imagens FOR DELETE
  USING (
    public.is_master_admin()
    OR EXISTS (
      SELECT 1 FROM public.ocorrencias o
      JOIN public.user_condominios uc
        ON uc.condominio_id = o.condominio_id
       AND uc.user_id = (SELECT auth.uid())
       AND uc.role IN ('sindico', 'conselho')
       AND uc.status = 'active'
      WHERE o.id = ocorrencia_imagens.ocorrencia_id
    )
  );

-- 7.9 reservas
CREATE POLICY "reservas_select_member"
  ON public.reservas FOR SELECT
  USING (
    (public.is_master_admin() OR public.is_member(condominio_id))
    AND deleted_at IS NULL
  );

CREATE POLICY "reservas_insert_member"
  ON public.reservas FOR INSERT
  WITH CHECK (
    (public.is_master_admin() OR public.is_member(condominio_id))
    AND (
      morador_id = auth.uid()
      OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
    )
  );

CREATE POLICY "reservas_update_own_or_admin"
  ON public.reservas FOR UPDATE
  USING (
    public.is_master_admin()
    OR (morador_id = auth.uid() AND public.is_member(condominio_id))
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  )
  WITH CHECK (
    public.is_master_admin()
    OR (morador_id = auth.uid() AND public.is_member(condominio_id))
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  );

CREATE POLICY "reservas_delete_sindico"
  ON public.reservas FOR DELETE
  USING (
    public.is_master_admin()
    OR public.has_role(condominio_id, 'sindico')
  );

-- 7.10 classificados
CREATE POLICY "classificados_select_member"
  ON public.classificados FOR SELECT
  USING (
    public.is_master_admin()
    OR (public.is_member(condominio_id) AND status = 'ativo')
    OR morador_id = auth.uid()
  );

CREATE POLICY "classificados_insert_member"
  ON public.classificados FOR INSERT
  WITH CHECK (
    public.is_member(condominio_id)
    AND morador_id = auth.uid()
  );

CREATE POLICY "classificados_update_own_or_admin"
  ON public.classificados FOR UPDATE
  USING (
    public.is_master_admin()
    OR morador_id = auth.uid()
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  )
  WITH CHECK (
    public.is_master_admin()
    OR morador_id = auth.uid()
    OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
  );

CREATE POLICY "classificados_delete_admin"
  ON public.classificados FOR DELETE
  USING (
    public.is_master_admin()
    OR public.has_role(condominio_id, 'sindico')
  );

-- ============================================================
-- 8. TRIGGERS
-- ============================================================

CREATE TRIGGER trg_condominios_updated_at
  BEFORE UPDATE ON public.condominios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_uc_updated_at
  BEFORE UPDATE ON public.user_condominios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_equipamentos_updated_at
  BEFORE UPDATE ON public.equipamentos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_avisos_updated_at
  BEFORE UPDATE ON public.avisos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_entregas_updated_at
  BEFORE UPDATE ON public.entregas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_ocorrencias_updated_at
  BEFORE UPDATE ON public.ocorrencias
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_reservas_updated_at
  BEFORE UPDATE ON public.reservas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_classificados_updated_at
  BEFORE UPDATE ON public.classificados
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE FUNCTION public.validar_reserva()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v_conflicts INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_conflicts
  FROM public.reservas
  WHERE equipamento_id = NEW.equipamento_id
    AND data = NEW.data
    AND status = 'confirmada'
    AND deleted_at IS NULL
    AND NEW.hora_inicio < hora_fim
    AND NEW.hora_fim > hora_inicio
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid);

  IF v_conflicts > 0 THEN
    RAISE EXCEPTION 'Conflito de horário: equipamento já reservado nesse período'
      USING ERRCODE = 'exclusion_violation';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validar_reserva
  BEFORE INSERT OR UPDATE ON public.reservas
  FOR EACH ROW EXECUTE FUNCTION public.validar_reserva();

-- ============================================================
-- 9. SINCRONIZAÇÃO auth.users → public.users
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, nome)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    )
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

