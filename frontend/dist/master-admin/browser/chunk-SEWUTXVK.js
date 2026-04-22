import {
  SUPABASE_CLIENT
} from "./chunk-R2RNB5Q2.js";
import {
  DatePipe,
  RouterLink
} from "./chunk-FLR37CX6.js";
import {
  ChangeDetectionStrategy,
  Component,
  __async,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-H3ZFOGTY.js";

// apps/master-admin/src/app/features/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DashboardComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_46_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "p", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 20);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 21)(8, "span", 22);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 23);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r1.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Criado ", \u0275\u0275pipeBind2(6, 6, t_r1.created_at, "dd/MM/yyyy"), "");
    \u0275\u0275advance(3);
    \u0275\u0275classMap("badge--" + t_r1.subscription_status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r1.subscription_status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r1.plan);
  }
}
function DashboardComponent_Conditional_46_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Nenhum tenant");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DashboardComponent_Conditional_46_For_1_Template, 12, 9, "div", 17, _forTrack0, false, DashboardComponent_Conditional_46_ForEmpty_2_Template, 2, 0, "p", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.recentTenants());
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor() {
    this.supabase = inject(SUPABASE_CLIENT);
    this.stats = signal(null);
    this.recentTenants = signal([]);
    this.isLoading = signal(true);
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const [statsRes, tenantsRes] = yield Promise.all([
        this.supabase.from("v_platform_stats").select("*").single(),
        this.supabase.from("condominios").select("id,nome,subscription_status,plan,created_at").is("deleted_at", null).order("created_at", { ascending: false }).limit(8)
      ]);
      this.stats.set(statsRes.data ?? null);
      this.recentTenants.set(tenantsRes.data ?? []);
      this.isLoading.set(false);
    });
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["cm-dashboard"]], decls: 47, vars: 10, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "metrics"], [1, "metric", "metric--blue"], [1, "metric__value"], [1, "metric__label"], [1, "metric__sub"], [1, "metric", "metric--green"], [1, "metric", "metric--amber"], [1, "metric"], [1, "metric", "metric--red"], [1, "section"], [1, "section__header"], [1, "section__title"], ["routerLink", "/tenants", 1, "section__link"], [1, "hint"], [1, "tenant-row"], [1, "tenant-row__body"], [1, "tenant-row__name"], [1, "tenant-row__meta"], [1, "tenant-row__right"], [1, "badge"], [1, "plan-chip"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
        \u0275\u0275text(3, "Painel da Plataforma");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "div", 3)(5, "div", 4)(6, "p", 5);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 6);
        \u0275\u0275text(9, "Tenants");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p", 7);
        \u0275\u0275text(11);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 8)(13, "p", 5);
        \u0275\u0275text(14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "p", 6);
        \u0275\u0275text(16, "Usu\xE1rios globais");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 9)(18, "p", 5);
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "p", 6);
        \u0275\u0275text(21, "Entregas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "p", 7);
        \u0275\u0275text(23);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "div", 10)(25, "p", 5);
        \u0275\u0275text(26);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "p", 6);
        \u0275\u0275text(28, "Ocorr\xEAncias");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 10)(30, "p", 5);
        \u0275\u0275text(31);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "p", 6);
        \u0275\u0275text(33, "Reservas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "div", 11)(35, "p", 5);
        \u0275\u0275text(36);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "p", 6);
        \u0275\u0275text(38, "Tenants suspensos");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(39, "div", 12)(40, "div", 13)(41, "h3", 14);
        \u0275\u0275text(42, "Tenants recentes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "a", 15);
        \u0275\u0275text(44, "Ver todos");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(45, DashboardComponent_Conditional_45_Template, 2, 0, "p", 16)(46, DashboardComponent_Conditional_46_Template, 3, 1);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_1_0;
        let tmp_2_0;
        let tmp_3_0;
        let tmp_4_0;
        let tmp_5_0;
        let tmp_6_0;
        let tmp_7_0;
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate((tmp_0_0 = (tmp_0_0 = ctx.stats()) == null ? null : tmp_0_0.total_tenants) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : "\u2014");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate2("", (tmp_1_0 = ctx.stats()) == null ? null : tmp_1_0.tenants_active, " ativos \xB7 ", (tmp_1_0 = ctx.stats()) == null ? null : tmp_1_0.tenants_trial, " trial");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate((tmp_2_0 = (tmp_2_0 = ctx.stats()) == null ? null : tmp_2_0.total_users) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "\u2014");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate((tmp_3_0 = (tmp_3_0 = ctx.stats()) == null ? null : tmp_3_0.total_deliveries) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : "\u2014");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("", (tmp_4_0 = ctx.stats()) == null ? null : tmp_4_0.pending_deliveries, " pendentes");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate((tmp_5_0 = (tmp_5_0 = ctx.stats()) == null ? null : tmp_5_0.total_occurrences) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : "\u2014");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate((tmp_6_0 = (tmp_6_0 = ctx.stats()) == null ? null : tmp_6_0.total_reservations) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : "\u2014");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate((tmp_7_0 = (tmp_7_0 = ctx.stats()) == null ? null : tmp_7_0.tenants_suspended) !== null && tmp_7_0 !== void 0 ? tmp_7_0 : "\u2014");
        \u0275\u0275advance(9);
        \u0275\u0275conditional(ctx.isLoading() ? 45 : 46);
      }
    }, dependencies: [DatePipe, RouterLink], styles: ["\n\n.page__header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page__title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n}\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.metric[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n  border-left: 4px solid #e5e7eb;\n}\n.metric--blue[_ngcontent-%COMP%] {\n  border-left-color: #3b82f6;\n}\n.metric--green[_ngcontent-%COMP%] {\n  border-left-color: #10b981;\n}\n.metric--amber[_ngcontent-%COMP%] {\n  border-left-color: #f59e0b;\n}\n.metric--red[_ngcontent-%COMP%] {\n  border-left-color: #ef4444;\n}\n.metric__value[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #111827;\n  line-height: 1;\n  margin-bottom: 6px;\n}\n.metric__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  font-weight: 500;\n}\n.metric__sub[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n  margin-top: 4px;\n}\n.section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n}\n.section__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.section__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0;\n}\n.section__link[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #3b82f6;\n  text-decoration: none;\n}\n.tenant-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 0;\n  border-bottom: 1px solid #f3f4f6;\n}\n.tenant-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.tenant-row__name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 14px;\n}\n.tenant-row__meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n}\n.tenant-row__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-weight: 600;\n}\n.badge--active[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.badge--trial[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.badge--suspended[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.badge--cancelled[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.plan-chip[_ngcontent-%COMP%] {\n  font-size: 11px;\n  background: #f3f4f6;\n  color: #374151;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.hint[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 14px;\n  padding: 8px 0;\n}\n/*# sourceMappingURL=dashboard.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "cm-dashboard", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [DatePipe, RouterLink], template: `
    <div class="page">
      <div class="page__header">
        <h2 class="page__title">Painel da Plataforma</h2>
      </div>

      <div class="metrics">
        <div class="metric metric--blue">
          <p class="metric__value">{{ stats()?.total_tenants ?? '\u2014' }}</p>
          <p class="metric__label">Tenants</p>
          <p class="metric__sub">{{ stats()?.tenants_active }} ativos \xB7 {{ stats()?.tenants_trial }} trial</p>
        </div>
        <div class="metric metric--green">
          <p class="metric__value">{{ stats()?.total_users ?? '\u2014' }}</p>
          <p class="metric__label">Usu\xE1rios globais</p>
        </div>
        <div class="metric metric--amber">
          <p class="metric__value">{{ stats()?.total_deliveries ?? '\u2014' }}</p>
          <p class="metric__label">Entregas</p>
          <p class="metric__sub">{{ stats()?.pending_deliveries }} pendentes</p>
        </div>
        <div class="metric">
          <p class="metric__value">{{ stats()?.total_occurrences ?? '\u2014' }}</p>
          <p class="metric__label">Ocorr\xEAncias</p>
        </div>
        <div class="metric">
          <p class="metric__value">{{ stats()?.total_reservations ?? '\u2014' }}</p>
          <p class="metric__label">Reservas</p>
        </div>
        <div class="metric metric--red">
          <p class="metric__value">{{ stats()?.tenants_suspended ?? '\u2014' }}</p>
          <p class="metric__label">Tenants suspensos</p>
        </div>
      </div>

      <div class="section">
        <div class="section__header">
          <h3 class="section__title">Tenants recentes</h3>
          <a class="section__link" routerLink="/tenants">Ver todos</a>
        </div>
        @if (isLoading()) {
          <p class="hint">Carregando...</p>
        } @else {
          @for (t of recentTenants(); track t.id) {
            <div class="tenant-row">
              <div class="tenant-row__body">
                <p class="tenant-row__name">{{ t.nome }}</p>
                <p class="tenant-row__meta">Criado {{ t.created_at | date:'dd/MM/yyyy' }}</p>
              </div>
              <div class="tenant-row__right">
                <span class="badge" [class]="'badge--' + t.subscription_status">{{ t.subscription_status }}</span>
                <span class="plan-chip">{{ t.plan }}</span>
              </div>
            </div>
          } @empty {
            <p class="hint">Nenhum tenant</p>
          }
        }
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;071f5d2c60c9822f0be22b8792e1f4ead24608ac49f25a037cc94f0ead3eac76;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/master-admin/src/app/features/dashboard/dashboard.component.ts */\n.page__header {\n  margin-bottom: 24px;\n}\n.page__title {\n  font-size: 22px;\n  font-weight: 700;\n  margin: 0;\n}\n.metrics {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.metric {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n  border-left: 4px solid #e5e7eb;\n}\n.metric--blue {\n  border-left-color: #3b82f6;\n}\n.metric--green {\n  border-left-color: #10b981;\n}\n.metric--amber {\n  border-left-color: #f59e0b;\n}\n.metric--red {\n  border-left-color: #ef4444;\n}\n.metric__value {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #111827;\n  line-height: 1;\n  margin-bottom: 6px;\n}\n.metric__label {\n  font-size: 13px;\n  color: #6b7280;\n  font-weight: 500;\n}\n.metric__sub {\n  font-size: 11px;\n  color: #9ca3af;\n  margin-top: 4px;\n}\n.section {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 20px;\n}\n.section__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.section__title {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0;\n}\n.section__link {\n  font-size: 13px;\n  color: #3b82f6;\n  text-decoration: none;\n}\n.tenant-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 0;\n  border-bottom: 1px solid #f3f4f6;\n}\n.tenant-row:last-child {\n  border-bottom: none;\n}\n.tenant-row__name {\n  font-weight: 500;\n  font-size: 14px;\n}\n.tenant-row__meta {\n  font-size: 12px;\n  color: #9ca3af;\n}\n.tenant-row__right {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.badge {\n  font-size: 11px;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-weight: 600;\n}\n.badge--active {\n  background: #d1fae5;\n  color: #065f46;\n}\n.badge--trial {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.badge--suspended {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.badge--cancelled {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.plan-chip {\n  font-size: 11px;\n  background: #f3f4f6;\n  color: #374151;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.hint {\n  color: #9ca3af;\n  font-size: 14px;\n  padding: 8px 0;\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "apps/master-admin/src/app/features/dashboard/dashboard.component.ts", lineNumber: 122 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-SEWUTXVK.js.map
