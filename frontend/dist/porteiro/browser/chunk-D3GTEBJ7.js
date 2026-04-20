import {
  ToastService
} from "./chunk-JUVU2L4V.js";
import {
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  ListRowComponent
} from "./chunk-7CWI5AJD.js";
import "./chunk-NDOIAJY4.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-C54MFYDF.js";
import {
  ChangeDetectionStrategy,
  Component,
  DatePipe,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-JLUHEVQX.js";

// apps/porteiro/src/app/features/residents/resident-detail.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ResidentDetailComponent_Conditional_1_Conditional_17_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "cm-list-row", 16);
    \u0275\u0275pipe(1, "date");
    \u0275\u0275elementStart(2, "cm-badge", 17);
    \u0275\u0275text(3, "Pendente");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r3 = ctx.$implicit;
    \u0275\u0275property("title", d_r3.description)("subtitle", \u0275\u0275pipeBind2(1, 2, d_r3.arrivedAt, "dd/MM/yyyy HH:mm") || "");
  }
}
function ResidentDetailComponent_Conditional_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 13)(1, "h3", 15);
    \u0275\u0275text(2, "Entregas pendentes");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, ResidentDetailComponent_Conditional_1_Conditional_17_For_4_Template, 4, 5, "cm-list-row", 16, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.pendingDeliveries());
  }
}
function ResidentDetailComponent_Conditional_1_Conditional_18_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "cm-list-row", 18);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const d_r4 = ctx.$implicit;
    \u0275\u0275property("title", d_r4.description)("subtitle", \u0275\u0275pipeBind2(1, 2, d_r4.arrivedAt, "dd/MM/yyyy HH:mm") || "");
  }
}
function ResidentDetailComponent_Conditional_1_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 13)(1, "h3", 15);
    \u0275\u0275text(2, "Hist\xF3rico");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, ResidentDetailComponent_Conditional_1_Conditional_18_For_4_Template, 2, 5, "cm-list-row", 18, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.pastDeliveries());
  }
}
function ResidentDetailComponent_Conditional_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 19);
    \u0275\u0275text(2, "\u{1F4ED}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Nenhuma entrega registrada");
    \u0275\u0275elementEnd()();
  }
}
function ResidentDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "a", 2);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 3);
    \u0275\u0275element(3, "path", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(4, "cm-avatar", 5);
    \u0275\u0275elementStart(5, "div", 6)(6, "h2", 7);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "cm-badge", 9);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 10)(13, "cm-button", 11);
    \u0275\u0275listener("click", function ResidentDetailComponent_Conditional_1_Template_cm_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.notificar());
    });
    \u0275\u0275text(14, "Notificar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "cm-button", 12);
    \u0275\u0275text(16, "+ Entrega");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, ResidentDetailComponent_Conditional_1_Conditional_17_Template, 5, 0, "section", 13)(18, ResidentDetailComponent_Conditional_1_Conditional_18_Template, 5, 0, "section", 13)(19, ResidentDetailComponent_Conditional_1_Conditional_19_Template, 5, 0, "div", 14);
  }
  if (rf & 2) {
    const r_r5 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("name", r_r5.name)("size", 56);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Apto ", r_r5.unit, "");
    \u0275\u0275advance();
    \u0275\u0275property("variant", r_r5.status === "ativo" ? "success" : "neutral");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r5.status);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.pendingDeliveries().length > 0 ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.pastDeliveries().length > 0 ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.pendingDeliveries().length === 0 && ctx_r1.pastDeliveries().length === 0 ? 19 : -1);
  }
}
var ResidentDetailComponent = class _ResidentDetailComponent {
  constructor(route, toast) {
    this.toast = toast;
    this.db = [
      {
        id: "1",
        name: "Ana Lima",
        unit: "101",
        phone: "11999990001",
        status: "ativo",
        deliveries: [
          { id: "d1", description: "Caixa Amazon", arrivedAt: "2026-04-18T10:00:00", status: "pendente" },
          { id: "d2", description: "Correios", arrivedAt: "2026-04-17T14:30:00", status: "pendente" },
          { id: "d3", description: "iFood bag", arrivedAt: "2026-04-10T12:00:00", status: "retirada" }
        ]
      },
      {
        id: "3",
        name: "Carla Souza",
        unit: "201",
        phone: "11999990003",
        status: "ativo",
        deliveries: [
          { id: "d4", description: "Mercado Livre", arrivedAt: "2026-04-19T09:00:00", status: "pendente" }
        ]
      },
      {
        id: "5",
        name: "Elisa Ferreira",
        unit: "301",
        phone: "11999990005",
        status: "ativo",
        deliveries: [
          { id: "d5", description: "Shopee", arrivedAt: "2026-04-20T08:00:00", status: "pendente" },
          { id: "d6", description: "DHL", arrivedAt: "2026-04-19T16:00:00", status: "pendente" },
          { id: "d7", description: "Rappi", arrivedAt: "2026-04-18T20:00:00", status: "pendente" }
        ]
      }
    ];
    this.resident = signal(null);
    this.pendingDeliveries = computed(() => this.resident()?.deliveries.filter((d) => d.status === "pendente") ?? []);
    this.pastDeliveries = computed(() => this.resident()?.deliveries.filter((d) => d.status === "retirada") ?? []);
    const id = route.snapshot.paramMap.get("id") ?? "";
    const found = this.db.find((r) => r.id === id) ?? {
      id,
      name: "Morador",
      unit: "\u2014",
      phone: "\u2014",
      status: "ativo",
      deliveries: []
    };
    this.resident.set(found);
  }
  notificar() {
    this.toast.show({ message: "Notifica\xE7\xE3o enviada via WhatsApp", type: "success" });
  }
  static {
    this.\u0275fac = function ResidentDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ResidentDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ToastService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResidentDetailComponent, selectors: [["cm-resident-detail"]], decls: 2, vars: 1, consts: [[1, "detail-page"], [1, "detail-header"], ["routerLink", "/moradores", 1, "back-btn"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "none"], ["d", "M12 5l-5 5 5 5", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [3, "name", "size"], [1, "detail-identity"], [1, "detail-name"], [1, "detail-unit"], [3, "variant"], [1, "action-row"], ["variant", "accent", 3, "click"], ["variant", "primary", "routerLink", "/entregas/nova"], [1, "detail-section"], [1, "empty-deliveries"], [1, "section-title"], ["icon", "\u{1F4E6}", 3, "title", "subtitle"], ["slot", "end", "variant", "warn"], ["icon", "\u2705", 3, "title", "subtitle"], [1, "empty-icon"]], template: function ResidentDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, ResidentDetailComponent_Conditional_1_Template, 20, 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_0_0 = ctx.resident()) ? 1 : -1, tmp_0_0);
      }
    }, dependencies: [RouterLink, DatePipe, BadgeComponent, ButtonComponent, AvatarComponent, ListRowComponent], styles: ["\n\n.detail-page[_ngcontent-%COMP%] {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding-bottom: var(--s-3);\n  border-bottom: 1px solid var(--c-card-muted);\n}\n.back-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  color: var(--c-text-muted);\n  text-decoration: none;\n}\n.detail-identity[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.detail-name[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--c-text);\n  margin: 0;\n}\n.detail-unit[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n.action-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-3);\n}\n.detail-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  margin: 0;\n}\n.empty-deliveries[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: var(--s-7) 0;\n  color: var(--c-text-muted);\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  display: block;\n  margin-bottom: var(--s-3);\n}\n/*# sourceMappingURL=resident-detail.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResidentDetailComponent, [{
    type: Component,
    args: [{ selector: "cm-resident-detail", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, DatePipe, BadgeComponent, ButtonComponent, AvatarComponent, ListRowComponent], template: `<div class="detail-page">
  @if (resident(); as r) {
    <div class="detail-header">
      <a class="back-btn" routerLink="/moradores">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 5l-5 5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <cm-avatar [name]="r.name" [size]="56"></cm-avatar>
      <div class="detail-identity">
        <h2 class="detail-name">{{ r.name }}</h2>
        <span class="detail-unit">Apto {{ r.unit }}</span>
      </div>
      <cm-badge [variant]="r.status === 'ativo' ? 'success' : 'neutral'">{{ r.status }}</cm-badge>
    </div>
    <div class="action-row">
      <cm-button variant="accent" (click)="notificar()">Notificar</cm-button>
      <cm-button variant="primary" routerLink="/entregas/nova">+ Entrega</cm-button>
    </div>
    @if (pendingDeliveries().length > 0) {
      <section class="detail-section">
        <h3 class="section-title">Entregas pendentes</h3>
        @for (d of pendingDeliveries(); track d.id) {
          <cm-list-row [title]="d.description" [subtitle]="(d.arrivedAt | date:'dd/MM/yyyy HH:mm') || ''" icon="\u{1F4E6}">
            <cm-badge slot="end" variant="warn">Pendente</cm-badge>
          </cm-list-row>
        }
      </section>
    }
    @if (pastDeliveries().length > 0) {
      <section class="detail-section">
        <h3 class="section-title">Hist\xF3rico</h3>
        @for (d of pastDeliveries(); track d.id) {
          <cm-list-row [title]="d.description" [subtitle]="(d.arrivedAt | date:'dd/MM/yyyy HH:mm') || ''" icon="\u2705">
          </cm-list-row>
        }
      </section>
    }
    @if (pendingDeliveries().length === 0 && pastDeliveries().length === 0) {
      <div class="empty-deliveries">
        <span class="empty-icon">\u{1F4ED}</span>
        <p>Nenhuma entrega registrada</p>
      </div>
    }
  }
</div>`, styles: ["/* apps/porteiro/src/app/features/residents/resident-detail.component.scss */\n.detail-page {\n  padding: var(--s-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-4);\n}\n.detail-header {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding-bottom: var(--s-3);\n  border-bottom: 1px solid var(--c-card-muted);\n}\n.back-btn {\n  display: flex;\n  align-items: center;\n  color: var(--c-text-muted);\n  text-decoration: none;\n}\n.detail-identity {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.detail-name {\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--c-text);\n  margin: 0;\n}\n.detail-unit {\n  font-size: 13px;\n  color: var(--c-text-muted);\n}\n.action-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--s-3);\n}\n.detail-section {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-2);\n}\n.section-title {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-text-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  margin: 0;\n}\n.empty-deliveries {\n  text-align: center;\n  padding: var(--s-7) 0;\n  color: var(--c-text-muted);\n}\n.empty-icon {\n  font-size: 40px;\n  display: block;\n  margin-bottom: var(--s-3);\n}\n/*# sourceMappingURL=resident-detail.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResidentDetailComponent, { className: "ResidentDetailComponent", filePath: "apps/porteiro/src/app/features/residents/resident-detail.component.ts", lineNumber: 31 });
})();
export {
  ResidentDetailComponent
};
//# sourceMappingURL=chunk-D3GTEBJ7.js.map
