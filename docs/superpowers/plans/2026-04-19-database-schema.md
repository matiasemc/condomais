# Database Schema — CondoMais Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Gerar um único script SQL produção-ready que cria o schema completo do CondoMais (multi-tenant SaaS de condomínios) no Supabase/PostgreSQL, incluindo tabelas, índices, funções helper, RLS e seed data.

**Architecture:** Multi-tenant via membership — `users` é global, `condominios` é o tenant raiz, e `user_condominios` é a junction table que associa usuário ↔ condomínio com role por-tenant. Todas as tabelas de negócio têm `condominio_id` e RLS baseada na membership ativa.

**Tech Stack:** PostgreSQL 15+, Supabase Auth (auth.users), Row Level Security, UUIDs (gen_random_uuid), TIMESTAMPTZ, JSONB, CHECK constraints.

---

## ⚠️ Tensão Resolvida: `usuarios` vs `users`

A doc `tables-users.md` descreve `usuarios` com `condominio_id` (modelo per-tenant antigo). O spec do sistema define **users como GLOBAL**. Este plano adota o modelo correto:

- `public.users` → global, sem `condominio_id`, referencia `auth.users(id)`
- `public.user_condominios` → junction com role por-tenant
- Tabelas de negócio referenciam `public.users(id)` para FKs de usuário

---

# FASE 1 — PLANO

## 1. Estratégia de Schema

### Ordem de Criação (por dependência)

```
1. Extensions
2. Função trigger update_updated_at() [reutilizada por todas as tabelas]
3. condominios          — root entity, sem FKs externas
4. users               — global, FK → auth.users(id)
5. user_condominios    — junction: users ↔ condominios
6. equipamentos        — FK → condominios
7. avisos              — FK → condominios, users
8. entregas            — FK → condominios, users (porteiro)
9. ocorrencias         — FK → condominios, users (porteiro, resolvida_por)
10. ocorrencia_imagens — FK → ocorrencias
11. reservas           — FK → condominios, equipamentos, users
12. classificados      — FK → condominios, users
```

### Convenções de Nomenclatura

| Item | Convenção | Exemplo |
|------|-----------|---------|
| Tabelas | plural, snake_case | `condominios`, `user_condominios` |
| PK | `id UUID` | `gen_random_uuid()` |
| FK | `{entidade}_id` | `condominio_id`, `morador_id` |
| Timestamps | snake_case + `_at` | `created_at`, `updated_at`, `deleted_at` |
| Status | VARCHAR com CHECK | `status IN ('ativo','inativo')` |
| Índices | `idx_{tabela}_{colunas}` | `idx_entregas_condominio_status` |
| Constraints FK | `fk_{tabela}_{referenciada}` | `fk_entregas_condominios` |
| Constraints UNIQUE | `uq_{tabela}_{colunas}` | `uq_condominios_cnpj` |
| Constraints CHECK | `ck_{tabela}_{campo}` | `ck_reservas_horario` |

---

## 2. Breakdown das Entidades

### 2.1 `condominios` — Tenant Raiz

**Propósito:** Cada linha = um condomínio cliente. Root anchor de tudo.

| Coluna | Tipo | Observação |
|--------|------|------------|
| id | UUID PK | gen_random_uuid() |
| cnpj | VARCHAR(20) UNIQUE NOT NULL | Identificação legal |
| nome | VARCHAR(200) NOT NULL | Nome oficial |
| nome_fantasia | VARCHAR(100) | Nome comercial |
| subdomain | VARCHAR(50) UNIQUE | Roteamento multi-tenant |
| endereco, cep, cidade, estado | texto | Endereço físico |
| telefone, whatsapp, email | texto | Contato |
| fachada_url | TEXT | URL de imagem (Supabase Storage) |
| logo_url | TEXT | URL de logo (Supabase Storage) |
| cor_primaria, cor_secundaria | VARCHAR(7) | Branding hex |
| settings | JSONB | Configurações gerais |
| config_entregas | JSONB | Config do módulo entregas |
| config_avisos | JSONB | Config do módulo avisos |
| config_reservas | JSONB | Config do módulo reservas |
| config_classificados | JSONB | Config do módulo classificados |
| features | JSONB | Feature flags por plano |
| plan | VARCHAR(20) CHECK | `basic`, `plus`, `premium` |
| subscription_status | VARCHAR(20) CHECK | `trial`, `active`, `suspended`, `cancelled` |
| trial_ends_at | TIMESTAMPTZ | Auto: NOW() + 30 days |
| subscription_expires_at | TIMESTAMPTZ | Expiração da assinatura |
| max_unidades, max_porteiros, max_equipamentos | INTEGER | Limites por plano |
| created_at, updated_at | TIMESTAMPTZ | Audit |
| deleted_at | TIMESTAMPTZ | Soft delete |

