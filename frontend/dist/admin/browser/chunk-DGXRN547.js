import {
  AuthState,
  BillingService,
  FeatureService
} from "./chunk-OKLNA4DD.js";
import {
  CurrencyPipe,
  DatePipe,
  NgClass
} from "./chunk-YX7IELSF.js";
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
} from "./chunk-UHB6DSJH.js";

// apps/admin/src/app/features/billing/billing.component.ts
var _c0 = (a0) => ({ "feature-item--on": a0 });
var _c1 = (a0, a1) => ({ "plan-card--current": a0, "plan-card--highlight": a1 });
var _c2 = (a0) => ({ "on": a0 });
var _c3 = (a0) => [a0, "BRL", "symbol", "1.2-2", "pt-BR"];
var _forTrack0 = ($index, $item) => $item.code;
var _forTrack1 = ($index, $item) => $item.nome;
function AdminBillingComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function AdminBillingComponent_Conditional_5_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
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
function AdminBillingComponent_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "p", 12);
    \u0275\u0275text(2, "Plano atual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 14);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, AdminBillingComponent_Conditional_5_Conditional_0_Conditional_7_Template, 3, 4, "p", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const sub_r1 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_3_0 = ctx_r1.billingSvc.currentPlano()) == null ? null : tmp_3_0.label) ?? sub_r1.plano_nome);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "status-badge--" + sub_r1.status.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.statusLabel(sub_r1.status), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(sub_r1.current_period_end ? 7 : -1);
  }
}
function AdminBillingComponent_Conditional_5_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 8)(1, "span", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(3, _c0, ctx_r1.featureSvc.hasFeature(entry_r3.code)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.featureSvc.hasFeature(entry_r3.code) ? "\u2713" : "\u2717");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", entry_r3.label, " ");
  }
}
function AdminBillingComponent_Conditional_5_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1, "Pagamento pendente \u2014 renove para evitar suspens\xE3o");
    \u0275\u0275elementEnd();
  }
}
function AdminBillingComponent_Conditional_5_For_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "Mais popular");
    \u0275\u0275elementEnd();
  }
}
function AdminBillingComponent_Conditional_5_For_13_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, "Gr\xE1tis");
    \u0275\u0275elementEnd();
  }
}
function AdminBillingComponent_Conditional_5_For_13_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4, "/m\xEAs");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plano_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBindV(2, 1, \u0275\u0275pureFunction1(7, _c3, plano_r4.price_monthly_brl)));
  }
}
function AdminBillingComponent_Conditional_5_For_13_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275text(1, "Plano atual");
    \u0275\u0275elementEnd();
  }
}
function AdminBillingComponent_Conditional_5_For_13_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function AdminBillingComponent_Conditional_5_For_13_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const plano_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.subscribe(plano_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plano_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.redirecting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.redirecting() ? "Aguarde..." : ctx_r1.isDowngrade(plano_r4) ? "Mudar para " + plano_r4.label : "Fazer upgrade", " ");
  }
}
function AdminBillingComponent_Conditional_5_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275conditionalCreate(1, AdminBillingComponent_Conditional_5_For_13_Conditional_1_Template, 2, 0, "span", 17);
    \u0275\u0275elementStart(2, "h4", 18);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 19);
    \u0275\u0275conditionalCreate(5, AdminBillingComponent_Conditional_5_For_13_Conditional_5_Template, 2, 0, "span", 20)(6, AdminBillingComponent_Conditional_5_For_13_Conditional_6_Template, 5, 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "ul", 21)(8, "li", 22);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "li", 22);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "li", 22);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "li", 22);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "li", 23);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, AdminBillingComponent_Conditional_5_For_13_Conditional_18_Template, 2, 0, "button", 24)(19, AdminBillingComponent_Conditional_5_For_13_Conditional_19_Template, 2, 2, "button", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plano_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(14, _c1, ctx_r1.billingSvc.planNome() === plano_r4.nome, plano_r4.nome === "plus"));
    \u0275\u0275advance();
    \u0275\u0275conditional(plano_r4.nome === "plus" ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plano_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(plano_r4.price_monthly_brl === 0 ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(17, _c2, plano_r4.features.entregas));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", plano_r4.features.entregas ? "\u2713" : "\u2717", " Entregas");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(19, _c2, plano_r4.features.ocorrencias));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", plano_r4.features.ocorrencias ? "\u2713" : "\u2717", " Ocorr\xEAncias");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(21, _c2, plano_r4.features.reservas));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", plano_r4.features.reservas ? "\u2713" : "\u2717", " Reservas");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(23, _c2, plano_r4.features.marketplace));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", plano_r4.features.marketplace ? "\u2713" : "\u2717", " Marketplace");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("At\xE9 ", plano_r4.features.max_unidades >= 999999 ? "ilimitadas" : plano_r4.features.max_unidades, " unidades");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.billingSvc.planNome() === plano_r4.nome ? 18 : plano_r4.nome !== "free" ? 19 : -1);
  }
}
function AdminBillingComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AdminBillingComponent_Conditional_5_Conditional_0_Template, 8, 4, "div", 4);
    \u0275\u0275elementStart(1, "div", 5)(2, "h3", 6);
    \u0275\u0275text(3, "Features habilitadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ul", 7);
    \u0275\u0275repeaterCreate(5, AdminBillingComponent_Conditional_5_For_6_Template, 4, 5, "li", 8, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 5)(8, "h3", 6);
    \u0275\u0275text(9, "Planos dispon\xEDveis");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, AdminBillingComponent_Conditional_5_Conditional_10_Template, 2, 0, "div", 9);
    \u0275\u0275elementStart(11, "div", 10);
    \u0275\u0275repeaterCreate(12, AdminBillingComponent_Conditional_5_For_13_Template, 20, 25, "div", 11, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.billingSvc.subscription()) ? 0 : -1, tmp_1_0);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.allFeatures);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.billingSvc.isPastDue() ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.billingSvc.planos());
  }
}
var FEATURE_LABELS = {
  entregas: "Entregas",
  ocorrencias: "Ocorr\xEAncias",
  reservas: "Reservas",
  marketplace: "Marketplace",
  relatorios: "Relat\xF3rios",
  "integracao-google": "Integra\xE7\xE3o Google"
};
var AdminBillingComponent = class _AdminBillingComponent {
  constructor() {
    this.billingSvc = inject(BillingService);
    this.featureSvc = inject(FeatureService);
    this.authState = inject(AuthState);
    this.redirecting = signal(false, ...ngDevMode ? [{ debugName: "redirecting" }] : (
      /* istanbul ignore next */
      []
    ));
    this.allFeatures = Object.entries(FEATURE_LABELS).map(([code, label]) => ({ code, label }));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const tenantId = this.authState.currentTenant()?.id;
      if (tenantId)
        yield this.billingSvc.loadForTenant(tenantId);
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
    return order.indexOf(plano.nome) < order.indexOf(this.billingSvc.planNome());
  }
  subscribe(plano) {
    return __async(this, null, function* () {
      const tenantId = this.authState.currentTenant()?.id;
      if (!tenantId)
        return;
      this.redirecting.set(true);
      const result = yield this.billingSvc.subscribeToPlan(tenantId, plano.nome);
      if ("url" in result) {
        window.location.href = result.url;
      } else {
        console.error("Checkout error:", result.error);
        this.redirecting.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function AdminBillingComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminBillingComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminBillingComponent, selectors: [["cm-admin-billing"]], decls: 6, vars: 1, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "hint"], [1, "section", "current-plan"], [1, "section"], [1, "section__title"], [1, "feature-list"], [1, "feature-item", 3, "ngClass"], [1, "alert"], [1, "plan-grid"], [1, "plan-card", 3, "ngClass"], [1, "current-plan__label"], [1, "current-plan__name"], [1, "status-badge", 3, "ngClass"], [1, "current-plan__expiry"], [1, "feature-item__icon"], [1, "popular-badge"], [1, "plan-card__name"], [1, "plan-card__price"], [1, "price-main"], [1, "plan-features"], [3, "ngClass"], [1, "on"], ["disabled", "", 1, "btn", "btn--current"], [1, "btn", "btn--upgrade", 3, "disabled"], [1, "price-period"], [1, "btn", "btn--upgrade", 3, "click", "disabled"]], template: function AdminBillingComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Plano & Assinatura");
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(4, AdminBillingComponent_Conditional_4_Template, 2, 0, "p", 3)(5, AdminBillingComponent_Conditional_5_Template, 14, 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.billingSvc.isLoading() ? 4 : 5);
      }
    }, dependencies: [NgClass, CurrencyPipe, DatePipe], styles: ["\n.page__header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page__title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n}\n.section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n.section__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 16px;\n}\n.hint[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 13px;\n  text-align: center;\n  padding: 40px 0;\n}\n.alert[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  border: 1px solid #ffc107;\n  border-radius: 8px;\n  padding: 12px 16px;\n  color: #856404;\n  font-size: 13px;\n  margin-bottom: 16px;\n}\n.current-plan[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.current-plan__label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  width: 100%;\n  margin: 0;\n}\n.current-plan__name[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  color: #111827;\n  margin: 0;\n  text-transform: capitalize;\n}\n.current-plan__expiry[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  margin: 0;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 99px;\n}\n.status-badge--active[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.status-badge--trialing[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.status-badge--past_due[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.status-badge--canceled[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.feature-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.feature-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  color: #d1d5db;\n}\n.feature-item--on[_ngcontent-%COMP%] {\n  color: #111827;\n}\n.feature-item__icon[_ngcontent-%COMP%] {\n  font-weight: 700;\n  width: 16px;\n  text-align: center;\n}\n.plan-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 16px;\n}\n.plan-card[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px 16px 16px;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.plan-card--current[_ngcontent-%COMP%] {\n  border-color: #4f46e5;\n  background: #fff;\n}\n.plan-card--highlight[_ngcontent-%COMP%] {\n  border-color: #4f46e5;\n  box-shadow: 0 4px 16px rgba(79, 70, 229, .12);\n  background: #fff;\n}\n.popular-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -11px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #4f46e5;\n  color: #fff;\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 10px;\n  border-radius: 99px;\n  white-space: nowrap;\n}\n.plan-card__name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #111827;\n  margin: 0;\n  text-transform: capitalize;\n}\n.plan-card__price[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.price-main[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #111827;\n}\n.price-period[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  margin-left: 2px;\n}\n.plan-features[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  font-size: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  flex: 1;\n  color: #d1d5db;\n}\n.plan-features[_ngcontent-%COMP%]   .on[_ngcontent-%COMP%] {\n  color: #111827;\n}\n.btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n}\n.btn--current[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #9ca3af;\n  cursor: default;\n}\n.btn--upgrade[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: #fff;\n}\n.btn--upgrade[_ngcontent-%COMP%]:disabled {\n  opacity: .6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=billing.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminBillingComponent, [{
    type: Component,
    args: [{ selector: "cm-admin-billing", standalone: true, imports: [CurrencyPipe, NgClass, DatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Plano & Assinatura</h2>
      </div>

      @if (billingSvc.isLoading()) {
        <p class="hint">Carregando...</p>
      } @else {

        @if (billingSvc.subscription(); as sub) {
          <div class="section current-plan">
            <p class="current-plan__label">Plano atual</p>
            <p class="current-plan__name">{{ billingSvc.currentPlano()?.label ?? sub.plano_nome }}</p>
            <span class="status-badge" [ngClass]="'status-badge--' + sub.status.toLowerCase()">
              {{ statusLabel(sub.status) }}
            </span>
            @if (sub.current_period_end) {
              <p class="current-plan__expiry">Renova em {{ sub.current_period_end | date:'dd/MM/yyyy' }}</p>
            }
          </div>
        }

        <div class="section">
          <h3 class="section__title">Features habilitadas</h3>
          <ul class="feature-list">
            @for (entry of allFeatures; track entry.code) {
              <li class="feature-item" [ngClass]="{ 'feature-item--on': featureSvc.hasFeature(entry.code) }">
                <span class="feature-item__icon">{{ featureSvc.hasFeature(entry.code) ? '\u2713' : '\u2717' }}</span>
                {{ entry.label }}
              </li>
            }
          </ul>
        </div>

        <div class="section">
          <h3 class="section__title">Planos dispon\xEDveis</h3>
          @if (billingSvc.isPastDue()) {
            <div class="alert">Pagamento pendente \u2014 renove para evitar suspens\xE3o</div>
          }
          <div class="plan-grid">
            @for (plano of billingSvc.planos(); track plano.nome) {
              <div class="plan-card"
                   [ngClass]="{ 'plan-card--current': billingSvc.planNome() === plano.nome, 'plan-card--highlight': plano.nome === 'plus' }">
                @if (plano.nome === 'plus') {
                  <span class="popular-badge">Mais popular</span>
                }
                <h4 class="plan-card__name">{{ plano.label }}</h4>
                <p class="plan-card__price">
                  @if (plano.price_monthly_brl === 0) {
                    <span class="price-main">Gr\xE1tis</span>
                  } @else {
                    <span class="price-main">{{ plano.price_monthly_brl | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}</span>
                    <span class="price-period">/m\xEAs</span>
                  }
                </p>
                <ul class="plan-features">
                  <li [ngClass]="{ 'on': plano.features.entregas }">{{ plano.features.entregas ? '\u2713' : '\u2717' }} Entregas</li>
                  <li [ngClass]="{ 'on': plano.features.ocorrencias }">{{ plano.features.ocorrencias ? '\u2713' : '\u2717' }} Ocorr\xEAncias</li>
                  <li [ngClass]="{ 'on': plano.features.reservas }">{{ plano.features.reservas ? '\u2713' : '\u2717' }} Reservas</li>
                  <li [ngClass]="{ 'on': plano.features.marketplace }">{{ plano.features.marketplace ? '\u2713' : '\u2717' }} Marketplace</li>
                  <li class="on">At\xE9 {{ plano.features.max_unidades >= 999999 ? 'ilimitadas' : plano.features.max_unidades }} unidades</li>
                </ul>
                @if (billingSvc.planNome() === plano.nome) {
                  <button class="btn btn--current" disabled>Plano atual</button>
                } @else if (plano.nome !== 'free') {
                  <button class="btn btn--upgrade"
                          [disabled]="redirecting()"
                          (click)="subscribe(plano)">
                    {{ redirecting() ? 'Aguarde...' : (isDowngrade(plano) ? 'Mudar para ' + plano.label : 'Fazer upgrade') }}
                  </button>
                }
              </div>
            }
          </div>
        </div>

      }
    </div>
  `, styles: ["/* angular:styles/component:css;11d0a1dadc69217e2e3d559879bc65dca3abdb5ed5fc33d0d4857551208e455e;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/admin/src/app/features/billing/billing.component.ts */\n.page__header {\n  margin-bottom: 24px;\n}\n.page__title {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n}\n.section {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n.section__title {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 16px;\n}\n.hint {\n  color: #9ca3af;\n  font-size: 13px;\n  text-align: center;\n  padding: 40px 0;\n}\n.alert {\n  background: #fff3cd;\n  border: 1px solid #ffc107;\n  border-radius: 8px;\n  padding: 12px 16px;\n  color: #856404;\n  font-size: 13px;\n  margin-bottom: 16px;\n}\n.current-plan {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.current-plan__label {\n  font-size: 12px;\n  color: #9ca3af;\n  width: 100%;\n  margin: 0;\n}\n.current-plan__name {\n  font-size: 20px;\n  font-weight: 700;\n  color: #111827;\n  margin: 0;\n  text-transform: capitalize;\n}\n.current-plan__expiry {\n  font-size: 12px;\n  color: #9ca3af;\n  margin: 0;\n}\n.status-badge {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 99px;\n}\n.status-badge--active {\n  background: #d1fae5;\n  color: #065f46;\n}\n.status-badge--trialing {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.status-badge--past_due {\n  background: #fef3c7;\n  color: #92400e;\n}\n.status-badge--canceled {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.feature-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.feature-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  color: #d1d5db;\n}\n.feature-item--on {\n  color: #111827;\n}\n.feature-item__icon {\n  font-weight: 700;\n  width: 16px;\n  text-align: center;\n}\n.plan-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 16px;\n}\n.plan-card {\n  background: #f9fafb;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px 16px 16px;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.plan-card--current {\n  border-color: #4f46e5;\n  background: #fff;\n}\n.plan-card--highlight {\n  border-color: #4f46e5;\n  box-shadow: 0 4px 16px rgba(79, 70, 229, .12);\n  background: #fff;\n}\n.popular-badge {\n  position: absolute;\n  top: -11px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #4f46e5;\n  color: #fff;\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 10px;\n  border-radius: 99px;\n  white-space: nowrap;\n}\n.plan-card__name {\n  font-size: 15px;\n  font-weight: 700;\n  color: #111827;\n  margin: 0;\n  text-transform: capitalize;\n}\n.plan-card__price {\n  margin: 0;\n}\n.price-main {\n  font-size: 22px;\n  font-weight: 700;\n  color: #111827;\n}\n.price-period {\n  font-size: 12px;\n  color: #9ca3af;\n  margin-left: 2px;\n}\n.plan-features {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  font-size: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  flex: 1;\n  color: #d1d5db;\n}\n.plan-features .on {\n  color: #111827;\n}\n.btn {\n  width: 100%;\n  padding: 9px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n}\n.btn--current {\n  background: #f3f4f6;\n  color: #9ca3af;\n  cursor: default;\n}\n.btn--upgrade {\n  background: #4f46e5;\n  color: #fff;\n}\n.btn--upgrade:disabled {\n  opacity: .6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=billing.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminBillingComponent, { className: "AdminBillingComponent", filePath: "apps/admin/src/app/features/billing/billing.component.ts", lineNumber: 140 });
})();
export {
  AdminBillingComponent
};
//# sourceMappingURL=chunk-DGXRN547.js.map
