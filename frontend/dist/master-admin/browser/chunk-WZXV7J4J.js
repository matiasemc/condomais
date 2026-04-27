import {
  AppHeaderComponent,
  AuthState
} from "./chunk-J3ADYAXG.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-JVS6PAVK.js";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtext
} from "./chunk-TZP2ZEHH.js";

// apps/master-admin/src/app/layout/shell.component.ts
var _c0 = () => ({ exact: true });
var ShellComponent = class _ShellComponent {
  constructor() {
    this.state = inject(AuthState);
  }
  static {
    this.\u0275fac = function ShellComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ShellComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShellComponent, selectors: [["cm-shell"]], decls: 12, vars: 2, consts: [[1, "shell"], ["routerLink", "/dashboard", "routerLinkActive", "active", 3, "routerLinkActiveOptions"], ["routerLink", "/tenants", "routerLinkActive", "active"], ["routerLink", "/users", "routerLinkActive", "active"], ["routerLink", "/plans", "routerLinkActive", "active"], [1, "shell__main"]], template: function ShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "cm-app-header")(2, "a", 1);
        \u0275\u0275text(3, "Painel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 2);
        \u0275\u0275text(5, "Tenants");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "a", 3);
        \u0275\u0275text(7, "Usu\xE1rios");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "a", 4);
        \u0275\u0275text(9, "Planos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "main", 5);
        \u0275\u0275element(11, "router-outlet");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(1, _c0));
      }
    }, dependencies: [RouterLink, RouterLinkActive, RouterOutlet, AppHeaderComponent], styles: ["\n.shell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: #f8f9fa;\n}\n.shell__main[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 28px 24px;\n  max-width: 1300px;\n  width: 100%;\n  margin: 0 auto;\n  box-sizing: border-box;\n}\n@media (max-width: 768px) {\n  .shell__main[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=shell.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellComponent, [{
    type: Component,
    args: [{ selector: "cm-shell", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, RouterLinkActive, RouterOutlet, AppHeaderComponent], template: `
    <div class="shell">
      <cm-app-header>
        <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Painel</a>
        <a routerLink="/tenants"   routerLinkActive="active">Tenants</a>
        <a routerLink="/users"     routerLinkActive="active">Usu\xE1rios</a>
        <a routerLink="/plans"     routerLinkActive="active">Planos</a>
      </cm-app-header>
      <main class="shell__main"><router-outlet></router-outlet></main>
    </div>
  `, styles: ["/* angular:styles/component:css;ed18ea0b016c490d7a14a87dfbcad444b617ab65133863ecd43b0e5505e09508;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/master-admin/src/app/layout/shell.component.ts */\n.shell {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: #f8f9fa;\n}\n.shell__main {\n  flex: 1;\n  padding: 28px 24px;\n  max-width: 1300px;\n  width: 100%;\n  margin: 0 auto;\n  box-sizing: border-box;\n}\n@media (max-width: 768px) {\n  .shell__main {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=shell.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShellComponent, { className: "ShellComponent", filePath: "apps/master-admin/src/app/layout/shell.component.ts", lineNumber: 27 });
})();
export {
  ShellComponent
};
//# sourceMappingURL=chunk-WZXV7J4J.js.map
