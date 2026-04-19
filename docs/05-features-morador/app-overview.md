# Resident App Overview

## 1. Objective

Define the overall structure and navigation of the Resident (Morador) App.

## 2. App Structure

### 2.1 Tab Navigation

```
┌────────────────────────────────┐
│         MORADOR APP            │
├────────────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ │
│  🏠  │ │ 📦 │ │ 📢 │ │ ⚙️  │ │
│ Home │ │ Entre-│ │Avisos│ │More │ │
│     │ │ gas  │ │     │ │     │ │
│ └────┘ └────┘ └────┘ └────┘ │
└────────────────────────────────┘
```

### 2.2 Feature Routes

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', redirectTo: 'entregas', pathMatch: 'full' },
      { path: 'entregas', component: EntregasPage },
      { path: 'entregas/:id', component: EntregaDetailPage },
      { path: 'avisos', component: AvisosPage },
      { path: 'avisos/:id', component: AvisoDetailPage },
      { path: 'reservas', component: ReservasPage },
      { path: 'reservas/:id', component: ReservaDetailPage },
      { path: 'reservas/new', component: NovaReservaPage },
      { path: 'classificados', component: ClassificadosPage },
      { path: 'classificados/:id', component: ClassificadoDetailPage },
      { path: 'classificados/new', component: NovoClassificadoPage },
      { path: 'profile', component: ProfilePage },
      { path: 'settings', component: SettingsPage }
    ]
  }
];
```

---

## 3. Component Architecture

```
┌─────────────────────────────────────────────────┐
│              CORE MODULE                        │
│  - AuthService                                │
│  - TenantService                             │
│  - ApiService                                │
│  - PushNotificationService                  │
└─────────────────────────────────────────────────┘
                      │
┌─────────────────────┼─────────────────────────┐
│                     │                         │
▼                     ▼                         ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  ENTREGRAS  │ │   AVISOS   │ │  RESERVAS  │
│  MODULE    │ │  MODULE    │ │  MODULE   │
│            │ │            │ │            │
│ - List     │ │ - List     │ │ - List    │
│ - Detail   │ │ - Detail   │ │ - Detail  │
│ - Card     │ │ - Card    │ │ - Form    │
└─────────────┘ └─────────────┘ └─────────────┘
```

---

## 4. Shared Features

### 4.1 Global Components

- **LoadingSpinner**: Full-screen and inline loading indicators
- **EmptyState**: Empty list placeholders
- **ErrorState**: Error display with retry
- **ConfirmationDialog**: Action confirmations