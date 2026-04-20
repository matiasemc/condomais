import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { BadgeComponent } from '../../../../../libs/ui/src/lib/components/badge/badge.component';

@Component({
  selector: 'cm-announcement-detail',
  standalone: true,
  imports: [BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="detail">
      <button class="back-btn" (click)="location.back()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg>
        Avisos
      </button>
      <cm-badge variant="warn">Prioridade alta</cm-badge>
      <h1 class="detail__title">Manutenção da piscina</h1>
      <p class="detail__date">Publicado em 20 de abril de 2026</p>
      <p class="detail__body">A piscina do condomínio estará fechada para manutenção preventiva entre os dias 22 e 25 de abril. Os serviços incluem limpeza do filtro, troca de água e verificação do sistema de aquecimento. Agradecemos a compreensão de todos.</p>
    </div>
  `,
  styleUrl: './announcement-detail.component.scss',
})
export class AnnouncementDetailComponent {
  id       = input<string>('');
  location = inject(Location);
}
