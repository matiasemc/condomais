import {
  ToastService
} from "./chunk-OKAG547M.js";
import {
  BadgeComponent,
  ButtonComponent
} from "./chunk-2E4G4N2I.js";
import {
  AuthState,
  DeliveryService
} from "./chunk-IQFUSNZ4.js";
import "./chunk-R6BDYNR2.js";
import "./chunk-KU6U7BFN.js";
import {
  DatePipe,
  Location
} from "./chunk-UEEOQNAF.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  __async,
  __spreadProps,
  __spreadValues,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/deliveries/delivery-detail.component.ts
function DeliveryDetailComponent_Conditional_5_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 12);
    \u0275\u0275text(2, "Retirada em");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, d_r1.dataRetirada, "dd/MM/yyyy HH:mm"));
  }
}
function DeliveryDetailComponent_Conditional_5_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 12);
    \u0275\u0275text(2, "Retirada por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(d_r1.quemRetirou);
  }
}
function DeliveryDetailComponent_Conditional_5_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "cm-button", 16);
    \u0275\u0275listener("clicked", function DeliveryDetailComponent_Conditional_5_Conditional_23_Template_cm_button_clicked_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.marcarRetirada());
    });
    \u0275\u0275text(2, " Marcar como retirada ");
    \u0275\u0275elementEnd()();
  }
}
function DeliveryDetailComponent_Conditional_5_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 18);
    \u0275\u0275element(3, "path", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Entrega retirada com sucesso!");
    \u0275\u0275elementEnd()();
  }
}
function DeliveryDetailComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6);
    \u0275\u0275text(2, "\xF0\u0178\u201C\xA6");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "cm-badge", 7);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 9);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 10)(10, "div", 11)(11, "span", 12);
    \u0275\u0275text(12, "Registrada em");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 13);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(16, DeliveryDetailComponent_Conditional_5_Conditional_16_Template, 6, 4, "div", 11);
    \u0275\u0275conditionalCreate(17, DeliveryDetailComponent_Conditional_5_Conditional_17_Template, 5, 1, "div", 11);
    \u0275\u0275elementStart(18, "div", 11)(19, "span", 12);
    \u0275\u0275text(20, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 13);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(23, DeliveryDetailComponent_Conditional_5_Conditional_23_Template, 3, 0, "div", 14)(24, DeliveryDetailComponent_Conditional_5_Conditional_24_Template, 6, 0, "div", 15);
  }
  if (rf & 2) {
    const d_r1 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275property("variant", d_r1.status === "pendente" || d_r1.status === "notificada" ? "accent" : "success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r1.status === "retirada" ? "Retirada" : "Aguardando retirada", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r1.transportadora ?? d_r1.tipo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r1.tipo);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 9, d_r1.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(d_r1.dataRetirada ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r1.quemRetirou ? 17 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(d_r1.tipo);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r1.status === "pendente" || d_r1.status === "notificada" ? 23 : d_r1.status === "retirada" ? 24 : -1);
  }
}
function DeliveryDetailComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, "Carregando\xE2\u20AC\xA6");
    \u0275\u0275elementEnd();
  }
}
var DeliveryDetailComponent = class _DeliveryDetailComponent {
  constructor() {
    this.id = input("", ...ngDevMode ? [{ debugName: "id" }] : (
      /* istanbul ignore next */
      []
    ));
    this.location = inject(Location);
    this.toast = inject(ToastService);
    this.deliveryService = inject(DeliveryService);
    this.authState = inject(AuthState);
    this.delivery = signal(null, ...ngDevMode ? [{ debugName: "delivery" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const deliveryId = this.id();
      if (!deliveryId)
        return;
      this.isLoading.set(true);
      const d = yield this.deliveryService.loadById(deliveryId);
      this.delivery.set(d);
      this.isLoading.set(false);
    });
  }
  marcarRetirada() {
    return __async(this, null, function* () {
      const d = this.delivery();
      const user = this.authState.user();
      if (!d)
        return;
      const quem = user?.email ?? "Morador";
      const ok = yield this.deliveryService.marcarRetirada(d.id, quem);
      if (ok) {
        this.delivery.update((prev) => prev ? __spreadProps(__spreadValues({}, prev), { status: "retirada", dataRetirada: (/* @__PURE__ */ new Date()).toISOString(), quemRetirou: quem }) : prev);
        this.toast.show({ message: "Marcada como retirada", icon: "\xE2\u0153\u201D", duration: 2400 });
      } else {
        this.toast.show({ message: "Erro ao atualizar entrega", type: "error" });
      }
    });
  }
  static {
    this.\u0275fac = function DeliveryDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DeliveryDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeliveryDetailComponent, selectors: [["cm-delivery-detail"]], inputs: { id: [1, "id"] }, decls: 7, vars: 1, consts: [[1, "detail"], [1, "detail__back", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M19 12H5m0 0l7 7m-7-7l7-7"], [1, "detail__loading"], [1, "detail__hero"], [1, "detail__package-icon"], [3, "variant"], [1, "detail__title"], [1, "detail__sub"], [1, "detail__info"], [1, "detail__row"], [1, "detail__label"], [1, "detail__value"], [1, "detail__actions"], [1, "detail__success"], ["variant", "accent", "size", "lg", 2, "width", "100%", 3, "clicked"], [1, "success-check"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["d", "M20 6L9 17l-5-5"]], template: function DeliveryDetailComponent_Template(rf, ctx) {
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
        \u0275\u0275conditionalCreate(5, DeliveryDetailComponent_Conditional_5_Template, 25, 12)(6, DeliveryDetailComponent_Conditional_6_Template, 2, 0, "p", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(5);
        \u0275\u0275conditional((tmp_0_0 = ctx.delivery()) ? 5 : ctx.isLoading() ? 6 : -1, tmp_0_0);
      }
    }, dependencies: [ButtonComponent, BadgeComponent, DatePipe], styles: ["\n.detail[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-6);\n}\n.detail__back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__hero[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: var(--s-3);\n}\n.detail__package-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n}\n.detail__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__sub[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.detail__info[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n  border: 1px solid var(--c-border);\n}\n.detail__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n}\n.detail__row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.detail__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n.detail__value[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n}\n.detail__actions[_ngcontent-%COMP%] {\n  margin-top: auto;\n}\n.detail__success[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-4);\n  padding: var(--s-8);\n  color: var(--c-success);\n  font-size: 15px;\n  font-weight: 500;\n}\n.success-check[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: var(--c-success-soft);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--c-success);\n}\n/*# sourceMappingURL=delivery-detail.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeliveryDetailComponent, [{
    type: Component,
    args: [{ selector: "cm-delivery-detail", standalone: true, imports: [DatePipe, ButtonComponent, BadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="detail">
      <button class="detail__back" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Voltar
      </button>

      @if (delivery(); as d) {
        <div class="detail__hero">
          <div class="detail__package-icon">\xF0\u0178\u201C\xA6</div>
          <cm-badge [variant]="d.status === 'pendente' || d.status === 'notificada' ? 'accent' : 'success'">
            {{ d.status === 'retirada' ? 'Retirada' : 'Aguardando retirada' }}
          </cm-badge>
          <h1 class="detail__title">{{ d.transportadora ?? d.tipo }}</h1>
          <p class="detail__sub">{{ d.tipo }}</p>
        </div>

        <div class="detail__info">
          <div class="detail__row">
            <span class="detail__label">Registrada em</span>
            <span class="detail__value">{{ d.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>
          @if (d.dataRetirada) {
            <div class="detail__row">
              <span class="detail__label">Retirada em</span>
              <span class="detail__value">{{ d.dataRetirada | date:'dd/MM/yyyy HH:mm' }}</span>
            </div>
          }
          @if (d.quemRetirou) {
            <div class="detail__row">
              <span class="detail__label">Retirada por</span>
              <span class="detail__value">{{ d.quemRetirou }}</span>
            </div>
          }
          <div class="detail__row">
            <span class="detail__label">Tipo</span>
            <span class="detail__value">{{ d.tipo }}</span>
          </div>
        </div>

        @if (d.status === 'pendente' || d.status === 'notificada') {
          <div class="detail__actions">
            <cm-button variant="accent" size="lg" style="width:100%" (clicked)="marcarRetirada()">
              Marcar como retirada
            </cm-button>
          </div>
        } @else if (d.status === 'retirada') {
          <div class="detail__success">
            <div class="success-check">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2.5" stroke-linecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <p>Entrega retirada com sucesso!</p>
          </div>
        }
      } @else if (isLoading()) {
        <p class="detail__loading">Carregando\xE2\u20AC\xA6</p>
      }
    </div>
  `, styles: ["/* apps/morador/src/app/features/deliveries/delivery-detail.component.css */\n.detail {\n  padding: var(--s-5);\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-6);\n}\n.detail__back {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__hero {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: var(--s-3);\n}\n.detail__package-icon {\n  font-size: 48px;\n}\n.detail__title {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__sub {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.detail__info {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n  border: 1px solid var(--c-border);\n}\n.detail__row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n}\n.detail__row:last-child {\n  border-bottom: none;\n}\n.detail__label {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n.detail__value {\n  font-size: 13px;\n  font-weight: 600;\n}\n.detail__actions {\n  margin-top: auto;\n}\n.detail__success {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-4);\n  padding: var(--s-8);\n  color: var(--c-success);\n  font-size: 15px;\n  font-weight: 500;\n}\n.success-check {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: var(--c-success-soft);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--c-success);\n}\n/*# sourceMappingURL=delivery-detail.component.css.map */\n"] }]
  }], null, { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeliveryDetailComponent, { className: "DeliveryDetailComponent", filePath: "apps/morador/src/app/features/deliveries/delivery-detail.component.ts", lineNumber: 77 });
})();
export {
  DeliveryDetailComponent
};
//# sourceMappingURL=chunk-SPA44HB6.js.map
