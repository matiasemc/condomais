import { Component, ChangeDetectionStrategy, inject, input, signal, effect } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { BadgeComponent } from '@condomais/ui';
import { AnnouncementService } from '@condomais/core';
import type { Announcement } from '@condomais/core';

@Component({
  selector: 'cm-announcement-detail',
  standalone: true,
  imports: [BadgeComponent, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="detail">
      <button class="back-btn" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Avisos
      </button>
      @if (aviso(); as a) {
        <cm-badge [variant]="a.prioridade === 'alta' || a.prioridade === 'urgente' ? 'warn' : 'neutral'">
          Prioridade {{ a.prioridade }}
        </cm-badge>
        <h1 class="detail__title">{{ a.titulo }}</h1>
        <p class="detail__date">Publicado em {{ a.publicadoEm | date:'dd/MM/yyyy' }}</p>
        <p class="detail__body">{{ a.mensagem }}</p>
      }
    </div>
  `,
  styleUrl: './announcement-detail.component.css',
})
export class AnnouncementDetailComponent {
  private readonly announcementService = inject(AnnouncementService);

  readonly id = input<string>('');
  readonly location = inject(Location);
  readonly aviso = signal<Announcement | null>(null);

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) void this.loadAnnouncement(id);
    });
  }

  private async loadAnnouncement(id: string): Promise<void> {
    this.aviso.set(await this.announcementService.loadById(id));
  }
}
