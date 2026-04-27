import {
  BadgeComponent,
  EmptyStateComponent,
  SearchInputComponent
} from "./chunk-OBMUP4XE.js";
import {
  AuthState,
  DeliveryService
} from "./chunk-OKLNA4DD.js";
import {
  DatePipe
} from "./chunk-YX7IELSF.js";
import {
  ChangeDetectionStrategy,
  Component,
  __async,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-UHB6DSJH.js";

// apps/admin/src/app/features/deliveries/deliveries.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminDeliveriesComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function AdminDeliveriesComponent_For_10_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTab.set(tab_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("filter-tab--active", ctx_r2.activeTab() === tab_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r2.label);
  }
}
function AdminDeliveriesComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 8);
  }
}
function AdminDeliveriesComponent_Conditional_12_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function AdminDeliveriesComponent_Conditional_12_For_2_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const d_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.marcarRetirada(d_r5.id));
    });
    \u0275\u0275text(1, "Marcar retirada");
    \u0275\u0275elementEnd();
  }
}
function AdminDeliveriesComponent_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 13)(2, "p", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 15);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 16)(8, "cm-badge", 17);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, AdminDeliveriesComponent_Conditional_12_For_2_Conditional_10_Template, 2, 0, "button", 18);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Unidade ", d_r5.unidade);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", d_r5.tipo, "", d_r5.transportadora ? " \xB7 " + d_r5.transportadora : "", " \xB7 ", \u0275\u0275pipeBind2(6, 7, d_r5.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275property("variant", d_r5.status === "pendente" ? "warning" : "success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r5.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r5.status === "pendente" ? 10 : -1);
  }
}
function AdminDeliveriesComponent_Conditional_12_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 12);
  }
}
function AdminDeliveriesComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AdminDeliveriesComponent_Conditional_12_For_2_Template, 11, 10, "div", 11, _forTrack0, false, AdminDeliveriesComponent_Conditional_12_ForEmpty_3_Template, 1, 0, "cm-empty-state", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.filtered());
  }
}
var AdminDeliveriesComponent = class _AdminDeliveriesComponent {
  constructor() {
    this.svc = inject(DeliveryService);
    this.state = inject(AuthState);
    this.tabs = [
      { id: "all", label: "Todas" },
      { id: "pendente", label: "Pendentes" },
      { id: "retirada", label: "Retiradas" }
    ];
    this.activeTab = signal("all", ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    ));
    this.search = signal("", ...ngDevMode ? [{ debugName: "search" }] : (
      /* istanbul ignore next */
      []
    ));
    this.filtered = computed(() => {
      const tab = this.activeTab();
      const query = this.search().toLowerCase();
      return this.svc.deliveries().filter((d) => tab === "all" || d.status === tab).filter((d) => !query || d.unidade.toLowerCase().includes(query) || (d.transportadora ?? "").toLowerCase().includes(query));
    }, ...ngDevMode ? [{ debugName: "filtered" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      const tenant = this.state.currentTenant();
      if (tenant)
        this.svc.loadForTenant(tenant.id);
    });
  }
  marcarRetirada(id) {
    return __async(this, null, function* () {
      const user = this.state.currentUser();
      if (!user)
        return;
      yield this.svc.marcarRetirada(id, user.id);
    });
  }
  static {
    this.\u0275fac = function AdminDeliveriesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminDeliveriesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDeliveriesComponent, selectors: [["cm-admin-deliveries"]], decls: 13, vars: 2, consts: [[1, "admin-page"], [1, "admin-page__header"], [1, "admin-page__title"], [1, "admin-page__count"], [1, "admin-page__filters"], ["placeholder", "Buscar por unidade ou transportadora...", 3, "valueChange"], [1, "filter-tabs"], [1, "filter-tab", 3, "filter-tab--active"], ["icon", "\u23F3", "title", "Carregando\u2026", "subtitle", ""], [1, "delivery-table"], [1, "filter-tab", 3, "click"], [1, "delivery-row"], ["icon", "\u{1F4E6}", "title", "Nenhuma entrega encontrada", "subtitle", "Tente ajustar os filtros."], [1, "delivery-row__body"], [1, "delivery-row__unit"], [1, "delivery-row__meta"], [1, "delivery-row__right"], [3, "variant"], [1, "btn-retirada"], [1, "btn-retirada", 3, "click"]], template: function AdminDeliveriesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Entregas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4)(7, "cm-search-input", 5);
        \u0275\u0275listener("valueChange", function AdminDeliveriesComponent_Template_cm_search_input_valueChange_7_listener($event) {
          return ctx.search.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 6);
        \u0275\u0275repeaterCreate(9, AdminDeliveriesComponent_For_10_Template, 2, 3, "button", 7, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(11, AdminDeliveriesComponent_Conditional_11_Template, 1, 0, "cm-empty-state", 8)(12, AdminDeliveriesComponent_Conditional_12_Template, 4, 1, "div", 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("", ctx.filtered().length, " resultado(s)");
        \u0275\u0275advance(4);
        \u0275\u0275repeater(ctx.tabs);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.svc.isLoading() ? 11 : 12);
      }
    }, dependencies: [BadgeComponent, EmptyStateComponent, SearchInputComponent, DatePipe], styles: ["\n.filter-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  flex-wrap: wrap;\n}\n.filter-tab[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  background: #f3f4f6;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  color: #374151;\n}\n.filter-tab--active[_ngcontent-%COMP%] {\n  background: #2d6a4f;\n  color: #fff;\n}\n.delivery-table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.delivery-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 14px 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.delivery-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.delivery-row__unit[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 15px;\n}\n.delivery-row__meta[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  margin-top: 2px;\n}\n.delivery-row__right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 6px;\n}\n.btn-retirada[_ngcontent-%COMP%] {\n  font-size: 12px;\n  background: #2d6a4f;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  padding: 4px 10px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=deliveries.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminDeliveriesComponent, [{
    type: Component,
    args: [{ selector: "cm-admin-deliveries", standalone: true, imports: [DatePipe, BadgeComponent, EmptyStateComponent, SearchInputComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Entregas</h2>
        <span class="admin-page__count">{{ filtered().length }} resultado(s)</span>
      </div>

      <div class="admin-page__filters">
        <cm-search-input placeholder="Buscar por unidade ou transportadora..."
          (valueChange)="search.set($event)"></cm-search-input>
        <div class="filter-tabs">
          @for (tab of tabs; track tab.id) {
            <button class="filter-tab" [class.filter-tab--active]="activeTab() === tab.id"
              (click)="activeTab.set(tab.id)">{{ tab.label }}</button>
          }
        </div>
      </div>

      @if (svc.isLoading()) {
        <cm-empty-state icon="\u23F3" title="Carregando\u2026" subtitle=""></cm-empty-state>
      } @else {
        <div class="delivery-table">
          @for (d of filtered(); track d.id) {
            <div class="delivery-row">
              <div class="delivery-row__body">
                <p class="delivery-row__unit">Unidade {{ d.unidade }}</p>
                <p class="delivery-row__meta">{{ d.tipo }}{{ d.transportadora ? ' \xB7 ' + d.transportadora : '' }} \xB7 {{ d.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
              </div>
              <div class="delivery-row__right">
                <cm-badge [variant]="d.status === 'pendente' ? 'warning' : 'success'">{{ d.status }}</cm-badge>
                @if (d.status === 'pendente') {
                  <button class="btn-retirada" (click)="marcarRetirada(d.id)">Marcar retirada</button>
                }
              </div>
            </div>
          } @empty {
            <cm-empty-state icon="\u{1F4E6}" title="Nenhuma entrega encontrada" subtitle="Tente ajustar os filtros."></cm-empty-state>
          }
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;5767a3db8393fad11836d65718befd806fbe7d5fbbb6e1a3136a74babd6022ed;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/admin/src/app/features/deliveries/deliveries.component.ts */\n.filter-tabs {\n  display: flex;\n  gap: 4px;\n  flex-wrap: wrap;\n}\n.filter-tab {\n  padding: 6px 14px;\n  background: #f3f4f6;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  color: #374151;\n}\n.filter-tab--active {\n  background: #2d6a4f;\n  color: #fff;\n}\n.delivery-table {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.delivery-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 14px 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.delivery-row:last-child {\n  border-bottom: none;\n}\n.delivery-row__unit {\n  font-weight: 600;\n  font-size: 15px;\n}\n.delivery-row__meta {\n  font-size: 13px;\n  color: #6b7280;\n  margin-top: 2px;\n}\n.delivery-row__right {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 6px;\n}\n.btn-retirada {\n  font-size: 12px;\n  background: #2d6a4f;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  padding: 4px 10px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=deliveries.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDeliveriesComponent, { className: "AdminDeliveriesComponent", filePath: "apps/admin/src/app/features/deliveries/deliveries.component.ts", lineNumber: 66 });
})();
export {
  AdminDeliveriesComponent
};
//# sourceMappingURL=chunk-SGUVQ7R7.js.map
