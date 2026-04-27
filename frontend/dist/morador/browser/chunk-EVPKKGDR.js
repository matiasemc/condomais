import {
  BadgeComponent,
  ButtonComponent,
  EmptyStateComponent,
  TabBarComponent
} from "./chunk-2E4G4N2I.js";
import {
  AuthState,
  OccurrenceService
} from "./chunk-IQFUSNZ4.js";
import "./chunk-R6BDYNR2.js";
import {
  RouterLink
} from "./chunk-KU6U7BFN.js";
import {
  DatePipe
} from "./chunk-UEEOQNAF.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/occurrences/occurrences.component.ts
var _c0 = (a0) => ["/ocorrencias", a0];
var _forTrack0 = ($index, $item) => $item.id;
function OccurrencesComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 8);
  }
}
function OccurrencesComponent_Conditional_11_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 9)(1, "div", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 12)(4, "p", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 14);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "cm-badge", 15);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(10, _c0, o_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.tipoIcon(o_r2.tipo));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r2.titulo ?? o_r2.tipo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", o_r2.tipo, " \xC2\xB7 ", \u0275\u0275pipeBind2(8, 7, o_r2.createdAt, "dd/MM HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", ctx_r0.statusVariant(o_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.statusLabel(o_r2.status));
  }
}
function OccurrencesComponent_Conditional_11_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 10);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("subtitle", "Voc\xC3\xAA n\xC3\xA3o tem ocorr\xC3\xAAncias " + (ctx_r0.activeTab() === "aberta" ? "abertas" : "resolvidas") + ".");
  }
}
function OccurrencesComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, OccurrencesComponent_Conditional_11_For_1_Template, 11, 12, "a", 9, _forTrack0, false, OccurrencesComponent_Conditional_11_ForEmpty_2_Template, 1, 1, "cm-empty-state", 10);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.filtered());
  }
}
var OccurrencesComponent = class _OccurrencesComponent {
  constructor() {
    this.occurrenceSvc = inject(OccurrenceService);
    this.authState = inject(AuthState);
    this.tabs = [
      { id: "aberta", label: "Abertas" },
      { id: "resolvida", label: "Resolvidas" }
    ];
    this.activeTab = signal("aberta", ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isLoading = this.occurrenceSvc.isLoading;
    this.occurrences = this.occurrenceSvc.occurrences;
    this.filtered = computed(() => {
      const tab = this.activeTab();
      const list = this.occurrences();
      if (tab === "aberta")
        return list.filter((o) => o.status === "aberta" || o.status === "em_analise");
      return list.filter((o) => o.status === "resolvida" || o.status === "encerrada");
    }, ...ngDevMode ? [{ debugName: "filtered" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      const user = this.authState.user();
      const tenant = this.authState.currentTenant();
      if (user && tenant) {
        this.occurrenceSvc.loadMyOccurrences(tenant.id, user.id);
      }
    });
  }
  tipoIcon(tipo) {
    const map = {
      ruido: "\xF0\u0178\u201D\u0160",
      vandalismo: "\xF0\u0178\u201D\xA8",
      acidente: "\xE2\u0161\xA0\xEF\xB8\x8F",
      entrada_suspeita: "\xF0\u0178\u2018\u20AC",
      entrada_nao_autorizada: "\xF0\u0178\u0161\xAB",
      outro: "\xF0\u0178\u201C\u2039"
    };
    return map[tipo] ?? "\xF0\u0178\u201C\u2039";
  }
  statusLabel(status) {
    const map = {
      aberta: "Aberta",
      em_analise: "Em an\xC3\xA1lise",
      resolvida: "Resolvida",
      encerrada: "Encerrada"
    };
    return map[status] ?? status;
  }
  statusVariant(status) {
    if (status === "aberta")
      return "accent";
    if (status === "em_analise")
      return "warn";
    return "success";
  }
  static {
    this.\u0275fac = function OccurrencesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OccurrencesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OccurrencesComponent, selectors: [["cm-occurrences"]], decls: 12, vars: 3, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], ["routerLink", "/ocorrencias/nova"], ["size", "sm"], [1, "page__tabs"], [3, "tabChange", "tabs", "activeId"], [1, "occurrence-list"], ["icon", "\xE2\x8F\xB3", "title", "Carregando\xE2\u20AC\xA6", "subtitle", "Buscando suas ocorr\xC3\xAAncias"], [1, "occurrence-row", 3, "routerLink"], ["icon", "\xF0\u0178\u201C\u2039", "title", "Nenhuma ocorr\xC3\xAAncia", 3, "subtitle"], [1, "occurrence-row__icon"], [1, "occurrence-row__body"], [1, "occurrence-row__title"], [1, "occurrence-row__sub"], [3, "variant"]], template: function OccurrencesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Ocorr\xC3\xAAncias");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3)(5, "cm-button", 4);
        \u0275\u0275text(6, "+ Nova");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 5)(8, "cm-tab-bar", 6);
        \u0275\u0275listener("tabChange", function OccurrencesComponent_Template_cm_tab_bar_tabChange_8_listener($event) {
          return ctx.activeTab.set($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 7);
        \u0275\u0275conditionalCreate(10, OccurrencesComponent_Conditional_10_Template, 1, 0, "cm-empty-state", 8)(11, OccurrencesComponent_Conditional_11_Template, 3, 1);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("tabs", ctx.tabs)("activeId", ctx.activeTab());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.isLoading() ? 10 : 11);
      }
    }, dependencies: [RouterLink, TabBarComponent, BadgeComponent, EmptyStateComponent, ButtonComponent, DatePipe], styles: ["\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: var(--s-6) var(--s-5) var(--s-4);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title[_ngcontent-%COMP%] {\n  flex: 1;\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.page__tabs[_ngcontent-%COMP%] {\n  padding: var(--s-4) var(--s-5);\n}\n.occurrence-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.occurrence-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4) var(--s-5);\n  text-decoration: none;\n  color: var(--c-text);\n  border-bottom: 1px solid var(--c-border);\n  background: var(--c-card);\n  transition: background var(--t-fast);\n}\n.occurrence-row[_ngcontent-%COMP%]:first-child {\n  border-top: 1px solid var(--c-border);\n}\n.occurrence-row[_ngcontent-%COMP%]:active {\n  background: var(--c-card-muted);\n}\n.occurrence-row__icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: var(--r-sm);\n  background: var(--c-accent-soft);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.occurrence-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.occurrence-row__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.occurrence-row__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=occurrences.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OccurrencesComponent, [{
    type: Component,
    args: [{ selector: "cm-occurrences", standalone: true, imports: [RouterLink, DatePipe, TabBarComponent, BadgeComponent, EmptyStateComponent, ButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Ocorr\xC3\xAAncias</h1>
        <a routerLink="/ocorrencias/nova">
          <cm-button size="sm">+ Nova</cm-button>
        </a>
      </div>
      <div class="page__tabs">
        <cm-tab-bar [tabs]="tabs" [activeId]="activeTab()" (tabChange)="activeTab.set($event)"></cm-tab-bar>
      </div>
      <div class="occurrence-list">
        @if (isLoading()) {
          <cm-empty-state icon="\xE2\x8F\xB3" title="Carregando\xE2\u20AC\xA6" subtitle="Buscando suas ocorr\xC3\xAAncias"></cm-empty-state>
        } @else {
          @for (o of filtered(); track o.id) {
            <a class="occurrence-row" [routerLink]="['/ocorrencias', o.id]">
              <div class="occurrence-row__icon">{{ tipoIcon(o.tipo) }}</div>
              <div class="occurrence-row__body">
                <p class="occurrence-row__title">{{ o.titulo ?? o.tipo }}</p>
                <p class="occurrence-row__sub">{{ o.tipo }} \xC2\xB7 {{ o.createdAt | date:'dd/MM HH:mm' }}</p>
              </div>
              <cm-badge [variant]="statusVariant(o.status)">{{ statusLabel(o.status) }}</cm-badge>
            </a>
          } @empty {
            <cm-empty-state icon="\xF0\u0178\u201C\u2039" title="Nenhuma ocorr\xC3\xAAncia"
              [subtitle]="'Voc\xC3\xAA n\xC3\xA3o tem ocorr\xC3\xAAncias ' + (activeTab() === 'aberta' ? 'abertas' : 'resolvidas') + '.'">
            </cm-empty-state>
          }
        }
      </div>
    </div>
  `, styles: ["/* apps/morador/src/app/features/occurrences/occurrences.component.css */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  display: flex;\n  align-items: center;\n  padding: var(--s-6) var(--s-5) var(--s-4);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title {\n  flex: 1;\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.page__tabs {\n  padding: var(--s-4) var(--s-5);\n}\n.occurrence-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.occurrence-row {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4) var(--s-5);\n  text-decoration: none;\n  color: var(--c-text);\n  border-bottom: 1px solid var(--c-border);\n  background: var(--c-card);\n  transition: background var(--t-fast);\n}\n.occurrence-row:first-child {\n  border-top: 1px solid var(--c-border);\n}\n.occurrence-row:active {\n  background: var(--c-card-muted);\n}\n.occurrence-row__icon {\n  width: 44px;\n  height: 44px;\n  border-radius: var(--r-sm);\n  background: var(--c-accent-soft);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.occurrence-row__body {\n  flex: 1;\n  min-width: 0;\n}\n.occurrence-row__title {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.occurrence-row__sub {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=occurrences.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OccurrencesComponent, { className: "OccurrencesComponent", filePath: "apps/morador/src/app/features/occurrences/occurrences.component.ts", lineNumber: 48 });
})();
export {
  OccurrencesComponent
};
//# sourceMappingURL=chunk-EVPKKGDR.js.map
