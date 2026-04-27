import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, SectionHeaderComponent } from '@condomais/ui';
import { AuthState, OccurrenceService } from '@condomais/core';
import type { OccurrenceTipo } from '@condomais/core';
import { ToastService } from '../../core/toast.service';

type OccurrenceTypeOption = {
  id: OccurrenceTipo;
  label: string;
};

@Component({
  selector: 'cm-new-occurrence',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, SectionHeaderComponent],
  templateUrl: './new-occurrence.component.html',
  styleUrl: './new-occurrence.component.css',
})
export class NewOccurrenceComponent {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly authState = inject(AuthState);
  private readonly occurrenceService = inject(OccurrenceService);

  readonly types: OccurrenceTypeOption[] = [
    { id: 'ruido', label: 'Barulho' },
    { id: 'vandalismo', label: 'Danos' },
    { id: 'entrada_suspeita', label: 'Seguranca' },
    { id: 'outro', label: 'Limpeza' },
    { id: 'outro', label: 'Outro' },
  ];

  selectedType = signal<OccurrenceTipo | ''>('');
  description = signal('');
  saved = signal(false);

  async salvar(): Promise<void> {
    const tenant = this.authState.currentTenant();
    const user = this.authState.user();
    const tipo = this.selectedType();
    const descricao = this.description().trim();
    if (!tenant || !user || !tipo || !descricao) return;

    const occurrence = await this.occurrenceService.create({
      condominioId: tenant.id,
      userId: user.id,
      titulo: this.types.find(t => t.id === tipo)?.label ?? 'Ocorrencia',
      tipo,
      descricao,
    });

    if (occurrence) {
      this.saved.set(true);
      this.toast.show({ message: 'Ocorrencia registrada', type: 'success' });
      setTimeout(() => this.router.navigate(['/ocorrencias']), 1800);
    } else {
      this.toast.show({ message: 'Erro ao registrar ocorrencia', type: 'error' });
    }
  }

  voltar(): void {
    this.router.navigate(['/ocorrencias']);
  }
}
