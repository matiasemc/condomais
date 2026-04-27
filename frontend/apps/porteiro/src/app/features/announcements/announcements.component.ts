import { Component, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BadgeComponent, SectionHeaderComponent, EmptyStateComponent } from '@condomais/ui';
import { AnnouncementService, AuthState } from '@condomais/core';
import type { AnnouncementPriority } from '@condomais/core';

@Component({
  selector: 'cm-announcements',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, BadgeComponent, SectionHeaderComponent, EmptyStateComponent],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css',
})
export class AnnouncementsComponent {
  private readonly announcementService = inject(AnnouncementService);
  private readonly authState = inject(AuthState);

  readonly announcements = this.announcementService.announcements;

  constructor() {
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant) void this.announcementService.loadForTenant(tenant.id);
    });
  }

  priorityColor(p: AnnouncementPriority): string {
    return p === 'alta' ? 'var(--c-warn)' : p === 'media' ? 'var(--c-accent)' : 'var(--c-text-muted)';
  }
}
