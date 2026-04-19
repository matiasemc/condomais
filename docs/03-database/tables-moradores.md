# Table: moradores (deprecated - see usuarios)

## 1. Objective

**NOTE**: This table is deprecated. All resident data is now stored in `usuarios` with `role = 'morador'`.

This document exists for backward compatibility with legacy implementations.

---

## 2. Migration Path

```sql
-- Create view for backward compatibility
CREATE VIEW moradores AS
SELECT 
  u.id,
  u.condominio_id,
  u.unidade_id,
  u.email,
  u.nome,
  u.telefone,
  u.foto_url,
  u.status,
  u.preferences,
  u.created_at,
  u.updated_at
FROM usuarios u
WHERE u.role = 'morador';

-- Optional: Create real table only if specific queries are slow
/*
CREATE TABLE moradores (
  id UUID PRIMARY KEY,
  -- Inherits from usuarios but optimized for morador-specific queries
);
*/
```

---

## 3. API Compatibility

Queries using `moradores` table should be updated to use:

```sql
-- Old (deprecated)
SELECT * FROM moradores WHERE condominio_id = 'uuid';

-- New (preferred)
SELECT * FROM usuarios 
WHERE condominio_id = 'uuid' 
  AND role = 'morador';
```