import {
  AuthState,
  TenantService
} from "./chunk-35HAV5GM.js";
import {
  Router
} from "./chunk-22JHDSMV.js";
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
} from "./chunk-QFVHJJPM.js";

// apps/morador/src/app/features/tenant-select/tenant-select.component.ts
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TenantSelectComponent, selectors: [["cm-tenant-select"]], decls: 5, vars: 0, consts: [[1, "select-page"], [1, "tb"], [1, "tb", 3, "click"]], template: function TenantSelectComponent_Template(rf, ctx) {
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
    }, styles: ["\n\n.select-page[_ngcontent-%COMP%] {\n  max-width: 400px;\n  margin: 60px auto;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 24px;\n}\n/*# sourceMappingURL=tenant-select.component.css.map */", "\n\n.tb[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: var(--c-card,#fff);\n  border: 1.5px solid #ddd;\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 15px;\n  text-align: left;\n}\n/*# sourceMappingURL=tenant-select.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TenantSelectComponent, [{
    type: Component,
    args: [{ selector: "cm-tenant-select", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="select-page">
      <h2>Selecione o condom\xEDnio</h2>
      @for (m of state.activeMemberships(); track m.id) {
        <button class="tb" (click)="select(m.tenant)">{{ m.tenant.nome }}</button>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;bb93fe4d7bff220a438ad7bef241b56a41dc3771abfacb86b6ffc96bc71ce484;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/morador/src/app/features/tenant-select/tenant-select.component.ts */\n.select-page {\n  max-width: 400px;\n  margin: 60px auto;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 24px;\n}\n/*# sourceMappingURL=tenant-select.component.css.map */\n", "/* angular:styles/component:css;546b41e6180ba272af0dc445b7b84f2012bcab6474a846bf09f465a293c380cc;C:/Users/Matiasemc/OneDrive/Documentos/git/Condomais/frontend/apps/morador/src/app/features/tenant-select/tenant-select.component.ts */\n.tb {\n  padding: 16px;\n  background: var(--c-card,#fff);\n  border: 1.5px solid #ddd;\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 15px;\n  text-align: left;\n}\n/*# sourceMappingURL=tenant-select.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TenantSelectComponent, { className: "TenantSelectComponent", filePath: "apps/morador/src/app/features/tenant-select/tenant-select.component.ts", lineNumber: 18 });
})();
export {
  TenantSelectComponent
};
//# sourceMappingURL=chunk-GHYRQ2E7.js.map
