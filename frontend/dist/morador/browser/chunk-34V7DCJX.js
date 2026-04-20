import {
  Router
} from "./chunk-N6N7VLCZ.js";
import {
  ButtonComponent,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-3MTEG4YI.js";
import {
  ChangeDetectionStrategy,
  Component,
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
} from "./chunk-KKC7QRLW.js";

// apps/morador/src/app/features/auth/login.component.ts
var LoginComponent = class _LoginComponent {
  constructor(router) {
    this.router = router;
    this.email = "";
    this.senha = "";
  }
  entrar() {
    localStorage.setItem("cm_logged", "1");
    this.router.navigate(["/home"]);
  }
  whatsapp() {
    this.entrar();
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["cm-login"]], decls: 23, vars: 2, consts: [[1, "login"], [1, "login__hero"], [1, "login__eyebrow"], [1, "login__title"], [1, "login__form"], [1, "login__field"], [1, "login__label"], ["type", "email", "placeholder", "seu@email.com", 1, "login__input", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "login__input", 3, "ngModelChange", "ngModel"], ["variant", "accent", "size", "lg", 2, "width", "100%", 3, "clicked"], ["variant", "whatsapp", "size", "md", 2, "width", "100%", 3, "clicked"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "p", 2);
        \u0275\u0275text(3, "A melhor plataforma para seu condom\xEDnio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "Bem-vindo");
        \u0275\u0275element(6, "br");
        \u0275\u0275text(7, "ao ");
        \u0275\u0275elementStart(8, "em");
        \u0275\u0275text(9, "Condomais");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "label", 6);
        \u0275\u0275text(13, "E-mail");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 5)(16, "label", 6);
        \u0275\u0275text(17, "Senha");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_18_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.senha, $event) || (ctx.senha = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "cm-button", 9);
        \u0275\u0275listener("clicked", function LoginComponent_Template_cm_button_clicked_19_listener() {
          return ctx.entrar();
        });
        \u0275\u0275text(20, " Entrar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "cm-button", 10);
        \u0275\u0275listener("clicked", function LoginComponent_Template_cm_button_clicked_21_listener() {
          return ctx.whatsapp();
        });
        \u0275\u0275text(22, " Entrar com WhatsApp ");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(14);
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.senha);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, ButtonComponent], styles: ["\n\n.login[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: var(--s-9) var(--s-6) var(--s-8);\n  background: var(--c-bg);\n}\n.login__hero[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.login__eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-4);\n}\n.login__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 48px;\n  font-weight: 400;\n  line-height: 1.05;\n  letter-spacing: -1px;\n  color: var(--c-text);\n  margin: 0;\n}\n.login__title[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: var(--c-accent);\n}\n.login__form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.login__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.login__label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--c-text-muted);\n}\n.login__input[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-md);\n  padding: var(--s-3) var(--s-4);\n  font-family: var(--font-sans);\n  font-size: 15px;\n  color: var(--c-text);\n  outline: none;\n}\n.login__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--c-accent);\n}\n/*# sourceMappingURL=login.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "cm-login", standalone: true, imports: [FormsModule, ButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="login">
      <div class="login__hero">
        <p class="login__eyebrow">A melhor plataforma para seu condom\xEDnio</p>
        <h1 class="login__title">Bem-vindo<br/>ao <em>Condomais</em></h1>
      </div>

      <div class="login__form">
        <div class="login__field">
          <label class="login__label">E-mail</label>
          <input class="login__input" type="email" [(ngModel)]="email" placeholder="seu@email.com"/>
        </div>
        <div class="login__field">
          <label class="login__label">Senha</label>
          <input class="login__input" type="password" [(ngModel)]="senha" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"/>
        </div>
        <cm-button variant="accent" size="lg" style="width:100%" (clicked)="entrar()">
          Entrar
        </cm-button>
        <cm-button variant="whatsapp" size="md" style="width:100%" (clicked)="whatsapp()">
          Entrar com WhatsApp
        </cm-button>
      </div>
    </div>
  `, styles: ["/* apps/morador/src/app/features/auth/login.component.scss */\n.login {\n  min-height: 100dvh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: var(--s-9) var(--s-6) var(--s-8);\n  background: var(--c-bg);\n}\n.login__hero {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.login__eyebrow {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-4);\n}\n.login__title {\n  font-family: var(--font-serif);\n  font-size: 48px;\n  font-weight: 400;\n  line-height: 1.05;\n  letter-spacing: -1px;\n  color: var(--c-text);\n  margin: 0;\n}\n.login__title em {\n  font-style: italic;\n  color: var(--c-accent);\n}\n.login__form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.login__field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.login__label {\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--c-text-muted);\n}\n.login__input {\n  background: var(--c-card);\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-md);\n  padding: var(--s-3) var(--s-4);\n  font-family: var(--font-sans);\n  font-size: 15px;\n  color: var(--c-text);\n  outline: none;\n}\n.login__input:focus {\n  border-color: var(--c-accent);\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "apps/morador/src/app/features/auth/login.component.ts", lineNumber: 38 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-34V7DCJX.js.map
