# Doorman App Overview

## 1. Objective

Define the structure of the Doorman (Porteiro) web app.

## 2. App Structure

### 2.1 Main Navigation

```
┌─────────────────────────────────────┐
│         PORTEIRO APP               │
├─────────────────────────────────────┤
│  [Dashboard] [Entregas] [Buscar]    │
│            [Ocorrências]           │
├─────────────────────────────────────┤
│  ┌──────────────────────────────┐  │
│  │   Dashboard (Daily Stats)    │  │
│  │   - Today's deliveries      │  │
│  │   - Pending pickups        │  │
│  │   - Recent                 │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 2.2 Routes

```typescript
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['porteiro'] }
  },
  {
    path: 'entregas',
    component: EntregasRegisterComponent
  },
  {
    path: 'buscar',
    component: buscarMoradorComponent
  },
  {
    path: 'ocorrencias',
    component: OcorrenciasComponent
  }
];
```