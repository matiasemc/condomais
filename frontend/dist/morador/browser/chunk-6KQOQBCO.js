import {
  BadgeComponent,
  ButtonComponent
} from "./chunk-2E4G4N2I.js";
import {
  MarketplaceService
} from "./chunk-IQFUSNZ4.js";
import "./chunk-R6BDYNR2.js";
import "./chunk-KU6U7BFN.js";
import {
  DecimalPipe,
  Location
} from "./chunk-UEEOQNAF.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  __async,
  effect,
  inject,
  input,
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
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/marketplace/marketplace-detail.component.ts
function MarketplaceDetailComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 5);
  }
  if (rf & 2) {
    const current_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", current_r1.imageUrl, \u0275\u0275sanitizeUrl)("alt", current_r1.titulo);
  }
}
function MarketplaceDetailComponent_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const current_r1 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.categoryIcon(current_r1.categoria), " ");
  }
}
function MarketplaceDetailComponent_Conditional_5_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const current_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" R$ ", \u0275\u0275pipeBind2(1, 1, current_r1.preco, "1.2-2"), " ");
  }
}
function MarketplaceDetailComponent_Conditional_5_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " A combinar ");
  }
}
function MarketplaceDetailComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275conditionalCreate(1, MarketplaceDetailComponent_Conditional_5_Conditional_1_Template, 1, 2, "img", 5)(2, MarketplaceDetailComponent_Conditional_5_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "cm-badge", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h1", 7);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 8);
    \u0275\u0275conditionalCreate(8, MarketplaceDetailComponent_Conditional_5_Conditional_8_Template, 2, 4)(9, MarketplaceDetailComponent_Conditional_5_Conditional_9_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 9);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 10)(13, "div", 11);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div")(16, "p", 12);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p", 13);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "cm-button", 14);
    \u0275\u0275text(21, " Contatar via WhatsApp ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const current_r1 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(current_r1.imageUrl ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(current_r1.categoria);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(current_r1.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(current_r1.preco !== null ? 8 : 9);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(current_r1.descricao);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.initials(current_r1.vendedor));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(current_r1.vendedor || "Morador");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(current_r1.whatsapp || "Contato pelo condominio");
  }
}
var MarketplaceDetailComponent = class _MarketplaceDetailComponent {
  constructor() {
    this.marketplaceService = inject(MarketplaceService);
    this.id = input("", ...ngDevMode ? [{ debugName: "id" }] : (
      /* istanbul ignore next */
      []
    ));
    this.location = inject(Location);
    this.item = signal(null, ...ngDevMode ? [{ debugName: "item" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      const id = this.id();
      if (id)
        void this.loadItem(id);
    });
  }
  categoryIcon(category) {
    return category.toLowerCase().includes("move") ? "M" : "#";
  }
  initials(name) {
    return (name ?? "Morador").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
  }
  loadItem(id) {
    return __async(this, null, function* () {
      this.item.set(yield this.marketplaceService.loadById(id));
    });
  }
  static {
    this.\u0275fac = function MarketplaceDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MarketplaceDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MarketplaceDetailComponent, selectors: [["cm-marketplace-detail"]], inputs: { id: [1, "id"] }, decls: 6, vars: 1, consts: [[1, "detail"], [1, "back-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M19 12H5m0 0l7 7m-7-7l7-7"], [1, "detail__img"], [3, "src", "alt"], ["variant", "neutral"], [1, "detail__title"], [1, "detail__price"], [1, "detail__desc"], [1, "detail__seller"], [1, "seller-avatar"], [1, "seller-name"], [1, "seller-apto"], ["variant", "whatsapp", "size", "lg", 2, "width", "100%"]], template: function MarketplaceDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
        \u0275\u0275listener("click", function MarketplaceDetailComponent_Template_button_click_1_listener() {
          return ctx.location.back();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(2, "svg", 2);
        \u0275\u0275element(3, "path", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275text(4, " Mercado ");
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(5, MarketplaceDetailComponent_Conditional_5_Template, 22, 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(5);
        \u0275\u0275conditional((tmp_0_0 = ctx.item()) ? 5 : -1, tmp_0_0);
      }
    }, dependencies: [ButtonComponent, BadgeComponent, DecimalPipe], styles: ["\n.detail[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n  padding-bottom: 80px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__img[_ngcontent-%COMP%] {\n  height: 200px;\n  background: var(--c-card-muted);\n  border-radius: var(--r-lg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 64px;\n}\n.detail__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__price[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--c-accent);\n  margin: 0;\n}\n.detail__desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.6;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.detail__seller[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  border: 1px solid var(--c-border);\n}\n.seller-avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: #E8D5C4;\n  color: #4A2E18;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-serif);\n  font-size: 16px;\n}\n.seller-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.seller-apto[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=marketplace-detail.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MarketplaceDetailComponent, [{
    type: Component,
    args: [{ selector: "cm-marketplace-detail", standalone: true, imports: [ButtonComponent, BadgeComponent, DecimalPipe], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="detail">
      <button class="back-btn" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Mercado
      </button>
      @if (item(); as current) {
        <div class="detail__img">
          @if (current.imageUrl) {
            <img [src]="current.imageUrl" [alt]="current.titulo">
          } @else {
            {{ categoryIcon(current.categoria) }}
          }
        </div>
        <cm-badge variant="neutral">{{ current.categoria }}</cm-badge>
        <h1 class="detail__title">{{ current.titulo }}</h1>
        <p class="detail__price">
          @if (current.preco !== null) {
            R$ {{ current.preco | number:'1.2-2' }}
          } @else {
            A combinar
          }
        </p>
        <p class="detail__desc">{{ current.descricao }}</p>
        <div class="detail__seller">
          <div class="seller-avatar">{{ initials(current.vendedor) }}</div>
          <div>
            <p class="seller-name">{{ current.vendedor || 'Morador' }}</p>
            <p class="seller-apto">{{ current.whatsapp || 'Contato pelo condominio' }}</p>
          </div>
        </div>
        <cm-button variant="whatsapp" size="lg" style="width:100%">
          Contatar via WhatsApp
        </cm-button>
      }
    </div>
  `, styles: ["/* apps/morador/src/app/features/marketplace/marketplace-detail.component.css */\n.detail {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n  padding-bottom: 80px;\n}\n.back-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__img {\n  height: 200px;\n  background: var(--c-card-muted);\n  border-radius: var(--r-lg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 64px;\n}\n.detail__title {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__price {\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--c-accent);\n  margin: 0;\n}\n.detail__desc {\n  font-size: 14px;\n  line-height: 1.6;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.detail__seller {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  border: 1px solid var(--c-border);\n}\n.seller-avatar {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: #E8D5C4;\n  color: #4A2E18;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-serif);\n  font-size: 16px;\n}\n.seller-name {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.seller-apto {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=marketplace-detail.component.css.map */\n"] }]
  }], () => [], { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MarketplaceDetailComponent, { className: "MarketplaceDetailComponent", filePath: "apps/morador/src/app/features/marketplace/marketplace-detail.component.ts", lineNumber: 51 });
})();
export {
  MarketplaceDetailComponent
};
//# sourceMappingURL=chunk-6KQOQBCO.js.map
