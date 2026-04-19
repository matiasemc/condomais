# Table: entregas

## 1. Objective

Define the `entregas` table for tracking package and delivery registrations in the condominium.

## 2. Scope

This table stores:
- Delivery tracking (tracking number, courier)
- Unit assignment
- Status tracking
- Photo documentation (URL reference to storage)
- Notification history

---

## 3. Step-by-Step Implementation

### Step 1: Create the Table

```sql
CREATE TABLE entregas (
  -- Identity
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Tenant (condominium this delivery belongs to)
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  
  -- Unit (recipient's apartment/unit number)
  unidade VARCHAR(20) NOT NULL,
  
  -- Person who registered (doorman/user - NOT tied to user_condominios directly)
  porteiro_id UUID REFERENCES users(id),
  
  -- Tracking Information
  codigo_rastreamento VARCHAR(100),
  transportadora VARCHAR(100),
  tipo VARCHAR(50) DEFAULT 'encomenda'
    CHECK (tipo IN (
      'encomenda',   -- Regular package
      'sedex',      -- Express delivery
      'cafe',       -- Food delivery
      'jantar',     -- Restaurant delivery
      'documento',  -- Documents
      'medicamento', -- Medicine
      'outro'       -- Other
    )),
  
  -- Description
  descricao TEXT,
  
  -- Photo URL (stored in storage, not in DB)
  foto_url TEXT,
  
  -- Status
  status VARCHAR(20) DEFAULT 'pendente'
    CHECK (status IN (
      'pendente',    -- Waiting for pickup
      'notificada', -- Resident notified
      'retirada',   -- Picked up
      'devolvida',  -- Returned to sender
      'expirada',   -- Not picked up within retention period
      'cancelada'   -- Canceled
    )),
  
  -- Pickup Information
  data_retirada TIMESTAMPTZ,
  quem_retirou VARCHAR(200),
  
  -- Notifications
  notificado_em TIMESTAMPTZ,
  tentativas_notificacao INTEGER DEFAULT 0,
  
  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Soft Delete
  deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_entregas_condominio ON entregas(condominio_id);
CREATE INDEX idx_entregas_unidade ON entregas(unidade);
CREATE INDEX idx_entregas_status ON entregas(status);
CREATE INDEX idx_entregas_created ON entregas(created_at DESC);
CREATE INDEX idx_entregas_codigo ON entregas(codigo_rastreamento) 
  WHERE codigo_rastreamento IS NOT NULL;
CREATE INDEX idx_entregas_condominio_status ON entregas(condominio_id, status);
```

### Step 2: Enable RLS

```sql
ALTER TABLE entregas ENABLE ROW LEVEL SECURITY;
```

### Step 3: Create RLS Policies

```sql
-- Members can see deliveries in their condominio
CREATE POLICY "Entregas member read"
  ON entregas FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_condominios uc
      WHERE uc.user_id = auth.uid()::uuid
        AND uc.condominio_id = entregas.condominio_id
        AND uc.status = 'active'
    )
  );

-- SINDICO/PORTEIRO can insert/update
CREATE POLICY "Entregas porteiro write"
  ON entregas FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_condominios uc
      WHERE uc.user_id = auth.uid()::uuid
        AND uc.condominio_id = entregas.condominio_id
        AND uc.role IN ('sindico', 'porteiro', 'conselho')
        AND uc.status = 'active'
    )
  );
```

### Step 4: Create Triggers

```sql
-- Auto-update data_expiracao and timestamp
CREATE OR REPLACE FUNCTION update_entrega_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  
  -- Set expiration if new
  IF TG_OP = 'INSERT' AND NEW.data_retirada IS NULL THEN
    -- Default 30 days retention
    -- Could get from condominio config
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_entregas_timestamp
  BEFORE INSERT OR UPDATE ON entregas
  FOR EACH ROW
  EXECUTE FUNCTION update_entrega_timestamp();
```

---

## 4. API Implementation

### 4.1 Create Delivery (Porteiro)

```typescript
interface CreateEntregaInput {
  condominio_id: string;
  unidade: string;
  codigo_rastreamento?: string;
  transportadora: string;
  tipo?: string;
  descricao?: string;
  foto_url?: string;
}

async function registerDelivery(data: CreateEntregaInput) {
  const user = await authService.getCurrentUser();
  
  // Verify role
  const { data: member } = await supabase
    .from('user_condominios')
    .select('role')
    .eq('user_id', user.id)
    .eq('condominio_id', data.condominio_id)
    .eq('status', 'active')
    .single();
  
  if (!['sindico', 'porteiro'].includes(member?.role)) {
    throw new Error('Not authorized');
  }
  
  return supabase
    .from('entregas')
    .insert({
      ...data,
      porteiro_id: user.id,
      status: 'pendente'
    })
    .select()
    .single();
}
```

### 4.2 Get Condominio Deliveries

```typescript
async function getCondominioDeliveries(condominioId: string, filters?: {
  status?: string;
  unidade?: string;
  from?: string;
  to?: string;
}) {
  let query = supabase
    .from('entregas')
    .select('*')
    .eq('condominio_id', condominioId)
    .order('created_at', { ascending: false });
  
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.unidade) {
    query = query.ilike('unidade', `%${filters.unidade}%`);
  }
  if (filters?.from) {
    query = query.gte('created_at', filters.from);
  }
  if (filters?.to) {
    query = query.lte('created_at', filters.to);
  }
  
  return query;
}
```

### 4.3 Mark as Retirada

```typescript
async function markAsRetirada(
  entregaId: string, 
  quemRetirou: string
) {
  return supabase
    .from('entregas')
    .update({
      status: 'retirada',
      data_retirada: new Date().toISOString(),
      quem_retirou: quemRetirou
    })
    .eq('id', entregaId);
}
```

---

## 5. Related Files

- `tables-condominios.md`: Tenant table
- `storage-strategy.md`: Image storage
- `rls-policies.md`: Security policies