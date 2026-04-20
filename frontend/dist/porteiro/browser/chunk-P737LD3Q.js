import {
  ToastService
} from "./chunk-JUVU2L4V.js";
import {
  AvatarComponent,
  ButtonComponent,
  SearchInputComponent,
  SectionHeaderComponent,
  StepperComponent
} from "./chunk-7CWI5AJD.js";
import {
  FormsModule,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-NDOIAJY4.js";
import {
  Router
} from "./chunk-C54MFYDF.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-JLUHEVQX.js";

// apps/porteiro/src/app/features/deliveries/new-delivery.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NewDeliveryComponent_Conditional_3_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function NewDeliveryComponent_Conditional_3_For_4_Template_button_click_0_listener() {
      const r_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectResident(r_r4));
    });
    \u0275\u0275element(1, "cm-avatar", 9);
    \u0275\u0275elementStart(2, "div", 10)(3, "span", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 12);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("name", r_r4.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Apto ", r_r4.unit, "");
  }
}
function NewDeliveryComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "cm-search-input", 5);
    \u0275\u0275twoWayListener("valueChange", function NewDeliveryComponent_Conditional_3_Template_cm_search_input_valueChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.search, $event) || (ctx_r1.search = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 6);
    \u0275\u0275repeaterCreate(3, NewDeliveryComponent_Conditional_3_For_4_Template, 7, 3, "button", 7, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("value", ctx_r1.search);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.filteredResidents());
  }
}
function NewDeliveryComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "cm-avatar", 9);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r6 = ctx;
    \u0275\u0275advance();
    \u0275\u0275property("name", r_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", r_r6.name, " \xB7 Apto ", r_r6.unit, "");
  }
}
function NewDeliveryComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275template(1, NewDeliveryComponent_Conditional_4_Conditional_1_Template, 4, 3, "div", 13);
    \u0275\u0275elementStart(2, "div", 14)(3, "label", 15);
    \u0275\u0275text(4, "Tipo de entrega");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 16);
    \u0275\u0275listener("change", function NewDeliveryComponent_Conditional_4_Template_select_change_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deliveryType.set($event.target.value));
    });
    \u0275\u0275elementStart(6, "option", 17);
    \u0275\u0275text(7, "Selecione\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 18);
    \u0275\u0275text(9, "Caixa / encomenda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 19);
    \u0275\u0275text(11, "Carta / documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 20);
    \u0275\u0275text(13, "Alimento / bag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 21);
    \u0275\u0275text(15, "Outro");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 14)(17, "label", 15);
    \u0275\u0275text(18, "Observa\xE7\xF5es (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "textarea", 22);
    \u0275\u0275listener("input", function NewDeliveryComponent_Conditional_4_Template_textarea_input_19_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.notes.set($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 23)(21, "cm-button", 24);
    \u0275\u0275listener("click", function NewDeliveryComponent_Conditional_4_Template_cm_button_click_21_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.voltar());
    });
    \u0275\u0275text(22, "Voltar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "cm-button", 25);
    \u0275\u0275listener("click", function NewDeliveryComponent_Conditional_4_Template_cm_button_click_23_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmar());
    });
    \u0275\u0275text(24, "Confirmar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_1_0 = ctx_r1.selected()) ? 1 : -1, tmp_1_0);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.deliveryType());
    \u0275\u0275advance(14);
    \u0275\u0275property("value", ctx_r1.notes());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.deliveryType());
  }
}
function NewDeliveryComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 26);
    \u0275\u0275text(2, "\u2705");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 27);
    \u0275\u0275text(4, "Entrega registrada!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 28);
    \u0275\u0275text(6, "O morador ser\xE1 notificado.");
    \u0275\u0275elementEnd()();
  }
}
var NewDeliveryComponent = class _NewDeliveryComponent {
  constructor(router, toast) {
    this.router = router;
    this.toast = toast;
    this.steps = ["Morador", "Detalhes", "Conclu\xEDdo"];
    this.activeStep = signal(0);
    this.search = signal("");
    this.selected = signal(null);
    this.deliveryType = signal("");
    this.notes = signal("");
    this.residents = [
      { id: "1", name: "Ana Lima", unit: "101" },
      { id: "2", name: "Bruno Costa", unit: "102" },
      { id: "3", name: "Carla Souza", unit: "201" },
      { id: "4", name: "Elisa Ferreira", unit: "301" },
      { id: "5", name: "Felipe Nunes", unit: "302" }
    ];
    this.filteredResidents = () => {
      const q = this.search().toLowerCase();
      return this.residents.filter((r) => r.name.toLowerCase().includes(q) || r.unit.includes(q));
    };
  }
  selectResident(r) {
    this.selected.set(r);
    this.activeStep.set(1);
  }
  confirmar() {
    this.activeStep.set(2);
    this.toast.show({ message: "Entrega registrada com sucesso", type: "success" });
    setTimeout(() => this.router.navigate(["/entregas"]), 2e3);
  }
  voltar() {
    if (this.activeStep() > 0)
      this.activeStep.update((s) => s - 1);
    else
      this.router.navigate(["/entregas"]);
  }
  static {
    this.\u0275fac = function NewDeliveryComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NewDeliveryComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewDeliveryComponent, selectors: [["cm-new-delivery"]], decls: 6, vars: 5, consts: [[1, "new-delivery-page"], ["title", "Nova Entrega", "eyebrow", "PORTARIA"], [3, "steps", "activeStep"], [1, "step"], [1, "step", "step--success"], ["placeholder", "Buscar morador\u2026", 3, "valueChange", "value"], [1, "resident-options"], [1, "resident-opt"], [1, "resident-opt", 3, "click"], [3, "name"], [1, "opt-info"], [1, "opt-name"], [1, "opt-unit"], [1, "selected-resident"], [1, "field"], [1, "field-label"], [1, "field-select", 3, "change", "value"], ["value", ""], ["value", "caixa"], ["value", "carta"], ["value", "alimento"], ["value", "outro"], ["placeholder", "Ex: fr\xE1gil, requer assinatura\u2026", 1, "field-textarea", 3, "input", "value"], [1, "step-actions"], ["variant", "ghost", 3, "click"], ["variant", "accent", 3, "click", "disabled"], [1, "success-icon"], [1, "success-title"], [1, "success-sub"]], template: function NewDeliveryComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "cm-section-header", 1)(2, "cm-stepper", 2);
        \u0275\u0275template(3, NewDeliveryComponent_Conditional_3_Template, 5, 1, "div", 3)(4, NewDeliveryComponent_Conditional_4_Template, 25, 4, "div", 3)(5, NewDeliveryComponent_Conditional_5_Template, 7, 0, "div", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275property("steps", ctx.steps)("activeStep", ctx.activeStep());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeStep() === 0 ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeStep() === 1 ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.activeStep() === 2 ? 5 : -1);
      }
    }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SearchInputComponent, ButtonComponent, StepperComponent, AvatarComponent, SectionHeaderComponent], styles: ["\n\n.new-delivery-page[_ngcontent-%COMP%] {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.step[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.resident-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.resident-opt[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-3) var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  border: none;\n  cursor: pointer;\n  text-align: left;\n  width: 100%;\n  transition: opacity 0.15s;\n}\n.resident-opt[_ngcontent-%COMP%]:active {\n  opacity: 0.7;\n}\n.opt-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.opt-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--c-text);\n}\n.opt-unit[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n.selected-resident[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-3);\n  background: var(--c-card-muted);\n  border-radius: var(--r-md);\n  font-size: 14px;\n  color: var(--c-text);\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.field-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-text-muted);\n}\n.field-select[_ngcontent-%COMP%], \n.field-textarea[_ngcontent-%COMP%] {\n  padding: var(--s-3);\n  border-radius: var(--r-sm);\n  border: 1.5px solid var(--c-card-muted);\n  background: var(--c-card);\n  font-size: 15px;\n  color: var(--c-text);\n  font-family: var(--font-sans);\n  width: 100%;\n}\n.field-select[_ngcontent-%COMP%]:focus, \n.field-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--c-accent);\n}\n.field-textarea[_ngcontent-%COMP%] {\n  min-height: 80px;\n  resize: none;\n}\n.step-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-3);\n}\n.step--success[_ngcontent-%COMP%] {\n  align-items: center;\n  padding: var(--s-7) 0;\n  text-align: center;\n}\n.success-icon[_ngcontent-%COMP%] {\n  font-size: 56px;\n  margin-bottom: var(--s-3);\n}\n.success-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  margin: 0 0 var(--s-2);\n}\n.success-sub[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=new-delivery.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NewDeliveryComponent, [{
    type: Component,
    args: [{ selector: "cm-new-delivery", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [FormsModule, SearchInputComponent, ButtonComponent, StepperComponent, AvatarComponent, SectionHeaderComponent], template: '<div class="new-delivery-page">\n  <cm-section-header title="Nova Entrega" eyebrow="PORTARIA"></cm-section-header>\n  <cm-stepper [steps]="steps" [activeStep]="activeStep()"></cm-stepper>\n\n  @if (activeStep() === 0) {\n    <div class="step">\n      <cm-search-input [(value)]="search" placeholder="Buscar morador\u2026"></cm-search-input>\n      <div class="resident-options">\n        @for (r of filteredResidents(); track r.id) {\n          <button class="resident-opt" (click)="selectResident(r)">\n            <cm-avatar [name]="r.name"></cm-avatar>\n            <div class="opt-info">\n              <span class="opt-name">{{ r.name }}</span>\n              <span class="opt-unit">Apto {{ r.unit }}</span>\n            </div>\n          </button>\n        }\n      </div>\n    </div>\n  }\n\n  @if (activeStep() === 1) {\n    <div class="step">\n      @if (selected(); as r) {\n        <div class="selected-resident">\n          <cm-avatar [name]="r.name"></cm-avatar>\n          <span>{{ r.name }} \xB7 Apto {{ r.unit }}</span>\n        </div>\n      }\n      <div class="field">\n        <label class="field-label">Tipo de entrega</label>\n        <select class="field-select" [value]="deliveryType()" (change)="deliveryType.set($any($event.target).value)">\n          <option value="">Selecione\u2026</option>\n          <option value="caixa">Caixa / encomenda</option>\n          <option value="carta">Carta / documento</option>\n          <option value="alimento">Alimento / bag</option>\n          <option value="outro">Outro</option>\n        </select>\n      </div>\n      <div class="field">\n        <label class="field-label">Observa\xE7\xF5es (opcional)</label>\n        <textarea class="field-textarea" [value]="notes()" (input)="notes.set($any($event.target).value)" placeholder="Ex: fr\xE1gil, requer assinatura\u2026"></textarea>\n      </div>\n      <div class="step-actions">\n        <cm-button variant="ghost" (click)="voltar()">Voltar</cm-button>\n        <cm-button variant="accent" (click)="confirmar()" [disabled]="!deliveryType()">Confirmar</cm-button>\n      </div>\n    </div>\n  }\n\n  @if (activeStep() === 2) {\n    <div class="step step--success">\n      <div class="success-icon">\u2705</div>\n      <h3 class="success-title">Entrega registrada!</h3>\n      <p class="success-sub">O morador ser\xE1 notificado.</p>\n    </div>\n  }\n</div>', styles: ["/* apps/porteiro/src/app/features/deliveries/new-delivery.component.scss */\n.new-delivery-page {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.step {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.resident-options {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.resident-opt {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-3) var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  border: none;\n  cursor: pointer;\n  text-align: left;\n  width: 100%;\n  transition: opacity 0.15s;\n}\n.resident-opt:active {\n  opacity: 0.7;\n}\n.opt-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.opt-name {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--c-text);\n}\n.opt-unit {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n.selected-resident {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-3);\n  background: var(--c-card-muted);\n  border-radius: var(--r-md);\n  font-size: 14px;\n  color: var(--c-text);\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.field-label {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-text-muted);\n}\n.field-select,\n.field-textarea {\n  padding: var(--s-3);\n  border-radius: var(--r-sm);\n  border: 1.5px solid var(--c-card-muted);\n  background: var(--c-card);\n  font-size: 15px;\n  color: var(--c-text);\n  font-family: var(--font-sans);\n  width: 100%;\n}\n.field-select:focus,\n.field-textarea:focus {\n  outline: none;\n  border-color: var(--c-accent);\n}\n.field-textarea {\n  min-height: 80px;\n  resize: none;\n}\n.step-actions {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-3);\n}\n.step--success {\n  align-items: center;\n  padding: var(--s-7) 0;\n  text-align: center;\n}\n.success-icon {\n  font-size: 56px;\n  margin-bottom: var(--s-3);\n}\n.success-title {\n  font-size: 20px;\n  font-weight: 700;\n  margin: 0 0 var(--s-2);\n}\n.success-sub {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=new-delivery.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewDeliveryComponent, { className: "NewDeliveryComponent", filePath: "apps/porteiro/src/app/features/deliveries/new-delivery.component.ts", lineNumber: 19 });
})();
export {
  NewDeliveryComponent
};
//# sourceMappingURL=chunk-P737LD3Q.js.map
