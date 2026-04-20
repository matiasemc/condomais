import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem { path: string; label: string; icon: string; }

@Component({
  selector: 'cm-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
          <span>🏠</span>
          <span>App morador</span>
        </a>
      </div>
    </aside>
  `,
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  items: NavItem[] = [
    { path: '/home',        label: 'Painel',      icon: dashIcon },
    { path: '/moradores',   label: 'Moradores',   icon: usersIcon },
    { path: '/entregas',    label: 'Entregas',    icon: pkgIcon },
    { path: '/avisos',      label: 'Avisos',      icon: bellIcon },
    { path: '/ocorrencias', label: 'Ocorrencias', icon: alertIcon },
  ];
}

const dashIcon  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`;
const usersIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const pkgIcon   = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5L12 12l9-4.5"/><line x1="12" y1="12" x2="12" y2="21"/></svg>`;
const bellIcon  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
const alertIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
