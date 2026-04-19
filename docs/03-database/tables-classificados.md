# Table: classificados

## 1. Objective

Define the `classificados` table for the building marketplace/classifieds board.

## 2. Scope

- For-sale, wanted, trade, and service listings
- Photo uploads
- Category filtering
- Auto-expiration

---

## 3. Implementation

```sql
CREATE TABLE classificados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  morador_id UUID REFERENCES usuarios(id) NOT NULL,
  
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2),
  categoria VARCHAR(20) NOT NULL
    CHECK (categoria IN ('venda', 'compra', 'troca', 'servico')),
  
  fotos TEXT[],
  
  preferencia_contato VARCHAR(20) DEFAULT 'app',
  telefone_visivel BOOLEAN DEFAULT false,
  
  status VARCHAR(20) DEFAULT 'active'
    CHECK (status IN ('active', 'vendido', 'inativo')),
  
  visualizacoes INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  
  expires_at TIMESTAMPTZ,
  
  UNIQUE(condominio_id, morador_id, titulo)
);

CREATE INDEX idx_classificados_categoria ON classificados(categoria);
CREATE INDEX idx_classificados_status ON classificados(status);

ALTER TABLE classificados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Classificados public read"
  ON classificados FOR SELECT
  USING (
    condominio_id = (SELECT condominio_id FROM usuarios WHERE auth_id = auth.uid())
    AND status = 'active'
  );

CREATE POLICY "Morador manage classificados"
  ON classificados FOR ALL
  USING (
    morador_id = (SELECT id FROM usuarios WHERE auth_id = auth.uid())
    OR EXISTS (SELECT 1 FROM usuarios WHERE auth_id = auth.uid() AND role = 'sindico')
  );
```

---

## 4. API Methods

```typescript
interface Classificado {
  id: string;
  titulo: string;
  descricao: string;
  preco?: number;
  categoria: 'venda' | 'compra' | 'troca' | 'servico';
  fotos: string[];
  preferencias: { contato: string; telefoneVisivel: boolean };
  status: string;
}

// Create listing
async createClassificado(data: {
  titulo: string;
  descricao: string;
  preco?: number;
  categoria: string;
}): Promise<Classificado>;

// Mark as sold
async markAsSold(id: string): Promise<void>;
```