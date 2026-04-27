import {
  BadgeComponent,
  ButtonComponent
} from "./chunk-2E4G4N2I.js";
import {
  AuthState,
  ReservationService
} from "./chunk-IQFUSNZ4.js";
import "./chunk-R6BDYNR2.js";
import {
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
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate3
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/reservations/reservations.component.ts
var _c0 = () => ["/reservas/nova"];
var _c1 = (a0) => ({ equipamento: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function ReservationsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function ReservationsComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8)(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const eq_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(4, _c0))("queryParams", \u0275\u0275pureFunction1(5, _c1, eq_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.emoji(eq_r2.nome));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(eq_r2.nome);
  }
}
function ReservationsComponent_ForEmpty_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "Nenhuma \xC3\xA1rea dispon\xC3\xADvel");
    \u0275\u0275elementEnd();
  }
}
function ReservationsComponent_ForEmpty_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ReservationsComponent_ForEmpty_13_Conditional_0_Template, 2, 0, "p", 14);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.svc.isLoading() ? 0 : -1);
  }
}
function ReservationsComponent_For_18_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function ReservationsComponent_For_18_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const r_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelar(r_r4.id));
    });
    \u0275\u0275text(1, "Cancelar");
    \u0275\u0275elementEnd();
  }
}
function ReservationsComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 16)(4, "p", 17);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 18);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 19)(10, "cm-badge", 20);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, ReservationsComponent_For_18_Conditional_12_Template, 2, 0, "button", 21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.emoji((r_r4.equipamento == null ? null : r_r4.equipamento.nome) ?? ""));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((r_r4.equipamento == null ? null : r_r4.equipamento.nome) ?? "\xC3\x81rea");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind3(8, 8, r_r4.data, "dd/MM/yyyy", "UTC"), " \xC2\xB7 ", r_r4.horaInicio, "\xE2\u20AC\u201C", r_r4.horaFim);
    \u0275\u0275advance(3);
    \u0275\u0275property("variant", r_r4.status === "confirmada" ? "success" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r4.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(r_r4.status === "confirmada" ? 12 : -1);
  }
}
function ReservationsComponent_ForEmpty_19_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "Nenhuma reserva encontrada");
    \u0275\u0275elementEnd();
  }
}
function ReservationsComponent_ForEmpty_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ReservationsComponent_ForEmpty_19_Conditional_0_Template, 2, 0, "p", 14);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.svc.isLoading() ? 0 : -1);
  }
}
var EQUIPAMENTO_EMOJIS = {
  salao: "\xF0\u0178\u017D\u2030",
  piscina: "\xF0\u0178\x8F\u0160",
  churrasqueira: "\xF0\u0178\u201D\xA5",
  quadra: "\xF0\u0178\u017D\xBE",
  academia: "\xF0\u0178\x8F\u2039\xEF\xB8\x8F",
  playground: "\xF0\u0178\u203A\x9D"
};
function emojiForName(nome) {
  const lower = nome.toLowerCase();
  for (const [key, emoji] of Object.entries(EQUIPAMENTO_EMOJIS)) {
    if (lower.includes(key))
      return emoji;
  }
  return "\xF0\u0178\x8F\xA2";
}
var ReservationsComponent = class _ReservationsComponent {
  constructor() {
    this.svc = inject(ReservationService);
    this.state = inject(AuthState);
    this.emoji = emojiForName;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const tenant = this.state.currentTenant();
      const user = this.state.user();
      if (!tenant || !user)
        return;
      yield Promise.all([
        this.svc.loadEquipamentos(tenant.id),
        this.svc.loadMyReservations(tenant.id, user.id)
      ]);
    });
  }
  ngOnDestroy() {
    this.svc.stopRealtime();
  }
  cancelar(id) {
    return __async(this, null, function* () {
      if (!confirm("Cancelar esta reserva?"))
        return;
      yield this.svc.cancel(id);
    });
  }
  static {
    this.\u0275fac = function ReservationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReservationsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReservationsComponent, selectors: [["cm-reservations"]], decls: 20, vars: 3, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], ["variant", "accent", "size", "sm", "routerLink", "/reservas/nova"], [1, "loading"], [1, "spaces"], [1, "spaces__label"], [1, "spaces__grid"], [1, "space-card", 3, "routerLink", "queryParams"], [1, "list"], [1, "list__label"], [1, "res-row"], [1, "space-card__emoji"], [1, "space-card__name"], [1, "empty-hint"], [1, "res-row__icon"], [1, "res-row__body"], [1, "res-row__title"], [1, "res-row__sub"], [1, "res-row__right"], [3, "variant"], [1, "btn-cancel"], [1, "btn-cancel", 3, "click"]], template: function ReservationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Reservas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "cm-button", 3);
        \u0275\u0275text(5, "+ Nova");
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(6, ReservationsComponent_Conditional_6_Template, 2, 0, "div", 4);
        \u0275\u0275elementStart(7, "div", 5)(8, "p", 6);
        \u0275\u0275text(9, "\xC3\x81reas comuns");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 7);
        \u0275\u0275repeaterCreate(11, ReservationsComponent_For_12_Template, 5, 7, "a", 8, _forTrack0, false, ReservationsComponent_ForEmpty_13_Template, 1, 1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 9)(15, "p", 10);
        \u0275\u0275text(16, "Minhas reservas");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(17, ReservationsComponent_For_18_Template, 13, 12, "div", 11, _forTrack0, false, ReservationsComponent_ForEmpty_19_Template, 1, 1);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.svc.isLoading() ? 6 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.svc.equipamentos());
        \u0275\u0275advance(6);
        \u0275\u0275repeater(ctx.svc.reservations());
      }
    }, dependencies: [RouterLink, BadgeComponent, ButtonComponent, DatePipe], styles: ["\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--s-6) var(--s-5) var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.spaces[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n}\n.spaces__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.spaces__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--s-3);\n}\n.space-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-2);\n  padding: var(--s-4) var(--s-2);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  text-decoration: none;\n  color: var(--c-text);\n  transition: transform var(--t-fast);\n}\n.space-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.96);\n}\n.space-card__emoji[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.space-card__name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n}\n.list[_ngcontent-%COMP%] {\n  padding: 0 var(--s-5);\n}\n.list__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.res-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  margin-bottom: var(--s-3);\n}\n.res-row__icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.res-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.res-row__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.res-row__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=reservations.component.css.map */"], changeDetection: 0 });
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

      @if (svc.isLoading()) {
        <div class="loading">Carregando...</div>
      }

      <div class="spaces">
        <p class="spaces__label">\xC3\x81reas comuns</p>
        <div class="spaces__grid">
          @for (eq of svc.equipamentos(); track eq.id) {
            <a class="space-card" [routerLink]="['/reservas/nova']" [queryParams]="{ equipamento: eq.id }">
              <span class="space-card__emoji">{{ emoji(eq.nome) }}</span>
              <span class="space-card__name">{{ eq.nome }}</span>
            </a>
          } @empty {
            @if (!svc.isLoading()) {
              <p class="empty-hint">Nenhuma \xC3\xA1rea dispon\xC3\xADvel</p>
            }
          }
        </div>
      </div>

      <div class="list">
        <p class="list__label">Minhas reservas</p>
        @for (r of svc.reservations(); track r.id) {
          <div class="res-row">
            <div class="res-row__icon">{{ emoji(r.equipamento?.nome ?? '') }}</div>
            <div class="res-row__body">
              <p class="res-row__title">{{ r.equipamento?.nome ?? '\xC3\x81rea' }}</p>
              <p class="res-row__sub">{{ r.data | date:'dd/MM/yyyy':'UTC' }} \xC2\xB7 {{ r.horaInicio }}\xE2\u20AC\u201C{{ r.horaFim }}</p>
            </div>
            <div class="res-row__right">
              <cm-badge [variant]="r.status === 'confirmada' ? 'success' : 'warn'">{{ r.status }}</cm-badge>
              @if (r.status === 'confirmada') {
                <button class="btn-cancel" (click)="cancelar(r.id)">Cancelar</button>
              }
            </div>
          </div>
        } @empty {
          @if (!svc.isLoading()) {
            <p class="empty-hint">Nenhuma reserva encontrada</p>
          }
        }
      </div>
    </div>
  `, styles: ["/* apps/morador/src/app/features/reservations/reservations.component.css */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--s-6) var(--s-5) var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.spaces {\n  padding: var(--s-5);\n}\n.spaces__label {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.spaces__grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--s-3);\n}\n.space-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-2);\n  padding: var(--s-4) var(--s-2);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  text-decoration: none;\n  color: var(--c-text);\n  transition: transform var(--t-fast);\n}\n.space-card:active {\n  transform: scale(0.96);\n}\n.space-card__emoji {\n  font-size: 28px;\n}\n.space-card__name {\n  font-size: 12px;\n  font-weight: 500;\n}\n.list {\n  padding: 0 var(--s-5);\n}\n.list__label {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-3);\n}\n.res-row {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  box-shadow: var(--sh-sm);\n  margin-bottom: var(--s-3);\n}\n.res-row__icon {\n  font-size: 24px;\n}\n.res-row__body {\n  flex: 1;\n}\n.res-row__title {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.res-row__sub {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n/*# sourceMappingURL=reservations.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReservationsComponent, { className: "ReservationsComponent", filePath: "apps/morador/src/app/features/reservations/reservations.component.ts", lineNumber: 82 });
})();
export {
  ReservationsComponent
};
//# sourceMappingURL=chunk-C27AKBQO.js.map
