import {
  BadgeComponent,
  ButtonComponent
} from "./chunk-3MTEG4YI.js";
import {
  ChangeDetectionStrategy,
  Component,
  Location,
  inject,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵtext
} from "./chunk-KKC7QRLW.js";

// apps/morador/src/app/features/marketplace/marketplace-detail.component.ts
var MarketplaceDetailComponent = class _MarketplaceDetailComponent {
  constructor() {
    this.id = input("");
    this.location = inject(Location);
  }
  static {
    this.\u0275fac = function MarketplaceDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MarketplaceDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MarketplaceDetailComponent, selectors: [["cm-marketplace-detail"]], inputs: { id: [1, "id"] }, decls: 25, vars: 0, consts: [[1, "detail"], [1, "back-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M19 12H5m0 0l7 7m-7-7l7-7"], [1, "detail__img"], ["variant", "neutral"], [1, "detail__title"], [1, "detail__price"], [1, "detail__desc"], [1, "detail__seller"], [1, "seller-avatar"], [1, "seller-name"], [1, "seller-apto"], ["variant", "whatsapp", "size", "lg", 2, "width", "100%"]], template: function MarketplaceDetailComponent_Template(rf, ctx) {
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
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(5, "div", 4);
        \u0275\u0275text(6, "\u{1FA91}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "cm-badge", 5);
        \u0275\u0275text(8, "M\xF3veis");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "h1", 6);
        \u0275\u0275text(10, "Sof\xE1 3 lugares");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p", 7);
        \u0275\u0275text(12, "R$ 800,00");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "p", 8);
        \u0275\u0275text(14, "Sof\xE1 em \xF3timo estado, pouco uso. Retirada no condom\xEDnio.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 9)(16, "div", 10);
        \u0275\u0275text(17, "AC");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div")(19, "p", 11);
        \u0275\u0275text(20, "Ana Costa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "p", 12);
        \u0275\u0275text(22, "Apto 502 \xB7 Torre A");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(23, "cm-button", 13);
        \u0275\u0275text(24, " Contatar via WhatsApp ");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [ButtonComponent, BadgeComponent], styles: ["\n\n.detail[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n  padding-bottom: 80px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__img[_ngcontent-%COMP%] {\n  height: 200px;\n  background: var(--c-card-muted);\n  border-radius: var(--r-lg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 64px;\n}\n.detail__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__price[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--c-accent);\n  margin: 0;\n}\n.detail__desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.6;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.detail__seller[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  border: 1px solid var(--c-border);\n}\n.seller-avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: #E8D5C4;\n  color: #4A2E18;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-serif);\n  font-size: 16px;\n}\n.seller-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.seller-apto[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=marketplace-detail.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MarketplaceDetailComponent, [{
    type: Component,
    args: [{ selector: "cm-marketplace-detail", standalone: true, imports: [ButtonComponent, BadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="detail">
      <button class="back-btn" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Mercado
      </button>
      <div class="detail__img">\u{1FA91}</div>
      <cm-badge variant="neutral">M\xF3veis</cm-badge>
      <h1 class="detail__title">Sof\xE1 3 lugares</h1>
      <p class="detail__price">R$ 800,00</p>
      <p class="detail__desc">Sof\xE1 em \xF3timo estado, pouco uso. Retirada no condom\xEDnio.</p>
      <div class="detail__seller">
        <div class="seller-avatar">AC</div>
        <div>
          <p class="seller-name">Ana Costa</p>
          <p class="seller-apto">Apto 502 \xB7 Torre A</p>
        </div>
      </div>
      <cm-button variant="whatsapp" size="lg" style="width:100%">
        Contatar via WhatsApp
      </cm-button>
    </div>
  `, styles: ["/* apps/morador/src/app/features/marketplace/marketplace-detail.component.scss */\n.detail {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n  padding-bottom: 80px;\n}\n.back-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__img {\n  height: 200px;\n  background: var(--c-card-muted);\n  border-radius: var(--r-lg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 64px;\n}\n.detail__title {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__price {\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--c-accent);\n  margin: 0;\n}\n.detail__desc {\n  font-size: 14px;\n  line-height: 1.6;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.detail__seller {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  border: 1px solid var(--c-border);\n}\n.seller-avatar {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: #E8D5C4;\n  color: #4A2E18;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-serif);\n  font-size: 16px;\n}\n.seller-name {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.seller-apto {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=marketplace-detail.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MarketplaceDetailComponent, { className: "MarketplaceDetailComponent", filePath: "apps/morador/src/app/features/marketplace/marketplace-detail.component.ts", lineNumber: 36 });
})();
export {
  MarketplaceDetailComponent
};
//# sourceMappingURL=chunk-KGLVF4KK.js.map
