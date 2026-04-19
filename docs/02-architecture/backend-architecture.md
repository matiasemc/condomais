# Backend Architecture

## 1. Objective

Define the Supabase backend architecture for CondoMais, including database design, functions, storage, and configuration.

## 2. Scope

This document covers:
- Project setup
- Database schema
- Tables and relationships
- Storage buckets
- Edge functions

---

## 3. Supabase Configuration

### 3.1 Project Setup

```bash
# supabase/config.toml
[project]
id = "condomais"
name = "CondoMais"

[api]
enabled = true
port = 54321
schemas = ["public", "storage", "graphql", "extensions"]
extra_search_path = ["public", "extensions"]

[db]
port = 54322
major_version = 14

[db.pooler]
enabled = false

[realtime]
enabled = true

[storage]
enabled = true

[auth]
enabled = true
site_url = "https://condomais.com.br"
jwt_expiry = 3600
enable_signup = true
enable_anonymous_users = false
```

---

## 4. Database Schema

### 4.1 Core Tables

```sql
-- USERS: Global (no condominio reference)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  telefone VARCHAR(20),
  foto_url TEXT,
  google_id VARCHAR(255) UNIQUE,
  accept_terms_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONDOMINIOS: Tenants
CREATE TABLE condominios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cnpj VARCHAR(20) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  nome_fantasia VARCHAR(100),
  subdomain VARCHAR(50) UNIQUE,
  telefone VARCHAR(20),
  whatsapp VARCHAR(20),
  email VARCHAR(255),
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- USER_CONDOMINIOS: Membership with role
CREATE TABLE user_condominios (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  condominio_id UUID REFERENCES condominios(id) ON DELETE CASCADE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('sindico', 'morador', 'porteiro', 'conselho', 'master_admin')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('pending', 'active', 'inactive', 'suspended')),
  invited_by UUID REFERENCES users(id),
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, condominio_id)
);

-- ENTREGAS: Delivery tracking
CREATE TABLE entregas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  unidade VARCHAR(20) NOT NULL,
  porteiro_id UUID REFERENCES users(id),
  codigo_rastreamento VARCHAR(100),
  transportadora VARCHAR(100),
  tipo VARCHAR(50) DEFAULT 'encomenda',
  descricao TEXT,
  foto_url TEXT,
  status VARCHAR(20) DEFAULT 'pendente',
  data_retirada TIMESTAMPTZ,
  quem_retirou VARCHAR(200),
  notificado_em TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AVISOS: Announcements
CREATE TABLE avisos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  sindico_id UUID REFERENCES users(id),
  titulo VARCHAR(200) NOT NULL,
  mensagem TEXT NOT NULL,
  prioridade VARCHAR(20) DEFAULT 'normal',
  data_expiracao TIMESTAMPTZ,
  visualizacoes INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'publicado',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RESERVAS: Reservations
CREATE TABLE reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  equipamento VARCHAR(100) NOT NULL,
  morador_id UUID REFERENCES users(id),
  data DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  motivo TEXT,
  status VARCHAR(20) DEFAULT 'confirmada',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- OCORRENCIAS: Incidents
CREATE TABLE ocorrencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  porteiro_id UUID REFERENCES users(id),
  tipo VARCHAR(50) NOT NULL,
  descricao TEXT NOT NULL,
  local VARCHAR(100),
  status VARCHAR(20) DEFAULT 'aberta',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CLASSIFICADOS: Marketplace
CREATE TABLE classificados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  morador_id UUID REFERENCES users(id),
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2),
  categoria VARCHAR(20) NOT NULL,
  fotos TEXT[],
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. Storage Buckets

```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES 
  ('condominios-images', 'condominios-images', false, 5242880),
  ('users-avatars', 'users-avatars', true, 2097152),
  ('deliveries-images', 'deliveries-images', true, 10485760),
  ('occurrences-images', 'occurrences-images', false, 10485760),
  ('classifieds-images', 'classifieds-images', true, 5242880);
```

---

## 6. RLS Policies (All Tables)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE condominios ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_condominios ENABLE ROW LEVEL SECURITY;
ALTER TABLE entregas ENABLE ROW LEVEL SECURITY;
ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE ocorrencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE classificados ENABLE ROW LEVEL SECURITY;

-- Helper functions for RLS
-- (see helper-functions.md for complete definitions)
```

---

## 7. API Endpoints

### 7.1 REST API

| Table | Endpoints |
|-------|----------|
| users | GET/POST /users |
| condominios | GET/POST /condominios |
| user_condominios | GET/POST /user_condominios |
| entregas | GET/POST /entregas |
| avisos | GET/POST /avisos |
| reservas | GET/POST /reservas |
| ocorrencias | GET/POST /ocorrencias |
| classificados | GET/POST /classificados |

### 7.2 Realtime Subscriptions

```typescript
// Subscribe to deliveries for current condominio
supabase
  .channel('entregas')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'entregas',
    filter: `condominio_id=eq.${currentCondominioId}`
  }, (payload) => notifications.delivery(payload.new))
  .subscribe();
```

---

## 8. Implementation Checklist

- [ ] Create Supabase project
- [ ] Configure config.toml
- [ ] Create all tables
- [ ] Create indexes
- [ ] Enable RLS on all tables
- [ ] Create helper functions
- [ ] Create RLS policies
- [ ] Create storage buckets
- [ ] Set storage policies
- [ ] Test tenant isolation