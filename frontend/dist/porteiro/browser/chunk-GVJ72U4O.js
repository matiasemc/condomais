import {
  RouterLink
} from "./chunk-IEQM2DAI.js";
import {
  BadgeComponent,
  ChangeDetectionStrategy,
  Component,
  KpiCardComponent,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-ZWQ7U6HY.js";

// apps/porteiro/src/app/features/home/home.component.ts
var _c0 = () => ["/entregas"];
var _c1 = (a0) => ({ id: a0 });
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.id;
function HomeComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-kpi-card", 7);
  }
  if (rf & 2) {
    const k_r1 = ctx.$implicit;
    \u0275\u0275property("label", k_r1.label)("value", k_r1.value)("inverted", k_r1.inverted);
  }
}
function HomeComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 17)(1, "div", 18);
    \u0275\u0275text(2, "\u{1F4E6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19)(4, "p", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 21);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "cm-badge", 22);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(7, _c0))("queryParams", \u0275\u0275pureFunction1(8, _c1, d_r2.id));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", d_r2.apto, " - ", d_r2.morador, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r2.remetente);
    \u0275\u0275advance();
    \u0275\u0275property("variant", d_r2.status === "pendente" ? "accent" : "success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r2.status);
  }
}
var HomeComponent = class _HomeComponent {
  constructor() {
    this.kpis = [
      { label: "Entregas hoje", value: 7, inverted: true },
      { label: "Aguardando retirada", value: 4, inverted: false },
      { label: "Avisos ativos", value: 2, inverted: false },
      { label: "Ocorrencias abertas", value: 2, inverted: false }
    ];
    this.recentDeliveries = [
      { id: "1", morador: "Helena A.", apto: "1204 B", remetente: "Mercado Livre", status: "pendente" },
      { id: "2", morador: "Mariana C.", apto: "605 A", remetente: "Amazon", status: "pendente" },
      { id: "3", morador: "Pedro S.", apto: "302 B", remetente: "Shopee", status: "retirada" }
    ];
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["cm-porteiro-home"]], decls: 41, vars: 0, consts: [[1, "home"], [1, "home__header"], [1, "home__eyebrow"], [1, "home__title"], [1, "home__sync"], [1, "sync-dot"], [1, "kpi-grid"], [3, "label", "value", "inverted"], [1, "actions"], ["routerLink", "/entregas/nova", 1, "action-btn"], [1, "action-btn__icon"], ["routerLink", "/moradores", 1, "action-btn"], ["routerLink", "/ocorrencias/nova", 1, "action-btn"], ["routerLink", "/avisos", 1, "action-btn"], [1, "section"], [1, "section__label"], [1, "delivery-list"], [1, "delivery-row", 3, "routerLink", "queryParams"], [1, "delivery-row__icon"], [1, "delivery-row__body"], [1, "delivery-row__title"], [1, "delivery-row__sub"], [3, "variant"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "p", 2);
        \u0275\u0275text(4, "Portaria");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6, "Painel operacional");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 4);
        \u0275\u0275element(8, "span", 5);
        \u0275\u0275elementStart(9, "span");
        \u0275\u0275text(10, "Ao vivo");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(11, "div", 6);
        \u0275\u0275repeaterCreate(12, HomeComponent_For_13_Template, 1, 3, "cm-kpi-card", 7, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "div", 8)(15, "a", 9)(16, "span", 10);
        \u0275\u0275text(17, "\u{1F4E6}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "span");
        \u0275\u0275text(19, "Nova entrega");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "a", 11)(21, "span", 10);
        \u0275\u0275text(22, "\u{1F50D}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span");
        \u0275\u0275text(24, "Buscar morador");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "a", 12)(26, "span", 10);
        \u0275\u0275text(27, "\u26A0\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span");
        \u0275\u0275text(29, "Ocorrencia");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "a", 13)(31, "span", 10);
        \u0275\u0275text(32, "\u{1F4E2}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "span");
        \u0275\u0275text(34, "Avisos");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(35, "div", 14)(36, "p", 15);
        \u0275\u0275text(37, "Entregas recentes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "div", 16);
        \u0275\u0275repeaterCreate(39, HomeComponent_For_40_Template, 10, 10, "a", 17, _forTrack1);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275repeater(ctx.kpis);
        \u0275\u0275advance(27);
        \u0275\u0275repeater(ctx.recentDeliveries);
      }
    }, dependencies: [RouterLink, KpiCardComponent, BadgeComponent], styles: ["\n\n.home[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-6);\n}\n.home__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding-top: var(--s-3);\n}\n.home__eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-1);\n}\n.home__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.home__sync[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-2);\n  font-size: 12px;\n  color: var(--c-success);\n  font-weight: 600;\n}\n.sync-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--c-success);\n  animation: pulse 2s ease-in-out infinite;\n}\n.kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-3);\n}\n@media (min-width: 900px) {\n  .kpi-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n.actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: var(--s-3);\n}\n@media (min-width: 900px) {\n  .actions[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n.action-btn[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-5) var(--s-2);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  text-decoration: none;\n  color: var(--c-text);\n  transition: transform var(--t-fast);\n}\n.action-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.action-btn__icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.action-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  font-size: 13px;\n  font-weight: 500;\n  text-align: center;\n}\n.section__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.delivery-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n  border: 1px solid var(--c-border);\n}\n.delivery-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n  text-decoration: none;\n  color: var(--c-text);\n  transition: background var(--t-fast);\n}\n.delivery-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.delivery-row[_ngcontent-%COMP%]:hover {\n  background: var(--c-bg);\n}\n.delivery-row__icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.delivery-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.delivery-row__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.delivery-row__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=home.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{ selector: "cm-porteiro-home", standalone: true, imports: [RouterLink, KpiCardComponent, BadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="home">
  <div class="home__header">
    <div>
      <p class="home__eyebrow">Portaria</p>
      <h1 class="home__title">Painel operacional</h1>
    </div>
    <div class="home__sync">
      <span class="sync-dot"></span>
      <span>Ao vivo</span>
    </div>
  </div>

  <div class="kpi-grid">
    @for (k of kpis; track k.label) {
      <cm-kpi-card [label]="k.label" [value]="k.value" [inverted]="k.inverted"></cm-kpi-card>
    }
  </div>

  <div class="actions">
    <a class="action-btn" routerLink="/entregas/nova">
      <span class="action-btn__icon">\u{1F4E6}</span>
      <span>Nova entrega</span>
    </a>
    <a class="action-btn" routerLink="/moradores">
      <span class="action-btn__icon">\u{1F50D}</span>
      <span>Buscar morador</span>
    </a>
    <a class="action-btn" routerLink="/ocorrencias/nova">
      <span class="action-btn__icon">\u26A0\uFE0F</span>
      <span>Ocorrencia</span>
    </a>
    <a class="action-btn" routerLink="/avisos">
      <span class="action-btn__icon">\u{1F4E2}</span>
      <span>Avisos</span>
    </a>
  </div>

  <div class="section">
    <p class="section__label">Entregas recentes</p>
    <div class="delivery-list">
      @for (d of recentDeliveries; track d.id) {
        <a class="delivery-row" [routerLink]="['/entregas']" [queryParams]="{id: d.id}">
          <div class="delivery-row__icon">\u{1F4E6}</div>
          <div class="delivery-row__body">
            <p class="delivery-row__title">{{ d.apto }} - {{ d.morador }}</p>
            <p class="delivery-row__sub">{{ d.remetente }}</p>
          </div>
          <cm-badge [variant]="d.status === 'pendente' ? 'accent' : 'success'">{{ d.status }}</cm-badge>
        </a>
      }
    </div>
  </div>
</div>`, styles: ["/* apps/porteiro/src/app/features/home/home.component.scss */\n.home {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-6);\n}\n.home__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding-top: var(--s-3);\n}\n.home__eyebrow {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-1);\n}\n.home__title {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.home__sync {\n  display: flex;\n  align-items: center;\n  gap: var(--s-2);\n  font-size: 12px;\n  color: var(--c-success);\n  font-weight: 600;\n}\n.sync-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--c-success);\n  animation: pulse 2s ease-in-out infinite;\n}\n.kpi-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-3);\n}\n@media (min-width: 900px) {\n  .kpi-grid {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n.actions {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: var(--s-3);\n}\n@media (min-width: 900px) {\n  .actions {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n.action-btn {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-5) var(--s-2);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  text-decoration: none;\n  color: var(--c-text);\n  transition: transform var(--t-fast);\n}\n.action-btn:active {\n  transform: scale(0.97);\n}\n.action-btn__icon {\n  font-size: 28px;\n}\n.action-btn span:last-child {\n  font-size: 13px;\n  font-weight: 500;\n  text-align: center;\n}\n.section__label {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.delivery-list {\n  display: flex;\n  flex-direction: column;\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n  border: 1px solid var(--c-border);\n}\n.delivery-row {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n  text-decoration: none;\n  color: var(--c-text);\n  transition: background var(--t-fast);\n}\n.delivery-row:last-child {\n  border-bottom: none;\n}\n.delivery-row:hover {\n  background: var(--c-bg);\n}\n.delivery-row__icon {\n  font-size: 20px;\n}\n.delivery-row__body {\n  flex: 1;\n}\n.delivery-row__title {\n  font-size: 13px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.delivery-row__sub {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=home.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "apps/porteiro/src/app/features/home/home.component.ts", lineNumber: 14 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-GVJ72U4O.js.map
