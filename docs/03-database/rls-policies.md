# Row-Level Security (RLS) Policies

## 1. Objective

Define comprehensive Row-Level Security policies to enforce tenant isolation and role-based access control at the database level.

## 2. Scope

This document covers:
- RLS enablement strategy
- Policy creation for all tables
- Cross-table policy considerations
- Testing and validation

---

## 3. RLS Enablement Strategy

### 3.1 Apply RLS to All Tables

```sql
-- Enable RLS on all tenant-specific tables
ALTER TABLE condominios ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE unidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE entregas ENABLE ROW LEVEL SECURITY;
ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE classificados ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ocorrencias ENABLE ROW LEVEL SECURITY;
```

---

## 4. Policy Templates

### 4.1 Tenant Isolation Policy (Base)

```sql
-- Base tenant isolation policy
CREATE POLICY "Tenant isolation"
  ON {table} FOR ALL
  USING (
    condominio_id = (
      SELECT condominio_id 
      FROM usuarios 
      WHERE auth_id = auth.uid()
    )
  )
  WITH CHECK (
    condominio_id = (
      SELECT condominio_id 
      FROM usuarios 
      WHERE auth_id = auth.uid()
    )
  );
```

### 4.2 Users Table Policies

```sql
-- Policy 1: Users can read building users
CREATE POLICY "Users read building users"
  ON usuarios FOR SELECT
  USING (
    condominio_id = (
      SELECT condominio_id FROM usuarios WHERE auth_id = auth.uid()
    )
  );

-- Policy 2: Síndico can manage users
CREATE POLICY "Sindico manage users"
  ON usuarios FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE auth_id = auth.uid()
        AND role = 'sindico'
        AND condominio_id = usuarios.condominio_id
    )
    OR auth.uid() = usuarios.auth_id
  );

-- Policy 3: Users can update own record
CREATE POLICY "Users update own"
  ON usuarios FOR UPDATE
  USING (auth.uid() = auth_id);
```

### 4.3 Entregas Table Policies

```sql
-- Policy 1: Read access (residents see own, staff see all)
CREATE POLICY "Entregas read"
  ON entregas FOR SELECT
  USING (
    condominio_id = (
      SELECT condominio_id FROM usuarios WHERE auth_id = auth.uid()
    )
    AND (
      unidade_id = (
        SELECT unidade_id FROM usuarios WHERE auth_id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM usuarios
        WHERE auth_id = auth.uid()
          AND role IN ('sindico', 'porteiro')
      )
    )
  );

-- Policy 2: Porteiro/Síndico can modify
CREATE POLICY "Entregas write"
  ON entregas FOR ALL
  USING (
    condominio_id = (
      SELECT condominio_id FROM usuarios WHERE auth_id = auth.uid()
    )
    AND EXISTS (
      SELECT 1 FROM usuarios
      WHERE auth_id = auth.uid()
        AND role IN ('sindico', 'porteiro')
    )
  );
```

### 4.4 Avisos Table Policies

```sql
-- Policy 1: Public read within building
CREATE POLICY "Avisos read"
  ON avisos FOR SELECT
  USING (
    condominio_id = (
      SELECT condominio_id FROM usuarios WHERE auth_id = auth.uid()
    )
    AND status = 'publicado'
  );

-- Policy 2: Síndico can create/update
CREATE POLICY "Avisos write"
  ON avisos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM usuarios
      WHERE auth_id = auth.uid()
        AND role = 'sindico'
        AND condominio_id = avisos.condominio_id
    )
  );
```

### 4.5 Reservas Table Policies

```sql
-- Policy 1: Read access
CREATE POLICY "Reservas read"
  ON reservas FOR SELECT
  USING (
    condominio_id = (
      SELECT condominio_id FROM usuarios WHERE auth_id = auth.uid()
    )
    AND status = 'confirmada'
  );

-- Policy 2: Residents can create own, Síndico can manage all
CREATE POLICY "Reservas write"
  ON reservas FOR ALL
  USING (
    condominio_id = (
      SELECT condominio_id FROM usuarios WHERE auth_id = auth.uid()
    )
    AND (
      morador_id = (
        SELECT id FROM usuarios WHERE auth_id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM usuarios
        WHERE auth_id = auth.uid()
          AND role IN ('sindico', 'conselho')
      )
    )
  );
```

### 4.6 Classificados Table Policies

```sql
-- Policy 1: Public read (active listings)
CREATE POLICY "Classificados read"
  ON classificados FOR SELECT
  USING (
    condominio_id = (
      SELECT condominio_id FROM usuarios WHERE auth_id = auth.uid()
    )
    AND status = 'active'
  );

-- Policy 2: Own create/update, Síndico can delete
CREATE POLICY "Classificados write"
  ON classificados FOR ALL
  USING (
    morador_id = (
      SELECT id FROM usuarios WHERE auth_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM usuarios
      WHERE auth_id = auth.uid()
        AND role = 'sindico'
    )
  );
```

---

## 5. Helper Functions

### 5.1 Get Current Tenant ID

```sql
-- Helper function for tenant ID
CREATE OR REPLACE FUNCTION current_condominio_id()
RETURNS UUID AS $$
  SELECT condominio_id::uuid
  FROM usuarios
  WHERE auth_id = auth.uid()
  LIMIT 1;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
```

### 5.2 Get Current User Role

```sql
-- Helper function for user role
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS VARCHAR(20) AS $$
  SELECT role
  FROM usuarios
  WHERE auth_id = auth.uid()
  LIMIT 1;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
```

---

## 6. Testing RLS

### 6.1 Test User Setup

```sql
-- Create test users
INSERT INTO auth.users (email, encrypted_password, user_metadata)
VALUES 
  ('sindico@test.com', 'encrypted_hash', '{"condominio_id": "test-condo", "role": "sindico"}'),
  ('porteiro@test.com', 'encrypted_hash', '{"condominio_id": "test-condo", "role": "porteiro"}'),
  ('morador@test.com', 'encrypted_hash', '{"condominio_id": "test-condo", "role": "morador"}');

-- Link to usuarios table (run as admin)
INSERT INTO usuarios (auth_id, condominio_id, unidade_id, email, nome, role, status)
SELECT id, 'test-condo', 'test-unidade', email, split_part(email, '@', 1), 
       (user_metadata->>'role'), 'active'
FROM auth.users;
```

### 6.2 Test Queries

```sql
-- Test 1: Morador can only see their deliveries
SELECT e.* 
FROM entregas e
WHERE e.unidade_id = 'test-unidade';

-- Test 2: Porteiro can see all deliveries in building
SELECT COUNT(*) FROM entregas
WHERE condominio_id = 'test-condo';

-- Test 3: Cross-building blocked
SELECT COUNT(*) FROM entregas
WHERE condominio_id = 'other-condo';  -- Should return 0
```

---

## 7. Common Issues

| Issue | Solution |
|-------|----------|
| Policy blocks superuser | Use SECURITY DEFINER for helper functions |
| Slow queries | Ensure indexes exist on filtered columns |
| Circular dependencies | Use separate USING/WITH CHECK clauses |
| Auth not available | Handle null auth.uid() gracefully |