import {
  BadgeComponent
} from "./chunk-2E4G4N2I.js";
import {
  AnnouncementService
} from "./chunk-IQFUSNZ4.js";
import "./chunk-R6BDYNR2.js";
import "./chunk-KU6U7BFN.js";
import {
  DatePipe,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/announcements/announcement-detail.component.ts
function AnnouncementDetailComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "cm-badge", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h1", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 6);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 7);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r1 = ctx;
    \u0275\u0275property("variant", a_r1.prioridade === "alta" || a_r1.prioridade === "urgente" ? "warn" : "neutral");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Prioridade ", a_r1.prioridade, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r1.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Publicado em ", \u0275\u0275pipeBind2(6, 5, a_r1.publicadoEm, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r1.mensagem);
  }
}
var AnnouncementDetailComponent = class _AnnouncementDetailComponent {
  constructor() {
    this.announcementService = inject(AnnouncementService);
    this.id = input("", ...ngDevMode ? [{ debugName: "id" }] : (
      /* istanbul ignore next */
      []
    ));
    this.location = inject(Location);
    this.aviso = signal(null, ...ngDevMode ? [{ debugName: "aviso" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      const id = this.id();
      if (id)
        void this.loadAnnouncement(id);
    });
  }
  loadAnnouncement(id) {
    return __async(this, null, function* () {
      this.aviso.set(yield this.announcementService.loadById(id));
    });
  }
  static {
    this.\u0275fac = function AnnouncementDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AnnouncementDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnnouncementDetailComponent, selectors: [["cm-announcement-detail"]], inputs: { id: [1, "id"] }, decls: 6, vars: 1, consts: [[1, "detail"], [1, "back-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M19 12H5m0 0l7 7m-7-7l7-7"], [3, "variant"], [1, "detail__title"], [1, "detail__date"], [1, "detail__body"]], template: function AnnouncementDetailComponent_Template(rf, ctx) {
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
        \u0275\u0275conditionalCreate(5, AnnouncementDetailComponent_Conditional_5_Template, 9, 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(5);
        \u0275\u0275conditional((tmp_0_0 = ctx.aviso()) ? 5 : -1, tmp_0_0);
      }
    }, dependencies: [BadgeComponent, DatePipe], styles: ["\n.detail[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n  padding-bottom: 80px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-faint);\n  margin: 0;\n}\n.detail__body[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.65;\n  color: var(--c-text);\n  margin: 0;\n}\n/*# sourceMappingURL=announcement-detail.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnnouncementDetailComponent, [{
    type: Component,
    args: [{ selector: "cm-announcement-detail", standalone: true, imports: [BadgeComponent, DatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="detail">
      <button class="back-btn" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Avisos
      </button>
      @if (aviso(); as a) {
        <cm-badge [variant]="a.prioridade === 'alta' || a.prioridade === 'urgente' ? 'warn' : 'neutral'">
          Prioridade {{ a.prioridade }}
        </cm-badge>
        <h1 class="detail__title">{{ a.titulo }}</h1>
        <p class="detail__date">Publicado em {{ a.publicadoEm | date:'dd/MM/yyyy' }}</p>
        <p class="detail__body">{{ a.mensagem }}</p>
      }
    </div>
  `, styles: ["/* apps/morador/src/app/features/announcements/announcement-detail.component.css */\n.detail {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n  padding-bottom: 80px;\n}\n.back-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-2);\n  background: none;\n  border: none;\n  color: var(--c-text-muted);\n  font-family: var(--font-sans);\n  font-size: 14px;\n  cursor: pointer;\n  padding: 0;\n}\n.detail__title {\n  font-family: var(--font-serif);\n  font-size: 28px;\n  font-weight: 400;\n  letter-spacing: -0.5px;\n  margin: 0;\n}\n.detail__date {\n  font-size: 12px;\n  color: var(--c-text-faint);\n  margin: 0;\n}\n.detail__body {\n  font-size: 15px;\n  line-height: 1.65;\n  color: var(--c-text);\n  margin: 0;\n}\n/*# sourceMappingURL=announcement-detail.component.css.map */\n"] }]
  }], () => [], { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnnouncementDetailComponent, { className: "AnnouncementDetailComponent", filePath: "apps/morador/src/app/features/announcements/announcement-detail.component.ts", lineNumber: 30 });
})();
export {
  AnnouncementDetailComponent
};
//# sourceMappingURL=chunk-OEB3UZUO.js.map