**Relacionamentos:** 1:N com users, user_condominios, equipamentos, avisos, entregas, ocorrencias, reservas, classificados

---

### 2.2 `users` — Usuários Globais

**Propósito:** Perfil global do usuário. Um registro independente de qual condomínio está acessando.

| Coluna | Tipo | Observação |
|--------|------|------------|
| id | UUID PK | = auth.users(id), FK ON DELETE CASCADE |
| email | TEXT UNIQUE NOT NULL | Sincronizado do auth |
| nome | VARCHAR(200) NOT NULL | Nome completo |
| telefone | VARCHAR(20) | WhatsApp/celular |
| profile_image_url | TEXT | URL de foto (Storage) |
| google_id | VARCHAR(255) | OAuth ID |
| preferences | JSONB | Push, email, idioma, tema |
| accessibility | JSONB | Alto contraste, leitor tela |
| push_tokens | JSONB | Array de FCM tokens |
| fcm_token | TEXT | Token FCM atual |
| accept_terms_at | TIMESTAMPTZ | LGPD |
| accept_privacy_at | TIMESTAMPTZ | LGPD |
| last_login_at | TIMESTAMPTZ | Tracking |
| login_count | INTEGER DEFAULT 0 | Tracking |
| created_at, updated_at | TIMESTAMPTZ | Audit |

**Relacionamentos:** 1:N com user_condominios (memberships), entregas (porteiro), ocorrencias (porteiro, resolver), avisos (criador), reservas (morador), classificados (dono)

---

### 2.3 `user_condominios` — Membership (Junction)

**Propósito:** Associa user ↔ condomínio com role por-tenant. Esta é a base de toda a segurança multi-tenant.

| Coluna | Tipo | Observação |
|--------|------|------------|
| user_id | UUID FK NOT NULL | → users(id) ON DELETE CASCADE |
| condominio_id | UUID FK NOT NULL | → condominios(id) ON DELETE CASCADE |
| role | VARCHAR(20) CHECK NOT NULL | `morador`, `porteiro`, `sindico`, `conselho`, `master_admin` |
| status | VARCHAR(20) CHECK DEFAULT 'active' | `pending`, `active`, `inactive`, `suspended` |
| invited_by | UUID FK | → users(id), quem convidou |
| invited_at | TIMESTAMPTZ | Quando foi convidado |
| joined_at | TIMESTAMPTZ DEFAULT NOW() | Quando aceitou |
| metadata | JSONB DEFAULT '{}' | Bloco/apartamento, etc. |
| created_at, updated_at | TIMESTAMPTZ | Audit |
| PRIMARY KEY | (user_id, condominio_id) | Composite PK |

**Note:** Um usuário pode ter roles DIFERENTES em condominios diferentes. MASTER_ADMIN é global e pode existir em qualquer user_condominios row.

---

### 2.4 `equipamentos` — Amenidades do Condomínio

**Propósito:** Piscina, salão de festas, churrasqueira, academia — itens reserváveis.

| Coluna | Tipo | Observação |
|--------|------|------------|
| id | UUID PK | |
| condominio_id | UUID FK NOT NULL | → condominios(id) ON DELETE CASCADE |
| nome | VARCHAR(100) NOT NULL | Ex: "Salão de Festas A" |
| descricao | TEXT | |
| capacidade | INTEGER | Máx de pessoas |
| regras | JSONB DEFAULT '{}' | Regras de uso |
| horario_inicio | TIME DEFAULT '08:00' | Abertura |
| horario_fim | TIME DEFAULT '22:00' | Fechamento |
| ativo | BOOLEAN DEFAULT TRUE | Disponível para reserva |
| image_url | TEXT | URL de foto (Storage) |
| created_at, updated_at | TIMESTAMPTZ | Audit |

---

### 2.5 `avisos` — Comunicados

**Propósito:** Anúncios do síndico/conselho para todos os moradores.

| Coluna | Tipo | Observação |
|--------|------|------------|
| id | UUID PK | |
| condominio_id | UUID FK NOT NULL | Tenant |
| criado_por | UUID FK NOT NULL | → users(id) ON DELETE SET NULL |
| titulo | VARCHAR(200) NOT NULL | |
| mensagem | TEXT NOT NULL | |
| prioridade | VARCHAR(20) CHECK DEFAULT 'normal' | `baixa`, `normal`, `alta`, `urgente` |
| status | VARCHAR(20) CHECK DEFAULT 'rascunho' | `rascunho`, `publicado`, `arquivado` |
| publicado_em | TIMESTAMPTZ | Quando foi publicado |
| expira_em | TIMESTAMPTZ | Auto-arquivamento |
| image_url | TEXT | Imagem de capa (Storage) |
| created_at, updated_at | TIMESTAMPTZ | Audit |

