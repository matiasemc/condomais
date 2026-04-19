# Multi-Tenant Architecture

## 1. Objective

Define the architectural approach for multi-tenancy in CondoMais, establishing how users, condominiums, and roles interact within a membership-based system.

## 2. Scope

### 2.1 What is Multi-Tenant Architecture (This Document)

This document outlines:
- User global existence vs. tenant membership
- Role assignment per tenant
- Data access patterns
- Tenant isolation strategy

### 2.2 What is NOT Multi-Tenancy

This document does NOT cover:
- Subscription/billing (outside MVP)
- Multi-tenant cost allocation
- Tenant-specific custom code
- Resource quotas per tenant

---

## 3. The Multi-Tenant Model

### 3.1 Entity Definitions

```
┌─────────────────────────────────────────────────────────────┐
│                    GLOBAL ENTITIES                        │
├──────────────────────────────────────────────────────┤
│  USERS                                              │
│  - Exists globally                                    │
│  - Can login to ANY condominium they belong to           │
│  - Has ONE identity across the platform                 │
│  - Has ONE global profile (name, email, phone)          │
└────────────────────────────────────────────────────┘
                │
                │ (many-to-many with role per membership)
                ▼
┌────────────────────────────────────────────────────────────┐
│                    MEMBERSHIP                         │
├──────────────────────────────────────────────────────┤
│  USER_CONDOMINIOS                                    │
│  - Links user to condominium                         │
│  - Contains role WITHIN that condominium            │
│  - Can have different roles in different condos    │
└────────────────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────────────────────┐
│                    TENANTS                            │
├──────────────────────────────────────────────────────┤
│  CONDOMINIOS                                          │
│  - The tenant (building/community)                    │
│  - Has its own data: deliveries, announcements        │
│  - Independent from other condominiums              │
└────────────────────────────────────────────────────┘
```

---

## 4. Data Model Implementation

### 4.1 ERD (Conceptual)

```
┌───────────────────┐
│       USERS       │ ◄── GLOBAL (no condominio_id)
├───────────────────┤
│ id (PK)          │
│ email            │
│ nome             │
│ telefone         │
│ foto_url         │
│ google_id        │
│ created_at       │
└───────────────────┘
       │
       │ 1:N
       ▼
┌───────────────────────┐
│ USER_CONDOMINIOS   │ ◄── MEMBERSHIP (junction table)
├───────────────────────┤
│ user_id (FK)      │
│ condominio_id (FK)│
│ role              │ ◄─ SINDICO, MORADOR, PORTEIRO, CONSELHO
│ status           │
│ joined_at        │
│ PRIMARY KEY (user_id, condominio_id) │
└───────────────────────┘
       │
       │ N:1
       ▼
┌───────────────────┐
│   CONDOMINIOS    │ ◄── TENANT
├───────────────────┤
│ id (PK)         │
│ cnpj            │
│ nome            │
│ subdomain       │
│ settings       │
│ created_at      │
└───────────────────┘
       │
       │ 1:N
       ▼
┌───────────────────┐
│ DATA TABLES     │ ◄── TENANT DATA
├───────────────────┤
│ entregas        │
│ avisos         │
│ reservas      │
│ ocorrencias   │
│ classificados │
└───────────────────┘
```

### 4.2 SQL Schema for Membership

```sql
-- USERS: Global table (no condominio_id)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  telefone VARCHAR(20),
  foto_url TEXT,
  google_id VARCHAR(255) UNIQUE,
  accept_terms_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONDOMINIOS: Tenants (independent buildings)
CREATE TABLE condominios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cnpj VARCHAR(20) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  nome_fantasia VARCHAR(100),
  subdomain VARCHAR(50) UNIQUE,
  telefone VARCHAR(20),
  whatsapp VARCHAR(20),
  email VARCHAR(255),
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- USER_CONDOMINIOS: Membership with role
CREATE TABLE user_condominios (
  user_id UUID REFERENCES users(id) NOT NULL,
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  
  -- Role granted FOR THIS SPECIFIC CONDOMINIO
  role VARCHAR(20) NOT NULL 
    CHECK (role IN ('sindico', 'morador', 'porteiro', 'conselho', 'master_admin')),
  
  status VARCHAR(20) DEFAULT 'active'
    CHECK (status IN ('pending', 'active', 'inactive')),
  
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  
  PRIMARY KEY (user_id, condominio_id)
);

-- DATA TABLES reference condominio_id only (NOT user_id for ownership)
CREATE TABLE entregas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  unidade VARCHAR(20) NOT NULL,
  porteiro_id UUID REFERENCES users(id),
  transportadora VARCHAR(100),
  codigo_rastreamento VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pendente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. Role Resolution Flow

### 5.1 How Roles Work (NOT Global)

```
User: João Silva
Email: joao@email.com

USER_CONDOMINIOS:
┌────────────────────────────────────────────┐
│ condominio_id  │ role      │ status        │
├──────────────��─────────────────────────────┤
│ condo-alpha   │ sindico  │ active       │  ← João is ADMIN of Alpha
│ condo-beta   │ morador  │ active       │  ← João is RESIDENT of Beta
│ condo-gamma │ morador  │ inactive     │  ← João was RESIDENT of Gamma (moved)
└────────────────────────────────────────────┘

