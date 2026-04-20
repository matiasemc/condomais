import {
  AuthState
} from "./chunk-LOOFCIPP.js";
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
} from "./chunk-R2PYOJAQ.js";

// apps/master-admin/src/app/features/dashboard/dashboard.component.ts
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["cm-dashboard"]], decls: 4, vars: 1, template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "h2");
        \u0275\u0275text(1, "Painel Master Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "p");
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1("Usu\xE1rio: ", (tmp_0_0 = ctx.state.user()) == null ? null : tmp_0_0.email, "");
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
      template: `
    <h2>Painel Master Admin</h2>
    <p>Usu\xE1rio: {{ state.user()?.email }}</p>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "apps/master-admin/src/app/features/dashboard/dashboard.component.ts", lineNumber: 13 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-MRK3JJFB.js.map
