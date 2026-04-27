import {
  Select,
  SelectModule
} from "./chunk-EPWMPVPN.js";
import "./chunk-26TFFR4C.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  TenantAdminService
} from "./chunk-J3ADYAXG.js";
import {
  DatePipe
} from "./chunk-JVS6PAVK.js";
import {
  ChangeDetectionStrategy,
  Component,
  __async,
  __spreadProps,
  __spreadValues,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-TZP2ZEHH.js";

// apps/master-admin/src/app/features/tenants/tenants.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function TenantsComponent_Conditional_6_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function TenantsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "h3", 11);
    \u0275\u0275text(2, "Novo Condom\xEDnio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 12)(4, "div", 13)(5, "label");
    \u0275\u0275text(6, "Nome *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function TenantsComponent_Conditional_6_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.nome, $event) || (ctx_r1.form.nome = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 13)(9, "label");
    \u0275\u0275text(10, "CNPJ *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function TenantsComponent_Conditional_6_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.cnpj, $event) || (ctx_r1.form.cnpj = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 13)(13, "label");
    \u0275\u0275text(14, "Subdom\xEDnio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function TenantsComponent_Conditional_6_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.subdomain, $event) || (ctx_r1.form.subdomain = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 13)(17, "label");
    \u0275\u0275text(18, "E-mail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function TenantsComponent_Conditional_6_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.email, $event) || (ctx_r1.form.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 13)(21, "label");
    \u0275\u0275text(22, "Plano");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p-select", 18);
    \u0275\u0275twoWayListener("ngModelChange", function TenantsComponent_Conditional_6_Template_p_select_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.plan, $event) || (ctx_r1.form.plan = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 13)(25, "label");
    \u0275\u0275text(26, "M\xE1x. unidades");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function TenantsComponent_Conditional_6_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.maxUnidades, $event) || (ctx_r1.form.maxUnidades = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(28, TenantsComponent_Conditional_6_Conditional_28_Template, 2, 1, "p", 20);
    \u0275\u0275elementStart(29, "button", 21);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_6_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.criar());
    });
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.nome);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.cnpj);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.subdomain);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.email);
    \u0275\u0275advance(4);
    \u0275\u0275property("options", ctx_r1.planOptions);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.plan);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.maxUnidades);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.formError() ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isSaving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSaving() ? "Salvando..." : "Criar Tenant", " ");
  }
}
function TenantsComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function TenantsComponent_For_11_Template_button_click_0_listener() {
      const tab_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab.set(tab_r4.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("filter-tab--active", ctx_r1.activeTab() === tab_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r4.label);
  }
}
function TenantsComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "p", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 27);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 28)(8, "span", 29);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p-select", 30);
    \u0275\u0275listener("ngModelChange", function TenantsComponent_Conditional_13_For_2_Template_p_select_ngModelChange_10_listener($event) {
      const t_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.changePlan(t_r6.id, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 31);
    \u0275\u0275listener("click", function TenantsComponent_Conditional_13_For_2_Template_button_click_11_listener() {
      const t_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleStatus(t_r6));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("tenant-row--suspended", t_r6.subscription_status === "suspended");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r6.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", t_r6.subdomain ? "@" + t_r6.subdomain : "sem subdom\xEDnio", " \xB7 ", t_r6.email ?? "sem e-mail", " \xB7 Criado ", \u0275\u0275pipeBind2(6, 14, t_r6.created_at, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge--" + t_r6.subscription_status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r6.subscription_status);
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx_r1.planOptions)("ngModel", t_r6.plan);
    \u0275\u0275advance();
    \u0275\u0275classProp("btn-toggle--off", t_r6.subscription_status === "suspended");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r6.subscription_status === "suspended" ? "Ativar" : "Suspender", " ");
  }
}
function TenantsComponent_Conditional_13_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "Nenhum tenant encontrado");
    \u0275\u0275elementEnd();
  }
}
function TenantsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275repeaterCreate(1, TenantsComponent_Conditional_13_For_2_Template, 13, 17, "div", 23, _forTrack0, false, TenantsComponent_Conditional_13_ForEmpty_3_Template, 2, 0, "p", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filtered());
  }
}
var TenantsComponent = class _TenantsComponent {
  constructor() {
    this.tenantsService = inject(TenantAdminService);
    this.tenants = signal([], ...ngDevMode ? [{ debugName: "tenants" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isLoading = signal(true, ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isSaving = signal(false, ...ngDevMode ? [{ debugName: "isSaving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : (
      /* istanbul ignore next */
      []
    ));
    this.formError = signal(null, ...ngDevMode ? [{ debugName: "formError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeTab = signal("all", ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    ));
    this.searchText = signal("", ...ngDevMode ? [{ debugName: "searchText" }] : (
      /* istanbul ignore next */
      []
    ));
    this.form = { nome: "", cnpj: "", subdomain: "", email: "", plan: "basic", maxUnidades: 50 };
    this.planOptions = [
      { label: "Basic", value: "basic" },
      { label: "Plus", value: "plus" },
      { label: "Premium", value: "premium" }
    ];
    this.statusTabs = [
      { id: "all", label: "Todos" },
      { id: "trial", label: "Trial" },
      { id: "active", label: "Ativos" },
      { id: "suspended", label: "Suspensos" }
    ];
    this.filtered = computed(() => {
      const tab = this.activeTab();
      const query = this.searchText().toLowerCase();
      return this.tenants().filter((t) => tab === "all" || t.subscription_status === tab).filter((t) => !query || t.nome.toLowerCase().includes(query) || (t.subdomain ?? "").toLowerCase().includes(query));
    }, ...ngDevMode ? [{ debugName: "filtered" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.load();
    });
  }
  load() {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        this.tenants.set(yield this.tenantsService.list());
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  criar() {
    return __async(this, null, function* () {
      if (!this.form.nome || !this.form.cnpj) {
        this.formError.set("Nome e CNPJ obrigat\xF3rios");
        return;
      }
      this.formError.set(null);
      this.isSaving.set(true);
      try {
        yield this.tenantsService.create({
          nome: this.form.nome,
          cnpj: this.form.cnpj,
          subdomain: this.form.subdomain || null,
          email: this.form.email || null,
          plan: this.form.plan,
          maxUnidades: this.form.maxUnidades
        });
        this.form = { nome: "", cnpj: "", subdomain: "", email: "", plan: "basic", maxUnidades: 50 };
        this.showForm.set(false);
        yield this.load();
      } catch (error) {
        this.formError.set(error instanceof Error ? error.message : "Erro ao criar tenant");
      } finally {
        this.isSaving.set(false);
      }
    });
  }
  toggleStatus(t) {
    return __async(this, null, function* () {
      const newStatus = t.subscription_status === "suspended" ? "active" : "suspended";
      yield this.tenantsService.updateStatus(t.id, newStatus);
      this.tenants.update((list) => list.map((r) => r.id === t.id ? __spreadProps(__spreadValues({}, r), { subscription_status: newStatus }) : r));
    });
  }
  changePlan(id, plan) {
    return __async(this, null, function* () {
      yield this.tenantsService.updatePlan(id, plan);
      this.tenants.update((list) => list.map((r) => r.id === id ? __spreadProps(__spreadValues({}, r), { plan }) : r));
    });
  }
  static {
    this.\u0275fac = function TenantsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TenantsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TenantsComponent, selectors: [["cm-tenants"]], decls: 14, vars: 4, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "btn-primary", 3, "click"], [1, "form-card"], [1, "filters"], ["type", "text", "placeholder", "Buscar por nome ou subdom\xEDnio...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "filter-tabs"], [1, "filter-tab", 3, "filter-tab--active"], [1, "hint"], [1, "tenant-table"], [1, "form-card__title"], [1, "form-grid"], [1, "form-field"], ["type", "text", "placeholder", "Condom\xEDnio Solar", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "00.000.000/0000-00", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "solar", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "email", "placeholder", "adm@solar.com", 1, "form-input", 3, "ngModelChange", "ngModel"], ["styleClass", "form-input", "optionLabel", "label", "optionValue", "value", "appendTo", "body", 3, "ngModelChange", "options", "ngModel"], ["type", "number", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-error"], [1, "btn-primary", 3, "click", "disabled"], [1, "filter-tab", 3, "click"], [1, "tenant-row", 3, "tenant-row--suspended"], [1, "tenant-row"], [1, "tenant-row__body"], [1, "tenant-row__name"], [1, "tenant-row__meta"], [1, "tenant-row__right"], [1, "badge"], ["styleClass", "plan-select", "optionLabel", "label", "optionValue", "value", "appendTo", "body", 3, "ngModelChange", "options", "ngModel"], [1, "btn-toggle", 3, "click"]], template: function TenantsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Tenants");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 3);
        \u0275\u0275listener("click", function TenantsComponent_Template_button_click_4_listener() {
          return ctx.showForm.set(!ctx.showForm());
        });
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(6, TenantsComponent_Conditional_6_Template, 31, 10, "div", 4);
        \u0275\u0275elementStart(7, "div", 5)(8, "input", 6);
        \u0275\u0275listener("ngModelChange", function TenantsComponent_Template_input_ngModelChange_8_listener($event) {
          return ctx.searchText.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 7);
        \u0275\u0275repeaterCreate(10, TenantsComponent_For_11_Template, 2, 3, "button", 8, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(12, TenantsComponent_Conditional_12_Template, 2, 0, "p", 9)(13, TenantsComponent_Conditional_13_Template, 4, 1, "div", 10);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.showForm() ? "Cancelar" : "+ Novo Tenant", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showForm() ? 6 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngModel", ctx.searchText());
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.statusTabs);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.isLoading() ? 12 : 13);
      }
    }, dependencies: [SelectModule, Select, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ["\n.page__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page__title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #1a1a2e;\n  color: #fff;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  cursor: pointer;\n  font-weight: 500;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 24px;\n}\n.form-card__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 16px;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #6b7280;\n}\n.form-input[_ngcontent-%COMP%] {\n  border: 1.5px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 8px 10px;\n  font-size: 14px;\n}\n.form-error[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-size: 13px;\n  margin-bottom: 8px;\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 8px 12px;\n  font-size: 14px;\n}\n.filter-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.filter-tab[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: #f3f4f6;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n}\n.filter-tab--active[_ngcontent-%COMP%] {\n  background: #1a1a2e;\n  color: #fff;\n}\n.tenant-table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.tenant-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 1px solid #f3f4f6;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.tenant-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.tenant-row--suspended[_ngcontent-%COMP%] {\n  opacity: 0.65;\n}\n.tenant-row__name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 15px;\n}\n.tenant-row__meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  margin-top: 2px;\n}\n.tenant-row__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-weight: 600;\n}\n.badge--active[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.badge--trial[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.badge--suspended[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.badge--cancelled[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.plan-select[_ngcontent-%COMP%] {\n  font-size: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 3px 8px;\n  cursor: pointer;\n}\n.btn-toggle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 4px 10px;\n  border-radius: 6px;\n  border: none;\n  cursor: pointer;\n  font-weight: 500;\n  background: #fee2e2;\n  color: #991b1b;\n}\n.btn-toggle--off[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.hint[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 14px;\n  padding: 16px;\n  text-align: center;\n}\n/*# sourceMappingURL=tenants.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TenantsComponent, [{
    type: Component,
    args: [{ selector: "cm-tenants", standalone: true, imports: [DatePipe, SelectModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Tenants</h2>
        <button class="btn-primary" (click)="showForm.set(!showForm())">
          {{ showForm() ? 'Cancelar' : '+ Novo Tenant' }}
        </button>
      </div>

      @if (showForm()) {
        <div class="form-card">
          <h3 class="form-card__title">Novo Condom\xEDnio</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>Nome *</label>
              <input class="form-input" type="text" [(ngModel)]="form.nome" placeholder="Condom\xEDnio Solar"/>
            </div>
            <div class="form-field">
              <label>CNPJ *</label>
              <input class="form-input" type="text" [(ngModel)]="form.cnpj" placeholder="00.000.000/0000-00"/>
            </div>
            <div class="form-field">
              <label>Subdom\xEDnio</label>
              <input class="form-input" type="text" [(ngModel)]="form.subdomain" placeholder="solar"/>
            </div>
            <div class="form-field">
              <label>E-mail</label>
              <input class="form-input" type="email" [(ngModel)]="form.email" placeholder="adm@solar.com"/>
            </div>
            <div class="form-field">
              <label>Plano</label>
              <p-select
                styleClass="form-input"
                [options]="planOptions"
                [(ngModel)]="form.plan"
                optionLabel="label"
                optionValue="value"
                appendTo="body"
              ></p-select>
            </div>
            <div class="form-field">
              <label>M\xE1x. unidades</label>
              <input class="form-input" type="number" [(ngModel)]="form.maxUnidades"/>
            </div>
          </div>
          @if (formError()) { <p class="form-error">{{ formError() }}</p> }
          <button class="btn-primary" [disabled]="isSaving()" (click)="criar()">
            {{ isSaving() ? 'Salvando...' : 'Criar Tenant' }}
          </button>
        </div>
      }

      <div class="filters">
        <input
          class="search-input"
          type="text"
          [ngModel]="searchText()"
          placeholder="Buscar por nome ou subdom\xEDnio..."
          (ngModelChange)="searchText.set($event)"
        />
        <div class="filter-tabs">
          @for (tab of statusTabs; track tab.id) {
            <button class="filter-tab" [class.filter-tab--active]="activeTab() === tab.id"
              (click)="activeTab.set(tab.id)">{{ tab.label }}</button>
          }
        </div>
      </div>

      @if (isLoading()) {
        <p class="hint">Carregando...</p>
      } @else {
        <div class="tenant-table">
          @for (t of filtered(); track t.id) {
            <div class="tenant-row" [class.tenant-row--suspended]="t.subscription_status === 'suspended'">
              <div class="tenant-row__body">
                <p class="tenant-row__name">{{ t.nome }}</p>
                <p class="tenant-row__meta">
                  {{ t.subdomain ? '@' + t.subdomain : 'sem subdom\xEDnio' }} \xB7
                  {{ t.email ?? 'sem e-mail' }} \xB7
                  Criado {{ t.created_at | date:'dd/MM/yyyy' }}
                </p>
              </div>
              <div class="tenant-row__right">
                <span class="badge" [class]="'badge--' + t.subscription_status">{{ t.subscription_status }}</span>
                <p-select
                  styleClass="plan-select"
                  [options]="planOptions"
                  [ngModel]="t.plan"
                  optionLabel="label"
                  optionValue="value"
                  appendTo="body"
                  (ngModelChange)="changePlan(t.id, $event)"
                ></p-select>
                <button class="btn-toggle"
                  [class.btn-toggle--off]="t.subscription_status === 'suspended'"
                  (click)="toggleStatus(t)">
                  {{ t.subscription_status === 'suspended' ? 'Ativar' : 'Suspender' }}
                </button>
              </div>
            </div>
          } @empty {
            <p class="hint">Nenhum tenant encontrado</p>
          }
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;25e0e31d7691e4f42e76e5ba8889b5968892da56fb0ecd412b5ee13acf2521c7;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/master-admin/src/app/features/tenants/tenants.component.ts */\n.page__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.page__title {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-primary {\n  background: #1a1a2e;\n  color: #fff;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-size: 14px;\n  cursor: pointer;\n  font-weight: 500;\n}\n.btn-primary:disabled {\n  opacity: 0.6;\n}\n.form-card {\n  background: #f8f9fa;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 24px;\n}\n.form-card__title {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 16px;\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.form-field label {\n  font-size: 13px;\n  font-weight: 500;\n  color: #6b7280;\n}\n.form-input {\n  border: 1.5px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 8px 10px;\n  font-size: 14px;\n}\n.form-error {\n  color: #dc2626;\n  font-size: 13px;\n  margin-bottom: 8px;\n}\n.filters {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n}\n.search-input {\n  flex: 1;\n  min-width: 200px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 8px 12px;\n  font-size: 14px;\n}\n.filter-tabs {\n  display: flex;\n  gap: 4px;\n}\n.filter-tab {\n  padding: 6px 12px;\n  background: #f3f4f6;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n}\n.filter-tab--active {\n  background: #1a1a2e;\n  color: #fff;\n}\n.tenant-table {\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.tenant-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 1px solid #f3f4f6;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.tenant-row:last-child {\n  border-bottom: none;\n}\n.tenant-row--suspended {\n  opacity: 0.65;\n}\n.tenant-row__name {\n  font-weight: 600;\n  font-size: 15px;\n}\n.tenant-row__meta {\n  font-size: 12px;\n  color: #9ca3af;\n  margin-top: 2px;\n}\n.tenant-row__right {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.badge {\n  font-size: 11px;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-weight: 600;\n}\n.badge--active {\n  background: #d1fae5;\n  color: #065f46;\n}\n.badge--trial {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.badge--suspended {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.badge--cancelled {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.plan-select {\n  font-size: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  padding: 3px 8px;\n  cursor: pointer;\n}\n.btn-toggle {\n  font-size: 12px;\n  padding: 4px 10px;\n  border-radius: 6px;\n  border: none;\n  cursor: pointer;\n  font-weight: 500;\n  background: #fee2e2;\n  color: #991b1b;\n}\n.btn-toggle--off {\n  background: #d1fae5;\n  color: #065f46;\n}\n.hint {\n  color: #9ca3af;\n  font-size: 14px;\n  padding: 16px;\n  text-align: center;\n}\n/*# sourceMappingURL=tenants.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TenantsComponent, { className: "TenantsComponent", filePath: "apps/master-admin/src/app/features/tenants/tenants.component.ts", lineNumber: 161 });
})();
export {
  TenantsComponent
};
//# sourceMappingURL=chunk-CKPQYO4Z.js.map
