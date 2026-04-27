import {
  ToastService
} from "./chunk-JPM7X6WV.js";
import "./chunk-TF4WZQI6.js";
import {
  ButtonComponent,
  SectionHeaderComponent
} from "./chunk-TTJJPAUX.js";
import {
  AuthState,
  OccurrenceService
} from "./chunk-PSJDYNQK.js";
import {
  Router
} from "./chunk-DRD3LIJU.js";
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
  ɵɵtextInterpolate1
} from "./chunk-NH5B5NLZ.js";

// apps/porteiro/src/app/features/occurrences/new-occurrence.component.ts
var _forTrack0 = ($index, $item) => $item.label;
function NewOccurrenceComponent_Conditional_2_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function NewOccurrenceComponent_Conditional_2_For_6_Template_button_click_0_listener() {
      const t_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectedType.set(t_r3.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("type-chip--active", ctx_r3.selectedType() === t_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r3.label, " ");
  }
}
function NewOccurrenceComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 4)(2, "label", 5);
    \u0275\u0275text(3, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 6);
    \u0275\u0275repeaterCreate(5, NewOccurrenceComponent_Conditional_2_For_6_Template, 2, 3, "button", 7, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 4)(8, "label", 5);
    \u0275\u0275text(9, "Descricao");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "textarea", 8);
    \u0275\u0275listener("input", function NewOccurrenceComponent_Conditional_2_Template_textarea_input_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.description.set($event.target.value));
    });
    \u0275\u0275text(11, "        ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 9)(13, "cm-button", 10);
    \u0275\u0275listener("click", function NewOccurrenceComponent_Conditional_2_Template_cm_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.voltar());
    });
    \u0275\u0275text(14, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "cm-button", 11);
    \u0275\u0275listener("click", function NewOccurrenceComponent_Conditional_2_Template_cm_button_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.salvar());
    });
    \u0275\u0275text(16, "Salvar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.types);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r3.description());
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r3.selectedType() || !ctx_r3.description());
  }
}
function NewOccurrenceComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 13);
    \u0275\u0275text(2, "OK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Ocorrencia registrada!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Redirecionando...");
    \u0275\u0275elementEnd()();
  }
}
var NewOccurrenceComponent = class _NewOccurrenceComponent {
  constructor() {
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.authState = inject(AuthState);
    this.occurrenceService = inject(OccurrenceService);
    this.types = [
      { id: "ruido", label: "Barulho" },
      { id: "vandalismo", label: "Danos" },
      { id: "entrada_suspeita", label: "Seguranca" },
      { id: "outro", label: "Limpeza" },
      { id: "outro", label: "Outro" }
    ];
    this.selectedType = signal("", ...ngDevMode ? [{ debugName: "selectedType" }] : (
      /* istanbul ignore next */
      []
    ));
    this.description = signal("", ...ngDevMode ? [{ debugName: "description" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saved = signal(false, ...ngDevMode ? [{ debugName: "saved" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  salvar() {
    return __async(this, null, function* () {
      const tenant = this.authState.currentTenant();
      const user = this.authState.user();
      const tipo = this.selectedType();
      const descricao = this.description().trim();
      if (!tenant || !user || !tipo || !descricao)
        return;
      const occurrence = yield this.occurrenceService.create({
        condominioId: tenant.id,
        userId: user.id,
        titulo: this.types.find((t) => t.id === tipo)?.label ?? "Ocorrencia",
        tipo,
        descricao
      });
      if (occurrence) {
        this.saved.set(true);
        this.toast.show({ message: "Ocorrencia registrada", type: "success" });
        setTimeout(() => this.router.navigate(["/ocorrencias"]), 1800);
      } else {
        this.toast.show({ message: "Erro ao registrar ocorrencia", type: "error" });
      }
    });
  }
  voltar() {
    this.router.navigate(["/ocorrencias"]);
  }
  static {
    this.\u0275fac = function NewOccurrenceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NewOccurrenceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewOccurrenceComponent, selectors: [["cm-new-occurrence"]], decls: 4, vars: 1, consts: [[1, "new-occurrence-page"], ["title", "Nova Ocorrencia", "eyebrow", "REGISTRO"], [1, "form"], [1, "success"], [1, "field"], [1, "field-label"], [1, "type-chips"], [1, "type-chip", 3, "type-chip--active"], ["placeholder", "Descreva a ocorrencia com detalhes...", "rows", "5", 1, "field-textarea", 3, "input", "value"], [1, "form-actions"], ["variant", "ghost", 3, "click"], ["variant", "accent", 3, "click", "disabled"], [1, "type-chip", 3, "click"], [1, "success-icon"]], template: function NewOccurrenceComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "cm-section-header", 1);
        \u0275\u0275conditionalCreate(2, NewOccurrenceComponent_Conditional_2_Template, 17, 2, "div", 2)(3, NewOccurrenceComponent_Conditional_3_Template, 7, 0, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275conditional(!ctx.saved() ? 2 : 3);
      }
    }, dependencies: [ButtonComponent, SectionHeaderComponent], styles: ["\n.new-occurrence-page[_ngcontent-%COMP%] {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.field-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-text-muted);\n}\n.type-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--s-2);\n}\n.type-chip[_ngcontent-%COMP%] {\n  padding: var(--s-2) var(--s-3);\n  border-radius: var(--r-pill);\n  border: 1.5px solid var(--c-card-muted);\n  background: var(--c-card);\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.type-chip--active[_ngcontent-%COMP%] {\n  background: var(--c-accent);\n  border-color: var(--c-accent);\n  color: #fff;\n}\n.field-textarea[_ngcontent-%COMP%] {\n  padding: var(--s-3);\n  border-radius: var(--r-sm);\n  border: 1.5px solid var(--c-card-muted);\n  background: var(--c-card);\n  font-size: 15px;\n  color: var(--c-text);\n  font-family: var(--font-sans);\n  width: 100%;\n  resize: none;\n}\n.field-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--c-accent);\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-3);\n}\n.success[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: var(--s-8) 0;\n}\n.success-icon[_ngcontent-%COMP%] {\n  font-size: 56px;\n  display: block;\n  margin-bottom: var(--s-3);\n}\n.success[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  margin: 0 0 var(--s-2);\n}\n.success[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=new-occurrence.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NewOccurrenceComponent, [{
    type: Component,
    args: [{ selector: "cm-new-occurrence", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [ButtonComponent, SectionHeaderComponent], template: '<div class="new-occurrence-page">\n  <cm-section-header title="Nova Ocorrencia" eyebrow="REGISTRO"></cm-section-header>\n\n  @if (!saved()) {\n    <div class="form">\n      <div class="field">\n        <label class="field-label">Tipo</label>\n        <div class="type-chips">\n          @for (t of types; track t.label) {\n            <button class="type-chip" [class.type-chip--active]="selectedType() === t.id" (click)="selectedType.set(t.id)">\n              {{ t.label }}\n            </button>\n          }\n        </div>\n      </div>\n      <div class="field">\n        <label class="field-label">Descricao</label>\n        <textarea\n          class="field-textarea"\n          [value]="description()"\n          (input)="description.set($any($event.target).value)"\n          placeholder="Descreva a ocorrencia com detalhes..."\n          rows="5">\n        </textarea>\n      </div>\n      <div class="form-actions">\n        <cm-button variant="ghost" (click)="voltar()">Cancelar</cm-button>\n        <cm-button variant="accent" (click)="salvar()" [disabled]="!selectedType() || !description()">Salvar</cm-button>\n      </div>\n    </div>\n  } @else {\n    <div class="success">\n      <div class="success-icon">OK</div>\n      <h3>Ocorrencia registrada!</h3>\n      <p>Redirecionando...</p>\n    </div>\n  }\n</div>\n', styles: ["/* apps/porteiro/src/app/features/occurrences/new-occurrence.component.css */\n.new-occurrence-page {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.field-label {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-text-muted);\n}\n.type-chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--s-2);\n}\n.type-chip {\n  padding: var(--s-2) var(--s-3);\n  border-radius: var(--r-pill);\n  border: 1.5px solid var(--c-card-muted);\n  background: var(--c-card);\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.type-chip--active {\n  background: var(--c-accent);\n  border-color: var(--c-accent);\n  color: #fff;\n}\n.field-textarea {\n  padding: var(--s-3);\n  border-radius: var(--r-sm);\n  border: 1.5px solid var(--c-card-muted);\n  background: var(--c-card);\n  font-size: 15px;\n  color: var(--c-text);\n  font-family: var(--font-sans);\n  width: 100%;\n  resize: none;\n}\n.field-textarea:focus {\n  outline: none;\n  border-color: var(--c-accent);\n}\n.form-actions {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-3);\n}\n.success {\n  text-align: center;\n  padding: var(--s-8) 0;\n}\n.success-icon {\n  font-size: 56px;\n  display: block;\n  margin-bottom: var(--s-3);\n}\n.success h3 {\n  font-size: 20px;\n  font-weight: 700;\n  margin: 0 0 var(--s-2);\n}\n.success p {\n  font-size: 14px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=new-occurrence.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewOccurrenceComponent, { className: "NewOccurrenceComponent", filePath: "apps/porteiro/src/app/features/occurrences/new-occurrence.component.ts", lineNumber: 21 });
})();
export {
  NewOccurrenceComponent
};
//# sourceMappingURL=chunk-VZU6RYZI.js.map
