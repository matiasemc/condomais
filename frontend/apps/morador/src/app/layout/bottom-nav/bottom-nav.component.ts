import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationService } from '@condomais/core';

interface NavItem {
  path: string;
  label: string;
  icon: NavIcon;
  gated?: boolean;
}

interface NavIcon {
  paths?: readonly string[];
  polyline?: string;
  lines?: readonly [string, string, string, string][];
  rect?: { x: number; y: number; width: number; height: number; rx?: number };
  circle?: { cx: number; cy: number; r: number };
}

@Component({
  selector: 'cm-bottom-nav',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="bottom-nav">
      @for (item of navItems(); track item.path) {
        @if (item.gated) {
          <span class="bottom-nav__item bottom-nav__item--locked" title="Disponivel em planos superiores">
            <span class="bottom-nav__icon-wrap">
              <span class="bottom-nav__icon">
                <ng-container [ngTemplateOutlet]="iconTpl" [ngTemplateOutletContext]="{ $implicit: item.icon }"></ng-container>
              </span>
              <span class="bottom-nav__lock">ðŸ”’</span>
            </span>
            <span class="bottom-nav__label">{{ item.label }}</span>
          </span>
        } @else {
          <a
            class="bottom-nav__item"
            [routerLink]="item.path"
            routerLinkActive="bottom-nav__item--active"
            [routerLinkActiveOptions]="{ exact: item.path === '/home' }"
          >
            <span class="bottom-nav__icon-wrap">
              <span class="bottom-nav__icon">
                <ng-container [ngTemplateOutlet]="iconTpl" [ngTemplateOutletContext]="{ $implicit: item.icon }"></ng-container>
              </span>
              @if (item.path === '/entregas' && unreadCount() > 0) {
                <span class="bottom-nav__badge"></span>
              }
            </span>
            <span class="bottom-nav__label">{{ item.label }}</span>
          </a>
        }
      }
    </nav>

    <ng-template #iconTpl let-icon>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        @if (icon.rect; as rect) {
          <rect
            [attr.x]="rect.x"
            [attr.y]="rect.y"
            [attr.width]="rect.width"
            [attr.height]="rect.height"
            [attr.rx]="rect.rx ?? null"
          ></rect>
        }
        @if (icon.circle; as circle) {
          <circle [attr.cx]="circle.cx" [attr.cy]="circle.cy" [attr.r]="circle.r"></circle>
        }
        @for (path of icon.paths ?? []; track path) {
          <path [attr.d]="path"></path>
        }
        @if (icon.polyline; as polyline) {
          <polyline [attr.points]="polyline"></polyline>
        }
        @for (line of icon.lines ?? []; track $index) {
          <line [attr.x1]="line[0]" [attr.y1]="line[1]" [attr.x2]="line[2]" [attr.y2]="line[3]"></line>
        }
      </svg>
    </ng-template>
  `,
  styleUrl: './bottom-nav.component.css',
})
export class BottomNavComponent {
  private readonly notifSvc = inject(NotificationService);
  readonly unreadCount = this.notifSvc.unreadCount;

  canReservas = input(true);
  canOcorrencias = input(true);

  navItems(): NavItem[] {
    return [
      { path: '/home', label: 'Inicio', icon: homeIcon },
      { path: '/entregas', label: 'Entregas', icon: packageIcon },
      { path: '/reservas', label: 'Reservas', icon: calendarIcon, gated: !this.canReservas() },
      { path: '/ocorrencias', label: 'Ocorrencias', icon: clipboardIcon, gated: !this.canOcorrencias() },
      { path: '/perfil', label: 'Perfil', icon: userIcon },
    ];
  }
}

const homeIcon: NavIcon = {
  paths: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
  polyline: '9 22 9 12 15 12 15 22',
};

const packageIcon: NavIcon = {
  paths: ['M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z', 'M3 7.5L12 12l9-4.5'],
  lines: [['12', '12', '12', '21']],
};

const calendarIcon: NavIcon = {
  rect: { x: 3, y: 4, width: 18, height: 18, rx: 2 },
  lines: [
    ['16', '2', '16', '6'],
    ['8', '2', '8', '6'],
    ['3', '10', '21', '10'],
  ],
};

const userIcon: NavIcon = {
  paths: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'],
  circle: { cx: 12, cy: 7, r: 4 },
};

const clipboardIcon: NavIcon = {
  paths: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'],
  rect: { x: 8, y: 2, width: 8, height: 4, rx: 1 },
  lines: [
    ['8', '12', '16', '12'],
    ['8', '16', '12', '16'],
  ],
};