---

### 2.6 `entregas` — Registros de Encomendas

**Propósito:** Porteiro registra encomenda, morador é notificado, retira e confirma.

| Coluna | Tipo | Observação |
|--------|------|------------|
| id | UUID PK | |
| condominio_id | UUID FK NOT NULL | Tenant |
| porteiro_id | UUID FK | → users(id) ON DELETE SET NULL |
| unidade | VARCHAR(20) NOT NULL | Nº do apartamento (texto livre) |
| codigo_rastreamento | VARCHAR(100) | |
| transportadora | VARCHAR(100) | |
| tipo | VARCHAR(50) CHECK DEFAULT 'encomenda' | `encomenda`,`sedex`,`cafe`,`jantar`,`documento`,`medicamento`,`outro` |
| descricao | TEXT | |
| foto_url | TEXT | URL da foto da encomenda (Storage) |
| status | VARCHAR(20) CHECK DEFAULT 'pendente' | `pendente`,`notificada`,`retirada`,`devolvida`,`expirada`,`cancelada` |
| data_retirada | TIMESTAMPTZ | Quando foi retirada |
| quem_retirou | VARCHAR(200) | Nome de quem retirou |
| notificado_em | TIMESTAMPTZ | Timestamp da notificação |
| tentativas_notificacao | INTEGER DEFAULT 0 | Retry count |
| created_at, updated_at | TIMESTAMPTZ | Audit |
| deleted_at | TIMESTAMPTZ | Soft delete |

---

### 2.7 `ocorrencias` — Registros de Incidentes

**Propósito:** Porteiro registra ocorrências de segurança, vandalismo, acidentes.

| Coluna | Tipo | Observação |
|--------|------|------------|
| id | UUID PK | |
| condominio_id | UUID FK NOT NULL | Tenant |
| porteiro_id | UUID FK | → users(id) ON DELETE SET NULL |
| tipo | VARCHAR(50) CHECK NOT NULL | `entrada_suspeita`,`ruido`,`vandalismo`,`acidente`,`entrada_nao_autorizada`,`outro` |
| descricao | TEXT NOT NULL | |
| local | VARCHAR(100) | Ex: "Portão principal" |
| data_ocorrido | TIMESTAMPTZ DEFAULT NOW() | |
| status | VARCHAR(20) CHECK DEFAULT 'aberta' | `aberta`,`investigando`,`resolvida`,`encerrada` |
| resolvida_por | UUID FK | → users(id) ON DELETE SET NULL |
| resolucao | TEXT | Descrição da resolução |
| created_at, updated_at | TIMESTAMPTZ | Audit |

---

### 2.8 `ocorrencia_imagens` — Fotos de Ocorrências

**Propósito:** Armazena múltiplas URLs de imagens por ocorrência (separado para flexibilidade).

| Coluna | Tipo | Observação |
|--------|------|------------|
| id | UUID PK | |
| ocorrencia_id | UUID FK NOT NULL | → ocorrencias(id) ON DELETE CASCADE |
| image_url | TEXT NOT NULL | URL no Storage |
| ordem | INTEGER DEFAULT 0 | Ordem de exibição |
| created_at | TIMESTAMPTZ | |

---

### 2.9 `reservas` — Reservas de Equipamentos

**Propósito:** Moradores reservam amenidades por horário. Conflitos são prevenidos via trigger.

| Coluna | Tipo | Observação |
|--------|------|------------|
| id | UUID PK | |
| condominio_id | UUID FK NOT NULL | Tenant |
| equipamento_id | UUID FK NOT NULL | → equipamentos(id) ON DELETE RESTRICT |
| morador_id | UUID FK NOT NULL | → users(id) ON DELETE RESTRICT |
| data | DATE NOT NULL | |
| hora_inicio | TIME NOT NULL | |
| hora_fim | TIME NOT NULL | |
| motivo | TEXT | |
| num_convidados | INTEGER DEFAULT 0 | |
| status | VARCHAR(20) CHECK DEFAULT 'confirmada' | `confirmada`,`cancelada`,`realizada`,`nao_compareceu` |
| google_event_id | TEXT | Integração Google Calendar |
| google_calendar_id | TEXT | |
| created_at, updated_at | TIMESTAMPTZ | Audit |
| deleted_at | TIMESTAMPTZ | Soft delete |
| UNIQUE | (equipamento_id, data, hora_inicio) | Impede duplo booking |
| CHECK | hora_fim > hora_inicio | Validação de horário |

