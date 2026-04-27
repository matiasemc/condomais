import {
  BadgeComponent,
  EmptyStateComponent
} from "./chunk-2E4G4N2I.js";
import {
  OccurrenceService
} from "./chunk-IQFUSNZ4.js";
import "./chunk-R6BDYNR2.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-KU6U7BFN.js";
import {
  DatePipe
} from "./chunk-UEEOQNAF.js";
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/occurrences/occurrence-detail.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function OccurrenceDetailComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 4);
  }
}
function OccurrenceDetailComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-empty-state", 5);
  }
}
function OccurrenceDetailComponent_Conditional_8_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xF0\u0178\u201C\x8D ", ctx_r0.occurrence().local);
  }
}
function OccurrenceDetailComponent_Conditional_8_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 16);
  }
  if (rf & 2) {
    const img_r2 = ctx.$implicit;
    \u0275\u0275property("src", img_r2.imageUrl, \u0275\u0275sanitizeUrl)("alt", "Foto " + img_r2.ordem);
  }
}
function OccurrenceDetailComponent_Conditional_8_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, OccurrenceDetailComponent_Conditional_8_Conditional_15_For_2_Template, 1, 2, "img", 16, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.images());
  }
}
function OccurrenceDetailComponent_Conditional_8_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "p", 17);
    \u0275\u0275text(2, "Resposta do condom\xC3\xADnio:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.occurrence().resolucao);
  }
}
function OccurrenceDetailComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "cm-badge", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 9);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h2", 10);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 11)(10, "span", 12);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, OccurrenceDetailComponent_Conditional_8_Conditional_12_Template, 2, 1, "span", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 13);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, OccurrenceDetailComponent_Conditional_8_Conditional_15_Template, 3, 0, "div", 14);
    \u0275\u0275conditionalCreate(16, OccurrenceDetailComponent_Conditional_8_Conditional_16_Template, 5, 1, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", ctx_r0.statusVariant(ctx_r0.occurrence().status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.statusLabel(ctx_r0.occurrence().status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 9, ctx_r0.occurrence().createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.occurrence().titulo ?? ctx_r0.occurrence().tipo);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.tipoLabel(ctx_r0.occurrence().tipo));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.occurrence().local ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.occurrence().descricao);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.images().length > 0 ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.occurrence().resolucao ? 16 : -1);
  }
}
var OccurrenceDetailComponent = class _OccurrenceDetailComponent {
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
      this.loading.set(false);
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
      return "warn";
    return "success";
  }
  tipoLabel(tipo) {
    const map = {
      ruido: "\xF0\u0178\u201D\u0160 Ru\xC3\xADdo",
      vandalismo: "\xF0\u0178\u201D\xA8 Vandalismo",
      acidente: "\xE2\u0161\xA0\xEF\xB8\x8F Acidente",
      entrada_suspeita: "\xF0\u0178\u2018\u20AC Entrada Suspeita",
      entrada_nao_autorizada: "\xF0\u0178\u0161\xAB Entrada N\xC3\xA3o Autorizada",
      outro: "\xF0\u0178\u201C\u2039 Outro"
    };
    return map[tipo] ?? tipo;
  }
  static {
    this.\u0275fac = function OccurrenceDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OccurrenceDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OccurrenceDetailComponent, selectors: [["cm-occurrence-detail"]], decls: 9, vars: 1, consts: [[1, "page"], [1, "page__header"], ["routerLink", "/ocorrencias", 1, "page__back"], [1, "page__title"], ["icon", "\xE2\x8F\xB3", "title", "Carregando\xE2\u20AC\xA6", "subtitle", ""], ["icon", "\xF0\u0178\u02DC\u2022", "title", "N\xC3\xA3o encontrada", "subtitle", "Esta ocorr\xC3\xAAncia n\xC3\xA3o existe ou voc\xC3\xAA n\xC3\xA3o tem acesso."], [1, "detail"], [1, "detail__status-bar"], [3, "variant"], [1, "detail__date"], [1, "detail__titulo"], [1, "detail__meta"], [1, "detail__chip"], [1, "detail__descricao"], [1, "detail__images"], [1, "detail__resolution"], [1, "detail__image", 3, "src", "alt"], [1, "detail__resolution-label"], [1, "detail__resolution-text"]], template: function OccurrenceDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
        \u0275\u0275text(3, "\xE2\u2020\x90");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "Ocorr\xC3\xAAncia");
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(6, OccurrenceDetailComponent_Conditional_6_Template, 1, 0, "cm-empty-state", 4)(7, OccurrenceDetailComponent_Conditional_7_Template, 1, 0, "cm-empty-state", 5)(8, OccurrenceDetailComponent_Conditional_8_Template, 17, 12, "div", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.loading() ? 6 : !ctx.occurrence() ? 7 : 8);
      }
    }, dependencies: [RouterLink, BadgeComponent, EmptyStateComponent, DatePipe], styles: ["\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-6) var(--s-5) var(--s-4);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__back[_ngcontent-%COMP%] {\n  color: var(--c-text);\n  text-decoration: none;\n  font-size: 20px;\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 400;\n  margin: 0;\n}\n.detail[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.detail__status-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.detail__date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n}\n.detail__titulo[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n}\n.detail__meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--s-2);\n}\n.detail__chip[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  background: var(--c-bg-muted, var(--c-card));\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-pill, 999px);\n  padding: 2px var(--s-3);\n}\n.detail__descricao[_ngcontent-%COMP%] {\n  font-size: 15px;\n  line-height: 1.6;\n  color: var(--c-text);\n  margin: 0;\n}\n.detail__images[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.detail__image[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: var(--r-md);\n  object-fit: cover;\n  max-height: 280px;\n}\n.detail__resolution[_ngcontent-%COMP%] {\n  padding: var(--s-4);\n  background: var(--c-success-soft, #f0fff4);\n  border-left: 3px solid var(--c-success, #38a169);\n  border-radius: var(--r-sm);\n}\n.detail__resolution-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--c-success, #38a169);\n  margin: 0 0 var(--s-2);\n}\n.detail__resolution-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n  color: var(--c-text);\n}\n/*# sourceMappingURL=occurrence-detail.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OccurrenceDetailComponent, [{
    type: Component,
    args: [{ selector: "cm-occurrence-detail", standalone: true, imports: [RouterLink, DatePipe, BadgeComponent, EmptyStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <a class="page__back" routerLink="/ocorrencias">\xE2\u2020\x90</a>
        <h1 class="page__title">Ocorr\xC3\xAAncia</h1>
      </div>

      @if (loading()) {
        <cm-empty-state icon="\xE2\x8F\xB3" title="Carregando\xE2\u20AC\xA6" subtitle=""></cm-empty-state>
      } @else if (!occurrence()) {
        <cm-empty-state icon="\xF0\u0178\u02DC\u2022" title="N\xC3\xA3o encontrada"
          subtitle="Esta ocorr\xC3\xAAncia n\xC3\xA3o existe ou voc\xC3\xAA n\xC3\xA3o tem acesso."></cm-empty-state>
      } @else {
        <div class="detail">
          <div class="detail__status-bar">
            <cm-badge [variant]="statusVariant(occurrence()!.status)">{{ statusLabel(occurrence()!.status) }}</cm-badge>
            <span class="detail__date">{{ occurrence()!.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>

          <h2 class="detail__titulo">{{ occurrence()!.titulo ?? occurrence()!.tipo }}</h2>

          <div class="detail__meta">
            <span class="detail__chip">{{ tipoLabel(occurrence()!.tipo) }}</span>
            @if (occurrence()!.local) {
              <span class="detail__chip">\xF0\u0178\u201C\x8D {{ occurrence()!.local }}</span>
            }
          </div>

          <p class="detail__descricao">{{ occurrence()!.descricao }}</p>

          @if (images().length > 0) {
            <div class="detail__images">
              @for (img of images(); track img.id) {
                <img class="detail__image" [src]="img.imageUrl" [alt]="'Foto ' + img.ordem">
              }
            </div>
          }

          @if (occurrence()!.resolucao) {
            <div class="detail__resolution">
              <p class="detail__resolution-label">Resposta do condom\xC3\xADnio:</p>
              <p class="detail__resolution-text">{{ occurrence()!.resolucao }}</p>
            </div>
          }
        </div>
      }
    </div>
  `, styles: ["/* apps/morador/src/app/features/occurrences/occurrence-detail.component.css */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-6) var(--s-5) var(--s-4);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__back {\n  color: var(--c-text);\n  text-decoration: none;\n  font-size: 20px;\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 400;\n  margin: 0;\n}\n.detail {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.detail__status-bar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.detail__date {\n  font-size: 12px;\n  color: var(--c-text-muted);\n}\n.detail__titulo {\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n}\n.detail__meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--s-2);\n}\n.detail__chip {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  background: var(--c-bg-muted, var(--c-card));\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-pill, 999px);\n  padding: 2px var(--s-3);\n}\n.detail__descricao {\n  font-size: 15px;\n  line-height: 1.6;\n  color: var(--c-text);\n  margin: 0;\n}\n.detail__images {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.detail__image {\n  width: 100%;\n  border-radius: var(--r-md);\n  object-fit: cover;\n  max-height: 280px;\n}\n.detail__resolution {\n  padding: var(--s-4);\n  background: var(--c-success-soft, #f0fff4);\n  border-left: 3px solid var(--c-success, #38a169);\n  border-radius: var(--r-sm);\n}\n.detail__resolution-label {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--c-success, #38a169);\n  margin: 0 0 var(--s-2);\n}\n.detail__resolution-text {\n  font-size: 14px;\n  margin: 0;\n  color: var(--c-text);\n}\n/*# sourceMappingURL=occurrence-detail.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OccurrenceDetailComponent, { className: "OccurrenceDetailComponent", filePath: "apps/morador/src/app/features/occurrences/occurrence-detail.component.ts", lineNumber: 63 });
})();
export {
  OccurrenceDetailComponent
};
//# sourceMappingURL=chunk-XSSFYRRZ.js.map
