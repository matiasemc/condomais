import {
  Router
} from "./chunk-IEQM2DAI.js";
import {
  ButtonComponent,
  ChangeDetectionStrategy,
  Component,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-ZWQ7U6HY.js";

// apps/porteiro/src/app/features/auth/login.component.ts
var LoginComponent = class _LoginComponent {
  constructor(router) {
    this.router = router;
    this.user = "";
    this.senha = "";
  }
  entrar() {
    this.router.navigate(["/home"]);
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["cm-porteiro-login"]], decls: 14, vars: 2, consts: [[1, "login"], [1, "login__hero"], [1, "login__badge"], [1, "login__title"], [1, "login__form"], ["type", "text", "placeholder", "Usuario", 1, "login__input", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "Senha", 1, "login__input", 3, "ngModelChange", "ngModel"], ["variant", "accent", "size", "lg", 2, "width", "100%", 3, "clicked"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275text(3, "Portaria");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "Condomais");
        \u0275\u0275element(6, "br");
        \u0275\u0275elementStart(7, "em");
        \u0275\u0275text(8, "Portaria");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "div", 4)(10, "input", 5);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_10_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.user, $event) || (ctx.user = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_11_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.senha, $event) || (ctx.senha = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "cm-button", 7);
        \u0275\u0275listener("clicked", function LoginComponent_Template_cm_button_clicked_12_listener() {
          return ctx.entrar();
        });
        \u0275\u0275text(13, "Entrar");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275twoWayProperty("ngModel", ctx.user);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.senha);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, ButtonComponent], styles: ["\n\n.login[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: var(--s-9) var(--s-6) var(--s-8);\n}\n.login__hero[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.login__badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: var(--s-1) var(--s-3);\n  background: var(--c-accent-soft);\n  color: var(--c-accent-dark);\n  border-radius: var(--r-pill);\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-bottom: var(--s-4);\n  width: fit-content;\n}\n.login__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 44px;\n  font-weight: 400;\n  line-height: 1.05;\n  letter-spacing: -1px;\n  margin: 0;\n}\n.login__title[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: var(--c-accent);\n}\n.login__form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.login__input[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-md);\n  padding: var(--s-3) var(--s-4);\n  font-family: var(--font-sans);\n  font-size: 15px;\n  color: var(--c-text);\n  outline: none;\n}\n.login__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--c-accent);\n}\n/*# sourceMappingURL=login.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "cm-porteiro-login", standalone: true, imports: [FormsModule, ButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="login">
      <div class="login__hero">
        <div class="login__badge">Portaria</div>
        <h1 class="login__title">Condomais<br/><em>Portaria</em></h1>
      </div>
      <div class="login__form">
        <input class="login__input" type="text"   placeholder="Usuario" [(ngModel)]="user"/>
        <input class="login__input" type="password" placeholder="Senha" [(ngModel)]="senha"/>
        <cm-button variant="accent" size="lg" style="width:100%" (clicked)="entrar()">Entrar</cm-button>
      </div>
    </div>
  `, styles: ["/* apps/porteiro/src/app/features/auth/login.component.scss */\n.login {\n  min-height: 100dvh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: var(--s-9) var(--s-6) var(--s-8);\n}\n.login__hero {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.login__badge {\n  display: inline-flex;\n  padding: var(--s-1) var(--s-3);\n  background: var(--c-accent-soft);\n  color: var(--c-accent-dark);\n  border-radius: var(--r-pill);\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-bottom: var(--s-4);\n  width: fit-content;\n}\n.login__title {\n  font-family: var(--font-serif);\n  font-size: 44px;\n  font-weight: 400;\n  line-height: 1.05;\n  letter-spacing: -1px;\n  margin: 0;\n}\n.login__title em {\n  font-style: italic;\n  color: var(--c-accent);\n}\n.login__form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.login__input {\n  background: var(--c-card);\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-md);\n  padding: var(--s-3) var(--s-4);\n  font-family: var(--font-sans);\n  font-size: 15px;\n  color: var(--c-text);\n  outline: none;\n}\n.login__input:focus {\n  border-color: var(--c-accent);\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "apps/porteiro/src/app/features/auth/login.component.ts", lineNumber: 26 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-TFC3QION.js.map
