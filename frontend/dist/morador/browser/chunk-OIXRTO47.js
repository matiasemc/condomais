import {
  AvatarComponent,
  BadgeComponent,
  CardComponent,
  SectionHeaderComponent
} from "./chunk-2E4G4N2I.js";
import {
  AnnouncementService,
  AuthState,
  DeliveryService,
  ReservationService
} from "./chunk-IQFUSNZ4.js";
import "./chunk-R6BDYNR2.js";
import {
  RouterLink
} from "./chunk-KU6U7BFN.js";
import {
  DatePipe
} from "./chunk-UEEOQNAF.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-ZYMURNKM.js";

// apps/morador/src/app/features/home/home.component.ts
var _c0 = (a0) => ["/entregas", a0];
function HomeComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 5)(1, "cm-card", 13)(2, "p", 14);
    \u0275\u0275text(3, "Entrega aguardando");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 15);
    \u0275\u0275text(5, "Sua encomenda");
    \u0275\u0275element(6, "br");
    \u0275\u0275text(7, "chegou na portaria.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 16);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const delivery_r1 = ctx;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c0, delivery_r1.id));
    \u0275\u0275advance();
    \u0275\u0275property("accent", true);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate2("", delivery_r1.transportadora || delivery_r1.tipo, " - ", \u0275\u0275pipeBind2(10, 4, delivery_r1.createdAt, "dd/MM HH:mm"));
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
    const reservation_r2 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275property("flat", true);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((reservation_r2.equipamento == null ? null : reservation_r2.equipamento.nome) || "Area comum");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind3(9, 5, reservation_r2.data, "dd/MM/yyyy", "UTC"), " - ", reservation_r2.horaInicio, "-", reservation_r2.horaFim);
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
    const announcement_r3 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275property("flat", true);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(announcement_r3.prioridade);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(announcement_r3.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(announcement_r3.mensagem);
  }
}
var HomeComponent = class _HomeComponent {
  constructor() {
    this.authState = inject(AuthState);
    this.deliveryService = inject(DeliveryService);
    this.reservationService = inject(ReservationService);
    this.announcementService = inject(AnnouncementService);
    this.userName = computed(() => this.authState.profile()?.name ?? this.authState.user()?.email ?? "Morador", ...ngDevMode ? [{ debugName: "userName" }] : (
      /* istanbul ignore next */
      []
    ));
    this.pendingDelivery = computed(() => this.deliveryService.deliveries().find((delivery) => delivery.status === "pendente" || delivery.status === "notificada") ?? null, ...ngDevMode ? [{ debugName: "pendingDelivery" }] : (
      /* istanbul ignore next */
      []
    ));
    this.nextReservation = computed(() => {
      const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      return this.reservationService.reservations().filter((reservation) => reservation.status === "confirmada" && reservation.data >= today).sort((a, b) => `${a.data} ${a.horaInicio}`.localeCompare(`${b.data} ${b.horaInicio}`))[0] ?? null;
    }, ...ngDevMode ? [{ debugName: "nextReservation" }] : (
      /* istanbul ignore next */
      []
    ));
    this.pinnedAnnouncement = computed(() => this.announcementService.announcements().find((announcement) => announcement.fixado) ?? null, ...ngDevMode ? [{ debugName: "pinnedAnnouncement" }] : (
      /* istanbul ignore next */
      []
    ));
    effect(() => {
      const tenant = this.authState.currentTenant();
      const user = this.authState.user();
      if (!tenant || !user)
        return;
      void this.deliveryService.loadForUser(user.id, tenant.id);
      void this.reservationService.loadMyReservations(tenant.id, user.id);
      void this.announcementService.loadForTenant(tenant.id);
    });
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["cm-home"]], decls: 32, vars: 6, consts: [[1, "home"], [1, "home__header"], [1, "home__greeting"], [1, "home__name"], ["color", "#E8D5C4", 3, "name", "size"], [1, "home__hero", 3, "routerLink"], [1, "home__actions"], ["routerLink", "/avisos", 1, "action"], [1, "action__icon"], ["routerLink", "/reservas", 1, "action"], ["routerLink", "/marketplace", 1, "action"], ["routerLink", "/perfil", 1, "action"], [1, "home__section"], [3, "accent"], [1, "hero__eyebrow"], [1, "hero__title"], [1, "hero__sub"], ["title", "Sua proxima reserva", "eyebrow", "Reservas"], [3, "flat"], ["variant", "success"], [1, "res__title"], [1, "res__sub"], ["title", "Aviso fixado", "eyebrow", "Comunicados"], [1, "announce__bar"], [1, "announce__body"], ["variant", "warn"], [1, "announce__title"], [1, "announce__msg"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "p", 2);
        \u0275\u0275text(4, "Bom dia,");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(7, "cm-avatar", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(8, HomeComponent_Conditional_8_Template, 11, 9, "a", 5);
        \u0275\u0275elementStart(9, "div", 6)(10, "a", 7)(11, "div", 8);
        \u0275\u0275text(12, "i");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "span");
        \u0275\u0275text(14, "Avisos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "a", 9)(16, "div", 8);
        \u0275\u0275text(17, "R");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "span");
        \u0275\u0275text(19, "Reservar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "a", 10)(21, "div", 8);
        \u0275\u0275text(22, "$");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "span");
        \u0275\u0275text(24, "Mercado");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "a", 11)(26, "div", 8);
        \u0275\u0275text(27, "C");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span");
        \u0275\u0275text(29, "Configurar");
        \u0275\u0275elementEnd()()();
        \u0275\u0275conditionalCreate(30, HomeComponent_Conditional_30_Template, 10, 9, "div", 12);
        \u0275\u0275conditionalCreate(31, HomeComponent_Conditional_31_Template, 11, 4, "div", 12);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_3_0;
        let tmp_4_0;
        let tmp_5_0;
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.userName());
        \u0275\u0275advance();
        \u0275\u0275property("name", ctx.userName())("size", 44);
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_3_0 = ctx.pendingDelivery()) ? 8 : -1, tmp_3_0);
        \u0275\u0275advance(22);
        \u0275\u0275conditional((tmp_4_0 = ctx.nextReservation()) ? 30 : -1, tmp_4_0);
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_5_0 = ctx.pinnedAnnouncement()) ? 31 : -1, tmp_5_0);
      }
    }, dependencies: [RouterLink, CardComponent, BadgeComponent, SectionHeaderComponent, AvatarComponent, DatePipe], styles: ["\n.home[_ngcontent-%COMP%] {\n  padding: var(--s-6) var(--s-5) calc(var(--s-5) + 72px);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-6);\n  animation: fadeIn var(--t-base) ease-out;\n}\n.home__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: var(--s-3);\n}\n.home__greeting[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-1);\n}\n.home__name[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.home__hero[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n.home__actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--s-3);\n}\n.home__section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.hero__eyebrow[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  opacity: 0.85;\n  margin: 0 0 var(--s-2);\n  animation: pulse 2s ease-in-out infinite;\n}\n.hero__title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  line-height: 1.15;\n  letter-spacing: -0.4px;\n  margin: 0 0 var(--s-3);\n}\n.hero__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: 0.85;\n  margin: 0;\n}\n.action[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-2);\n  text-decoration: none;\n  color: var(--c-text);\n}\n.action__icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: var(--r-md);\n  background: var(--c-card);\n  box-shadow: var(--sh-sm);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n}\n.action[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--c-text-muted);\n}\n.res__title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin: var(--s-2) 0 var(--s-1);\n}\n.res__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.announce__bar[_ngcontent-%COMP%] {\n  width: 3px;\n  background: var(--c-warn);\n  border-radius: 2px;\n  align-self: stretch;\n  flex-shrink: 0;\n}\ncm-card[_ngcontent-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=home.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{ selector: "cm-home", standalone: true, imports: [DatePipe, RouterLink, CardComponent, BadgeComponent, SectionHeaderComponent, AvatarComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="home">
      <div class="home__header">
        <div>
          <p class="home__greeting">Bom dia,</p>
          <h1 class="home__name">{{ userName() }}</h1>
        </div>
        <cm-avatar [name]="userName()" color="#E8D5C4" [size]="44"></cm-avatar>
      </div>

      @if (pendingDelivery(); as delivery) {
        <a class="home__hero" [routerLink]="['/entregas', delivery.id]">
          <cm-card [accent]="true">
            <p class="hero__eyebrow">Entrega aguardando</p>
            <h2 class="hero__title">Sua encomenda<br/>chegou na portaria.</h2>
            <p class="hero__sub">{{ delivery.transportadora || delivery.tipo }} - {{ delivery.createdAt | date:'dd/MM HH:mm' }}</p>
          </cm-card>
        </a>
      }

      <div class="home__actions">
        <a class="action" routerLink="/avisos">
          <div class="action__icon">i</div>
          <span>Avisos</span>
        </a>
        <a class="action" routerLink="/reservas">
          <div class="action__icon">R</div>
          <span>Reservar</span>
        </a>
        <a class="action" routerLink="/marketplace">
          <div class="action__icon">$</div>
          <span>Mercado</span>
        </a>
        <a class="action" routerLink="/perfil">
          <div class="action__icon">C</div>
          <span>Configurar</span>
        </a>
      </div>

      @if (nextReservation(); as reservation) {
        <div class="home__section">
          <cm-section-header title="Sua proxima reserva" eyebrow="Reservas"></cm-section-header>
          <cm-card [flat]="true">
            <cm-badge variant="success">Confirmada</cm-badge>
            <p class="res__title">{{ reservation.equipamento?.nome || 'Area comum' }}</p>
            <p class="res__sub">{{ reservation.data | date:'dd/MM/yyyy':'UTC' }} - {{ reservation.horaInicio }}-{{ reservation.horaFim }}</p>
          </cm-card>
        </div>
      }

      @if (pinnedAnnouncement(); as announcement) {
        <div class="home__section">
          <cm-section-header title="Aviso fixado" eyebrow="Comunicados"></cm-section-header>
          <cm-card [flat]="true">
            <div class="announce__bar"></div>
            <div class="announce__body">
              <cm-badge variant="warn">{{ announcement.prioridade }}</cm-badge>
              <p class="announce__title">{{ announcement.titulo }}</p>
              <p class="announce__msg">{{ announcement.mensagem }}</p>
            </div>
          </cm-card>
        </div>
      }
    </div>
  `, styles: ["/* apps/morador/src/app/features/home/home.component.css */\n.home {\n  padding: var(--s-6) var(--s-5) calc(var(--s-5) + 72px);\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-6);\n  animation: fadeIn var(--t-base) ease-out;\n}\n.home__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: var(--s-3);\n}\n.home__greeting {\n  font-size: 13px;\n  color: var(--c-text-muted);\n  margin: 0 0 var(--s-1);\n}\n.home__name {\n  font-family: var(--font-serif);\n  font-size: 26px;\n  font-weight: 400;\n  letter-spacing: -0.4px;\n  margin: 0;\n}\n.home__hero a {\n  text-decoration: none;\n}\n.home__actions {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--s-3);\n}\n.home__section {\n  display: flex;\n  flex-direction: column;\n  gap: var(--s-3);\n}\n.hero__eyebrow {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  opacity: 0.85;\n  margin: 0 0 var(--s-2);\n  animation: pulse 2s ease-in-out infinite;\n}\n.hero__title {\n  font-family: var(--font-serif);\n  font-size: 22px;\n  line-height: 1.15;\n  letter-spacing: -0.4px;\n  margin: 0 0 var(--s-3);\n}\n.hero__sub {\n  font-size: 12px;\n  opacity: 0.85;\n  margin: 0;\n}\n.action {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--s-2);\n  text-decoration: none;\n  color: var(--c-text);\n}\n.action__icon {\n  width: 52px;\n  height: 52px;\n  border-radius: var(--r-md);\n  background: var(--c-card);\n  box-shadow: var(--sh-sm);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n}\n.action span {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--c-text-muted);\n}\n.res__title {\n  font-size: 15px;\n  font-weight: 600;\n  margin: var(--s-2) 0 var(--s-1);\n}\n.res__sub {\n  font-size: 12px;\n  color: var(--c-text-muted);\n  margin: 0;\n}\n.announce__bar {\n  width: 3px;\n  background: var(--c-warn);\n  border-radius: 2px;\n  align-self: stretch;\n  flex-shrink: 0;\n}\ncm-card {\n  display: block;\n}\n/*# sourceMappingURL=home.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "apps/morador/src/app/features/home/home.component.ts", lineNumber: 79 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-OIXRTO47.js.map
