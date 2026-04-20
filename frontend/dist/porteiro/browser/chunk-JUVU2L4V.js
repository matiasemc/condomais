import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-JLUHEVQX.js";

// apps/porteiro/src/app/core/toast.service.ts
var ToastService = class _ToastService {
  constructor() {
    this.toast = signal(null);
    this.timer = null;
  }
  show(data) {
    if (this.timer)
      clearTimeout(this.timer);
    this.toast.set(data);
    this.timer = setTimeout(() => this.toast.set(null), data.duration ?? 2400);
  }
  static {
    this.\u0275fac = function ToastService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToastService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ToastService
};
//# sourceMappingURL=chunk-JUVU2L4V.js.map
