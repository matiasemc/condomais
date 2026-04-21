import { Routes } from '@angular/router';
import { masterAdminGuard } from '@condomais/core';

export const routes: Routes = [
  { path: 'login',        loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
  { path: 'unauthorized', loadComponent: () => import('./features/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) },
  {
    path: '',
    canActivate: [masterAdminGuard],
    loadComponent: () => import('./layout/shell.component').then(m => m.ShellComponent),
    children: [
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'tenants',   loadComponent: () => import('./features/tenants/tenants.component').then(m => m.TenantsComponent) },
      { path: 'users',     loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent) },
      { path: 'plans',     loadComponent: () => import('./features/plans/plans.component').then(m => m.PlansComponent) },
      { path: '**',        redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];