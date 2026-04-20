import {
  RouterLink
} from "./chunk-22JHDSMV.js";
import {
  AvatarComponent,
  BadgeComponent,
  CardComponent,
  SectionHeaderComponent
} from "./chunk-VUTJB2DO.js";
import "./chunk-RE6VNHJT.js";
import {
  ChangeDetectionStrategy,
  Component,
  DatePipe,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-QFVHJJPM.js";

// apps/morador/src/app/features/home/home.component.ts
var _c0 = (a0) => ["/entregas", a0];
function HomeComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 5)(1, "cm-card", 13)(2, "p", 14);
    \u0275\u0275text(3, "\u25CF Entrega aguardando");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 15);
    \u0275\u0275text(5, "Sua encomenda");
    \u0275\u0275element(6, "br");
    \u0275\u0275text(7, "chegou na portaria.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 16);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c0, ctx_r0.pendingDelivery().id));
    \u0275\u0275advance();
    \u0275\u0275property("accent", true);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r0.pendingDelivery().remetente, " \xB7 h\xE1 poucos minutos");
  }
}
function HomeComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "cm-section-header", 17);
    \u0275\u0275elementStart(2, "cm-card", 18)(3, "cm-badge", 19);
    \u0275\u0275text(4, "Confirmada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 21);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("flat", true);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.nextReservation().espaco);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind4(9, 5, ctx_r0.nextReservation().data, "dd MMM \xB7 EEEE", "", "pt-BR"), " \xB7 ", ctx_r0.nextReservation().horaInicio, "\u2013", ctx_r0.nextReservation().horaFim, "");
  }
}
function HomeComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "cm-section-header", 22);
    \u0275\u0275elementStart(2, "cm-card", 18);
    \u0275\u0275element(3, "div", 23);
    \u0275\u0275elementStart(4, "div", 24)(5, "cm-badge", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 26);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 27);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("flat", true);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.pinnedAnnouncement().prioridade);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.pinnedAnnouncement().titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.pinnedAnnouncement().mensagem);
  }
}
var HomeComponent = class _HomeComponent {
  constructor() {
    this.userName = "Jo\xE3o Silva";
    this.pendingDelivery = signal({
      id: "1",
      morador: "Jo\xE3o Silva",
      apto: "1204",
      torre: "B",
      remetente: "Mercado Livre",
      tipo: "Caixa pequena",
      status: "pendente",
      criadaEm: /* @__PURE__ */ new Date()
    });
    this.nextReservation = signal({
      id: "1",
      espaco: "Sal\xE3o de Festas A",
      data: new Date(Date.now() + 7 * 864e5),
      horaInicio: "19:00",
      horaFim: "23:00",
      status: "confirmada"
    });
    this.pinnedAnnouncement = signal({
      id: "1",
      titulo: "Manuten\xE7\xE3o da piscina",
      mensagem: "A piscina estar\xE1 fechada de 22 a 25 de abril para manuten\xE7\xE3o preventiva.",
      prioridade: "alta",
      publicadoEm: /* @__PURE__ */ new Date(),
      fixado: true
    });
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["cm-home"]], decls: 32, vars: 6, consts: [[1, "home"], [1, "home__header"], [1, "home__greeting"], [1, "home__name"], ["color", "#E8D5C4", 3, "name", "size"], [1, "home__hero", 3, "routerLink"], [1, "home__actions"], ["routerLink", "/avisos", 1, "action"], [1, "action__icon"], ["routerLink", "/reservas", 1, "action"], ["routerLink", "/marketplace", 1, "action"], ["routerLink", "/perfil", 1, "action"], [1, "home__section"], [3, "accent"], [1, "hero__eyebrow"], [1, "hero__title"], [1, "hero__sub"], ["title", "Sua pr\xF3xima reserva", "eyebrow", "Reservas"], [3, "flat"], ["variant", "success"], [1, "res__title"], [1, "res__sub"], ["title", "Aviso fixado", "eyebrow", "Comunicados"], [1, "announce__bar"], [1, "announce__body"], ["variant", "warn"], [1, "announce__title"], [1, "announce__msg"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "p", 2);
        \u0275\u0275text(4, "Bom dia,");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(7, "cm-avatar", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(8, HomeComponent_Conditional_8_Template, 10, 5, "a", 5);
        \u0275\u0275elementStart(9, "div", 6)(10, "a", 7)(11, "div", 8);
        \u0275\u0275text(12, "\u{1F4E2}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "span");
        \u0275\u0275text(14, "Avisos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "a", 9)(16, "div", 8);
        \u0275\u0275text(17, "\u{1F3CA}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "span");
        \u0275\u0275text(19, "Reservar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "a", 10)(21, "div", 8);
        \u0275\u0275text(22, "\u{1F6D2}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span");
        \u0275\u0275text(24, "Mercado");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "a", 11)(26, "div", 8);
        \u0275\u0275text(27, "\u{1F527}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span");
        \u0275\u0275text(29, "Configurar");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(30, HomeComponent_Conditional_30_Template, 10, 10, "div", 12)(31, HomeComponent_Conditional_31_Template, 11, 4, "div", 12);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.userName);
        \u0275\u0275advance();
        \u0275\u0275property("name", ctx.userName)("size", 44);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.pendingDelivery() ? 8 : -1);
        \u0275\u0275advance(22);
        \u0275\u0275conditional(ctx.nextReservation() ? 30 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.pinnedAnnouncement() ? 31 : -1);
      }
    }, dependencies: [DatePipe, RouterLink, CardComponent, BadgeComponent, SectionHeaderComponent, AvatarComponent], styles: ["\n\n.home[_ngcontent-%COMP%] {\n  padding: var(--s-6) var(--s-5) calc(var(--s-5) + 72px);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-6);\n  animation: fadeIn var(--t-base) ease-out;\n}\n.home__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: var(--s-3);\n}\n.home__greeting[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-1);\n}\n.home__name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.home__hero[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n.home__actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--s-3);\n}\n.home__section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.hero__eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  opacity: 0.85;\n  margin: 0 0 var(--s-2);\n  animation: pulse 2s ease-in-out infinite;\n}\n.hero__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  line-height: 1.15;\n  letter-spacing: -0.4px;\n  margin: 0 0 var(--s-3);\n}\n.hero__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: 0.85;\n  margin: 0;\n}\n.action[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-2);\n  text-decoration: none;\n  color: var(--c-text);\n}\n.action__icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: var(--r-md);\n  background: var(--c-card);\n  box-shadow: var(--sh-sm);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n}\n.action[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--c-text-muted);\n}\n.res__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin: var(--s-2) 0 var(--s-1);\n}\n.res__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.announce__bar[_ngcontent-%COMP%] {\n  width: 3px;\n  background: var(--c-warn);\n  border-radius: 2px;\n  align-self: stretch;\n  flex-shrink: 0;\n}\ncm-card[_ngcontent-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=home.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{ selector: "cm-home", standalone: true, imports: [DatePipe, RouterLink, CardComponent, BadgeComponent, SectionHeaderComponent, AvatarComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="home">
      <!-- Header -->
      <div class="home__header">
        <div>
          <p class="home__greeting">Bom dia,</p>
          <h1 class="home__name">{{ userName }}</h1>
        </div>
        <cm-avatar [name]="userName" color="#E8D5C4" [size]="44"></cm-avatar>
      </div>

      <!-- Hero: entrega pendente -->
      @if (pendingDelivery()) {
        <a class="home__hero" [routerLink]="['/entregas', pendingDelivery()!.id]">
          <cm-card [accent]="true">
            <p class="hero__eyebrow">\u25CF Entrega aguardando</p>
            <h2 class="hero__title">Sua encomenda<br/>chegou na portaria.</h2>
            <p class="hero__sub">{{ pendingDelivery()!.remetente }} \xB7 h\xE1 poucos minutos</p>
          </cm-card>
        </a>
      }

      <!-- Quick actions -->
      <div class="home__actions">
        <a class="action" routerLink="/avisos">
          <div class="action__icon">\u{1F4E2}</div>
          <span>Avisos</span>
        </a>
        <a class="action" routerLink="/reservas">
          <div class="action__icon">\u{1F3CA}</div>
          <span>Reservar</span>
        </a>
        <a class="action" routerLink="/marketplace">
          <div class="action__icon">\u{1F6D2}</div>
          <span>Mercado</span>
        </a>
        <a class="action" routerLink="/perfil">
          <div class="action__icon">\u{1F527}</div>
          <span>Configurar</span>
        </a>
      </div>

      <!-- Pr\xF3xima reserva -->
      @if (nextReservation()) {
        <div class="home__section">
          <cm-section-header title="Sua pr\xF3xima reserva" eyebrow="Reservas"></cm-section-header>
          <cm-card [flat]="true">
            <cm-badge variant="success">Confirmada</cm-badge>
            <p class="res__title">{{ nextReservation()!.espaco }}</p>
            <p class="res__sub">{{ nextReservation()!.data | date:'dd MMM \xB7 EEEE':'':'pt-BR' }} \xB7 {{ nextReservation()!.horaInicio }}\u2013{{ nextReservation()!.horaFim }}</p>
          </cm-card>
        </div>
      }

      <!-- Avisos fixados -->
      @if (pinnedAnnouncement()) {
        <div class="home__section">
          <cm-section-header title="Aviso fixado" eyebrow="Comunicados"></cm-section-header>
          <cm-card [flat]="true">
            <div class="announce__bar"></div>
            <div class="announce__body">
              <cm-badge variant="warn">{{ pinnedAnnouncement()!.prioridade }}</cm-badge>
              <p class="announce__title">{{ pinnedAnnouncement()!.titulo }}</p>
              <p class="announce__msg">{{ pinnedAnnouncement()!.mensagem }}</p>
            </div>
          </cm-card>
        </div>
      }
    </div>
  `, styles: ["/* apps/morador/src/app/features/home/home.component.scss */\n.home {\n  padding: var(--s-6) var(--s-5) calc(var(--s-5) + 72px);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-6);\n  animation: fadeIn var(--t-base) ease-out;\n}\n.home__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: var(--s-3);\n}\n.home__greeting {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-1);\n}\n.home__name {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.home__hero a {\n  text-decoration: none;\n}\n.home__actions {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--s-3);\n}\n.home__section {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.hero__eyebrow {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  opacity: 0.85;\n  margin: 0 0 var(--s-2);\n  animation: pulse 2s ease-in-out infinite;\n}\n.hero__title {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  line-height: 1.15;\n  letter-spacing: -0.4px;\n  margin: 0 0 var(--s-3);\n}\n.hero__sub {\n  font-size: 12px;\n  opacity: 0.85;\n  margin: 0;\n}\n.action {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-2);\n  text-decoration: none;\n  color: var(--c-text);\n}\n.action__icon {\n  width: 52px;\n  height: 52px;\n  border-radius: var(--r-md);\n  background: var(--c-card);\n  box-shadow: var(--sh-sm);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n}\n.action span {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--c-text-muted);\n}\n.res__title {\n  font-size: 15px;\n  font-weight: 600;\n  margin: var(--s-2) 0 var(--s-1);\n}\n.res__sub {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.announce__bar {\n  width: 3px;\n  background: var(--c-warn);\n  border-radius: 2px;\n  align-self: stretch;\n  flex-shrink: 0;\n}\ncm-card {\n  display: block;\n}\n/*# sourceMappingURL=home.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "apps/morador/src/app/features/home/home.component.ts", lineNumber: 87 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-UGVWBVMU.js.map