---

### 2.10 `classificados` — Marketplace Interno

**Propósito:** Moradores anunciam venda, compra, troca ou serviços para vizinhos.

| Coluna | Tipo | Observação |
|--------|------|------------|
| id | UUID PK | |
| condominio_id | UUID FK NOT NULL | Tenant |
| morador_id | UUID FK NOT NULL | → users(id) ON DELETE CASCADE |
| titulo | VARCHAR(200) NOT NULL | |
| descricao | TEXT NOT NULL | |
| preco | NUMERIC(10,2) | Opcional (doação = NULL) |
| categoria | VARCHAR(50) CHECK DEFAULT 'outros' | `venda`,`compra`,`troca`,`servico`,`doacao`,`outros` |
| imagens | JSONB DEFAULT '[]' | Array de URLs (Storage) |
| status | VARCHAR(20) CHECK DEFAULT 'ativo' | `ativo`,`vendido`,`expirado`,`removido` |
| expira_em | TIMESTAMPTZ | Auto: NOW() + 30 days |
| visualizacoes | INTEGER DEFAULT 0 | Counter de views |
| created_at, updated_at | TIMESTAMPTZ | Audit |

---

## 3. Estratégia Multi-Tenant

### Isolamento via Membership

```
auth.uid() → users.id → user_condominios.user_id
                                ↓
                       user_condominios.condominio_id (tenant)
                       user_condominios.status = 'active'
                       user_condominios.role (permissões)
```

**Regra fundamental:** Um usuário só acessa dados de um `condominio_id` se existir uma row em `user_condominios` com:
- `user_id = auth.uid()`
- `condominio_id = {tabela}.condominio_id`
- `status = 'active'`

### MASTER_ADMIN

É um role especial que pode existir em qualquer membership row. Tem acesso a TODOS os condominios. Verificado via `is_master_admin()` — existe pelo menos uma membership com `role = 'master_admin'` e `status = 'active'`.

---

## 4. Estratégia de RLS

### Tabelas com RLS

| Tabela | RLS | Política Base |
|--------|-----|---------------|
| condominios | ✅ | SELECT público; UPDATE só síndico/master_admin |
| users | ✅ | SELECT próprio ou membros compartilhados; UPDATE próprio |
| user_condominios | ✅ | SELECT próprias memberships; ALL só síndico/master_admin |
| equipamentos | ✅ | SELECT membros; ALL síndico/conselho |
| avisos | ✅ | SELECT membros (publicados); ALL síndico/conselho |
| entregas | ✅ | SELECT membros; ALL porteiro/síndico |
| ocorrencias | ✅ | SELECT membros; ALL porteiro/síndico |
| ocorrencia_imagens | ✅ | Herda da ocorrência |
| reservas | ✅ | SELECT membros; INSERT morador+; UPDATE própria/síndico |
| classificados | ✅ | SELECT membros; INSERT morador; UPDATE próprio/síndico |

### Padrão de Policy (Membership Check)

```sql
-- Padrão básico: qualquer membro ativo pode ler
USING (
  public.is_master_admin()
  OR EXISTS (
    SELECT 1 FROM user_condominios uc
    WHERE uc.user_id = auth.uid()::uuid
      AND uc.condominio_id = {tabela}.condominio_id
      AND uc.status = 'active'
  )
)

-- Padrão com role específico: só síndico/porteiro
USING (
  public.is_master_admin()
  OR EXISTS (
    SELECT 1 FROM user_condominios uc
    WHERE uc.user_id = auth.uid()::uuid
      AND uc.condominio_id = {tabela}.condominio_id
      AND uc.role IN ('sindico', 'porteiro')
      AND uc.status = 'active'
  )
)
```

---

## 5. Funções Helper

| Função | Assinatura | Retorno | Uso |
|--------|-----------|---------|-----|
| `is_member` | `(p_condominio_id UUID)` | BOOLEAN | Verifica se auth.uid() é membro ativo |
| `has_role` | `(p_condominio_id UUID, p_role TEXT)` | BOOLEAN | Verifica role específico |
| `has_any_role` | `(p_condominio_id UUID, p_roles TEXT[])` | BOOLEAN | Verifica qualquer dos roles |
| `is_master_admin` | `()` | BOOLEAN | Verifica master_admin global |
| `get_user_role` | `(p_condominio_id UUID)` | TEXT | Retorna role do auth.uid() |
| `get_my_memberships` | `()` | TABLE | Lista memberships ativas do auth.uid() |
| `update_updated_at` | `()` | TRIGGER | Atualiza updated_at automaticamente |
| `handle_new_user` | `()` | TRIGGER | Cria public.users ao criar auth.users |
| `validar_reserva` | `()` | TRIGGER | Impede conflitos de horário |

