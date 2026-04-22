import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-HU5EJLJG.js";
import {
  AuthService,
  AuthState
} from "./chunk-R2RNB5Q2.js";
import "./chunk-FLR37CX6.js";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-H3ZFOGTY.js";

// apps/master-admin/src/app/features/login/login.component.ts
function LoginComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.state.error());
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.state = inject(AuthState);
    this.email = "";
    this.password = "";
  }
  login() {
    this.auth.login(this.email, this.password);
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["cm-login"]], decls: 9, vars: 5, consts: [[1, "login-wrap"], [1, "login-card"], [1, "login-title"], [1, "login-error"], ["type", "email", "placeholder", "E-mail", 1, "login-input", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "Senha", 1, "login-input", 3, "ngModelChange", "ngModel"], [1, "login-btn", 3, "click", "disabled"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Master Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, LoginComponent_Conditional_4_Template, 2, 1, "p", 3);
        \u0275\u0275elementStart(5, "input", 4);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_5_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "input", 5);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_6_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 6);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_7_listener() {
          return ctx.login();
        });
        \u0275\u0275text(8);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.state.error() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.state.isLoading());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.state.isLoading() ? "Aguarde\u2026" : "Entrar", " ");
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.login-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  background: #f4f4f4;\n}\n.login-card[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 40px;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-width: 320px;\n}\n.login-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 22px;\n  font-weight: 700;\n}\n.login-input[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border: 1.5px solid #ddd;\n  border-radius: 8px;\n  font-size: 15px;\n}\n.login-btn[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: #1C1A14;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 15px;\n  cursor: pointer;\n}\n.login-error[_ngcontent-%COMP%] {\n  color: #c0392b;\n  font-size: 13px;\n  margin: 0;\n}\n/*# sourceMappingURL=login.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "cm-login", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [FormsModule], template: `
    <div class="login-wrap">
      <div class="login-card">
        <h1 class="login-title">Master Admin</h1>
        @if (state.error()) { <p class="login-error">{{ state.error() }}</p> }
        <input class="login-input" type="email" [(ngModel)]="email" placeholder="E-mail" />
        <input class="login-input" type="password" [(ngModel)]="password" placeholder="Senha" />
        <button class="login-btn" (click)="login()" [disabled]="state.isLoading()">
          {{ state.isLoading() ? "Aguarde\u2026" : "Entrar" }}
        </button>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;5d6023e019de4309dd23453e0c244341a54bb0a17701e57efb7921635c8ee212;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/master-admin/src/app/features/login/login.component.ts */\n.login-wrap {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  background: #f4f4f4;\n}\n.login-card {\n  background: #fff;\n  padding: 40px;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-width: 320px;\n}\n.login-title {\n  margin: 0;\n  font-size: 22px;\n  font-weight: 700;\n}\n.login-input {\n  padding: 10px 14px;\n  border: 1.5px solid #ddd;\n  border-radius: 8px;\n  font-size: 15px;\n}\n.login-btn {\n  padding: 12px;\n  background: #1C1A14;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 15px;\n  cursor: pointer;\n}\n.login-error {\n  color: #c0392b;\n  font-size: 13px;\n  margin: 0;\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "apps/master-admin/src/app/features/login/login.component.ts", lineNumber: 30 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-IAY7YYNS.js.map
