import {
  BadgeComponent
} from "./chunk-2E4G4N2I.js";
import {
  AuthState,
  MarketplaceService
} from "./chunk-IQFUSNZ4.js";
import "./chunk-R6BDYNR2.js";
import {
  RouterLink
} from "./chunk-KU6U7BFN.js";
import {
  DecimalPipe
} from "./chunk-UEEOQNAF.js";
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/marketplace/marketplace.component.ts
var _c0 = (a0) => ["/marketplace", a0];
var _forTrack0 = ($index, $item) => $item.id;
function MarketplaceComponent_For_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 7);
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", item_r1.imageUrl, \u0275\u0275sanitizeUrl)("alt", item_r1.titulo);
  }
}
function MarketplaceComponent_For_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.categoryIcon(item_r1.categoria), " ");
  }
}
function MarketplaceComponent_For_8_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" R$ ", \u0275\u0275pipeBind2(1, 1, item_r1.preco, "1.2-2"), " ");
  }
}
function MarketplaceComponent_For_8_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " A combinar ");
  }
}
function MarketplaceComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 5)(1, "div", 6);
    \u0275\u0275conditionalCreate(2, MarketplaceComponent_For_8_Conditional_2_Template, 1, 2, "img", 7)(3, MarketplaceComponent_For_8_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "cm-badge", 9);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 10);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 11);
    \u0275\u0275conditionalCreate(10, MarketplaceComponent_For_8_Conditional_10_Template, 2, 4)(11, MarketplaceComponent_For_8_Conditional_11_Template, 1, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c0, item_r1.id));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r1.imageUrl ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r1.categoria);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r1.preco !== null ? 10 : 11);
  }
}
var MarketplaceComponent = class _MarketplaceComponent {
  constructor() {
    this.marketplaceService = inject(MarketplaceService);
    this.authState = inject(AuthState);
    this.items = this.marketplaceService.items;
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant)
        void this.marketplaceService.loadForTenant(tenant.id);
    });
  }
  categoryIcon(category) {
    return category.toLowerCase().includes("move") ? "M" : "#";
  }
  static {
    this.\u0275fac = function MarketplaceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MarketplaceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MarketplaceComponent, selectors: [["cm-marketplace"]], decls: 9, vars: 0, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__sub"], [1, "grid"], [1, "item-card", 3, "routerLink"], [1, "item-card__img"], [3, "src", "alt"], [1, "item-card__body"], ["variant", "neutral"], [1, "item-card__title"], [1, "item-card__price"]], template: function MarketplaceComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Mercado do Condominio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, "Compre e venda com seus vizinhos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4);
        \u0275\u0275repeaterCreate(7, MarketplaceComponent_For_8_Template, 12, 7, "a", 5, _forTrack0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275repeater(ctx.items());
      }
    }, dependencies: [RouterLink, BadgeComponent, DecimalPipe], styles: ["\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  padding: var(--s-6) var(--s-5) var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0 0 var(--s-1);\n}\n.page__sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-4);\n  padding: var(--s-5);\n}\n.item-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  text-decoration: none;\n  color: var(--c-text);\n  overflow: hidden;\n  transition: transform var(--t-fast);\n}\n.item-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.item-card__img[_ngcontent-%COMP%] {\n  height: 100px;\n  background: var(--c-card-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 40px;\n}\n.item-card__body[_ngcontent-%COMP%] {\n  padding: var(--s-3);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-1);\n}\n.item-card__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  margin: 0;\n}\n.item-card__price[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--c-accent);\n  margin: 0;\n}\n/*# sourceMappingURL=marketplace.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MarketplaceComponent, [{
    type: Component,
    args: [{ selector: "cm-marketplace", standalone: true, imports: [DecimalPipe, RouterLink, BadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Mercado do Condominio</h1>
        <p class="page__sub">Compre e venda com seus vizinhos</p>
      </div>
      <div class="grid">
        @for (item of items(); track item.id) {
          <a class="item-card" [routerLink]="['/marketplace', item.id]">
            <div class="item-card__img">
              @if (item.imageUrl) {
                <img [src]="item.imageUrl" [alt]="item.titulo">
              } @else {
                {{ categoryIcon(item.categoria) }}
              }
            </div>
            <div class="item-card__body">
              <cm-badge variant="neutral">{{ item.categoria }}</cm-badge>
              <p class="item-card__title">{{ item.titulo }}</p>
              <p class="item-card__price">
                @if (item.preco !== null) {
                  R$ {{ item.preco | number:'1.2-2' }}
                } @else {
                  A combinar
                }
              </p>
            </div>
          </a>
        }
      </div>
    </div>
  `, styles: ["/* apps/morador/src/app/features/marketplace/marketplace.component.css */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  padding: var(--s-6) var(--s-5) var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0 0 var(--s-1);\n}\n.page__sub {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-4);\n  padding: var(--s-5);\n}\n.item-card {\n  display: flex;\n  flex-direction: column;\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  text-decoration: none;\n  color: var(--c-text);\n  overflow: hidden;\n  transition: transform var(--t-fast);\n}\n.item-card:active {\n  transform: scale(0.97);\n}\n.item-card__img {\n  height: 100px;\n  background: var(--c-card-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 40px;\n}\n.item-card__body {\n  padding: var(--s-3);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-1);\n}\n.item-card__title {\n  font-size: 13px;\n  font-weight: 600;\n  margin: 0;\n}\n.item-card__price {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--c-accent);\n  margin: 0;\n}\n/*# sourceMappingURL=marketplace.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MarketplaceComponent, { className: "MarketplaceComponent", filePath: "apps/morador/src/app/features/marketplace/marketplace.component.ts", lineNumber: 46 });
})();
export {
  MarketplaceComponent
};
//# sourceMappingURL=chunk-MPUSW5JN.js.map
