# Table: usuarios

## 1. Objective

Define the `usuarios` table that stores all user accounts across the platform—residents (moradores), doormen (porteiros), and administrators (síndicos/conselho).

## 2. Scope

This table stores:
- User authentication links (auth.users)
- Demographics (name, phone, email)
- Roles and permissions
- Unit assignments (for residents)
- Condominium associations
- Preferences

---

## 3. Step-by-Step Implementation

### Step 1: Create the Table

```sql
CREATE TABLE usuarios (
  -- Identity
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Supabase Auth Link (REQUIRED)
  auth_id UUID REFERENCES auth.users(id) UNIQUE ON DELETE CASCADE,
  
  -- Tenant (Condominium)
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  
  -- Optional Unit (for residents)
  unidade_id UUID REFERENCES unidades(id),
  
  -- User Information
  email VARCHAR(255) NOT NULL,
  nome VARCHAR(200) NOT NULL,
  telefone VARCHAR(20),
  foto_url TEXT,
  
  -- Role (CRITICAL for permissions)
  role VARCHAR(20) NOT NULL 
    CHECK (role IN (
      'morador',      -- Resident
      'porteiro',     -- Doorman
      'sindico',     -- Building administrator
      'conselho',    -- Building council member
      'admin'       -- Platform admin (superuser)
    )),
  
  -- Account Status
  status VARCHAR(20) DEFAULT 'pending' 
    CHECK (status IN (
      'pending',     -- Awaiting first login
      'active',     -- Active user
      'inactive',   -- Inactive (moved out, fired, etc)
      'blocked'     -- Blocked by admin
    )),
  
  -- Login Methods
  google_id VARCHAR(255),        -- Google OAuth ID
  google_avatar TEXT,            -- Google profile photo
  
  -- Preferences
  preferences JSONB DEFAULT '{
    "notificacoes_push": true,
    "notificacoes_email": true,
    "notificacoes_whatsapp": true,
    "idioma": "pt-BR",
    "tema": "system",
    "tamanho_fonte": "medio"
  }',
  
  -- Accessibility
  accessibility JSONB DEFAULT '{
    "alto_contraste": false,
    "telao": false,
    "leitor_tela": false
  }',
  
  -- Notifications
  push_tokens JSONB DEFAULT '[]',
  fcm_token TEXT,
  
  -- GDPR/LGPD
  accept_terms_at TIMESTAMPTZ,
  accept_privacy_at TIMESTAMPTZ,
  
  -- Last Login Tracking
  last_login_at TIMESTAMPTZ,
  last_login_ip INET,
  login_count INTEGER DEFAULT 0,
  
  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Soft Delete
  deleted_at TIMESTAMPTZ,
  
  -- Constraints
  UNIQUE(condominio_id, email)
);

-- Index for common lookups
CREATE INDEX idx_usuarios_condominio ON usuarios(condominio_id);
CREATE INDEX idx_usuarios_unidade ON usuarios(unidade_id);
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_role ON usuarios(role);
CREATE INDEX idx_usuarios_status ON usuarios(status);
CREATE INDEX idx_usuarios_auth_id ON usuarios(auth_id);
```

### Step 2: Enable RLS

```sql
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
```

### Step 3: Create RLS Policies

```sql
-- Residents can read building users
CREATE POLICY "Users read building users"
  ON usuarios FOR SELECT
  USING (
    condominio_id = (
      SELECT condominio_id FROM usuarios 
      WHERE auth_id = auth.uid()
    )
  );

-- Only Síndico can insert/update other users
CREATE POLICY "Sindico manage users"
  ON usuarios FOR ALL
  USING (
    -- Sindico can manage their building's users
    EXISTS (
      SELECT 1 FROM usuarios u
      WHERE u.auth_id = auth.uid()
        AND u.role = 'sindico'
        AND u.condominio_id = usuarios.condominio_id
    )
    OR
    -- Users can update their own profile
    auth.uid() = auth_id
  );

-- Users can update their own record
CREATE POLICY "Users update own profile"
  ON usuarios FOR UPDATE
  USING (auth.uid() = auth_id);
```

### Step 4: Create Triggers

```sql
-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_usuarios_updated_at
  BEFORE UPDATE ON usuarios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Auto-update login tracking
CREATE OR REPLACE FUNCTION track_login()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.last_login_at IS DISTINCT FROM OLD.last_login_at THEN
    UPDATE usuarios
    SET login_count = login_count + 1,
        last_login_ip = COALESCE(current_setting('app.current_ip', true), '0.0.0.0')::inet
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Step 5: Create Composite Indexes

```sql
-- For tenant+role queries (e.g., all síndicos)
CREATE INDEX idx_usuarios_condominio_role 
  ON usuarios(condominio_id, role);

