# Apps Structure

## 1. Objective

Define the four applications (platforms) that make up the CondoMais system, their purposes, and how they relate to each other.

## 2. Scope

This document covers:
- master-admin (SaaS owner panel)
- admin (síndico/condominium manager)
- morador (resident mobile app)
- porteiro (doorman operational web app)

---

## 3. Application Overview

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    CONDOMAIS PLATFORM                              │
├─────────────────┬─────────────────┬─────────────────┬────────────────┤
│   MASTER-ADMIN  │      ADMIN     │    MORADOR     │    PORTEIRO    │
│                │   (Síndico)   │  (Resident)   │  (Doorman)   │
├─────────────────┼─────────────────┼─────────────────┼────────────────┤
│ SaaS Owner     │ Building Mgr   │ Resident App   │ Doorman Web   │
│ Panel        │ Admin Panel  │ (Mobile)     │ (Web)       │
│              │             │              │              │
│ - Manage     │ - Dashboard │ - View       │ - Register   │
│   Condos    │ - Residents │   Deliveries │   Deliveries │
│ - Global    │ - Deliveries │ - Announce  │ - Search    │
│   Users     │ - Announce  │ - Reserve  │ - Ocorrê-   │
│ - Settings  │ - Reserve  │ - Classif.  │   ncias    │
│ - Analytics│ - Config  │ - Profile  │ - View      │
│              │ - Reports │ - Notify   │   Announce │
└─────────────────┴─────────────────┴─────────────────┴────────────────┘
                           SHARED BACKEND
                    (Supabase + PostgreSQL + Storage)
```

---

## 4. MASTER_ADMIN (SaaS Owner Panel)

### 4.1 Purpose

Platform-wide administration for the SaaS business owner.

### 4.2 Features

| Feature | Description |
|---------|-------------|
| Tenant Management | Create, configure, disable condominiums |
| Global User Management | View all users, manage global access |
| Platform Settings | Configure global features, payment settings |
| Analytics | Platform-wide usage statistics |
| Billing Overview | View subscription status |

### 4.3 User

- **Role**: MASTER_ADMIN (global, not per-tenant)
- **Access**: Full platform visibility

### 4.4 URL Pattern

```
master-admin.condomais.com
or
condomais.com/admin
```

### 4.5 Tech

- Angular web application
- Server-side rendered (SSR)

---

## 5. ADMIN (Síndico Panel)

### 5.1 Purpose

Building-level administration for síndicos and council members.

### 5.2 Features

| Feature | Description |
|---------|-------------|
| Dashboard | Today's deliveries, activity metrics |
| Moradores | Manage resident accounts |
| Entregas | View/manage all deliveries |
| Avisos | Create/manage announcements |
| Reservas | Manage reservations, equipment |
| Configurações | Building settings |
| Relatórios | Export reports |

### 5.3 Users

- **Role in app**: SINDICO, CONSELHO (per tenant)
- **Access**: One specific condominium

### 5.4 URL Pattern

```
{condominio}.condomais.com/admin
or
condomais.com/{condominio}/admin
```

### 5.5 Tech

- Angular web application
- Auth guards check membership + role

---

## 6. MORADOR (Resident Mobile App)

### 6.1 Purpose

Mobile application for residents to check deliveries, announcements, and manage reservations.

### 6.2 Features

| Feature | Description |
|---------|-------------|
| Entregas | View personal deliveries |
| Avisos | Read announcements |
| Reservas | Book amenities |
| Classificados | Marketplace |
| WhatsApp | Contact síndico |
| Profile | Edit profile |

### 6.3 Users

- **Role in app**: MORADOR (per tenant)
- **Access**: Own unit's deliveries only

### 6.4 Tech

- Angular mobile app (Capacitor)
- iOS/Android apps
- PWA fallback

---

## 7. PORTEIRO (Doorman App)

### 7.1 Purpose

Web interface for doormen to register deliveries and search residents.

### 7.2 Features

| Feature | Description |
|---------|-------------|
| Registro de Entregas | Register new deliveries |
| Busca Morador | Search resident information |
| Ocorrências | Report incidents |
| Dashboard | Today's delivery stats |

### 7.3 Users

- **Role in app**: PORTEIRO (per tenant)
- **Access**: All units in building

### 7.4 URL Pattern

```
{condominio}.condomais.com/porteiro
or
condomais.com/{condominio}/portaria
```

### 7.5 Tech

- Angular web application
- Mobile-friendly (for tablet at gate)

---

## 8. User Role by App

| App | Valid Roles | Can Access Other Condos |
|-----|------------|---------------------|
| master-admin | MASTER_ADMIN | All (global) |
| admin | SINDICO, CONSELHO | No - must select one |
| morador | MORADOR | No - restricted to unit |
| porteiro | PORTEIRO | No - all units in condo |

---

## 9. Login Flow by App

### 9.1 MASTER_ADMIN

```
1. Login via email/password or Google
2. Check if user has MASTER_ADMIN role (global)
3. Redirect to master-admin dashboard
4. See all condominiums
```

### 9.2 ADMIN/MORADOR/PORTEIRO

```
1. Login via email/password or Google
2. Fetch user's memberships (from user_condominios)
3. If ONE membership → auto-select, go to app
4. If MULTIPLE memberships → force tenant selector UI
5. After selection → verify role for that tenant
6. Redirect to appropriate app path
```

---

## 10. Routing Structure

```
/auth/login              → Login page (any user)
/auth/verify            → Email verification

/master-admin          → MASTER_ADMIN app (root)
/master-admin/*        → MASTER_ADMIN routes

/{condominio}/admin    → ADMIN app (síndico)
/{condominio}/admin/*  → ADMIN routes

{my-app}.condomais.com → Per-app URLs
or
condomais.com/{condominio}/morador → MORADOR
```

---

## 11. State Management

### 11.1 Global State (App Bootstrap)

```typescript
interface AppState {
  // Auth
  user: User;
  memberships: Membership[];
  
  // Tenant Selection (required after login for non-MASTER_ADMIN)
  currentCondominio: Condominio | null;
  currentRole: string | null;
}
```

### 11.2 Tenant Context

```typescript
// Always available for non-MASTER_ADMIN
const tenantContext = {
  condominioId: 'uuid',
  role: 'sindico',
  
  // Used in ALL queries
  getQueryFilters() {
    return { condominio_id: this.condominioId };
  }
};
```

---

## 12. Implementation Checklist

### Backend
- [ ] RLS accepts MASTER_ADMIN bypass
- [ ] user_condominios table exists
- [ ] Helper functions: get_memberships()

### Frontend
- [ ] Login fetches memberships
- [ ] Multiple memberships → tenant selector page
- [ ] Current tenant stored globally
- [ ] Routes include contextual data
- [ ] Guards check both auth AND membership

---

## 13. Related Files

- `tenant-selection.md`: Tenant selector implementation
- `multi-tenant-membership.md`: Detailed membership model
- `routing.md`: Angular routing patterns
- `guards.md`: Route guards implementation