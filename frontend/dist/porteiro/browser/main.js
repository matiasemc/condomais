import {
  AppShellComponent
} from "./chunk-Z35RECSZ.js";
import "./chunk-OPK7ZD72.js";
import {
  bootstrapApplication,
  provideRouter,
  withComponentInputBinding
} from "./chunk-IEQM2DAI.js";
import {
  provideZoneChangeDetection
} from "./chunk-ZWQ7U6HY.js";

// apps/porteiro/src/app/app.routes.ts
var routes = [
  { path: "login", loadComponent: () => import("./chunk-TFC3QION.js").then((m) => m.LoginComponent) },
  {
    path: "",
    loadComponent: () => import("./chunk-Q7MKYY6D.js").then((m) => m.AppShellComponent),
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", loadComponent: () => import("./chunk-GVJ72U4O.js").then((m) => m.HomeComponent) },
      { path: "moradores", loadComponent: () => import("./chunk-R76FVX2S.js").then((m) => m.ResidentsComponent) },
      { path: "moradores/:id", loadComponent: () => import("./chunk-2JCANF4C.js").then((m) => m.ResidentDetailComponent) },
      { path: "entregas", loadComponent: () => import("./chunk-N6CITLZN.js").then((m) => m.DeliveriesComponent) },
      { path: "entregas/nova", loadComponent: () => import("./chunk-46I3XKVJ.js").then((m) => m.NewDeliveryComponent) },
      { path: "avisos", loadComponent: () => import("./chunk-BGWUYLR2.js").then((m) => m.AnnouncementsComponent) },
      { path: "ocorrencias", loadComponent: () => import("./chunk-XBQWBDZA.js").then((m) => m.OccurrencesComponent) },
      { path: "ocorrencias/nova", loadComponent: () => import("./chunk-I3UV5NQM.js").then((m) => m.NewOccurrenceComponent) }
    ]
  },
  { path: "**", redirectTo: "home" }
];

// apps/porteiro/src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding())
  ]
};

// apps/porteiro/src/main.ts
bootstrapApplication(AppShellComponent, appConfig).catch(console.error);
//# sourceMappingURL=main.js.map