Access Logic:
- Login as João → Show all memberships
- Select condo (tenant) → Load that tenant context
- Role = role FOR that tenant
```

### 5.2 Role Context in Application

```typescript
// At login, user's JWT contains memberships
// But actual role is determined by SELECTED tenant

// After login, user selects which condominium to use
// Then role is resolved for that specific condominium

JWT Payload:
{
  "sub": "user-uuid",
  "email": "joao@email.com",
  "memberships": [
    { "condominio_id": "condo-alpha", "role": "sindico" },
    { "condominio_id": "condo-beta", "role": "morador" }
  ],
  // At runtime, AFTER tenant selection:
  "current_condominio_id": "condo-alpha",
  "current_role": "sindico"
}
```

---

## 6. Data Access Patterns

### 6.1 Access All of One Tenant's Data

```typescript
// WRONG: Try to access ALL data
const { data } = await supabase.from('entregas').select('*');

// CORRECT: Filter by tenant AND ensure membership
async function getEntregas() {
  const user = await authService.getCurrentUser();
  
  // Get user's CURRENT tenant
  const currentCondo = await getSelectedCondominio(); // From app state
  
  // Verify membership
  const { data: membership } = await supabase
    .from('user_condominios')
    .select('role')
    .eq('user_id', user.id)
    .eq('condominio_id', currentCondo.id)
    .single();
  
  if (!membership) throw new Error('Not a member');
  
  return supabase
    .from('entregas')
    .select('*')
    .eq('condominio_id', currentCondo.id); // RLS provides additional security
}
```

### 6.2 Data Isolation Rule

**EVERY query for tenant data MUST include:**
1. User has ACTIVE membership in that condominium
2. Query filters by `condominio_id`

```sql
-- RLS POLICY (simplified)
CREATE POLICY "Tenant data access" ON entregas FOR ALL
USING (
  condominio_id IN (
    SELECT uc.condominio_id 
    FROM user_condominios uc
    WHERE uc.user_id = auth.uid()
      AND uc.status = 'active'
  )
);
```

---

## 7. MASTER_ADMIN Special Case

### 7.1 The Global Role

MASTER_ADMIN:
- Global role (not per-tenant)
- Can access ALL condominiums
- Can manage users and tenants
- Has superuser privileges

```sql
-- Master admin has special membership
INSERT INTO user_condominios (user_id, condominio_id, role, status)
VALUES ('master-admin-user-id', NULL, 'master_admin', 'active');
-- Note: condominio_id can be NULL for master_admin
-- OR use a special system condo

-- In application, MASTER_ADMIN sees:
- All condominiums
- All users (global)
- All data (cross-tenant with filters)
```

---

## 8. Implementation Checklist

### 8.1 Backend (Supabase)

- [ ] Create USERS table (global, no condominio_id)
- [ ] Create CONDOMINIOS table (tenant)
- [ ] Create USER_CONDOMINIOS table (membership)
- [ ] Create data tables (entregas, avisos, etc.) with REFERENCES to condominios
- [ ] Enable RLS on all tables
- [ ] Create helper functions: `is_member()`, `has_role()`, `current_condominio_id()`

### 8.2 Frontend (Angular)

- [ ] At login: Fetch all memberships
- [ ] Store memberships in state
- [ ] After login: Require tenant SELECTION in UI
- [ ] Store current_condominio_id in state
- [ ] Include current_condominio_id in ALL queries
- [ ] Update guards to check membership

---

## 9. Common Patterns

### 9.1 User Can Belong to Multiple Condominiums

```sql
-- User João lives in one condo (morador), manages another (sindico)
SELECT u.nome, c.nome, uc.role
FROM users u
JOIN user_condominios uc ON uc.user_id = u.id
JOIN condominios c ON c.id = uc.condominio_id
WHERE u.email = 'joao@email.com'
AND uc.status = 'active';

-- Result:
-- João Silva | Condomínio Alpha | sindico
-- João Silva | Condomínio Beta  | morador
```

### 9.2 Same Email Can Have Multiple Memberships

```sql
-- This is the CORRECT pattern
-- The join is many-to-many
-- email is NOT unique per condominio
-- The USER entity is global
```

---

## 10. Anti-Patterns to Avoid

### 10.1 DON'T Create Per-Tenant User Records

```sql
-- WRONG: Users tied to one condominium
CREATE TABLE users (
  id UUID PRIMARY KEY,
  condominio_id REFERENCES condominios(id), -- BAD: ties user to ONE condo
  ...
);
```

### 10.2 DON'T Store Role Globally

```sql
-- WRONG: Role on user table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  role VARCHAR(20), -- Global role -- BAD!
  ...
);
```

### 10.3 DON'T Duplicate User Per Condominium

```sql
-- WRONG: Same email creates multiple user records
-- user_id IS the global identifier
-- Join through user_condominios
```

---

## 11. Migration from Previous Model

If implementing this FROM SCRATCH:
- Create new tables as shown above
- Data migration: none needed (fresh implementation)

If migrating from previous (user tied to one condo):
- Create user_condominios records from existing users
- Move global data to users table
- Keep tenant-specific data in current tables

---

## 12. Related Files

- `tables-users.md`: Detailed user table spec
- `tables-condominios.md`: Detailed tenant table spec
- `tables-membership.md`: Detailed membership table spec
- `helper-functions.md`: SQL helper functions
- `tenant-selection.md`: Frontend tenant selection flow