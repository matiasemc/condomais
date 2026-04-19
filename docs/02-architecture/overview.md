# System Architecture Overview

## 1. Objective

Define the high-level system architecture for CondoMais, establishing the foundational structure that enables Multi-tenancy, security, and scalability across all components.

## 2. Scope

This document covers:
- System components and their responsibilities
- Data flow architecture
- Technology stack decisions
- System boundaries and interfaces
- Non-functional requirements (performance, security, availability)

---

## 3. Architectural Principles

### 3.1 Multi-Tenant Isolation (Critical)

Every database query, API call, and storage access MUST include tenant isolation:

```typescript
// Always enforce tenant context
const tenantContext = supabase.auth.user()?.user_metadata?.condominio_id;

// All queries must filter by tenant
const { data } = await supabase
  .from('moradores')
  .select('*')
  .eq('condominio_id', tenantContext); // MANDATORY
```

### 3.2 Security-First Design

- **Zero Trust**: Every request authenticated and authorized
- **Defense in Depth**: Multiple security layers (app, API, RLS, DB)
- **Least Privilege**: Roles have minimum required permissions

### 3.3 API-First Architecture

- All business logic exposed via API
- Consistent request/response patterns
- Versioned API contracts
- Comprehensive error handling

---

## 4. System Components

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                     │
├─────────────────────────────────┬───────────────────────────────────────┤
│   Resident App (Angular iOS)    │    Resident App (Angular Android)   │
├─────────────────────────────────┼───────────────────────────────────────┤
│    Doorman App (Angular Web)    │        Admin Panel (Angular Web)     │
└─────────────────────────────────┴───────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY LAYER                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                    Supabase Auth (JWT Provider)                         │
│                    Supabase REST API                                    │
│                    Supabase Realtime                                    │
│                    Edge Functions (Serverless)                         │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                       │
├───────────────────────────────────┬─────────────────────────────────────┤
│    PostgreSQL Database            │    Storage (S3-compatible)          │
│    - RLS Policies               │    - Delivery photos                │
│    - Row-level Security         │    - Classified images               │
│    - Full-text search          │    - Condo logos                    │
└───────────────────────────────────┴─────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                                   │
├─────────────────┬─────────────────┬─────────────────┬────────────────────┤
│   Google OAuth │ Google Calendar │  WhatsApp API  │  FCM Push          │
└─────────────────┴─────────────────┴─────────────────┴────────────────────┘
```

---

## 5. Technology Stack

### 5.1 Frontend

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Framework | Angular | 17+ | Core SPA framework |
| State Management | NgRx | 17+ | Global state, effects |
| HTTP Client | Angular HttpClient | Built-in | API communication |
| Forms | Angular Reactive Forms | Built-in | Form handling |
| UI Components | Angular Material | 17+ | Pre-built components |
| Routing | Angular Router | Built-in | SPA navigation |
| i18n | @ngx-translate | 14+ | Translations |

### 5.2 Backend

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Database | PostgreSQL | 14+ | Primary data store |
| Auth | Supabase Auth | Latest | JWT, OAuth 2.0 |
| ORM/Query Builder | Supabase JS Client | 2+ | Type-safe queries |
| Realtime | Supabase Realtime | Latest | Push to client |
| Edge Functions | Deno (Supabase) | Latest | Server-side logic |
| Storage | Supabase Storage | Latest | File storage |
| RLS | PostgreSQL Row-Level Security | Built-in | Tenant isolation |

### 5.3 External Integrations

| Service | Integration | Purpose |
|---------|-------------|---------|
| Google | OAuth 2.0 + Calendar API | Auth, calendar sync |
| WhatsApp | WhatsApp Business API | Direct messaging |
| Firebase Cloud Messaging | FCM | Push notifications |
| SendGrid | Email API | Transactional email |

---

## 6. Multi-Tenant Architecture

### 6.1 Tenant Isolation Model

```
┌──────────────────────────────────────────────────────────────┐
│                    SUPERUSER (SaaS Admin)                    │
│              Full access to all condominiums                   │
└───────────────���─��────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                   ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ Condomínio A │    │ Condomínio B │    │ Condomínio C  │
│   (Tenant)  │    │   (Tenant)  │    │   (Tenant)   │
└───────────────┘    └───────────────┘    └───────────────┘
     │                    │                    │
     ▼                    ▼                    ▼
  Edifício Solar    Edifício Joia      Condominio
  do Vale (120)     (80 units)        Vista (200)
```

### 6.2 Tenant Data Model

```sql
-- Each tenant has a unique identificator
CREATE TABLE condominios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cnpj VARCHAR(20) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  subdomain VARCHAR(50) UNIQUE, -- "solar" for solar.condomais.com.br
  settings JSONB DEFAULT '{}',
  plan VARCHAR(20) DEFAULT 'basic',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- All user data linked to tenant
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL, -- 'morador', 'porteiro', 'sindico'
  -- ... other fields
);

