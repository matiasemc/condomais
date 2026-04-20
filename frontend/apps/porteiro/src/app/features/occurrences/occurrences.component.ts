import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DatePipe } from '@angular/common';
import { BadgeComponent, SectionHeaderComponent, EmptyStateComponent } from '@condomais/ui';

interface Occurrence {
  id: string;
  type: string;
  description: string;
  unit: string;
  reportedAt: string;
  status: 'aberta' | 'resolvida';
}

@Component({
  selector: 'cm-occurrences',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe, BadgeComponent, SectionHeaderComponent, EmptyStateComponent],
  templateUrl: './occurrences.component.html',
  styleUrl: './occurrences.component.scss',
})
export class OccurrencesComponent {
  occurrences = signal<Occurrence[]>([
    { id: '1', type: 'Barulho', description: 'Música alta após as 22h no apto 205.', unit: '101', reportedAt: '2026-04-19T22:30:00', status: 'aberta' },
    { id: '2', type: 'Danos', description: 'Vidro quebrado no corredor do 3º andar.', unit: '301', reportedAt: '2026-04-18T14:00:00', status: 'aberta' },
    { id: '3', type: 'Segurança', description: 'Porta de serviço encontrada aberta.', unit: '102', reportedAt: '2026-04-17T08:00:00', status: 'resolvida' },
  ]);
}