# Product Vision

## 1. Objective

Define the core vision, mission, and strategic goals for the CondoMais platform—a multi-tenant SaaS condominium management system that enables building managers (síndicos), residents (moradores), and doormen (porteiros) to manage daily building operations digitally.

## 2. Scope

### 2.1 In Scope

- **Membership-based multi-tenancy**: Users are global, condominiums are tenants, users can belong to multiple condominiums with different roles
- **Four user roles per tenant**: MORADOR, PORTEIRO, SINDICO, CONSELHO (not global)
- **Global MASTER_ADMIN**: Platform owner with system-wide access
- **Four platforms**: master-admin (SaaS owner), admin (síndico), morador (resident app), porteiro (doorman app)
- **Core features**: deliveries, announcements, reservations, occurrences, marketplace (classifieds)
- **Integrations**: WhatsApp deep links, Google OAuth 2.0, Google Calendar, email notifications

### 2.2 Out of Scope

- Financial management (condo fees, payments)
- Physical access control (RFID gates)
- Maintenance requests
- Document management system
- Employee HR management

---

## 3. Strategic Goals

### 3.1 Primary Vision

> Empower condominium residents and managers with a modern digital platform that simplifies daily operations, improves communication, and enhances community living through a secure, multi-tenant SaaS solution.

### 3.2 Mission

1. **Eliminate paper**: Replace physical bulletin boards and paper delivery logs with digital alternatives
2. **Reduce friction**: Enable residents to track deliveries, book amenities, and communicate with management from any device
3. **Improve security**: Provide audit trails for deliveries, occurrences, and access events
4. **Scale efficiently**: Allow the same user to manage or live in multiple condominiums

---

## 4. Product Principles

### 4.1 User-Centric Design

- Every feature solves a real daily pain point
- Maximum 3 taps to complete any primary action
- Offline-first for critical features (delivery notifications)

### 4.2 Security by Default

- All data encrypted at rest and in transit (Supabase handles this)
- RLS enforced at database level for ALL tenant data
- Role-based access control per tenant (not global)

### 4.3 Multi-Tenancy via Membership

- Users exist globally, are not tied to a single condominium
- User-condominium relationship is MANY-TO-MANY
- Role is granted PER tenant membership
- Tenant context is mandatory for data access

### 4.4 Reliability

- Push notifications deliver within 5 seconds
- All data modifications logged with audit trails
- 99.9% availability target

---

## 5. Success Metrics

| Metric | Target |
|--------|--------|
| Monthly Active Users | >80% of registered residents |
| Delivery tracking rate | >95% viewed by recipient |
| Announcement read rate | >70% within 24 hours |
| App Store rating | >4.5 stars |

---

## 6. Technical Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular 19 (standalone components) |
| Backend | Supabase (PostgreSQL + RLS + Storage) |
| Auth | Supabase Auth + Google OAuth 2.0 |
| Push | Firebase Cloud Messaging |
| Deployment | Vercel/Netlify + Supabase |