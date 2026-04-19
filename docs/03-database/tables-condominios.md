# Table: condominios

## 1. Objective

Define the `condominios` table—the root entity for the multi-tenant architecture that represents each condominium building.

## 2. Scope

This table stores:
- Building identification (CNPJ, name)
- Tenant configuration (subdomain, settings)
- Branding (logo, colors)
- Plan and subscription status

---

## 3. Step-by-Step Implementation

### Step 1: Create the Table

```sql
CREATE TABLE condominios (
  -- Identity (Primary Key)
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Legal Identification
  cnpj VARCHAR(20) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  nome_fantasia VARCHAR(100),
  
  -- Digital Presence (Tenant Identifier)
  subdomain VARCHAR(50) UNIQUE,  -- e.g., "solar" from solar.condomais.com.br
  
  -- Physical Address
  endereco VARCHAR(500),
  cep VARCHAR(10),
  cidade VARCHAR(100),
  estado VARCHAR(2),
  complemento VARCHAR(200),
  
  -- Contact Information
  telefone VARCHAR(20),
  whatsapp VARCHAR(20),
  email VARCHAR(255),
  
  -- Tenant Configuration
  settings JSONB DEFAULT '{}',
  
  -- Feature Configuration
  config_entregas JSONB DEFAULT '{
    "foto_obrigatoria": false,
    "notificar_whatsapp": true,
    "alerta_telegram": false,
    "retencao_dias": 90
  }',
  config_avisos JSONB DEFAULT '{
    "permitir_respostas": false,
    "expiracao_dias": 7,
    "permitir_anexos": true
  }',
  config_reservas JSONB DEFAULT '{
    "antecedencia_minima_horas": 24,
    "permitir_cancelamento": true,
    "max_reservas_mes": 4,
    "horario_inicio": "08:00",
    "horario_fim": "22:00"
  }',
  config_classificados JSONB DEFAULT '{
    "permitir_fotos": true,
    "max_fotos": 5,
    "expiracao_dias": 30,
    "permitir_venda": true,
    "permitir_compra": true,
    "permitir_troca": true,
    "permitir_servico": true
  }',
  
  -- Branding
  logo_url TEXT,
  cor_primaria VARCHAR(7) DEFAULT '#2563EB',
  cor_secundaria VARCHAR(7) DEFAULT '#64748B',
  
  -- Subscription
  plan VARCHAR(20) DEFAULT 'basic',
  trial_ends_at TIMESTAMPTZ,
  subscription_status VARCHAR(20) DEFAULT 'active',
  subscription_id TEXT,
  subscription_expires_at TIMESTAMPTZ,
  
  -- Features
  features JSONB DEFAULT '{
    "whatsapp": true,
    "google_calendar": false,
    "email_notifications": true,
    "push_notifications": true
  }',
  
  -- Limits (based on plan)
  max_unidades INTEGER DEFAULT 50,
  max_porteiros INTEGER DEFAULT 2,
  max_equipamentos INTEGER DEFAULT 10,
  max_storage_mb INTEGER DEFAULT 100,
  
  -- GDPR/ LGPD
  privacy_policy_url TEXT,
  terms_url TEXT,
  data_protection_officer VARCHAR(200),
  
  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Soft Delete
  deleted_at TIMESTAMPTZ
);

-- Index for subdomain lookups
CREATE INDEX idx_condominios_subdomain ON condominios(subdomain);

-- Index for CNPJ lookups
CREATE INDEX idx_condominios_cnpj ON condominios(cnpj);
```

### Step 2: Enable RLS

```sql
ALTER TABLE condominios ENABLE ROW LEVEL SECURITY;
```

### Step 3: Create RLS Policies

```sql
-- Read: Anyone can read (for login/selection)
CREATE POLICY "Public read condominios"
  ON condominios FOR SELECT
  USING (true);

-- Update: Only superadmins or the Síndico
CREATE POLICY "Admin update condominios"
  ON condominios FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM usuarios u
      WHERE u.auth_id = auth.uid()
        AND u.role = 'sindico'
        AND u.condominio_id = condominios.id
    )
  );
```

### Step 4: Create Update Trigger

