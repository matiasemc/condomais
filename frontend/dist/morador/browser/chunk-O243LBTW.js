import {
  Router
} from "./chunk-22JHDSMV.js";
import {
  ToastService
} from "./chunk-DGSLDQQ5.js";
import {
  ButtonComponent,
  StepperComponent,
  ToggleComponent
} from "./chunk-VUTJB2DO.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-RE6VNHJT.js";
import {
  ChangeDetectionStrategy,
  Component,
  Location,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
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
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-QFVHJJPM.js";

// apps/morador/src/app/features/reservations/new-reservation.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NewReservationComponent_Case_5_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function NewReservationComponent_Case_5_For_5_Template_button_click_0_listener() {
      const s_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectedEspaco.set(s_r3.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("space-btn--active", ctx_r3.selectedEspaco() === s_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r3.emoji);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r3.nome);
  }
}
function NewReservationComponent_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "h2", 7);
    \u0275\u0275text(2, "Escolha o espaco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 8);
    \u0275\u0275repeaterCreate(4, NewReservationComponent_Case_5_For_5_Template, 5, 4, "button", 9, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 10)(7, "cm-button", 11);
    \u0275\u0275listener("clicked", function NewReservationComponent_Case_5_Template_cm_button_clicked_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step.set(1));
    });
    \u0275\u0275text(8, "Continuar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r3.espacos);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r3.selectedEspaco());
  }
}
function NewReservationComponent_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "h2", 7);
    \u0275\u0275text(2, "Data e horario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 13)(4, "label");
    \u0275\u0275text(5, "Data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function NewReservationComponent_Case_6_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.selectedData, $event) || (ctx_r3.selectedData = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 15)(8, "div", 13)(9, "label");
    \u0275\u0275text(10, "Inicio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function NewReservationComponent_Case_6_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.horaInicio, $event) || (ctx_r3.horaInicio = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 13)(13, "label");
    \u0275\u0275text(14, "Fim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function NewReservationComponent_Case_6_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.horaFim, $event) || (ctx_r3.horaFim = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 17)(17, "div")(18, "p", 18);
    \u0275\u0275text(19, "Adicionar ao Google Calendar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 19);
    \u0275\u0275text(21, "Sincronize com sua agenda");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "cm-toggle", 20);
    \u0275\u0275listener("toggled", function NewReservationComponent_Case_6_Template_cm_toggle_toggled_22_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.googleSync.set($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 10)(24, "cm-button", 21);
    \u0275\u0275listener("clicked", function NewReservationComponent_Case_6_Template_cm_button_clicked_24_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step.set(0));
    });
    \u0275\u0275text(25, "Voltar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "cm-button", 22);
    \u0275\u0275listener("clicked", function NewReservationComponent_Case_6_Template_cm_button_clicked_26_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step.set(2));
    });
    \u0275\u0275text(27, "Confirmar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.selectedData);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.horaInicio);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.horaFim);
    \u0275\u0275advance(7);
    \u0275\u0275property("checked", ctx_r3.googleSync());
  }
}
function NewReservationComponent_Case_7_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "Adicionado ao Google Calendar");
    \u0275\u0275elementEnd();
  }
}
function NewReservationComponent_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 24);
    \u0275\u0275element(3, "path", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h2", 26);
    \u0275\u0275text(5, "Reserva confirmada!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 27);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, NewReservationComponent_Case_7_Conditional_8_Template, 2, 0, "p", 28);
    \u0275\u0275elementStart(9, "cm-button", 29);
    \u0275\u0275listener("clicked", function NewReservationComponent_Case_7_Template_cm_button_clicked_9_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.router.navigate(["/reservas"]));
    });
    \u0275\u0275text(10, "Ver minhas reservas");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r3.selectedEspaco());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.googleSync() ? 8 : -1);
  }
}
var NewReservationComponent = class _NewReservationComponent {
  constructor() {
    this.location = inject(Location);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.steps = ["Espaco", "Data e hora", "Confirmacao"];
    this.step = signal(0);
    this.espacos = [
      { id: "salao-a", emoji: "\u{1F389}", nome: "Salao A" },
      { id: "salao-b", emoji: "\u{1F942}", nome: "Salao B" },
      { id: "piscina", emoji: "\u{1F3CA}", nome: "Piscina" },
      { id: "churras", emoji: "\u{1F525}", nome: "Churrasqueira" }
    ];
    this.selectedEspaco = signal("");
    this.selectedData = "";
    this.horaInicio = "19:00";
    this.horaFim = "23:00";
    this.googleSync = signal(true);
  }
  static {
    this.\u0275fac = function NewReservationComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NewReservationComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewReservationComponent, selectors: [["cm-new-reservation"]], decls: 8, vars: 3, consts: [[1, "flow"], [1, "flow__back", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M19 12H5m0 0l7 7m-7-7l7-7"], [3, "steps", "activeStep"], [1, "flow__success"], [1, "flow__body"], [1, "flow__title"], [1, "spaces-grid"], [1, "space-btn", 3, "space-btn--active"], [1, "flow__footer"], ["variant", "accent", "size", "lg", 2, "width", "100%", 3, "clicked", "disabled"], [1, "space-btn", 3, "click"], [1, "form-field"], ["type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["type", "time", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "google-toggle"], [1, "toggle-title"], [1, "toggle-sub"], [3, "toggled", "checked"], ["variant", "ghost", "size", "md", 3, "clicked"], ["variant", "accent", "size", "lg", 2, "flex", "1", 3, "clicked"], [1, "success-icon"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["d", "M20 6L9 17l-5-5"], [1, "success-title"], [1, "success-sub"], [1, "success-google"], ["variant", "accent", "size", "lg", 2, "width", "100%", 3, "clicked"]], template: function NewReservationComponent_Template(rf, ctx) {
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
        \u0275\u0275template(5, NewReservationComponent_Case_5_Template, 9, 1)(6, NewReservationComponent_Case_6_Template, 28, 4)(7, NewReservationComponent_Case_7_Template, 11, 2, "div", 5);
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
        <h2 class="flow__title">Escolha o espaco</h2>
        <div class="spaces-grid">
          @for (s of espacos; track s.id) {
            <button class="space-btn" [class.space-btn--active]="selectedEspaco() === s.id" (click)="selectedEspaco.set(s.id)">
              <span>{{ s.emoji }}</span><span>{{ s.nome }}</span>
            </button>
          }
        </div>
      </div>
      <div class="flow__footer">
        <cm-button variant="accent" size="lg" style="width:100%" [disabled]="!selectedEspaco()" (clicked)="step.set(1)">Continuar</cm-button>
      </div>
    }
    @case (1) {
      <div class="flow__body">
        <h2 class="flow__title">Data e horario</h2>
        <div class="form-field">
          <label>Data</label>
          <input type="date" class="form-input" [(ngModel)]="selectedData"/>
        </div>
        <div class="form-row">
          <div class="form-field"><label>Inicio</label><input type="time" class="form-input" [(ngModel)]="horaInicio"/></div>
          <div class="form-field"><label>Fim</label><input type="time" class="form-input" [(ngModel)]="horaFim"/></div>
        </div>
        <div class="google-toggle">
          <div><p class="toggle-title">Adicionar ao Google Calendar</p><p class="toggle-sub">Sincronize com sua agenda</p></div>
          <cm-toggle [checked]="googleSync()" (toggled)="googleSync.set($event)"></cm-toggle>
        </div>
      </div>
      <div class="flow__footer">
        <cm-button variant="ghost" size="md" (clicked)="step.set(0)">Voltar</cm-button>
        <cm-button variant="accent" size="lg" style="flex:1" (clicked)="step.set(2)">Confirmar</cm-button>
      </div>
    }
    @case (2) {
      <div class="flow__success">
        <div class="success-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 class="success-title">Reserva confirmada!</h2>
        <p class="success-sub">{{ selectedEspaco() }}</p>
        @if (googleSync()) { <p class="success-google">Adicionado ao Google Calendar</p> }
        <cm-button variant="accent" size="lg" style="width:100%" (clicked)="router.navigate(['/reservas'])">Ver minhas reservas</cm-button>
      </div>
    }
  }
</div>` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewReservationComponent, { className: "NewReservationComponent", filePath: "apps/morador/src/app/features/reservations/new-reservation.component.ts", lineNumber: 18 });
})();
export {
  NewReservationComponent
};
//# sourceMappingURL=chunk-O243LBTW.js.map
