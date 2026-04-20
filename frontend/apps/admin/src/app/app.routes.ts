import { Routes } from '@angular/router';
import { authGuard, tenantGuard, roleGuard } from '@condomais/core';
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
  { path: 'tenant-select', loadComponent: () => import('./features/tenant-select/tenant-select.component').then(m => m.TenantSelectComponent), canActivate: [authGuard] },
  { path: 'unauthorized', loadComponent: () => import('./features/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) },
  {
    path: "",
    canActivate: [authGuard, tenantGuard, roleGuard(['SINDICO', 'CONSELHO'])],
    loadComponent: () => import("./layout/shell.component").then(m => m.ShellComponent),
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];