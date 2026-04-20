import { Routes } from '@angular/router';
import { authGuard, tenantGuard, roleGuard } from '@condomais/core';
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
  { path: 'tenant-select', canActivate: [authGuard], loadComponent: () => import('./features/tenant-select/tenant-select.component').then(m => m.TenantSelectComponent) },
  { path: 'unauthorized', loadComponent: () => import('./features/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) },
  {
    path: "",
    canActivate: [authGuard, tenantGuard, roleGuard(['MORADOR', 'SINDICO', 'CONSELHO'])],
    loadComponent: () => import("./layout/app-shell/app-shell.component").then(m => m.AppShellComponent),
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: 'home',          loadComponent: () => import('./features/home/home.component').then(m=>m.HomeComponent) },
      { path: 'entregas',      loadComponent: () => import('./features/deliveries/deliveries.component').then(m=>m.DeliveriesComponent) },
      { path: 'entregas/:id',  loadComponent: () => import('./features/deliveries/delivery-detail.component').then(m=>m.DeliveryDetailComponent) },
      { path: 'reservas',      loadComponent: () => import('./features/reservations/reservations.component').then(m=>m.ReservationsComponent) },
      { path: 'reservas/nova', loadComponent: () => import('./features/reservations/new-reservation.component').then(m=>m.NewReservationComponent) },
      { path: 'marketplace',    loadComponent: () => import('./features/marketplace/marketplace.component').then(m=>m.MarketplaceComponent) },
      { path: 'marketplace/:id',loadComponent: () => import('./features/marketplace/marketplace-detail.component').then(m=>m.MarketplaceDetailComponent) },
      { path: 'avisos',         loadComponent: () => import('./features/announcements/announcements.component').then(m=>m.AnnouncementsComponent) },
      { path: 'avisos/:id',     loadComponent: () => import('./features/announcements/announcement-detail.component').then(m=>m.AnnouncementDetailComponent) },
      { path: 'notificacoes',   loadComponent: () => import('./features/notifications/notifications.component').then(m=>m.NotificationsComponent) },
      { path: 'perfil',         loadComponent: () => import('./features/profile/profile.component').then(m=>m.ProfileComponent) },
      { path: 'integracoes',    loadComponent: () => import('./features/profile/google-integrations.component').then(m=>m.GoogleIntegrationsComponent) },
    ],
  },
  { path: '**', redirectTo: 'home' },
];