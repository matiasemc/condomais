import {
  authGuard,
  provideCore
} from "./chunk-LOOFCIPP.js";
import {
  Component,
  RouterOutlet,
  bootstrapApplication,
  provideRouter,
  provideZoneChangeDetection,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-R2PYOJAQ.js";

// apps/master-admin/src/app/app.component.ts
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
    args: [{
      selector: "cm-root",
      standalone: true,
      imports: [RouterOutlet],
      template: "<router-outlet></router-outlet>"
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "apps/master-admin/src/app/app.component.ts", lineNumber: 10 });
})();

// apps/master-admin/src/environments/environment.ts
var environment = {
  production: true,
  supabaseUrl: "https://qhujhbrzvufoxlhtbqbt.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFodWpoYnJ6dnVmb3hsaHRicWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MzQwMDMsImV4cCI6MjA5MjIxMDAwM30.aWEi_SIFaCF4JZaWBHziWor5vQEyUoVaujicDo4dXVA"
};

// apps/master-admin/src/app/app.routes.ts
var routes = [
  { path: "login", loadComponent: () => import("./chunk-FNPFKXPH.js").then((m) => m.LoginComponent) },
  { path: "unauthorized", loadComponent: () => import("./chunk-JU75HMSQ.js").then((m) => m.UnauthorizedComponent) },
  {
    path: "",
    canActivate: [authGuard],
    loadComponent: () => import("./chunk-OJC46Y4J.js").then((m) => m.ShellComponent),
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", loadComponent: () => import("./chunk-MRK3JJFB.js").then((m) => m.DashboardComponent) }
    ]
  },
  { path: "**", redirectTo: "dashboard" }
];

// apps/master-admin/src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideCore({ supabaseUrl: environment.supabaseUrl, supabaseAnonKey: environment.supabaseAnonKey })
  ]
};

// apps/master-admin/src/main.ts
bootstrapApplication(AppComponent, appConfig).catch(console.error);
//# sourceMappingURL=main.js.map
