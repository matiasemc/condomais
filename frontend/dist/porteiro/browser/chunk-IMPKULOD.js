import {
  AuthState,
  TenantService
} from "./chunk-XKFCWXE6.js";
import {
  Router
} from "./chunk-C54MFYDF.js";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-JLUHEVQX.js";

// apps/porteiro/src/app/features/tenant-select/tenant-select.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function TenantSelectComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function TenantSelectComponent_For_4_Template_button_click_0_listener() {
      const m_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.select(m_r2.tenant));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r2.tenant.nome);
  }
}
var TenantSelectComponent = class _TenantSelectComponent {
  constructor() {
    this.state = inject(AuthState);
    this.tenantSvc = inject(TenantService);
    this.router = inject(Router);
  }
  select(t) {
    this.tenantSvc.set(t);
    this.router.navigate(["/home"]);
  }
  static {
    this.\u0275fac = function TenantSelectComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TenantSelectComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TenantSelectComponent, selectors: [["cm-tenant-select"]], decls: 5, vars: 0, consts: [[2, "max-width", "400px", "margin", "60px auto", "display", "flex", "flex-direction", "column", "gap", "12px", "padding", "24px"], [2, "padding", "16px", "background", "#fff", "border", "1.5px solid #ddd", "border-radius", "10px", "cursor", "pointer", "font-size", "15px", "text-align", "left"], [2, "padding", "16px", "background", "#fff", "border", "1.5px solid #ddd", "border-radius", "10px", "cursor", "pointer", "font-size", "15px", "text-align", "left", 3, "click"]], template: function TenantSelectComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Selecione o condom\xEDnio");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(3, TenantSelectComponent_For_4_Template, 2, 1, "button", 1, _forTrack0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.state.activeMemberships());
      }
    }, encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TenantSelectComponent, [{
    type: Component,
    args: [{
      selector: "cm-tenant-select",
      standalone: true,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<div style="max-width:400px;margin:60px auto;display:flex;flex-direction:column;gap:12px;padding:24px"><h2>Selecione o condom\xEDnio</h2>@for(m of state.activeMemberships(); track m.id){<button style="padding:16px;background:#fff;border:1.5px solid #ddd;border-radius:10px;cursor:pointer;font-size:15px;text-align:left" (click)="select(m.tenant)">{{m.tenant.nome}}</button>}</div>'
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TenantSelectComponent, { className: "TenantSelectComponent", filePath: "apps/porteiro/src/app/features/tenant-select/tenant-select.component.ts", lineNumber: 7 });
})();
export {
  TenantSelectComponent
};
//# sourceMappingURL=chunk-IMPKULOD.js.map
