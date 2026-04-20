import {
  AuthService,
  AuthState
} from "./chunk-3HOKBTYV.js";
import {
  ChangeDetectionStrategy,
  Component,
  RouterOutlet,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-EEZDSBZ6.js";

// apps/admin/src/app/layout/shell.component.ts
var ShellComponent = class _ShellComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.state = inject(AuthState);
  }
  static {
    this.\u0275fac = function ShellComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ShellComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShellComponent, selectors: [["cm-admin-shell"]], decls: 10, vars: 1, consts: [[1, "s"], [1, "h"], [3, "click"]], template: function ShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "b");
        \u0275\u0275text(3, "CondoMais Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span");
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "button", 2);
        \u0275\u0275listener("click", function ShellComponent_Template_button_click_6_listener() {
          return ctx.auth.logout();
        });
        \u0275\u0275text(7, "Sair");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "main");
        \u0275\u0275element(9, "router-outlet");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate((tmp_0_0 = ctx.state.currentTenant()) == null ? null : tmp_0_0.nome);
      }
    }, dependencies: [RouterOutlet], styles: ["\n\n.s[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.h[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 24px;\n  background: #2d6a4f;\n  color: #fff;\n}\nb[_ngcontent-%COMP%] {\n  flex: 1;\n}\nmain[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n/*# sourceMappingURL=shell.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellComponent, [{
    type: Component,
    args: [{ selector: "cm-admin-shell", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterOutlet], template: `<div class='s'><header class='h'><b>CondoMais Admin</b><span>{{ state.currentTenant()?.nome }}</span><button (click)='auth.logout()'>Sair</button></header><main><router-outlet></router-outlet></main></div>`, styles: ["/* angular:styles/component:css;32e50b8bba5d1d2c2ea20b6f81a9171903ca333bf2eab8ff481eb98e4c7aaa6d;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/admin/src/app/layout/shell.component.ts */\n.s {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.h {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 24px;\n  background: #2d6a4f;\n  color: #fff;\n}\nb {\n  flex: 1;\n}\nmain {\n  padding: 24px;\n}\n/*# sourceMappingURL=shell.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShellComponent, { className: "ShellComponent", filePath: "apps/admin/src/app/layout/shell.component.ts", lineNumber: 9 });
})();
export {
  ShellComponent
};
//# sourceMappingURL=chunk-BUXZ4G7Y.js.map
