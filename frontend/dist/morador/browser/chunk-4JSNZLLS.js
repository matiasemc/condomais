import {
  AuthState,
  BillingService
} from "./chunk-IQFUSNZ4.js";
import "./chunk-R6BDYNR2.js";
import "./chunk-KU6U7BFN.js";
import {
  CurrencyPipe,
  DatePipe,
  NgClass
} from "./chunk-UEEOQNAF.js";
import {
  ChangeDetectionStrategy,
  Component,
  __async,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBindV,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/billing/billing.component.ts
var _c0 = (a0, a1) => ({ "billing__card--current": a0, "billing__card--highlight": a1 });
var _c1 = (a0) => ({ "billing__feature--on": a0 });
var _c2 = (a0) => [a0, "BRL", "symbol", "1.2-2", "pt-BR"];
var _forTrack0 = ($index, $item) => $item.nome;
function BillingComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275text(1, " Pagamento pendente \u2014 renove para evitar suspens\xE3o ");
    \u0275\u0275elementEnd();
  }
}
function BillingComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function BillingComponent_Conditional_6_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sub_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Renova em ", \u0275\u0275pipeBind2(2, 1, sub_r1.current_period_end, "dd/MM/yyyy"));
  }
}
function BillingComponent_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 5)(1, "p", 8);
    \u0275\u0275text(2, "Plano atual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 10);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, BillingComponent_Conditional_6_Conditional_0_Conditional_7_Template, 3, 4, "p", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const sub_r1 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_3_0 = ctx_r1.svc.currentPlano()) == null ? null : tmp_3_0.label) ?? sub_r1.plano_nome);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "billing__status--" + sub_r1.status.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.statusLabel(sub_r1.status), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(sub_r1.current_period_end ? 7 : -1);
  }
}
function BillingComponent_Conditional_6_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1, "Mais popular");
    \u0275\u0275elementEnd();
  }
}
function BillingComponent_Conditional_6_For_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1, "Gr\xE1tis");
    \u0275\u0275elementEnd();
  }
}
function BillingComponent_Conditional_6_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 22);
    \u0275\u0275text(4, "/m\xEAs");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plano_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBindV(2, 1, \u0275\u0275pureFunction1(7, _c2, plano_r3.price_monthly_brl)));
  }
}
function BillingComponent_Conditional_6_For_3_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275text(1, "Plano atual");
    \u0275\u0275elementEnd();
  }
}
function BillingComponent_Conditional_6_For_3_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function BillingComponent_Conditional_6_For_3_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const plano_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.subscribe(plano_r3));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plano_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.redirecting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.redirecting() ? "Aguarde..." : ctx_r1.isDowngrade(plano_r3) ? "Mudar para " + plano_r3.label : "Fazer upgrade", " ");
  }
}
function BillingComponent_Conditional_6_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275conditionalCreate(1, BillingComponent_Conditional_6_For_3_Conditional_1_Template, 2, 0, "span", 12);
    \u0275\u0275elementStart(2, "h2", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 14);
    \u0275\u0275conditionalCreate(5, BillingComponent_Conditional_6_For_3_Conditional_5_Template, 2, 0, "span", 15)(6, BillingComponent_Conditional_6_For_3_Conditional_6_Template, 5, 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "ul", 16)(8, "li", 17);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "li", 17);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "li", 17);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "li", 17);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "li", 18);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, BillingComponent_Conditional_6_For_3_Conditional_18_Template, 2, 0, "button", 19)(19, BillingComponent_Conditional_6_For_3_Conditional_19_Template, 2, 2, "button", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plano_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(14, _c0, ctx_r1.svc.planNome() === plano_r3.nome, plano_r3.nome === "plus"));
    \u0275\u0275advance();
    \u0275\u0275conditional(plano_r3.nome === "plus" ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plano_r3.label);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(plano_r3.price_monthly_brl === 0 ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(17, _c1, plano_r3.features.entregas));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", plano_r3.features.entregas ? "\u2713" : "\u2717", " Entregas ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(19, _c1, plano_r3.features.ocorrencias));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", plano_r3.features.ocorrencias ? "\u2713" : "\u2717", " Ocorr\xEAncias ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(21, _c1, plano_r3.features.reservas));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", plano_r3.features.reservas ? "\u2713" : "\u2717", " Reservas ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(23, _c1, plano_r3.features.marketplace));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", plano_r3.features.marketplace ? "\u2713" : "\u2717", " Marketplace ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" At\xE9 ", plano_r3.features.max_unidades >= 999999 ? "ilimitadas" : plano_r3.features.max_unidades, " unidades ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.svc.planNome() === plano_r3.nome ? 18 : plano_r3.nome !== "free" ? 19 : -1);
  }
}
function BillingComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, BillingComponent_Conditional_6_Conditional_0_Template, 8, 4, "section", 5);
    \u0275\u0275elementStart(1, "section", 6);
    \u0275\u0275repeaterCreate(2, BillingComponent_Conditional_6_For_3_Template, 20, 25, "div", 7, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.svc.subscription()) ? 0 : -1, tmp_1_0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.svc.planos());
  }
}
var BillingComponent = class _BillingComponent {
  constructor() {
    this.svc = inject(BillingService);
    this.authState = inject(AuthState);
    this.redirecting = signal(false, ...ngDevMode ? [{ debugName: "redirecting" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const tenantId = this.authState.currentTenant()?.id;
      if (tenantId)
        yield this.svc.loadForTenant(tenantId);
    });
  }
  statusLabel(status) {
    const map = {
      ACTIVE: "Ativo",
      TRIALING: "Trial",
      PAST_DUE: "Pendente",
      CANCELED: "Cancelado"
    };
    return map[status] ?? status;
  }
  isDowngrade(plano) {
    const order = ["free", "basic", "plus", "premium"];
    return order.indexOf(plano.nome) < order.indexOf(this.svc.planNome());
  }
  subscribe(plano) {
    return __async(this, null, function* () {
      const tenantId = this.authState.currentTenant()?.id;
      if (!tenantId)
        return;
      this.redirecting.set(true);
      const result = yield this.svc.subscribeToPlan(tenantId, plano.nome);
      if ("url" in result) {
        window.location.href = result.url;
      } else {
        console.error("Checkout error:", result.error);
        this.redirecting.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function BillingComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BillingComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BillingComponent, selectors: [["cm-billing"]], decls: 7, vars: 2, consts: [[1, "billing"], [1, "billing__header"], [1, "billing__title"], [1, "billing__alert"], [1, "billing__loading"], [1, "billing__current"], [1, "billing__plans"], [1, "billing__card", 3, "ngClass"], [1, "billing__current-label"], [1, "billing__current-plan"], [1, "billing__status", 3, "ngClass"], [1, "billing__period"], [1, "billing__badge"], [1, "billing__card-name"], [1, "billing__card-price"], [1, "billing__price-free"], [1, "billing__features"], [3, "ngClass"], [1, "billing__feature--on"], ["disabled", "", 1, "billing__btn", "billing__btn--current"], [1, "billing__btn", "billing__btn--upgrade", 3, "disabled"], [1, "billing__price-amount"], [1, "billing__price-period"], [1, "billing__btn", "billing__btn--upgrade", 3, "click", "disabled"]], template: function BillingComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Planos e Assinatura");
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(4, BillingComponent_Conditional_4_Template, 2, 0, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(5, BillingComponent_Conditional_5_Template, 2, 0, "div", 4)(6, BillingComponent_Conditional_6_Template, 4, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.svc.isPastDue() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.svc.isLoading() ? 5 : 6);
      }
    }, dependencies: [NgClass, CurrencyPipe, DatePipe], styles: ["\n.billing[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 1.5rem 1rem 5rem;\n}\n.billing__header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.billing__title[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0 0 .5rem;\n}\n.billing__alert[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  border: 1px solid #ffc107;\n  border-radius: 8px;\n  padding: .75rem 1rem;\n  color: #856404;\n  font-size: .9rem;\n}\n.billing__loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n  color: #666;\n}\n.billing__current[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-radius: 12px;\n  padding: 1rem 1.25rem;\n  margin-bottom: 1.5rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.billing__current-label[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  color: #666;\n  width: 100%;\n  margin: 0;\n}\n.billing__current-plan[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0;\n}\n.billing__status[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  padding: .2rem .6rem;\n  border-radius: 99px;\n  font-weight: 600;\n}\n.billing__status--active[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n}\n.billing__status--trialing[_ngcontent-%COMP%] {\n  background: #cce5ff;\n  color: #004085;\n}\n.billing__status--past_due[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.billing__status--canceled[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n}\n.billing__period[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  color: #888;\n  margin: 0;\n}\n.billing__plans[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\n.billing__card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 2px solid #e9ecef;\n  border-radius: 16px;\n  padding: 1.5rem 1.25rem 1.25rem;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: .75rem;\n}\n.billing__card--current[_ngcontent-%COMP%] {\n  border-color: #4f46e5;\n}\n.billing__card--highlight[_ngcontent-%COMP%] {\n  border-color: #4f46e5;\n  box-shadow: 0 4px 20px rgba(79, 70, 229, .15);\n}\n.billing__badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #4f46e5;\n  color: #fff;\n  font-size: .7rem;\n  font-weight: 700;\n  padding: .2rem .75rem;\n  border-radius: 99px;\n  white-space: nowrap;\n}\n.billing__card-name[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0;\n}\n.billing__card-price[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.billing__price-free[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1a1a2e;\n}\n.billing__price-amount[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1a1a2e;\n}\n.billing__price-period[_ngcontent-%COMP%] {\n  font-size: .85rem;\n  color: #888;\n}\n.billing__features[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: .4rem;\n  font-size: .85rem;\n  flex: 1;\n}\n.billing__features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  color: #bbb;\n}\n.billing__feature--on[_ngcontent-%COMP%] {\n  color: #1a1a2e !important;\n}\n.billing__btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: .65rem;\n  border-radius: 8px;\n  font-size: .9rem;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n}\n.billing__btn--current[_ngcontent-%COMP%] {\n  background: #e9ecef;\n  color: #666;\n  cursor: default;\n}\n.billing__btn--upgrade[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: #fff;\n}\n.billing__btn--upgrade[_ngcontent-%COMP%]:disabled {\n  opacity: .6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=billing.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BillingComponent, [{
    type: Component,
    args: [{ selector: "cm-billing", standalone: true, imports: [CurrencyPipe, NgClass, DatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="billing">
      <header class="billing__header">
        <h1 class="billing__title">Planos e Assinatura</h1>
        @if (svc.isPastDue()) {
          <div class="billing__alert">
            Pagamento pendente \u2014 renove para evitar suspens\xE3o
          </div>
        }
      </header>

      @if (svc.isLoading()) {
        <div class="billing__loading">Carregando...</div>
      } @else {
        @if (svc.subscription(); as sub) {
          <section class="billing__current">
            <p class="billing__current-label">Plano atual</p>
            <p class="billing__current-plan">{{ svc.currentPlano()?.label ?? sub.plano_nome }}</p>
            <span class="billing__status" [ngClass]="'billing__status--' + sub.status.toLowerCase()">
              {{ statusLabel(sub.status) }}
            </span>
            @if (sub.current_period_end) {
              <p class="billing__period">Renova em {{ sub.current_period_end | date:'dd/MM/yyyy' }}</p>
            }
          </section>
        }

        <section class="billing__plans">
          @for (plano of svc.planos(); track plano.nome) {
            <div class="billing__card"
                 [ngClass]="{ 'billing__card--current': svc.planNome() === plano.nome, 'billing__card--highlight': plano.nome === 'plus' }">
              @if (plano.nome === 'plus') {
                <span class="billing__badge">Mais popular</span>
              }
              <h2 class="billing__card-name">{{ plano.label }}</h2>
              <p class="billing__card-price">
                @if (plano.price_monthly_brl === 0) {
                  <span class="billing__price-free">Gr\xE1tis</span>
                } @else {
                  <span class="billing__price-amount">{{ plano.price_monthly_brl | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}</span>
                  <span class="billing__price-period">/m\xEAs</span>
                }
              </p>

              <ul class="billing__features">
                <li [ngClass]="{ 'billing__feature--on': plano.features.entregas }">
                  {{ plano.features.entregas ? '\u2713' : '\u2717' }} Entregas
                </li>
                <li [ngClass]="{ 'billing__feature--on': plano.features.ocorrencias }">
                  {{ plano.features.ocorrencias ? '\u2713' : '\u2717' }} Ocorr\xEAncias
                </li>
                <li [ngClass]="{ 'billing__feature--on': plano.features.reservas }">
                  {{ plano.features.reservas ? '\u2713' : '\u2717' }} Reservas
                </li>
                <li [ngClass]="{ 'billing__feature--on': plano.features.marketplace }">
                  {{ plano.features.marketplace ? '\u2713' : '\u2717' }} Marketplace
                </li>
                <li class="billing__feature--on">
                  At\xE9 {{ plano.features.max_unidades >= 999999 ? 'ilimitadas' : plano.features.max_unidades }} unidades
                </li>
              </ul>

              @if (svc.planNome() === plano.nome) {
                <button class="billing__btn billing__btn--current" disabled>Plano atual</button>
              } @else if (plano.nome !== 'free') {
                <button class="billing__btn billing__btn--upgrade"
                        [disabled]="redirecting()"
                        (click)="subscribe(plano)">
                  {{ redirecting() ? 'Aguarde...' : (isDowngrade(plano) ? 'Mudar para ' + plano.label : 'Fazer upgrade') }}
                </button>
              }
            </div>
          }
        </section>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;7e05bd60eabbb6ff75aa74659772eb02cb5cc268bf9ce9767625dc1724a01f47;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/morador/src/app/features/billing/billing.component.ts */\n.billing {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 1.5rem 1rem 5rem;\n}\n.billing__header {\n  margin-bottom: 1.5rem;\n}\n.billing__title {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0 0 .5rem;\n}\n.billing__alert {\n  background: #fff3cd;\n  border: 1px solid #ffc107;\n  border-radius: 8px;\n  padding: .75rem 1rem;\n  color: #856404;\n  font-size: .9rem;\n}\n.billing__loading {\n  text-align: center;\n  padding: 3rem;\n  color: #666;\n}\n.billing__current {\n  background: #f8f9fa;\n  border-radius: 12px;\n  padding: 1rem 1.25rem;\n  margin-bottom: 1.5rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.billing__current-label {\n  font-size: .8rem;\n  color: #666;\n  width: 100%;\n  margin: 0;\n}\n.billing__current-plan {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0;\n}\n.billing__status {\n  font-size: .75rem;\n  padding: .2rem .6rem;\n  border-radius: 99px;\n  font-weight: 600;\n}\n.billing__status--active {\n  background: #d4edda;\n  color: #155724;\n}\n.billing__status--trialing {\n  background: #cce5ff;\n  color: #004085;\n}\n.billing__status--past_due {\n  background: #fff3cd;\n  color: #856404;\n}\n.billing__status--canceled {\n  background: #f8d7da;\n  color: #721c24;\n}\n.billing__period {\n  font-size: .8rem;\n  color: #888;\n  margin: 0;\n}\n.billing__plans {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\n.billing__card {\n  background: #fff;\n  border: 2px solid #e9ecef;\n  border-radius: 16px;\n  padding: 1.5rem 1.25rem 1.25rem;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: .75rem;\n}\n.billing__card--current {\n  border-color: #4f46e5;\n}\n.billing__card--highlight {\n  border-color: #4f46e5;\n  box-shadow: 0 4px 20px rgba(79, 70, 229, .15);\n}\n.billing__badge {\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #4f46e5;\n  color: #fff;\n  font-size: .7rem;\n  font-weight: 700;\n  padding: .2rem .75rem;\n  border-radius: 99px;\n  white-space: nowrap;\n}\n.billing__card-name {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1a1a2e;\n  margin: 0;\n}\n.billing__card-price {\n  margin: 0;\n}\n.billing__price-free {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1a1a2e;\n}\n.billing__price-amount {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1a1a2e;\n}\n.billing__price-period {\n  font-size: .85rem;\n  color: #888;\n}\n.billing__features {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: .4rem;\n  font-size: .85rem;\n  flex: 1;\n}\n.billing__features li {\n  color: #bbb;\n}\n.billing__feature--on {\n  color: #1a1a2e !important;\n}\n.billing__btn {\n  width: 100%;\n  padding: .65rem;\n  border-radius: 8px;\n  font-size: .9rem;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n}\n.billing__btn--current {\n  background: #e9ecef;\n  color: #666;\n  cursor: default;\n}\n.billing__btn--upgrade {\n  background: #4f46e5;\n  color: #fff;\n}\n.billing__btn--upgrade:disabled {\n  opacity: .6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=billing.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BillingComponent, { className: "BillingComponent", filePath: "apps/morador/src/app/features/billing/billing.component.ts", lineNumber: 122 });
})();
export {
  BillingComponent
};
//# sourceMappingURL=chunk-4JSNZLLS.js.map
