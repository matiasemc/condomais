import {
  AvatarComponent,
  BadgeComponent,
  EmptyStateComponent,
  SearchInputComponent,
  SectionHeaderComponent
} from "./chunk-TTJJPAUX.js";
import {
  AuthState,
  ResidentService
} from "./chunk-PSJDYNQK.js";
import {
  RouterLink
} from "./chunk-DRD3LIJU.js";
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
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-NH5B5NLZ.js";

// apps/porteiro/src/app/features/residents/residents.component.ts
var _c0 = (a0) => ["/moradores", a0];
var _forTrack0 = ($index, $item) => $item.id;
function ResidentsComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function ResidentsComponent_For_6_Template_button_click_0_listener() {
      const f_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setFilter(f_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("chip--active", ctx_r2.activeFilter() === f_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", f_r2.label, " ");
  }
}
function ResidentsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 6);
  }
}
function ResidentsComponent_Conditional_8_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "cm-badge", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", r_r4.pendingDeliveries, " entrega", r_r4.pendingDeliveries > 1 ? "s" : "");
  }
}
function ResidentsComponent_Conditional_8_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "cm-badge", 16);
    \u0275\u0275text(1, "Inativo");
    \u0275\u0275elementEnd();
  }
}
function ResidentsComponent_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 9);
    \u0275\u0275element(1, "cm-avatar", 10);
    \u0275\u0275elementStart(2, "div", 11)(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 13);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 14);
    \u0275\u0275conditionalCreate(8, ResidentsComponent_Conditional_8_For_2_Conditional_8_Template, 2, 2, "cm-badge", 15);
    \u0275\u0275conditionalCreate(9, ResidentsComponent_Conditional_8_For_2_Conditional_9_Template, 2, 0, "cm-badge", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 17);
    \u0275\u0275element(11, "path", 18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r4 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c0, r_r4.id));
    \u0275\u0275advance();
    \u0275\u0275property("name", r_r4.name)("color", r_r4.status === "inativo" ? "#aaa" : "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Apto ", r_r4.unit);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(r_r4.pendingDeliveries > 0 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(r_r4.status === "inativo" ? 9 : -1);
  }
}
function ResidentsComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, ResidentsComponent_Conditional_8_For_2_Template, 12, 9, "a", 9, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.filtered());
  }
}
var ResidentsComponent = class _ResidentsComponent {
  constructor() {
    this.authState = inject(AuthState);
    this.residentService = inject(ResidentService);
    this.search = signal("", ...ngDevMode ? [{ debugName: "search" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeFilter = signal("todos", ...ngDevMode ? [{ debugName: "activeFilter" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isLoading = this.residentService.isLoading;
    this.residents = this.residentService.residents;
    this.filters = [
      { id: "todos", label: "Todos" },
      { id: "com_entrega", label: "Com entrega" },
      { id: "inativos", label: "Inativos" }
    ];
    this.filtered = computed(() => {
      const q = this.search().toLowerCase();
      const f = this.activeFilter();
      return this.residents().filter((r) => {
        const matchSearch = r.name.toLowerCase().includes(q) || r.unit.includes(q);
        const matchFilter = f === "todos" ? true : f === "com_entrega" ? r.pendingDeliveries > 0 : r.status === "inativo";
        return matchSearch && matchFilter;
      });
    }, ...ngDevMode ? [{ debugName: "filtered" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant)
        void this.residentService.loadForTenant(tenant.id);
    });
  }
  setFilter(id) {
    this.activeFilter.set(id);
  }
  static {
    this.\u0275fac = function ResidentsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ResidentsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResidentsComponent, selectors: [["cm-residents"]], decls: 9, vars: 2, consts: [[1, "residents-page"], ["title", "Moradores", "eyebrow", "GEST\xC3O"], [1, "search-bar"], ["placeholder", "Buscar por nome ou apto\u2026", 3, "valueChange", "value"], [1, "filter-chips"], [1, "chip", 3, "chip--active"], ["icon", "\u{1F464}", "title", "Nenhum morador", "subtitle", "Tente outro filtro ou busca"], [1, "resident-list"], [1, "chip", 3, "click"], [1, "resident-card", 3, "routerLink"], [3, "name", "color"], [1, "resident-info"], [1, "resident-name"], [1, "resident-unit"], [1, "resident-end"], ["variant", "warn"], ["variant", "neutral"], ["width", "16", "height", "16", "viewBox", "0 0 16 16", "fill", "none"], ["d", "M6 4l4 4-4 4", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"]], template: function ResidentsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "cm-section-header", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "cm-search-input", 3);
        \u0275\u0275twoWayListener("valueChange", function ResidentsComponent_Template_cm_search_input_valueChange_3_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.search, $event) || (ctx.search = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 4);
        \u0275\u0275repeaterCreate(5, ResidentsComponent_For_6_Template, 2, 3, "button", 5, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(7, ResidentsComponent_Conditional_7_Template, 1, 0, "cm-empty-state", 6)(8, ResidentsComponent_Conditional_8_Template, 3, 0, "div", 7);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275twoWayProperty("value", ctx.search);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.filters);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.filtered().length === 0 ? 7 : 8);
      }
    }, dependencies: [RouterLink, SearchInputComponent, BadgeComponent, AvatarComponent, SectionHeaderComponent, EmptyStateComponent], styles: ["\n.residents-page[_ngcontent-%COMP%] {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.search-bar[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.filter-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--s-2);\n  flex-wrap: wrap;\n}\n.chip[_ngcontent-%COMP%] {\n  padding: var(--s-1) var(--s-3);\n  border-radius: var(--r-pill);\n  border: 1.5px solid var(--c-card-muted);\n  background: var(--c-card);\n  color: var(--c-text-muted);\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.chip--active[_ngcontent-%COMP%] {\n  background: var(--c-accent);\n  border-color: var(--c-accent);\n  color: #fff;\n}\n.resident-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.resident-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-3) var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  text-decoration: none;\n  color: inherit;\n  transition: opacity 0.15s;\n}\n.resident-card[_ngcontent-%COMP%]:active {\n  opacity: 0.7;\n}\n.resident-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.resident-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--c-text);\n}\n.resident-unit[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n.resident-end[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-2);\n  color: var(--c-text-muted);\n}\n/*# sourceMappingURL=residents.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResidentsComponent, [{
    type: Component,
    args: [{ selector: "cm-residents", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, SearchInputComponent, BadgeComponent, AvatarComponent, SectionHeaderComponent, EmptyStateComponent], template: `<div class="residents-page">
  <cm-section-header title="Moradores" eyebrow="GEST\xC3O"></cm-section-header>

  <div class="search-bar">
    <cm-search-input [(value)]="search" placeholder="Buscar por nome ou apto\u2026"></cm-search-input>
  </div>

  <div class="filter-chips">
    @for (f of filters; track f.id) {
      <button class="chip" [class.chip--active]="activeFilter() === f.id" (click)="setFilter(f.id)">
        {{ f.label }}
      </button>
    }
  </div>

  @if (filtered().length === 0) {
    <cm-empty-state icon="\u{1F464}" title="Nenhum morador" subtitle="Tente outro filtro ou busca"></cm-empty-state>
  } @else {
    <div class="resident-list">
      @for (r of filtered(); track r.id) {
        <a class="resident-card" [routerLink]="['/moradores', r.id]">
          <cm-avatar [name]="r.name" [color]="r.status === 'inativo' ? '#aaa' : ''"></cm-avatar>
          <div class="resident-info">
            <span class="resident-name">{{ r.name }}</span>
            <span class="resident-unit">Apto {{ r.unit }}</span>
          </div>
          <div class="resident-end">
            @if (r.pendingDeliveries > 0) {
              <cm-badge variant="warn">{{ r.pendingDeliveries }} entrega{{ r.pendingDeliveries > 1 ? 's' : '' }}</cm-badge>
            }
            @if (r.status === 'inativo') {
              <cm-badge variant="neutral">Inativo</cm-badge>
            }
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </a>
      }
    </div>
  }
</div>
`, styles: ["/* apps/porteiro/src/app/features/residents/residents.component.css */\n.residents-page {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.search-bar {\n  width: 100%;\n}\n.filter-chips {\n  display: flex;\n  gap: var(--s-2);\n  flex-wrap: wrap;\n}\n.chip {\n  padding: var(--s-1) var(--s-3);\n  border-radius: var(--r-pill);\n  border: 1.5px solid var(--c-card-muted);\n  background: var(--c-card);\n  color: var(--c-text-muted);\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.chip--active {\n  background: var(--c-accent);\n  border-color: var(--c-accent);\n  color: #fff;\n}\n.resident-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.resident-card {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-3) var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  text-decoration: none;\n  color: inherit;\n  transition: opacity 0.15s;\n}\n.resident-card:active {\n  opacity: 0.7;\n}\n.resident-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.resident-name {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--c-text);\n}\n.resident-unit {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n.resident-end {\n  display: flex;\n  align-items: center;\n  gap: var(--s-2);\n  color: var(--c-text-muted);\n}\n/*# sourceMappingURL=residents.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResidentsComponent, { className: "ResidentsComponent", filePath: "apps/porteiro/src/app/features/residents/residents.component.ts", lineNumber: 14 });
})();
export {
  ResidentsComponent
};
//# sourceMappingURL=chunk-3LMKS7FP.js.map
