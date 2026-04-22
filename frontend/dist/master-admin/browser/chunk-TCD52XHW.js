import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-HU5EJLJG.js";
import {
  SUPABASE_CLIENT
} from "./chunk-R2RNB5Q2.js";
import {
  DatePipe
} from "./chunk-FLR37CX6.js";
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
  ɵɵconditional,
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
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-H3ZFOGTY.js";

// apps/master-admin/src/app/features/plans/plans.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function PlansComponent_For_6_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(f_r1);
  }
}
function PlansComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul", 11);
    \u0275\u0275repeaterCreate(4, PlansComponent_For_6_For_5_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 12);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("border-top-color", entry_r2.value.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", entry_r2.value.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r2.value.label);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(entry_r2.value.features);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.countByPlan(entry_r2.key), " tenant(s)");
  }
}
function PlansComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function PlansComponent_Conditional_11_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const t_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \xB7 Trial at\xE9 ", \u0275\u0275pipeBind2(1, 1, t_r5.trial_ends_at, "dd/MM/yyyy"), " ");
  }
}
function PlansComponent_Conditional_11_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const t_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \xB7 Expira ", \u0275\u0275pipeBind2(1, 1, t_r5.subscription_expires_at, "dd/MM/yyyy"), " ");
  }
}
function PlansComponent_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "p", 15);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 16);
    \u0275\u0275text(5);
    \u0275\u0275template(6, PlansComponent_Conditional_11_For_2_Conditional_6_Template, 2, 4)(7, PlansComponent_Conditional_11_For_2_Conditional_7_Template, 2, 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 17)(9, "select", 18);
    \u0275\u0275listener("ngModelChange", function PlansComponent_Conditional_11_For_2_Template_select_ngModelChange_9_listener($event) {
      const t_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updatePlan(t_r5.id, $event));
    });
    \u0275\u0275elementStart(10, "option", 19);
    \u0275\u0275text(11, "Basic");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 20);
    \u0275\u0275text(13, "Plus");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 21);
    \u0275\u0275text(15, "Premium");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "select", 22);
    \u0275\u0275listener("ngModelChange", function PlansComponent_Conditional_11_For_2_Template_select_ngModelChange_16_listener($event) {
      const t_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateStatus(t_r5.id, $event));
    });
    \u0275\u0275elementStart(17, "option", 23);
    \u0275\u0275text(18, "Trial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 24);
    \u0275\u0275text(20, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 25);
    \u0275\u0275text(22, "Suspended");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 26);
    \u0275\u0275text(24, "Cancelled");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r5.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", t_r5.subscription_status, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r5.trial_ends_at ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r5.subscription_expires_at ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", t_r5.plan);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngModel", t_r5.subscription_status);
  }
}
function PlansComponent_Conditional_11_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Nenhum tenant");
    \u0275\u0275elementEnd();
  }
}
function PlansComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, PlansComponent_Conditional_11_For_2_Template, 25, 6, "div", 13, _forTrack1, false, PlansComponent_Conditional_11_ForEmpty_3_Template, 2, 0, "p", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.tenants());
  }
}
var PLAN_FEATURES = {
  basic: { label: "Basic", color: "#6b7280", features: ["At\xE9 50 unidades", "2 porteiros", "10 equipamentos", "100 MB storage"] },
  plus: { label: "Plus", color: "#3b82f6", features: ["At\xE9 200 unidades", "5 porteiros", "25 equipamentos", "500 MB storage"] },
  premium: { label: "Premium", color: "#8b5cf6", features: ["Ilimitado", "Porteiros ilimitados", "Equipamentos ilimitados", "5 GB storage"] }
};
var PlansComponent = class _PlansComponent {
  constructor() {
    this.supabase = inject(SUPABASE_CLIENT);
    this.tenants = signal([]);
    this.isLoading = signal(true);
    this.planEntries = Object.entries(PLAN_FEATURES).map(([key, value]) => ({ key, value }));
  }
  countByPlan(plan) {
    return this.tenants().filter((t) => t.plan === plan).length;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const { data } = yield this.supabase.from("condominios").select("id,nome,plan,subscription_status,trial_ends_at,subscription_expires_at").is("deleted_at", null).order("nome");
      this.tenants.set(data ?? []);
      this.isLoading.set(false);
    });
  }
  updatePlan(id, plan) {
    return __async(this, null, function* () {
      const { error } = yield this.supabase.from("condominios").update({ plan }).eq("id", id);
      if (!error)
        this.tenants.update((list) => list.map((t) => t.id === id ? __spreadProps(__spreadValues({}, t), { plan }) : t));
    });
  }
  updateStatus(id, subscription_status) {
    return __async(this, null, function* () {
      const { error } = yield this.supabase.from("condominios").update({ subscription_status }).eq("id", id);
      if (!error)
        this.tenants.update((list) => list.map((t) => t.id === id ? __spreadProps(__spreadValues({}, t), { subscription_status }) : t));
    });
  }
  static {
    this.\u0275fac = function PlansComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PlansComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlansComponent, selectors: [["cm-plans"]], decls: 12, vars: 1, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "plan-cards"], [1, "plan-card", 3, "border-top-color"], [1, "section"], [1, "section__title"], [1, "hint"], [1, "tenant-table"], [1, "plan-card"], [1, "plan-card__name"], [1, "plan-card__features"], [1, "plan-card__count"], [1, "tenant-row"], [1, "tenant-row__body"], [1, "tenant-row__name"], [1, "tenant-row__meta"], [1, "tenant-row__right"], [1, "plan-select", 3, "ngModelChange", "ngModel"], ["value", "basic"], ["value", "plus"], ["value", "premium"], [1, "status-select", 3, "ngModelChange", "ngModel"], ["value", "trial"], ["value", "active"], ["value", "suspended"], ["value", "cancelled"]], template: function PlansComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Planos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 3);
        \u0275\u0275repeaterCreate(5, PlansComponent_For_6_Template, 8, 6, "div", 4, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5)(8, "h3", 6);
        \u0275\u0275text(9, "Atribui\xE7\xE3o por Tenant");
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, PlansComponent_Conditional_10_Template, 2, 0, "p", 7)(11, PlansComponent_Conditional_11_Template, 4, 1, "div", 8);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.planEntries);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(ctx.isLoading() ? 10 : 11);
      }
    }, dependencies: [DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.page__header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page__title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n}\n.plan-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.plan-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-top: 4px solid;\n  border-radius: 12px;\n  padding: 20px;\n}\n.plan-card__name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  margin: 0 0 12px;\n}\n.plan-card__features[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  padding-left: 18px;\n}\n.plan-card__features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  margin-bottom: 4px;\n}\n.plan-card__count[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  background: #f3f4f6;\n  border-radius: 6px;\n  padding: 4px 10px;\n  display: inline-block;\n}\n.section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n}\n.section__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 16px;\n}\n.tenant-table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.tenant-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 0;\n  border-bottom: 1px solid #f3f4f6;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.tenant-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.tenant-row__name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n}\n.tenant-row__meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  margin-top: 2px;\n}\n.tenant-row__right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.plan-select[_ngcontent-%COMP%], \n.status-select[_ngcontent-%COMP%] {\n  font-size: 13px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 5px 8px;\n  cursor: pointer;\n}\n.hint[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 14px;\n  padding: 16px 0;\n  text-align: center;\n}\n/*# sourceMappingURL=plans.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlansComponent, [{
    type: Component,
    args: [{ selector: "cm-plans", standalone: true, imports: [DatePipe, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Planos</h2>
      </div>

      <div class="plan-cards">
        @for (entry of planEntries; track entry.key) {
          <div class="plan-card" [style.border-top-color]="entry.value.color">
            <p class="plan-card__name" [style.color]="entry.value.color">{{ entry.value.label }}</p>
            <ul class="plan-card__features">
              @for (f of entry.value.features; track f) { <li>{{ f }}</li> }
            </ul>
            <p class="plan-card__count">{{ countByPlan(entry.key) }} tenant(s)</p>
          </div>
        }
      </div>

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
                  <select class="plan-select" [ngModel]="t.plan" (ngModelChange)="updatePlan(t.id, $event)">
                    <option value="basic">Basic</option>
                    <option value="plus">Plus</option>
                    <option value="premium">Premium</option>
                  </select>
                  <select class="status-select" [ngModel]="t.subscription_status" (ngModelChange)="updateStatus(t.id, $event)">
                    <option value="trial">Trial</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            } @empty {
              <p class="hint">Nenhum tenant</p>
            }
          </div>
        }
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;e1325422fe728189d149b53fb2559d1bcb4b2221c3f2904e382bb6cd89527c1b;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/master-admin/src/app/features/plans/plans.component.ts */\n.page__header {\n  margin-bottom: 24px;\n}\n.page__title {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n}\n.plan-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.plan-card {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-top: 4px solid;\n  border-radius: 12px;\n  padding: 20px;\n}\n.plan-card__name {\n  font-size: 16px;\n  font-weight: 700;\n  margin: 0 0 12px;\n}\n.plan-card__features {\n  margin: 0 0 12px;\n  padding-left: 18px;\n}\n.plan-card__features li {\n  font-size: 13px;\n  color: #6b7280;\n  margin-bottom: 4px;\n}\n.plan-card__count {\n  font-size: 13px;\n  font-weight: 600;\n  background: #f3f4f6;\n  border-radius: 6px;\n  padding: 4px 10px;\n  display: inline-block;\n}\n.section {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n}\n.section__title {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 16px;\n}\n.tenant-table {\n  display: flex;\n  flex-direction: column;\n}\n.tenant-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 0;\n  border-bottom: 1px solid #f3f4f6;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.tenant-row:last-child {\n  border-bottom: none;\n}\n.tenant-row__name {\n  font-weight: 600;\n  font-size: 14px;\n}\n.tenant-row__meta {\n  font-size: 12px;\n  color: #9ca3af;\n  margin-top: 2px;\n}\n.tenant-row__right {\n  display: flex;\n  gap: 8px;\n}\n.plan-select,\n.status-select {\n  font-size: 13px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 5px 8px;\n  cursor: pointer;\n}\n.hint {\n  color: #9ca3af;\n  font-size: 14px;\n  padding: 16px 0;\n  text-align: center;\n}\n/*# sourceMappingURL=plans.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlansComponent, { className: "PlansComponent", filePath: "apps/master-admin/src/app/features/plans/plans.component.ts", lineNumber: 106 });
})();
export {
  PlansComponent
};
//# sourceMappingURL=chunk-TCD52XHW.js.map
