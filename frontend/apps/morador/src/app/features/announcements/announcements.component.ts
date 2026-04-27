import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BadgeComponent } from '@condomais/ui';
import { AnnouncementService, AuthState } from '@condomais/core';

@Component({
  selector: 'cm-announcements',
  standalone: true,
  imports: [DatePipe, RouterLink, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Avisos</h1>
      </div>
      <div class="list">
        @for (a of avisos(); track a.id) {
          <a class="announce-row" [routerLink]="['/avisos', a.id]">
            <div [class]="'announce-row__bar announce-row__bar--' + a.prioridade"></div>
            <div class="announce-row__body">
              <div class="announce-row__top">
                <span class="announce-row__title">{{ a.titulo }}</span>
                @if (a.fixado) { <cm-badge variant="accent">Fixado</cm-badge> }
              </div>
              <p class="announce-row__msg">{{ a.mensagem }}</p>
              <span class="announce-row__date">{{ a.publicadoEm | date:'dd/MM/yyyy' }}</span>
            </div>
          </a>
        }
      </div>
    </div>
  `,
  styleUrl: './announcements.component.css',
})
export class AnnouncementsComponent {
  private readonly announcementService = inject(AnnouncementService);
  private readonly authState = inject(AuthState);

  readonly avisos = this.announcementService.announcements;

  constructor() {
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant) void this.announcementService.loadForTenant(tenant.id);
    });
  }
}
