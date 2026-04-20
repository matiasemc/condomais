import {
  AppShellComponent
} from "./chunk-OB4LSDPH.js";
import {
  authGuard,
  provideCore,
  roleGuard,
  tenantGuard
} from "./chunk-35HAV5GM.js";
import {
  bootstrapApplication,
  provideRouter,
  withComponentInputBinding
} from "./chunk-22JHDSMV.js";
import "./chunk-DGSLDQQ5.js";
import "./chunk-VUTJB2DO.js";
import "./chunk-RE6VNHJT.js";
import {
  provideZoneChangeDetection
} from "./chunk-QFVHJJPM.js";

// apps/morador/src/environments/environment.ts
var environment = {
  production: false,
  supabaseUrl: "https://qhujhbrzvufoxlhtbqbt.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodWpoYnJ6dnVmb3hsaHRicWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MzQwMDMsImV4cCI6MjA5MjIxMDAwM30.aWEi_SIFaCF4JZaWBHziWor5vQEyUoVaujicDo4dXVA"
};

// apps/morador/src/app/app.routes.ts
var routes = [
  { path: "login", loadComponent: () => import("./chunk-IWXGCNKJ.js").then((m) => m.LoginComponent) },
  { path: "tenant-select", canActivate: [authGuard], loadComponent: () => import("./chunk-GHYRQ2E7.js").then((m) => m.TenantSelectComponent) },
  { path: "unauthorized", loadComponent: () => import("./chunk-7UQ3GYDW.js").then((m) => m.UnauthorizedComponent) },
  {
    path: "",
    canActivate: [authGuard, tenantGuard, roleGuard(["MORADOR", "SINDICO", "CONSELHO"])],
    loadComponent: () => import("./chunk-N425SS7X.js").then((m) => m.AppShellComponent),
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", loadComponent: () => import("./chunk-UGVWBVMU.js").then((m) => m.HomeComponent) },
      { path: "entregas", loadComponent: () => import("./chunk-ZXZCG7VB.js").then((m) => m.DeliveriesComponent) },
      { path: "entregas/:id", loadComponent: () => import("./chunk-TSDC6HTP.js").then((m) => m.DeliveryDetailComponent) },
      { path: "reservas", loadComponent: () => import("./chunk-QTGGHHNS.js").then((m) => m.ReservationsComponent) },
      { path: "reservas/nova", loadComponent: () => import("./chunk-O243LBTW.js").then((m) => m.NewReservationComponent) },
      { path: "marketplace", loadComponent: () => import("./chunk-UDPRTV3C.js").then((m) => m.MarketplaceComponent) },
      { path: "marketplace/:id", loadComponent: () => import("./chunk-4EDV4YGX.js").then((m) => m.MarketplaceDetailComponent) },
      { path: "avisos", loadComponent: () => import("./chunk-6JR762YN.js").then((m) => m.AnnouncementsComponent) },
      { path: "avisos/:id", loadComponent: () => import("./chunk-BR5X7R5M.js").then((m) => m.AnnouncementDetailComponent) },
      { path: "notificacoes", loadComponent: () => import("./chunk-F52ZNWYX.js").then((m) => m.NotificationsComponent) },
      { path: "perfil", loadComponent: () => import("./chunk-6GS7R3DC.js").then((m) => m.ProfileComponent) },
      { path: "integracoes", loadComponent: () => import("./chunk-FQGZXZWJ.js").then((m) => m.GoogleIntegrationsComponent) }
    ]
  },
  { path: "**", redirectTo: "home" }
];

// apps/morador/src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideCore({ supabaseUrl: environment.supabaseUrl, supabaseAnonKey: environment.supabaseAnonKey })
  ]
};

// apps/morador/src/main.ts
bootstrapApplication(AppShellComponent, appConfig).catch(console.error);
//# sourceMappingURL=main.js.map
