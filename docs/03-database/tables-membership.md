# Table: user_condominios (Membership)

## 1. Objective

Define the `user_condominios` junction table that implements the many-to-many relationship between global users and tenant condominiums, with role assignment per membership.

## 2. Scope

This table stores:
- User's membership in a condominium
- Role granted for THIS specific condominium
- Membership status
- Join timestamp

---

## 3. Why This Table Exists

In CondoMais:
- Users are GLOBAL (one record, can access multiple condominiums)
- Condominiums are TENANTS (each has isolated data)
- This table bridges them with role assignment

```
Users (global)
    │
    │ 1:N
    ▼
user_condominios ◄─── THIS TABLE
    │
    │ N:1
    ▼
Condominios (tenants)
```

---

## 4. Step-by-Step Implementation

### Step 1: Create the Table

```sql
CREATE TABLE user_condominios (
  -- Composite Primary Key (not auto-generated UUID)
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  condominio_id UUID REFERENCES condominios(id) ON DELETE CASCADE NOT NULL,
  
  -- Role granted FOR THIS SPECIFIC CONDOMINIO
  -- This is NOT global - same user can have different roles in different condos
  role VARCHAR(20) NOT NULL 
    CHECK (role IN (
      'sindico',      -- Building administrator
      'morador',      -- Resident  
      'porteiro',     -- Doorman
      'conselho',     -- Council member
      'master_admin'  -- Platform superuser (optional)
    )),
  
  -- Membership status
  status VARCHAR(20) DEFAULT 'active'
    CHECK (status IN (
      'pending',    -- Invited, not yet accepted
      'active',     -- Active member
      'inactive',   -- Former member (moved out, fired, etc)
      'suspended'   -- Temporarily suspended
    )),
  
  -- Invitation/join tracking
  invited_by UUID REFERENCES users(id),
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ,
  
  -- Additional metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Composite unique constraint (user + condominio)
  PRIMARY KEY (user_id, condominio_id)
);

-- Indexes for common queries
CREATE INDEX idx_user_condominios_user ON user_condominios(user_id);
CREATE INDEX idx_user_condominios_condominio ON user_condominios(condominio_id);
CREATE INDEX idx_user_condominios_status ON user_condominios(status);
CREATE INDEX idx_user_condominios_role ON user_condominios(role);
CREATE INDEX idx_user_condominios_active 
  ON user_condominios(user_id, status) 
  WHERE status = 'active';
```

### Step 2: Enable RLS

```sql
ALTER TABLE user_condominios ENABLE ROW LEVEL SECURITY;
```

### Step 3: Create RLS Policies

```sql
-- Users can read their own memberships
CREATE POLICY "Users read own memberships"
  ON user_condominios FOR SELECT
  USING (user_id = auth.uid());

-- Users can read their active memberships (for tenant selection)
CREATE POLICY "Users read active memberships"
  ON user_condominios FOR SELECT
  USING (
    user_id = auth.uid() 
    AND status = 'active'
  );

-- MASTER_ADMIN can manage all memberships
CREATE POLICY "Master admin manage memberships"
  ON user_condominios FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_condominios uc
      WHERE uc.user_id = auth.uid()
        AND uc.role = 'master_admin'
        AND uc.status = 'active'
    )
  );

-- SINDICO can manage memberships in their condominio
CREATE POLICY "Sindico manage memberships"
  ON user_condominios FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_condominios uc
      WHERE uc.user_id = auth.uid()
        AND uc.role = 'sindico'
        AND uc.condominio_id = user_condominios.condominio_id
        AND uc.status = 'active'
    )
  );
```

### Step 4: Create Helper Functions

```sql
-- Get user's role for a specific condominio
CREATE OR REPLACE FUNCTION get_user_role(
  p_user_id UUID,
  p_condominio_id UUID
)
RETURNS VARCHAR(20) AS $$
DECLARE
  v_role VARCHAR(20);
BEGIN
  SELECT uc.role INTO v_role
  FROM user_condominios uc
  WHERE uc.user_id = p_user_id
    AND uc.condominio_id = p_condominio_id
    AND uc.status = 'active';
  
  RETURN v_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Check if user is member of condominio
CREATE OR REPLACE FUNCTION is_member(
  p_user_id UUID,
  p_condominio_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_exists BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM user_condominios uc
    WHERE uc.user_id = p_user_id
      AND uc.condominio_id = p_condominio_id
      AND uc.status = 'active'
  ) INTO v_exists;
  
  RETURN v_exists;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Get user's active memberships
CREATE OR REPLACE FUNCTION get_user_memberships(p_user_id UUID)
RETURNS TABLE (
  condominio_id UUID,
  condominio_nome VARCHAR(200),
  role VARCHAR(20),
  status VARCHAR(20)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.nome,
    uc.role,
    uc.status
  FROM user_condominios uc
  JOIN condominios c ON c.id = uc.condominio_id
  WHERE uc.user_id = p_user_id
    AND uc.status = 'active'
  ORDER BY c.nome;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 5. Technical Details

### 5.1 Sample Data

```sql
-- User João Silva (global user)
-- Belongs to Condomínio Alpha as SINDICO
-- Belongs to Condomínio Beta as MORADOR

-- First, create the user
INSERT INTO users (id, email, nome, telefone)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'joao@email.com', 'João Silva', '+5511999999999');

-- Membership 1: Sindico in Alpha
INSERT INTO user_condominios (user_id, condominio_id, role, status, joined_at)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'aaaa0000-aaaa-0000-aaaa-0000aaaa0000',  -- Alpha condo ID
    'sindico',
    'active',
    NOW()
  );

