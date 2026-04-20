import {
  ToastService
} from "./chunk-JUVU2L4V.js";
import {
  ToastComponent
} from "./chunk-7CWI5AJD.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-C54MFYDF.js";
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-JLUHEVQX.js";

// apps/porteiro/src/app/layout/sidebar/sidebar.component.ts
var _forTrack0 = ($index, $item) => $item.path;
function SidebarComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6);
    \u0275\u0275element(1, "span", 9);
    \u0275\u0275elementStart(2, "span", 10);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r1.path);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", item_r1.icon, \u0275\u0275sanitizeHtml);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
var SidebarComponent = class _SidebarComponent {
  constructor() {
    this.items = [
      { path: "/home", label: "Painel", icon: dashIcon },
      { path: "/moradores", label: "Moradores", icon: usersIcon },
      { path: "/entregas", label: "Entregas", icon: pkgIcon },
      { path: "/avisos", label: "Avisos", icon: bellIcon },
      { path: "/ocorrencias", label: "Ocorrencias", icon: alertIcon }
    ];
  }
  static {
    this.\u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["cm-sidebar"]], decls: 18, vars: 0, consts: [[1, "sidebar"], [1, "sidebar__brand"], [1, "sidebar__logo"], [1, "sidebar__name"], [1, "sidebar__role"], [1, "sidebar__nav"], ["routerLinkActive", "sidebar__item--active", 1, "sidebar__item", 3, "routerLink"], [1, "sidebar__footer"], ["href", "http://localhost:4200", "target", "_blank", 1, "sidebar__item", "sidebar__item--muted"], [1, "sidebar__icon", 3, "innerHTML"], [1, "sidebar__label"]], template: function SidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "span", 2);
        \u0275\u0275text(3, "CM");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div")(5, "p", 3);
        \u0275\u0275text(6, "Condomais");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p", 4);
        \u0275\u0275text(8, "Portaria");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "nav", 5);
        \u0275\u0275repeaterCreate(10, SidebarComponent_For_11_Template, 4, 3, "a", 6, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 7)(13, "a", 8)(14, "span");
        \u0275\u0275text(15, "\u{1F3E0}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span");
        \u0275\u0275text(17, "App morador");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.items);
      }
    }, dependencies: [RouterLink, RouterLinkActive], styles: ["\n\n.sidebar[_ngcontent-%COMP%] {\n  width: 240px;\n  height: 100dvh;\n  background: var(--c-bg-raised);\n  border-right: 1px solid var(--c-border);\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n}\n.sidebar__brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-5) var(--s-5) var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n}\n.sidebar__logo[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--r-sm);\n  background: var(--c-accent);\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-serif);\n  font-size: 14px;\n}\n.sidebar__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  margin: 0;\n}\n.sidebar__role[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.sidebar__nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--s-4) var(--s-3);\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.sidebar__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-3) var(--s-3);\n  border-radius: var(--r-sm);\n  text-decoration: none;\n  color: var(--c-text-muted);\n  font-size: 14px;\n  font-weight: 500;\n  transition: all var(--t-fast);\n}\n.sidebar__item[_ngcontent-%COMP%]:hover {\n  background: var(--c-card-muted);\n  color: var(--c-text);\n}\n.sidebar__item--active[_ngcontent-%COMP%] {\n  background: var(--c-accent-soft);\n  color: var(--c-accent-dark);\n  font-weight: 600;\n}\n.sidebar__item--muted[_ngcontent-%COMP%] {\n  color: var(--c-text-faint);\n  font-size: 13px;\n}\n.sidebar__icon[_ngcontent-%COMP%] {\n  display: flex;\n  flex-shrink: 0;\n}\n.sidebar__footer[_ngcontent-%COMP%] {\n  padding: var(--s-4) var(--s-3);\n  border-top: 1px solid var(--c-border);\n}\n/*# sourceMappingURL=sidebar.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "cm-sidebar", standalone: true, imports: [RouterLink, RouterLinkActive], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <aside class="sidebar">
      <div class="sidebar__brand">
        <span class="sidebar__logo">CM</span>
        <div>
          <p class="sidebar__name">Condomais</p>
          <p class="sidebar__role">Portaria</p>
        </div>
      </div>
      <nav class="sidebar__nav">
        @for (item of items; track item.path) {
          <a class="sidebar__item" [routerLink]="item.path"
             routerLinkActive="sidebar__item--active">
            <span class="sidebar__icon" [innerHTML]="item.icon"></span>
            <span class="sidebar__label">{{ item.label }}</span>
          </a>
        }
      </nav>
      <div class="sidebar__footer">
        <a class="sidebar__item sidebar__item--muted" href="http://localhost:4200" target="_blank">
          <span>\u{1F3E0}</span>
          <span>App morador</span>
        </a>
      </div>
    </aside>
  `, styles: ["/* apps/porteiro/src/app/layout/sidebar/sidebar.component.scss */\n.sidebar {\n  width: 240px;\n  height: 100dvh;\n  background: var(--c-bg-raised);\n  border-right: 1px solid var(--c-border);\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n}\n.sidebar__brand {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-5) var(--s-5) var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n}\n.sidebar__logo {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--r-sm);\n  background: var(--c-accent);\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-serif);\n  font-size: 14px;\n}\n.sidebar__name {\n  font-weight: 700;\n  font-size: 14px;\n  margin: 0;\n}\n.sidebar__role {\n  font-size: 11px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.sidebar__nav {\n  flex: 1;\n  padding: var(--s-4) var(--s-3);\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.sidebar__item {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-3) var(--s-3);\n  border-radius: var(--r-sm);\n  text-decoration: none;\n  color: var(--c-text-muted);\n  font-size: 14px;\n  font-weight: 500;\n  transition: all var(--t-fast);\n}\n.sidebar__item:hover {\n  background: var(--c-card-muted);\n  color: var(--c-text);\n}\n.sidebar__item--active {\n  background: var(--c-accent-soft);\n  color: var(--c-accent-dark);\n  font-weight: 600;\n}\n.sidebar__item--muted {\n  color: var(--c-text-faint);\n  font-size: 13px;\n}\n.sidebar__icon {\n  display: flex;\n  flex-shrink: 0;\n}\n.sidebar__footer {\n  padding: var(--s-4) var(--s-3);\n  border-top: 1px solid var(--c-border);\n}\n/*# sourceMappingURL=sidebar.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "apps/porteiro/src/app/layout/sidebar/sidebar.component.ts", lineNumber: 39 });
})();
var dashIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`;
var usersIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
var pkgIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5L12 12l9-4.5"/><line x1="12" y1="12" x2="12" y2="21"/></svg>`;
var bellIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
var alertIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;

// apps/porteiro/src/app/layout/bottom-nav/bottom-nav.component.ts
var BottomNavComponent = class _BottomNavComponent {
  static {
    this.\u0275fac = function BottomNavComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BottomNavComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BottomNavComponent, selectors: [["cm-bottom-nav"]], decls: 27, vars: 0, consts: [[1, "bottom-nav"], ["routerLink", "/home", "routerLinkActive", "bottom-nav__item--active", 1, "bottom-nav__item"], ["width", "22", "height", "22", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.75", "stroke-linecap", "round"], ["x", "3", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "3", "width", "7", "height", "7"], ["x", "3", "y", "14", "width", "7", "height", "7"], ["x", "14", "y", "14", "width", "7", "height", "7"], ["routerLink", "/moradores", "routerLinkActive", "bottom-nav__item--active", 1, "bottom-nav__item"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["routerLink", "/entregas", "routerLinkActive", "bottom-nav__item--active", 1, "bottom-nav__item"], ["d", "M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z"], ["d", "M3 7.5L12 12l9-4.5"], ["routerLink", "/ocorrencias", "routerLinkActive", "bottom-nav__item--active", 1, "bottom-nav__item"], ["d", "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"]], template: function BottomNavComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "nav", 0)(1, "a", 1);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(2, "svg", 2);
        \u0275\u0275element(3, "rect", 3)(4, "rect", 4)(5, "rect", 5)(6, "rect", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(7, "span");
        \u0275\u0275text(8, "Painel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "a", 7);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(10, "svg", 2);
        \u0275\u0275element(11, "path", 8)(12, "circle", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(13, "span");
        \u0275\u0275text(14, "Moradores");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "a", 10);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(16, "svg", 2);
        \u0275\u0275element(17, "path", 11)(18, "path", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(19, "span");
        \u0275\u0275text(20, "Entregas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "a", 13);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(22, "svg", 2);
        \u0275\u0275element(23, "path", 14)(24, "line", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(25, "span");
        \u0275\u0275text(26, "Ocorrencias");
        \u0275\u0275elementEnd()()();
      }
    }, dependencies: [RouterLink, RouterLinkActive], styles: ["\n\n.bottom-nav[_ngcontent-%COMP%] {\n  display: flex;\n  background: var(--c-bg-raised);\n  border-top: 1px solid var(--c-border);\n  padding: var(--s-2) 0;\n  padding-bottom: calc(var(--s-2) + env(safe-area-inset-bottom));\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 100;\n}\n.bottom-nav__item[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 3px;\n  padding: var(--s-2) 0;\n  text-decoration: none;\n  color: var(--c-text-faint);\n  font-size: 10px;\n  font-weight: 500;\n  transition: color var(--t-fast);\n}\n.bottom-nav__item--active[_ngcontent-%COMP%] {\n  color: var(--c-accent);\n}\n/*# sourceMappingURL=bottom-nav.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BottomNavComponent, [{
    type: Component,
    args: [{ selector: "cm-bottom-nav", standalone: true, imports: [RouterLink, RouterLinkActive], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <nav class="bottom-nav">
      <a class="bottom-nav__item" routerLink="/home"        routerLinkActive="bottom-nav__item--active">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <span>Painel</span>
      </a>
      <a class="bottom-nav__item" routerLink="/moradores"   routerLinkActive="bottom-nav__item--active">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        <span>Moradores</span>
      </a>
      <a class="bottom-nav__item" routerLink="/entregas"    routerLinkActive="bottom-nav__item--active">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5L12 12l9-4.5"/></svg>
        <span>Entregas</span>
      </a>
      <a class="bottom-nav__item" routerLink="/ocorrencias" routerLinkActive="bottom-nav__item--active">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>
        <span>Ocorrencias</span>
      </a>
    </nav>
  `, styles: ["/* apps/porteiro/src/app/layout/bottom-nav/bottom-nav.component.scss */\n.bottom-nav {\n  display: flex;\n  background: var(--c-bg-raised);\n  border-top: 1px solid var(--c-border);\n  padding: var(--s-2) 0;\n  padding-bottom: calc(var(--s-2) + env(safe-area-inset-bottom));\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 100;\n}\n.bottom-nav__item {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 3px;\n  padding: var(--s-2) 0;\n  text-decoration: none;\n  color: var(--c-text-faint);\n  font-size: 10px;\n  font-weight: 500;\n  transition: color var(--t-fast);\n}\n.bottom-nav__item--active {\n  color: var(--c-accent);\n}\n/*# sourceMappingURL=bottom-nav.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BottomNavComponent, { className: "BottomNavComponent", filePath: "apps/porteiro/src/app/layout/bottom-nav/bottom-nav.component.ts", lineNumber: 31 });
})();

// apps/porteiro/src/app/layout/app-shell/app-shell.component.ts
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppShellComponent, selectors: [["cm-app-shell"]], decls: 6, vars: 1, consts: [[1, "shell"], [1, "shell__sidebar"], [1, "shell__main"], [1, "shell__bottom-nav"], [3, "toast"]], template: function AppShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "cm-sidebar", 1);
        \u0275\u0275elementStart(2, "main", 2);
        \u0275\u0275element(3, "router-outlet");
        \u0275\u0275elementEnd();
        \u0275\u0275element(4, "cm-bottom-nav", 3)(5, "cm-toast", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("toast", ctx.toastSvc.toast());
      }
    }, dependencies: [RouterOutlet, SidebarComponent, BottomNavComponent, ToastComponent], styles: ["\n\n.shell[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100dvh;\n  background: var(--c-bg);\n}\n.shell__sidebar[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (min-width: 900px) {\n  .shell__sidebar[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n.shell__main[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  -webkit-overflow-scrolling: touch;\n}\n.shell__bottom-nav[_ngcontent-%COMP%] {\n  display: flex;\n}\n@media (min-width: 900px) {\n  .shell__bottom-nav[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 899px) {\n  .shell[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .shell__main[_ngcontent-%COMP%] {\n    padding-bottom: 72px;\n  }\n}\n/*# sourceMappingURL=app-shell.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppShellComponent, [{
    type: Component,
    args: [{ selector: "cm-app-shell", standalone: true, imports: [RouterOutlet, SidebarComponent, BottomNavComponent, ToastComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="shell">
      <cm-sidebar class="shell__sidebar"></cm-sidebar>
      <main class="shell__main">
        <router-outlet></router-outlet>
      </main>
      <cm-bottom-nav class="shell__bottom-nav"></cm-bottom-nav>
      <cm-toast [toast]="toastSvc.toast()"></cm-toast>
    </div>
  `, styles: ["/* apps/porteiro/src/app/layout/app-shell/app-shell.component.scss */\n.shell {\n  display: flex;\n  height: 100dvh;\n  background: var(--c-bg);\n}\n.shell__sidebar {\n  display: none;\n}\n@media (min-width: 900px) {\n  .shell__sidebar {\n    display: flex;\n  }\n}\n.shell__main {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  -webkit-overflow-scrolling: touch;\n}\n.shell__bottom-nav {\n  display: flex;\n}\n@media (min-width: 900px) {\n  .shell__bottom-nav {\n    display: none;\n  }\n}\n@media (max-width: 899px) {\n  .shell {\n    flex-direction: column;\n  }\n  .shell__main {\n    padding-bottom: 72px;\n  }\n}\n/*# sourceMappingURL=app-shell.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppShellComponent, { className: "AppShellComponent", filePath: "apps/porteiro/src/app/layout/app-shell/app-shell.component.ts", lineNumber: 25 });
})();

export {
  AppShellComponent
};
//# sourceMappingURL=chunk-HSW3D7PD.js.map
