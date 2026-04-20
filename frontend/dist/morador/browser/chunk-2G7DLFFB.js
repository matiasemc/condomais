import {
  BadgeComponent
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

// apps/morador/src/app/features/announcements/announcement-detail.component.ts
var AnnouncementDetailComponent = class _AnnouncementDetailComponent {
  constructor() {
    this.id = input("");
    this.location = inject(Location);
  }
  static {
    this.\u0275fac = function AnnouncementDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AnnouncementDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnnouncementDetailComponent, selectors: [["cm-announcement-detail"]], inputs: { id: [1, "id"] }, decls: 13, vars: 0, consts: [[1, "detail"], [1, "back-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M19 12H5m0 0l7 7m-7-7l7-7"], ["variant", "warn"], [1, "detail__title"], [1, "detail__date"], [1, "detail__body"]], template: function AnnouncementDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
        \u0275\u0275listener("click", function AnnouncementDetailComponent_Template_button_click_1_listener() {
          return ctx.location.back();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(2, "svg", 2);
        \u0275\u0275element(3, "path", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275text(4, " Avisos ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(5, "cm-badge", 4);
        \u0275\u0275text(6, "Prioridade alta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "h1", 5);
        \u0275\u0275text(8, "Manuten\xE7\xE3o da piscina");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "p", 6);
        \u0275\u0275text(10, "Publicado em 20 de abril de 2026");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p", 7);
        \u0275\u0275text(12, "A piscina do condom\xEDnio estar\xE1 fechada para manuten\xE7\xE3o preventiva entre os dias 22 e 25 de abril. Os servi\xE7os incluem limpeza do filtro, troca de \xE1gua e verifica\xE7\xE3o do sistema de aquecimento. Agradecemos a compreens\xE3o de todos.");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [BadgeComponent], styles: ["\n\n.detail[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n  padding-bottom: 80px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-faint);\n  margin: 0;\n}\n.detail__body[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.65;\n  color: var(--c-text);\n  margin: 0;\n}\n/*# sourceMappingURL=announcement-detail.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnnouncementDetailComponent, [{
    type: Component,
    args: [{ selector: "cm-announcement-detail", standalone: true, imports: [BadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="detail">
      <button class="back-btn" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Avisos
      </button>
      <cm-badge variant="warn">Prioridade alta</cm-badge>
      <h1 class="detail__title">Manuten\xE7\xE3o da piscina</h1>
      <p class="detail__date">Publicado em 20 de abril de 2026</p>
      <p class="detail__body">A piscina do condom\xEDnio estar\xE1 fechada para manuten\xE7\xE3o preventiva entre os dias 22 e 25 de abril. Os servi\xE7os incluem limpeza do filtro, troca de \xE1gua e verifica\xE7\xE3o do sistema de aquecimento. Agradecemos a compreens\xE3o de todos.</p>
    </div>
  `, styles: ["/* apps/morador/src/app/features/announcements/announcement-detail.component.scss */\n.detail {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n  padding-bottom: 80px;\n}\n.back-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__title {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__date {\n  font-size: 12px;\n  color: var(--c-text-faint);\n  margin: 0;\n}\n.detail__body {\n  font-size: 15px;\n  line-height: 1.65;\n  color: var(--c-text);\n  margin: 0;\n}\n/*# sourceMappingURL=announcement-detail.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnnouncementDetailComponent, { className: "AnnouncementDetailComponent", filePath: "apps/morador/src/app/features/announcements/announcement-detail.component.ts", lineNumber: 24 });
})();
export {
  AnnouncementDetailComponent
};
//# sourceMappingURL=chunk-2G7DLFFB.js.map
