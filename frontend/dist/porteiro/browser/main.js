import {
  AppShellComponent
} from "./chunk-HSW3D7PD.js";
import {
  authGuard,
  provideCore,
  roleGuard,
  tenantGuard
} from "./chunk-XKFCWXE6.js";
import "./chunk-JUVU2L4V.js";
import "./chunk-7CWI5AJD.js";
import "./chunk-NDOIAJY4.js";
import {
  bootstrapApplication,
  provideRouter,
  withComponentInputBinding
} from "./chunk-C54MFYDF.js";
import {
  provideZoneChangeDetection
} from "./chunk-JLUHEVQX.js";

// apps/porteiro/src/environments/environment.ts
var environment = {
  production: false,
  supabaseUrl: "https://qhujhbrzvufoxlhtbqbt.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodWpoYnJ6dnVmb3hsaHRicWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MzQwMDMsImV4cCI6MjA5MjIxMDAwM30.aWEi_SIFaCF4JZaWBHziWor5vQEyUoVaujicDo4dXVA"
};

// apps/porteiro/src/app/app.routes.ts
var routes = [
  { path: "login", loadComponent: () => import("./chunk-LNTJ7B6G.js").then((m) => m.LoginComponent) },
  { path: "tenant-select", canActivate: [authGuard], loadComponent: () => import("./chunk-IMPKULOD.js").then((m) => m.TenantSelectComponent) },
  { path: "unauthorized", loadComponent: () => import("./chunk-NXIHEWPQ.js").then((m) => m.UnauthorizedComponent) },
  {
    path: "",
    canActivate: [authGuard, tenantGuard, roleGuard(["PORTEIRO", "SINDICO"])],
    loadComponent: () => import("./chunk-NO5CJ3SB.js").then((m) => m.AppShellComponent),
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", loadComponent: () => import("./chunk-VCQYNIOM.js").then((m) => m.HomeComponent) },
      { path: "moradores", loadComponent: () => import("./chunk-Y5OF45H5.js").then((m) => m.ResidentsComponent) },
      { path: "moradores/:id", loadComponent: () => import("./chunk-D3GTEBJ7.js").then((m) => m.ResidentDetailComponent) },
      { path: "entregas", loadComponent: () => import("./chunk-5CRGFNID.js").then((m) => m.DeliveriesComponent) },
      { path: "entregas/nova", loadComponent: () => import("./chunk-P737LD3Q.js").then((m) => m.NewDeliveryComponent) },
      { path: "avisos", loadComponent: () => import("./chunk-LPMK5IFD.js").then((m) => m.AnnouncementsComponent) },
      { path: "ocorrencias", loadComponent: () => import("./chunk-NNT5MLV3.js").then((m) => m.OccurrencesComponent) },
      { path: "ocorrencias/nova", loadComponent: () => import("./chunk-PWF5F2VH.js").then((m) => m.NewOccurrenceComponent) }
    ]
  },
  { path: "**", redirectTo: "home" }
];

// apps/porteiro/src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideCore({ supabaseUrl: environment.supabaseUrl, supabaseAnonKey: environment.supabaseAnonKey })
  ]
};

// apps/porteiro/src/main.ts
bootstrapApplication(AppShellComponent, appConfig).catch(console.error);
//# sourceMappingURL=main.js.map
