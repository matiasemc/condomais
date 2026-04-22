import {
  AuthService,
  AuthState
} from "./chunk-R2RNB5Q2.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-FLR37CX6.js";
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
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-H3ZFOGTY.js";

// apps/master-admin/src/app/layout/shell.component.ts
var _c0 = () => ({ exact: true });
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShellComponent, selectors: [["cm-shell"]], decls: 23, vars: 3, consts: [[1, "shell"], [1, "shell__header"], [1, "shell__brand"], [1, "shell__logo"], [1, "shell__badge"], [1, "shell__nav"], ["routerLink", "/dashboard", "routerLinkActive", "shell__nav-link--active", 1, "shell__nav-link", 3, "routerLinkActiveOptions"], ["routerLink", "/tenants", "routerLinkActive", "shell__nav-link--active", 1, "shell__nav-link"], ["routerLink", "/users", "routerLinkActive", "shell__nav-link--active", 1, "shell__nav-link"], ["routerLink", "/plans", "routerLinkActive", "shell__nav-link--active", 1, "shell__nav-link"], [1, "shell__right"], [1, "shell__user"], [1, "shell__logout", 3, "click"], [1, "shell__main"]], template: function ShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "b", 3);
        \u0275\u0275text(4, "CondoMais");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275text(6, "Master Admin");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "nav", 5)(8, "a", 6);
        \u0275\u0275text(9, "Painel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "a", 7);
        \u0275\u0275text(11, "Tenants");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "a", 8);
        \u0275\u0275text(13, "Usu\xE1rios");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "a", 9);
        \u0275\u0275text(15, "Planos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 10)(17, "span", 11);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "button", 12);
        \u0275\u0275listener("click", function ShellComponent_Template_button_click_19_listener() {
          return ctx.auth.logout();
        });
        \u0275\u0275text(20, "Sair");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "main", 13);
        \u0275\u0275element(22, "router-outlet");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        let tmp_1_0;
        \u0275\u0275advance(8);
        \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(2, _c0));
        \u0275\u0275advance(10);
        \u0275\u0275textInterpolate((tmp_1_0 = ctx.state.user()) == null ? null : tmp_1_0.email);
      }
    }, dependencies: [RouterLink, RouterLinkActive, RouterOutlet], styles: ["\n\n.shell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: #f8f9fa;\n}\n.shell__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n  padding: 12px 24px;\n  background: #1a1a2e;\n  color: #fff;\n}\n.shell__brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.shell__logo[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 16px;\n}\n.shell__badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  background: #e63946;\n  color: #fff;\n  padding: 2px 7px;\n  border-radius: 999px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.shell__nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n  flex: 1;\n}\n.shell__nav-link[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n  text-decoration: none;\n  font-size: 14px;\n  padding: 6px 12px;\n  border-radius: 6px;\n  transition: background 0.15s;\n}\n.shell__nav-link[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n}\n.shell__nav-link--active[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.15);\n  color: #fff;\n  font-weight: 600;\n}\n.shell__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-left: auto;\n}\n.shell__user[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: 0.6;\n}\n.shell__logout[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  color: #fff;\n  cursor: pointer;\n  padding: 5px 12px;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.shell__main[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 28px 24px;\n  max-width: 1300px;\n  width: 100%;\n  margin: 0 auto;\n  box-sizing: border-box;\n}\n@media (max-width: 768px) {\n  .shell__nav-link[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: 5px 8px;\n  }\n  .shell__main[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=shell.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellComponent, [{
    type: Component,
    args: [{ selector: "cm-shell", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, RouterLinkActive, RouterOutlet], template: `
    <div class="shell">
      <header class="shell__header">
        <div class="shell__brand">
          <b class="shell__logo">CondoMais</b>
          <span class="shell__badge">Master Admin</span>
        </div>
        <nav class="shell__nav">
          <a class="shell__nav-link" routerLink="/dashboard" routerLinkActive="shell__nav-link--active" [routerLinkActiveOptions]="{exact:true}">Painel</a>
          <a class="shell__nav-link" routerLink="/tenants"   routerLinkActive="shell__nav-link--active">Tenants</a>
          <a class="shell__nav-link" routerLink="/users"     routerLinkActive="shell__nav-link--active">Usu\xE1rios</a>
          <a class="shell__nav-link" routerLink="/plans"     routerLinkActive="shell__nav-link--active">Planos</a>
        </nav>
        <div class="shell__right">
          <span class="shell__user">{{ state.user()?.email }}</span>
          <button class="shell__logout" (click)="auth.logout()">Sair</button>
        </div>
      </header>
      <main class="shell__main"><router-outlet></router-outlet></main>
    </div>
  `, styles: ["/* angular:styles/component:css;a8a0d35bf07747474c103cd6b73e2cde6ee5289b2a25dd222ac8ecbdbaa0fb5e;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/master-admin/src/app/layout/shell.component.ts */\n.shell {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background: #f8f9fa;\n}\n.shell__header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n  padding: 12px 24px;\n  background: #1a1a2e;\n  color: #fff;\n}\n.shell__brand {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.shell__logo {\n  font-weight: 700;\n  font-size: 16px;\n}\n.shell__badge {\n  font-size: 10px;\n  background: #e63946;\n  color: #fff;\n  padding: 2px 7px;\n  border-radius: 999px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.shell__nav {\n  display: flex;\n  gap: 2px;\n  flex: 1;\n}\n.shell__nav-link {\n  color: rgba(255, 255, 255, 0.7);\n  text-decoration: none;\n  font-size: 14px;\n  padding: 6px 12px;\n  border-radius: 6px;\n  transition: background 0.15s;\n}\n.shell__nav-link:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n}\n.shell__nav-link--active {\n  background: rgba(255, 255, 255, 0.15);\n  color: #fff;\n  font-weight: 600;\n}\n.shell__right {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-left: auto;\n}\n.shell__user {\n  font-size: 12px;\n  opacity: 0.6;\n}\n.shell__logout {\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  color: #fff;\n  cursor: pointer;\n  padding: 5px 12px;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.shell__main {\n  flex: 1;\n  padding: 28px 24px;\n  max-width: 1300px;\n  width: 100%;\n  margin: 0 auto;\n  box-sizing: border-box;\n}\n@media (max-width: 768px) {\n  .shell__nav-link {\n    font-size: 12px;\n    padding: 5px 8px;\n  }\n  .shell__main {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=shell.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShellComponent, { className: "ShellComponent", filePath: "apps/master-admin/src/app/layout/shell.component.ts", lineNumber: 51 });
})();
export {
  ShellComponent
};
//# sourceMappingURL=chunk-75YVUS75.js.map