---

## 6. Estratégia de Indexação

### Índices por Tabela

```
condominios:
  idx_condominios_subdomain     — lookup por subdomain (login flow)
  idx_condominios_cnpj          — lookup por CNPJ
  idx_condominios_plan          — filtragem por plano

users:
  idx_users_email               — lookup por email

user_condominios:
  idx_uc_user_id                — memberships do usuário
  idx_uc_condominio_id          — membros do condomínio
  idx_uc_status                 — filtro por status
  idx_uc_role                   — filtro por role
  idx_uc_user_active            — PARTIAL: status='active' (hot path RLS)
  idx_uc_condominio_role_active — PARTIAL: role+condominio ativos

equipamentos:
  idx_equipamentos_condominio   — equipamentos do condomínio
  idx_equipamentos_condominio_ativo — PARTIAL: ativo=true

avisos:
  idx_avisos_condominio_status  — avisos publicados por condomínio
  idx_avisos_condominio_created — paginação temporal
  idx_avisos_publicado          — PARTIAL: status='publicado'

entregas:
  idx_entregas_condominio_status — dashboard porteiro
  idx_entregas_condominio_created — paginação
  idx_entregas_unidade          — busca por apartamento
  idx_entregas_codigo           — PARTIAL: lookup por código de rastreamento
  idx_entregas_pendente_created — PARTIAL: status='pendente' (expiração)

ocorrencias:
  idx_ocorrencias_condominio_status — dashboard admin
  idx_ocorrencias_condominio_tipo   — filtro por tipo
  idx_ocorrencias_porteiro          — PARTIAL: não-null

ocorrencia_imagens:
  idx_ocorrencia_imagens_ocorrencia — lookup por ocorrência

reservas:
  idx_reservas_equipamento_data — PARTIAL: disponibilidade (hot path)
  idx_reservas_morador          — reservas do morador
  idx_reservas_condominio_data  — calendário do condomínio

classificados:
  idx_classificados_condominio_status — listagem ativa
  idx_classificados_morador     — anúncios do morador
  idx_classificados_categoria   — PARTIAL: status='ativo'
  idx_classificados_expira      — PARTIAL: expiração automática
```

---

## 7. Constraints

### Unique Constraints

| Tabela | Colunas | Nome |
|--------|---------|------|
| condominios | cnpj | uq_condominios_cnpj |
| condominios | subdomain | uq_condominios_subdomain |
| users | email | uq_users_email |
| user_condominios | (user_id, condominio_id) | PRIMARY KEY (composite) |
| reservas | (equipamento_id, data, hora_inicio) | uq_reservas_slot |

### Check Constraints

| Tabela | Campo | Valores |
|--------|-------|---------|
| condominios | plan | `basic`, `plus`, `premium` |
| condominios | subscription_status | `trial`, `active`, `suspended`, `cancelled` |
| condominios | subdomain | regex `^[a-z0-9][a-z0-9\-]{1,48}[a-z0-9]$` |
| condominios | cor_primaria / cor_secundaria | regex `^#[0-9A-Fa-f]{6}$` |
| user_condominios | role | `morador`, `porteiro`, `sindico`, `conselho`, `master_admin` |
| user_condominios | status | `pending`, `active`, `inactive`, `suspended` |
| avisos | prioridade | `baixa`, `normal`, `alta`, `urgente` |
| avisos | status | `rascunho`, `publicado`, `arquivado` |
| entregas | tipo | `encomenda`, `sedex`, `cafe`, `jantar`, `documento`, `medicamento`, `outro` |
| entregas | status | `pendente`, `notificada`, `retirada`, `devolvida`, `expirada`, `cancelada` |
| ocorrencias | tipo | `entrada_suspeita`, `ruido`, `vandalismo`, `acidente`, `entrada_nao_autorizada`, `outro` |
| ocorrencias | status | `aberta`, `investigando`, `resolvida`, `encerrada` |
| reservas | status | `confirmada`, `cancelada`, `realizada`, `nao_compareceu` |
| reservas | hora_fim > hora_inicio | ck_reservas_horario |
| reservas | num_convidados >= 0 | ck_reservas_convidados |
| equipamentos | horario_fim > horario_inicio | ck_equipamentos_horario |
| classificados | categoria | `venda`, `compra`, `troca`, `servico`, `doacao`, `outros` |
| classificados | status | `ativo`, `vendido`, `expirado`, `removido` |

