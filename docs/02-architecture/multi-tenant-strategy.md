# Multi-Tenant Strategy

## 1. Objective

Define the multi-tenant architecture strategy for CondoMais, establishing isolation patterns, tenant context enforcement, and resource allocation mechanisms that enable a single Supabase instance to serve multiple condominium buildings.

## 2. Scope

This document covers:
- Tenant identification and context
- Data isolation strategies
- Tenant-specific configurations
- Cross-tenant query prevention
- Tenant quotas and limits

---

## 3. Tenant Model

### 3.1 Tenant Hierarchy

```
┌─────────────────────────────────────────────────────┐
│              SUPER-ADMIN (SaaS Owner)               │
│    Manages: Platform, Billing, All Condominiums   │
└─────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────┐
│              CONDOMÍNIO (Tenant)                    │
│    Edifício Solar do Vale (120 units)               │
│    - Unique Subdomain                             │
│    - Isolated Data                                │
│    - Custom Branding                              │
│    - Tenant-specific settings                    │
└─────────────────────────────────────────────────────┘
          │
    ┌─────┼─────┬──────────┐
    ▼     ▼     ▼          ▼
┌──────┬──────┬──────┐  ┌─────────┐
│ UNIT │ UNIT │ UNIT │  │ PORTEIRO│
│ 101  │ 102  │ 103 │  │ DESK   │
└──────┴──────┴──────┘  └─────────┘
```

### 3.2 Tenant Identification

Every request includes tenant context:

```typescript
// JWT Token claims
interface TenantContext {
  sub: string;              // User ID
  condominio_id: string;    // Tenant ID (CRITICAL)
  role: string;             // User role
  unidade_id?: string;       // Unit ID (for residents)
}

// Example JWT payload
{
  "sub": "user-uuid-123",
  "condominio_id": "condominio-solar",
  "role": "morador",
  "unidade_id": "unidade-204",
  "exp": 1715628400
}
```

---

## 4. Data Isolation Strategies

### 4.1 Row-Level Security (Primary)

RLS is the **first line of defense** for tenant isolation:

```sql
-- STEP 1: Enable RLS on all tenant data tables
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE entregas ENABLE ROW LEVEL SECURITY;
ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE classificados ENABLE ROW LEVEL SECURITY;
ALTER TABLE unidades ENABLE ROW LEVEL SECURITY;

-- STEP 2: Create tenant isolation policy
CREATE POLICY "Tenant isolation usuarios"
  ON usuarios FOR ALL
  USING (
    condominio_id::text = (
      SELECT condominio_id::text 
      FROM usuarios 
      WHERE auth_id = auth.uid()
    )
  )
  WITH CHECK (
    condominio_id::text = (
      SELECT condominio_id::text 
      FROM usuarios 
      WHERE auth_id = auth.uid()
    )
  );

-- STEP 3: Same for all other tables
CREATE POLICY "Tenant isolation entregas"
  ON entregas FOR ALL
  USING (
    condominio_id = (
      SELECT condominio_id 
      FROM usuarios 
      WHERE auth_id = auth.uid()
    )
  );
```

### 4.2 Application-Level Enforcement

RLS alone is **not sufficient** — must enforce in application:

```typescript
// shared/services/tenant.service.ts
@Injectable({ providedIn: 'root' })
export class TenantService {
  private cache = new Map<string, unknown>();

  getCurrentTenant(): Tenant {
    const tenantId = this.getTenantIdFromToken();
    if (!tenantId) throw new Error('No tenant context');
    
    return {
      id: tenantId,
      name: this.cache.get(`tenant_${tenantId}`) as string
    };
  }

  private getTenantIdFromToken(): string {
    const claims = this.authService.getTokenClaims();
    return claims?.condominio_id;
  }

  // Enforce tenant filter on all Supabase queries
  withTenantFilter<T>(builder: SupabaseQueryBuilder): SupabaseQueryBuilder {
    const tenantId = this.getTenantIdFromToken();
    return builder.eq('condominio_id', tenantId);
  }
}

// Usage in services
async getDeliveries(): Promise<Entrega[]> {
  const tenantId = this.tenantService.getCurrentTenant().id;
  const { data } = await this.supabase
    .from('entregas')
    .select('*')
    .eq('condominio_id', tenantId) // MANDATORY filter
    .order('created_at', { ascending: false });
  
  return data || [];
}
```

### 4.3 Database Function Isolation

Wrap queries in functions that enforce tenant context:

```sql
-- STEP: Create helper function
CREATE OR REPLACE FUNCTION auth.current_condominio_id()
RETURNS UUID AS $$
  SELECT condominio_id::uuid
  FROM usuarios
  WHERE auth_id = auth.uid()
  LIMIT 1;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Use in views and functions
CREATE VIEW v_entregas_recentes AS
SELECT e.*
FROM entregas e
WHERE e.condominio_id = auth.current_condominio_id()
ORDER BY e.created_at DESC;
```

---

## 5. Tenant-Specific Configurations

### 5.1 Condomínio Settings Table

