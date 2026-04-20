import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, SectionHeaderComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'cm-new-occurrence',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, SectionHeaderComponent],
  templateUrl: './new-occurrence.component.html',
  styleUrl: './new-occurrence.component.scss',
})
export class NewOccurrenceComponent {
  readonly types = [
    { id: 'barulho', label: '🔊 Barulho' },
    { id: 'danos', label: '🔨 Danos' },
    { id: 'seguranca', label: '🔒 Segurança' },
    { id: 'limpeza', label: '🧹 Limpeza' },
    { id: 'outro', label: '📋 Outro' },
  ];

  selectedType = signal("");
  description = signal("");
  saved = signal(false);

  constructor(private router: Router, private toast: ToastService) {}

  salvar() {
    if (!this.selectedType() || !this.description()) return;
    this.saved.set(true);
    this.toast.show({ message: "Ocorrência registrada", type: "success" });
    setTimeout(() => this.router.navigate(["/ocorrencias"]), 1800);
  }

  voltar() { this.router.navigate(["/ocorrencias"]); }
}