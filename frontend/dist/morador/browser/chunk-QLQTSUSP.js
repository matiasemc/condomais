import {
  ToastService
} from "./chunk-I2P65SBE.js";
import {
  BadgeComponent,
  ButtonComponent
} from "./chunk-3MTEG4YI.js";
import {
  ChangeDetectionStrategy,
  Component,
  Location,
  inject,
  input,
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
} from "./chunk-KKC7QRLW.js";

// apps/morador/src/app/features/deliveries/delivery-detail.component.ts
function DeliveryDetailComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "cm-button", 15);
    \u0275\u0275listener("clicked", function DeliveryDetailComponent_Conditional_30_Template_cm_button_clicked_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.marcarRetirada());
    });
    \u0275\u0275text(2, " Marcar como retirada ");
    \u0275\u0275elementEnd()();
  }
}
function DeliveryDetailComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 17);
    \u0275\u0275element(3, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Entrega retirada com sucesso!");
    \u0275\u0275elementEnd()();
  }
}
var DeliveryDetailComponent = class _DeliveryDetailComponent {
  constructor() {
    this.id = input("");
    this.location = inject(Location);
    this.toast = inject(ToastService);
    this.status = signal("pendente");
    this.remetente = "Mercado Livre";
    this.tipo = "Caixa pequena";
  }
  ngOnInit() {
  }
  marcarRetirada() {
    this.status.set("retirada");
    this.toast.show({ message: "\u2714 Marcada como retirada", icon: "\u2714", duration: 2400 });
    setTimeout(() => this.toast.show({ message: "\u2709 E-mail enviado ao morador", icon: "\u2709", duration: 2400 }), 2600);
  }
  static {
    this.\u0275fac = function DeliveryDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DeliveryDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeliveryDetailComponent, selectors: [["cm-delivery-detail"]], inputs: { id: [1, "id"] }, decls: 32, vars: 6, consts: [[1, "detail"], [1, "detail__back", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M19 12H5m0 0l7 7m-7-7l7-7"], [1, "detail__hero"], [1, "detail__package-icon"], [3, "variant"], [1, "detail__title"], [1, "detail__sub"], [1, "detail__info"], [1, "detail__row"], [1, "detail__label"], [1, "detail__value"], [1, "detail__actions"], [1, "detail__success"], ["variant", "accent", "size", "lg", 2, "width", "100%", 3, "clicked"], [1, "success-check"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-dasharray", "40", "stroke-dashoffset", "0"], ["d", "M20 6L9 17l-5-5"]], template: function DeliveryDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
        \u0275\u0275listener("click", function DeliveryDetailComponent_Template_button_click_1_listener() {
          return ctx.location.back();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(2, "svg", 2);
        \u0275\u0275element(3, "path", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275text(4, " Voltar ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(5, "div", 4)(6, "div", 5);
        \u0275\u0275text(7, "\u{1F4E6}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "cm-badge", 6);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "h1", 7);
        \u0275\u0275text(11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "p", 8);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 9)(15, "div", 10)(16, "span", 11);
        \u0275\u0275text(17, "Registrada em");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "span", 12);
        \u0275\u0275text(19, "Hoje, 14:32");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 10)(21, "span", 11);
        \u0275\u0275text(22, "Registrada por");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span", 12);
        \u0275\u0275text(24, "Rafael (porteiro)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "div", 10)(26, "span", 11);
        \u0275\u0275text(27, "Tipo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span", 12);
        \u0275\u0275text(29);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(30, DeliveryDetailComponent_Conditional_30_Template, 3, 0, "div", 13)(31, DeliveryDetailComponent_Conditional_31_Template, 6, 0, "div", 14);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("variant", ctx.status() === "pendente" ? "accent" : "success");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.status() === "pendente" ? "Aguardando retirada" : "Retirada", " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.remetente);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.tipo);
        \u0275\u0275advance(16);
        \u0275\u0275textInterpolate(ctx.tipo);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.status() === "pendente" ? 30 : 31);
      }
    }, dependencies: [ButtonComponent, BadgeComponent], styles: ["\n\n.detail[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-6);\n}\n.detail__back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__hero[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: var(--s-3);\n}\n.detail__package-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n}\n.detail__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__sub[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.detail__info[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n  border: 1px solid var(--c-border);\n}\n.detail__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n}\n.detail__row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.detail__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n.detail__value[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n}\n.detail__actions[_ngcontent-%COMP%] {\n  margin-top: auto;\n}\n.detail__success[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-4);\n  padding: var(--s-8);\n  color: var(--c-success);\n  font-size: 15px;\n  font-weight: 500;\n}\n.success-check[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: var(--c-success-soft);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--c-success);\n}\n/*# sourceMappingURL=delivery-detail.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeliveryDetailComponent, [{
    type: Component,
    args: [{ selector: "cm-delivery-detail", standalone: true, imports: [ButtonComponent, BadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="detail">
      <button class="detail__back" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Voltar
      </button>

      <div class="detail__hero">
        <div class="detail__package-icon">\u{1F4E6}</div>
        <cm-badge [variant]="status() === 'pendente' ? 'accent' : 'success'">
          {{ status() === 'pendente' ? 'Aguardando retirada' : 'Retirada' }}
        </cm-badge>
        <h1 class="detail__title">{{ remetente }}</h1>
        <p class="detail__sub">{{ tipo }}</p>
      </div>

      <div class="detail__info">
        <div class="detail__row">
          <span class="detail__label">Registrada em</span>
          <span class="detail__value">Hoje, 14:32</span>
        </div>
        <div class="detail__row">
          <span class="detail__label">Registrada por</span>
          <span class="detail__value">Rafael (porteiro)</span>
        </div>
        <div class="detail__row">
          <span class="detail__label">Tipo</span>
          <span class="detail__value">{{ tipo }}</span>
        </div>
      </div>

      @if (status() === 'pendente') {
        <div class="detail__actions">
          <cm-button variant="accent" size="lg" style="width:100%" (clicked)="marcarRetirada()">
            Marcar como retirada
          </cm-button>
        </div>
      } @else {
        <div class="detail__success">
          <div class="success-check">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" stroke-dasharray="40" stroke-dashoffset="0">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <p>Entrega retirada com sucesso!</p>
        </div>
      }
    </div>
  `, styles: ["/* apps/morador/src/app/features/deliveries/delivery-detail.component.scss */\n.detail {\n  padding: var(--s-5);\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-6);\n}\n.detail__back {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__hero {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: var(--s-3);\n}\n.detail__package-icon {\n  font-size: 48px;\n}\n.detail__title {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__sub {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.detail__info {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n  border: 1px solid var(--c-border);\n}\n.detail__row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n}\n.detail__row:last-child {\n  border-bottom: none;\n}\n.detail__label {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n.detail__value {\n  font-size: 13px;\n  font-weight: 600;\n}\n.detail__actions {\n  margin-top: auto;\n}\n.detail__success {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-4);\n  padding: var(--s-8);\n  color: var(--c-success);\n  font-size: 15px;\n  font-weight: 500;\n}\n.success-check {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: var(--c-success-soft);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--c-success);\n}\n/*# sourceMappingURL=delivery-detail.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeliveryDetailComponent, { className: "DeliveryDetailComponent", filePath: "apps/morador/src/app/features/deliveries/delivery-detail.component.ts", lineNumber: 64 });
})();
export {
  DeliveryDetailComponent
};
//# sourceMappingURL=chunk-QLQTSUSP.js.map
