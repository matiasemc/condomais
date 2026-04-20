import {
  authGuard,
  provideCore,
  roleGuard,
  tenantGuard
} from "./chunk-3HOKBTYV.js";
import {
  Component,
  RouterOutlet,
  bootstrapApplication,
  provideRouter,
  provideZoneChangeDetection,
  setClassMetadata,
  withComponentInputBinding,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-EEZDSBZ6.js";

// apps/admin/src/app/app.component.ts
var AppComponent = class _AppComponent {
  static {
    this.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["cm-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
      }
    }, dependencies: [RouterOutlet], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "cm-root", standalone: true, imports: [RouterOutlet], template: "<router-outlet></router-outlet>" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "apps/admin/src/app/app.component.ts", lineNumber: 3 });
})();

// apps/admin/src/environments/environment.ts
var environment = {
  production: true,
  supabaseUrl: "https://qhujhbrzvufoxlhtbqbt.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodWpoYnJ6dnVmb3hsaHRicWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MzQwMDMsImV4cCI6MjA5MjIxMDAwM30.aWEi_SIFaCF4JZaWBHziWor5vQEyUoVaujicDo4dXVA"
};

// apps/admin/src/app/app.routes.ts
var routes = [
  { path: "login", loadComponent: () => import("./chunk-JFPDUOEL.js").then((m) => m.LoginComponent) },
  { path: "tenant-select", loadComponent: () => import("./chunk-MOJZJAZY.js").then((m) => m.TenantSelectComponent), canActivate: [authGuard] },
  { path: "unauthorized", loadComponent: () => import("./chunk-6KMI5QQU.js").then((m) => m.UnauthorizedComponent) },
  {
    path: "",
    canActivate: [authGuard, tenantGuard, roleGuard(["SINDICO", "CONSELHO"])],
    loadComponent: () => import("./chunk-BUXZ4G7Y.js").then((m) => m.ShellComponent),
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", loadComponent: () => import("./chunk-7OC7IA4N.js").then((m) => m.DashboardComponent) }
    ]
  },
  { path: "**", redirectTo: "dashboard" }
];

// apps/admin/src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideCore({ supabaseUrl: environment.supabaseUrl, supabaseAnonKey: environment.supabaseAnonKey })
  ]
};

// apps/admin/src/main.ts
bootstrapApplication(AppComponent, appConfig).catch(console.error);
//# sourceMappingURL=main.js.map
