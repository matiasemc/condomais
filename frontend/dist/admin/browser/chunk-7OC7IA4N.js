import {
  AuthState
} from "./chunk-3HOKBTYV.js";
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
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-EEZDSBZ6.js";

// apps/admin/src/app/features/dashboard/dashboard.component.ts
var DashboardComponent = class _DashboardComponent {
  constructor() {
    this.state = inject(AuthState);
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["cm-dashboard"]], decls: 6, vars: 2, template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "h2");
        \u0275\u0275text(1, "Painel Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "p");
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p");
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1("Condom\xEDnio: ", (tmp_0_0 = ctx.state.currentTenant()) == null ? null : tmp_0_0.nome, "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Perfil: ", ctx.state.currentRole(), "");
      }
    }, encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{
      selector: "cm-dashboard",
      standalone: true,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<h2>Painel Admin</h2><p>Condom\xEDnio: {{state.currentTenant()?.nome}}</p><p>Perfil: {{state.currentRole()}}</p>"
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "apps/admin/src/app/features/dashboard/dashboard.component.ts", lineNumber: 5 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-7OC7IA4N.js.map
