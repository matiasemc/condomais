import {
  MessageService
} from "./chunk-TF4WZQI6.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-NH5B5NLZ.js";

// apps/porteiro/src/app/core/toast.service.ts
var ToastService = class _ToastService {
  constructor() {
    this.messageService = inject(MessageService);
  }
  show(data) {
    this.messageService.add({
      severity: mapSeverity(data.type),
      detail: data.message,
      life: data.duration ?? 2400
    });
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
function mapSeverity(type) {
  if (type === "error")
    return "error";
  if (type === "warn")
    return "warn";
  if (type === "success")
    return "success";
  return "info";
}

export {
  ToastService
};
//# sourceMappingURL=chunk-JPM7X6WV.js.map
