import {
  BadgeComponent,
  ButtonComponent,
  EmptyStateComponent
} from "./chunk-OBMUP4XE.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  OccurrenceService,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-OKLNA4DD.js";
import {
  ActivatedRoute,
  DatePipe,
  RouterLink
} from "./chunk-YX7IELSF.js";
import {
  ChangeDetectionStrategy,
  Component,
  __async,
  __spreadProps,
  __spreadValues,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UHB6DSJH.js";

// apps/admin/src/app/features/occurrences/occurrence-detail.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminOccurrenceDetailComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 4);
  }
}
function AdminOccurrenceDetailComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 5);
  }
}
function AdminOccurrenceDetailComponent_Conditional_8_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xF0\u0178\u201C\x8D ", ctx_r1.occurrence().local);
  }
}
function AdminOccurrenceDetailComponent_Conditional_8_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 27);
    \u0275\u0275element(1, "img", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const img_r3 = ctx.$implicit;
    \u0275\u0275property("href", img_r3.imageUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("src", img_r3.imageUrl, \u0275\u0275sanitizeUrl);
  }
}
function AdminOccurrenceDetailComponent_Conditional_8_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, AdminOccurrenceDetailComponent_Conditional_8_Conditional_15_For_2_Template, 2, 2, "a", 27, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.images());
  }
}
function AdminOccurrenceDetailComponent_Conditional_8_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Salvando\xE2\u20AC\xA6 ");
  }
}
function AdminOccurrenceDetailComponent_Conditional_8_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Salvar Altera\xC3\xA7\xC3\xB5es ");
  }
}
function AdminOccurrenceDetailComponent_Conditional_8_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "\xE2\u0153\u201C Status atualizado com sucesso.");
    \u0275\u0275elementEnd();
  }
}
function AdminOccurrenceDetailComponent_Conditional_8_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saveError());
  }
}
function AdminOccurrenceDetailComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "cm-badge", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 9);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h3", 10);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 11)(10, "span", 12);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, AdminOccurrenceDetailComponent_Conditional_8_Conditional_12_Template, 2, 1, "span", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 13);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, AdminOccurrenceDetailComponent_Conditional_8_Conditional_15_Template, 3, 0, "div", 14);
    \u0275\u0275elementStart(16, "div", 15)(17, "h4", 16);
    \u0275\u0275text(18, "Atualizar Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 17)(20, "label", 18);
    \u0275\u0275text(21, "Novo status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AdminOccurrenceDetailComponent_Conditional_8_Template_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newStatus, $event) || (ctx_r1.newStatus = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(23, "option", 20);
    \u0275\u0275text(24, "Aberta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option", 21);
    \u0275\u0275text(26, "Em an\xC3\xA1lise");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option", 22);
    \u0275\u0275text(28, "Resolvida");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 17)(30, "label", 18);
    \u0275\u0275text(31, "Resposta / Resolu\xC3\xA7\xC3\xA3o (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "textarea", 23);
    \u0275\u0275twoWayListener("ngModelChange", function AdminOccurrenceDetailComponent_Conditional_8_Template_textarea_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.resolucao, $event) || (ctx_r1.resolucao = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "cm-button", 24);
    \u0275\u0275listener("click", function AdminOccurrenceDetailComponent_Conditional_8_Template_cm_button_click_33_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveStatus());
    });
    \u0275\u0275conditionalCreate(34, AdminOccurrenceDetailComponent_Conditional_8_Conditional_34_Template, 1, 0)(35, AdminOccurrenceDetailComponent_Conditional_8_Conditional_35_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(36, AdminOccurrenceDetailComponent_Conditional_8_Conditional_36_Template, 2, 0, "p", 25);
    \u0275\u0275conditionalCreate(37, AdminOccurrenceDetailComponent_Conditional_8_Conditional_37_Template, 2, 1, "p", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", ctx_r1.statusVariant(ctx_r1.occurrence().status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabel(ctx_r1.occurrence().status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 14, ctx_r1.occurrence().createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.occurrence().titulo ?? ctx_r1.occurrence().tipo);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.occurrence().tipo);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.occurrence().local ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.occurrence().descricao);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.images().length > 0 ? 15 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newStatus);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.resolucao);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving() ? 34 : 35);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.saveSuccess() ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saveError() ? 37 : -1);
  }
}
var AdminOccurrenceDetailComponent = class _AdminOccurrenceDetailComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.occurrenceSvc = inject(OccurrenceService);
    this.occurrence = signal(null, ...ngDevMode ? [{ debugName: "occurrence" }] : (
      /* istanbul ignore next */
      []
    ));
    this.images = signal([], ...ngDevMode ? [{ debugName: "images" }] : (
      /* istanbul ignore next */
      []
    ));
    this.loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saveSuccess = signal(false, ...ngDevMode ? [{ debugName: "saveSuccess" }] : (
      /* istanbul ignore next */
      []
    ));
    this.saveError = signal(null, ...ngDevMode ? [{ debugName: "saveError" }] : (
      /* istanbul ignore next */
      []
    ));
    this.newStatus = "aberta";
    this.resolucao = "";
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const id = this.route.snapshot.paramMap.get("id");
      const [occ, imgs] = yield Promise.all([
        this.occurrenceSvc.loadById(id),
        this.occurrenceSvc.loadImages(id)
      ]);
      this.occurrence.set(occ);
      this.images.set(imgs);
      this.newStatus = occ?.status ?? "aberta";
      this.resolucao = occ?.resolucao ?? "";
      this.loading.set(false);
    });
  }
  saveStatus() {
    return __async(this, null, function* () {
      const occ = this.occurrence();
      if (!occ)
        return;
      this.saving.set(true);
      this.saveSuccess.set(false);
      this.saveError.set(null);
      const ok = yield this.occurrenceSvc.updateStatus(occ.id, this.newStatus, this.resolucao || void 0);
      this.saving.set(false);
      if (ok) {
        this.saveSuccess.set(true);
        this.occurrence.update((o) => o ? __spreadProps(__spreadValues({}, o), { status: this.newStatus, resolucao: this.resolucao || o.resolucao }) : o);
        setTimeout(() => this.saveSuccess.set(false), 3e3);
      } else {
        this.saveError.set("Erro ao atualizar. Tente novamente.");
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
    this.\u0275fac = function AdminOccurrenceDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminOccurrenceDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminOccurrenceDetailComponent, selectors: [["cm-admin-occurrence-detail"]], decls: 9, vars: 1, consts: [[1, "detail-page"], [1, "detail-page__header"], ["routerLink", "/ocorrencias", 1, "detail-page__back"], [1, "detail-page__title"], ["icon", "\xE2\x8F\xB3", "title", "Carregando\xE2\u20AC\xA6", "subtitle", ""], ["icon", "\xF0\u0178\u02DC\u2022", "title", "N\xC3\xA3o encontrada", "subtitle", "Esta ocorr\xC3\xAAncia n\xC3\xA3o existe."], [1, "detail"], [1, "detail__row"], [3, "variant"], [1, "detail__date"], [1, "detail__titulo"], [1, "detail__chips"], [1, "detail__chip"], [1, "detail__descricao"], [1, "detail__images"], [1, "detail__actions"], [1, "detail__actions-title"], [1, "detail__field"], [1, "detail__label"], [1, "detail__select", 3, "ngModelChange", "ngModel"], ["value", "aberta"], ["value", "em_analise"], ["value", "resolvida"], ["placeholder", "Descreva as a\xC3\xA7\xC3\xB5es tomadas...", "rows", "3", 1, "detail__textarea", 3, "ngModelChange", "ngModel"], [3, "click", "disabled"], [1, "detail__success"], [1, "detail__error"], ["target", "_blank", 3, "href"], ["alt", "Foto da ocorr\xC3\xAAncia", 1, "detail__image", 3, "src"]], template: function AdminOccurrenceDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
        \u0275\u0275text(3, "\xE2\u2020\x90 Voltar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h2", 3);
        \u0275\u0275text(5, "Ocorr\xC3\xAAncia");
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(6, AdminOccurrenceDetailComponent_Conditional_6_Template, 1, 0, "cm-empty-state", 4)(7, AdminOccurrenceDetailComponent_Conditional_7_Template, 1, 0, "cm-empty-state", 5)(8, AdminOccurrenceDetailComponent_Conditional_8_Template, 38, 17, "div", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.loading() ? 6 : !ctx.occurrence() ? 7 : 8);
      }
    }, dependencies: [RouterLink, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, BadgeComponent, ButtonComponent, EmptyStateComponent, DatePipe], styles: ["\n.detail-page[_ngcontent-%COMP%] {\n  max-width: 720px;\n}\n.detail-page__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.detail-page__back[_ngcontent-%COMP%] {\n  color: #2d6a4f;\n  text-decoration: none;\n  font-size: 14px;\n}\n.detail-page__title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 600;\n  margin: 0;\n}\n.detail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  padding: 24px;\n}\n.detail__row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.detail__date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #718096;\n}\n.detail__titulo[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n}\n.detail__chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.detail__chip[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #718096;\n  background: #f7fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 999px;\n  padding: 2px 10px;\n}\n.detail__descricao[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.65;\n  color: #2d3748;\n  margin: 0;\n}\n.detail__images[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.detail__image[_ngcontent-%COMP%] {\n  width: 180px;\n  height: 130px;\n  object-fit: cover;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n}\n.detail__actions[_ngcontent-%COMP%] {\n  border-top: 1px solid #e2e8f0;\n  padding-top: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.detail__actions-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0;\n}\n.detail__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.detail__label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #718096;\n}\n.detail__select[_ngcontent-%COMP%], \n.detail__textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  color: #2d3748;\n  box-sizing: border-box;\n}\n.detail__select[_ngcontent-%COMP%]:focus, \n.detail__textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2d6a4f;\n}\n.detail__textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.detail__success[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #38a169;\n  margin: 0;\n}\n.detail__error[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #e53e3e;\n  margin: 0;\n}\n/*# sourceMappingURL=occurrence-detail.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminOccurrenceDetailComponent, [{
    type: Component,
    args: [{ selector: "cm-admin-occurrence-detail", standalone: true, imports: [RouterLink, FormsModule, DatePipe, BadgeComponent, ButtonComponent, EmptyStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="detail-page">
      <div class="detail-page__header">
        <a class="detail-page__back" routerLink="/ocorrencias">\xE2\u2020\x90 Voltar</a>
        <h2 class="detail-page__title">Ocorr\xC3\xAAncia</h2>
      </div>

      @if (loading()) {
        <cm-empty-state icon="\xE2\x8F\xB3" title="Carregando\xE2\u20AC\xA6" subtitle=""></cm-empty-state>
      } @else if (!occurrence()) {
        <cm-empty-state icon="\xF0\u0178\u02DC\u2022" title="N\xC3\xA3o encontrada" subtitle="Esta ocorr\xC3\xAAncia n\xC3\xA3o existe."></cm-empty-state>
      } @else {
        <div class="detail">
          <div class="detail__row">
            <cm-badge [variant]="statusVariant(occurrence()!.status)">{{ statusLabel(occurrence()!.status) }}</cm-badge>
            <span class="detail__date">{{ occurrence()!.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>

          <h3 class="detail__titulo">{{ occurrence()!.titulo ?? occurrence()!.tipo }}</h3>

          <div class="detail__chips">
            <span class="detail__chip">{{ occurrence()!.tipo }}</span>
            @if (occurrence()!.local) {
              <span class="detail__chip">\xF0\u0178\u201C\x8D {{ occurrence()!.local }}</span>
            }
          </div>

          <p class="detail__descricao">{{ occurrence()!.descricao }}</p>

          @if (images().length > 0) {
            <div class="detail__images">
              @for (img of images(); track img.id) {
                <a [href]="img.imageUrl" target="_blank">
                  <img class="detail__image" [src]="img.imageUrl" alt="Foto da ocorr\xC3\xAAncia">
                </a>
              }
            </div>
          }

          <div class="detail__actions">
            <h4 class="detail__actions-title">Atualizar Status</h4>

            <div class="detail__field">
              <label class="detail__label">Novo status</label>
              <select class="detail__select" [(ngModel)]="newStatus">
                <option value="aberta">Aberta</option>
                <option value="em_analise">Em an\xC3\xA1lise</option>
                <option value="resolvida">Resolvida</option>
              </select>
            </div>

            <div class="detail__field">
              <label class="detail__label">Resposta / Resolu\xC3\xA7\xC3\xA3o (opcional)</label>
              <textarea class="detail__textarea" [(ngModel)]="resolucao"
                placeholder="Descreva as a\xC3\xA7\xC3\xB5es tomadas..." rows="3"></textarea>
            </div>

            <cm-button (click)="saveStatus()" [disabled]="saving()">
              @if (saving()) { Salvando\xE2\u20AC\xA6 }
              @else { Salvar Altera\xC3\xA7\xC3\xB5es }
            </cm-button>

            @if (saveSuccess()) {
              <p class="detail__success">\xE2\u0153\u201C Status atualizado com sucesso.</p>
            }
            @if (saveError()) {
              <p class="detail__error">{{ saveError() }}</p>
            }
          </div>
        </div>
      }
    </div>
  `, styles: ["/* apps/admin/src/app/features/occurrences/occurrence-detail.component.css */\n.detail-page {\n  max-width: 720px;\n}\n.detail-page__header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.detail-page__back {\n  color: #2d6a4f;\n  text-decoration: none;\n  font-size: 14px;\n}\n.detail-page__title {\n  font-size: 22px;\n  font-weight: 600;\n  margin: 0;\n}\n.detail {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  padding: 24px;\n}\n.detail__row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.detail__date {\n  font-size: 12px;\n  color: #718096;\n}\n.detail__titulo {\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n}\n.detail__chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.detail__chip {\n  font-size: 12px;\n  color: #718096;\n  background: #f7fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 999px;\n  padding: 2px 10px;\n}\n.detail__descricao {\n  font-size: 15px;\n  line-height: 1.65;\n  color: #2d3748;\n  margin: 0;\n}\n.detail__images {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.detail__image {\n  width: 180px;\n  height: 130px;\n  object-fit: cover;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n}\n.detail__actions {\n  border-top: 1px solid #e2e8f0;\n  padding-top: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.detail__actions-title {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0;\n}\n.detail__field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.detail__label {\n  font-size: 12px;\n  font-weight: 600;\n  color: #718096;\n}\n.detail__select,\n.detail__textarea {\n  width: 100%;\n  padding: 10px 14px;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  color: #2d3748;\n  box-sizing: border-box;\n}\n.detail__select:focus,\n.detail__textarea:focus {\n  outline: none;\n  border-color: #2d6a4f;\n}\n.detail__textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n.detail__success {\n  font-size: 13px;\n  color: #38a169;\n  margin: 0;\n}\n.detail__error {\n  font-size: 13px;\n  color: #e53e3e;\n  margin: 0;\n}\n/*# sourceMappingURL=occurrence-detail.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminOccurrenceDetailComponent, { className: "AdminOccurrenceDetailComponent", filePath: "apps/admin/src/app/features/occurrences/occurrence-detail.component.ts", lineNumber: 89 });
})();
export {
  AdminOccurrenceDetailComponent
};
//# sourceMappingURL=chunk-UT2UGSNG.js.map