---

## 8. Riscos e Edge Cases

| Risco | Mitigação |
|-------|-----------|
| Usuário sem membership | RLS bloqueia todo acesso; retorna 0 rows |
| Múltiplos síndicos | Permitido — todos têm direitos de admin no tenant |
| Usuário em múltiplos condominios | Normal — múltiplas rows em user_condominios |
| Orphan em auth.users sem public.users | Trigger `handle_new_user` cria automaticamente |
| Conflito de reserva (race condition) | Trigger `validar_reserva` + UNIQUE constraint |
| CNPJ duplicado | UNIQUE constraint explode com erro claro |
| Subdomain inválido | CHECK constraint `ck_condominios_subdomain` (regex) |
| Soft delete não filtrado | Policies verificam `deleted_at IS NULL` |
| master_admin sem condominio específico | `is_master_admin()` ignora condominio_id — acessa tudo |
| Role escalation | Apenas síndico/master_admin podem alterar roles em user_condominios |

---

# FASE 2 — IMPLEMENTAÇÃO

## File Structure

```
docs/03-database/migrations/
└── 001_initial_schema.sql    ← Script completo gerado por este plano
```

---

## Task 1: Criar arquivo SQL base com extensões

**Files:**
- Create: `docs/03-database/migrations/001_initial_schema.sql`

- [x] **Step 1: Criar o arquivo com cabeçalho e extensões**

```sql
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
```

- [x] **Step 2: Verificar que o arquivo foi criado**

```bash
ls docs/03-database/migrations/
# Expected: 001_initial_schema.sql
```

- [x] **Step 3: Commit**

```bash
git add docs/03-database/migrations/001_initial_schema.sql
git commit -m "feat(db): scaffold migration file with extensions"
```

---

## Task 2: Adicionar função update_updated_at e tabelas root

**Files:**
- Modify: `docs/03-database/migrations/001_initial_schema.sql`

- [x] **Step 1: Adicionar função update_updated_at e tabela condominios**

```sql
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
  deleted_at   TIMESTAMPTZ
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
```

- [x] **Step 2: Commit**

```bash
git add docs/03-database/migrations/001_initial_schema.sql
git commit -m "feat(db): add condominios and users tables"
```

---

## Task 3: Adicionar user_condominios

**Files:**
- Modify: `docs/03-database/migrations/001_initial_schema.sql`

- [x] **Step 1: Adicionar tabela user_condominios**

```sql
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
```

- [x] **Step 2: Commit**

```bash
git add docs/03-database/migrations/001_initial_schema.sql
git commit -m "feat(db): add user_condominios membership table"
```

---

## Task 4: Adicionar equipamentos

**Files:**
- Modify: `docs/03-database/migrations/001_initial_schema.sql`

- [x] **Step 1: Adicionar tabela equipamentos**

```sql
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
```

- [x] **Step 2: Commit**

```bash
git add docs/03-database/migrations/001_initial_schema.sql
git commit -m "feat(db): add equipamentos table"
```

---

## Task 5: Adicionar tabelas de negócio

**Files:**
- Modify: `docs/03-database/migrations/001_initial_schema.sql`

- [x] **Step 1: Adicionar avisos**

```sql
-- ------------------------------------------------------------
-- 3.5 avisos — Comunicados do Condomínio
-- ------------------------------------------------------------
CREATE TABLE public.avisos (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id  UUID NOT NULL REFERENCES public.condominios(id) ON DELETE CASCADE,
  criado_por     UUID NOT NULL REFERENCES public.users(id) ON DELETE SET NULL,

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
```

- [x] **Step 2: Adicionar entregas**

```sql
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
```

- [x] **Step 3: Adicionar ocorrencias**

```sql
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
```

- [x] **Step 4: Adicionar ocorrencia_imagens**

```sql
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
```

- [x] **Step 5: Adicionar reservas**

```sql
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
```

- [x] **Step 6: Adicionar classificados**

```sql
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
```

- [x] **Step 7: Commit**

```bash
git add docs/03-database/migrations/001_initial_schema.sql
git commit -m "feat(db): add all business tables"
```

---

## Task 6: Adicionar índices

**Files:**
- Modify: `docs/03-database/migrations/001_initial_schema.sql`

- [x] **Step 1: Adicionar todos os índices**

```sql
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
```

- [x] **Step 2: Commit**