-- Membership 2: Morador in Beta
INSERT INTO user_condominios (user_id, condominio_id, role, status, joined_at)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'bbbb0000-bbbb-0000-bbbb-0000bbbb0000',  -- Beta condo ID
    'morador',
    'active',
    NOW()
  );
```

### 5.2 Queries

```typescript
// Get all memberships for current user
async function getMyMemberships(): Promise<Membership[]> {
  const { data, error } = await supabase
    .from('user_condominios')
    .select(`
      *,
      condominio:condominios(id, nome, subdomain, logo_url)
    `)
    .eq('user_id', currentUser.id)
    .eq('status', 'active');
  
  return data || [];
}

// Get user's role for specific condominio
async function getMyRole(condominioId: string): Promise<string> {
  const { data, error } = await supabase
    .from('user_condominios')
    .select('role')
    .eq('user_id', currentUser.id)
    .eq('condominio_id', condominioId)
    .single();
  
  return data?.role;
}

// Add member to condominio (sindico action)
async function addMember(
  condominioId: string, 
  userEmail: string, 
  role: string
): Promise<void> {
  // Find user by email (must exist globally)
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', userEmail)
    .single();
  
  if (!user) throw new Error('User not found');
  
  // Add membership
  await supabase
    .from('user_condominios')
    .insert({
      user_id: user.id,
      condominio_id: condominioId,
      role: role,
      status: 'active',
      joined_at: new Date().toISOString()
    });
}
```

---

## 6. Access Control Logic

### 6.1 At Login

```typescript
// 1. User logs in (via Google or email)
// 2. Fetch all memberships
const memberships = await getMyMemberships();

// 3. If 0 memberships → redirect to "no access" or "request access"
// 4. If 1 membership → auto-select that condominio
// 5. If multiple → show tenant selector UI
```

### 6.2 Role Resolution

```typescript
// After tenant is selected:
async function getCurrentRole(condominioId: string): Promise<string> {
  const role = await getMyRole(condominioId);
  
  // Use role to determine:
  // - What UI to show
  // - What data to access
  // - What actions are allowed
  
  return role;
}
```

---

## 7. State Management

### 7.1 Store Memberships

```typescript
// Auth state after login
interface AuthState {
  user: User;
  memberships: Membership[];
  selectedCondominioId: string | null;
  currentRole: string | null;  // derived from selectedCondominioId
}
```

---

## 8. Common Patterns

### 8.1 User Moving Between Condominios

```sql
-- User moving from Condo A to Condo B
-- 1. Mark old membership as inactive
UPDATE user_condominios
SET status = 'inactive', updated_at = NOW()
WHERE user_id = 'user-id' AND condominio_id = 'old-condo-id';

-- 2. Create new membership (or activate existing)
INSERT INTO user_condominios ...
```

### 8.2 Changing User Role

```sql
-- Promote morador to sindico
UPDATE user_condominios
SET role = 'sindico', updated_at = NOW()
WHERE user_id = 'user-id' AND condominio_id = 'condo-id';
```

### 8.3 Removing User from Condominio

```sql
-- Don't delete - mark as inactive (audit trail)
UPDATE user_condominios
SET status = 'inactive', updated_at = NOW()
WHERE user_id = 'user-id' AND condominio_id = 'condo-id';
```

---

## 9. Dependencies

| Dependency | Required | Reason |
|-----------|----------|--------|
| users | Yes | Foreign key to global user |
| condominios | Yes | Foreign key to tenant |
| RLS | Yes | Security |

---

## 10. Risks and Edge Cases

### 10.1 Risks

| Risk | Mitigation |
|------|-----------|
| User without memberships | Handle gracefully, show "no access" |
| Membership not found | Return 403, don't expose data |
| Multiple SINDICO roles | Allow multiple, all have admin rights |

### 10.2 Edge Cases

| Edge Case | Handling |
|----------|---------|
| User deleted globally | CASCADE deletes memberships |
| Condominio deleted | CASCADE deletes memberships |
| Same email in multiple condos | Normal - same user can have multiple memberships |
| Invite pending user | Show "pending invitation" status |

---

## 11. API Contracts

### 11.1 GET My Memberships

```http
GET /rest/v1/user_condominios?user_id=eq.{user_id}&status=eq.active&select=*,condominio:condominios(*)
```

Response:
```json
[
  {
    "user_id": "11111111-1111-1111-1111-111111111111",
    "condominio_id": "aaaa0000-aaaa-0000-aaaa-0000aaaa0000",
    "role": "sindico",
    "status": "active",
    "joined_at": "2024-01-15T10:00:00Z",
    "condominio": {
      "nome": "Condomínio Alpha",
      "subdomain": "alpha"
    }
  }
]
```

### 11.2 POST (Add Membership)

```http
POST /rest/v1/user_condominios
Content-Type: application/json

{
  "user_id": "11111111-1111-1111-1111-111111111111",
  "condominio_id": "aaaa0000-aaaa-0000-aaaa-0000aaaa0000",
  "role": "morador",
  "status": "active"
}
```

### 11.3 PATCH (Update Role)

```http
PATCH /rest/v1/user_condominios?user_id=eq.{user_id}&condominio_id=eq.{condominio_id}
Content-Type: application/json

{
  "role": "sindico"
}
```

---

## 12. Related Files

- `tables-users.md`: Global user table
- `tables-condominios.md`: Tenant table
- `helper-functions.md`: is_member(), get_user_role()
- `tenant-selection.md`: Frontend tenant selector
- `role-resolution.md`: Role resolution logic