```sql
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_condominios_updated_at
  BEFORE UPDATE ON condominios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

---

## 4. Technical Details

### 4.1 Sample Data

```sql
INSERT INTO condominios (
  cnpj,
  nome,
  nome_fantasia,
  subdomain,
  endereco,
  cidade,
  estado,
  telefone,
  whatsapp,
  email,
  config_entregas,
  plan
)
VALUES (
  '12.345.678/0001-90',
  'Condomínio Edifício Solar do Vale',
  'Edifício Solar do Vale',
  'solar',
  'Rua das Flores, 123',
  'São Paulo',
  'SP',
  '(11) 3456-7890',
  '(11) 98765-4321',
  'admin@solar.com.br',
  '{"foto_obrigatoria": false, "notificar_whatsapp": true}',
  'plus'
);
```

### 4.2 Configuration JSON Schema

```typescript
// config_entregas
interface EntregasConfig {
  foto_obrigatoria: boolean;
  notificar_whatsapp: boolean;
  alerta_telegram: boolean;
  retencao_dias: number;
}

// config_avisos
interface AvisosConfig {
  permitir_respostas: boolean;
  expiracao_dias: number;
  permitir_anexos: boolean;
}

// config_reservas
interface ReservasConfig {
  antecedencia_minima_horas: number;
  permitir_cancelamento: boolean;
  max_reservas_mes: number;
  horario_inicio: string;
  horario_fim: string;
}

// config_classificados
interface ClassificadosConfig {
  permitir_fotos: boolean;
  max_fotos: number;
  expiracao_dias: number;
  permitir_venda: boolean;
  permitir_compra: boolean;
  permitir_troca: boolean;
  permitir_servico: boolean;
}
```

### 4.3 Supabase JS Usage

```typescript
// Fetch current condominium
const { data: condominio } = await supabase
  .from('condominios')
  .select('*')
  .eq('id', tenantId)
  .single();

// Update configuration
const { data } = await supabase
  .from('condominios')
  .update({
    config_entregas: {
      ...currentConfig.config_entregas,
      foto_obrigatoria: true
    }
  })
  .eq('id', tenantId)
  .select()
  .single();
```

---

## 5. Dependencies

| Dependency | Required | Reason |
|-----------|----------|--------|
| PostgreSQL UUID extension | Auto | Primary key generation |
| RLS | Yes | Multi-tenant isolation |

---

## 6. Risks and Edge Cases

### 6.1 Risks

| Risk | Mitigation |
|------|-----------|
| Duplicate CNPJ on insert | UNIQUE constraint (implemented) |
| Subdomain conflict | UNIQUE constraint + validation |
| Large settings JSON | PostgreSQL limits |

### 6.2 Edge Cases

| Edge Case | Handling |
|----------|---------|
| CNPJ already exists | Return meaningful error message |
| Subdomain contains invalid chars | Validate using regex: `^[a-z0-9-]+$` |
| Null subdomain | Allow null for single-building setup |
| Plan downgrade | Handle gracefully with feature flags |
| Trial expired | Send email, limit features, not delete |

---

## 7. API Contracts

### 7.1 GET (List)

```http
GET /rest/v1/condominios?select=id,nome,subdomain,logo_url,cor_primaria
```

Response:
```json
[
  {
    "id": "uuid",
    "nome": "Edifício Solar do Vale",
    "subdomain": "solar",
    "logo_url": "https://...",
    "cor_primaria": "#2563EB"
  }
]
```

### 7.2 GET (Single)

```http
GET /rest/v1/condominios?id=eq.uuid
```

### 7.3 PATCH

```http
PATCH /rest/v1/condominios?id=eq.uuid
Content-Type: application/json

{
  "config_entregas": {
    "foto_obrigatoria": true,
    "notificar_whatsapp": true
  }
}
```

### 7.4 Row JSON

```sql
-- Row definition
{
  id: uuid,
  cnpj: string,
  nome: string,
  nome_fantasia: string,
  subdomain: string,
  endereco: string,
  cep: string,
  cidade: string,
  estado: string,
  telefone: string,
  whatsapp: string,
  email: string,
  settings: jsonb,
  config_entregas: jsonb,
  config_avisos: jsonb,
  config_reservas: jsonb,
  config_classificados: jsonb,
  logo_url: string,
  cor_primaria: string,
  cor_secundaria: string,
  plan: string,
  trial_ends_at: timestamptz,
  subscription_status: string,
  features: jsonb,
  max_unidades: integer,
  created_at: timestamptz,
  updated_at: timestamptz
}
```