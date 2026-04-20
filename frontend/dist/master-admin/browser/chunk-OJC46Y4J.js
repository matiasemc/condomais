import {
  AuthService,
  AuthState
} from "./chunk-LOOFCIPP.js";
import {
  ChangeDetectionStrategy,
  Component,
  RouterOutlet,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext
} from "./chunk-R2PYOJAQ.js";

// apps/master-admin/src/app/layout/shell.component.ts
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShellComponent, selectors: [["cm-shell"]], decls: 8, vars: 0, consts: [[1, "shell"], [1, "shell__header"], [1, "shell__logo"], [1, "shell__logout", 3, "click"], [1, "shell__main"]], template: function ShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "span", 2);
        \u0275\u0275text(3, "CondoMais \xB7 Master Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function ShellComponent_Template_button_click_4_listener() {
          return ctx.auth.logout();
        });
        \u0275\u0275text(5, "Sair");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "main", 4);
        \u0275\u0275element(7, "router-outlet");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [RouterOutlet], styles: ["\n\n.shell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.shell__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  background: #1C1A14;\n  color: #fff;\n}\n.shell__logo[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 16px;\n}\n.shell__logout[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid rgba(255, 255, 255, .3);\n  color: #fff;\n  padding: 6px 12px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.shell__main[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 24px;\n}\n/*# sourceMappingURL=shell.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellComponent, [{
    type: Component,
    args: [{ selector: "cm-shell", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterOutlet], template: `
    <div class="shell">
      <header class="shell__header">
        <span class="shell__logo">CondoMais \xB7 Master Admin</span>
        <button class="shell__logout" (click)="auth.logout()">Sair</button>
      </header>
      <main class="shell__main"><router-outlet></router-outlet></main>
    </div>
  `, styles: ["/* angular:styles/component:css;1ed20d334d6cdd461b515a02f065e78d6c4be98b99c2fcb84e7bc4c5e1b8a9bd;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/master-admin/src/app/layout/shell.component.ts */\n.shell {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.shell__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  background: #1C1A14;\n  color: #fff;\n}\n.shell__logo {\n  font-weight: 700;\n  font-size: 16px;\n}\n.shell__logout {\n  background: none;\n  border: 1px solid rgba(255, 255, 255, .3);\n  color: #fff;\n  padding: 6px 12px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.shell__main {\n  flex: 1;\n  padding: 24px;\n}\n/*# sourceMappingURL=shell.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShellComponent, { className: "ShellComponent", filePath: "apps/master-admin/src/app/layout/shell.component.ts", lineNumber: 25 });
})();
export {
  ShellComponent
};
//# sourceMappingURL=chunk-OJC46Y4J.js.map
