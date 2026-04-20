import {
  RouterLink
} from "./chunk-N6N7VLCZ.js";
import {
  BadgeComponent
} from "./chunk-3MTEG4YI.js";
import {
  ChangeDetectionStrategy,
  Component,
  DatePipe,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-KKC7QRLW.js";

// apps/morador/src/app/features/announcements/announcements.component.ts
var _c0 = (a0) => ["/avisos", a0];
var _forTrack0 = ($index, $item) => $item.id;
function AnnouncementsComponent_For_6_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "cm-badge", 9);
    \u0275\u0275text(1, "Fixado");
    \u0275\u0275elementEnd();
  }
}
function AnnouncementsComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 4);
    \u0275\u0275element(1, "div", 5);
    \u0275\u0275elementStart(2, "div", 6)(3, "div", 7)(4, "span", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, AnnouncementsComponent_For_6_Conditional_6_Template, 2, 0, "cm-badge", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 10);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 11);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(10, _c0, a_r1.id));
    \u0275\u0275advance();
    \u0275\u0275classMap("announce-row__bar--" + a_r1.prioridade);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(a_r1.titulo);
    \u0275\u0275advance();
    \u0275\u0275conditional(a_r1.fixado ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r1.mensagem);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 7, a_r1.publicadoEm, "dd/MM/yyyy"));
  }
}
var AnnouncementsComponent = class _AnnouncementsComponent {
  constructor() {
    this.avisos = signal([
      { id: "1", titulo: "Manuten\xE7\xE3o da piscina", mensagem: "A piscina estar\xE1 fechada de 22 a 25 de abril.", prioridade: "alta", publicadoEm: /* @__PURE__ */ new Date(), fixado: true },
      { id: "2", titulo: "Reuni\xE3o de cond\xF4minos", mensagem: "Reuni\xE3o ordin\xE1ria no sal\xE3o principal no dia 30 \xE0s 19h.", prioridade: "media", publicadoEm: new Date(Date.now() - 864e5), fixado: false },
      { id: "3", titulo: "Limpeza das cal\xE7adas", mensagem: "Cal\xE7adas ser\xE3o lavadas na quinta-feira.", prioridade: "baixa", publicadoEm: new Date(Date.now() - 2 * 864e5), fixado: false }
    ]);
  }
  static {
    this.\u0275fac = function AnnouncementsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AnnouncementsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnnouncementsComponent, selectors: [["cm-announcements"]], decls: 7, vars: 0, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "list"], [1, "announce-row", 3, "routerLink"], [1, "announce-row__bar"], [1, "announce-row__body"], [1, "announce-row__top"], [1, "announce-row__title"], ["variant", "accent"], [1, "announce-row__msg"], [1, "announce-row__date"]], template: function AnnouncementsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Avisos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 3);
        \u0275\u0275repeaterCreate(5, AnnouncementsComponent_For_6_Template, 12, 12, "a", 4, _forTrack0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.avisos());
      }
    }, dependencies: [DatePipe, RouterLink, BadgeComponent], styles: ["\n\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  padding: var(--s-6) var(--s-5) var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.announce-row[_ngcontent-%COMP%] {\n  display: flex;\n  text-decoration: none;\n  color: var(--c-text);\n  background: var(--c-card);\n  border-bottom: 1px solid var(--c-border);\n  transition: background var(--t-fast);\n}\n.announce-row[_ngcontent-%COMP%]:first-child {\n  border-top: 1px solid var(--c-border);\n}\n.announce-row[_ngcontent-%COMP%]:active {\n  background: var(--c-card-muted);\n}\n.announce-row__bar[_ngcontent-%COMP%] {\n  width: 3px;\n  flex-shrink: 0;\n}\n.announce-row__bar--alta[_ngcontent-%COMP%] {\n  background: var(--c-warn);\n}\n.announce-row__bar--media[_ngcontent-%COMP%] {\n  background: var(--c-accent);\n}\n.announce-row__bar--baixa[_ngcontent-%COMP%] {\n  background: var(--c-border-strong);\n}\n.announce-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--s-4) var(--s-5);\n}\n.announce-row__top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: var(--s-2);\n}\n.announce-row__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  flex: 1;\n  margin-right: var(--s-3);\n}\n.announce-row__msg[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-2);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.announce-row__date[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--c-text-faint);\n}\n/*# sourceMappingURL=announcements.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnnouncementsComponent, [{
    type: Component,
    args: [{ selector: "cm-announcements", standalone: true, imports: [DatePipe, RouterLink, BadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Avisos</h1>
      </div>
      <div class="list">
        @for (a of avisos(); track a.id) {
          <a class="announce-row" [routerLink]="['/avisos', a.id]">
            <div class="announce-row__bar" [class]="'announce-row__bar--' + a.prioridade"></div>
            <div class="announce-row__body">
              <div class="announce-row__top">
                <span class="announce-row__title">{{ a.titulo }}</span>
                @if (a.fixado) { <cm-badge variant="accent">Fixado</cm-badge> }
              </div>
              <p class="announce-row__msg">{{ a.mensagem }}</p>
              <span class="announce-row__date">{{ a.publicadoEm | date:'dd/MM/yyyy' }}</span>
            </div>
          </a>
        }
      </div>
    </div>
  `, styles: ["/* apps/morador/src/app/features/announcements/announcements.component.scss */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  padding: var(--s-6) var(--s-5) var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.list {\n  display: flex;\n  flex-direction: column;\n}\n.announce-row {\n  display: flex;\n  text-decoration: none;\n  color: var(--c-text);\n  background: var(--c-card);\n  border-bottom: 1px solid var(--c-border);\n  transition: background var(--t-fast);\n}\n.announce-row:first-child {\n  border-top: 1px solid var(--c-border);\n}\n.announce-row:active {\n  background: var(--c-card-muted);\n}\n.announce-row__bar {\n  width: 3px;\n  flex-shrink: 0;\n}\n.announce-row__bar--alta {\n  background: var(--c-warn);\n}\n.announce-row__bar--media {\n  background: var(--c-accent);\n}\n.announce-row__bar--baixa {\n  background: var(--c-border-strong);\n}\n.announce-row__body {\n  flex: 1;\n  padding: var(--s-4) var(--s-5);\n}\n.announce-row__top {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: var(--s-2);\n}\n.announce-row__title {\n  font-size: 14px;\n  font-weight: 600;\n  flex: 1;\n  margin-right: var(--s-3);\n}\n.announce-row__msg {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-2);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.announce-row__date {\n  font-size: 11px;\n  color: var(--c-text-faint);\n}\n/*# sourceMappingURL=announcements.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnnouncementsComponent, { className: "AnnouncementsComponent", filePath: "apps/morador/src/app/features/announcements/announcements.component.ts", lineNumber: 36 });
})();
export {
  AnnouncementsComponent
};
//# sourceMappingURL=chunk-ZL6JT2UG.js.map