```bash
git add docs/03-database/migrations/001_initial_schema.sql
git commit -m "feat(db): add all performance indexes"
```

---

## Task 7: Adicionar funções helper

**Files:**
- Modify: `docs/03-database/migrations/001_initial_schema.sql`

- [x] **Step 1: Adicionar funções is_master_admin, is_member, get_user_role, has_role, has_any_role, get_my_memberships**

```sql
-- ============================================================
-- 5. FUNÇÕES HELPER (usadas nas RLS policies)
-- ============================================================

-- ------------------------------------------------------------
-- 5.1 is_master_admin() → BOOLEAN
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- 5.2 is_member(p_condominio_id) → BOOLEAN
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- 5.3 get_user_role(p_condominio_id) → TEXT
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- 5.4 has_role(p_condominio_id, p_role) → BOOLEAN
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- 5.5 has_any_role(p_condominio_id, p_roles[]) → BOOLEAN
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- 5.6 get_my_memberships() → TABLE
-- ------------------------------------------------------------
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
```

- [x] **Step 2: Commit**

```bash
git add docs/03-database/migrations/001_initial_schema.sql
git commit -m "feat(db): add RLS helper functions"
```

---

## Task 8: Habilitar RLS e criar policies

**Files:**
- Modify: `docs/03-database/migrations/001_initial_schema.sql`

- [x] **Step 1: Habilitar RLS em todas as tabelas**

```sql
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
```

- [x] **Step 2: Policies para condominios**

```sql
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
```

- [x] **Step 3: Policies para users**

```sql
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
      WHERE uc_me.user_id = auth.uid()
        AND uc_me.status = 'active'
    )
  );

CREATE POLICY "users_update_own"
  ON public.users FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());
```

- [x] **Step 4: Policies para user_condominios**

```sql
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
```

- [x] **Step 5: Policies para equipamentos**

```sql
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
```

- [x] **Step 6: Policies para avisos**

```sql
-- 7.5 avisos
CREATE POLICY "avisos_select_publicados"
  ON public.avisos FOR SELECT
  USING (
    (public.is_member(condominio_id) AND status = 'publicado')
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
```

- [x] **Step 7: Policies para entregas**

```sql
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
```

- [x] **Step 8: Policies para ocorrencias e ocorrencia_imagens**

```sql
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

-- 7.8 ocorrencia_imagens (acesso via join com ocorrencias)
CREATE POLICY "ocorrencia_imagens_select"
  ON public.ocorrencia_imagens FOR SELECT
  USING (
    public.is_master_admin()
    OR EXISTS (
      SELECT 1 FROM public.ocorrencias o
      JOIN public.user_condominios uc
        ON uc.condominio_id = o.condominio_id
       AND uc.user_id = auth.uid()
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
       AND uc.user_id = auth.uid()
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
       AND uc.user_id = auth.uid()
       AND uc.role IN ('sindico', 'conselho')
       AND uc.status = 'active'
      WHERE o.id = ocorrencia_imagens.ocorrencia_id
    )
  );
```

- [x] **Step 9: Policies para reservas**

```sql
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
```

- [x] **Step 10: Policies para classificados**

```sql
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
```

- [x] **Step 11: Commit**

```bash
git add docs/03-database/migrations/001_initial_schema.sql
git commit -m "feat(db): enable RLS and create all policies"
```

---

## Task 9: Adicionar triggers

**Files:**
- Modify: `docs/03-database/migrations/001_initial_schema.sql`

- [x] **Step 1: Triggers de updated_at**

```sql
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
```

- [x] **Step 2: Trigger de validação de reserva**

```sql
CREATE OR REPLACE FUNCTION public.validar_reserva()
RETURNS TRIGGER
LANGUAGE plpgsql
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
```

- [x] **Step 3: Trigger de sincronização auth → users**

```sql
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
```

- [x] **Step 4: Commit**

```bash
git add docs/03-database/migrations/001_initial_schema.sql
git commit -m "feat(db): add updated_at triggers, reserva validation, and auth sync"
```

---

## Task 10: Adicionar seed data

**Files:**
- Modify: `docs/03-database/migrations/001_initial_schema.sql`

- [x] **Step 1: Adicionar seed data (dev apenas)**