-- RLS policy enforces tenant isolation
CREATE POLICY "Users belong to their condominium"
  ON usuarios FOR ALL
  USING (condominio_id = current_setting('app.current_tenant')::uuid);
```

---

## 7. Authentication Flow

### 7.1 Google OAuth 2.0

```
┌─────────┐     ┌──────────┐     ┌─────────────┐     ┌──────────┐
│ Resident │────▶│ Login   │────▶│ Google     │────▶│ Callback │
│   App    │     │ Screen  │     │ Consent    │     │ + JWT    │
└─────────┘     └──────────┘     └─────────────┘     └──────────┘
```

### 7.2 JWT Token Structure

```typescript
interface JWTPayload {
  // Standard claims
  sub: string;              // user_id
  iss: string;              // "https://condomais.supabase.co"
  exp: number;              // expiration timestamp
  iat: number;             // issued at

  // Custom claims
  role: 'morador' | 'porteiro' | 'sindico';
  condominio_id: string;
  unidade_id?: string;
  permissions: string[];
}
```

---

## 8. API Architecture

### 8.1 REST Endpoints

Base URL: `https://[project-ref].supabase.co/rest/v1/`

| Resource | Endpoints |
|----------|----------|
| Entregas | GET/POST /entregas, GET/PUT/DELETE /entregas/{id} |
| Moradores | GET/POST /moradores, GET/PUT/DELETE /moradores/{id} |
| Avisos | GET/POST /avisos, GET/PUT/DELETE /avisos/{id} |
| Reservas | GET/POST /reservas, GET/PUT/DELETE /reservas/{id} |
| Classificados | GET/POST /classificados, ... |
| Unidades | GET/POST /unidades, ... |

### 8.2 Real-time Subscriptions

```typescript
// Subscribe to delivery updates for user's unit
supabase
  .channel('entregas')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'entregas',
    filter: `unidade_id=eq.${user.unidadeId}`,
  }, (payload) => {
    // Real-time delivery notification
  })
  .subscribe();
```

---

## 9. Non-Functional Requirements

### 9.1 Performance

| Metric | Target | Measurement |
|--------|--------|--------------|
| API Response Time | <200ms p95 | Application Metrics |
| Push Notification Latency | <5 seconds | Server to device |
| App Launch Time | <3 seconds | Cold start |
| Search Latency | <100ms | Including full-text |
| File Upload (5MB) | <10 seconds | Network dependent |

### 9.2 Availability

| Metric | Target |
|--------|--------|
| Uptime | 99.9% (excluding maintenance) |
| Planned Maintenance | Monthly, Sunday 2am-6am |
| Emergency Maint. | As needed, 24h notice |

### 9.3 Security

| Requirement | Implementation |
|-------------|----------------|
| Data at Rest | Supabase AES-256 encryption |
| Data in Transit | TLS 1.3 |
| Password Policy | Min 8 chars, 1 uppercase, 1 number |
| Session Timeout | 30 days (remember me), 30 min (public) |
| Failed Login Lockout | 5 attempts, 15 min lockout |
| Audit Logs | All data modifications logged |

---

## 10. System Boundaries

### 10.1 Data Boundaries

| Data Type | Storage | Retention |
|-----------|---------|-----------|
| User profiles | PostgreSQL | Until deletion |
| Delivery history | PostgreSQL | 2 years |
| Announcement history | PostgreSQL | 1 year |
| Classifieds | PostgreSQL | 30 days after sale |
| Application logs | Supabase Edge Functions | 90 days |

### 10.2 Integration Boundaries

| External Service | Data Shared | Purpose |
|-----------------|------------|---------|
| Google | Email, profile | Authentication |
| Google Calendar | Reservation events | Sync |
| WhatsApp | Phone number | Communication |
| FCM | Push tokens | Notifications |

---

## 11. Dependências entre Módulos

```
┌──────────────────┐
│   Authentication │ ◄── Supabase Auth
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Tenant Context  │ ◄── RLS + JWT claims
└────────┬─────────┘
         │
    ┌────┼────┐
    ▼   ▼   ▼
┌────---+-------+-------┐
│ Morador │ Porteiro │ Admin │ ◄── Role-based UI
└────────┴────────┴────────┘
         │
         ▼
┌────────────────────────┐
│   Core Features       │
│ - Entregas            │
│ - Avisos              │
│ - Reservas           │
│ - Classificados      │
└──────────────────────┘
         │
         ▼
┌────────────────────────┐
│   External Services   │
│ - WhatsApp            │
│ - Google Calendar     │
│ - FCM Push            │
└──────────────────────┘
```