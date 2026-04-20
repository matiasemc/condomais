import {
  RouterLink
} from "./chunk-N6N7VLCZ.js";
import {
  BadgeComponent,
  EmptyStateComponent,
  TabBarComponent
} from "./chunk-3MTEG4YI.js";
import {
  ChangeDetectionStrategy,
  Component,
  DatePipe,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-KKC7QRLW.js";

// apps/morador/src/app/features/deliveries/deliveries.component.ts
var _c0 = (a0) => ["/entregas", a0];
var _forTrack0 = ($index, $item) => $item.id;
function DeliveriesComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6)(1, "div", 8);
    \u0275\u0275text(2, "\u{1F4E6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 9)(4, "p", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 11);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "cm-badge", 12);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c0, d_r2.id));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(d_r2.remetente);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", d_r2.tipo, " \xB7 ", \u0275\u0275pipeBind2(8, 6, d_r2.criadaEm, "dd/MM HH:mm"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", d_r2.status === "pendente" ? "accent" : "success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r2.status === "pendente" ? "Aguardando" : "Retirada", " ");
  }
}
function DeliveriesComponent_ForEmpty_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275propertyInterpolate1("subtitle", "Voc\xEA n\xE3o tem entregas ", ctx_r0.activeTab() === "pendente" ? "pendentes" : "retiradas", " no momento.");
  }
}
var DeliveriesComponent = class _DeliveriesComponent {
  constructor() {
    this.tabs = [
      { id: "pendente", label: "Aguardando" },
      { id: "retirada", label: "Retiradas" }
    ];
    this.activeTab = signal("pendente");
    this.deliveries = signal([
      { id: "1", morador: "Jo\xE3o Silva", apto: "1204", torre: "B", remetente: "Mercado Livre", tipo: "Caixa pequena", status: "pendente", criadaEm: /* @__PURE__ */ new Date() },
      { id: "2", morador: "Jo\xE3o Silva", apto: "1204", torre: "B", remetente: "Amazon", tipo: "Envelope", status: "pendente", criadaEm: new Date(Date.now() - 864e5) },
      { id: "3", morador: "Jo\xE3o Silva", apto: "1204", torre: "B", remetente: "Shopee", tipo: "Caixa grande", status: "retirada", criadaEm: new Date(Date.now() - 3 * 864e5) }
    ]);
    this.filtered = computed(() => this.deliveries().filter((d) => d.status === this.activeTab()));
  }
  static {
    this.\u0275fac = function DeliveriesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DeliveriesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeliveriesComponent, selectors: [["cm-deliveries"]], decls: 10, vars: 3, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__tabs"], [3, "tabChange", "tabs", "activeId"], [1, "delivery-list"], [1, "delivery-row", 3, "routerLink"], ["icon", "\u{1F4ED}", "title", "Nenhuma entrega", 3, "subtitle"], [1, "delivery-row__icon"], [1, "delivery-row__body"], [1, "delivery-row__title"], [1, "delivery-row__sub"], [3, "variant"]], template: function DeliveriesComponent_Template(rf, ctx) {
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
        \u0275\u0275repeaterCreate(7, DeliveriesComponent_For_8_Template, 11, 11, "a", 6, _forTrack0, false, DeliveriesComponent_ForEmpty_9_Template, 1, 2, "cm-empty-state", 7);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("tabs", ctx.tabs)("activeId", ctx.activeTab());
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.filtered());
      }
    }, dependencies: [DatePipe, RouterLink, TabBarComponent, BadgeComponent, EmptyStateComponent], styles: ["\n\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  padding: var(--s-6) var(--s-5) var(--s-4);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.page__tabs[_ngcontent-%COMP%] {\n  padding: var(--s-4) var(--s-5);\n}\n.delivery-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.delivery-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4) var(--s-5);\n  text-decoration: none;\n  color: var(--c-text);\n  border-bottom: 1px solid var(--c-border);\n  background: var(--c-card);\n  transition: background var(--t-fast);\n}\n.delivery-row[_ngcontent-%COMP%]:first-child {\n  border-top: 1px solid var(--c-border);\n}\n.delivery-row[_ngcontent-%COMP%]:active {\n  background: var(--c-card-muted);\n}\n.delivery-row__icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: var(--r-sm);\n  background: var(--c-accent-soft);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.delivery-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.delivery-row__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.delivery-row__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=deliveries.component.css.map */"], changeDetection: 0 });
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
        @for (d of filtered(); track d.id) {
          <a class="delivery-row" [routerLink]="['/entregas', d.id]">
            <div class="delivery-row__icon">\u{1F4E6}</div>
            <div class="delivery-row__body">
              <p class="delivery-row__title">{{ d.remetente }}</p>
              <p class="delivery-row__sub">{{ d.tipo }} \xB7 {{ d.criadaEm | date:'dd/MM HH:mm' }}</p>
            </div>
            <cm-badge [variant]="d.status === 'pendente' ? 'accent' : 'success'">
              {{ d.status === 'pendente' ? 'Aguardando' : 'Retirada' }}
            </cm-badge>
          </a>
        } @empty {
          <cm-empty-state icon="\u{1F4ED}" title="Nenhuma entrega"
            subtitle="Voc\xEA n\xE3o tem entregas {{ activeTab() === 'pendente' ? 'pendentes' : 'retiradas' }} no momento.">
          </cm-empty-state>
        }
      </div>
    </div>
  `, styles: ["/* apps/morador/src/app/features/deliveries/deliveries.component.scss */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  padding: var(--s-6) var(--s-5) var(--s-4);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.page__tabs {\n  padding: var(--s-4) var(--s-5);\n}\n.delivery-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.delivery-row {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4) var(--s-5);\n  text-decoration: none;\n  color: var(--c-text);\n  border-bottom: 1px solid var(--c-border);\n  background: var(--c-card);\n  transition: background var(--t-fast);\n}\n.delivery-row:first-child {\n  border-top: 1px solid var(--c-border);\n}\n.delivery-row:active {\n  background: var(--c-card-muted);\n}\n.delivery-row__icon {\n  width: 44px;\n  height: 44px;\n  border-radius: var(--r-sm);\n  background: var(--c-accent-soft);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.delivery-row__body {\n  flex: 1;\n  min-width: 0;\n}\n.delivery-row__title {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.delivery-row__sub {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=deliveries.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeliveriesComponent, { className: "DeliveriesComponent", filePath: "apps/morador/src/app/features/deliveries/deliveries.component.ts", lineNumber: 44 });
})();
export {
  DeliveriesComponent
};
//# sourceMappingURL=chunk-L4EMBM2I.js.map
