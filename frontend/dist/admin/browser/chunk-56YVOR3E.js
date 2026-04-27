import {
  BadgeComponent,
  EmptyStateComponent,
  SearchInputComponent
} from "./chunk-OBMUP4XE.js";
import {
  AdminUserService,
  AuthState
} from "./chunk-OKLNA4DD.js";
import "./chunk-YX7IELSF.js";
import {
  ChangeDetectionStrategy,
  Component,
  __async,
  computed,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-UHB6DSJH.js";

// apps/admin/src/app/features/users/users.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminUsersComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function AdminUsersComponent_For_10_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTab.set(tab_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("filter-tab--active", ctx_r2.activeTab() === tab_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r2.label);
  }
}
function AdminUsersComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 8);
  }
}
function AdminUsersComponent_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 14)(4, "p", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 16);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "cm-badge", 17);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const u_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r4.nome.charAt(0).toUpperCase());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(u_r4.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", u_r4.email, "", u_r4.unidade ? " \xB7 Unidade " + u_r4.unidade : "");
    \u0275\u0275advance();
    \u0275\u0275property("variant", ctx_r2.roleVariant(u_r4.role));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.roleLabel(u_r4.role));
  }
}
function AdminUsersComponent_Conditional_12_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 12);
  }
}
function AdminUsersComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AdminUsersComponent_Conditional_12_For_2_Template, 10, 6, "div", 11, _forTrack0, false, AdminUsersComponent_Conditional_12_ForEmpty_3_Template, 1, 0, "cm-empty-state", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.filtered());
  }
}
var AdminUsersComponent = class _AdminUsersComponent {
  constructor() {
    this.usersService = inject(AdminUserService);
    this.state = inject(AuthState);
    this.users = signal([], ...ngDevMode ? [{ debugName: "users" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.search = signal("", ...ngDevMode ? [{ debugName: "search" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeTab = signal("all", ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    ));
    this.tabs = [
      { id: "all", label: "Todos" },
      { id: "MORADOR", label: "Moradores" },
      { id: "SINDICO", label: "S\xEDndicos" },
      { id: "PORTEIRO", label: "Porteiros" }
    ];
    this.filtered = computed(() => {
      const tab = this.activeTab();
      const query = this.search().toLowerCase();
      return this.users().filter((u) => tab === "all" || u.role === tab).filter((u) => !query || u.nome.toLowerCase().includes(query) || u.email.toLowerCase().includes(query) || (u.unidade ?? "").toLowerCase().includes(query));
    }, ...ngDevMode ? [{ debugName: "filtered" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const tenant = this.state.currentTenant();
      if (!tenant)
        return;
      this.isLoading.set(true);
      try {
        this.users.set(yield this.usersService.listForTenant(tenant.id));
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  roleLabel(role) {
    const map = {
      MORADOR: "Morador",
      SINDICO: "S\xEDndico",
      CONSELHO: "Conselho",
      PORTEIRO: "Porteiro"
    };
    return map[role] ?? role;
  }
  roleVariant(role) {
    if (role === "SINDICO" || role === "CONSELHO")
      return "accent";
    if (role === "PORTEIRO")
      return "warning";
    return "success";
  }
  static {
    this.\u0275fac = function AdminUsersComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminUsersComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminUsersComponent, selectors: [["cm-admin-users"]], decls: 13, vars: 2, consts: [[1, "admin-page"], [1, "admin-page__header"], [1, "admin-page__title"], [1, "admin-page__count"], [1, "admin-page__filters"], ["placeholder", "Buscar por nome, e-mail ou unidade...", 3, "valueChange"], [1, "filter-tabs"], [1, "filter-tab", 3, "filter-tab--active"], ["icon", "\u23F3", "title", "Carregando\u2026", "subtitle", ""], [1, "user-table"], [1, "filter-tab", 3, "click"], [1, "user-row"], ["icon", "\u{1F465}", "title", "Nenhum usu\xE1rio encontrado", "subtitle", "Tente ajustar os filtros."], [1, "user-row__avatar"], [1, "user-row__body"], [1, "user-row__name"], [1, "user-row__email"], [3, "variant"]], template: function AdminUsersComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Usu\xE1rios");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4)(7, "cm-search-input", 5);
        \u0275\u0275listener("valueChange", function AdminUsersComponent_Template_cm_search_input_valueChange_7_listener($event) {
          return ctx.search.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 6);
        \u0275\u0275repeaterCreate(9, AdminUsersComponent_For_10_Template, 2, 3, "button", 7, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(11, AdminUsersComponent_Conditional_11_Template, 1, 0, "cm-empty-state", 8)(12, AdminUsersComponent_Conditional_12_Template, 4, 1, "div", 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("", ctx.filtered().length, " usu\xE1rio(s)");
        \u0275\u0275advance(4);
        \u0275\u0275repeater(ctx.tabs);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.isLoading() ? 11 : 12);
      }
    }, dependencies: [BadgeComponent, EmptyStateComponent, SearchInputComponent], styles: ["\n.filter-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  flex-wrap: wrap;\n}\n.filter-tab[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  background: #f3f4f6;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  color: #374151;\n}\n.filter-tab--active[_ngcontent-%COMP%] {\n  background: #2d6a4f;\n  color: #fff;\n}\n.user-table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.user-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.user-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.user-row__avatar[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  background: #2d6a4f;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 16px;\n  flex-shrink: 0;\n}\n.user-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.user-row__name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n}\n.user-row__email[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/*# sourceMappingURL=users.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminUsersComponent, [{
    type: Component,
    args: [{ selector: "cm-admin-users", standalone: true, imports: [BadgeComponent, EmptyStateComponent, SearchInputComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Usu\xE1rios</h2>
        <span class="admin-page__count">{{ filtered().length }} usu\xE1rio(s)</span>
      </div>

      <div class="admin-page__filters">
        <cm-search-input placeholder="Buscar por nome, e-mail ou unidade..."
          (valueChange)="search.set($event)"></cm-search-input>
        <div class="filter-tabs">
          @for (tab of tabs; track tab.id) {
            <button class="filter-tab" [class.filter-tab--active]="activeTab() === tab.id"
              (click)="activeTab.set(tab.id)">{{ tab.label }}</button>
          }
        </div>
      </div>

      @if (isLoading()) {
        <cm-empty-state icon="\u23F3" title="Carregando\u2026" subtitle=""></cm-empty-state>
      } @else {
        <div class="user-table">
          @for (u of filtered(); track u.id) {
            <div class="user-row">
              <div class="user-row__avatar">{{ u.nome.charAt(0).toUpperCase() }}</div>
              <div class="user-row__body">
                <p class="user-row__name">{{ u.nome }}</p>
                <p class="user-row__email">{{ u.email }}{{ u.unidade ? ' \xB7 Unidade ' + u.unidade : '' }}</p>
              </div>
              <cm-badge [variant]="roleVariant(u.role)">{{ roleLabel(u.role) }}</cm-badge>
            </div>
          } @empty {
            <cm-empty-state icon="\u{1F465}" title="Nenhum usu\xE1rio encontrado" subtitle="Tente ajustar os filtros."></cm-empty-state>
          }
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;e5e869d34ddab81472d9c4ba5f87c5c90b346b945b2d0bdd1fc7446bb129a071;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/admin/src/app/features/users/users.component.ts */\n.filter-tabs {\n  display: flex;\n  gap: 4px;\n  flex-wrap: wrap;\n}\n.filter-tab {\n  padding: 6px 14px;\n  background: #f3f4f6;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  color: #374151;\n}\n.filter-tab--active {\n  background: #2d6a4f;\n  color: #fff;\n}\n.user-table {\n  display: flex;\n  flex-direction: column;\n}\n.user-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.user-row:last-child {\n  border-bottom: none;\n}\n.user-row__avatar {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  background: #2d6a4f;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 16px;\n  flex-shrink: 0;\n}\n.user-row__body {\n  flex: 1;\n  min-width: 0;\n}\n.user-row__name {\n  font-weight: 600;\n  font-size: 14px;\n}\n.user-row__email {\n  font-size: 12px;\n  color: #6b7280;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/*# sourceMappingURL=users.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminUsersComponent, { className: "AdminUsersComponent", filePath: "apps/admin/src/app/features/users/users.component.ts", lineNumber: 61 });
})();
export {
  AdminUsersComponent
};
//# sourceMappingURL=chunk-56YVOR3E.js.map