```sql
-- condominios table with settings
CREATE TABLE condominios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identity
  cnpj VARCHAR(20) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  subdomain VARCHAR(50) UNIQUE, -- "solar" from solar.condomais.com.br
  
  -- Contact
  telefone VARCHAR(20),
  whatsapp VARCHAR(20),
  email VARCHAR(255),
  endereco VARCHAR(500),
  
  -- Configuration (tenant-specific)
  config JSONB DEFAULT '{
    "entregas": {
      "foto_obrigatoria": false,
      "notificar_whatsapp": true,
      "alerta_telegram": false
    },
    "avisos": {
      "permitir_respostas": true,
      "expiracao_dias": 7
    },
    "reservas": {
      "antecedencia_minima_horas": 24,
      "permitir_cancelamento": true
    },
    "classificados": {
      "permitir_fotos": true,
      "max_fotos": 3,
      "expiracao_dias": 30
    },
    "whatsapp": {
      "sindico_contato": true,
      "grupo_noticias": "https://chat.whatsapp.com/..."
    }
  }',
  
  -- Branding
  logo_url TEXT,
  cor_primaria VARCHAR(7) DEFAULT '#2563EB',
  
  -- Plan
  plan VARCHAR(20) DEFAULT 'basic',
  max_unidades INTEGER DEFAULT 50,
  max_porteiros INTEGER DEFAULT 2,
  
  -- Audit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.2 Accessing Tenant Configuration

```typescript
// services/condominio-config.service.ts
interface CondominioConfig {
  entregas: {
    foto_obrigatoria: boolean;
    notificar_whatsapp: boolean;
  };
  avisos: {
    permitir_respostas: boolean;
    expiracao_dias: number;
  };
  reservas: {
    antecedencia_minima_horas: number;
  };
}

async getCondominioConfig(): Promise<CondominioConfig> {
  const tenantId = this.tenantService.getCurrentTenant().id;
  
  const { data } = await this.supabase
    .from('condominios')
    .select('config')
    .eq('id', tenantId)
    .single();
  
  return data?.config as CondominioConfig;
}
```

---

## 6. Subdomain Routing

### 6.1 Custom Domain Setup

```
┌─────────────────────────────────────────────────┐
│                  DNS Configuration             │
├─────────────────────────────────────────────────┤
│  solar.condomais.com.br   CNAME   condo.app   │
│  joia.condomais.com.br    CNAME   condo.app   │
│  www.condomais.com.br     CNAME   condo.app   │
└─────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│              Application (Vercel/Netlify)     │
├─────────────────────────────────────────────────┤
│  Read hostname → Extract subdomain           │
│  Load tenant config from database            │
│  Apply custom branding                     │
└─────────────────────────────────────────────────┘
```

### 6.2 Subdomain Resolution

```typescript
// app.component.ts (or route resolver)
@Injectable({ providedIn: 'root' })
export class TenantResolver implements Resolve<Tenant> {
  resolve(route: ActivatedRouteSnapshot): Observable<Tenant> {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
    
    if (subdomain === 'www' || subdomain === 'app') {
      // No subdomain - redirect to default or login
      return of(null);
    }
    
    return this.tenantService.getBySubdomain(subdomain).pipe(
      tap(tenant => {
        // Apply custom theme
        this.themeService.applyBrandColors(tenant.cor_primaria);
        // Store in service
        this.tenantService.setCurrentTenant(tenant);
      })
    );
  }
}
```

---

## 7. Cross-Tenant Prevention

### 7.1 Test Cases for Isolation

| Test | Description | Expected Result |
|------|-------------|------------------|
| TC-01 | User from Condo A queries all deliveries | Returns only Condo A deliveries |
| TC-02 | User from Condo A tries to access Condo B data | 403 Forbidden |
| TC-03 | API call without tenant context | 400 Bad Request |
| TC-04 | Direct DB access via psql as tenant user | Blocked by RLS |
| TC-05 | SQL injection attempt | Filtered by RLS |

### 7.2 Automated Tests

```typescript
// e2e/tenant-isolation.spec.ts
describe('Tenant Isolation', () => {
  let condoAMorador: Morador;
  let condoBMorador: Morador;

  before(async () => {
    condoAMorador = await createTestUser('solar');
    condoBMorador = await createTestUser('joia');
  });

  it('should only see deliveries from own condominium', async () => {
    await createDelivery(condoAMorador.condominioId, 'solar-pkg');
    await createDelivery(condoBMorador.condominioId, 'joia-pkg');

    const deliveries = await api.getDeliveries(condoAMorador);

    expect(deliveries.length).to.be.greaterThan(0);
    expect(deliveries.every(d => 
      d.condominio_id === condoAMorador.condominioId
    )).to.be.true;
  });

  it('should block cross-tenant access attempt', async () => {
    const response = await api.request({
      method: 'GET',
      endpoint: `/entregas`,
      token: condoAMorador.token,
      headers: { 'X-Tenant-ID': condoBMorador.condominioId }
    });

    expect(response.status).to.equal(403);
  });
});
```

---

## 8. Tenant Quotas

### 8.1 Plan-Based Limits

```sql
-- plans table
CREATE TABLE planos (
  id VARCHAR(20) PRIMARY KEY,
  nome VARCHAR(50),
  max_unidades INTEGER,
  max_porteiros INTEGER,
  max_equipamentos INTEGER,
  max_storage_mb INTEGER,
  preco_mensal DECIMAL(10, 2),
  funcionalidades JSONB
);

