import { Routes } from '@angular/router';
import { authGuard, tenantGuard, roleGuard } from '@condomais/core';
export const routes: Routes = [
  { path: 'login',         loadComponent: () => import('./features/auth/login.component').then(m=>m.LoginComponent) },
  { path: 'tenant-select', canActivate: [authGuard], loadComponent: () => import('./features/tenant-select/tenant-select.component').then(m=>m.TenantSelectComponent) },
  { path: 'unauthorized',  loadComponent: () => import('./features/unauthorized/unauthorized.component').then(m=>m.UnauthorizedComponent) },
  {
    path: "",
    canActivate: [authGuard, tenantGuard, roleGuard(['PORTEIRO', 'SINDICO'])],
    loadComponent: () => import("./layout/app-shell/app-shell.component").then(m=>m.AppShellComponent),
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: 'home',            loadComponent: () => import('./features/home/home.component').then(m=>m.HomeComponent) },
      { path: 'moradores',       loadComponent: () => import('./features/residents/residents.component').then(m=>m.ResidentsComponent) },
      { path: 'moradores/:id',   loadComponent: () => import('./features/residents/resident-detail.component').then(m=>m.ResidentDetailComponent) },
      { path: 'entregas',        loadComponent: () => import('./features/deliveries/deliveries.component').then(m=>m.DeliveriesComponent) },
      { path: 'entregas/nova',   loadComponent: () => import('./features/deliveries/new-delivery.component').then(m=>m.NewDeliveryComponent) },
      { path: 'avisos',          loadComponent: () => import('./features/announcements/announcements.component').then(m=>m.AnnouncementsComponent) },
      { path: 'ocorrencias',     loadComponent: () => import('./features/occurrences/occurrences.component').then(m=>m.OccurrencesComponent) },
      { path: 'ocorrencias/nova',loadComponent: () => import('./features/occurrences/new-occurrence.component').then(m=>m.NewOccurrenceComponent) },
    ],
  },
  { path: '**', redirectTo: 'home' },
];