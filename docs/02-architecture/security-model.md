# Security Model

## 1. Objective

Define the comprehensive security model for CondoMais, establishing authentication flows, authorization patterns, encryption requirements, and compliance measures to protect resident data.

## 2. Scope

This document covers:
- Authentication mechanisms
- Authorization and role-based access control
- Encryption standards
- Audit logging
- Vulnerability protection

---

## 3. Authentication

### 3.1 Authentication Methods

| Method | Use Case | Security Level |
|--------|----------|---------------|
| Google OAuth 2.0 | Resident login | High |
| Email + Password | Fallback | Medium |
| Magic Link | Passwordless | High |
| Session Cookie | Web persistence | Medium |

### 3.2 Google OAuth Flow

```typescript
// auth.service.ts - Google Sign-In
async signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  
  // For web: use popup
  return signInWithPopup(this.auth, provider);
}

// Or for mobile: redirect
async signInWithGoogleRedirect(): Promise<void> {
  const provider = new GoogleAuthProvider();
  setRedirectPersistence(this.auth, browserSessionPersistence);
  await signInWithRedirect(this.auth, provider);
}
```

### 3.3 JWT Token Structure

```typescript
// Token claims interface
interface JWTClaims {
  // Standard JWT claims
  sub: string;              // user_id (uuid)
  iss: string;            // issuer (supabase)
  iat: number;            // issued at
  exp: number;             // expiration
  aud: string;             // audience
  
  // Custom claims
  role: 'morador' | 'porteiro' | 'sindico';
  condominio_id: string;
  unidade_id?: string;
  permissions: string[];
}

// Token payload example
{
  "sub": "a1b2c3d4-...",
  "iss": "https://abc123.supabase.co",
  "role": "morador",
  "condominio_id": "solar-do-vale",
  "unidade_id": "apt-204",
  "exp": 1715628400
}
```

### 3.4 Token Management

```typescript
// auth.service.ts - Token management
class AuthService {
  private tokenKey = 'condomais_auth_token';
  
  async getToken(): Promise<string> {
    const { data: { session } } = await this.supabase.auth.getSession();
    return session?.access_token || null;
  }
  
  async refreshToken(): Promise<void> {
    const { data, error } = await this.supabase.auth.refreshSession();
    if (error) throw error;
  }
  
  // Auto-refresh before expiry
  setupTokenRefresh(): Observable<void> {
    return interval(60000).pipe(
      switchMap(() => this.getToken()),
      filter(token => !!token),
      switchMap(() => this.refreshToken())
    );
  }
}
```

---

## 4. Authorization

### 4.1 Role-Based Access Control (RBAC)

```sql
-- usuarios.roles enum
CREATE TYPE user_role AS ENUM (
  'morador',      -- Resident
  'porteiro',    -- Doorman
  'sindico',     -- Building administrator
  'conselho'     -- Council member (optional)
);

-- Permissions table
CREATE TABLE role_permissions (
  role VARCHAR(20),
  resource VARCHAR(50),
  action VARCHAR(20),
  granted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed permissions
INSERT INTO role_permissions (role, resource, action) VALUES
-- Morador permissions
('morador', 'entregas', 'read'),
('morador', 'entregas', 'read:own'),
('morador', 'avisos', 'read'),
('morador', 'reservas', 'create'),
('morador', 'reservas', 'read:own'),
('morador', 'reservas', 'update:own'),
('morador', 'reservas', 'delete:own'),
('morador', 'classificados', 'create'),
('morador', 'classificados', 'read'),
('morador', 'classificados', 'update:own'),
('morador', 'classificados', 'delete:own'),
('morador', 'whatsapp', 'read'),

-- Porteiro permissions
('porteiro', 'entregas', 'read'),
('porteiro', 'entregas', 'create'),
('porteiro', 'entregas', 'update'),
('porteiro', 'moradores', 'read'),
('porteiro', 'avisos', 'read'),
('porteiro', 'ocorrencias', 'create'),
('porteiro', 'ocorrencias', 'read'),

-- Síndico permissions
('sindico', 'moradores', 'read'),
('sindico', 'moradores', 'create'),
('sindico', 'moradores', 'update'),
('sindico', 'moradores', 'delete'),
('sindico', 'entregas', 'read'),
('sindico', 'entregas', 'read:all'),
('sindico', 'entregas', 'update'),
('sindico', 'avisos', 'create'),
('sindico', 'avisos', 'read'),
('sindico', 'avisos', 'update'),
('sindico', 'avisos', 'delete'),
('sindico', 'reservas', 'read'),
('sindico', 'reservas', 'read:all'),
('sindico', 'reservas', 'update'),
('sindico', 'reservas', 'delete'),
('sindico', 'classificados', 'read'),
('sindico', 'classificados', 'delete'),
('sindico', 'configuracoes', 'read'),
('sindico', 'configuracoes', 'update'),
('sindico', 'relatorios', 'read');
```

### 4.2 Permission Check Service

