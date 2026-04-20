import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BadgeComponent, SectionHeaderComponent, EmptyStateComponent } from '@condomais/ui';

interface Announcement {
  id: string;
  title: string;
  body: string;
  priority: 'alta' | 'media' | 'baixa';
  pinned: boolean;
  publishedAt: string;
}

@Component({
  selector: 'cm-announcements',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, BadgeComponent, SectionHeaderComponent, EmptyStateComponent],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
})
export class AnnouncementsComponent {
  announcements = signal<Announcement[]>([
    { id: '1', title: 'Manutenção elevador', body: 'O elevador ficará inativo no sábado das 8h às 17h.', priority: 'alta', pinned: true, publishedAt: '2026-04-20T08:00:00' },
    { id: '2', title: 'Reunião de condomínio', body: 'Próxima reunião no dia 25/04 às 19h no salão.', priority: 'media', pinned: false, publishedAt: '2026-04-18T10:00:00' },
    { id: '3', title: 'Coleta seletiva', body: 'A coleta seletiva acontece toda terça-feira.', priority: 'baixa', pinned: false, publishedAt: '2026-04-15T09:00:00' },
  ]);

  priorityColor(p: Announcement['priority']): string {
    return p === 'alta' ? 'var(--c-warn)' : p === 'media' ? 'var(--c-accent)' : 'var(--c-text-muted)';
  }
}