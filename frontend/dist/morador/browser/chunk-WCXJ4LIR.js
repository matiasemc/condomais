import {
  ButtonComponent,
  SpinnerComponent
} from "./chunk-2E4G4N2I.js";
import {
  AuthState,
  OccurrenceService,
  UploadService
} from "./chunk-IQFUSNZ4.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-R6BDYNR2.js";
import {
  Router
} from "./chunk-KU6U7BFN.js";
import "./chunk-UEEOQNAF.js";
import {
  ChangeDetectionStrategy,
  Component,
  __async,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/occurrences/new-occurrence.component.ts
function NewOccurrenceComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "img", 26);
    \u0275\u0275elementStart(1, "button", 27);
    \u0275\u0275listener("click", function NewOccurrenceComponent_Conditional_41_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.removeImage($event));
    });
    \u0275\u0275text(2, "\xE2\u0153\u2022");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r3.previewUrl(), \u0275\u0275sanitizeUrl);
  }
}
function NewOccurrenceComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, "\xF0\u0178\u201C\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 29);
    \u0275\u0275text(3, "Toque para adicionar foto");
    \u0275\u0275elementEnd();
  }
}
function NewOccurrenceComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.fileError());
  }
}
function NewOccurrenceComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-spinner", 24);
  }
  if (rf & 2) {
    \u0275\u0275property("size", 16);
  }
}
function NewOccurrenceComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Registrar Ocorr\xC3\xAAncia ");
  }
}
function NewOccurrenceComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.submitError());
  }
}
var NewOccurrenceComponent = class _NewOccurrenceComponent {
  constructor() {
    this.router = inject(Router);
    this.occurrenceSvc = inject(OccurrenceService);
    this.uploadSvc = inject(UploadService);
    this.authState = inject(AuthState);
    this.titulo = "";
    this.tipo = "";
    this.local = "";
    this.descricao = "";
    this.selectedFile = signal(null, ...ngDevMode ? [{ debugName: "selectedFile" }] : (
      /* istanbul ignore next */
      []
    ));
    this.previewUrl = signal(null, ...ngDevMode ? [{ debugName: "previewUrl" }] : (
      /* istanbul ignore next */
      []
    ));
    this.fileError = signal(null, ...ngDevMode ? [{ debugName: "fileError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : (
      /* istanbul ignore next */
      []
    ));
    this.submitError = signal(null, ...ngDevMode ? [{ debugName: "submitError" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  onFileSelected(event) {
    const file = event.target.files?.[0];
    if (!file)
      return;
    if (file.size > 5 * 1024 * 1024) {
      this.fileError.set("Arquivo muito grande. M\xC3\xA1ximo 5 MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      this.fileError.set("Apenas imagens s\xC3\xA3o permitidas.");
      return;
    }
    this.fileError.set(null);
    this.selectedFile.set(file);
    const reader = new FileReader();
    reader.onload = (e) => this.previewUrl.set(e.target?.result);
    reader.readAsDataURL(file);
  }
  removeImage(event) {
    event.stopPropagation();
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.fileError.set(null);
  }
  submit() {
    return __async(this, null, function* () {
      const user = this.authState.user();
      const tenant = this.authState.currentTenant();
      if (!user || !tenant || !this.titulo || !this.tipo || !this.descricao)
        return;
      this.submitting.set(true);
      this.submitError.set(null);
      const occurrence = yield this.occurrenceSvc.create({
        condominioId: tenant.id,
        userId: user.id,
        titulo: this.titulo,
        tipo: this.tipo,
        descricao: this.descricao,
        local: this.local || void 0
      });
      if (!occurrence) {
        this.submitError.set("Erro ao registrar ocorr\xC3\xAAncia. Tente novamente.");
        this.submitting.set(false);
        return;
      }
      const file = this.selectedFile();
      if (file) {
        try {
          const compressed = yield this.uploadSvc.compress(file);
          const path = this.uploadSvc.buildPath(tenant.id, occurrence.id, compressed);
          const url = yield this.uploadSvc.upload("ocorrencias", path, compressed);
          yield this.occurrenceSvc.addImage(occurrence.id, url);
        } catch (e) {
        }
      }
      this.submitting.set(false);
      this.router.navigate(["/ocorrencias", occurrence.id]);
    });
  }
  static {
    this.\u0275fac = function NewOccurrenceComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NewOccurrenceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewOccurrenceComponent, selectors: [["cm-new-occurrence"]], decls: 51, vars: 9, consts: [["fileInput", ""], [1, "page"], [1, "page__header"], [1, "page__back", 3, "click"], [1, "page__title"], [1, "form", 3, "ngSubmit"], [1, "form__field"], [1, "form__label"], ["type", "text", "name", "titulo", "placeholder", "Descreva brevemente o problema", "required", "", "maxlength", "200", 1, "form__input", 3, "ngModelChange", "ngModel"], ["name", "tipo", "required", "", 1, "form__select", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "ruido"], ["value", "vandalismo"], ["value", "acidente"], ["value", "entrada_suspeita"], ["value", "entrada_nao_autorizada"], ["value", "outro"], ["type", "text", "name", "local", "placeholder", "Ex: Garagem, Corredor 3\xC2\xBA andar...", 1, "form__input", 3, "ngModelChange", "ngModel"], ["name", "descricao", "placeholder", "Descreva o ocorrido com detalhes...", "rows", "4", "required", "", 1, "form__textarea", 3, "ngModelChange", "ngModel"], [1, "upload-area", 3, "click"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], [1, "form__error"], [1, "form__actions"], ["type", "submit", 3, "disabled"], [3, "size"], [1, "form__error", "form__error--global"], ["alt", "Preview", 1, "upload-area__preview", 3, "src"], ["type", "button", 1, "upload-area__remove", 3, "click"], [1, "upload-area__icon"], [1, "upload-area__hint"]], template: function NewOccurrenceComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "button", 3);
        \u0275\u0275listener("click", function NewOccurrenceComponent_Template_button_click_2_listener() {
          return ctx.router.navigate(["/ocorrencias"]);
        });
        \u0275\u0275text(3, "\xE2\u2020\x90");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 4);
        \u0275\u0275text(5, "Nova Ocorr\xC3\xAAncia");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "form", 5);
        \u0275\u0275listener("ngSubmit", function NewOccurrenceComponent_Template_form_ngSubmit_6_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(7, "div", 6)(8, "label", 7);
        \u0275\u0275text(9, "T\xC3\xADtulo *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function NewOccurrenceComponent_Template_input_ngModelChange_10_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.titulo, $event) || (ctx.titulo = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 6)(12, "label", 7);
        \u0275\u0275text(13, "Tipo *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "select", 9);
        \u0275\u0275twoWayListener("ngModelChange", function NewOccurrenceComponent_Template_select_ngModelChange_14_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.tipo, $event) || (ctx.tipo = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementStart(15, "option", 10);
        \u0275\u0275text(16, "Selecione...");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "option", 11);
        \u0275\u0275text(18, "Barulho / Ru\xC3\xADdo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "option", 12);
        \u0275\u0275text(20, "Vandalismo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "option", 13);
        \u0275\u0275text(22, "Acidente");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "option", 14);
        \u0275\u0275text(24, "Entrada Suspeita");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "option", 15);
        \u0275\u0275text(26, "Entrada N\xC3\xA3o Autorizada");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "option", 16);
        \u0275\u0275text(28, "Outro");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(29, "div", 6)(30, "label", 7);
        \u0275\u0275text(31, "Local (opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "input", 17);
        \u0275\u0275twoWayListener("ngModelChange", function NewOccurrenceComponent_Template_input_ngModelChange_32_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.local, $event) || (ctx.local = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "div", 6)(34, "label", 7);
        \u0275\u0275text(35, "Descri\xC3\xA7\xC3\xA3o *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "textarea", 18);
        \u0275\u0275twoWayListener("ngModelChange", function NewOccurrenceComponent_Template_textarea_ngModelChange_36_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.descricao, $event) || (ctx.descricao = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 6)(38, "label", 7);
        \u0275\u0275text(39, "Foto (opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div", 19);
        \u0275\u0275listener("click", function NewOccurrenceComponent_Template_div_click_40_listener() {
          \u0275\u0275restoreView(_r1);
          const fileInput_r2 = \u0275\u0275reference(44);
          return \u0275\u0275resetView(fileInput_r2.click());
        });
        \u0275\u0275conditionalCreate(41, NewOccurrenceComponent_Conditional_41_Template, 3, 1)(42, NewOccurrenceComponent_Conditional_42_Template, 4, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "input", 20, 0);
        \u0275\u0275listener("change", function NewOccurrenceComponent_Template_input_change_43_listener($event) {
          return ctx.onFileSelected($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(45, NewOccurrenceComponent_Conditional_45_Template, 2, 1, "p", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "div", 22)(47, "cm-button", 23);
        \u0275\u0275conditionalCreate(48, NewOccurrenceComponent_Conditional_48_Template, 1, 1, "cm-spinner", 24)(49, NewOccurrenceComponent_Conditional_49_Template, 1, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(50, NewOccurrenceComponent_Conditional_50_Template, 2, 1, "p", 25);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275twoWayProperty("ngModel", ctx.titulo);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.tipo);
        \u0275\u0275advance(18);
        \u0275\u0275twoWayProperty("ngModel", ctx.local);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.descricao);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(ctx.previewUrl() ? 41 : 42);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.fileError() ? 45 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.submitting() || !ctx.titulo || !ctx.tipo || !ctx.descricao);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.submitting() ? 48 : 49);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.submitError() ? 50 : -1);
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm, ButtonComponent, SpinnerComponent], styles: ["\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-6) var(--s-5) var(--s-4);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--c-text);\n  font-size: 20px;\n  padding: 0 var(--s-2);\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 400;\n  margin: 0;\n}\n.form[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-5);\n}\n.form__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.form__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-text-muted);\n}\n.form__input[_ngcontent-%COMP%], \n.form__select[_ngcontent-%COMP%], \n.form__textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--s-3) var(--s-4);\n  border: 1.5px solid var(--c-border);\n  border-radius: var(--r-sm);\n  background: var(--c-input, var(--c-card));\n  color: var(--c-text);\n  font-size: 15px;\n  font-family: inherit;\n  transition: border-color var(--t-fast);\n  box-sizing: border-box;\n}\n.form__input[_ngcontent-%COMP%]:focus, \n.form__select[_ngcontent-%COMP%]:focus, \n.form__textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--c-accent);\n}\n.form__textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 100px;\n}\n.form__actions[_ngcontent-%COMP%] {\n  padding-top: var(--s-2);\n}\n.form__error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-danger, #e53e3e);\n  margin: 0;\n}\n.form__error--global[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.upload-area[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 120px;\n  border: 2px dashed var(--c-border);\n  border-radius: var(--r-md);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--s-2);\n  cursor: pointer;\n  overflow: hidden;\n  transition: border-color var(--t-fast);\n}\n.upload-area[_ngcontent-%COMP%]:active {\n  border-color: var(--c-accent);\n}\n.upload-area__preview[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 200px;\n  object-fit: cover;\n}\n.upload-area__remove[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  background: rgba(0, 0, 0, 0.5);\n  color: #fff;\n  border: none;\n  border-radius: 50%;\n  width: 28px;\n  height: 28px;\n  cursor: pointer;\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.upload-area__icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n.upload-area__hint[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n/*# sourceMappingURL=new-occurrence.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NewOccurrenceComponent, [{
    type: Component,
    args: [{ selector: "cm-new-occurrence", standalone: true, imports: [FormsModule, ButtonComponent, SpinnerComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <button class="page__back" (click)="router.navigate(['/ocorrencias'])">\xE2\u2020\x90</button>
        <h1 class="page__title">Nova Ocorr\xC3\xAAncia</h1>
      </div>

      <form class="form" (ngSubmit)="submit()">
        <div class="form__field">
          <label class="form__label">T\xC3\xADtulo *</label>
          <input class="form__input" type="text" [(ngModel)]="titulo" name="titulo"
            placeholder="Descreva brevemente o problema" required maxlength="200">
        </div>

        <div class="form__field">
          <label class="form__label">Tipo *</label>
          <select class="form__select" [(ngModel)]="tipo" name="tipo" required>
            <option value="">Selecione...</option>
            <option value="ruido">Barulho / Ru\xC3\xADdo</option>
            <option value="vandalismo">Vandalismo</option>
            <option value="acidente">Acidente</option>
            <option value="entrada_suspeita">Entrada Suspeita</option>
            <option value="entrada_nao_autorizada">Entrada N\xC3\xA3o Autorizada</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div class="form__field">
          <label class="form__label">Local (opcional)</label>
          <input class="form__input" type="text" [(ngModel)]="local" name="local"
            placeholder="Ex: Garagem, Corredor 3\xC2\xBA andar...">
        </div>

        <div class="form__field">
          <label class="form__label">Descri\xC3\xA7\xC3\xA3o *</label>
          <textarea class="form__textarea" [(ngModel)]="descricao" name="descricao"
            placeholder="Descreva o ocorrido com detalhes..." rows="4" required></textarea>
        </div>

        <div class="form__field">
          <label class="form__label">Foto (opcional)</label>
          <div class="upload-area" (click)="fileInput.click()">
            @if (previewUrl()) {
              <img class="upload-area__preview" [src]="previewUrl()" alt="Preview">
              <button type="button" class="upload-area__remove" (click)="removeImage($event)">\xE2\u0153\u2022</button>
            } @else {
              <span class="upload-area__icon">\xF0\u0178\u201C\xB7</span>
              <span class="upload-area__hint">Toque para adicionar foto</span>
            }
          </div>
          <input #fileInput type="file" accept="image/*" style="display:none"
            (change)="onFileSelected($event)">
          @if (fileError()) {
            <p class="form__error">{{ fileError() }}</p>
          }
        </div>

        <div class="form__actions">
          <cm-button type="submit" [disabled]="submitting() || !titulo || !tipo || !descricao">
            @if (submitting()) { <cm-spinner [size]="16"></cm-spinner> }
            @else { Registrar Ocorr\xC3\xAAncia }
          </cm-button>
        </div>

        @if (submitError()) {
          <p class="form__error form__error--global">{{ submitError() }}</p>
        }
      </form>
    </div>
  `, styles: ["/* apps/morador/src/app/features/occurrences/new-occurrence.component.css */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-6) var(--s-5) var(--s-4);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__back {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--c-text);\n  font-size: 20px;\n  padding: 0 var(--s-2);\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 400;\n  margin: 0;\n}\n.form {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-5);\n}\n.form__field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.form__label {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-text-muted);\n}\n.form__input,\n.form__select,\n.form__textarea {\n  width: 100%;\n  padding: var(--s-3) var(--s-4);\n  border: 1.5px solid var(--c-border);\n  border-radius: var(--r-sm);\n  background: var(--c-input, var(--c-card));\n  color: var(--c-text);\n  font-size: 15px;\n  font-family: inherit;\n  transition: border-color var(--t-fast);\n  box-sizing: border-box;\n}\n.form__input:focus,\n.form__select:focus,\n.form__textarea:focus {\n  outline: none;\n  border-color: var(--c-accent);\n}\n.form__textarea {\n  resize: vertical;\n  min-height: 100px;\n}\n.form__actions {\n  padding-top: var(--s-2);\n}\n.form__error {\n  font-size: 12px;\n  color: var(--c-danger, #e53e3e);\n  margin: 0;\n}\n.form__error--global {\n  text-align: center;\n}\n.upload-area {\n  position: relative;\n  min-height: 120px;\n  border: 2px dashed var(--c-border);\n  border-radius: var(--r-md);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--s-2);\n  cursor: pointer;\n  overflow: hidden;\n  transition: border-color var(--t-fast);\n}\n.upload-area:active {\n  border-color: var(--c-accent);\n}\n.upload-area__preview {\n  width: 100%;\n  max-height: 200px;\n  object-fit: cover;\n}\n.upload-area__remove {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  background: rgba(0, 0, 0, 0.5);\n  color: #fff;\n  border: none;\n  border-radius: 50%;\n  width: 28px;\n  height: 28px;\n  cursor: pointer;\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.upload-area__icon {\n  font-size: 32px;\n}\n.upload-area__hint {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n/*# sourceMappingURL=new-occurrence.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewOccurrenceComponent, { className: "NewOccurrenceComponent", filePath: "apps/morador/src/app/features/occurrences/new-occurrence.component.ts", lineNumber: 85 });
})();
export {
  NewOccurrenceComponent
};
//# sourceMappingURL=chunk-WCXJ4LIR.js.map
