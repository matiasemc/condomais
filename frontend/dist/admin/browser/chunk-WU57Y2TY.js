import {
  BadgeComponent,
  ButtonComponent
} from "./chunk-OBMUP4XE.js";
import {
  AuthState,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  ReservationService
} from "./chunk-OKLNA4DD.js";
import {
  DatePipe
} from "./chunk-YX7IELSF.js";
import {
  ChangeDetectionStrategy,
  Component,
  __async,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UHB6DSJH.js";

// apps/admin/src/app/features/reservations/reservations.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminReservationsComponent_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function AdminReservationsComponent_Conditional_9_For_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function AdminReservationsComponent_Conditional_9_For_3_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const r_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cancelar(r_r3.id));
    });
    \u0275\u0275text(1, "Cancelar");
    \u0275\u0275elementEnd();
  }
}
function AdminReservationsComponent_Conditional_9_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "p", 9);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 10);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 11);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 12)(10, "cm-badge", 13);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, AdminReservationsComponent_Conditional_9_For_3_Conditional_12_Template, 2, 0, "button", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((r_r3.equipamento == null ? null : r_r3.equipamento.nome) ?? "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind3(6, 8, r_r3.data, "dd/MM/yyyy", "UTC"), " \xB7 ", r_r3.horaInicio, "\u2013", r_r3.horaFim);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((r_r3.morador == null ? null : r_r3.morador.nome) ?? r_r3.moradorId);
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", r_r3.status === "confirmada" ? "success" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r3.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(r_r3.status === "confirmada" ? 12 : -1);
  }
}
function AdminReservationsComponent_Conditional_9_ForEmpty_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Nenhuma reserva");
    \u0275\u0275elementEnd();
  }
}
function AdminReservationsComponent_Conditional_9_ForEmpty_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AdminReservationsComponent_Conditional_9_ForEmpty_4_Conditional_0_Template, 2, 0, "p", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!ctx_r0.svc.isLoading() ? 0 : -1);
  }
}
function AdminReservationsComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275conditionalCreate(1, AdminReservationsComponent_Conditional_9_Conditional_1_Template, 2, 0, "p", 6);
    \u0275\u0275repeaterCreate(2, AdminReservationsComponent_Conditional_9_For_3_Template, 13, 12, "div", 7, _forTrack0, false, AdminReservationsComponent_Conditional_9_ForEmpty_4_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.svc.isLoading() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.svc.reservations());
  }
}
function AdminReservationsComponent_Conditional_10_For_26_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const eq_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \xB7 Capacidade: ", eq_r6.capacidade, " ");
  }
}
function AdminReservationsComponent_Conditional_10_For_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26)(2, "p", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 28);
    \u0275\u0275text(5);
    \u0275\u0275conditionalCreate(6, AdminReservationsComponent_Conditional_10_For_26_Conditional_6_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 29);
    \u0275\u0275listener("click", function AdminReservationsComponent_Conditional_10_For_26_Template_button_click_7_listener() {
      const eq_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleEspaco(eq_r6.id, !eq_r6.ativo));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const eq_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(eq_r6.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", eq_r6.horarioInicio, "\u2013", eq_r6.horarioFim, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(eq_r6.capacidade ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("btn-toggle--off", !eq_r6.ativo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", eq_r6.ativo ? "Ativo" : "Inativo", " ");
  }
}
function AdminReservationsComponent_Conditional_10_ForEmpty_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Nenhum espa\xE7o cadastrado");
    \u0275\u0275elementEnd();
  }
}
function AdminReservationsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 16)(2, "h3", 17);
    \u0275\u0275text(3, "Novo espa\xE7o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 18)(5, "div", 19)(6, "label");
    \u0275\u0275text(7, "Nome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function AdminReservationsComponent_Conditional_10_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.novoNome, $event) || (ctx_r0.novoNome = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 19)(10, "label");
    \u0275\u0275text(11, "Capacidade");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function AdminReservationsComponent_Conditional_10_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.novaCapacidade, $event) || (ctx_r0.novaCapacidade = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 18)(14, "div", 19)(15, "label");
    \u0275\u0275text(16, "Hor\xE1rio in\xEDcio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function AdminReservationsComponent_Conditional_10_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.novoHorarioInicio, $event) || (ctx_r0.novoHorarioInicio = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 19)(19, "label");
    \u0275\u0275text(20, "Hor\xE1rio fim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function AdminReservationsComponent_Conditional_10_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.novoHorarioFim, $event) || (ctx_r0.novoHorarioFim = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "cm-button", 23);
    \u0275\u0275listener("clicked", function AdminReservationsComponent_Conditional_10_Template_cm_button_clicked_22_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.criarEspaco());
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 24);
    \u0275\u0275repeaterCreate(25, AdminReservationsComponent_Conditional_10_For_26_Template, 9, 7, "div", 25, _forTrack0, false, AdminReservationsComponent_Conditional_10_ForEmpty_27_Template, 2, 0, "p", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoNome);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novaCapacidade);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoHorarioInicio);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoHorarioFim);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.novoNome || ctx_r0.isSaving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isSaving() ? "Salvando..." : "+ Adicionar", " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.svc.equipamentos());
  }
}
var AdminReservationsComponent = class _AdminReservationsComponent {
  constructor() {
    this.svc = inject(ReservationService);
    this.state = inject(AuthState);
    this.activeTab = signal("reservas", ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isSaving = signal(false, ...ngDevMode ? [{ debugName: "isSaving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.novoNome = "";
    this.novaCapacidade = null;
    this.novoHorarioInicio = "08:00";
    this.novoHorarioFim = "22:00";
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const tenant = this.state.currentTenant();
      if (!tenant)
        return;
      yield Promise.all([
        this.svc.loadForTenant(tenant.id),
        this.svc.loadAllEquipamentos(tenant.id)
      ]);
    });
  }
  cancelar(id) {
    return __async(this, null, function* () {
      if (!confirm("Cancelar esta reserva?"))
        return;
      yield this.svc.cancel(id);
    });
  }
  criarEspaco() {
    return __async(this, null, function* () {
      const tenant = this.state.currentTenant();
      if (!tenant || !this.novoNome)
        return;
      this.isSaving.set(true);
      yield this.svc.createEquipamento({
        condominioId: tenant.id,
        nome: this.novoNome,
        capacidade: this.novaCapacidade ?? void 0,
        horarioInicio: this.novoHorarioInicio,
        horarioFim: this.novoHorarioFim
      });
      this.novoNome = "";
      this.novaCapacidade = null;
      this.isSaving.set(false);
    });
  }
  toggleEspaco(id, ativo) {
    return __async(this, null, function* () {
      yield this.svc.toggleEquipamento(id, ativo);
    });
  }
  static {
    this.\u0275fac = function AdminReservationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminReservationsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminReservationsComponent, selectors: [["cm-admin-reservations"]], decls: 11, vars: 6, consts: [[1, "admin-page"], [1, "admin-page__header"], [1, "admin-page__title"], [1, "tabs"], [1, "tab", 3, "click"], [1, "section"], [1, "hint"], [1, "res-row"], [1, "res-row__body"], [1, "res-row__title"], [1, "res-row__sub"], [1, "res-row__morador"], [1, "res-row__right"], [3, "variant"], [1, "btn-cancel"], [1, "btn-cancel", 3, "click"], [1, "form-card"], [1, "form-card__title"], [1, "form-row"], [1, "form-field"], ["type", "text", "placeholder", "Ex: Sal\xE3o A", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "50", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "time", 1, "form-input", 3, "ngModelChange", "ngModel"], ["variant", "accent", "size", "sm", 3, "clicked", "disabled"], [1, "espacos-list"], [1, "espaco-row"], [1, "espaco-row__body"], [1, "espaco-row__name"], [1, "espaco-row__detail"], [1, "btn-toggle", 3, "click"]], template: function AdminReservationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Reservas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 3)(5, "button", 4);
        \u0275\u0275listener("click", function AdminReservationsComponent_Template_button_click_5_listener() {
          return ctx.activeTab.set("reservas");
        });
        \u0275\u0275text(6, "Reservas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 4);
        \u0275\u0275listener("click", function AdminReservationsComponent_Template_button_click_7_listener() {
          return ctx.activeTab.set("espacos");
        });
        \u0275\u0275text(8, "Espa\xE7os");
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(9, AdminReservationsComponent_Conditional_9_Template, 5, 2, "div", 5);
        \u0275\u0275conditionalCreate(10, AdminReservationsComponent_Conditional_10_Template, 28, 7, "div", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275classProp("tab--active", ctx.activeTab() === "reservas");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("tab--active", ctx.activeTab() === "espacos");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.activeTab() === "reservas" ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeTab() === "espacos" ? 10 : -1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel, BadgeComponent, ButtonComponent, DatePipe], styles: ["\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  border-bottom: 2px solid #e5e7eb;\n  margin-bottom: 1.5rem;\n}\n.tab[_ngcontent-%COMP%] {\n  padding: .75rem 1.25rem;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  cursor: pointer;\n  color: #6b7280;\n  font-weight: 500;\n}\n.tab--active[_ngcontent-%COMP%] {\n  border-bottom-color: #2d6a4f;\n  color: #2d6a4f;\n}\n.res-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 14px 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.res-row__title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 15px;\n}\n.res-row__sub[_ngcontent-%COMP%], \n.res-row__morador[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n}\n.res-row__right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 6px;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #dc2626;\n  background: none;\n  border: 1px solid #dc2626;\n  border-radius: 6px;\n  padding: 3px 8px;\n  cursor: pointer;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border-radius: 12px;\n  padding: 16px;\n  margin-bottom: 1.5rem;\n}\n.form-card__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.form-field[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #6b7280;\n}\n.form-input[_ngcontent-%COMP%] {\n  border: 1.5px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 8px 12px;\n  font-size: 15px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.espacos-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.espaco-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n}\n.espaco-row__name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 15px;\n}\n.espaco-row__detail[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n}\n.btn-toggle[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 500;\n  background: #d1fae5;\n  color: #065f46;\n}\n.btn-toggle--off[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.hint[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 14px;\n  padding: 16px 0;\n  text-align: center;\n}\n/*# sourceMappingURL=reservations.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminReservationsComponent, [{
    type: Component,
    args: [{ selector: "cm-admin-reservations", standalone: true, imports: [DatePipe, FormsModule, BadgeComponent, ButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Reservas</h2>
      </div>

      <div class="tabs">
        <button class="tab" [class.tab--active]="activeTab() === 'reservas'" (click)="activeTab.set('reservas')">Reservas</button>
        <button class="tab" [class.tab--active]="activeTab() === 'espacos'"  (click)="activeTab.set('espacos')">Espa\xE7os</button>
      </div>

      @if (activeTab() === 'reservas') {
        <div class="section">
          @if (svc.isLoading()) { <p class="hint">Carregando...</p> }
          @for (r of svc.reservations(); track r.id) {
            <div class="res-row">
              <div class="res-row__body">
                <p class="res-row__title">{{ r.equipamento?.nome ?? '\u2014' }}</p>
                <p class="res-row__sub">{{ r.data | date:'dd/MM/yyyy':'UTC' }} \xB7 {{ r.horaInicio }}\u2013{{ r.horaFim }}</p>
                <p class="res-row__morador">{{ r.morador?.nome ?? r.moradorId }}</p>
              </div>
              <div class="res-row__right">
                <cm-badge [variant]="r.status === 'confirmada' ? 'success' : 'warn'">{{ r.status }}</cm-badge>
                @if (r.status === 'confirmada') {
                  <button class="btn-cancel" (click)="cancelar(r.id)">Cancelar</button>
                }
              </div>
            </div>
          } @empty {
            @if (!svc.isLoading()) { <p class="hint">Nenhuma reserva</p> }
          }
        </div>
      }

      @if (activeTab() === 'espacos') {
        <div class="section">
          <div class="form-card">
            <h3 class="form-card__title">Novo espa\xE7o</h3>
            <div class="form-row">
              <div class="form-field">
                <label>Nome</label>
                <input type="text" class="form-input" [(ngModel)]="novoNome" placeholder="Ex: Sal\xE3o A"/>
              </div>
              <div class="form-field">
                <label>Capacidade</label>
                <input type="number" class="form-input" [(ngModel)]="novaCapacidade" placeholder="50"/>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <label>Hor\xE1rio in\xEDcio</label>
                <input type="time" class="form-input" [(ngModel)]="novoHorarioInicio"/>
              </div>
              <div class="form-field">
                <label>Hor\xE1rio fim</label>
                <input type="time" class="form-input" [(ngModel)]="novoHorarioFim"/>
              </div>
            </div>
            <cm-button variant="accent" size="sm" [disabled]="!novoNome || isSaving()" (clicked)="criarEspaco()">
              {{ isSaving() ? 'Salvando...' : '+ Adicionar' }}
            </cm-button>
          </div>

          <div class="espacos-list">
            @for (eq of svc.equipamentos(); track eq.id) {
              <div class="espaco-row">
                <div class="espaco-row__body">
                  <p class="espaco-row__name">{{ eq.nome }}</p>
                  <p class="espaco-row__detail">
                    {{ eq.horarioInicio }}\u2013{{ eq.horarioFim }}
                    @if (eq.capacidade) { \xB7 Capacidade: {{ eq.capacidade }} }
                  </p>
                </div>
                <button class="btn-toggle" [class.btn-toggle--off]="!eq.ativo" (click)="toggleEspaco(eq.id, !eq.ativo)">
                  {{ eq.ativo ? 'Ativo' : 'Inativo' }}
                </button>
              </div>
            } @empty {
              <p class="hint">Nenhum espa\xE7o cadastrado</p>
            }
          </div>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;65f3d60c55fe8186315817f26ba9ebeb4c865971faf3d68d4a18a4578184764f;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/admin/src/app/features/reservations/reservations.component.ts */\n.tabs {\n  display: flex;\n  gap: 0;\n  border-bottom: 2px solid #e5e7eb;\n  margin-bottom: 1.5rem;\n}\n.tab {\n  padding: .75rem 1.25rem;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  cursor: pointer;\n  color: #6b7280;\n  font-weight: 500;\n}\n.tab--active {\n  border-bottom-color: #2d6a4f;\n  color: #2d6a4f;\n}\n.res-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 14px 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.res-row__title {\n  font-weight: 600;\n  font-size: 15px;\n}\n.res-row__sub,\n.res-row__morador {\n  font-size: 13px;\n  color: #6b7280;\n}\n.res-row__right {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 6px;\n}\n.btn-cancel {\n  font-size: 12px;\n  color: #dc2626;\n  background: none;\n  border: 1px solid #dc2626;\n  border-radius: 6px;\n  padding: 3px 8px;\n  cursor: pointer;\n}\n.form-card {\n  background: #f9fafb;\n  border-radius: 12px;\n  padding: 16px;\n  margin-bottom: 1.5rem;\n}\n.form-card__title {\n  font-size: 15px;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\n.form-row {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.form-field {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.form-field label {\n  font-size: 13px;\n  font-weight: 500;\n  color: #6b7280;\n}\n.form-input {\n  border: 1.5px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 8px 12px;\n  font-size: 15px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.espacos-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.espaco-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n}\n.espaco-row__name {\n  font-weight: 600;\n  font-size: 15px;\n}\n.espaco-row__detail {\n  font-size: 13px;\n  color: #6b7280;\n}\n.btn-toggle {\n  padding: 6px 14px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 500;\n  background: #d1fae5;\n  color: #065f46;\n}\n.btn-toggle--off {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.hint {\n  color: #9ca3af;\n  font-size: 14px;\n  padding: 16px 0;\n  text-align: center;\n}\n/*# sourceMappingURL=reservations.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminReservationsComponent, { className: "AdminReservationsComponent", filePath: "apps/admin/src/app/features/reservations/reservations.component.ts", lineNumber: 121 });
})();
export {
  AdminReservationsComponent
};
//# sourceMappingURL=chunk-WU57Y2TY.js.map
