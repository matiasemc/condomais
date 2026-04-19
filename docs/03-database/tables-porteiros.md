# Table: porteiros (deprecated - see usuarios)

## 1. Objective

**NOTE**: This table is deprecated. All doorman data is now stored in `usuarios` with `role = 'porteiro'`.

This document exists for backward compatibility.

---

## 2. Migration Path

```sql
-- Create view for backward compatibility
CREATE VIEW porteiros AS
SELECT 
  u.id,
  u.condominio_id,
  u.email,
  u.nome,
  u.telefone,
  u.foto_url,
  u.status,
  u.preferences,
  u.created_at,
  u.updated_at
FROM usuarios u
WHERE u.role = 'porteiro';

-- For enhanced porteiro-specific features
CREATE TABLE porteiros_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id) NOT NULL,
  
  -- Doorman-specific configuration
  turno VARCHAR(20),  -- 'manha', 'tarde', 'noite'
  horarie_entries JSONB DEFAULT '[]',  -- [{dia: 1, entrada: "08:00", saida: "18:00"}]
  permite_cadastro_entregas BOOLEAN DEFAULT true,
  permite_busca_moradores BOOLEAN DEFAULT true,
  permite_ocorrencias BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(usuario_id)
);
```

---

## 3. API Compatibility

```sql
-- Use usuarios table with role filter
SELECT * FROM usuarios 
WHERE condominio_id = 'uuid' 
  AND role = 'porteiro';
```