import {
  RouterLink
} from "./chunk-22JHDSMV.js";
import {
  BadgeComponent
} from "./chunk-VUTJB2DO.js";
import "./chunk-RE6VNHJT.js";
import {
  ChangeDetectionStrategy,
  Component,
  DecimalPipe,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QFVHJJPM.js";

// apps/morador/src/app/features/marketplace/marketplace.component.ts
var _c0 = (a0) => ["/marketplace", a0];
var _forTrack0 = ($index, $item) => $item.id;
function MarketplaceComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 5)(1, "div", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 7)(4, "cm-badge", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 9);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 10);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c0, item_r1.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.categoria === "M\xF3veis" ? "\u{1FA91}" : "\u{1F4E6}");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r1.categoria);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("R$ ", \u0275\u0275pipeBind2(10, 5, item_r1.preco, "1.2-2"), "");
  }
}
var MarketplaceComponent = class _MarketplaceComponent {
  constructor() {
    this.items = signal([
      { id: "1", titulo: "Sof\xE1 3 lugares", preco: 800, categoria: "M\xF3veis", descricao: "Sof\xE1 em \xF3timo estado.", vendedor: "Ana Costa", whatsapp: "11999990001", criadoEm: /* @__PURE__ */ new Date() },
      { id: "2", titulo: "Bicicleta ergom\xE9trica", preco: 350, categoria: "Esportes", descricao: "Uso leve, funciona perfeitamente.", vendedor: "Carlos M.", whatsapp: "11999990002", criadoEm: /* @__PURE__ */ new Date() },
      { id: "3", titulo: "Mesa de escrit\xF3rio", preco: 420, categoria: "M\xF3veis", descricao: "Mesa ampla com gavetas.", vendedor: "Fernanda L.", whatsapp: "11999990003", criadoEm: /* @__PURE__ */ new Date() },
      { id: "4", titulo: "Livros variados", preco: 50, categoria: "Livros", descricao: "Lote com 20 livros.", vendedor: "Pedro S.", whatsapp: "11999990004", criadoEm: /* @__PURE__ */ new Date() }
    ]);
  }
  static {
    this.\u0275fac = function MarketplaceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MarketplaceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MarketplaceComponent, selectors: [["cm-marketplace"]], decls: 9, vars: 0, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__sub"], [1, "grid"], [1, "item-card", 3, "routerLink"], [1, "item-card__img"], [1, "item-card__body"], ["variant", "neutral"], [1, "item-card__title"], [1, "item-card__price"]], template: function MarketplaceComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Mercado do Condom\xEDnio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, "Compre e venda com seus vizinhos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4);
        \u0275\u0275repeaterCreate(7, MarketplaceComponent_For_8_Template, 11, 10, "a", 5, _forTrack0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275repeater(ctx.items());
      }
    }, dependencies: [DecimalPipe, RouterLink, BadgeComponent], styles: ["\n\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  padding: var(--s-6) var(--s-5) var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0 0 var(--s-1);\n}\n.page__sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-4);\n  padding: var(--s-5);\n}\n.item-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  text-decoration: none;\n  color: var(--c-text);\n  overflow: hidden;\n  transition: transform var(--t-fast);\n}\n.item-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.item-card__img[_ngcontent-%COMP%] {\n  height: 100px;\n  background: var(--c-card-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 40px;\n}\n.item-card__body[_ngcontent-%COMP%] {\n  padding: var(--s-3);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-1);\n}\n.item-card__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  margin: 0;\n}\n.item-card__price[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--c-accent);\n  margin: 0;\n}\n/*# sourceMappingURL=marketplace.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MarketplaceComponent, [{
    type: Component,
    args: [{ selector: "cm-marketplace", standalone: true, imports: [DecimalPipe, RouterLink, BadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Mercado do Condom\xEDnio</h1>
        <p class="page__sub">Compre e venda com seus vizinhos</p>
      </div>
      <div class="grid">
        @for (item of items(); track item.id) {
          <a class="item-card" [routerLink]="['/marketplace', item.id]">
            <div class="item-card__img">{{ item.categoria === 'M\xF3veis' ? '\u{1FA91}' : '\u{1F4E6}' }}</div>
            <div class="item-card__body">
              <cm-badge variant="neutral">{{ item.categoria }}</cm-badge>
              <p class="item-card__title">{{ item.titulo }}</p>
              <p class="item-card__price">R$ {{ item.preco | number:'1.2-2' }}</p>
            </div>
          </a>
        }
      </div>
    </div>
  `, styles: ["/* apps/morador/src/app/features/marketplace/marketplace.component.scss */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  padding: var(--s-6) var(--s-5) var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0 0 var(--s-1);\n}\n.page__sub {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-4);\n  padding: var(--s-5);\n}\n.item-card {\n  display: flex;\n  flex-direction: column;\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  text-decoration: none;\n  color: var(--c-text);\n  overflow: hidden;\n  transition: transform var(--t-fast);\n}\n.item-card:active {\n  transform: scale(0.97);\n}\n.item-card__img {\n  height: 100px;\n  background: var(--c-card-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 40px;\n}\n.item-card__body {\n  padding: var(--s-3);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-1);\n}\n.item-card__title {\n  font-size: 13px;\n  font-weight: 600;\n  margin: 0;\n}\n.item-card__price {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--c-accent);\n  margin: 0;\n}\n/*# sourceMappingURL=marketplace.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MarketplaceComponent, { className: "MarketplaceComponent", filePath: "apps/morador/src/app/features/marketplace/marketplace.component.ts", lineNumber: 34 });
})();
export {
  MarketplaceComponent
};
//# sourceMappingURL=chunk-UDPRTV3C.js.map
