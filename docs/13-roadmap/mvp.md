# MVP (Minimum Viable Product)

## 1. Objective

Ship a functional basic version with core features.

## 2. Timeline

Months 1-3

## 3. Features

### Core Features

| Feature | Description | Priority |
|---------|-------------|----------|
| User Authentication | Google OAuth + email/password | Critical |
| Tenant Management | Condomínio setup | Critical |
| Delivery Tracking | Register, view, status updates | Critical |
| Announcements | Create, publish, view | High |
| Residents List | Basic CRUD | High |

### User Apps

| App | Features |
|-----|----------|
| Resident App | View deliveries, view announcements |
| Admin Panel | Dashboard, manage residents, register deliveries |

## 4. Technical Scope

- Authentication (Google OAuth)
- Supabase backend with RLS
- Angular frontend
- Basic push notifications

## 5. Excluded from MVP

- Reservations system
- Classifieds marketplace
- WhatsApp integration
- Google Calendar sync
- Mobile (iOS/Android) apps
- Advanced reporting