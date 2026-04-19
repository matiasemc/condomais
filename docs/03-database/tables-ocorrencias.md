# Table: ocorrencias

## 1. Objective

Define the `ocorrencias` (incidents/occurrences) table for reporting building incidents.

## 2. Scope

This table stores:
- Incident reports from porteiros
- Type categorization
- Location info
- Status tracking
- Photo attachments

---

## 3. Implementation

```sql
CREATE TABLE ocorrencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  porteiro_id UUID REFERENCES users(id),
  
  tipo VARCHAR(50) NOT NULL
    CHECK (tipo IN (
      'entrada_suspeita',
      'ruido',
      'vandalismo',
      'acidente',
      'entrada_nao_autorizada',
      'outro'
    )),
  
  descricao TEXT NOT NULL,
  local VARCHAR(100),
  data_ocorrido TIMESTAMPTZ,
  
  -- Fotos URLs (array para múltiplas imagens)
  fotos TEXT[],
  
  status VARCHAR(20) DEFAULT 'aberta'
    CHECK (status IN ('aberta', 'investigando', 'resolvida', 'encerrada')),
  
  resolvida_por UUID REFERENCES users(id),
  resolucao TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ocorrencias_condominio ON ocorrencias(condominio_id);
CREATE INDEX idx_ocorrencias_tipo ON ocorrencias(tipo);
CREATE INDEX idx_ocorrencias_status ON ocorrencias(status);

ALTER TABLE ocorrencias ENABLE ROW LEVEL SECURITY;
```

---

## 4. API

```typescript
// Create occurrence
async function createOcorrencia(data: {
  condominio_id: string;
  tipo: string;
  descricao: string;
  local?: string;
  fotos?: string[];
}) {
  return supabase.from('ocorrencias').insert(data).select().single();
}

// Get by condominio
async function getOcorrencias(condominioId: string) {
  return supabase
    .from('ocorrencias')
    .select('*')
    .eq('condominio_id', condominioId)
    .order('created_at', { ascending: false });
}
```