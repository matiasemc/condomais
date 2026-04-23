import { Routes } from '@angular/router';
import { authGuard, tenantGuard, roleGuard } from '@condomais/core';
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
  { path: 'tenant-select', loadComponent: () => import('./features/tenant-select/tenant-select.component').then(m => m.TenantSelectComponent), canActivate: [authGuard] },
  { path: 'unauthorized', loadComponent: () => import('./features/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) },
  {
    path: "",
    canActivate: [authGuard, tenantGuard, roleGuard(['ADMIN', 'SINDICO', 'CONSELHO'])],
    loadComponent: () => import("./layout/shell.component").then(m => m.ShellComponent),
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: 'dashboard',       loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'entregas',        loadComponent: () => import('./features/deliveries/deliveries.component').then(m => m.AdminDeliveriesComponent) },
      { path: 'ocorrencias',     loadComponent: () => import('./features/occurrences/occurrences.component').then(m => m.AdminOccurrencesComponent) },
      { path: 'ocorrencias/:id', loadComponent: () => import('./features/occurrences/occurrence-detail.component').then(m => m.AdminOccurrenceDetailComponent) },
      { path: 'reservas',        loadComponent: () => import('./features/reservations/reservations.component').then(m => m.AdminReservationsComponent) },
      { path: 'usuarios',        loadComponent: () => import('./features/users/users.component').then(m => m.AdminUsersComponent) },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
