import {
  RouterLink
} from "./chunk-C54MFYDF.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-JLUHEVQX.js";

// apps/porteiro/src/app/features/unauthorized/unauthorized.component.ts
var UnauthorizedComponent = class _UnauthorizedComponent {
  static {
    this.\u0275fac = function UnauthorizedComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UnauthorizedComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnauthorizedComponent, selectors: [["cm-unauthorized"]], decls: 5, vars: 0, consts: [[2, "text-align", "center", "padding", "60px"], ["routerLink", "/login"]], template: function UnauthorizedComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Acesso n\xE3o autorizado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "a", 1);
        \u0275\u0275text(4, "Voltar");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnauthorizedComponent, [{
    type: Component,
    args: [{ selector: "cm-unauthorized", standalone: true, imports: [RouterLink], template: '<div style="text-align:center;padding:60px"><h2>Acesso n\xE3o autorizado</h2><a routerLink="/login">Voltar</a></div>' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnauthorizedComponent, { className: "UnauthorizedComponent", filePath: "apps/porteiro/src/app/features/unauthorized/unauthorized.component.ts", lineNumber: 4 });
})();
export {
  UnauthorizedComponent
};
//# sourceMappingURL=chunk-NXIHEWPQ.js.map
