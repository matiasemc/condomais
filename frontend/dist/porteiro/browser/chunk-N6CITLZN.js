import {
  ToastService
} from "./chunk-OPK7ZD72.js";
import {
  RouterLink
} from "./chunk-IEQM2DAI.js";
import {
  BadgeComponent,
  ChangeDetectionStrategy,
  Component,
  EmptyStateComponent,
  ListRowComponent,
  SectionHeaderComponent,
  TabBarComponent,
  __spreadProps,
  __spreadValues,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-ZWQ7U6HY.js";

// apps/porteiro/src/app/features/deliveries/deliveries.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DeliveriesComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 4);
  }
}
function DeliveriesComponent_Conditional_6_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function DeliveriesComponent_Conditional_6_For_2_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const d_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.marcarRetirada(d_r2));
    });
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function DeliveriesComponent_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "cm-list-row", 7)(2, "div", 8)(3, "cm-badge", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, DeliveriesComponent_Conditional_6_For_2_Conditional_5_Template, 2, 0, "button", 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const d_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("title", d_r2.description)("subtitle", d_r2.residentName + " \xB7 Apto " + d_r2.unit)("clickable", false);
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", d_r2.status === "pendente" ? "warn" : "success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r2.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(d_r2.status === "pendente" ? 5 : -1);
  }
}
function DeliveriesComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275repeaterCreate(1, DeliveriesComponent_Conditional_6_For_2_Template, 6, 6, "div", 6, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.filtered());
  }
}
var DeliveriesComponent = class _DeliveriesComponent {
  constructor(toast) {
    this.toast = toast;
    this.tabs = [
      { id: "todas", label: "Todas" },
      { id: "aguardando", label: "Aguardando" },
      { id: "retiradas", label: "Retiradas" }
    ];
    this.activeTab = signal("todas");
    this.allDeliveries = signal([
      { id: "1", residentName: "Ana Lima", unit: "101", description: "Caixa Amazon", arrivedAt: "2026-04-18T10:00:00", status: "pendente" },
      { id: "2", residentName: "Ana Lima", unit: "101", description: "Correios", arrivedAt: "2026-04-17T14:30:00", status: "pendente" },
      { id: "3", residentName: "Carla Souza", unit: "201", description: "Mercado Livre", arrivedAt: "2026-04-19T09:00:00", status: "pendente" },
      { id: "4", residentName: "Elisa Ferreira", unit: "301", description: "Shopee", arrivedAt: "2026-04-20T08:00:00", status: "pendente" },
      { id: "5", residentName: "Bruno Costa", unit: "102", description: "iFood bag", arrivedAt: "2026-04-10T12:00:00", status: "retirada" },
      { id: "6", residentName: "Felipe Nunes", unit: "302", description: "DHL", arrivedAt: "2026-04-09T16:00:00", status: "retirada" }
    ]);
    this.filtered = computed(() => {
      const tab = this.activeTab();
      return this.allDeliveries().filter((d) => tab === "todas" ? true : tab === "aguardando" ? d.status === "pendente" : d.status === "retirada");
    });
  }
  marcarRetirada(d) {
    this.allDeliveries.update((list) => list.map((item) => item.id === d.id ? __spreadProps(__spreadValues({}, item), { status: "retirada" }) : item));
    this.toast.show({ message: `Entrega de ${d.residentName} marcada como retirada`, type: "success" });
  }
  static {
    this.\u0275fac = function DeliveriesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DeliveriesComponent)(\u0275\u0275directiveInject(ToastService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeliveriesComponent, selectors: [["cm-deliveries"]], decls: 7, vars: 3, consts: [[1, "deliveries-page"], ["title", "Entregas", "eyebrow", "PORTARIA"], ["routerLink", "/entregas/nova", 1, "new-btn"], [3, "tabChange", "tabs", "activeId"], ["icon", "\u{1F4E6}", "title", "Nenhuma entrega", "subtitle", "Registre uma nova entrega"], [1, "delivery-list"], [1, "delivery-item"], ["icon", "\u{1F4E6}", 3, "title", "subtitle", "clickable"], ["slot", "end", 1, "delivery-actions"], [3, "variant"], [1, "confirm-btn"], [1, "confirm-btn", 3, "click"]], template: function DeliveriesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "cm-section-header", 1)(2, "a", 2);
        \u0275\u0275text(3, "+ Nova");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "cm-tab-bar", 3);
        \u0275\u0275listener("tabChange", function DeliveriesComponent_Template_cm_tab_bar_tabChange_4_listener($event) {
          return ctx.activeTab.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, DeliveriesComponent_Conditional_5_Template, 1, 0, "cm-empty-state", 4)(6, DeliveriesComponent_Conditional_6_Template, 3, 0, "div", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("tabs", ctx.tabs)("activeId", ctx.activeTab());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.filtered().length === 0 ? 5 : 6);
      }
    }, dependencies: [RouterLink, TabBarComponent, BadgeComponent, ListRowComponent, SectionHeaderComponent, EmptyStateComponent], styles: ["\n\n.deliveries-page[_ngcontent-%COMP%] {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.new-btn[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-accent);\n  text-decoration: none;\n  padding: var(--s-1) var(--s-3);\n  border: 1.5px solid var(--c-accent);\n  border-radius: var(--r-pill);\n}\n.delivery-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.delivery-item[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.delivery-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-2);\n}\n.confirm-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: none;\n  background: var(--c-success);\n  color: #fff;\n  font-size: 14px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 0.15s;\n}\n.confirm-btn[_ngcontent-%COMP%]:active {\n  opacity: 0.7;\n}\n/*# sourceMappingURL=deliveries.component.css.map */"], changeDetection: 0 });
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

  @if (filtered().length === 0) {
    <cm-empty-state icon="\u{1F4E6}" title="Nenhuma entrega" subtitle="Registre uma nova entrega"></cm-empty-state>
  } @else {
    <div class="delivery-list">
      @for (d of filtered(); track d.id) {
        <div class="delivery-item">
          <cm-list-row
            [title]="d.description"
            [subtitle]="d.residentName + ' \xB7 Apto ' + d.unit"
            icon="\u{1F4E6}"
            [clickable]="false">
            <div slot="end" class="delivery-actions">
              <cm-badge [variant]="d.status === 'pendente' ? 'warn' : 'success'">{{ d.status }}</cm-badge>
              @if (d.status === 'pendente') {
                <button class="confirm-btn" (click)="marcarRetirada(d)">\u2713</button>
              }
            </div>
          </cm-list-row>
        </div>
      }
    </div>
  }
</div>`, styles: ["/* apps/porteiro/src/app/features/deliveries/deliveries.component.scss */\n.deliveries-page {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.new-btn {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-accent);\n  text-decoration: none;\n  padding: var(--s-1) var(--s-3);\n  border: 1.5px solid var(--c-accent);\n  border-radius: var(--r-pill);\n}\n.delivery-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.delivery-item {\n  width: 100%;\n}\n.delivery-actions {\n  display: flex;\n  align-items: center;\n  gap: var(--s-2);\n}\n.confirm-btn {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: none;\n  background: var(--c-success);\n  color: #fff;\n  font-size: 14px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 0.15s;\n}\n.confirm-btn:active {\n  opacity: 0.7;\n}\n/*# sourceMappingURL=deliveries.component.css.map */\n"] }]
  }], () => [{ type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeliveriesComponent, { className: "DeliveriesComponent", filePath: "apps/porteiro/src/app/features/deliveries/deliveries.component.ts", lineNumber: 24 });
})();
export {
  DeliveriesComponent
};
//# sourceMappingURL=chunk-N6CITLZN.js.map
