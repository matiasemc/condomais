import {
  RouterLink
} from "./chunk-22JHDSMV.js";
import {
  AvatarComponent,
  BadgeComponent,
  ButtonComponent
} from "./chunk-VUTJB2DO.js";
import "./chunk-RE6VNHJT.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-QFVHJJPM.js";

// apps/morador/src/app/features/profile/profile.component.ts
var ProfileComponent = class _ProfileComponent {
  sair() {
    localStorage.removeItem("cm_logged");
    window.location.href = "/login";
  }
  static {
    this.\u0275fac = function ProfileComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProfileComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["cm-profile"]], decls: 30, vars: 1, consts: [[1, "page"], [1, "profile-header"], ["name", "Joao Silva", "color", "#E8D5C4", 3, "size"], [1, "profile-header__name"], [1, "profile-header__apto"], ["variant", "accent"], [1, "section"], [1, "section__label"], [1, "menu-list"], ["routerLink", "/integracoes", 1, "menu-row"], [1, "menu-row__icon"], [1, "menu-row__label"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M9 18l6-6-6-6"], ["routerLink", "/notificacoes", 1, "menu-row"], ["variant", "ghost", "size", "md", 2, "width", "100%", 3, "clicked"]], template: function ProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "cm-avatar", 2);
        \u0275\u0275elementStart(3, "h1", 3);
        \u0275\u0275text(4, "Joao Silva");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "Apto 1204 - Torre B");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "cm-badge", 5);
        \u0275\u0275text(8, "Morador");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 6)(10, "p", 7);
        \u0275\u0275text(11, "Conta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 8)(13, "a", 9)(14, "span", 10);
        \u0275\u0275text(15, "\u{1F517}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 11);
        \u0275\u0275text(17, "Integracoes Google");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(18, "svg", 12);
        \u0275\u0275element(19, "path", 13);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(20, "a", 14)(21, "span", 10);
        \u0275\u0275text(22, "\u{1F514}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span", 11);
        \u0275\u0275text(24, "Notificacoes");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(25, "svg", 12);
        \u0275\u0275element(26, "path", 13);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(27, "div", 6)(28, "cm-button", 15);
        \u0275\u0275listener("clicked", function ProfileComponent_Template_cm_button_clicked_28_listener() {
          return ctx.sair();
        });
        \u0275\u0275text(29, "Sair da conta");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275property("size", 72);
      }
    }, dependencies: [RouterLink, AvatarComponent, ButtonComponent, BadgeComponent], styles: ["\n\n.page[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.profile-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-8) var(--s-5) var(--s-6);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.profile-header__name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  margin: 0;\n}\n.profile-header__apto[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.section[_ngcontent-%COMP%] {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.section__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.menu-list[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n  border: 1px solid var(--c-border);\n}\n.menu-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n  text-decoration: none;\n  color: var(--c-text);\n  cursor: pointer;\n  transition: background var(--t-fast);\n}\n.menu-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.menu-row[_ngcontent-%COMP%]:active {\n  background: var(--c-card-muted);\n}\n.menu-row__icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.menu-row__label[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 14px;\n}\n/*# sourceMappingURL=profile.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileComponent, [{
    type: Component,
    args: [{ selector: "cm-profile", standalone: true, imports: [RouterLink, AvatarComponent, ButtonComponent, BadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: '<div class="page">\n  <div class="profile-header">\n    <cm-avatar name="Joao Silva" [size]="72" color="#E8D5C4"></cm-avatar>\n    <h1 class="profile-header__name">Joao Silva</h1>\n    <p class="profile-header__apto">Apto 1204 - Torre B</p>\n    <cm-badge variant="accent">Morador</cm-badge>\n  </div>\n  <div class="section">\n    <p class="section__label">Conta</p>\n    <div class="menu-list">\n      <a class="menu-row" routerLink="/integracoes">\n        <span class="menu-row__icon">\u{1F517}</span>\n        <span class="menu-row__label">Integracoes Google</span>\n        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>\n      </a>\n      <a class="menu-row" routerLink="/notificacoes">\n        <span class="menu-row__icon">\u{1F514}</span>\n        <span class="menu-row__label">Notificacoes</span>\n        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>\n      </a>\n    </div>\n  </div>\n  <div class="section">\n    <cm-button variant="ghost" size="md" style="width:100%" (clicked)="sair()">Sair da conta</cm-button>\n  </div>\n</div>', styles: ["/* apps/morador/src/app/features/profile/profile.component.scss */\n.page {\n  min-height: 100%;\n  padding-bottom: 80px;\n}\n.profile-header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-8) var(--s-5) var(--s-6);\n  background: var(--c-bg-raised);\n  border-bottom: 1px solid var(--c-border);\n}\n.profile-header__name {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  margin: 0;\n}\n.profile-header__apto {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.section {\n  padding: var(--s-5);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.section__label {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.menu-list {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  overflow: hidden;\n  border: 1px solid var(--c-border);\n}\n.menu-row {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n  text-decoration: none;\n  color: var(--c-text);\n  cursor: pointer;\n  transition: background var(--t-fast);\n}\n.menu-row:last-child {\n  border-bottom: none;\n}\n.menu-row:active {\n  background: var(--c-card-muted);\n}\n.menu-row__icon {\n  font-size: 18px;\n}\n.menu-row__label {\n  flex: 1;\n  font-size: 14px;\n}\n/*# sourceMappingURL=profile.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "apps/morador/src/app/features/profile/profile.component.ts", lineNumber: 15 });
})();
export {
  ProfileComponent
};
//# sourceMappingURL=chunk-6GS7R3DC.js.map
