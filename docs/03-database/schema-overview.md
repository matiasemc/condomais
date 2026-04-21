# Database Schema Overview

## 1. Objective

Provide a high-level overview of the CondoMais database schema, establishing entity relationships and data flow before diving into individual table specifications.

## 2. Scope

This document covers:
- Entity-relationship diagram (conceptual)
- Core tables and relationships
- Data flow patterns
- Indexing strategy

---

## 3. Conceptual ERD

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              CONDOMÍNIOS (Tenant)                          │
├────────────────────────────────────────────────────────────────────────────┬────────┤
│  id: UUID                                                              │        │
│  cnpj: VARCHAR(20) UNIQUE                                             │        │
│  nome: VARCHAR(200)                                                  │        │
│  subdomain: VARCHAR(50) UNIQUE                                       │        │
│  settings: JSONB                                                      │┘       │
│  plan: VARCHAR(20)                                                   │         │
└────────────────┬─────────────────────────────────────────────────────┘         │
                 │                                                            │
       ┌─────────┼─────────────────────────────────────────────────┐                       │
       │         │                                         │                       │
       ▼         ▼                                         ▼                       │
┌──────────────┐                 ┌──────────────────┐              ┌──────────────┐
│  UNIDADES   │                 │    EQUIPAMENTOS   │              │  USUARIOS   │
├──────────────┤                 ├──────────────────┤              ├──────────────┤
│ condominio_id│◄─┐            │ condominio_id   │◄────┐       │ condominio_id│◄─┐
│ bloco       │  │            │ nome            │     │       │ unidade_id  │  │
│ numero      │  │            │ capacidade     │     │       │ email       │  │
│ proprietario│  │            │ regras JSONB    │     │       │ role morador │  │
└──────┬──────┘  │            └─────────────────┘     │       │ role porteiro│  │
       │         │                                         │       │ role sindico │  │
       │         │                                         │       └──────┬──────┘  │
       │         │                                         │              │         │
       │         │               ┌─────────────────┐     │              │         │
       │         └──────────────►│    ENTREGAS    │◄────┘              │         │
       │                     ├──────────────────┤                    │         │
       │                     │ condominio_id   │                    │         │
       │                     │ unidade_id FK  │◄───┘                  │         │
       │                     │ porteiro_id   │                       │         │
       │                     │ codigo_rastreamento│                    │         │
       │                     │ status        │                       │         │
       │                     └──────┬───────┘                       │         │
       │                            │                                │         │
       │                     ┌───────┴───────┐                        │         │
       │                     │  RESERVAS   │                        │         │
       │                     ├──────────────┤                        │         │
       │                     │ condominio_id   │                │         │
       │                     │ Equipamento_id  │                │         │
       │                     │ morador_id   │                  │         │
       │                     │ data/hora    │                  │         │
       │                     └──────────────┘                  │         │
       │                                                   ┌────┴───────┘
       │                     ┌─────────────┐                │
       │                     │   AVISOS    │◄───────────────┘
       │                     ├─────────────┤
       │                     │ condominio_id│
       │                     │ sindico_id  │
       │                     │ titulo      │
       │                     │ mensagem   │
       │                     │ prioridade │
       │                     └─────────────┘
       │
       │                     ┌────────────────┐
       └───────────────────►│ CLASSIFICADOS │
                             ├────────────────┤
                             │ condominio_id  │
                             │ morador_id    │
                             │ titulo       │
                             │ descricao   │
                             │ preco       │
                             │ fotos       │
                             │ categoria   │
                             └──────────────┘
