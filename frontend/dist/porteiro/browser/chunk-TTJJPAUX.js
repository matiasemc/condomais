import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-PSJDYNQK.js";
import {
  CommonModule
} from "./chunk-DRD3LIJU.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  computed,
  input,
  model,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-NH5B5NLZ.js";

// libs/ui/src/lib/components/button/button.component.ts
var _c0 = ["*"];
var ButtonComponent = class _ButtonComponent {
  constructor() {
    this.variant = input("primary", ...ngDevMode ? [{ debugName: "variant" }] : (
      /* istanbul ignore next */
      []
    ));
    this.size = input("md", ...ngDevMode ? [{ debugName: "size" }] : (
      /* istanbul ignore next */
      []
    ));
    this.disabled = input(false, ...ngDevMode ? [{ debugName: "disabled" }] : (
      /* istanbul ignore next */
      []
    ));
    this.type = input("button", ...ngDevMode ? [{ debugName: "type" }] : (
      /* istanbul ignore next */
      []
    ));
    this.clicked = output();
  }
  get classes() {
    return ["btn", `btn--${this.variant()}`, `btn--${this.size()}`].join(" ");
  }
  static {
    this.\u0275fac = function ButtonComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ButtonComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ButtonComponent, selectors: [["cm-button"]], inputs: { variant: [1, "variant"], size: [1, "size"], disabled: [1, "disabled"], type: [1, "type"] }, outputs: { clicked: "clicked" }, ngContentSelectors: _c0, decls: 2, vars: 4, consts: [[3, "click", "disabled", "type"]], template: function ButtonComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domElementStart(0, "button", 0);
        \u0275\u0275domListener("click", function ButtonComponent_Template_button_click_0_listener($event) {
          return ctx.clicked.emit($event);
        });
        \u0275\u0275projection(1);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.classes);
        \u0275\u0275domProperty("disabled", ctx.disabled())("type", ctx.type());
      }
    }, dependencies: [CommonModule], styles: ["\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--s-2);\n  border: none;\n  cursor: pointer;\n  font-family: var(--font-sans);\n  font-weight: 600;\n  letter-spacing: -0.1px;\n  border-radius: var(--r-pill);\n  transition: opacity var(--t-fast), transform var(--t-fast);\n  white-space: nowrap;\n}\n.btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.btn--sm[_ngcontent-%COMP%] {\n  height: 36px;\n  padding: 0 var(--s-4);\n  font-size: 13px;\n}\n.btn--md[_ngcontent-%COMP%] {\n  height: 46px;\n  padding: 0 var(--s-5);\n  font-size: 14px;\n}\n.btn--lg[_ngcontent-%COMP%] {\n  height: 54px;\n  padding: 0 var(--s-6);\n  font-size: 15px;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: var(--c-text);\n  color: var(--c-bg);\n}\n.btn--accent[_ngcontent-%COMP%] {\n  background: var(--c-accent);\n  color: #fff;\n  box-shadow: var(--sh-accent);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--c-text);\n  border: 1px solid var(--c-border-strong);\n}\n.btn--soft[_ngcontent-%COMP%] {\n  background: var(--c-card-muted);\n  color: var(--c-text);\n}\n.btn--whatsapp[_ngcontent-%COMP%] {\n  background: var(--c-whatsapp);\n  color: #fff;\n}\n/*# sourceMappingURL=button.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonComponent, [{
    type: Component,
    args: [{ selector: "cm-button", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <button
      [class]="classes"
      [disabled]="disabled()"
      [type]="type()"
      (click)="clicked.emit($event)">
      <ng-content></ng-content>
    </button>
  `, styles: ["/* libs/ui/src/lib/components/button/button.component.css */\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--s-2);\n  border: none;\n  cursor: pointer;\n  font-family: var(--font-sans);\n  font-weight: 600;\n  letter-spacing: -0.1px;\n  border-radius: var(--r-pill);\n  transition: opacity var(--t-fast), transform var(--t-fast);\n  white-space: nowrap;\n}\n.btn:active {\n  transform: scale(0.97);\n}\n.btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.btn--sm {\n  height: 36px;\n  padding: 0 var(--s-4);\n  font-size: 13px;\n}\n.btn--md {\n  height: 46px;\n  padding: 0 var(--s-5);\n  font-size: 14px;\n}\n.btn--lg {\n  height: 54px;\n  padding: 0 var(--s-6);\n  font-size: 15px;\n}\n.btn--primary {\n  background: var(--c-text);\n  color: var(--c-bg);\n}\n.btn--accent {\n  background: var(--c-accent);\n  color: #fff;\n  box-shadow: var(--sh-accent);\n}\n.btn--ghost {\n  background: transparent;\n  color: var(--c-text);\n  border: 1px solid var(--c-border-strong);\n}\n.btn--soft {\n  background: var(--c-card-muted);\n  color: var(--c-text);\n}\n.btn--whatsapp {\n  background: var(--c-whatsapp);\n  color: #fff;\n}\n/*# sourceMappingURL=button.component.css.map */\n"] }]
  }], null, { variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], type: [{ type: Input, args: [{ isSignal: true, alias: "type", required: false }] }], clicked: [{ type: Output, args: ["clicked"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ButtonComponent, { className: "ButtonComponent", filePath: "libs/ui/src/lib/components/button/button.component.ts", lineNumber: 23 });
})();

// libs/ui/src/lib/components/badge/badge.component.ts
var _c02 = ["*"];
var BadgeComponent = class _BadgeComponent {
  constructor() {
    this.variant = input("neutral", ...ngDevMode ? [{ debugName: "variant" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.\u0275fac = function BadgeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BadgeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BadgeComponent, selectors: [["cm-badge"]], inputs: { variant: [1, "variant"] }, ngContentSelectors: _c02, decls: 2, vars: 2, template: function BadgeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domElementStart(0, "span");
        \u0275\u0275projection(1);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classMap("badge badge--" + ctx.variant());
      }
    }, dependencies: [CommonModule], styles: ["\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-1);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.2px;\n  text-transform: uppercase;\n  padding: 4px var(--s-2);\n  border-radius: var(--r-pill);\n}\n.badge--neutral[_ngcontent-%COMP%] {\n  background: var(--c-card-muted);\n  color: var(--c-text-muted);\n}\n.badge--accent[_ngcontent-%COMP%] {\n  background: var(--c-accent-soft);\n  color: var(--c-accent-dark);\n}\n.badge--success[_ngcontent-%COMP%] {\n  background: var(--c-success-soft);\n  color: var(--c-success);\n}\n.badge--warn[_ngcontent-%COMP%] {\n  background: var(--c-warn-soft);\n  color: var(--c-warn);\n}\n.badge--warning[_ngcontent-%COMP%] {\n  background: var(--c-warn-soft);\n  color: var(--c-warn);\n}\n.badge--danger[_ngcontent-%COMP%] {\n  background: rgba(192, 57, 43, 0.1);\n  color: var(--c-danger);\n}\n/*# sourceMappingURL=badge.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeComponent, [{
    type: Component,
    args: [{ selector: "cm-badge", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<span [class]="'badge badge--' + variant()"><ng-content></ng-content></span>`, styles: ["/* libs/ui/src/lib/components/badge/badge.component.css */\n.badge {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--s-1);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.2px;\n  text-transform: uppercase;\n  padding: 4px var(--s-2);\n  border-radius: var(--r-pill);\n}\n.badge--neutral {\n  background: var(--c-card-muted);\n  color: var(--c-text-muted);\n}\n.badge--accent {\n  background: var(--c-accent-soft);\n  color: var(--c-accent-dark);\n}\n.badge--success {\n  background: var(--c-success-soft);\n  color: var(--c-success);\n}\n.badge--warn {\n  background: var(--c-warn-soft);\n  color: var(--c-warn);\n}\n.badge--warning {\n  background: var(--c-warn-soft);\n  color: var(--c-warn);\n}\n.badge--danger {\n  background: rgba(192, 57, 43, 0.1);\n  color: var(--c-danger);\n}\n/*# sourceMappingURL=badge.component.css.map */\n"] }]
  }], null, { variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BadgeComponent, { className: "BadgeComponent", filePath: "libs/ui/src/lib/components/badge/badge.component.ts", lineNumber: 14 });
})();

