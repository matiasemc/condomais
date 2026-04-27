import {
  BadgeComponent,
  EmptyStateComponent,
  SectionHeaderComponent
} from "./chunk-TTJJPAUX.js";
import {
  AnnouncementService,
  AuthState
} from "./chunk-PSJDYNQK.js";
import {
  DatePipe
} from "./chunk-DRD3LIJU.js";
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-NH5B5NLZ.js";

// apps/porteiro/src/app/features/announcements/announcements.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AnnouncementsComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 2);
  }
}
function AnnouncementsComponent_Conditional_3_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "cm-badge", 10);
    \u0275\u0275text(1, "Fixado");
    \u0275\u0275elementEnd();
  }
}
function AnnouncementsComponent_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "div", 6);
    \u0275\u0275elementStart(2, "div", 7)(3, "div", 8)(4, "span", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, AnnouncementsComponent_Conditional_3_For_2_Conditional_6_Template, 2, 0, "cm-badge", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 11);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 12);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("--priority-color", ctx_r1.priorityColor(a_r1.prioridade));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(a_r1.titulo);
    \u0275\u0275advance();
    \u0275\u0275conditional(a_r1.fixado ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r1.mensagem);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 6, a_r1.publicadoEm, "dd/MM/yyyy"));
  }
}
function AnnouncementsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275repeaterCreate(1, AnnouncementsComponent_Conditional_3_For_2_Template, 12, 9, "div", 4, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.announcements());
  }
}
var AnnouncementsComponent = class _AnnouncementsComponent {
  constructor() {
    this.announcementService = inject(AnnouncementService);
    this.authState = inject(AuthState);
    this.announcements = this.announcementService.announcements;
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant)
        void this.announcementService.loadForTenant(tenant.id);
    });
  }
  priorityColor(p) {
    return p === "alta" ? "var(--c-warn)" : p === "media" ? "var(--c-accent)" : "var(--c-text-muted)";
  }
  static {
    this.\u0275fac = function AnnouncementsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AnnouncementsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnnouncementsComponent, selectors: [["cm-announcements"]], decls: 4, vars: 1, consts: [[1, "announcements-page"], ["title", "Avisos", "eyebrow", "COMUNICADOS"], ["icon", "\u{1F4CB}", "title", "Sem avisos", "subtitle", "Nenhum comunicado publicado"], [1, "aviso-list"], [1, "aviso-card", 3, "--priority-color"], [1, "aviso-card"], [1, "aviso-bar"], [1, "aviso-body"], [1, "aviso-header"], [1, "aviso-title"], ["variant", "neutral"], [1, "aviso-text"], [1, "aviso-date"]], template: function AnnouncementsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "cm-section-header", 1);
        \u0275\u0275conditionalCreate(2, AnnouncementsComponent_Conditional_2_Template, 1, 0, "cm-empty-state", 2)(3, AnnouncementsComponent_Conditional_3_Template, 3, 0, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.announcements().length === 0 ? 2 : 3);
      }
    }, dependencies: [BadgeComponent, SectionHeaderComponent, EmptyStateComponent, DatePipe], styles: ["\n.announcements-page[_ngcontent-%COMP%] {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.aviso-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.aviso-card[_ngcontent-%COMP%] {\n  display: flex;\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n}\n.aviso-bar[_ngcontent-%COMP%] {\n  width: 3px;\n  background: var(--priority-color, var(--c-text-muted));\n  flex-shrink: 0;\n}\n.aviso-body[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--s-3) var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-1);\n}\n.aviso-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--s-2);\n}\n.aviso-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--c-text);\n}\n.aviso-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n  line-height: 1.5;\n}\n.aviso-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n}\n/*# sourceMappingURL=announcements.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnnouncementsComponent, [{
    type: Component,
    args: [{ selector: "cm-announcements", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [DatePipe, BadgeComponent, SectionHeaderComponent, EmptyStateComponent], template: '<div class="announcements-page">\n  <cm-section-header title="Avisos" eyebrow="COMUNICADOS"></cm-section-header>\n\n  @if (announcements().length === 0) {\n    <cm-empty-state icon="\u{1F4CB}" title="Sem avisos" subtitle="Nenhum comunicado publicado"></cm-empty-state>\n  } @else {\n    <div class="aviso-list">\n      @for (a of announcements(); track a.id) {\n        <div class="aviso-card" [style.--priority-color]="priorityColor(a.prioridade)">\n          <div class="aviso-bar"></div>\n          <div class="aviso-body">\n            <div class="aviso-header">\n              <span class="aviso-title">{{ a.titulo }}</span>\n              @if (a.fixado) { <cm-badge variant="neutral">Fixado</cm-badge> }\n            </div>\n            <p class="aviso-text">{{ a.mensagem }}</p>\n            <span class="aviso-date">{{ a.publicadoEm | date:"dd/MM/yyyy" }}</span>\n          </div>\n        </div>\n      }\n    </div>\n  }\n</div>\n', styles: ["/* apps/porteiro/src/app/features/announcements/announcements.component.css */\n.announcements-page {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.aviso-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.aviso-card {\n  display: flex;\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n}\n.aviso-bar {\n  width: 3px;\n  background: var(--priority-color, var(--c-text-muted));\n  flex-shrink: 0;\n}\n.aviso-body {\n  flex: 1;\n  padding: var(--s-3) var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-1);\n}\n.aviso-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--s-2);\n}\n.aviso-title {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--c-text);\n}\n.aviso-text {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n  line-height: 1.5;\n}\n.aviso-date {\n  font-size: 12px;\n  color: var(--c-text-muted);\n}\n/*# sourceMappingURL=announcements.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnnouncementsComponent, { className: "AnnouncementsComponent", filePath: "apps/porteiro/src/app/features/announcements/announcements.component.ts", lineNumber: 15 });
})();
export {
  AnnouncementsComponent
};
//# sourceMappingURL=chunk-LHALU4SZ.js.map
