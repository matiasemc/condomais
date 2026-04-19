# SQL Helper Functions

## 1. Objective

Define helper SQL functions for the membership-based multi-tenant architecture, enabling consistent tenant context retrieval across all data operations.

## 2. Scope

This document covers:
- Membership verification functions
- Role checking functions
- Tenant context retrieval
- Audit helpers

---

## 3. Authentication Context Functions

### 3.1 Get Current User ID

```sql
-- Returns the authenticated user's UUID
CREATE OR REPLACE FUNCTION auth.current_user_id()
RETURNS UUID AS $$
BEGIN
  RETURN auth.uid()::uuid;
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

### 3.2 Get Current User Email

```sql
-- Returns the authenticated user's email
CREATE OR REPLACE FUNCTION auth.current_user_email()
RETURNS TEXT AS $$
  SELECT raw_user_meta_data->>'email'
  FROM auth.users
  WHERE id = auth.uid()
  LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;
```

---

## 4. Membership Verification Functions

### 4.1 Check if User is Member

```sql
-- Check if user has active membership in condominio
-- Returns true/false
CREATE OR REPLACE FUNCTION public.is_member(p_condominio_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_is_member BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM user_condominios uc
    WHERE uc.user_id = auth.uid()::uuid
      AND uc.condominio_id = p_condominio_id
      AND uc.status = 'active'
  ) INTO v_is_member;
  
  RETURN v_is_member;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

### 4.2 Check if User is Active Member

```sql
-- More explicit version
CREATE OR REPLACE FUNCTION public.is_active_member(
  p_user_id UUID,
  p_condominio_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_result BOOLEAN;
BEGIN
  SELECT COUNT(*) > 0 INTO v_result
  FROM user_condominios
  WHERE user_id = p_user_id
    AND condominio_id = p_condominio_id
    AND status = 'active';
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

---

## 5. Role Verification Functions

### 5.1 Get User's Role in Condominio

```sql
-- Returns the role string for user in specified condominio
CREATE OR REPLACE FUNCTION public.get_user_role(p_condominio_id UUID)
RETURNS VARCHAR(20) AS $$
DECLARE
  v_role VARCHAR(20);
BEGIN
  SELECT uc.role INTO v_role
  FROM user_condominios uc
  WHERE uc.user_id = auth.uid()::uuid
    AND uc.condominio_id = p_condominio_id
    AND uc.status = 'active'
  LIMIT 1;
  
  RETURN v_role;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

### 5.2 Check if User has Specific Role

```sql
-- Check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(
  p_condominio_id UUID,
  p_role VARCHAR(20)
)
RETURNS BOOLEAN AS $$
DECLARE
  v_has_role BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM user_condominios uc
    WHERE uc.user_id = auth.uid()::uuid
      AND uc.condominio_id = p_condominio_id
      AND uc.role = p_role
      AND uc.status = 'active'
  ) INTO v_has_role;
  
  RETURN v_has_role;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

### 5.3 Check Multiple Roles

```sql
-- Check if user has any of the specified roles
CREATE OR REPLACE FUNCTION public.has_any_role(
  p_condominio_id UUID,
  p_roles VARCHAR[]
)
RETURNS BOOLEAN AS $$
DECLARE
  v_has_role BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM user_condominios uc
    WHERE uc.user_id = auth.uid()::uuid
      AND uc.condominio_id = p_condominio_id
      AND uc.role = ANY(p_roles)
      AND uc.status = 'active'
  ) INTO v_has_role;
  
  RETURN v_has_role;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

---

## 6. Tenant Context Functions

### 6.1 Get Current Condominio ID

```sql
-- Get user's current (or first active) condominio_id
-- Note: This should be set by the application and stored in app.current_condominio_id setting
CREATE OR REPLACE FUNCTION public.current_condominio_id()
RETURNS UUID AS $$
  -- This uses the app.settings which should be set after tenant selection
  SELECT NULL::uuid;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Better: Application sets this via PostgreSQL setting
-- For now, use the first active membership
CREATE OR REPLACE FUNCTION public.get_first_condominio_id()
RETURNS UUID AS $$
DECLARE
  v_condominio_id UUID;
BEGIN
  SELECT uc.condominio_id INTO v_condominio_id
  FROM user_condominios uc
  WHERE uc.user_id = auth.uid()::uuid
    AND uc.status = 'active'
  ORDER BY uc.joined_at
  LIMIT 1;
  
  RETURN v_condominio_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

---

## 7. MASTER_ADMIN Functions

### 7.1 Check if MASTER_ADMIN

```sql
-- Check if user has master_admin role anywhere
CREATE OR REPLACE FUNCTION public.is_master_admin()
RETURNS BOOLEAN AS $$
DECLARE
  v_is_admin BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM user_condominios uc
    WHERE uc.user_id = auth.uid()::uuid
      AND uc.role = 'master_admin'
      AND uc.status = 'active'
  ) INTO v_is_admin;
  
  RETURN v_is_admin;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

