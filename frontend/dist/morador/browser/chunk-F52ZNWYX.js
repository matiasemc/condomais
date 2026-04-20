import {
  ChangeDetectionStrategy,
  Component,
  DatePipe,
  Location,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QFVHJJPM.js";

// apps/morador/src/app/features/notifications/notifications.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NotificationsComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275listener("click", function NotificationsComponent_For_9_Template_div_click_0_listener() {
      const n_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.markRead(n_r2.id));
    });
    \u0275\u0275element(1, "div", 9);
    \u0275\u0275elementStart(2, "div", 10);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 11)(5, "p", 12);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 13);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 14);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const n_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("notif-row--unread", !n_r2.lido);
    \u0275\u0275advance();
    \u0275\u0275classProp("notif-row__dot--visible", !n_r2.lido);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.icons[n_r2.tipo]);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(n_r2.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r2.mensagem);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 8, n_r2.criadaEm, "dd/MM HH:mm"));
  }
}
var NotificationsComponent = class _NotificationsComponent {
  constructor() {
    this.location = inject(Location);
    this.icons = { entrega: "\u{1F4E6}", reserva: "\u{1F4C5}", aviso: "\u{1F4E2}", sistema: "\u{1F514}" };
    this.notifs = signal([
      { id: "1", titulo: "Entrega chegou!", mensagem: "Mercado Livre \xB7 Portaria principal", lido: false, criadaEm: /* @__PURE__ */ new Date(), tipo: "entrega" },
      { id: "2", titulo: "Reserva confirmada", mensagem: "Salao A \xB7 27 abr 19:00", lido: false, criadaEm: new Date(Date.now() - 36e5), tipo: "reserva" },
      { id: "3", titulo: "Novo aviso", mensagem: "Manutencao da piscina 22-25 abr", lido: true, criadaEm: new Date(Date.now() - 864e5), tipo: "aviso" }
    ]);
  }
  markRead(id) {
    this.notifs.update((ns) => ns.map((n) => n.id === id ? __spreadProps(__spreadValues({}, n), { lido: true }) : n));
  }
  static {
    this.\u0275fac = function NotificationsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NotificationsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationsComponent, selectors: [["cm-notifications"]], decls: 10, vars: 0, consts: [[1, "page"], [1, "page__header"], [1, "back-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M19 12H5m0 0l7 7m-7-7l7-7"], [1, "page__title"], [1, "list"], [1, "notif-row", 3, "notif-row--unread"], [1, "notif-row", 3, "click"], [1, "notif-row__dot"], [1, "notif-row__icon"], [1, "notif-row__body"], [1, "notif-row__title"], [1, "notif-row__msg"], [1, "notif-row__time"]], template: function NotificationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
        \u0275\u0275listener("click", function NotificationsComponent_Template_button_click_2_listener() {
          return ctx.location.back();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "path", 4);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(5, "h1", 5);
        \u0275\u0275text(6, "Notificacoes");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 6);
        \u0275\u0275repeaterCreate(8, NotificationsComponent_For_9_Template, 12, 11, "div", 7, _forTrack0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275repeater(ctx.notifs());
      }
    }, dependencies: [DatePipe], styles: ["\n\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-4);\n  padding: var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 400;\n  margin: 0;\n}\n.back-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--r-sm);\n  border: 1px solid var(--c-border);\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--c-text);\n  flex-shrink: 0;\n}\n.notif-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--s-3);\n  padding: var(--s-4) var(--s-5);\n  border-bottom: 1px solid var(--c-border);\n  cursor: pointer;\n  transition: background var(--t-fast);\n}\n.notif-row--unread[_ngcontent-%COMP%] {\n  background: var(--c-bg-raised);\n}\n.notif-row[_ngcontent-%COMP%]:active {\n  background: var(--c-card-muted);\n}\n.notif-row__dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: transparent;\n  margin-top: 6px;\n  flex-shrink: 0;\n}\n.notif-row__dot--visible[_ngcontent-%COMP%] {\n  background: var(--c-accent);\n}\n.notif-row__icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.notif-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.notif-row__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.notif-row__msg[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-1);\n}\n.notif-row__time[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--c-text-faint);\n  margin: 0;\n}\n/*# sourceMappingURL=notifications.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationsComponent, [{
    type: Component,
    args: [{ selector: "cm-notifications", standalone: true, imports: [DatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page">
  <div class="page__header">
    <button class="back-btn" (click)="location.back()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
    </button>
    <h1 class="page__title">Notificacoes</h1>
  </div>
  <div class="list">
    @for (n of notifs(); track n.id) {
      <div class="notif-row" [class.notif-row--unread]="!n.lido" (click)="markRead(n.id)">
        <div class="notif-row__dot" [class.notif-row__dot--visible]="!n.lido"></div>
        <div class="notif-row__icon">{{ icons[n.tipo] }}</div>
        <div class="notif-row__body">
          <p class="notif-row__title">{{ n.titulo }}</p>
          <p class="notif-row__msg">{{ n.mensagem }}</p>
          <p class="notif-row__time">{{ n.criadaEm | date:'dd/MM HH:mm' }}</p>
        </div>
      </div>
    }
  </div>
</div>`, styles: ["/* apps/morador/src/app/features/notifications/notifications.component.scss */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.page__header {\n  display: flex;\n  align-items: center;\n  gap: var(--s-4);\n  padding: var(--s-5);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.page__title {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  font-weight: 400;\n  margin: 0;\n}\n.back-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--r-sm);\n  border: 1px solid var(--c-border);\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--c-text);\n  flex-shrink: 0;\n}\n.notif-row {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--s-3);\n  padding: var(--s-4) var(--s-5);\n  border-bottom: 1px solid var(--c-border);\n  cursor: pointer;\n  transition: background var(--t-fast);\n}\n.notif-row--unread {\n  background: var(--c-bg-raised);\n}\n.notif-row:active {\n  background: var(--c-card-muted);\n}\n.notif-row__dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: transparent;\n  margin-top: 6px;\n  flex-shrink: 0;\n}\n.notif-row__dot--visible {\n  background: var(--c-accent);\n}\n.notif-row__icon {\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.notif-row__body {\n  flex: 1;\n}\n.notif-row__title {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.notif-row__msg {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-1);\n}\n.notif-row__time {\n  font-size: 11px;\n  color: var(--c-text-faint);\n  margin: 0;\n}\n/*# sourceMappingURL=notifications.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationsComponent, { className: "NotificationsComponent", filePath: "apps/morador/src/app/features/notifications/notifications.component.ts", lineNumber: 14 });
})();
export {
  NotificationsComponent
};
//# sourceMappingURL=chunk-F52ZNWYX.js.map
