import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-22JHDSMV.js";
import {
  ToastService
} from "./chunk-DGSLDQQ5.js";
import {
  ToastComponent
} from "./chunk-VUTJB2DO.js";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QFVHJJPM.js";

// apps/morador/src/app/layout/bottom-nav/bottom-nav.component.ts
var _c0 = (a0) => ({ exact: a0 });
var _forTrack0 = ($index, $item) => $item.path;
function BottomNavComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 1);
    \u0275\u0275element(1, "span", 2);
    \u0275\u0275elementStart(2, "span", 3);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r1.path)("routerLinkActiveOptions", \u0275\u0275pureFunction1(4, _c0, item_r1.path === "/home"));
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", item_r1.icon, \u0275\u0275sanitizeHtml);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
var BottomNavComponent = class _BottomNavComponent {
  constructor() {
    this.items = [
      { path: "/home", label: "In\xEDcio", icon: homeIcon },
      { path: "/entregas", label: "Entregas", icon: packageIcon },
      { path: "/reservas", label: "Reservas", icon: calendarIcon },
      { path: "/marketplace", label: "Mercado", icon: shopIcon },
      { path: "/perfil", label: "Perfil", icon: userIcon }
    ];
  }
  static {
    this.\u0275fac = function BottomNavComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BottomNavComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BottomNavComponent, selectors: [["cm-bottom-nav"]], decls: 3, vars: 0, consts: [[1, "bottom-nav"], ["routerLinkActive", "bottom-nav__item--active", 1, "bottom-nav__item", 3, "routerLink", "routerLinkActiveOptions"], [1, "bottom-nav__icon", 3, "innerHTML"], [1, "bottom-nav__label"]], template: function BottomNavComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "nav", 0);
        \u0275\u0275repeaterCreate(1, BottomNavComponent_For_2_Template, 4, 6, "a", 1, _forTrack0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.items);
      }
    }, dependencies: [RouterLink, RouterLinkActive], styles: ["\n\n.bottom-nav[_ngcontent-%COMP%] {\n  display: flex;\n  background: var(--c-bg-raised);\n  border-top: 1px solid var(--c-border);\n  padding: var(--s-2) 0;\n  padding-bottom: calc(var(--s-2) + env(safe-area-inset-bottom));\n}\n.bottom-nav__item[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 3px;\n  padding: var(--s-2) 0;\n  text-decoration: none;\n  color: var(--c-text-faint);\n  transition: color var(--t-fast);\n}\n.bottom-nav__item--active[_ngcontent-%COMP%] {\n  color: var(--c-accent);\n}\n.bottom-nav__icon[_ngcontent-%COMP%] {\n  display: flex;\n}\n.bottom-nav__label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.2px;\n}\n/*# sourceMappingURL=bottom-nav.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BottomNavComponent, [{
    type: Component,
    args: [{ selector: "cm-bottom-nav", standalone: true, imports: [RouterLink, RouterLinkActive], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <nav class="bottom-nav">
      @for (item of items; track item.path) {
        <a class="bottom-nav__item" [routerLink]="item.path"
           routerLinkActive="bottom-nav__item--active"
           [routerLinkActiveOptions]="{ exact: item.path === '/home' }">
          <span class="bottom-nav__icon" [innerHTML]="item.icon"></span>
          <span class="bottom-nav__label">{{ item.label }}</span>
        </a>
      }
    </nav>
  `, styles: ["/* apps/morador/src/app/layout/bottom-nav/bottom-nav.component.scss */\n.bottom-nav {\n  display: flex;\n  background: var(--c-bg-raised);\n  border-top: 1px solid var(--c-border);\n  padding: var(--s-2) 0;\n  padding-bottom: calc(var(--s-2) + env(safe-area-inset-bottom));\n}\n.bottom-nav__item {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 3px;\n  padding: var(--s-2) 0;\n  text-decoration: none;\n  color: var(--c-text-faint);\n  transition: color var(--t-fast);\n}\n.bottom-nav__item--active {\n  color: var(--c-accent);\n}\n.bottom-nav__icon {\n  display: flex;\n}\n.bottom-nav__label {\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.2px;\n}\n/*# sourceMappingURL=bottom-nav.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BottomNavComponent, { className: "BottomNavComponent", filePath: "apps/morador/src/app/layout/bottom-nav/bottom-nav.component.ts", lineNumber: 25 });
})();
var homeIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
var packageIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5L12 12l9-4.5"/><line x1="12" y1="12" x2="12" y2="21"/></svg>`;
var calendarIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
var shopIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`;
var userIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

// apps/morador/src/app/layout/app-shell/app-shell.component.ts
var AppShellComponent = class _AppShellComponent {
  constructor() {
    this.toastSvc = inject(ToastService);
  }
  static {
    this.\u0275fac = function AppShellComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppShellComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppShellComponent, selectors: [["cm-app-shell"]], decls: 5, vars: 1, consts: [[1, "shell"], [1, "shell__content"], [3, "toast"]], template: function AppShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "main", 1);
        \u0275\u0275element(2, "router-outlet");
        \u0275\u0275elementEnd();
        \u0275\u0275element(3, "cm-bottom-nav")(4, "cm-toast", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("toast", ctx.toastSvc.toast());
      }
    }, dependencies: [RouterOutlet, BottomNavComponent, ToastComponent], styles: ["\n\n.shell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100dvh;\n  max-width: 430px;\n  margin: 0 auto;\n  background: var(--c-bg);\n  position: relative;\n  overflow: hidden;\n}\n.shell__content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  -webkit-overflow-scrolling: touch;\n}\n/*# sourceMappingURL=app-shell.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppShellComponent, [{
    type: Component,
    args: [{ selector: "cm-app-shell", standalone: true, imports: [RouterOutlet, BottomNavComponent, ToastComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="shell">
      <main class="shell__content">
        <router-outlet></router-outlet>
      </main>
      <cm-bottom-nav></cm-bottom-nav>
      <cm-toast [toast]="toastSvc.toast()"></cm-toast>
    </div>
  `, styles: ["/* apps/morador/src/app/layout/app-shell/app-shell.component.scss */\n.shell {\n  display: flex;\n  flex-direction: column;\n  height: 100dvh;\n  max-width: 430px;\n  margin: 0 auto;\n  background: var(--c-bg);\n  position: relative;\n  overflow: hidden;\n}\n.shell__content {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  -webkit-overflow-scrolling: touch;\n}\n/*# sourceMappingURL=app-shell.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppShellComponent, { className: "AppShellComponent", filePath: "apps/morador/src/app/layout/app-shell/app-shell.component.ts", lineNumber: 23 });
})();

export {
  AppShellComponent
};
//# sourceMappingURL=chunk-OB4LSDPH.js.map
