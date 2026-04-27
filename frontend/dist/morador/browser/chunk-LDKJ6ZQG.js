import {
  ToastService
} from "./chunk-OKAG547M.js";
import {
  ButtonComponent,
  StepperComponent,
  ToggleComponent
} from "./chunk-2E4G4N2I.js";
import {
  AuthState,
  GoogleCalendarService,
  ReservationService
} from "./chunk-IQFUSNZ4.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-R6BDYNR2.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-KU6U7BFN.js";
import {
  Location
} from "./chunk-UEEOQNAF.js";
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
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
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/reservations/new-reservation.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NewReservationComponent_Case_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1, "Carregando espa\xE7os...");
    \u0275\u0275elementEnd();
  }
}
function NewReservationComponent_Case_5_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function NewReservationComponent_Case_5_For_6_Template_button_click_0_listener() {
      const eq_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectedEquipamentoId.set(eq_r4.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const eq_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("space-btn--active", ctx_r1.selectedEquipamentoId() === eq_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.emoji(eq_r4.nome));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(eq_r4.nome);
  }
}
function NewReservationComponent_Case_5_ForEmpty_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "Nenhuma \xE1rea dispon\xEDvel");
    \u0275\u0275elementEnd();
  }
}
function NewReservationComponent_Case_5_ForEmpty_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NewReservationComponent_Case_5_ForEmpty_7_Conditional_0_Template, 2, 0, "p", 14);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!ctx_r1.svc.isLoading() ? 0 : -1);
  }
}
function NewReservationComponent_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "h2", 7);
    \u0275\u0275text(2, "Escolha o espa\xE7o");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, NewReservationComponent_Case_5_Conditional_3_Template, 2, 0, "p", 8);
    \u0275\u0275elementStart(4, "div", 9);
    \u0275\u0275repeaterCreate(5, NewReservationComponent_Case_5_For_6_Template, 5, 4, "button", 10, _forTrack0, false, NewReservationComponent_Case_5_ForEmpty_7_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 11)(9, "cm-button", 12);
    \u0275\u0275listener("clicked", function NewReservationComponent_Case_5_Template_cm_button_clicked_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.step.set(1));
    });
    \u0275\u0275text(10, "Continuar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.svc.isLoading() ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.svc.equipamentos());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.canProceedStep1());
  }
}
function NewReservationComponent_Case_6_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div")(2, "p", 23);
    \u0275\u0275text(3, "Adicionar ao Google Calendar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 24);
    \u0275\u0275text(5, "Sincronize com sua agenda");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "cm-toggle", 25);
    \u0275\u0275listener("toggled", function NewReservationComponent_Case_6_Conditional_16_Template_cm_toggle_toggled_6_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.googleSync.set($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("checked", ctx_r1.googleSync());
  }
}
function NewReservationComponent_Case_6_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.svc.error());
  }
}
function NewReservationComponent_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "h2", 7);
    \u0275\u0275text(2, "Data e hor\xE1rio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 15)(4, "label");
    \u0275\u0275text(5, "Data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function NewReservationComponent_Case_6_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedData, $event) || (ctx_r1.selectedData = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 17)(8, "div", 15)(9, "label");
    \u0275\u0275text(10, "In\xEDcio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function NewReservationComponent_Case_6_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.horaInicio, $event) || (ctx_r1.horaInicio = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 15)(13, "label");
    \u0275\u0275text(14, "Fim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function NewReservationComponent_Case_6_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.horaFim, $event) || (ctx_r1.horaFim = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(16, NewReservationComponent_Case_6_Conditional_16_Template, 7, 1, "div", 19);
    \u0275\u0275conditionalCreate(17, NewReservationComponent_Case_6_Conditional_17_Template, 2, 1, "p", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 11)(19, "cm-button", 21);
    \u0275\u0275listener("clicked", function NewReservationComponent_Case_6_Template_cm_button_clicked_19_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.step.set(0));
    });
    \u0275\u0275text(20, "Voltar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "cm-button", 22);
    \u0275\u0275listener("clicked", function NewReservationComponent_Case_6_Template_cm_button_clicked_21_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedData);
    \u0275\u0275property("min", ctx_r1.todayMin);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.horaInicio);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.horaFim);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.calSvc.isConnected() ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.svc.error() ? 17 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.canProceedStep2() || ctx_r1.isSubmitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSubmitting() ? "Confirmando..." : "Confirmar", " ");
  }
}
function NewReservationComponent_Case_7_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1, "\u2713 Adicionado ao Google Calendar");
    \u0275\u0275elementEnd();
  }
}
function NewReservationComponent_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 27);
    \u0275\u0275element(3, "path", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h2", 29);
    \u0275\u0275text(5, "Reserva confirmada!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 30);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 31);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, NewReservationComponent_Case_7_Conditional_10_Template, 2, 0, "p", 32);
    \u0275\u0275elementStart(11, "cm-button", 33);
    \u0275\u0275listener("clicked", function NewReservationComponent_Case_7_Template_cm_button_clicked_11_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.router.navigate(["/reservas"]));
    });
    \u0275\u0275text(12, "Ver minhas reservas");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r1.selectedEquipamento()) == null ? null : tmp_1_0.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", (tmp_2_0 = ctx_r1.confirmedReservation()) == null ? null : tmp_2_0.data, " \xB7 ", (tmp_2_0 = ctx_r1.confirmedReservation()) == null ? null : tmp_2_0.horaInicio, "\u2013", (tmp_2_0 = ctx_r1.confirmedReservation()) == null ? null : tmp_2_0.horaFim, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.googleSync() && ctx_r1.calSvc.isConnected() ? 10 : -1);
  }
}
var EQUIPAMENTO_EMOJIS = {
  salao: "\xF0\u0178\u017D\u2030",
  piscina: "\xF0\u0178\x8F\u0160",
  churrasqueira: "\xF0\u0178\u201D\xA5",
  quadra: "\xF0\u0178\u017D\xBE",
  academia: "\xF0\u0178\x8F\u2039\xEF\xB8\x8F"
};
function emojiForName(nome) {
  const lower = nome.toLowerCase();
  for (const [key, emoji] of Object.entries(EQUIPAMENTO_EMOJIS)) {
    if (lower.includes(key))
      return emoji;
  }
  return "\xF0\u0178\x8F\xA2";
}
var NewReservationComponent = class _NewReservationComponent {
  constructor() {
    this.location = inject(Location);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.toast = inject(ToastService);
    this.svc = inject(ReservationService);
    this.calSvc = inject(GoogleCalendarService);
    this.state = inject(AuthState);
    this.steps = ["Espa\xC3\xA7o", "Data e hora", "Confirma\xC3\xA7\xC3\xA3o"];
    this.step = signal(0, ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    ));
    this.selectedEquipamentoId = signal("", ...ngDevMode ? [{ debugName: "selectedEquipamentoId" }] : (
      /* istanbul ignore next */
      []
    ));
    this.selectedData = "";
    this.horaInicio = "19:00";
    this.horaFim = "23:00";
    this.googleSync = signal(true, ...ngDevMode ? [{ debugName: "googleSync" }] : (
      /* istanbul ignore next */
      []
    ));
    this.isSubmitting = signal(false, ...ngDevMode ? [{ debugName: "isSubmitting" }] : (
      /* istanbul ignore next */
      []
    ));
    this.confirmedReservation = signal(null, ...ngDevMode ? [{ debugName: "confirmedReservation" }] : (
      /* istanbul ignore next */
      []
    ));
    this.selectedEquipamento = computed(() => this.svc.equipamentos().find((e) => e.id === this.selectedEquipamentoId()) ?? null, ...ngDevMode ? [{ debugName: "selectedEquipamento" }] : (
      /* istanbul ignore next */
      []
    ));
    this.emoji = emojiForName;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const tenant = this.state.currentTenant();
      if (!tenant)
        return;
      yield this.svc.loadEquipamentos(tenant.id);
      const preselect = this.route.snapshot.queryParamMap.get("equipamento");
      if (preselect)
        this.selectedEquipamentoId.set(preselect);
      this.googleSync.set(this.calSvc.isConnected());
    });
  }
  get todayMin() {
    return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  canProceedStep1() {
    return !!this.selectedEquipamentoId();
  }
  canProceedStep2() {
    return !!this.selectedData && !!this.horaInicio && !!this.horaFim && this.horaFim > this.horaInicio;
  }
  submit() {
    return __async(this, null, function* () {
      if (!this.canProceedStep2())
        return;
      const tenant = this.state.currentTenant();
      const user = this.state.user();
      if (!tenant || !user)
        return;
      this.isSubmitting.set(true);
      this.svc.error.set(null);
      const reservation = yield this.svc.create({
        condominioId: tenant.id,
        equipamentoId: this.selectedEquipamentoId(),
        moradorId: user.id,
        data: this.selectedData,
        horaInicio: this.horaInicio,
        horaFim: this.horaFim
      });
      if (!reservation) {
        const msg = this.svc.error() ?? "Erro ao criar reserva";
        this.toast.show({ message: msg, duration: 3e3 });
        this.isSubmitting.set(false);
        return;
      }
      if (this.googleSync() && this.calSvc.isConnected()) {
        const eq = this.selectedEquipamento();
        if (eq) {
          const eventId = yield this.calSvc.createEvent(reservation, eq);
          if (eventId) {
            yield this.svc.updateGoogleEventId(reservation.id, eventId, "primary");
          }
        }
      }
      this.confirmedReservation.set(reservation);
      this.isSubmitting.set(false);
      this.step.set(2);
    });
  }
  static {
    this.\u0275fac = function NewReservationComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NewReservationComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewReservationComponent, selectors: [["cm-new-reservation"]], decls: 8, vars: 3, consts: [[1, "flow"], [1, "flow__back", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M19 12H5m0 0l7 7m-7-7l7-7"], [3, "steps", "activeStep"], [1, "flow__success"], [1, "flow__body"], [1, "flow__title"], [1, "loading-hint"], [1, "spaces-grid"], [1, "space-btn", 3, "space-btn--active"], [1, "flow__footer"], ["variant", "accent", "size", "lg", 2, "width", "100%", 3, "clicked", "disabled"], [1, "space-btn", 3, "click"], [1, "empty-hint"], [1, "form-field"], ["type", "date", 1, "form-input", 3, "ngModelChange", "ngModel", "min"], [1, "form-row"], ["type", "time", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "google-toggle"], [1, "error-hint"], ["variant", "ghost", "size", "md", 3, "clicked"], ["variant", "accent", "size", "lg", 2, "flex", "1", 3, "clicked", "disabled"], [1, "toggle-title"], [1, "toggle-sub"], [3, "toggled", "checked"], [1, "success-icon"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["d", "M20 6L9 17l-5-5"], [1, "success-title"], [1, "success-sub"], [1, "success-date"], [1, "success-google"], ["variant", "accent", "size", "lg", 2, "width", "100%", 3, "clicked"]], template: function NewReservationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
        \u0275\u0275listener("click", function NewReservationComponent_Template_button_click_1_listener() {
          return ctx.location.back();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(2, "svg", 2);
        \u0275\u0275element(3, "path", 3);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275element(4, "cm-stepper", 4);
        \u0275\u0275conditionalCreate(5, NewReservationComponent_Case_5_Template, 11, 3)(6, NewReservationComponent_Case_6_Template, 23, 8)(7, NewReservationComponent_Case_7_Template, 13, 5, "div", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_2_0;
        \u0275\u0275advance(4);
        \u0275\u0275property("steps", ctx.steps)("activeStep", ctx.step());
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_2_0 = ctx.step()) === 0 ? 5 : tmp_2_0 === 1 ? 6 : tmp_2_0 === 2 ? 7 : -1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, StepperComponent, ButtonComponent, ToggleComponent], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NewReservationComponent, [{
    type: Component,
    args: [{ selector: "cm-new-reservation", standalone: true, imports: [FormsModule, StepperComponent, ButtonComponent, ToggleComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="flow">
  <button class="flow__back" (click)="location.back()">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
  </button>
  <cm-stepper [steps]="steps" [activeStep]="step()"></cm-stepper>

  @switch (step()) {

    @case (0) {
      <div class="flow__body">
        <h2 class="flow__title">Escolha o espa\xE7o</h2>
        @if (svc.isLoading()) {
          <p class="loading-hint">Carregando espa\xE7os...</p>
        }
        <div class="spaces-grid">
          @for (eq of svc.equipamentos(); track eq.id) {
            <button class="space-btn"
              [class.space-btn--active]="selectedEquipamentoId() === eq.id"
              (click)="selectedEquipamentoId.set(eq.id)">
              <span>{{ emoji(eq.nome) }}</span>
              <span>{{ eq.nome }}</span>
            </button>
          } @empty {
            @if (!svc.isLoading()) {
              <p class="empty-hint">Nenhuma \xE1rea dispon\xEDvel</p>
            }
          }
        </div>
      </div>
      <div class="flow__footer">
        <cm-button variant="accent" size="lg" style="width:100%"
          [disabled]="!canProceedStep1()"
          (clicked)="step.set(1)">Continuar</cm-button>
      </div>
    }

    @case (1) {
      <div class="flow__body">
        <h2 class="flow__title">Data e hor\xE1rio</h2>
        <div class="form-field">
          <label>Data</label>
          <input type="date" class="form-input" [(ngModel)]="selectedData" [min]="todayMin"/>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>In\xEDcio</label>
            <input type="time" class="form-input" [(ngModel)]="horaInicio"/>
          </div>
          <div class="form-field">
            <label>Fim</label>
            <input type="time" class="form-input" [(ngModel)]="horaFim"/>
          </div>
        </div>
        @if (calSvc.isConnected()) {
          <div class="google-toggle">
            <div>
              <p class="toggle-title">Adicionar ao Google Calendar</p>
              <p class="toggle-sub">Sincronize com sua agenda</p>
            </div>
            <cm-toggle [checked]="googleSync()" (toggled)="googleSync.set($event)"></cm-toggle>
          </div>
        }
        @if (svc.error()) {
          <p class="error-hint">{{ svc.error() }}</p>
        }
      </div>
      <div class="flow__footer">
        <cm-button variant="ghost" size="md" (clicked)="step.set(0)">Voltar</cm-button>
        <cm-button variant="accent" size="lg" style="flex:1"
          [disabled]="!canProceedStep2() || isSubmitting()"
          (clicked)="submit()">
          {{ isSubmitting() ? 'Confirmando...' : 'Confirmar' }}
        </cm-button>
      </div>
    }

    @case (2) {
      <div class="flow__success">
        <div class="success-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 class="success-title">Reserva confirmada!</h2>
        <p class="success-sub">{{ selectedEquipamento()?.nome }}</p>
        <p class="success-date">
          {{ confirmedReservation()?.data }} \xB7
          {{ confirmedReservation()?.horaInicio }}\u2013{{ confirmedReservation()?.horaFim }}
        </p>
        @if (googleSync() && calSvc.isConnected()) {
          <p class="success-google">\u2713 Adicionado ao Google Calendar</p>
        }
        <cm-button variant="accent" size="lg" style="width:100%"
          (clicked)="router.navigate(['/reservas'])">Ver minhas reservas</cm-button>
      </div>
    }

  }
</div>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewReservationComponent, { className: "NewReservationComponent", filePath: "apps/morador/src/app/features/reservations/new-reservation.component.ts", lineNumber: 34 });
})();
export {
  NewReservationComponent
};
//# sourceMappingURL=chunk-LDKJ6ZQG.js.map
