import {
  ToastService
} from "./chunk-JPM7X6WV.js";
import "./chunk-TF4WZQI6.js";
import {
  BadgeComponent,
  EmptyStateComponent,
  ListRowComponent,
  SectionHeaderComponent,
  TabBarComponent
} from "./chunk-TTJJPAUX.js";
import {
  AuthState,
  DeliveryService
} from "./chunk-PSJDYNQK.js";
import {
  RouterLink
} from "./chunk-DRD3LIJU.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  __async,
  computed,
  effect,
  inject,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-NH5B5NLZ.js";

// apps/porteiro/src/app/features/deliveries/deliveries.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DeliveriesComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 4);
  }
}
function DeliveriesComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 5);
  }
}
function DeliveriesComponent_Conditional_7_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function DeliveriesComponent_Conditional_7_For_2_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const d_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.marcarRetirada(d_r2));
    });
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function DeliveriesComponent_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "cm-list-row", 8)(2, "div", 9)(3, "cm-badge", 10);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, DeliveriesComponent_Conditional_7_For_2_Conditional_5_Template, 2, 0, "button", 11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const d_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("title", d_r2.descricao ?? d_r2.tipo)("subtitle", "Apto " + d_r2.unidade + (d_r2.transportadora ? " \xB7 " + d_r2.transportadora : ""))("clickable", false);
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", d_r2.status === "pendente" || d_r2.status === "notificada" ? "warn" : "success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r2.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r2.status === "pendente" || d_r2.status === "notificada" ? 5 : -1);
  }
}
function DeliveriesComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275repeaterCreate(1, DeliveriesComponent_Conditional_7_For_2_Template, 6, 6, "div", 7, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.filtered());
  }
}
var DeliveriesComponent = class _DeliveriesComponent {
  constructor() {
    this.deliveryService = inject(DeliveryService);
    this.authState = inject(AuthState);
    this.toast = inject(ToastService);
    this.tabs = [
      { id: "todas", label: "Todas" },
      { id: "aguardando", label: "Aguardando" },
      { id: "retiradas", label: "Retiradas" }
    ];
    this.activeTab = signal("todas", ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isLoading = this.deliveryService.isLoading;
    this.deliveries = this.deliveryService.deliveries;
    this.filtered = computed(() => {
      const tab = this.activeTab();
      const list = this.deliveries();
      if (tab === "todas")
        return list;
      if (tab === "aguardando")
        return list.filter((d) => d.status === "pendente" || d.status === "notificada");
      return list.filter((d) => d.status === "retirada");
    }, ...ngDevMode ? [{ debugName: "filtered" }] : (
      /* istanbul ignore next */
      []
    ));
    inject(DestroyRef).onDestroy(() => this.deliveryService.stopRealtime());
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant)
        this.deliveryService.loadForTenant(tenant.id);
    });
  }
  marcarRetirada(d) {
    return __async(this, null, function* () {
      const user = this.authState.user();
      const quem = user?.email ?? "Porteiro";
      const ok = yield this.deliveryService.marcarRetirada(d.id, quem);
      if (ok) {
        this.toast.show({ message: `Apto ${d.unidade} \xE2\u20AC\u201D entrega marcada como retirada`, type: "success" });
      } else {
        this.toast.show({ message: "Erro ao atualizar entrega", type: "error" });
      }
    });
  }
  static {
    this.\u0275fac = function DeliveriesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DeliveriesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeliveriesComponent, selectors: [["cm-deliveries"]], decls: 8, vars: 3, consts: [[1, "deliveries-page"], ["title", "Entregas", "eyebrow", "PORTARIA"], ["routerLink", "/entregas/nova", 1, "new-btn"], [3, "tabChange", "tabs", "activeId"], ["icon", "\u23F3", "title", "Carregando\u2026", "subtitle", "Buscando entregas"], ["icon", "\u{1F4E6}", "title", "Nenhuma entrega", "subtitle", "Registre uma nova entrega"], [1, "delivery-list"], [1, "delivery-item"], ["icon", "\u{1F4E6}", 3, "title", "subtitle", "clickable"], ["slot", "end", 1, "delivery-actions"], [3, "variant"], [1, "confirm-btn"], [1, "confirm-btn", 3, "click"]], template: function DeliveriesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "cm-section-header", 1)(2, "a", 2);
        \u0275\u0275text(3, "+ Nova");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "cm-tab-bar", 3);
        \u0275\u0275listener("tabChange", function DeliveriesComponent_Template_cm_tab_bar_tabChange_4_listener($event) {
          return ctx.activeTab.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(5, DeliveriesComponent_Conditional_5_Template, 1, 0, "cm-empty-state", 4)(6, DeliveriesComponent_Conditional_6_Template, 1, 0, "cm-empty-state", 5)(7, DeliveriesComponent_Conditional_7_Template, 3, 0, "div", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("tabs", ctx.tabs)("activeId", ctx.activeTab());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isLoading() ? 5 : ctx.filtered().length === 0 ? 6 : 7);
      }
    }, dependencies: [RouterLink, TabBarComponent, BadgeComponent, ListRowComponent, SectionHeaderComponent, EmptyStateComponent], styles: ["\n.deliveries-page[_ngcontent-%COMP%] {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.new-btn[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-accent);\n  text-decoration: none;\n  padding: var(--s-1) var(--s-3);\n  border: 1.5px solid var(--c-accent);\n  border-radius: var(--r-pill);\n}\n.delivery-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.delivery-item[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.delivery-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-2);\n}\n.confirm-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: none;\n  background: var(--c-success);\n  color: #fff;\n  font-size: 14px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 0.15s;\n}\n.confirm-btn[_ngcontent-%COMP%]:active {\n  opacity: 0.7;\n}\n/*# sourceMappingURL=deliveries.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeliveriesComponent, [{
    type: Component,
    args: [{ selector: "cm-deliveries", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, TabBarComponent, BadgeComponent, ListRowComponent, SectionHeaderComponent, EmptyStateComponent], template: `<div class="deliveries-page">
  <cm-section-header title="Entregas" eyebrow="PORTARIA">
    <a routerLink="/entregas/nova" class="new-btn">+ Nova</a>
  </cm-section-header>

  <cm-tab-bar [tabs]="tabs" [activeId]="activeTab()" (tabChange)="activeTab.set($event)"></cm-tab-bar>

  @if (isLoading()) {
    <cm-empty-state icon="\u23F3" title="Carregando\u2026" subtitle="Buscando entregas"></cm-empty-state>
  } @else if (filtered().length === 0) {
    <cm-empty-state icon="\u{1F4E6}" title="Nenhuma entrega" subtitle="Registre uma nova entrega"></cm-empty-state>
  } @else {
    <div class="delivery-list">
      @for (d of filtered(); track d.id) {
        <div class="delivery-item">
          <cm-list-row
            [title]="d.descricao ?? d.tipo"
            [subtitle]="'Apto ' + d.unidade + (d.transportadora ? ' \xB7 ' + d.transportadora : '')"
            icon="\u{1F4E6}"
            [clickable]="false">
            <div slot="end" class="delivery-actions">
              <cm-badge [variant]="d.status === 'pendente' || d.status === 'notificada' ? 'warn' : 'success'">{{ d.status }}</cm-badge>
              @if (d.status === 'pendente' || d.status === 'notificada') {
                <button class="confirm-btn" (click)="marcarRetirada(d)">\u2713</button>
              }
            </div>
          </cm-list-row>
        </div>
      }
    </div>
  }
</div>`, styles: ["/* apps/porteiro/src/app/features/deliveries/deliveries.component.css */\n.deliveries-page {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.new-btn {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-accent);\n  text-decoration: none;\n  padding: var(--s-1) var(--s-3);\n  border: 1.5px solid var(--c-accent);\n  border-radius: var(--r-pill);\n}\n.delivery-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.delivery-item {\n  width: 100%;\n}\n.delivery-actions {\n  display: flex;\n  align-items: center;\n  gap: var(--s-2);\n}\n.confirm-btn {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: none;\n  background: var(--c-success);\n  color: #fff;\n  font-size: 14px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 0.15s;\n}\n.confirm-btn:active {\n  opacity: 0.7;\n}\n/*# sourceMappingURL=deliveries.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeliveriesComponent, { className: "DeliveriesComponent", filePath: "apps/porteiro/src/app/features/deliveries/deliveries.component.ts", lineNumber: 17 });
})();
export {
  DeliveriesComponent
};
//# sourceMappingURL=chunk-M7PYFMLL.js.map
