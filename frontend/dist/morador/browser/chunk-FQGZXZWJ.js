import {
  ToastService
} from "./chunk-DGSLDQQ5.js";
import {
  ButtonComponent,
  ToggleComponent
} from "./chunk-VUTJB2DO.js";
import "./chunk-RE6VNHJT.js";
import {
  ChangeDetectionStrategy,
  Component,
  Location,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QFVHJJPM.js";

// apps/morador/src/app/features/profile/google-integrations.component.ts
function GoogleIntegrationsComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "p", 13);
    \u0275\u0275text(2, "Preferencias");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 14)(4, "div", 15)(5, "div")(6, "p", 16);
    \u0275\u0275text(7, "Google Calendar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 17);
    \u0275\u0275text(9, "Sincronizar reservas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "cm-toggle", 18);
    \u0275\u0275listener("toggled", function GoogleIntegrationsComponent_Conditional_17_Template_cm_toggle_toggled_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.calendar.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 15)(12, "div")(13, "p", 16);
    \u0275\u0275text(14, "E-mail \u2014 Entregas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 17);
    \u0275\u0275text(16, "Notificacoes de entrega");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "cm-toggle", 18);
    \u0275\u0275listener("toggled", function GoogleIntegrationsComponent_Conditional_17_Template_cm_toggle_toggled_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.emailDelivery.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 15)(19, "div")(20, "p", 16);
    \u0275\u0275text(21, "E-mail \u2014 Reservas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 17);
    \u0275\u0275text(23, "Confirmacoes de reserva");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "cm-toggle", 18);
    \u0275\u0275listener("toggled", function GoogleIntegrationsComponent_Conditional_17_Template_cm_toggle_toggled_24_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.emailReservation.set($event));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("checked", ctx_r1.calendar());
    \u0275\u0275advance(7);
    \u0275\u0275property("checked", ctx_r1.emailDelivery());
    \u0275\u0275advance(7);
    \u0275\u0275property("checked", ctx_r1.emailReservation());
  }
}
var GoogleIntegrationsComponent = class _GoogleIntegrationsComponent {
  constructor() {
    this.location = inject(Location);
    this.toast = inject(ToastService);
    this.connected = signal(false);
    this.calendar = signal(true);
    this.emailDelivery = signal(true);
    this.emailReservation = signal(true);
  }
  toggleConnect() {
    this.connected.update((v) => !v);
    this.toast.show({ message: this.connected() ? "Google conectado!" : "Google desconectado", duration: 2e3 });
  }
  static {
    this.\u0275fac = function GoogleIntegrationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _GoogleIntegrationsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GoogleIntegrationsComponent, selectors: [["cm-google-integrations"]], decls: 18, vars: 4, consts: [[1, "page"], [1, "page__header"], [1, "back-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M19 12H5m0 0l7 7m-7-7l7-7"], [1, "page__title"], [1, "connect-card"], [1, "connect-card__logo"], [1, "connect-card__info"], [1, "connect-card__title"], [1, "connect-card__sub"], ["size", "sm", 3, "clicked", "variant"], [1, "prefs"], [1, "prefs__label"], [1, "pref-list"], [1, "pref-row"], [1, "pref-row__title"], [1, "pref-row__sub"], [3, "toggled", "checked"]], template: function GoogleIntegrationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
        \u0275\u0275listener("click", function GoogleIntegrationsComponent_Template_button_click_2_listener() {
          return ctx.location.back();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "path", 4);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(5, "h1", 5);
        \u0275\u0275text(6, "Integracoes Google");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 6)(8, "div", 7);
        \u0275\u0275text(9, "G");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 8)(11, "p", 9);
        \u0275\u0275text(12, "Google Account");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "p", 10);
        \u0275\u0275text(14);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "cm-button", 11);
        \u0275\u0275listener("clicked", function GoogleIntegrationsComponent_Template_cm_button_clicked_15_listener() {
          return ctx.toggleConnect();
        });
        \u0275\u0275text(16);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(17, GoogleIntegrationsComponent_Conditional_17_Template, 25, 3, "div", 12);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(14);
        \u0275\u0275textInterpolate(ctx.connected() ? "Conectado" : "Desconectado");
        \u0275\u0275advance();
        \u0275\u0275property("variant", ctx.connected() ? "ghost" : "accent");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.connected() ? "Desconectar" : "Conectar", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.connected() ? 17 : -1);
      }
    }, dependencies: [ToggleComponent, ButtonComponent], styles: ["\n\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-4);\n  padding: var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 400;\n  margin: 0;\n}\n.back-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--r-sm);\n  border: 1px solid var(--c-border);\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--c-text);\n}\n.connect-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-4);\n  padding: var(--s-5);\n  margin: var(--s-5);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  border: 1px solid var(--c-border);\n}\n.connect-card__logo[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: #4285F4;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-serif);\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.connect-card__info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.connect-card__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.connect-card__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.prefs[_ngcontent-%COMP%] {\n  padding: 0 var(--s-5);\n}\n.prefs__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.pref-list[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n  border: 1px solid var(--c-border);\n}\n.pref-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n}\n.pref-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.pref-row__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.pref-row__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=google-integrations.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GoogleIntegrationsComponent, [{
    type: Component,
    args: [{ selector: "cm-google-integrations", standalone: true, imports: [ToggleComponent, ButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page">
  <div class="page__header">
    <button class="back-btn" (click)="location.back()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
    </button>
    <h1 class="page__title">Integracoes Google</h1>
  </div>
  <div class="connect-card">
    <div class="connect-card__logo">G</div>
    <div class="connect-card__info">
      <p class="connect-card__title">Google Account</p>
      <p class="connect-card__sub">{{ connected() ? 'Conectado' : 'Desconectado' }}</p>
    </div>
    <cm-button [variant]="connected() ? 'ghost' : 'accent'" size="sm" (clicked)="toggleConnect()">
      {{ connected() ? 'Desconectar' : 'Conectar' }}
    </cm-button>
  </div>
  @if (connected()) {
    <div class="prefs">
      <p class="prefs__label">Preferencias</p>
      <div class="pref-list">
        <div class="pref-row">
          <div><p class="pref-row__title">Google Calendar</p><p class="pref-row__sub">Sincronizar reservas</p></div>
          <cm-toggle [checked]="calendar()" (toggled)="calendar.set($event)"></cm-toggle>
        </div>
        <div class="pref-row">
          <div><p class="pref-row__title">E-mail \u2014 Entregas</p><p class="pref-row__sub">Notificacoes de entrega</p></div>
          <cm-toggle [checked]="emailDelivery()" (toggled)="emailDelivery.set($event)"></cm-toggle>
        </div>
        <div class="pref-row">
          <div><p class="pref-row__title">E-mail \u2014 Reservas</p><p class="pref-row__sub">Confirmacoes de reserva</p></div>
          <cm-toggle [checked]="emailReservation()" (toggled)="emailReservation.set($event)"></cm-toggle>
        </div>
      </div>
    </div>
  }
</div>`, styles: ["/* apps/morador/src/app/features/profile/google-integrations.component.scss */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  display: flex;\n  align-items: center;\n  gap: var(--s-4);\n  padding: var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 400;\n  margin: 0;\n}\n.back-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--r-sm);\n  border: 1px solid var(--c-border);\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--c-text);\n}\n.connect-card {\n  display: flex;\n  align-items: center;\n  gap: var(--s-4);\n  padding: var(--s-5);\n  margin: var(--s-5);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  border: 1px solid var(--c-border);\n}\n.connect-card__logo {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: #4285F4;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-serif);\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.connect-card__info {\n  flex: 1;\n}\n.connect-card__title {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.connect-card__sub {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.prefs {\n  padding: 0 var(--s-5);\n}\n.prefs__label {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.pref-list {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n  border: 1px solid var(--c-border);\n}\n.pref-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n}\n.pref-row:last-child {\n  border-bottom: none;\n}\n.pref-row__title {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.pref-row__sub {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=google-integrations.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GoogleIntegrationsComponent, { className: "GoogleIntegrationsComponent", filePath: "apps/morador/src/app/features/profile/google-integrations.component.ts", lineNumber: 15 });
})();
export {
  GoogleIntegrationsComponent
};
//# sourceMappingURL=chunk-FQGZXZWJ.js.map
