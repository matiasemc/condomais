import {
  AuthState,
  TenantService
} from "./chunk-3HOKBTYV.js";
import {
  ChangeDetectionStrategy,
  Component,
  Router,
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
} from "./chunk-EEZDSBZ6.js";

// apps/admin/src/app/features/tenant-select/tenant-select.component.ts
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
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 3);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r2.tenant.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r2.role);
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
    this.router.navigate(["/dashboard"]);
  }
  static {
    this.\u0275fac = function TenantSelectComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TenantSelectComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TenantSelectComponent, selectors: [["cm-tenant-select"]], decls: 5, vars: 0, consts: [[1, "w"], [1, "tb"], [1, "tb", 3, "click"], [1, "r"]], template: function TenantSelectComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Selecione o condom\xEDnio");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(3, TenantSelectComponent_For_4_Template, 5, 2, "button", 1, _forTrack0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.state.activeMemberships());
      }
    }, styles: ["\n\n.w[_ngcontent-%COMP%] {\n  max-width: 480px;\n  margin: 60px auto;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.tb[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 16px 20px;\n  background: #fff;\n  border: 1.5px solid #ddd;\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 15px;\n}\n.r[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 13px;\n}\n/*# sourceMappingURL=tenant-select.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TenantSelectComponent, [{
    type: Component,
    args: [{ selector: "cm-tenant-select", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class='w'><h2>Selecione o condom\xEDnio</h2>@for(m of state.activeMemberships(); track m.id){<button class='tb' (click)='select(m.tenant)'><span>{{m.tenant.nome}}</span><span class='r'>{{m.role}}</span></button>}</div>`, styles: ["/* angular:styles/component:css;c7b883ea9d75f07780cad70935aa4adc8282f22e64c25679c3672ff8d62af55d;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/admin/src/app/features/tenant-select/tenant-select.component.ts */\n.w {\n  max-width: 480px;\n  margin: 60px auto;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.tb {\n  display: flex;\n  justify-content: space-between;\n  padding: 16px 20px;\n  background: #fff;\n  border: 1.5px solid #ddd;\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 15px;\n}\n.r {\n  color: #888;\n  font-size: 13px;\n}\n/*# sourceMappingURL=tenant-select.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TenantSelectComponent, { className: "TenantSelectComponent", filePath: "apps/admin/src/app/features/tenant-select/tenant-select.component.ts", lineNumber: 10 });
})();
export {
  TenantSelectComponent
};
//# sourceMappingURL=chunk-MOJZJAZY.js.map
