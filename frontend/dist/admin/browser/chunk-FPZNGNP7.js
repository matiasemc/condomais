import {
  BadgeComponent
} from "./chunk-OBMUP4XE.js";
import {
  AuthState,
  DeliveryService,
  OccurrenceService,
  ReservationService
} from "./chunk-OKLNA4DD.js";
import {
  DatePipe,
  RouterLink
} from "./chunk-YX7IELSF.js";
import {
  ChangeDetectionStrategy,
  Component,
  __async,
  computed,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-UHB6DSJH.js";

// apps/admin/src/app/features/dashboard/dashboard.component.ts
var _c0 = (a0) => ["/entregas", a0];
var _c1 = (a0) => ["/ocorrencias", a0];
var _forTrack0 = ($index, $item) => $item.id;
function DashboardComponent_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 16)(1, "div", 19)(2, "p", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 21);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "cm-badge", 22);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c0, d_r1.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Unidade ", d_r1.unidade);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", d_r1.tipo, " \xB7 ", \u0275\u0275pipeBind2(6, 6, d_r1.createdAt, "dd/MM HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", d_r1.status === "pendente" ? "warning" : "success");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r1.status);
  }
}
function DashboardComponent_ForEmpty_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Sem entregas recentes");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 16)(1, "div", 19)(2, "p", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 21);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "cm-badge", 22);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c1, o_r2.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r2.titulo ?? o_r2.tipo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", o_r2.tipo, " \xB7 ", \u0275\u0275pipeBind2(6, 6, o_r2.createdAt, "dd/MM HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("variant", ctx_r2.occStatusVariant(o_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r2.status);
  }
}
function DashboardComponent_ForEmpty_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Sem ocorr\xEAncias recentes");
    \u0275\u0275elementEnd();
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor() {
    this.state = inject(AuthState);
    this.delSvc = inject(DeliveryService);
    this.occSvc = inject(OccurrenceService);
    this.resSvc = inject(ReservationService);
    this.pendingDeliveries = computed(() => this.delSvc.deliveries().filter((d) => d.status === "pendente").length, ...ngDevMode ? [{ debugName: "pendingDeliveries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.totalDeliveries = computed(() => this.delSvc.deliveries().length, ...ngDevMode ? [{ debugName: "totalDeliveries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.openOccurrences = computed(() => this.occSvc.occurrences().filter((o) => o.status === "aberta" || o.status === "em_analise").length, ...ngDevMode ? [{ debugName: "openOccurrences" }] : (
      /* istanbul ignore next */
      []
    ));
    this.todayReservations = computed(() => {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      return this.resSvc.reservations().filter((r) => r.data === today && r.status === "confirmada").length;
    }, ...ngDevMode ? [{ debugName: "todayReservations" }] : (
      /* istanbul ignore next */
      []
    ));
    this.recentDeliveries = computed(() => this.delSvc.deliveries().slice(0, 5), ...ngDevMode ? [{ debugName: "recentDeliveries" }] : (
      /* istanbul ignore next */
      []
    ));
    this.recentOccurrences = computed(() => this.occSvc.occurrences().slice(0, 5), ...ngDevMode ? [{ debugName: "recentOccurrences" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const tenant = this.state.currentTenant();
      if (!tenant)
        return;
      yield Promise.all([
        this.delSvc.loadForTenant(tenant.id),
        this.occSvc.loadForTenant(tenant.id),
        this.resSvc.loadForTenant(tenant.id)
      ]);
    });
  }
  occStatusVariant(status) {
    if (status === "aberta")
      return "accent";
    if (status === "em_analise")
      return "warning";
    return "success";
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["cm-dashboard"]], decls: 46, vars: 7, consts: [[1, "admin-page"], [1, "admin-page__header"], [1, "admin-page__title"], [1, "admin-page__subtitle"], [1, "metrics"], [1, "metric-card", "metric-card--warn"], [1, "metric-card__value"], [1, "metric-card__label"], [1, "metric-card", "metric-card--accent"], [1, "metric-card", "metric-card--success"], [1, "metric-card"], [1, "activity"], [1, "activity__section"], [1, "activity__header"], [1, "activity__title"], ["routerLink", "/entregas", 1, "activity__link"], [1, "activity-row", 3, "routerLink"], [1, "activity__empty"], ["routerLink", "/ocorrencias", 1, "activity__link"], [1, "activity-row__body"], [1, "activity-row__title"], [1, "activity-row__meta"], [3, "variant"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Painel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4)(7, "div", 5)(8, "p", 6);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p", 7);
        \u0275\u0275text(11, "Entregas pendentes");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 8)(13, "p", 6);
        \u0275\u0275text(14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "p", 7);
        \u0275\u0275text(16, "Ocorr\xEAncias abertas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 9)(18, "p", 6);
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "p", 7);
        \u0275\u0275text(21, "Reservas hoje");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 10)(23, "p", 6);
        \u0275\u0275text(24);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p", 7);
        \u0275\u0275text(26, "Total de entregas");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(27, "div", 11)(28, "div", 12)(29, "div", 13)(30, "h3", 14);
        \u0275\u0275text(31, "\xDAltimas entregas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "a", 15);
        \u0275\u0275text(33, "Ver todas");
        \u0275\u0275elementEnd()();
        \u0275\u0275repeaterCreate(34, DashboardComponent_For_35_Template, 9, 11, "a", 16, _forTrack0, false, DashboardComponent_ForEmpty_36_Template, 2, 0, "p", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "div", 12)(38, "div", 13)(39, "h3", 14);
        \u0275\u0275text(40, "\xDAltimas ocorr\xEAncias");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "a", 18);
        \u0275\u0275text(42, "Ver todas");
        \u0275\u0275elementEnd()();
        \u0275\u0275repeaterCreate(43, DashboardComponent_For_44_Template, 9, 11, "a", 16, _forTrack0, false, DashboardComponent_ForEmpty_45_Template, 2, 0, "p", 17);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate((tmp_0_0 = ctx.state.currentTenant()) == null ? null : tmp_0_0.nome);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.pendingDeliveries());
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.openOccurrences());
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.todayReservations());
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.totalDeliveries());
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.recentDeliveries());
        \u0275\u0275advance(9);
        \u0275\u0275repeater(ctx.recentOccurrences());
      }
    }, dependencies: [RouterLink, BadgeComponent, DatePipe], styles: ["\n.admin-page__subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: rgba(0, 0, 0, 0.45);\n  margin-left: 8px;\n}\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.metric-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n  border-left: 4px solid #e5e7eb;\n}\n.metric-card--warn[_ngcontent-%COMP%] {\n  border-left-color: #f59e0b;\n}\n.metric-card--accent[_ngcontent-%COMP%] {\n  border-left-color: #3b82f6;\n}\n.metric-card--success[_ngcontent-%COMP%] {\n  border-left-color: #10b981;\n}\n.metric-card__value[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #111827;\n  line-height: 1;\n  margin-bottom: 6px;\n}\n.metric-card__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n}\n.activity[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n@media (max-width: 768px) {\n  .activity[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.activity__section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n}\n.activity__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.activity__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n}\n.activity__link[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #2563eb;\n  text-decoration: none;\n}\n.activity__empty[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 14px;\n  text-align: center;\n  padding: 16px 0;\n}\n.activity-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 0;\n  border-bottom: 1px solid #f3f4f6;\n  text-decoration: none;\n  color: inherit;\n}\n.activity-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.activity-row[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  margin: 0 -8px;\n  padding-left: 8px;\n  padding-right: 8px;\n  border-radius: 6px;\n}\n.activity-row__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n}\n.activity-row__meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n}\n/*# sourceMappingURL=dashboard.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "cm-dashboard", standalone: true, imports: [RouterLink, DatePipe, BadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Painel</h2>
        <span class="admin-page__subtitle">{{ state.currentTenant()?.nome }}</span>
      </div>

      <div class="metrics">
        <div class="metric-card metric-card--warn">
          <p class="metric-card__value">{{ pendingDeliveries() }}</p>
          <p class="metric-card__label">Entregas pendentes</p>
        </div>
        <div class="metric-card metric-card--accent">
          <p class="metric-card__value">{{ openOccurrences() }}</p>
          <p class="metric-card__label">Ocorr\xEAncias abertas</p>
        </div>
        <div class="metric-card metric-card--success">
          <p class="metric-card__value">{{ todayReservations() }}</p>
          <p class="metric-card__label">Reservas hoje</p>
        </div>
        <div class="metric-card">
          <p class="metric-card__value">{{ totalDeliveries() }}</p>
          <p class="metric-card__label">Total de entregas</p>
        </div>
      </div>

      <div class="activity">
        <div class="activity__section">
          <div class="activity__header">
            <h3 class="activity__title">\xDAltimas entregas</h3>
            <a class="activity__link" routerLink="/entregas">Ver todas</a>
          </div>
          @for (d of recentDeliveries(); track d.id) {
            <a class="activity-row" [routerLink]="['/entregas', d.id]">
              <div class="activity-row__body">
                <p class="activity-row__title">Unidade {{ d.unidade }}</p>
                <p class="activity-row__meta">{{ d.tipo }} \xB7 {{ d.createdAt | date:'dd/MM HH:mm' }}</p>
              </div>
              <cm-badge [variant]="d.status === 'pendente' ? 'warning' : 'success'">{{ d.status }}</cm-badge>
            </a>
          } @empty {
            <p class="activity__empty">Sem entregas recentes</p>
          }
        </div>

        <div class="activity__section">
          <div class="activity__header">
            <h3 class="activity__title">\xDAltimas ocorr\xEAncias</h3>
            <a class="activity__link" routerLink="/ocorrencias">Ver todas</a>
          </div>
          @for (o of recentOccurrences(); track o.id) {
            <a class="activity-row" [routerLink]="['/ocorrencias', o.id]">
              <div class="activity-row__body">
                <p class="activity-row__title">{{ o.titulo ?? o.tipo }}</p>
                <p class="activity-row__meta">{{ o.tipo }} \xB7 {{ o.createdAt | date:'dd/MM HH:mm' }}</p>
              </div>
              <cm-badge [variant]="occStatusVariant(o.status)">{{ o.status }}</cm-badge>
            </a>
          } @empty {
            <p class="activity__empty">Sem ocorr\xEAncias recentes</p>
          }
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;6f504613c18f6296da1f76409d52fa808280960b97f5bd5aa45761f50a95b085;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/admin/src/app/features/dashboard/dashboard.component.ts */\n.admin-page__subtitle {\n  font-size: 13px;\n  color: rgba(0, 0, 0, 0.45);\n  margin-left: 8px;\n}\n.metrics {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.metric-card {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n  border-left: 4px solid #e5e7eb;\n}\n.metric-card--warn {\n  border-left-color: #f59e0b;\n}\n.metric-card--accent {\n  border-left-color: #3b82f6;\n}\n.metric-card--success {\n  border-left-color: #10b981;\n}\n.metric-card__value {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #111827;\n  line-height: 1;\n  margin-bottom: 6px;\n}\n.metric-card__label {\n  font-size: 13px;\n  color: #6b7280;\n}\n.activity {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n@media (max-width: 768px) {\n  .activity {\n    grid-template-columns: 1fr;\n  }\n}\n.activity__section {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n}\n.activity__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.activity__title {\n  font-size: 15px;\n  font-weight: 600;\n}\n.activity__link {\n  font-size: 13px;\n  color: #2563eb;\n  text-decoration: none;\n}\n.activity__empty {\n  color: #9ca3af;\n  font-size: 14px;\n  text-align: center;\n  padding: 16px 0;\n}\n.activity-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 0;\n  border-bottom: 1px solid #f3f4f6;\n  text-decoration: none;\n  color: inherit;\n}\n.activity-row:last-child {\n  border-bottom: none;\n}\n.activity-row:hover {\n  background: #f9fafb;\n  margin: 0 -8px;\n  padding-left: 8px;\n  padding-right: 8px;\n  border-radius: 6px;\n}\n.activity-row__title {\n  font-size: 14px;\n  font-weight: 500;\n}\n.activity-row__meta {\n  font-size: 12px;\n  color: #9ca3af;\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "apps/admin/src/app/features/dashboard/dashboard.component.ts", lineNumber: 100 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-FPZNGNP7.js.map
