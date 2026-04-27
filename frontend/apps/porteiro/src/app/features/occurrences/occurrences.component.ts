import { Component, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BadgeComponent, SectionHeaderComponent, EmptyStateComponent } from '@condomais/ui';
import { AuthState, OccurrenceService } from '@condomais/core';

@Component({
  selector: 'cm-occurrences',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe, BadgeComponent, SectionHeaderComponent, EmptyStateComponent],
  templateUrl: './occurrences.component.html',
  styleUrl: './occurrences.component.css',
})
export class OccurrencesComponent {
  private readonly occurrenceService = inject(OccurrenceService);
  private readonly authState = inject(AuthState);

  readonly occurrences = this.occurrenceService.occurrences;

  constructor() {
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant) void this.occurrenceService.loadForTenant(tenant.id);
    });
  }
}