// libs/ui/src/lib/components/kpi-card/kpi-card.component.ts
var KpiCardComponent = class _KpiCardComponent {
  constructor() {
    this.label = input.required(...ngDevMode ? [{ debugName: "label" }] : (
      /* istanbul ignore next */
      []
    ));
    this.value = input.required(...ngDevMode ? [{ debugName: "value" }] : (
      /* istanbul ignore next */
      []
    ));
    this.inverted = input(false, ...ngDevMode ? [{ debugName: "inverted" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.\u0275fac = function KpiCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _KpiCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KpiCardComponent, selectors: [["cm-kpi-card"]], inputs: { label: [1, "label"], value: [1, "value"], inverted: [1, "inverted"] }, decls: 5, vars: 4, consts: [[1, "kpi__label"], [1, "kpi__value"]], template: function KpiCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div")(1, "div", 0);
        \u0275\u0275text(2);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(3, "div", 1);
        \u0275\u0275text(4);
        \u0275\u0275domElementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classMap("kpi" + (ctx.inverted() ? " kpi--inverted" : ""));
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.label());
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.value());
      }
    }, styles: ["\n.kpi[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-md);\n  padding: var(--s-4) var(--s-5);\n}\n.kpi__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  opacity: 0.7;\n  color: var(--c-text-muted);\n}\n.kpi__value[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 38px;\n  line-height: 1.05;\n  margin-top: var(--s-2);\n  letter-spacing: -0.7px;\n  color: var(--c-text);\n}\n.kpi--inverted[_ngcontent-%COMP%] {\n  background: var(--c-text);\n  border-color: transparent;\n}\n.kpi--inverted[_ngcontent-%COMP%]   .kpi__label[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n}\n.kpi--inverted[_ngcontent-%COMP%]   .kpi__value[_ngcontent-%COMP%] {\n  color: var(--c-bg);\n}\n/*# sourceMappingURL=kpi-card.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KpiCardComponent, [{
    type: Component,
    args: [{ selector: "cm-kpi-card", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div [class]="'kpi' + (inverted() ? ' kpi--inverted' : '')">
      <div class="kpi__label">{{ label() }}</div>
      <div class="kpi__value">{{ value() }}</div>
    </div>
  `, styles: ["/* libs/ui/src/lib/components/kpi-card/kpi-card.component.css */\n.kpi {\n  background: var(--c-card);\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-md);\n  padding: var(--s-4) var(--s-5);\n}\n.kpi__label {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  opacity: 0.7;\n  color: var(--c-text-muted);\n}\n.kpi__value {\n  font-family: var(--font-serif);\n  font-size: 38px;\n  line-height: 1.05;\n  margin-top: var(--s-2);\n  letter-spacing: -0.7px;\n  color: var(--c-text);\n}\n.kpi--inverted {\n  background: var(--c-text);\n  border-color: transparent;\n}\n.kpi--inverted .kpi__label {\n  color: rgba(255, 255, 255, 0.7);\n}\n.kpi--inverted .kpi__value {\n  color: var(--c-bg);\n}\n/*# sourceMappingURL=kpi-card.component.css.map */\n"] }]
  }], null, { label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: true }] }], value: [{ type: Input, args: [{ isSignal: true, alias: "value", required: true }] }], inverted: [{ type: Input, args: [{ isSignal: true, alias: "inverted", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KpiCardComponent, { className: "KpiCardComponent", filePath: "libs/ui/src/lib/components/kpi-card/kpi-card.component.ts", lineNumber: 15 });
})();

// libs/ui/src/lib/components/list-row/list-row.component.ts
var _c03 = [[["", "slot", "end"]]];
var _c1 = ["[slot=end]"];
function ListRowComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1);
    \u0275\u0275domElement(1, "span", 6);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275domProperty("innerHTML", ctx_r0.icon(), \u0275\u0275sanitizeHtml);
  }
}
function ListRowComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle());
  }
}
function ListRowComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "svg", 5);
    \u0275\u0275domElement(1, "path", 7);
    \u0275\u0275domElementEnd();
  }
}
var ListRowComponent = class _ListRowComponent {
  constructor() {
    this.title = input.required(...ngDevMode ? [{ debugName: "title" }] : (
      /* istanbul ignore next */
      []
    ));
    this.subtitle = input("", ...ngDevMode ? [{ debugName: "subtitle" }] : (
      /* istanbul ignore next */
      []
    ));
    this.icon = input("", ...ngDevMode ? [{ debugName: "icon" }] : (
      /* istanbul ignore next */
      []
    ));
    this.clickable = input(false, ...ngDevMode ? [{ debugName: "clickable" }] : (
      /* istanbul ignore next */
      []
    ));
    this.rowClick = output();
  }
  static {
    this.\u0275fac = function ListRowComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ListRowComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListRowComponent, selectors: [["cm-list-row"]], inputs: { title: [1, "title"], subtitle: [1, "subtitle"], icon: [1, "icon"], clickable: [1, "clickable"] }, outputs: { rowClick: "rowClick" }, ngContentSelectors: _c1, decls: 8, vars: 6, consts: [[1, "list-row", 3, "click"], [1, "list-row__icon"], [1, "list-row__body"], [1, "list-row__title"], [1, "list-row__subtitle"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", 1, "list-row__chevron"], [3, "innerHTML"], ["d", "M9 18l6-6-6-6"]], template: function ListRowComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c03);
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275domListener("click", function ListRowComponent_Template_div_click_0_listener() {
          return ctx.rowClick.emit();
        });
        \u0275\u0275conditionalCreate(1, ListRowComponent_Conditional_1_Template, 2, 1, "div", 1);
        \u0275\u0275domElementStart(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4);
        \u0275\u0275domElementEnd();
        \u0275\u0275conditionalCreate(5, ListRowComponent_Conditional_5_Template, 2, 1, "div", 4);
        \u0275\u0275domElementEnd();
        \u0275\u0275projection(6);
        \u0275\u0275conditionalCreate(7, ListRowComponent_Conditional_7_Template, 2, 0, ":svg:svg", 5);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("list-row--clickable", ctx.clickable());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.icon() ? 1 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.title());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.subtitle() ? 5 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.clickable() ? 7 : -1);
      }
    }, dependencies: [CommonModule], styles: ["\n.list-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n}\n.list-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.list-row--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.list-row--clickable[_ngcontent-%COMP%]:hover {\n  background: var(--c-bg);\n}\n.list-row--clickable[_ngcontent-%COMP%]:active {\n  background: var(--c-card-muted);\n}\n.list-row__icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--r-sm);\n  background: var(--c-card-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--c-text-muted);\n  flex-shrink: 0;\n}\n.list-row__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.list-row__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.list-row__subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin-top: 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.list-row__chevron[_ngcontent-%COMP%] {\n  color: var(--c-text-faint);\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=list-row.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListRowComponent, [{
    type: Component,
    args: [{ selector: "cm-list-row", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="list-row" [class.list-row--clickable]="clickable()" (click)="rowClick.emit()">
      @if (icon()) {
        <div class="list-row__icon">
          <span [innerHTML]="icon()"></span>
        </div>
      }
      <div class="list-row__body">
        <div class="list-row__title">{{ title() }}</div>
        @if (subtitle()) {
          <div class="list-row__subtitle">{{ subtitle() }}</div>
        }
      </div>
      <ng-content select="[slot=end]"></ng-content>
      @if (clickable()) {
        <svg class="list-row__chevron" width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      }
    </div>
  `, styles: ["/* libs/ui/src/lib/components/list-row/list-row.component.css */\n.list-row {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  padding: var(--s-4);\n  border-bottom: 1px solid var(--c-border);\n}\n.list-row:last-child {\n  border-bottom: none;\n}\n.list-row--clickable {\n  cursor: pointer;\n}\n.list-row--clickable:hover {\n  background: var(--c-bg);\n}\n.list-row--clickable:active {\n  background: var(--c-card-muted);\n}\n.list-row__icon {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--r-sm);\n  background: var(--c-card-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--c-text-muted);\n  flex-shrink: 0;\n}\n.list-row__body {\n  flex: 1;\n  min-width: 0;\n}\n.list-row__title {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--c-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.list-row__subtitle {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin-top: 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.list-row__chevron {\n  color: var(--c-text-faint);\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=list-row.component.css.map */\n"] }]
  }], null, { title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: true }] }], subtitle: [{ type: Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], icon: [{ type: Input, args: [{ isSignal: true, alias: "icon", required: false }] }], clickable: [{ type: Input, args: [{ isSignal: true, alias: "clickable", required: false }] }], rowClick: [{ type: Output, args: ["rowClick"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListRowComponent, { className: "ListRowComponent", filePath: "libs/ui/src/lib/components/list-row/list-row.component.ts", lineNumber: 33 });
})();

// libs/ui/src/lib/components/avatar/avatar.component.ts
var AvatarComponent = class _AvatarComponent {
  constructor() {
    this.name = input("", ...ngDevMode ? [{ debugName: "name" }] : (
      /* istanbul ignore next */
      []
    ));
    this.color = input("#E8D5C4", ...ngDevMode ? [{ debugName: "color" }] : (
      /* istanbul ignore next */
      []
    ));
    this.size = input(44, ...ngDevMode ? [{ debugName: "size" }] : (
      /* istanbul ignore next */
      []
    ));
    this.initials = computed(() => {
      const parts = this.name().trim().split(" ");
      return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : this.name().slice(0, 2).toUpperCase();
    }, ...ngDevMode ? [{ debugName: "initials" }] : (
      /* istanbul ignore next */
      []
    ));
    this.bgColor = computed(() => this.color(), ...ngDevMode ? [{ debugName: "bgColor" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.\u0275fac = function AvatarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AvatarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AvatarComponent, selectors: [["cm-avatar"]], inputs: { name: [1, "name"], color: [1, "color"], size: [1, "size"] }, decls: 2, vars: 9, consts: [[1, "avatar"]], template: function AvatarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275text(1);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275styleProp("width", ctx.size(), "px")("height", ctx.size(), "px")("font-size", ctx.size() * 0.4, "px")("background", ctx.bgColor());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.initials(), " ");
      }
    }, styles: ["\n.avatar[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-serif);\n  color: #4A2E18;\n  flex-shrink: 0;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*# sourceMappingURL=avatar.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarComponent, [{
    type: Component,
    args: [{ selector: "cm-avatar", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="avatar" [style.width.px]="size()" [style.height.px]="size()"
         [style.fontSize.px]="size() * 0.4" [style.background]="bgColor()">
      {{ initials() }}
    </div>
  `, styles: ["/* libs/ui/src/lib/components/avatar/avatar.component.css */\n.avatar {\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--font-serif);\n  color: #4A2E18;\n  flex-shrink: 0;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*# sourceMappingURL=avatar.component.css.map */\n"] }]
  }], null, { name: [{ type: Input, args: [{ isSignal: true, alias: "name", required: false }] }], color: [{ type: Input, args: [{ isSignal: true, alias: "color", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AvatarComponent, { className: "AvatarComponent", filePath: "libs/ui/src/lib/components/avatar/avatar.component.ts", lineNumber: 15 });
})();

// libs/ui/src/lib/components/search-input/search-input.component.ts
var SearchInputComponent = class _SearchInputComponent {
  constructor() {
    this.placeholder = input("Buscar\xE2\u20AC\xA6", ...ngDevMode ? [{ debugName: "placeholder" }] : (
      /* istanbul ignore next */
      []
    ));
    this.value = model("", ...ngDevMode ? [{ debugName: "value" }] : (
      /* istanbul ignore next */
      []
    ));
    this.valueChange = output();
  }
  static {
    this.\u0275fac = function SearchInputComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SearchInputComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SearchInputComponent, selectors: [["cm-search-input"]], inputs: { placeholder: [1, "placeholder"], value: [1, "value"] }, outputs: { value: "valueChange", valueChange: "valueChange" }, decls: 5, vars: 2, consts: [[1, "search"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.75", "stroke-linecap", "round", 1, "search__icon"], ["cx", "11", "cy", "11", "r", "7"], ["d", "M20 20l-3.5-3.5"], ["type", "search", 1, "search__input", 3, "ngModelChange", "placeholder", "ngModel"]], template: function SearchInputComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(1, "svg", 1);
        \u0275\u0275element(2, "circle", 2)(3, "path", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(4, "input", 4);
        \u0275\u0275twoWayListener("ngModelChange", function SearchInputComponent_Template_input_ngModelChange_4_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.value, $event) || (ctx.value = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function SearchInputComponent_Template_input_ngModelChange_4_listener($event) {
          return ctx.valueChange.emit($event);
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("placeholder", ctx.placeholder());
        \u0275\u0275twoWayProperty("ngModel", ctx.value);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n.search[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  background: var(--c-card);\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-md);\n  padding: var(--s-3) var(--s-4);\n}\n.search__icon[_ngcontent-%COMP%] {\n  color: var(--c-text-muted);\n  flex-shrink: 0;\n}\n.search__input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--c-text);\n  outline: none;\n}\n.search__input[_ngcontent-%COMP%]::placeholder {\n  color: var(--c-text-muted);\n}\n.search__input[_ngcontent-%COMP%]::-webkit-search-cancel-button {\n  display: none;\n}\n/*# sourceMappingURL=search-input.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SearchInputComponent, [{
    type: Component,
    args: [{ selector: "cm-search-input", standalone: true, imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="search">
      <svg class="search__icon" width="18" height="18" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
        <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
      </svg>
      <input class="search__input" type="search"
             [placeholder]="placeholder()"
             [(ngModel)]="value"
             (ngModelChange)="valueChange.emit($event)" />
    </div>
  `, styles: ["/* libs/ui/src/lib/components/search-input/search-input.component.css */\n.search {\n  display: flex;\n  align-items: center;\n  gap: var(--s-3);\n  background: var(--c-card);\n  border: 1px solid var(--c-border);\n  border-radius: var(--r-md);\n  padding: var(--s-3) var(--s-4);\n}\n.search__icon {\n  color: var(--c-text-muted);\n  flex-shrink: 0;\n}\n.search__input {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  color: var(--c-text);\n  outline: none;\n}\n.search__input::placeholder {\n  color: var(--c-text-muted);\n}\n.search__input::-webkit-search-cancel-button {\n  display: none;\n}\n/*# sourceMappingURL=search-input.component.css.map */\n"] }]
  }], null, { placeholder: [{ type: Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], value: [{ type: Input, args: [{ isSignal: true, alias: "value", required: false }] }, { type: Output, args: ["valueChange"] }], valueChange: [{ type: Output, args: ["valueChange"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SearchInputComponent, { className: "SearchInputComponent", filePath: "libs/ui/src/lib/components/search-input/search-input.component.ts", lineNumber: 23 });
})();

// libs/ui/src/lib/components/stepper/stepper.component.ts
function StepperComponent_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "svg", 3);
    \u0275\u0275domElement(1, "path", 6);
    \u0275\u0275domElementEnd();
  }
}
function StepperComponent_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const $index_r1 = \u0275\u0275nextContext().$index;
    \u0275\u0275textInterpolate1(" ", $index_r1 + 1, " ");
  }
}
function StepperComponent_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 7);
  }
  if (rf & 2) {
    const $index_r1 = \u0275\u0275nextContext().$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("stepper__line--done", $index_r1 < ctx_r1.activeStep());
  }
}
function StepperComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275conditionalCreate(2, StepperComponent_For_2_Conditional_2_Template, 2, 0, ":svg:svg", 3)(3, StepperComponent_For_2_Conditional_3_Template, 1, 1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(6, StepperComponent_For_2_Conditional_6_Template, 1, 2, "div", 5);
  }
  if (rf & 2) {
    const step_r3 = ctx.$implicit;
    const $index_r1 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("stepper__step--active", $index_r1 === ctx_r1.activeStep())("stepper__step--done", $index_r1 < ctx_r1.activeStep());
    \u0275\u0275advance(2);
    \u0275\u0275conditional($index_r1 < ctx_r1.activeStep() ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r3);
    \u0275\u0275advance();
    \u0275\u0275conditional($index_r1 < ctx_r1.steps().length - 1 ? 6 : -1);
  }
}
var StepperComponent = class _StepperComponent {
  constructor() {
    this.steps = input.required(...ngDevMode ? [{ debugName: "steps" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeStep = input(0, ...ngDevMode ? [{ debugName: "activeStep" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.\u0275fac = function StepperComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StepperComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StepperComponent, selectors: [["cm-stepper"]], inputs: { steps: [1, "steps"], activeStep: [1, "activeStep"] }, decls: 3, vars: 0, consts: [[1, "stepper"], [1, "stepper__step"], [1, "stepper__dot"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round"], [1, "stepper__label"], [1, "stepper__line", 3, "stepper__line--done"], ["d", "M20 6L9 17l-5-5"], [1, "stepper__line"]], template: function StepperComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275repeaterCreate(1, StepperComponent_For_2_Template, 7, 7, null, null, \u0275\u0275repeaterTrackByIndex);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.steps());
      }
    }, dependencies: [CommonModule], styles: ["\n.stepper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: var(--s-4) var(--s-5);\n}\n.stepper__step[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-1);\n}\n.stepper__dot[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: 2px solid var(--c-border-strong);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--c-text-muted);\n  transition: all var(--t-fast);\n}\n.stepper__step--active[_ngcontent-%COMP%]   .stepper__dot[_ngcontent-%COMP%] {\n  border-color: var(--c-accent);\n  color: var(--c-accent);\n}\n.stepper__step--done[_ngcontent-%COMP%]   .stepper__dot[_ngcontent-%COMP%] {\n  background: var(--c-accent);\n  border-color: var(--c-accent);\n  color: #fff;\n}\n.stepper__label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 500;\n  color: var(--c-text-faint);\n  text-align: center;\n}\n.stepper__step--active[_ngcontent-%COMP%]   .stepper__label[_ngcontent-%COMP%] {\n  color: var(--c-accent);\n  font-weight: 600;\n}\n.stepper__step--done[_ngcontent-%COMP%]   .stepper__label[_ngcontent-%COMP%] {\n  color: var(--c-text-muted);\n}\n.stepper__line[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 2px;\n  background: var(--c-border);\n  margin: 0 var(--s-2);\n  margin-bottom: 18px;\n  transition: background var(--t-fast);\n}\n.stepper__line--done[_ngcontent-%COMP%] {\n  background: var(--c-accent);\n}\n/*# sourceMappingURL=stepper.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperComponent, [{
    type: Component,
    args: [{ selector: "cm-stepper", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="stepper">
      @for (step of steps(); track $index) {
        <div class="stepper__step"
             [class.stepper__step--active]="$index === activeStep()"
             [class.stepper__step--done]="$index < activeStep()">
          <div class="stepper__dot">
            @if ($index < activeStep()) {
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="3" stroke-linecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            } @else {
              {{ $index + 1 }}
            }
          </div>
          <span class="stepper__label">{{ step }}</span>
        </div>
        @if ($index < steps().length - 1) {
          <div class="stepper__line" [class.stepper__line--done]="$index < activeStep()"></div>
        }
      }
    </div>
  `, styles: ["/* libs/ui/src/lib/components/stepper/stepper.component.css */\n.stepper {\n  display: flex;\n  align-items: center;\n  padding: var(--s-4) var(--s-5);\n}\n.stepper__step {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-1);\n}\n.stepper__dot {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: 2px solid var(--c-border-strong);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--c-text-muted);\n  transition: all var(--t-fast);\n}\n.stepper__step--active .stepper__dot {\n  border-color: var(--c-accent);\n  color: var(--c-accent);\n}\n.stepper__step--done .stepper__dot {\n  background: var(--c-accent);\n  border-color: var(--c-accent);\n  color: #fff;\n}\n.stepper__label {\n  font-size: 10px;\n  font-weight: 500;\n  color: var(--c-text-faint);\n  text-align: center;\n}\n.stepper__step--active .stepper__label {\n  color: var(--c-accent);\n  font-weight: 600;\n}\n.stepper__step--done .stepper__label {\n  color: var(--c-text-muted);\n}\n.stepper__line {\n  flex: 1;\n  height: 2px;\n  background: var(--c-border);\n  margin: 0 var(--s-2);\n  margin-bottom: 18px;\n  transition: background var(--t-fast);\n}\n.stepper__line--done {\n  background: var(--c-accent);\n}\n/*# sourceMappingURL=stepper.component.css.map */\n"] }]
  }], null, { steps: [{ type: Input, args: [{ isSignal: true, alias: "steps", required: true }] }], activeStep: [{ type: Input, args: [{ isSignal: true, alias: "activeStep", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StepperComponent, { className: "StepperComponent", filePath: "libs/ui/src/lib/components/stepper/stepper.component.ts", lineNumber: 35 });
})();

// libs/ui/src/lib/components/tab-bar/tab-bar.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function TabBarComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 2);
    \u0275\u0275domListener("click", function TabBarComponent_For_2_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.tabChange.emit(tab_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("tab-bar__item--active", ctx_r2.activeId() === tab_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r2.label, " ");
  }
}
var TabBarComponent = class _TabBarComponent {
  constructor() {
    this.tabs = input.required(...ngDevMode ? [{ debugName: "tabs" }] : (
      /* istanbul ignore next */
      []
    ));
    this.activeId = input.required(...ngDevMode ? [{ debugName: "activeId" }] : (
      /* istanbul ignore next */
      []
    ));
    this.tabChange = output();
  }
  static {
    this.\u0275fac = function TabBarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TabBarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TabBarComponent, selectors: [["cm-tab-bar"]], inputs: { tabs: [1, "tabs"], activeId: [1, "activeId"] }, outputs: { tabChange: "tabChange" }, decls: 3, vars: 0, consts: [[1, "tab-bar"], [1, "tab-bar__item", 3, "tab-bar__item--active"], [1, "tab-bar__item", 3, "click"]], template: function TabBarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275repeaterCreate(1, TabBarComponent_For_2_Template, 2, 3, "button", 1, _forTrack0);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.tabs());
      }
    }, dependencies: [CommonModule], styles: ["\n.tab-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--s-2);\n  padding: var(--s-2);\n  background: var(--c-card-muted);\n  border-radius: var(--r-sm);\n}\n.tab-bar__item[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 34px;\n  border: none;\n  border-radius: var(--r-xs);\n  font-family: var(--font-sans);\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--c-text-muted);\n  background: transparent;\n  cursor: pointer;\n  transition: all var(--t-fast);\n}\n.tab-bar__item--active[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  color: var(--c-text);\n  font-weight: 600;\n  box-shadow: var(--sh-xs);\n}\n/*# sourceMappingURL=tab-bar.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabBarComponent, [{
    type: Component,
    args: [{ selector: "cm-tab-bar", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="tab-bar">
      @for (tab of tabs(); track tab.id) {
        <button class="tab-bar__item"
                [class.tab-bar__item--active]="activeId() === tab.id"
                (click)="tabChange.emit(tab.id)">
          {{ tab.label }}
        </button>
      }
    </div>
  `, styles: ["/* libs/ui/src/lib/components/tab-bar/tab-bar.component.css */\n.tab-bar {\n  display: flex;\n  gap: var(--s-2);\n  padding: var(--s-2);\n  background: var(--c-card-muted);\n  border-radius: var(--r-sm);\n}\n.tab-bar__item {\n  flex: 1;\n  height: 34px;\n  border: none;\n  border-radius: var(--r-xs);\n  font-family: var(--font-sans);\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--c-text-muted);\n  background: transparent;\n  cursor: pointer;\n  transition: all var(--t-fast);\n}\n.tab-bar__item--active {\n  background: var(--c-card);\n  color: var(--c-text);\n  font-weight: 600;\n  box-shadow: var(--sh-xs);\n}\n/*# sourceMappingURL=tab-bar.component.css.map */\n"] }]
  }], null, { tabs: [{ type: Input, args: [{ isSignal: true, alias: "tabs", required: true }] }], activeId: [{ type: Input, args: [{ isSignal: true, alias: "activeId", required: true }] }], tabChange: [{ type: Output, args: ["tabChange"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TabBarComponent, { className: "TabBarComponent", filePath: "libs/ui/src/lib/components/tab-bar/tab-bar.component.ts", lineNumber: 27 });
})();

// libs/ui/src/lib/components/section-header/section-header.component.ts
var _c04 = ["*"];
function SectionHeaderComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.eyebrow());
  }
}
var SectionHeaderComponent = class _SectionHeaderComponent {
  constructor() {
    this.title = input.required(...ngDevMode ? [{ debugName: "title" }] : (
      /* istanbul ignore next */
      []
    ));
    this.eyebrow = input("", ...ngDevMode ? [{ debugName: "eyebrow" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.\u0275fac = function SectionHeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SectionHeaderComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SectionHeaderComponent, selectors: [["cm-section-header"]], inputs: { title: [1, "title"], eyebrow: [1, "eyebrow"] }, ngContentSelectors: _c04, decls: 5, vars: 2, consts: [[1, "section-header"], [1, "section-header__eyebrow"], [1, "section-header__title"]], template: function SectionHeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275conditionalCreate(1, SectionHeaderComponent_Conditional_1_Template, 2, 1, "div", 1);
        \u0275\u0275domElementStart(2, "h2", 2);
        \u0275\u0275text(3);
        \u0275\u0275domElementEnd();
        \u0275\u0275projection(4);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.eyebrow() ? 1 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.title());
      }
    }, styles: ["\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  margin-bottom: var(--s-4);\n}\n.section-header__eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin-bottom: var(--s-1);\n}\n.section-header__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 19px;\n  font-weight: 400;\n  letter-spacing: -0.2px;\n  color: var(--c-text);\n  margin: 0;\n}\n/*# sourceMappingURL=section-header.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SectionHeaderComponent, [{
    type: Component,
    args: [{ selector: "cm-section-header", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="section-header">
      @if (eyebrow()) {
        <div class="section-header__eyebrow">{{ eyebrow() }}</div>
      }
      <h2 class="section-header__title">{{ title() }}</h2>
      <ng-content></ng-content>
    </div>
  `, styles: ["/* libs/ui/src/lib/components/section-header/section-header.component.css */\n.section-header {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  margin-bottom: var(--s-4);\n}\n.section-header__eyebrow {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--c-text-muted);\n  margin-bottom: var(--s-1);\n}\n.section-header__title {\n  font-family: var(--font-serif);\n  font-size: 19px;\n  font-weight: 400;\n  letter-spacing: -0.2px;\n  color: var(--c-text);\n  margin: 0;\n}\n/*# sourceMappingURL=section-header.component.css.map */\n"] }]
  }], null, { title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: true }] }], eyebrow: [{ type: Input, args: [{ isSignal: true, alias: "eyebrow", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SectionHeaderComponent, { className: "SectionHeaderComponent", filePath: "libs/ui/src/lib/components/section-header/section-header.component.ts", lineNumber: 18 });
})();

// libs/ui/src/lib/components/empty-state/empty-state.component.ts
function EmptyStateComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle());
  }
}
var EmptyStateComponent = class _EmptyStateComponent {
  constructor() {
    this.icon = input("\xF0\u0178\u201C\xAD", ...ngDevMode ? [{ debugName: "icon" }] : (
      /* istanbul ignore next */
      []
    ));
    this.title = input.required(...ngDevMode ? [{ debugName: "title" }] : (
      /* istanbul ignore next */
      []
    ));
    this.subtitle = input("", ...ngDevMode ? [{ debugName: "subtitle" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.\u0275fac = function EmptyStateComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EmptyStateComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmptyStateComponent, selectors: [["cm-empty-state"]], inputs: { icon: [1, "icon"], title: [1, "title"], subtitle: [1, "subtitle"] }, decls: 6, vars: 3, consts: [[1, "empty"], [1, "empty__icon"], [1, "empty__title"], [1, "empty__subtitle"]], template: function EmptyStateComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275text(2);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(3, "div", 2);
        \u0275\u0275text(4);
        \u0275\u0275domElementEnd();
        \u0275\u0275conditionalCreate(5, EmptyStateComponent_Conditional_5_Template, 2, 1, "div", 3);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.icon());
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.title());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.subtitle() ? 5 : -1);
      }
    }, styles: ["\n.empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--s-9) var(--s-6);\n  text-align: center;\n}\n.empty__icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  margin-bottom: var(--s-4);\n}\n.empty__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 20px;\n  font-weight: 400;\n  color: var(--c-text);\n  margin-bottom: var(--s-2);\n}\n.empty__subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  line-height: 1.5;\n}\n/*# sourceMappingURL=empty-state.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmptyStateComponent, [{
    type: Component,
    args: [{ selector: "cm-empty-state", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="empty">
      <div class="empty__icon">{{ icon() }}</div>
      <div class="empty__title">{{ title() }}</div>
      @if (subtitle()) {
        <div class="empty__subtitle">{{ subtitle() }}</div>
      }
    </div>
  `, styles: ["/* libs/ui/src/lib/components/empty-state/empty-state.component.css */\n.empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--s-9) var(--s-6);\n  text-align: center;\n}\n.empty__icon {\n  font-size: 40px;\n  margin-bottom: var(--s-4);\n}\n.empty__title {\n  font-family: var(--font-serif);\n  font-size: 20px;\n  font-weight: 400;\n  color: var(--c-text);\n  margin-bottom: var(--s-2);\n}\n.empty__subtitle {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  line-height: 1.5;\n}\n/*# sourceMappingURL=empty-state.component.css.map */\n"] }]
  }], null, { icon: [{ type: Input, args: [{ isSignal: true, alias: "icon", required: false }] }], title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: true }] }], subtitle: [{ type: Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmptyStateComponent, { className: "EmptyStateComponent", filePath: "libs/ui/src/lib/components/empty-state/empty-state.component.ts", lineNumber: 18 });
})();

// libs/ui/src/lib/components/card/card.component.ts
var _c05 = ["*"];
var CardComponent = class _CardComponent {
  constructor() {
    this.accent = input(false, ...ngDevMode ? [{ debugName: "accent" }] : (
      /* istanbul ignore next */
      []
    ));
    this.flat = input(false, ...ngDevMode ? [{ debugName: "flat" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.\u0275fac = function CardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CardComponent, selectors: [["cm-card"]], inputs: { accent: [1, "accent"], flat: [1, "flat"] }, ngContentSelectors: _c05, decls: 2, vars: 2, template: function CardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domElementStart(0, "div");
        \u0275\u0275projection(1);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classMap("card" + (ctx.accent() ? " card--accent" : "") + (ctx.flat() ? " card--flat" : ""));
      }
    }, styles: ["\n.card[_ngcontent-%COMP%] {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  padding: var(--s-5);\n  box-shadow: var(--sh-sm);\n}\n.card--accent[_ngcontent-%COMP%] {\n  background: var(--c-accent);\n  color: #fff;\n  box-shadow: var(--sh-accent);\n}\n.card--flat[_ngcontent-%COMP%] {\n  box-shadow: none;\n  border: 1px solid var(--c-border);\n}\n/*# sourceMappingURL=card.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardComponent, [{
    type: Component,
    args: [{ selector: "cm-card", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `<div [class]="'card' + (accent() ? ' card--accent' : '') + (flat() ? ' card--flat' : '')"><ng-content></ng-content></div>`, styles: ["/* libs/ui/src/lib/components/card/card.component.css */\n.card {\n  background: var(--c-card);\n  border-radius: var(--r-md);\n  padding: var(--s-5);\n  box-shadow: var(--sh-sm);\n}\n.card--accent {\n  background: var(--c-accent);\n  color: #fff;\n  box-shadow: var(--sh-accent);\n}\n.card--flat {\n  box-shadow: none;\n  border: 1px solid var(--c-border);\n}\n/*# sourceMappingURL=card.component.css.map */\n"] }]
  }], null, { accent: [{ type: Input, args: [{ isSignal: true, alias: "accent", required: false }] }], flat: [{ type: Input, args: [{ isSignal: true, alias: "flat", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CardComponent, { className: "CardComponent", filePath: "libs/ui/src/lib/components/card/card.component.ts", lineNumber: 10 });
})();

// libs/ui/src/lib/components/toggle/toggle.component.ts
var ToggleComponent = class _ToggleComponent {
  constructor() {
    this.checked = input(false, ...ngDevMode ? [{ debugName: "checked" }] : (
      /* istanbul ignore next */
      []
    ));
    this.toggled = output();
  }
  static {
    this.\u0275fac = function ToggleComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ToggleComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToggleComponent, selectors: [["cm-toggle"]], inputs: { checked: [1, "checked"] }, outputs: { toggled: "toggled" }, decls: 2, vars: 3, consts: [["role", "switch", 1, "toggle", 3, "click"], [1, "toggle__thumb"]], template: function ToggleComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "button", 0);
        \u0275\u0275domListener("click", function ToggleComponent_Template_button_click_0_listener() {
          return ctx.toggled.emit(!ctx.checked());
        });
        \u0275\u0275domElement(1, "span", 1);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("toggle--on", ctx.checked());
        \u0275\u0275attribute("aria-checked", ctx.checked());
      }
    }, styles: ["\n.toggle[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 30px;\n  border-radius: 15px;\n  border: none;\n  cursor: pointer;\n  background: var(--c-card-muted);\n  position: relative;\n  transition: background var(--t-fast);\n  flex-shrink: 0;\n}\n.toggle--on[_ngcontent-%COMP%] {\n  background: var(--c-accent);\n}\n.toggle__thumb[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 24px;\n  height: 24px;\n  border-radius: 12px;\n  background: #fff;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  transition: transform var(--t-fast);\n}\n.toggle--on[_ngcontent-%COMP%]   .toggle__thumb[_ngcontent-%COMP%] {\n  transform: translateX(20px);\n}\n/*# sourceMappingURL=toggle.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToggleComponent, [{
    type: Component,
    args: [{ selector: "cm-toggle", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <button class="toggle" [class.toggle--on]="checked()"
            role="switch" [attr.aria-checked]="checked()"
            (click)="toggled.emit(!checked())">
      <span class="toggle__thumb"></span>
    </button>
  `, styles: ["/* libs/ui/src/lib/components/toggle/toggle.component.css */\n.toggle {\n  width: 50px;\n  height: 30px;\n  border-radius: 15px;\n  border: none;\n  cursor: pointer;\n  background: var(--c-card-muted);\n  position: relative;\n  transition: background var(--t-fast);\n  flex-shrink: 0;\n}\n.toggle--on {\n  background: var(--c-accent);\n}\n.toggle__thumb {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 24px;\n  height: 24px;\n  border-radius: 12px;\n  background: #fff;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  transition: transform var(--t-fast);\n}\n.toggle--on .toggle__thumb {\n  transform: translateX(20px);\n}\n/*# sourceMappingURL=toggle.component.css.map */\n"] }]
  }], null, { checked: [{ type: Input, args: [{ isSignal: true, alias: "checked", required: false }] }], toggled: [{ type: Output, args: ["toggled"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToggleComponent, { className: "ToggleComponent", filePath: "libs/ui/src/lib/components/toggle/toggle.component.ts", lineNumber: 16 });
})();

// libs/ui/src/lib/components/spinner/spinner.component.ts
var SpinnerComponent = class _SpinnerComponent {
  constructor() {
    this.size = input(24, ...ngDevMode ? [{ debugName: "size" }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.\u0275fac = function SpinnerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SpinnerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SpinnerComponent, selectors: [["cm-spinner"]], inputs: { size: [1, "size"] }, decls: 4, vars: 6, consts: [[1, "spinner"], ["viewBox", "0 0 24 24", "fill", "none"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "2", "opacity", "0.2"], ["d", "M12 2a10 10 0 0 1 10 10", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"]], template: function SpinnerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElementStart(1, "svg", 1);
        \u0275\u0275domElement(2, "circle", 2)(3, "path", 3);
        \u0275\u0275domElementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275styleProp("width", ctx.size(), "px")("height", ctx.size(), "px");
        \u0275\u0275advance();
        \u0275\u0275attribute("width", ctx.size())("height", ctx.size());
      }
    }, styles: ["\n.spinner[_ngcontent-%COMP%] {\n  animation: spin 0.8s linear infinite;\n  color: var(--c-accent);\n  display: inline-flex;\n}\n/*# sourceMappingURL=spinner.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpinnerComponent, [{
    type: Component,
    args: [{ selector: "cm-spinner", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="spinner" [style.width.px]="size()" [style.height.px]="size()">
      <svg viewBox="0 0 24 24" fill="none" [attr.width]="size()" [attr.height]="size()">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.2"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
  `, styles: ["/* libs/ui/src/lib/components/spinner/spinner.component.css */\n.spinner {\n  animation: spin 0.8s linear infinite;\n  color: var(--c-accent);\n  display: inline-flex;\n}\n/*# sourceMappingURL=spinner.component.css.map */\n"] }]
  }], null, { size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SpinnerComponent, { className: "SpinnerComponent", filePath: "libs/ui/src/lib/components/spinner/spinner.component.ts", lineNumber: 17 });
})();

export {
  ButtonComponent,
  BadgeComponent,
  KpiCardComponent,
  ListRowComponent,
  AvatarComponent,
  SearchInputComponent,
  StepperComponent,
  TabBarComponent,
  SectionHeaderComponent,
  EmptyStateComponent
};
//# sourceMappingURL=chunk-TTJJPAUX.js.map
