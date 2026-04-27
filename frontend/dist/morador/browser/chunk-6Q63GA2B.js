import {
  BadgeComponent,
  EmptyStateComponent,
  TabBarComponent
} from "./chunk-2E4G4N2I.js";
import {
  AuthState,
  DeliveryService,
  NotificationService
} from "./chunk-IQFUSNZ4.js";
import "./chunk-R6BDYNR2.js";
import {
  RouterLink
} from "./chunk-KU6U7BFN.js";
import {
  DatePipe
} from "./chunk-UEEOQNAF.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/deliveries/deliveries.component.ts
var _c0 = (a0) => ["/entregas", a0];
var _forTrack0 = ($index, $item) => $item.id;
function DeliveriesComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 6);
  }
}
function DeliveriesComponent_Conditional_8_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 7)(1, "div", 9);
    \u0275\u0275text(2, "\xF0\u0178\u201C\xA6");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 10)(4, "p", 11);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 12);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "cm-badge", 13);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c0, d_r2.id));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(d_r2.transportadora ?? d_r2.tipo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", d_r2.tipo, " \xC2\xB7 ", \u0275\u0275pipeBind2(8, 6, d_r2.createdAt, "dd/MM HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", d_r2.status === "pendente" || d_r2.status === "notificada" ? "accent" : "success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r2.status === "retirada" ? "Retirada" : "Aguardando", " ");
  }
}
function DeliveriesComponent_Conditional_8_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("subtitle", "Voc\xC3\xAA n\xC3\xA3o tem entregas " + (ctx_r0.activeTab() === "pendente" ? "pendentes" : "retiradas") + " no momento.");
  }
}
function DeliveriesComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DeliveriesComponent_Conditional_8_For_1_Template, 11, 11, "a", 7, _forTrack0, false, DeliveriesComponent_Conditional_8_ForEmpty_2_Template, 1, 1, "cm-empty-state", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.filtered());
  }
}
var DeliveriesComponent = class _DeliveriesComponent {
  constructor() {
    this.deliveryService = inject(DeliveryService);
    this.authState = inject(AuthState);
    this.notifSvc = inject(NotificationService);
    this.tabs = [
      { id: "pendente", label: "Aguardando" },
      { id: "retirada", label: "Retiradas" }
    ];
    this.activeTab = signal("pendente", ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isLoading = this.deliveryService.isLoading;
    this.deliveries = this.deliveryService.deliveries;
    this.filtered = computed(() => {
      const tab = this.activeTab();
      const list = this.deliveries();
      if (tab === "pendente")
        return list.filter((d) => d.status === "pendente" || d.status === "notificada");
      return list.filter((d) => d.status === "retirada");
    }, ...ngDevMode ? [{ debugName: "filtered" }] : (
      /* istanbul ignore next */
      []
    ));
    this.notifSvc.markAllAsRead();
    inject(DestroyRef).onDestroy(() => this.deliveryService.stopRealtime());
    effect(() => {
      const user = this.authState.user();
      const tenant = this.authState.currentTenant();
      if (user && tenant) {
        this.deliveryService.loadForUser(user.id, tenant.id);
      }
    });
  }
  static {
    this.\u0275fac = function DeliveriesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DeliveriesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeliveriesComponent, selectors: [["cm-deliveries"]], decls: 9, vars: 3, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__tabs"], [3, "tabChange", "tabs", "activeId"], [1, "delivery-list"], ["icon", "\xE2\x8F\xB3", "title", "Carregando\xE2\u20AC\xA6", "subtitle", "Buscando suas entregas"], [1, "delivery-row", 3, "routerLink"], ["icon", "\xF0\u0178\u201C\xAD", "title", "Nenhuma entrega", 3, "subtitle"], [1, "delivery-row__icon"], [1, "delivery-row__body"], [1, "delivery-row__title"], [1, "delivery-row__sub"], [3, "variant"]], template: function DeliveriesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Minhas Entregas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 3)(5, "cm-tab-bar", 4);
        \u0275\u0275listener("tabChange", function DeliveriesComponent_Template_cm_tab_bar_tabChange_5_listener($event) {
          return ctx.activeTab.set($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 5);
        \u0275\u0275conditionalCreate(7, DeliveriesComponent_Conditional_7_Template, 1, 0, "cm-empty-state", 6)(8, DeliveriesComponent_Conditional_8_Template, 3, 1);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("tabs", ctx.tabs)("activeId", ctx.activeTab());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.isLoading() ? 7 : 8);
      }
    }, dependencies: [RouterLink, TabBarComponent, BadgeComponent, EmptyStateComponent, DatePipe], styles: ["\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  padding: var(--s-6) var(--s-5) var(--s-4);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.page__tabs[_ngcontent-%COMP%] {\n  padding: var(--s-4) var(--s-5);\n}\n.delivery-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.delivery-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4) var(--s-5);\n  text-decoration: none;\n  color: var(--c-text);\n  border-bottom: 1px solid var(--c-border);\n  background: var(--c-card);\n  transition: background var(--t-fast);\n}\n.delivery-row[_ngcontent-%COMP%]:first-child {\n  border-top: 1px solid var(--c-border);\n}\n.delivery-row[_ngcontent-%COMP%]:active {\n  background: var(--c-card-muted);\n}\n.delivery-row__icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: var(--r-sm);\n  background: var(--c-accent-soft);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.delivery-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.delivery-row__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.delivery-row__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=deliveries.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeliveriesComponent, [{
    type: Component,
    args: [{ selector: "cm-deliveries", standalone: true, imports: [DatePipe, RouterLink, TabBarComponent, BadgeComponent, EmptyStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Minhas Entregas</h1>
      </div>
      <div class="page__tabs">
        <cm-tab-bar [tabs]="tabs" [activeId]="activeTab()" (tabChange)="activeTab.set($event)"></cm-tab-bar>
      </div>
      <div class="delivery-list">
        @if (isLoading()) {
          <cm-empty-state icon="\xE2\x8F\xB3" title="Carregando\xE2\u20AC\xA6" subtitle="Buscando suas entregas"></cm-empty-state>
        } @else {
          @for (d of filtered(); track d.id) {
            <a class="delivery-row" [routerLink]="['/entregas', d.id]">
              <div class="delivery-row__icon">\xF0\u0178\u201C\xA6</div>
              <div class="delivery-row__body">
                <p class="delivery-row__title">{{ d.transportadora ?? d.tipo }}</p>
                <p class="delivery-row__sub">{{ d.tipo }} \xC2\xB7 {{ d.createdAt | date:'dd/MM HH:mm' }}</p>
              </div>
              <cm-badge [variant]="d.status === 'pendente' || d.status === 'notificada' ? 'accent' : 'success'">
                {{ d.status === 'retirada' ? 'Retirada' : 'Aguardando' }}
              </cm-badge>
            </a>
          } @empty {
            <cm-empty-state icon="\xF0\u0178\u201C\xAD" title="Nenhuma entrega"
              [subtitle]="'Voc\xC3\xAA n\xC3\xA3o tem entregas ' + (activeTab() === 'pendente' ? 'pendentes' : 'retiradas') + ' no momento.'">
            </cm-empty-state>
          }
        }
      </div>
    </div>
  `, styles: ["/* apps/morador/src/app/features/deliveries/deliveries.component.css */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  padding: var(--s-6) var(--s-5) var(--s-4);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.page__tabs {\n  padding: var(--s-4) var(--s-5);\n}\n.delivery-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.delivery-row {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4) var(--s-5);\n  text-decoration: none;\n  color: var(--c-text);\n  border-bottom: 1px solid var(--c-border);\n  background: var(--c-card);\n  transition: background var(--t-fast);\n}\n.delivery-row:first-child {\n  border-top: 1px solid var(--c-border);\n}\n.delivery-row:active {\n  background: var(--c-card-muted);\n}\n.delivery-row__icon {\n  width: 44px;\n  height: 44px;\n  border-radius: var(--r-sm);\n  background: var(--c-accent-soft);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.delivery-row__body {\n  flex: 1;\n  min-width: 0;\n}\n.delivery-row__title {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.delivery-row__sub {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=deliveries.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeliveriesComponent, { className: "DeliveriesComponent", filePath: "apps/morador/src/app/features/deliveries/deliveries.component.ts", lineNumber: 47 });
})();
export {
  DeliveriesComponent
};
//# sourceMappingURL=chunk-6Q63GA2B.js.map
