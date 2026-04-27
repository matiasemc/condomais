import {
  BadgeComponent,
  EmptyStateComponent,
  SearchInputComponent,
  TabBarComponent
} from "./chunk-OBMUP4XE.js";
import {
  AuthState,
  OccurrenceService
} from "./chunk-OKLNA4DD.js";
import {
  DatePipe,
  RouterLink
} from "./chunk-YX7IELSF.js";
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-UHB6DSJH.js";

// apps/admin/src/app/features/occurrences/occurrences.component.ts
var _c0 = (a0) => ["/ocorrencias", a0];
var _forTrack0 = ($index, $item) => $item.id;
function AdminOccurrencesComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 7);
  }
}
function AdminOccurrencesComponent_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 9)(1, "div", 11)(2, "p", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 13);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "cm-badge", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c0, o_r1.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r1.titulo ?? o_r1.tipo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", o_r1.tipo, " \xC2\xB7 ", \u0275\u0275pipeBind2(6, 6, o_r1.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", ctx_r1.statusVariant(o_r1.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabel(o_r1.status));
  }
}
function AdminOccurrencesComponent_Conditional_10_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 10);
  }
}
function AdminOccurrencesComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, AdminOccurrencesComponent_Conditional_10_For_2_Template, 9, 11, "a", 9, _forTrack0, false, AdminOccurrencesComponent_Conditional_10_ForEmpty_3_Template, 1, 0, "cm-empty-state", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filtered());
  }
}
var AdminOccurrencesComponent = class _AdminOccurrencesComponent {
  constructor() {
    this.occurrenceSvc = inject(OccurrenceService);
    this.authState = inject(AuthState);
    this.tabs = [
      { id: "all", label: "Todas" },
      { id: "aberta", label: "Abertas" },
      { id: "em_analise", label: "Em An\xC3\xA1lise" },
      { id: "resolvida", label: "Resolvidas" }
    ];
    this.activeTab = signal("all", ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    ));
    this.search = signal("", ...ngDevMode ? [{ debugName: "search" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isLoading = this.occurrenceSvc.isLoading;
    this.occurrences = this.occurrenceSvc.occurrences;
    this.filtered = computed(() => {
      const tab = this.activeTab();
      const query = this.search().toLowerCase();
      return this.occurrences().filter((o) => tab === "all" || o.status === tab).filter((o) => !query || (o.titulo ?? o.tipo).toLowerCase().includes(query) || o.descricao.toLowerCase().includes(query));
    }, ...ngDevMode ? [{ debugName: "filtered" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant) {
        this.occurrenceSvc.loadForTenant(tenant.id);
      }
    });
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
      return "warning";
    return "success";
  }
  static {
    this.\u0275fac = function AdminOccurrencesComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminOccurrencesComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminOccurrencesComponent, selectors: [["cm-admin-occurrences"]], decls: 11, vars: 4, consts: [[1, "admin-page"], [1, "admin-page__header"], [1, "admin-page__title"], [1, "admin-page__count"], [1, "admin-page__filters"], ["placeholder", "Buscar por t\xC3\xADtulo ou descri\xC3\xA7\xC3\xA3o...", 3, "valueChange"], [3, "tabChange", "tabs", "activeId"], ["icon", "\xE2\x8F\xB3", "title", "Carregando\xE2\u20AC\xA6", "subtitle", ""], [1, "occurrence-table"], [1, "occurrence-row", 3, "routerLink"], ["icon", "\xF0\u0178\u201C\u2039", "title", "Nenhuma ocorr\xC3\xAAncia encontrada", "subtitle", "Tente ajustar os filtros."], [1, "occurrence-row__body"], [1, "occurrence-row__titulo"], [1, "occurrence-row__meta"], [3, "variant"]], template: function AdminOccurrencesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Ocorr\xC3\xAAncias");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4)(7, "cm-search-input", 5);
        \u0275\u0275listener("valueChange", function AdminOccurrencesComponent_Template_cm_search_input_valueChange_7_listener($event) {
          return ctx.search.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "cm-tab-bar", 6);
        \u0275\u0275listener("tabChange", function AdminOccurrencesComponent_Template_cm_tab_bar_tabChange_8_listener($event) {
          return ctx.activeTab.set($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(9, AdminOccurrencesComponent_Conditional_9_Template, 1, 0, "cm-empty-state", 7)(10, AdminOccurrencesComponent_Conditional_10_Template, 4, 1, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("", ctx.filtered().length, " resultado(s)");
        \u0275\u0275advance(3);
        \u0275\u0275property("tabs", ctx.tabs)("activeId", ctx.activeTab());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isLoading() ? 9 : 10);
      }
    }, dependencies: [RouterLink, BadgeComponent, EmptyStateComponent, SearchInputComponent, TabBarComponent, DatePipe], styles: ["\n.admin-page__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.admin-page__title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 600;\n  margin: 0;\n}\n.admin-page__count[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #666;\n}\n.admin-page__filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.occurrence-table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.occurrence-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 14px 18px;\n  text-decoration: none;\n  color: inherit;\n  border-bottom: 1px solid #e2e8f0;\n  background: #fff;\n  transition: background 0.15s;\n}\n.occurrence-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.occurrence-row[_ngcontent-%COMP%]:hover {\n  background: #f7fafc;\n}\n.occurrence-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.occurrence-row__titulo[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 3px;\n}\n.occurrence-row__meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #718096;\n  margin: 0;\n}\n/*# sourceMappingURL=occurrences.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminOccurrencesComponent, [{
    type: Component,
    args: [{ selector: "cm-admin-occurrences", standalone: true, imports: [RouterLink, DatePipe, BadgeComponent, EmptyStateComponent, SearchInputComponent, TabBarComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Ocorr\xC3\xAAncias</h2>
        <span class="admin-page__count">{{ filtered().length }} resultado(s)</span>
      </div>

      <div class="admin-page__filters">
        <cm-search-input placeholder="Buscar por t\xC3\xADtulo ou descri\xC3\xA7\xC3\xA3o..."
          (valueChange)="search.set($event)"></cm-search-input>
        <cm-tab-bar [tabs]="tabs" [activeId]="activeTab()" (tabChange)="activeTab.set($event)"></cm-tab-bar>
      </div>

      @if (isLoading()) {
        <cm-empty-state icon="\xE2\x8F\xB3" title="Carregando\xE2\u20AC\xA6" subtitle=""></cm-empty-state>
      } @else {
        <div class="occurrence-table">
          @for (o of filtered(); track o.id) {
            <a class="occurrence-row" [routerLink]="['/ocorrencias', o.id]">
              <div class="occurrence-row__body">
                <p class="occurrence-row__titulo">{{ o.titulo ?? o.tipo }}</p>
                <p class="occurrence-row__meta">{{ o.tipo }} \xC2\xB7 {{ o.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
              </div>
              <cm-badge [variant]="statusVariant(o.status)">{{ statusLabel(o.status) }}</cm-badge>
            </a>
          } @empty {
            <cm-empty-state icon="\xF0\u0178\u201C\u2039" title="Nenhuma ocorr\xC3\xAAncia encontrada" subtitle="Tente ajustar os filtros."></cm-empty-state>
          }
        </div>
      }
    </div>
  `, styles: ["/* apps/admin/src/app/features/occurrences/occurrences.component.css */\n.admin-page__header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.admin-page__title {\n  font-size: 22px;\n  font-weight: 600;\n  margin: 0;\n}\n.admin-page__count {\n  font-size: 13px;\n  color: #666;\n}\n.admin-page__filters {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.occurrence-table {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.occurrence-row {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 14px 18px;\n  text-decoration: none;\n  color: inherit;\n  border-bottom: 1px solid #e2e8f0;\n  background: #fff;\n  transition: background 0.15s;\n}\n.occurrence-row:last-child {\n  border-bottom: none;\n}\n.occurrence-row:hover {\n  background: #f7fafc;\n}\n.occurrence-row__body {\n  flex: 1;\n  min-width: 0;\n}\n.occurrence-row__titulo {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 3px;\n}\n.occurrence-row__meta {\n  font-size: 12px;\n  color: #718096;\n  margin: 0;\n}\n/*# sourceMappingURL=occurrences.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminOccurrencesComponent, { className: "AdminOccurrencesComponent", filePath: "apps/admin/src/app/features/occurrences/occurrences.component.ts", lineNumber: 47 });
})();
export {
  AdminOccurrencesComponent
};
//# sourceMappingURL=chunk-B7ZSDHJC.js.map
