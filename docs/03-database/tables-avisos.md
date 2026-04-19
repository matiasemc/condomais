# Table: avisos

## 1. Objective

Define the `avisos` table for building-wide announcements and notices.

## 2. Scope

This table stores:
- Announcements from Síndico
- Priority levels (normal, importante, urgente)
- Recipient targeting
- Read tracking
- Expiration dates

---

## 3. Step-by-Step Implementation

### Step 1: Create the Table

```sql
CREATE TABLE avisos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  sindico_id UUID REFERENCES usuarios(id),
  
  titulo VARCHAR(200) NOT NULL,
  mensagem TEXT NOT NULL,
  
  prioridade VARCHAR(20) DEFAULT 'normal'
    CHECK (prioridade IN ('normal', 'importante', 'urgente')),
  
  recipients_filter JSONB DEFAULT '{"tipo": "all_residents"}',
  
  data_expiracao TIMESTAMPTZ,
  
  visualizacoes INTEGER DEFAULT 0,
  confirmadas INTEGER DEFAULT 0,
  
  status VARCHAR(20) DEFAULT 'rascunho'
    CHECK (status IN ('rascunho', 'publicado', 'arquivado')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_avisos_condominio ON avisos(condominio_id);
CREATE INDEX idx_avisos_created ON avisos(created_at DESC);
CREATE INDEX idx_avisos_status ON avisos(status);
```

### Step 2: Enable RLS and Policies

```sql
ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Avisos read access"
  ON avisos FOR SELECT
  USING (
    condominio_id = (
      SELECT condominio_id FROM usuarios WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Sindico manage avisos"
  ON avisos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM usuarios WHERE auth_id = auth.uid() AND role = 'sindico'
    )
  );
```

---

## 4. Technical Details

### 4.1 Recipients Filter

```typescript
interface RecipientsFilter {
  tipo: 'all_residents' | 'unidades' | 'roles';
  unidade_ids?: string[];
  roles?: ('morador' | 'conselho')[];
}
```

### 4.2 Service Methods

```typescript
// Create announcement
async createAviso(data: {
  titulo: string;
  mensagem: string;
  prioridade: 'normal' | 'importante' | 'urgente';
  data_expiracao?: string;
}): Promise<Aviso> {
  const sindico = await this.authService.getCurrentUser();
  
  return this.supabase.from('avisos').insert({
    ...data,
    condominio_id: sindico.condominio_id,
    sindico_id: sindico.id,
    status: 'publicado'
  }).select().single();
}
```

---

## 5. Dependencies

- condominios (tenant)
- usuarios (sindico)
- aviso_leituras (read tracking)