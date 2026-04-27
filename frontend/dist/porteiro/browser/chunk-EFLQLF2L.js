import {
  BadgeComponent,
  EmptyStateComponent,
  SectionHeaderComponent
} from "./chunk-TTJJPAUX.js";
import {
  AuthState,
  OccurrenceService
} from "./chunk-PSJDYNQK.js";
import {
  DatePipe,
  RouterLink
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-NH5B5NLZ.js";

// apps/porteiro/src/app/features/occurrences/occurrences.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function OccurrencesComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 3);
  }
}
function OccurrencesComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "span", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "cm-badge", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 9);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 10);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r1.titulo || o_r1.tipo);
    \u0275\u0275advance();
    \u0275\u0275property("variant", o_r1.status === "aberta" ? "warn" : "success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r1.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r1.descricao);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", o_r1.local || "Sem local", " - ", \u0275\u0275pipeBind2(10, 6, o_r1.createdAt, "dd/MM HH:mm"));
  }
}
function OccurrencesComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275repeaterCreate(1, OccurrencesComponent_Conditional_5_For_2_Template, 11, 9, "div", 5, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.occurrences());
  }
}
var OccurrencesComponent = class _OccurrencesComponent {
  constructor() {
    this.occurrenceService = inject(OccurrenceService);
    this.authState = inject(AuthState);
    this.occurrences = this.occurrenceService.occurrences;
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant)
        void this.occurrenceService.loadForTenant(tenant.id);
    });
  }
  static {
    this.\u0275fac = function OccurrencesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OccurrencesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OccurrencesComponent, selectors: [["cm-occurrences"]], decls: 6, vars: 1, consts: [[1, "occurrences-page"], ["title", "Ocorrencias", "eyebrow", "REGISTRO"], ["routerLink", "/ocorrencias/nova", 1, "new-btn"], ["icon", "!", "title", "Sem ocorrencias", "subtitle", "Nenhuma ocorrencia registrada"], [1, "occurrence-list"], [1, "occurrence-card"], [1, "occurrence-header"], [1, "occurrence-type"], [3, "variant"], [1, "occurrence-desc"], [1, "occurrence-meta"]], template: function OccurrencesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "cm-section-header", 1)(2, "a", 2);
        \u0275\u0275text(3, "+ Nova");
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(4, OccurrencesComponent_Conditional_4_Template, 1, 0, "cm-empty-state", 3)(5, OccurrencesComponent_Conditional_5_Template, 3, 0, "div", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.occurrences().length === 0 ? 4 : 5);
      }
    }, dependencies: [RouterLink, BadgeComponent, SectionHeaderComponent, EmptyStateComponent, DatePipe], styles: ["\n.occurrences-page[_ngcontent-%COMP%] {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.new-btn[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-accent);\n  text-decoration: none;\n  padding: var(--s-1) var(--s-3);\n  border: 1.5px solid var(--c-accent);\n  border-radius: var(--r-pill);\n}\n.occurrence-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.occurrence-card[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.occurrence-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.occurrence-type[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--c-text);\n}\n.occurrence-desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n  line-height: 1.5;\n}\n.occurrence-meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n}\n/*# sourceMappingURL=occurrences.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OccurrencesComponent, [{
    type: Component,
    args: [{ selector: "cm-occurrences", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, DatePipe, BadgeComponent, SectionHeaderComponent, EmptyStateComponent], template: `<div class="occurrences-page">
  <cm-section-header title="Ocorrencias" eyebrow="REGISTRO">
    <a routerLink="/ocorrencias/nova" class="new-btn">+ Nova</a>
  </cm-section-header>

  @if (occurrences().length === 0) {
    <cm-empty-state icon="!" title="Sem ocorrencias" subtitle="Nenhuma ocorrencia registrada"></cm-empty-state>
  } @else {
    <div class="occurrence-list">
      @for (o of occurrences(); track o.id) {
        <div class="occurrence-card">
          <div class="occurrence-header">
            <span class="occurrence-type">{{ o.titulo || o.tipo }}</span>
            <cm-badge [variant]="o.status === 'aberta' ? 'warn' : 'success'">{{ o.status }}</cm-badge>
          </div>
          <p class="occurrence-desc">{{ o.descricao }}</p>
          <span class="occurrence-meta">{{ o.local || 'Sem local' }} - {{ o.createdAt | date:"dd/MM HH:mm" }}</span>
        </div>
      }
    </div>
  }
</div>
`, styles: ["/* apps/porteiro/src/app/features/occurrences/occurrences.component.css */\n.occurrences-page {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.new-btn {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-accent);\n  text-decoration: none;\n  padding: var(--s-1) var(--s-3);\n  border: 1.5px solid var(--c-accent);\n  border-radius: var(--r-pill);\n}\n.occurrence-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.occurrence-card {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.occurrence-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.occurrence-type {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--c-text);\n}\n.occurrence-desc {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n  line-height: 1.5;\n}\n.occurrence-meta {\n  font-size: 12px;\n  color: var(--c-text-muted);\n}\n/*# sourceMappingURL=occurrences.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OccurrencesComponent, { className: "OccurrencesComponent", filePath: "apps/porteiro/src/app/features/occurrences/occurrences.component.ts", lineNumber: 15 });
})();
export {
  OccurrencesComponent
};
//# sourceMappingURL=chunk-EFLQLF2L.js.map
