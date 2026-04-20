import {
  AppShellComponent
} from "./chunk-SNKKFAAU.js";
import "./chunk-I2P65SBE.js";
import {
  Router,
  bootstrapApplication,
  provideRouter,
  withComponentInputBinding
} from "./chunk-N6N7VLCZ.js";
import "./chunk-3MTEG4YI.js";
import {
  inject,
  provideZoneChangeDetection
} from "./chunk-KKC7QRLW.js";

// apps/morador/src/app/core/auth.guard.ts
var authGuard = () => {
  const router = inject(Router);
  const loggedIn = localStorage.getItem("cm_logged") === "1";
  return loggedIn ? true : router.createUrlTree(["/login"]);
};

// apps/morador/src/app/app.routes.ts
var routes = [
  { path: "login", loadComponent: () => import("./chunk-34V7DCJX.js").then((m) => m.LoginComponent) },
  {
    path: "",
    canActivate: [authGuard],
    loadComponent: () => import("./chunk-S3MFH75I.js").then((m) => m.AppShellComponent),
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", loadComponent: () => import("./chunk-BA4FWFIH.js").then((m) => m.HomeComponent) },
      { path: "entregas", loadComponent: () => import("./chunk-L4EMBM2I.js").then((m) => m.DeliveriesComponent) },
      { path: "entregas/:id", loadComponent: () => import("./chunk-QLQTSUSP.js").then((m) => m.DeliveryDetailComponent) },
      { path: "reservas", loadComponent: () => import("./chunk-VWTUGR5I.js").then((m) => m.ReservationsComponent) },
      { path: "reservas/nova", loadComponent: () => import("./chunk-3DC34ZLZ.js").then((m) => m.NewReservationComponent) },
      { path: "marketplace", loadComponent: () => import("./chunk-PBCGZARY.js").then((m) => m.MarketplaceComponent) },
      { path: "marketplace/:id", loadComponent: () => import("./chunk-KGLVF4KK.js").then((m) => m.MarketplaceDetailComponent) },
      { path: "avisos", loadComponent: () => import("./chunk-ZL6JT2UG.js").then((m) => m.AnnouncementsComponent) },
      { path: "avisos/:id", loadComponent: () => import("./chunk-2G7DLFFB.js").then((m) => m.AnnouncementDetailComponent) },
      { path: "notificacoes", loadComponent: () => import("./chunk-7JBAAMMO.js").then((m) => m.NotificationsComponent) },
      { path: "perfil", loadComponent: () => import("./chunk-W4DLBUYM.js").then((m) => m.ProfileComponent) },
      { path: "integracoes", loadComponent: () => import("./chunk-CVNQUCAN.js").then((m) => m.GoogleIntegrationsComponent) }
    ]
  },
  { path: "**", redirectTo: "home" }
];

// apps/morador/src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding())
  ]
};

// apps/morador/src/main.ts
bootstrapApplication(AppShellComponent, appConfig).catch(console.error);
//# sourceMappingURL=main.js.map