### 7.2 Check if Can Access All Data

```sql
-- MASTER_ADMIN can see all data, others need membership
CREATE OR REPLACE FUNCTION public.can_access_all_condominios()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.is_master_admin();
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

---

## 8. Combined Validation Functions

### 8.1 Validate Membership for Query

```sql
-- Use in RLS policies to ensure membership
CREATE OR REPLACE FUNCTION public.validate_membership()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.is_master_admin() OR (
    SELECT COUNT(*) > 0
    FROM user_condominios uc
    WHERE uc.user_id = auth.uid()::uuid
      AND uc.status = 'active'
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

### 8.2 Get Effective Condominio ID

```sql
-- Get effective condominio_id for operations
-- Prefers current_tenant setting if available, otherwise first membership
CREATE OR REPLACE FUNCTION public.effective_condominio_id()
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  -- Try to get from current_setting (set after tenant selection)
  v_id := current_setting('app.current_condominio_id', TRUE)::uuid;
  
  IF v_id IS NULL THEN
    -- Fallback to first membership
    v_id := public.get_first_condominio_id();
  END IF;
  
  RETURN v_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

---

## 9. User Enumeration Functions

### 9.1 Get User's All Memberships

```sql
-- Returns all active memberships for the current user
CREATE OR REPLACE FUNCTION public.get_my_memberships()
RETURNS TABLE (
  condominio_id UUID,
  condominio_nome VARCHAR(200),
  condominio_subdomain VARCHAR(50),
  role VARCHAR(20),
  status VARCHAR(20)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.nome,
    c.subdomain,
    uc.role,
    uc.status
  FROM user_condominios uc
  JOIN condominios c ON c.id = uc.condominio_id
  WHERE uc.user_id = auth.uid()::uuid
    AND uc.status = 'active'
  ORDER BY c.nome;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

### 9.2 Get Condominio's Members

```sql
-- Returns all members of a condominio (admin function)
CREATE OR REPLACE FUNCTION public.get_condominio_members(p_condominio_id UUID)
RETURNS TABLE (
  user_id UUID,
  user_email TEXT,
  user_nome VARCHAR(200),
  role VARCHAR(20),
  status VARCHAR(20),
  joined_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.email,
    u.nome,
    uc.role,
    uc.status,
    uc.joined_at
  FROM user_condominios uc
  JOIN users u ON u.id = uc.user_id
  WHERE uc.condominio_id = p_condominio_id
    AND uc.status != 'inactive'
  ORDER BY uc.role, u.nome;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

---

## 10. Implementation in RLS

### 10.1 Using Helpers in Policies

```sql
-- Example RLS policy using helper functions
CREATE POLICY "Entregas access" ON entregas FOR ALL
USING (
  -- MASTER_ADMIN can see all
  public.is_master_admin()
  OR
  -- Active member can access their condominio's data
  (
    condominio_id = public.effective_condominio_id()
    AND public.is_member(condominio_id)
  )
);

-- Alternative using app.current_condominio_id
CREATE POLICY "Entregas select" ON entregas FOR SELECT
USING (
  public.is_master_admin()
  OR
  EXISTS (
    SELECT 1 FROM user_condominios uc
    WHERE uc.user_id = auth.uid()::uuid
      AND uc.condominio_id = entregas.condominio_id
      AND uc.status = 'active'
  )
);
```

---

## 11. Application Usage

### 11.1 Setting Tenant Context (Application)

```typescript
// After user selects a condominio:
async function selectCondominio(condominioId: string) {
  // Store in app state
  this.tenantService.setCurrent(condominioId);
  
  // Optionally set in PostgreSQL session
  await supabase.rpc('set_current_condominio', { 
    p_condominio_id: condominioId 
  });
}

// Note: set_current_condominio function would set app.current_condominio_id
```

### 11.2 Checking Access

```typescript
// Before any data operation:
async function requireMembership(condominioId: string) {
  const isMember = await supabase.rpc('is_member', { 
    p_condominio_id: condominioId 
  });
  
  if (!isMember) {
    throw new Error('Access denied');
  }
}

// Check role
async function requireRole(condominioId: string, requiredRole: string) {
  const hasRole = await supabase.rpc('has_role', {
    p_condominio_id: condominioId,
    p_role: requiredRole
  });
  
  if (!hasRole) {
    throw new Error('Insufficient permissions');
  }
}
```

---

## 12. Related Files

- `tables-membership.md`: user_condominios table definition
- `rls-policies.md`: RLS policies using these helpers
- `tenant-selection.md`: Frontend tenant selection
- `role-resolution.md`: Frontend role resolution