-- Seed data
INSERT INTO planos (id, nome, max_unidades, max_porteiros, preco_mensal)
VALUES 
  ('basic', 'Básico', 50, 2, 299.00),
  ('plus', 'Plus', 150, 5, 499.00),
  ('premium', 'Premium', 500, 10, 899.00);
```

### 8.2 Quota Enforcement

```sql
-- Function to check quota
CREATE OR REPLACE FUNCTION check_quota(
  p_condominio_id UUID,
  p_resource_type TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_count INTEGER;
  v_max_count INTEGER;
  v_plan VARCHAR(20);
BEGIN
  -- Get plan
  SELECT plan INTO v_plan
  FROM condominios
  WHERE id = p_condominio_id;

  -- Get resource count
  CASE p_resource_type
    WHEN 'unidades' THEN
      SELECT COUNT(*) INTO v_current_count
      FROM unidades WHERE condominio_id = p_condominio_id;
      SELECT max_unidades INTO v_max_count FROM planos WHERE id = v_plan;
    
    WHEN 'moradores' THEN
      SELECT COUNT(*) INTO v_current_count
      FROM usuarios 
      WHERE condominio_id = p_condominio_id 
        AND role = 'morador';
      SELECT max_unidades INTO v_max_count FROM planos WHERE id = v_plan;
    
    WHEN 'porteiros' THEN
      SELECT COUNT(*) INTO v_current_count
      FROM usuarios 
      WHERE condominio_id = p_condominio_id 
        AND role = 'porteiro';
      SELECT max_porteiros INTO v_max_count FROM planos WHERE id = v_plan;
  END CASE;

  RETURN v_current_count < v_max_count;
END;
$$ LANGUAGE plpgsql;

-- Use in INSERT triggers
CREATE OR REPLACE FUNCTION enforce_quota()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT check_quota(NEW.condominio_id, TG_ARGV[0]) THEN
    RAISE EXCEPTION 'Quota exceeded for %', TG_ARGV[0];
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_unidades_quota
  BEFORE INSERT ON unidades
  FOR EACH ROW
  EXECUTE FUNCTION enforce_quota('unidades');
```

---

## 9. Tenant Onboarding

### 9.1 Registration Flow

```
┌─────────────────────────────────────────────────┐
│         TENANT REGISTRATION FLOW                │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. Visit condomeais.com.br/support            │
│     ↓                                           │
│  2. Form: CNPJ, Name, Units Count              │
│     ↓                                           │
│  3. Validate CNPJ (not in system)             │
│     ↓                                           │
│  4. Create condomínio in database              │
│     ↓                                           │
│  5. Generate subdomain                        │
│     ↓                                           │
│  6. Create Síndico admin user                │
│     ↓                                           │
│  7. Send welcome email                        │
│     ↓                                           │
│  8. Redirect to subdomain config             │
└─────────────────────────────────────────────────┘
```

### 9.2 Onboarding SQL

```sql
-- Function: create_new_condominio
CREATE OR REPLACE FUNCTION create_new_condominio(
  p_cnpj TEXT,
  p_nome TEXT,
  p_subdomain TEXT,
  p_email TEXT,
  p_telefone TEXT,
  OUT p_condominio_id UUID,
  OUT p_success BOOLEAN
) AS $$
DECLARE
  v_exists BOOLEAN;
BEGIN
  -- Check if CNPJ exists
  SELECT EXISTS(
    SELECT 1 FROM condominios WHERE cnpj = p_cnpj
  ) INTO v_exists;

  IF v_exists THEN
    RAISE EXCEPTION 'CNPJ already registered';
  END IF;

  -- Create condomínio
  INSERT INTO condominios (cnpj, nome, subdomain, email, telefone)
  VALUES (p_cnpj, p_nome, p_subdomain, p_email, p_telefone)
  RETURNING id INTO p_condominio_id;

  p_success := TRUE;
END;
$$ LANGUAGE plpgsql;
```

---

## 10. Risk Mitigation

### 10.1 Isolation Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| RLS misconfigured | Critical data leak | Automated audit tests after each migration |
| JWT tampering | Cross-tenant access | Validate JWT signature server-side |
| SQL injection | Tenant escape | Parameterized queries only |
| Weak passwords | Brute force | Rate limiting, 2FA enforcement |
| Cache poisoning | Wrong tenant data | Tenant key in cache keys |

### 10.2 Verification Checklist

- [ ] RLS enabled on all tables
- [ ] No bypass routes (always go through RLS)
- [ ] Tenant filter in all Supabase queries
- [ ] Subdomain validation on requests
- [ ] Automated tenant isolation tests
- [ ] Audit log of cross-tenant attempts