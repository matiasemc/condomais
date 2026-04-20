import {
  RouterLink
} from "./chunk-N6N7VLCZ.js";
import {
  BadgeComponent,
  ButtonComponent
} from "./chunk-3MTEG4YI.js";
import {
  ChangeDetectionStrategy,
  Component,
  DatePipe,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate3
} from "./chunk-KKC7QRLW.js";

// apps/morador/src/app/features/reservations/reservations.component.ts
var _c0 = () => ["/reservas/nova"];
var _c1 = (a0) => ({ espaco: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function ReservationsComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 7)(1, "span", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(4, _c0))("queryParams", \u0275\u0275pureFunction1(5, _c1, s_r1.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r1.emoji);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r1.nome);
  }
}
function ReservationsComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 14)(4, "p", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 16);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "cm-badge", 17);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.espaco.includes("Sal\xE3o") ? "\u{1F389}" : "\u{1F3CA}");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.espaco);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind2(8, 7, r_r2.data, "dd/MM"), " \xB7 ", r_r2.horaInicio, "\u2013", r_r2.horaFim, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", r_r2.status === "confirmada" ? "success" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r2.status);
  }
}
var ReservationsComponent = class _ReservationsComponent {
  constructor() {
    this.espacos = [
      { id: "salao-a", emoji: "\u{1F389}", nome: "Sal\xE3o A" },
      { id: "salao-b", emoji: "\u{1F942}", nome: "Sal\xE3o B" },
      { id: "piscina", emoji: "\u{1F3CA}", nome: "Piscina" },
      { id: "churras", emoji: "\u{1F525}", nome: "Churrasqueira" },
      { id: "quadra", emoji: "\u{1F3BE}", nome: "Quadra" },
      { id: "gym", emoji: "\u{1F3CB}\uFE0F", nome: "Academia" }
    ];
    this.reservas = signal([
      { id: "1", espaco: "Sal\xE3o de Festas A", data: new Date(Date.now() + 7 * 864e5), horaInicio: "19:00", horaFim: "23:00", status: "confirmada" },
      { id: "2", espaco: "Piscina", data: new Date(Date.now() + 14 * 864e5), horaInicio: "10:00", horaFim: "12:00", status: "pendente" }
    ]);
  }
  static {
    this.\u0275fac = function ReservationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReservationsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReservationsComponent, selectors: [["cm-reservations"]], decls: 17, vars: 0, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], ["variant", "accent", "size", "sm", "routerLink", "/reservas/nova"], [1, "spaces"], [1, "spaces__label"], [1, "spaces__grid"], [1, "space-card", 3, "routerLink", "queryParams"], [1, "list"], [1, "list__label"], [1, "res-row"], [1, "space-card__emoji"], [1, "space-card__name"], [1, "res-row__icon"], [1, "res-row__body"], [1, "res-row__title"], [1, "res-row__sub"], [3, "variant"]], template: function ReservationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Reservas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "cm-button", 3);
        \u0275\u0275text(5, "+ Nova");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4)(7, "p", 5);
        \u0275\u0275text(8, "\xC1reas comuns");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 6);
        \u0275\u0275repeaterCreate(10, ReservationsComponent_For_11_Template, 5, 7, "a", 7, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 8)(13, "p", 9);
        \u0275\u0275text(14, "Minhas reservas");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(15, ReservationsComponent_For_16_Template, 11, 10, "div", 10, _forTrack0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.espacos);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.reservas());
      }
    }, dependencies: [RouterLink, DatePipe, BadgeComponent, ButtonComponent], styles: ["\n\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--s-6) var(--s-5) var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.spaces[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n}\n.spaces__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.spaces__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--s-3);\n}\n.space-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-2);\n  padding: var(--s-4) var(--s-2);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  text-decoration: none;\n  color: var(--c-text);\n  transition: transform var(--t-fast);\n}\n.space-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.96);\n}\n.space-card__emoji[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.space-card__name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n}\n.list[_ngcontent-%COMP%] {\n  padding: 0 var(--s-5);\n}\n.list__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.res-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  margin-bottom: var(--s-3);\n}\n.res-row__icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.res-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.res-row__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.res-row__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=reservations.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReservationsComponent, [{
    type: Component,
    args: [{ selector: "cm-reservations", standalone: true, imports: [RouterLink, DatePipe, BadgeComponent, ButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Reservas</h1>
        <cm-button variant="accent" size="sm" routerLink="/reservas/nova">+ Nova</cm-button>
      </div>

      <div class="spaces">
        <p class="spaces__label">\xC1reas comuns</p>
        <div class="spaces__grid">
          @for (s of espacos; track s.id) {
            <a class="space-card" [routerLink]="['/reservas/nova']" [queryParams]="{ espaco: s.id }">
              <span class="space-card__emoji">{{ s.emoji }}</span>
              <span class="space-card__name">{{ s.nome }}</span>
            </a>
          }
        </div>
      </div>

      <div class="list">
        <p class="list__label">Minhas reservas</p>
        @for (r of reservas(); track r.id) {
          <div class="res-row">
            <div class="res-row__icon">{{ r.espaco.includes('Sal\xE3o') ? '\u{1F389}' : '\u{1F3CA}' }}</div>
            <div class="res-row__body">
              <p class="res-row__title">{{ r.espaco }}</p>
              <p class="res-row__sub">{{ r.data | date:'dd/MM' }} \xB7 {{ r.horaInicio }}\u2013{{ r.horaFim }}</p>
            </div>
            <cm-badge [variant]="r.status === 'confirmada' ? 'success' : 'warn'">{{ r.status }}</cm-badge>
          </div>
        }
      </div>
    </div>
  `, styles: ["/* apps/morador/src/app/features/reservations/reservations.component.scss */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--s-6) var(--s-5) var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.spaces {\n  padding: var(--s-5);\n}\n.spaces__label {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.spaces__grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--s-3);\n}\n.space-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-2);\n  padding: var(--s-4) var(--s-2);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  text-decoration: none;\n  color: var(--c-text);\n  transition: transform var(--t-fast);\n}\n.space-card:active {\n  transform: scale(0.96);\n}\n.space-card__emoji {\n  font-size: 28px;\n}\n.space-card__name {\n  font-size: 12px;\n  font-weight: 500;\n}\n.list {\n  padding: 0 var(--s-5);\n}\n.list__label {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.res-row {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  margin-bottom: var(--s-3);\n}\n.res-row__icon {\n  font-size: 24px;\n}\n.res-row__body {\n  flex: 1;\n}\n.res-row__title {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.res-row__sub {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=reservations.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReservationsComponent, { className: "ReservationsComponent", filePath: "apps/morador/src/app/features/reservations/reservations.component.ts", lineNumber: 49 });
})();
export {
  ReservationsComponent
};
//# sourceMappingURL=chunk-VWTUGR5I.js.map