```typescript
// services/permission.service.ts
@Injectable({ providedIn: 'root' })
export class PermissionService {
  private permissionsCache = new Map<string, string[]>();

  async hasPermission(resource: string, action: string): Promise<boolean> {
    const user = await this.authService.getCurrentUser();
    if (!user) return false;

    const cacheKey = `${user.role}_${resource}_${action}`;
    
    // Check cache first
    if (this.permissionsCache.has(cacheKey)) {
      return true; // Permission granted
    }

    // Check database
    const { data } = await this.supabase
      .from('role_permissions')
      .select('*')
      .eq('role', user.role)
      .eq('resource', resource)
      .eq('action', action)
      .single();

    if (data) {
      this.permissionsCache.set(cacheKey, []);
      return true;
    }

    return false;
  }

  async requirePermission(resource: string, action: string): Promise<void> {
    const hasPermission = await this.hasPermission(resource, action);
    if (!hasPermission) {
      throw new ForbiddenException('Você não tem acesso a esta ação');
    }
  }
}

// Usage in components
async onDeleteEntrega(id: string) {
  await this.permissionService.requirePermission('entregas', 'delete');
  // Perform delete
}
```

---

## 5. Route Guards

### 5.1 Auth Guard

```typescript
// auth.guard.ts
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.isAuthenticated();
  
  if (!isAuthenticated) {
    return router.createUrlTree(['/auth/login']);
  }

  return true;
};
```

### 5.2 Role Guard

```typescript
// role.guard.ts
export const roleGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[];

  if (!requiredRoles?.length) {
    return true;
  }

  const user = await authService.getCurrentUser();
  
  if (!requiredRoles.includes(user?.role)) {
    return router.createUrlTree(['/unauthorized']);
  }

  return true;
};

// Usage in routes
export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['sindico'] },
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];
```

---

## 6. Encryption

### 6.1 Data at Rest

Supabase encrypts all data at rest using AES-256:

```sql
-- Verify encryption (runs automatically)
SELECT 
  datname, 
  datistemplate, 
  datallowconn
FROM pg_database
WHERE datname = current_database();

-- All tables use encrypted storage
-- No additional configuration needed
```

### 6.2 Data in Transit

- TLS 1.3 for all connections
- Certificate validation required

```typescript
// Supabase client enforces TLS
const supabase = createClient(
  'https://[project].supabase.co',
  '[anon-key]',
  {
    auth: {
      // Forces HTTPS
      persistSession: true,
      autoRefreshToken: true
    }
  }
);
```

### 6.3 Sensitive Data Handling

```typescript
// Mask sensitive data in responses
function maskCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '***.$2.$3-**');
}

function maskTelefone(telefone: string): string {
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '(**) *****-****');
}

// In API responses
response.transform.json({
  morador: {
    cpf: maskCPF(morador.cpf),
    telefone: maskTelefone(morador.telefone),
    // Full data only for Síndico
    ...(user.role === 'sindico' ? { cpf: morador.cpf } : {})
  }
});
```

---

## 7. Audit Logging

### 7.1 Audit Table

```sql
-- Create audit log table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- User info
  user_id UUID,
  user_email VARCHAR(255),
  user_role VARCHAR(20),
  
  -- Action info
  action VARCHAR(50),           -- 'create', 'read', 'update', 'delete'
  resource_type VARCHAR(50),     -- 'entrega', 'morador', 'aviso'
  resource_id UUID,
  
  -- Details
  old_values JSONB,
  new_values JSONB,
  changes JSONB,                -- Computed diff
  
  -- Request info
  ip_address INET,
  user_agent TEXT,
  
  -- Context
  condominio_id UUID,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for queries
CREATE INDEX idx_audit_logs_condominio 
  ON audit_logs(condominio_id, created_at DESC);
CREATE INDEX idx_audit_logs_resource 
  ON audit_logs(resource_type, resource_id);
```

### 7.2 Audit Trigger Function

```sql
-- Create trigger function
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
DECLARE
  v_user_id UUID;
  v_user_record RECORD;
BEGIN
  -- Get current user
  BEGIN
    SELECT u.id, u.email, u.role INTO v_user_record
    FROM usuarios u
    WHERE u.auth_id = auth.uid()
    LIMIT 1;
  EXCEPTION WHEN NO_DATA_FOUND THEN
    v_user_record := NULL;
  END;

  -- Get changes
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (
      user_id, user_email, user_role,
      action, resource_type, resource_id,
      new_values, condominio_id
    )
    VALUES (
      v_user_record.id, 
      v_user_record.email,
      v_user_record.role,
      'create',
      TG_TABLE_NAME,
      NEW.id,
      to_jsonb(NEW),
      NEW.condominio_id
    );
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (
      user_id, user_email, user_role,
      action, resource_type, resource_id,
      old_values, new_values, condominio_id
    )
    VALUES (
      v_user_record.id,
      v_user_record.email,
      v_user_record.role,
      'update',
      TG_TABLE_NAME,
      NEW.id,
      to_jsonb(OLD),
      to_jsonb(NEW),
      NEW.condominio_id
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (
      user_id, user_email, user_role,
      action, resource_type, resource_id,
      old_values, condominio_id
    )
    VALUES (
      v_user_record.id,
      v_user_record.email,
      v_user_record.role,
      'delete',
      TG_TABLE_NAME,
      OLD.id,
      to_jsonb(OLD),
      OLD.condominio_id
    );
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables (run for each table)
CREATE TRIGGER audit_moradores
  AFTER INSERT OR UPDATE OR DELETE ON moradores
  FOR EACH ROW EXECUTE FUNCTION audit_trigger();
```