```

---

## 4. Core Tables Summary

### 4.1 Tenant Management

| Table | Purpose | Rows/Building |
|-------|--------|---------------|
| condominios | Tenant configuration | 1 per building |
| units | Apartment/unit inventory | 50-500 per building |
| equipamentos |amenable (pool, gym, BBQ) | 5-20 per building |

### 4.2 User Management

| Table | Purpose | Rows/Building |
|-------|--------|---------------|
| users | User profiles (global) | Global |
| user_condominios | Membership junction (MANY-TO-MANY) | Per user/condominio |

### 4.3 Core Features

| Table | Purpose | Rows/Building |
|-------|--------|---------------|
| entregas | Package delivery tracking | 100-500/month |
| avisos | Announcements | 10-50/month |
| reservas | Amenity reservations | 50-200/month |
| classificados | Marketplace listings | 10-50 active |
| ocorrencias | Incident reports | 5-20/month |

### 4.4 Tracking

| Table | Purpose | Usage |
|-------|--------|-------|
| aviso_leituras | Announcement reads | 1 per user/announcement |
| reserva_confirmations | Reservation confirmations | 1 per reservation |
| classificado_views | Ad views | Multiple per ad |

---

## 5. Relationship Cardinalities

```
condominios (1) ─────── (N) unidades
condominios (1) ─────── (N) usuarios
condominios (1) ─────── (N) equipamentos

unidades (1) ─────── (N) usuarios
unidades (1) ─────── (N) entregas
unidades (1) ─────── (N) reservas

usuarios (1) ─────── (N) entregas (as porterio)
usuarios (1) ─────── (N) avisos (as sindico)
usuarios (1) ─────── (N) reservas
usuarios (1) ─────── (N) classificados
usuarios (1) ─────── (N) ocorrencias

equipamentos (1) ─────── (N) reservas

avisos (1) ─────── (N) aviso_leituras

user_condominios (N) ─────── (1) users
user_condominios (N) ─────── (1) condominios
```

---

## 6. Data Flow Patterns

### 6.1 Registration Flow

```
Porteiro registers delivery
         │
         ▼
   entregas (INSERT)
         │
         ▼
   Trigger: notify_new_entrega()
         │
         ├──────────────────┐
         ▼                  ▼
notificacoes.insert   realtime broadcast
         │                  │
         ▼                  ▼
   FCM push          client subscription
```

### 6.2 Reservation Flow

```
Resident requests reservation
         │
         ▼
   validate_quota_check()
         │
         ▼
   check_conflicts()
         │
         ├──────────────────┐
         ▼                  ▼
  available              conflict
         │                  │
         ▼                  ▼
  reservas.insert    return error
         │
         ▼
  sync_google_calendar()
         │
         ▼
  confirmation notification
```

---

## 7. Indexing Strategy

### 7.1 Primary Indexes

Automatically created for PRIMARY KEY columns:
- `condominios(id)`
- `usuarios(id)`
- `entregas(id)`
- `unidades(id)`

### 7.2 Composite Indexes

```sql
-- Tenant-filtered queries
CREATE INDEX idx_entregas_condominio 
  ON entregas(condominio_id);

CREATE INDEX idx_entregas_unidade 
  ON entregas(unidade_id);

CREATE INDEX idx_entregas_created 
  ON entregas(created_at DESC);

-- Tenant + status combination
CREATE INDEX idx_entregas_condominio_status 
  ON entregas(condominio_id, status);

-- Tenant + date range
CREATE INDEX idx_avisos_condominio_data 
  ON avisos(condominio_id, created_at DESC);

-- Resource scheduling
CREATE INDEX idx_reservas_equipamento_data 
  ON reservas(equipamento_id, data);
```

### 7.3 Full-Text Search Indexes

```sql
-- Create search vector column
ALTER TABLE moradores 
  ADD COLUMN busca_text tsvector 
  GENERATED ALWAYS AS (
    setweight(to_tsvector('portuguese', nome), 'A') ||
    setweight(to_tsvector('portuguese', coalesce(email,'')), 'B')
  ) STORED;

-- Create index
CREATE INDEX idx_moradores_busca 
  ON moradores USING GIN(busca_text);

-- Same for other text-search tables
ALTER TABLE avisos 
  ADD COLUMN busca_text tsvector 
  GENERATED ALWAYS AS (
    setweight(to_tsvector('portuguese', titulo), 'A') ||
    setweight(to_tsvector('portuguese', mensagem), 'B')
  ) STORED;

CREATE INDEX idx_avisos_busca 
  ON avisos USING GIN(busca_text);
```

---

## 8. Foreign Key Constraints

```sql
-- All foreign keys with ON DELETE RESTRICT for data integrity

