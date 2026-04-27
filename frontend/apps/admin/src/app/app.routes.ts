import { Routes } from '@angular/router';
import { authGuard, contextGuard, roleGuard, SelectContextComponent } from '@condomais/core';
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
  { path: 'select-context', canActivate: [authGuard], component: SelectContextComponent },
  { path: 'tenant-select',  canActivate: [authGuard], component: SelectContextComponent },
  { path: 'unauthorized', loadComponent: () => import('./features/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) },
  {
    path: "",
    canActivate: [authGuard, contextGuard('admin'), roleGuard(['ADMIN', 'SINDICO', 'CONSELHO'])],
    loadComponent: () => import("./layout/shell.component").then(m => m.ShellComponent),
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: 'dashboard',       loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'entregas',        loadComponent: () => import('./features/deliveries/deliveries.component').then(m => m.AdminDeliveriesComponent) },
      { path: 'ocorrencias',     loadComponent: () => import('./features/occurrences/occurrences.component').then(m => m.AdminOccurrencesComponent) },
      { path: 'ocorrencias/:id', loadComponent: () => import('./features/occurrences/occurrence-detail.component').then(m => m.AdminOccurrenceDetailComponent) },
      { path: 'reservas',        loadComponent: () => import('./features/reservations/reservations.component').then(m => m.AdminReservationsComponent) },
      { path: 'usuarios',        loadComponent: () => import('./features/users/users.component').then(m => m.AdminUsersComponent) },
      { path: 'plano',           loadComponent: () => import('./features/billing/billing.component').then(m => m.AdminBillingComponent) },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