---

## 8. Rate Limiting

### 8.1 Application-Level Rate Limiting

```typescript
// services/rate-limit.service.ts
@Injectable({ providedIn: 'root' })
export class RateLimitService {
  private requestCounts = new Map<string, { count: number; resetAt: number }>();
  
  private limits = {
    // API calls per minute
    default: 60,
    // Delivery registrations per minute ( porteiro)
    deliveryRegistration: 30,
    // Login attempts per 15 minutes
    loginAttempts: 5,
  };

  async checkLimit(key: string, type: string = 'default'): Promise<boolean> {
    const limit = this.limits[type] || this.limits.default;
    const windowMs = 60000; // 1 minute
    const now = Date.now();

    const current = this.requestCounts.get(key);
    
    if (!current || current.resetAt < now) {
      this.requestCounts.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }

    if (current.count >= limit) {
      throw new TooManyRequestsException('Muitas requisições. Tente novamente em instantes.');
    }

    current.count++;
    return true;
  }
}
```

### 8.2 Supabase-Level Protection

```sql
-- Supabase rate limiting function
CREATE OR REPLACE FUNCTION check_api_rate_limit(
  p_user_id UUID,
  p_endpoint TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_attempts INTEGER;
  v_last_attempt TIMESTAMPTZ;
BEGIN
  SELECT COUNT(*), MAX(created_at) 
  INTO v_attempts, v_last_attempt
  FROM api_logs
  WHERE user_id = p_user_id
    AND endpoint = p_endpoint
    AND created_at > NOW() - INTERVAL '1 minute';

  RETURN v_attempts < 60;
END;
$$ LANGUAGE plpgsql;
```

---

## 9. Security Headers

### 9.1 HTTP Security Headers

```typescript
// middleware/security-headers.ts
export function securityHeaders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Prevent XSS
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // MIME sniffing protection
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://*.supabase.co; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co;"
  );
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // HSTS (in production)
  if (process.env.NODE_ENV === 'production') {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
  }
  
  next();
}
```

---

## 10. Vulnerability Protection

### 10.1 SQL Injection Prevention

```typescript
// Always use parameterized queries
// ✓ GOOD
const { data } = await supabase
  .from('moradores')
  .select('*')
  .eq('nome', searchTerm);  // Parameterized

// ✗ BAD - Never use string interpolation
const query = `SELECT * FROM moradores WHERE nome = '${searchTerm}'`;
```

### 10.2 XSS Prevention

```typescript
// Use Angular's default binding (escapes HTML)
// ✓ GOOD
<div>{{ userMessage }}</div>

// ✗ BAD - Use innerHTML only with sanitization
@Inject(DomSanitizer)
sanitize(html: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}
```

### 10.3 CSRF Protection

```typescript
// Supabase handles CSRF via JWT
// Additional check for mutations
async checkCSRF(req: Request): Promise<boolean> {
  const csrfToken = req.headers['x-csrf-token'] as string;
  const sessionToken = await this.authService.getToken();
  
  return csrfToken === sessionToken;
}
```

---

## 11. Compliance

### 11.1 LGPD (Brazilian Data Protection)

```sql
-- User can request their data
CREATE OR REPLACE FUNCTION get_user_data(
  p_user_id UUID
)
RETURNS JSONB AS $$
DECLARE
  v_data JSONB;
BEGIN
  SELECT to_jsonb(u) INTO v_data
  FROM usuarios u
  WHERE u.auth_id = p_user_id;

  RETURN v_data;
END;
$$ LANGUAGE plpgsql;

-- User can delete their data (right to be forgotten)
CREATE OR REPLACE FUNCTION delete_user_data(
  p_user_id UUID
)
RETURNS VOID AS $$
BEGIN
  -- Delete all user data
  DELETE FROM usuarios WHERE auth_id = p_user_id;
  
  -- Delete auth user
  UPDATE auth.users SET email = null, raw_user_meta_data = '{}'
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;
```

### 11.2 Cookie Consent

```typescript
// Cookie consent banner component
@Component({
  selector: 'app-cookie-consent',
  template: `
    <div *ngIf="! consented" class="cookie-banner">
      <p>Este site usa cookies para melhorar sua experiência.</p>
      <button (click)="accept()">Aceitar</button>
      <button (click)="decline()">Recusar</button>
    </div>
  `
})
export class CookieConsentComponent {
  private cookieService = inject(CookieService);

  accept() {
    this.cookieService.set('consent', 'true', 365);
    // Enable analytics
  }

  decline() {
    this.cookieService.set('consent', 'false', 365);
    // Disable analytics
  }
}
```