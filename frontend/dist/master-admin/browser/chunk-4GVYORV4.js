import {
  Select,
  SelectModule
} from "./chunk-EPWMPVPN.js";
import "./chunk-26TFFR4C.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  PlanManagementService
} from "./chunk-J3ADYAXG.js";
import {
  DatePipe
} from "./chunk-JVS6PAVK.js";
import {
  ChangeDetectionStrategy,
  Component,
  __async,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-TZP2ZEHH.js";

// apps/master-admin/src/app/features/plans/plans.component.ts
var _forTrack0 = ($index, $item) => $item.code;
var _forTrack1 = ($index, $item) => $item.id;
function PlansComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Carregando features...");
    \u0275\u0275elementEnd();
  }
}
function PlansComponent_Conditional_8_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("color", ctx_r1.planColor(plan_r1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(plan_r1);
  }
}
function PlansComponent_Conditional_8_For_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(f_r3.descricao);
  }
}
function PlansComponent_Conditional_8_For_10_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 17)(1, "label", 18)(2, "input", 19);
    \u0275\u0275listener("change", function PlansComponent_Conditional_8_For_10_For_6_Template_input_change_2_listener($event) {
      const plan_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const f_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleFeature(plan_r5, f_r3.code, $event.target.checked));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const plan_r5 = ctx.$implicit;
    const f_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r1.isEnabled(plan_r5, f_r3.code))("disabled", ctx_r1.savingKey() === plan_r5 + ":" + f_r3.code);
  }
}
function PlansComponent_Conditional_8_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 14)(2, "span", 15);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, PlansComponent_Conditional_8_For_10_Conditional_4_Template, 2, 1, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, PlansComponent_Conditional_8_For_10_For_6_Template, 3, 2, "td", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(f_r3.code);
    \u0275\u0275advance();
    \u0275\u0275conditional(f_r3.descricao ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.allPlans);
  }
}
function PlansComponent_Conditional_8_ForEmpty_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 5);
    \u0275\u0275text(2, "Sem features cadastradas");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.allPlans.length + 1);
  }
}
function PlansComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "table", 9)(2, "thead")(3, "tr")(4, "th", 10);
    \u0275\u0275text(5, "Feature");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, PlansComponent_Conditional_8_For_7_Template, 2, 3, "th", 11, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "tbody");
    \u0275\u0275repeaterCreate(9, PlansComponent_Conditional_8_For_10_Template, 7, 2, "tr", null, _forTrack0, false, PlansComponent_Conditional_8_ForEmpty_11_Template, 3, 1, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "p", 12);
    \u0275\u0275text(13, " Altera\xE7\xF5es aplicam imediatamente. Tenants j\xE1 logados recebem na pr\xF3xima troca de condom\xEDnio. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.allPlans);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.features());
  }
}
function PlansComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function PlansComponent_Conditional_13_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const t_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \xB7 Trial at\xE9 ", \u0275\u0275pipeBind2(1, 1, t_r7.trial_ends_at, "dd/MM/yyyy"), " ");
  }
}
function PlansComponent_Conditional_13_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const t_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \xB7 Expira ", \u0275\u0275pipeBind2(1, 1, t_r7.subscription_expires_at, "dd/MM/yyyy"), " ");
  }
}
function PlansComponent_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21)(2, "p", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 23);
    \u0275\u0275text(5);
    \u0275\u0275conditionalCreate(6, PlansComponent_Conditional_13_For_2_Conditional_6_Template, 2, 4);
    \u0275\u0275conditionalCreate(7, PlansComponent_Conditional_13_For_2_Conditional_7_Template, 2, 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 24)(9, "p-select", 25);
    \u0275\u0275listener("ngModelChange", function PlansComponent_Conditional_13_For_2_Template_p_select_ngModelChange_9_listener($event) {
      const t_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updatePlan(t_r7.id, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p-select", 26);
    \u0275\u0275listener("ngModelChange", function PlansComponent_Conditional_13_For_2_Template_p_select_ngModelChange_10_listener($event) {
      const t_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateStatus(t_r7.id, $event));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r7.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", t_r7.subscription_status, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r7.trial_ends_at ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r7.subscription_expires_at ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("options", ctx_r1.planOptions)("ngModel", t_r7.plan);
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx_r1.statusOptions)("ngModel", t_r7.subscription_status);
  }
}
function PlansComponent_Conditional_13_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Nenhum tenant");
    \u0275\u0275elementEnd();
  }
}
function PlansComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, PlansComponent_Conditional_13_For_2_Template, 11, 8, "div", 20, _forTrack1, false, PlansComponent_Conditional_13_ForEmpty_3_Template, 2, 0, "p", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.tenants());
  }
}
var PLAN_COLORS = {
  free: "#9ca3af",
  basic: "#6b7280",
  plus: "#3b82f6",
  premium: "#8b5cf6"
};
var ALL_PLANS = ["free", "basic", "plus", "premium"];
var PlansComponent = class _PlansComponent {
  constructor() {
    this.planManagement = inject(PlanManagementService);
    this.tenants = signal([], ...ngDevMode ? [{ debugName: "tenants" }] : (
      /* istanbul ignore next */
      []
    ));
    this.features = signal([], ...ngDevMode ? [{ debugName: "features" }] : (
      /* istanbul ignore next */
      []
    ));
    this.planoFeatures = signal(/* @__PURE__ */ new Map(), ...ngDevMode ? [{ debugName: "planoFeatures" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isLoading = signal(true, ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.featuresLoading = signal(true, ...ngDevMode ? [{ debugName: "featuresLoading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.savingKey = signal(null, ...ngDevMode ? [{ debugName: "savingKey" }] : (
      /* istanbul ignore next */
      []
    ));
    this.allPlans = ALL_PLANS;
    this.planOptions = ALL_PLANS.map((plan) => ({ label: plan[0].toUpperCase() + plan.slice(1), value: plan }));
    this.statusOptions = [
      { label: "Trial", value: "trial" },
      { label: "Active", value: "active" },
      { label: "Suspended", value: "suspended" },
      { label: "Cancelled", value: "cancelled" }
    ];
  }
  planColor(plan) {
    return PLAN_COLORS[plan];
  }
  isEnabled(plan, featureCode) {
    return this.planoFeatures().get(`${plan}:${featureCode}`) ?? false;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      try {
        const snapshot = yield this.planManagement.loadSnapshot();
        this.tenants.set(snapshot.tenants);
        this.features.set(snapshot.features);
        const map = /* @__PURE__ */ new Map();
        for (const row of snapshot.planFeatures) {
          map.set(`${row.plano_nome}:${row.feature_code}`, row.enabled);
        }
        this.planoFeatures.set(map);
      } finally {
        this.isLoading.set(false);
        this.featuresLoading.set(false);
      }
    });
  }
  toggleFeature(plan, featureCode, enabled) {
    return __async(this, null, function* () {
      const key = `${plan}:${featureCode}`;
      this.savingKey.set(key);
      try {
        yield this.planManagement.setFeatureEnabled(plan, featureCode, enabled);
        this.planoFeatures.update((m) => {
          const next = new Map(m);
          next.set(key, enabled);
          return next;
        });
      } finally {
        this.savingKey.set(null);
      }
    });
  }
  updatePlan(id, plan) {
    return __async(this, null, function* () {
      yield this.planManagement.updatePlan(id, plan);
      this.tenants.update((list) => list.map((t) => t.id === id ? __spreadProps(__spreadValues({}, t), { plan }) : t));
    });
  }
  updateStatus(id, subscription_status) {
    return __async(this, null, function* () {
      yield this.planManagement.updateStatus(id, subscription_status);
      this.tenants.update((list) => list.map((t) => t.id === id ? __spreadProps(__spreadValues({}, t), { subscription_status }) : t));
    });
  }
  static {
    this.\u0275fac = function PlansComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PlansComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlansComponent, selectors: [["cm-plans"]], decls: 14, vars: 2, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "section", 2, "margin-bottom", "24px"], [1, "section__title"], [1, "hint"], [1, "section"], [1, "tenant-table"], [1, "matrix-wrap"], [1, "matrix"], [1, "matrix__feature-col"], [1, "matrix__plan-col", 3, "color"], [1, "hint", 2, "margin-top", "8px", "text-align", "left"], [1, "matrix__plan-col"], [1, "matrix__label"], [1, "matrix__code"], [1, "matrix__desc"], [1, "matrix__cell"], [1, "matrix__toggle"], ["type", "checkbox", 3, "change", "checked", "disabled"], [1, "tenant-row"], [1, "tenant-row__body"], [1, "tenant-row__name"], [1, "tenant-row__meta"], [1, "tenant-row__right"], ["styleClass", "plan-select", "optionLabel", "label", "optionValue", "value", "appendTo", "body", 3, "ngModelChange", "options", "ngModel"], ["styleClass", "status-select", "optionLabel", "label", "optionValue", "value", "appendTo", "body", 3, "ngModelChange", "options", "ngModel"]], template: function PlansComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Planos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 3)(5, "h3", 4);
        \u0275\u0275text(6, "Features por Plano");
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(7, PlansComponent_Conditional_7_Template, 2, 0, "p", 5)(8, PlansComponent_Conditional_8_Template, 14, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 6)(10, "h3", 4);
        \u0275\u0275text(11, "Atribui\xE7\xE3o por Tenant");
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(12, PlansComponent_Conditional_12_Template, 2, 0, "p", 5)(13, PlansComponent_Conditional_13_Template, 4, 1, "div", 7);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275conditional(ctx.featuresLoading() ? 7 : 8);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(ctx.isLoading() ? 12 : 13);
      }
    }, dependencies: [SelectModule, Select, FormsModule, NgControlStatus, NgModel, DatePipe], styles: ["\n.page__header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page__title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n}\n.section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n}\n.section__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 16px;\n}\n.matrix-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.matrix[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.matrix[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.matrix[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-bottom: 1px solid #f3f4f6;\n  text-align: center;\n}\n.matrix__feature-col[_ngcontent-%COMP%] {\n  text-align: left;\n  min-width: 200px;\n}\n.matrix__plan-col[_ngcontent-%COMP%] {\n  font-weight: 700;\n  text-transform: capitalize;\n  min-width: 80px;\n}\n.matrix__label[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.matrix__code[_ngcontent-%COMP%] {\n  font-weight: 600;\n  display: block;\n}\n.matrix__desc[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n  display: block;\n}\n.matrix__cell[_ngcontent-%COMP%] {\n}\n.matrix__toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  cursor: pointer;\n  accent-color: #4f46e5;\n}\n.matrix__toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled {\n  cursor: wait;\n}\n.tenant-table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.tenant-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 0;\n  border-bottom: 1px solid #f3f4f6;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.tenant-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.tenant-row__name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n}\n.tenant-row__meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  margin-top: 2px;\n}\n.tenant-row__right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.plan-select[_ngcontent-%COMP%], \n.status-select[_ngcontent-%COMP%] {\n  font-size: 13px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 5px 8px;\n  cursor: pointer;\n}\n.hint[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 13px;\n  padding: 8px 0;\n  text-align: center;\n}\n/*# sourceMappingURL=plans.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlansComponent, [{
    type: Component,
    args: [{ selector: "cm-plans", standalone: true, imports: [DatePipe, SelectModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Planos</h2>
      </div>

      <!-- Feature matrix -->
      <div class="section" style="margin-bottom:24px">
        <h3 class="section__title">Features por Plano</h3>
        @if (featuresLoading()) {
          <p class="hint">Carregando features...</p>
        } @else {
          <div class="matrix-wrap">
            <table class="matrix">
              <thead>
                <tr>
                  <th class="matrix__feature-col">Feature</th>
                  @for (plan of allPlans; track plan) {
                    <th class="matrix__plan-col" [style.color]="planColor(plan)">{{ plan }}</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (f of features(); track f.code) {
                  <tr>
                    <td class="matrix__label">
                      <span class="matrix__code">{{ f.code }}</span>
                      @if (f.descricao) { <span class="matrix__desc">{{ f.descricao }}</span> }
                    </td>
                    @for (plan of allPlans; track plan) {
                      <td class="matrix__cell">
                        <label class="matrix__toggle">
                          <input
                            type="checkbox"
                            [checked]="isEnabled(plan, f.code)"
                            [disabled]="savingKey() === plan + ':' + f.code"
                            (change)="toggleFeature(plan, f.code, $any($event.target).checked)"
                          >
                        </label>
                      </td>
                    }
                  </tr>
                } @empty {
                  <tr><td [attr.colspan]="allPlans.length + 1" class="hint">Sem features cadastradas</td></tr>
                }
              </tbody>
            </table>
          </div>
          <p class="hint" style="margin-top:8px;text-align:left">
            Altera\xE7\xF5es aplicam imediatamente. Tenants j\xE1 logados recebem na pr\xF3xima troca de condom\xEDnio.
          </p>
        }
      </div>

      <!-- Tenant plan assignment -->
      <div class="section">
        <h3 class="section__title">Atribui\xE7\xE3o por Tenant</h3>
        @if (isLoading()) {
          <p class="hint">Carregando...</p>
        } @else {
          <div class="tenant-table">
            @for (t of tenants(); track t.id) {
              <div class="tenant-row">
                <div class="tenant-row__body">
                  <p class="tenant-row__name">{{ t.nome }}</p>
                  <p class="tenant-row__meta">
                    {{ t.subscription_status }}
                    @if (t.trial_ends_at) { \xB7 Trial at\xE9 {{ t.trial_ends_at | date:'dd/MM/yyyy' }} }
                    @if (t.subscription_expires_at) { \xB7 Expira {{ t.subscription_expires_at | date:'dd/MM/yyyy' }} }
                  </p>
                </div>
                <div class="tenant-row__right">
                  <p-select
                    styleClass="plan-select"
                    [options]="planOptions"
                    [ngModel]="t.plan"
                    optionLabel="label"
                    optionValue="value"
                    appendTo="body"
                    (ngModelChange)="updatePlan(t.id, $event)"
                  ></p-select>
                  <p-select
                    styleClass="status-select"
                    [options]="statusOptions"
                    [ngModel]="t.subscription_status"
                    optionLabel="label"
                    optionValue="value"
                    appendTo="body"
                    (ngModelChange)="updateStatus(t.id, $event)"
                  ></p-select>
                </div>
              </div>
            } @empty {
              <p class="hint">Nenhum tenant</p>
            }
          </div>
        }
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;6907db8964d870efaa5f49d0931eeb87b47776e5451f7a5a66e939eaa2ac9837;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/master-admin/src/app/features/plans/plans.component.ts */\n.page__header {\n  margin-bottom: 24px;\n}\n.page__title {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n}\n.section {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n}\n.section__title {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 16px;\n}\n.matrix-wrap {\n  overflow-x: auto;\n}\n.matrix {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.matrix th,\n.matrix td {\n  padding: 8px 12px;\n  border-bottom: 1px solid #f3f4f6;\n  text-align: center;\n}\n.matrix__feature-col {\n  text-align: left;\n  min-width: 200px;\n}\n.matrix__plan-col {\n  font-weight: 700;\n  text-transform: capitalize;\n  min-width: 80px;\n}\n.matrix__label {\n  text-align: left;\n}\n.matrix__code {\n  font-weight: 600;\n  display: block;\n}\n.matrix__desc {\n  font-size: 11px;\n  color: #9ca3af;\n  display: block;\n}\n.matrix__cell {\n}\n.matrix__toggle input {\n  width: 16px;\n  height: 16px;\n  cursor: pointer;\n  accent-color: #4f46e5;\n}\n.matrix__toggle input:disabled {\n  cursor: wait;\n}\n.tenant-table {\n  display: flex;\n  flex-direction: column;\n}\n.tenant-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 0;\n  border-bottom: 1px solid #f3f4f6;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.tenant-row:last-child {\n  border-bottom: none;\n}\n.tenant-row__name {\n  font-weight: 600;\n  font-size: 14px;\n}\n.tenant-row__meta {\n  font-size: 12px;\n  color: #9ca3af;\n  margin-top: 2px;\n}\n.tenant-row__right {\n  display: flex;\n  gap: 8px;\n}\n.plan-select,\n.status-select {\n  font-size: 13px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 5px 8px;\n  cursor: pointer;\n}\n.hint {\n  color: #9ca3af;\n  font-size: 13px;\n  padding: 8px 0;\n  text-align: center;\n}\n/*# sourceMappingURL=plans.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlansComponent, { className: "PlansComponent", filePath: "apps/master-admin/src/app/features/plans/plans.component.ts", lineNumber: 155 });
})();
export {
  PlansComponent
};
//# sourceMappingURL=chunk-4GVYORV4.js.map
