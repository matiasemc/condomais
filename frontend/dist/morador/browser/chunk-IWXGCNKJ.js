import {
  AuthService,
  AuthState
} from "./chunk-35HAV5GM.js";
import "./chunk-22JHDSMV.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-RE6VNHJT.js";
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
} from "./chunk-QFVHJJPM.js";

// apps/morador/src/app/features/auth/login.component.ts
function LoginComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["cm-login"]], decls: 11, vars: 5, consts: [[1, "login"], [1, "login__card"], [1, "login__title"], [1, "login__subtitle"], [1, "login__error"], ["type", "email", "placeholder", "E-mail", 1, "login__input", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "Senha", 1, "login__input", 3, "ngModelChange", "ngModel"], [1, "login__btn", "login__btn--accent", 3, "click", "disabled"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "CondoMais");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, "\xC1rea do Morador");
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, LoginComponent_Conditional_6_Template, 2, 1, "p", 4);
        \u0275\u0275elementStart(7, "input", 5);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_7_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 7);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_9_listener() {
          return ctx.login();
        });
        \u0275\u0275text(10);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.state.error() ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.state.isLoading());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.state.isLoading() ? "Aguarde\u2026" : "Entrar", " ");
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.login[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: var(--s-9) var(--s-6) var(--s-8);\n  background: var(--c-bg);\n}\n.login__hero[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.login__eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-4);\n}\n.login__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 48px;\n  font-weight: 400;\n  line-height: 1.05;\n  letter-spacing: -1px;\n  color: var(--c-text);\n  margin: 0;\n}\n.login__title[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: var(--c-accent);\n}\n.login__form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.login__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.login__label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--c-text-muted);\n}\n.login__input[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-md);\n  padding: var(--s-3) var(--s-4);\n  font-family: var(--font-sans);\n  font-size: 15px;\n  color: var(--c-text);\n  outline: none;\n}\n.login__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--c-accent);\n}\n/*# sourceMappingURL=login.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "cm-login", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [FormsModule], template: '<div class="login">\n  <div class="login__card">\n    <h1 class="login__title">CondoMais</h1>\n    <p class="login__subtitle">\xC1rea do Morador</p>\n    @if (state.error()) {\n      <p class="login__error">{{ state.error() }}</p>\n    }\n    <input class="login__input" type="email" [(ngModel)]="email" placeholder="E-mail" />\n    <input class="login__input" type="password" [(ngModel)]="password" placeholder="Senha" />\n    <button class="login__btn login__btn--accent" (click)="login()" [disabled]="state.isLoading()">\n      {{ state.isLoading() ? "Aguarde\u2026" : "Entrar" }}\n    </button>\n  </div>\n</div>', styles: ["/* apps/morador/src/app/features/auth/login.component.scss */\n.login {\n  min-height: 100dvh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: var(--s-9) var(--s-6) var(--s-8);\n  background: var(--c-bg);\n}\n.login__hero {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.login__eyebrow {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-4);\n}\n.login__title {\n  font-family: var(--font-serif);\n  font-size: 48px;\n  font-weight: 400;\n  line-height: 1.05;\n  letter-spacing: -1px;\n  color: var(--c-text);\n  margin: 0;\n}\n.login__title em {\n  font-style: italic;\n  color: var(--c-accent);\n}\n.login__form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.login__field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.login__label {\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--c-text-muted);\n}\n.login__input {\n  background: var(--c-card);\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-md);\n  padding: var(--s-3) var(--s-4);\n  font-family: var(--font-sans);\n  font-size: 15px;\n  color: var(--c-text);\n  outline: none;\n}\n.login__input:focus {\n  border-color: var(--c-accent);\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "apps/morador/src/app/features/auth/login.component.ts", lineNumber: 9 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-IWXGCNKJ.js.map
