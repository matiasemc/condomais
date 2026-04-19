# Angular Routing

## 1. App Routes

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'morador',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['morador'] },
    loadChildren: () => import('./features/morador/morador.module')
      .then(m => m.MoradorModule)
  },
  {
    path: 'porteiro',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['porteiro'] },
    loadChildren: () => import('./features/porteiro/porteiro.module')
      .then(m => m.PorteiroModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['sindico'] },
    loadChildren: () => import('./features/admin/admin.module')
      .then(m => m.AdminModule)
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];
```