```sql
-- ============================================================
-- 10. SEED DATA — apenas dev/staging
-- REMOVER ou envolver em condicional antes de produção
-- ============================================================

DO $$
DECLARE
  v_condo_id UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid;
  v_user_id  UUID := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid;
  v_eq_id    UUID := 'cccccccc-cccc-cccc-cccc-cccccccccccc'::uuid;
BEGIN

  INSERT INTO public.condominios (
    id, cnpj, nome, nome_fantasia, subdomain,
    endereco, cep, cidade, estado,
    telefone, whatsapp, email,
    plan, subscription_status
  ) VALUES (
    v_condo_id,
    '12.345.678/0001-90',
    'Condomínio Edifício Solar do Vale',
    'Edifício Solar',
    'solar',
    'Rua das Flores, 123', '01310-100', 'São Paulo', 'SP',
    '(11) 3456-7890', '(11) 98765-4321', 'admin@solar.example.com',
    'plus', 'active'
  ) ON CONFLICT (id) DO NOTHING;

  -- Simula row que seria criada pelo trigger handle_new_user
  INSERT INTO public.users (id, email, nome, telefone)
  VALUES (
    v_user_id,
    'joao.silva@example.com',
    'João Silva',
    '(11) 99999-1111'
  ) ON CONFLICT (id) DO NOTHING;

  -- João é síndico do Solar
  INSERT INTO public.user_condominios (
    user_id, condominio_id, role, status, joined_at
  ) VALUES (
    v_user_id, v_condo_id, 'sindico', 'active', NOW()
  ) ON CONFLICT (user_id, condominio_id) DO NOTHING;

  -- Equipamento seed
  INSERT INTO public.equipamentos (
    id, condominio_id, nome, descricao, capacidade,
    horario_inicio, horario_fim
  ) VALUES (
    v_eq_id, v_condo_id,
    'Salão de Festas A',
    'Salão climatizado com churrasqueira, capacidade 80 pessoas',
    80, '08:00', '23:00'
  ) ON CONFLICT (id) DO NOTHING;

  -- Aviso seed
  INSERT INTO public.avisos (
    condominio_id, criado_por, titulo, mensagem,
    prioridade, status, publicado_em
  ) VALUES (
    v_condo_id, v_user_id,
    'Bem-vindo ao CondoMais!',
    'O sistema de gestão do condomínio foi ativado.',
    'alta', 'publicado', NOW()
  );

  RAISE NOTICE 'Seed data inserido com sucesso para o condomínio %', v_condo_id;
END;
$$;
```

- [x] **Step 2: Verificações finais**

```sql
-- Tabelas criadas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;
-- Expected: avisos, classificados, condominios, entregas,
--           equipamentos, ocorrencia_imagens, ocorrencias,
--           reservas, user_condominios, users

-- RLS habilitado
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
-- Expected: rowsecurity = true em todas as 10 tabelas

-- Funções helper
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public' AND routine_type = 'FUNCTION'
ORDER BY routine_name;
-- Expected: get_my_memberships, get_user_role, handle_new_user,
--           has_any_role, has_role, is_master_admin, is_member,
--           update_updated_at, validar_reserva
```

- [x] **Step 3: Commit final**

```bash
git add docs/03-database/migrations/001_initial_schema.sql
git commit -m "feat(db): add seed data and verification queries"
```

---

## Self-Review — Spec Coverage

| Requisito do Spec | Coberto | Task |
|-------------------|---------|------|
| Extensões (uuid, pgcrypto) | ✅ | Task 1 |
| Todas as 10 tabelas especificadas | ✅ | Tasks 2-5 |
| `fachada_url` em condominios | ✅ | Task 2 |
| `profile_image_url` em users | ✅ | Task 2 |
| `image_url` em ocorrencias (via tabela separada) | ✅ | Task 5 |
| `condominio_id` em TODAS as business tables | ✅ | Tasks 4-5 |
| `users` sem `condominio_id` (GLOBAL) | ✅ | Task 2 |
| RLS em TODAS as tabelas tenant | ✅ | Task 8 |
| Policies membership-based | ✅ | Task 8 |
| `is_member()` | ✅ | Task 7 |
| `has_role()` | ✅ | Task 7 |
| Roles: MORADOR, PORTEIRO, SINDICO, CONSELHO, MASTER_ADMIN | ✅ | Task 3 |
| CHECK constraints para todos os enums | ✅ | Tasks 2-5 |
| ON DELETE behavior em todos os FKs | ✅ | Tasks 2-5 |
| Timestamps NOT NULL com defaults | ✅ | Tasks 2-5 |
| Índices compostos (hot paths RLS) | ✅ | Task 6 |
| Partial indexes | ✅ | Task 6 |
| Trigger `updated_at` | ✅ | Task 9 |
| Trigger `auth → users` | ✅ | Task 9 |
| Trigger validação de reserva | ✅ | Task 9 |
| Seed data (tenant + user + membership) | ✅ | Task 10 |