-- For active users only
CREATE INDEX idx_usuarios_condominio_status 
  ON usuarios(condominio_id, status) 
  WHERE status = 'active';

-- For email lookup within tenant
CREATE INDEX idx_usuarios_condominio_email 
  ON usuarios(condominio_id, email);
```

---

## 4. Technical Details

### 4.1 Sample Data

```sql
INSERT INTO usuarios (
  condominio_id,
  unidade_id,
  email,
  nome,
  telefone,
  role,
  status,
  google_id
)
SELECT 
  c.id,
  u.id,
  'maria.santos@email.com',
  'Maria Santos',
  '(11) 99999-0000',
  'morador',
  'active',
  'google-123456'
FROM condominios c
JOIN unidades u ON u.condominio_id = c.id AND u.numero = '204'
WHERE c.subdomain = 'solar';
```

### 4.2 User Types

```typescript
// Main user interface
interface Usuario {
  id: string;
  auth_id: string;
  condominio_id: string;
  unidade_id?: string;
  email: string;
  nome: string;
  telefone?: string;
  foto_url?: string;
  role: 'morador' | 'porteiro' | 'sindico' | 'conselho';
  status: 'pending' | 'active' | 'inactive' | 'blocked';
  google_id?: string;
  preferences: {
    notificacoes_push: boolean;
    notificacoes_email: boolean;
    notificacoes_whatsapp: boolean;
    idioma: string;
    tema: 'light' | 'dark' | 'system';
    tamanho_fonte: 'pequeno' | 'medio' | 'grande';
  };
  accessibility: {
    alto_contraste: boolean;
    tela_grande: boolean;
    leitor_tela: boolean;
  };
  created_at: string;
  last_login_at?: string;
}
```

### 4.3 API Service Methods

```typescript
// Get current user
async getCurrentUser(): Promise<Usuario> {
  const { data: { user } } = await this.supabase.auth.getUser();
  
  const { data } = await this.supabase
    .from('usuarios')
    .select('*')
    .eq('auth_id', user.id)
    .single();
  
  return data;
}

// Get building residents
async getMoradores(): Promise<Usuario[]> {
  const { data } = await this.supabase
    .from('usuarios')
    .select('*')
    .eq('condominio_id', this.tenantId)
    .eq('role', 'morador')
    .eq('status', 'active')
    .order('nome');
  
  return data || [];
}

// Update user profile
async updateProfile(updates: Partial<Usuario>): Promise<Usuario> {
  const { data, error } = await this.supabase
    .from('usuarios')
    .update(updates)
    .eq('auth_id', this.authService.user.id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
```

---

## 5. Dependencies

| Dependency | Required | Reason |
|-----------|----------|--------|
| auth.users | Yes | Authentication reference |
| condominios | Yes | Tenant association |
| unidades | No | Unit assignment |

---

## 6. Risks and Edge Cases

### 6.1 Risks

| Risk | Mitigation |
|------|-----------|
| Orphan records (auth exists, usuario doesn't) | Trigger cleanup on auth delete |
| Tenant reassignment | Require admin permissions |
| Role escalation | Check role changes in trigger |

### 6.2 Edge Cases

| Edge Case | Handling |
|----------|---------|
| Resident moves out | Set status to 'inactive', clear unidade_id |
| Síndico changes | Transfer permissions carefully |
| Duplicate email in tenant | UNIQUE constraint |
| Google auth unlinked | Allow re-link or password fallback |
| User deleted (GDPR) | Anonymize, don't hard delete |

---

## 7. API Contracts

### 7.1 GET (List Residents)

```http
GET /rest/v1/usuarios?role=eq.morador&status=eq.active&select=id,nome,unidade_id,foto_url,telefone
```

### 7.2 GET (Search)

```http
GET /rest/v1/usuarios?nome=ilike.*maria*&select=id,nome,unidade_id,telefone
```

### 7.3 PATCH (Update Preferences)

```http
PATCH /rest/v1/usuarios?id=eq.uuid
Content-Type: application/json

{
  "preferences": {
    "notificacoes_push": true,
    "tema": "dark"
  }
}
```

### 7.4 Row JSON

```sql
{
  id: uuid,
  auth_id: uuid,
  condominio_id: uuid,
  unidade_id: uuid,
  email: string,
  nome: string,
  telefone: string,
  foto_url: string,
  role: string,
  status: string,
  google_id: string,
  preferences: jsonb,
  accessibility: jsonb,
  accept_terms_at: timestamptz,
  last_login_at: timestamptz,
  login_count: integer,
  created_at: timestamptz,
  updated_at: timestamptz
}
```