-- condominios
ALTER TABLE unidades 
  ADD CONSTRAINT fk_unidades_condominio
  FOREIGN KEY (condominio_id) REFERENCES condominios(id)
  ON DELETE RESTRICT;

ALTER TABLE usuarios 
  ADD CONSTRAINT fk_usuarios_condominio
  FOREIGN KEY (condominio_id) REFERENCES condominios(id)
  ON DELETE RESTRICT;

ALTER TABLE entregas 
  ADD CONSTRAINT fk_entregas_condominio
  FOREIGN KEY (condominio_id) REFERENCES condominios(id)
  ON DELETE RESTRICT;

-- unidades
ALTER TABLE usuarios 
  ADD CONSTRAINT fk_usuarios_unidade
  FOREIGN KEY (unidade_id) REFERENCES unidades(id)
  ON DELETE SET NULL;

ALTER TABLE entregas 
  ADD CONSTRAINT fk_entregas_unidade
  FOREIGN KEY (unidade_id) REFERENCES unidades(id)
  ON DELETE RESTRICT;

ALTER TABLE reservas 
  ADD CONSTRAINT fk_reservas_unidade
  FOREIGN KEY (unidade_id) REFERENCES unidades(id)
  ON DELETE RESTRICT;

-- usuarios
ALTER TABLE entregas 
  ADD CONSTRAINT fk_entregas_porteiro
  FOREIGN KEY (porteiro_id) REFERENCES usuarios(id)
  ON DELETE SET NULL;

ALTER TABLE avisos 
  ADD CONSTRAINT fk_avisos_sindico
  FOREIGN KEY (sindico_id) REFERENCES usuarios(id)
  ON DELETE SET NULL;

ALTER TABLE reservas 
  ADD CONSTRAINT fk_reservas_morador
  FOREIGN KEY (morador_id) REFERENCES usuarios(id)
  ON DELETE RESTRICT;

ALTER TABLE classificados 
  ADD CONSTRAINT fk_classificados_morador
  FOREIGN KEY (morador_id) REFERENCES usuarios(id)
  ON DELETE CASCADE;

ALTER TABLE ocorrencias 
  ADD CONSTRAINT fk_ocorrencias_porteiro
  FOREIGN KEY (porteiro_id) REFERENCES usuarios(id)
  ON DELETE SET NULL;

-- equipamentos
ALTER TABLE reservas 
  ADD CONSTRAINT fk_reservas_equipamento
  FOREIGN KEY (equipamento_id) REFERENCES equipamentos(id)
  ON DELETE RESTRICT;
```

---

## 9. Naming Conventions

### 9.1 Tables

| Convention | Example |
|-----------|---------|
| Plural, snake_case | `condominios`, `entregas`, `avisos` |
| Join tables | `aviso_leituras`, `reserva_confirmations` |

### 9.2 Columns

| Convention | Example |
|-----------|---------|
| Primary key | `id` (UUID) |
| Foreign key | `{table}_id` (e.g., `condominio_id`) |
| Timestamps | `created_at`, `updated_at`, `deleted_at` |
| Status | `status` (VARCHAR with CHECK) |
| Type/Category | `tipo`, `categoria` |
| Soft delete | `deleted_at` (nullable timestamp) |

### 9.3 Constraints

| Convention | Example |
|-----------|---------|
| Primary key | `pk_{table}` |
| Foreign key | `fk_{table}_{foreign_table}` |
| Unique | `uq_{table}_{columns}` |
| Check | `ck_{table}_{condition}` |
| Index | `idx_{table}_{columns}` |

---

## 10. Migration Strategy

### 10.1 Migration Files

```
migrations/
├── 001_initial_schema.sql
├── 002_add_audit_logs.sql
├── 003_add_indexes.sql
├── 004_update_rls_policies.sql
└── 005_seed_data.sql
```

### 10.2 Migration Commands

```bash
# Run migrations
supabase db reset

# Or via SQL editor
\i migrations/001_initial_schema.sql

# Check migrations applied
SELECT * FROM supabase_migrations.schema_migrations;
```