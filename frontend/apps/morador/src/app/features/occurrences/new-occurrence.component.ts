import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent, SpinnerComponent } from '@condomais/ui';
import { OccurrenceService, UploadService, AuthState } from '@condomais/core';
import type { OccurrenceTipo } from '@condomais/core';

@Component({
  selector: 'cm-new-occurrence',
  standalone: true,
  imports: [FormsModule, ButtonComponent, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <button class="page__back" (click)="router.navigate(['/ocorrencias'])">←</button>
        <h1 class="page__title">Nova Ocorrência</h1>
      </div>

      <form class="form" (ngSubmit)="submit()">
        <div class="form__field">
          <label class="form__label">Título *</label>
          <input class="form__input" type="text" [(ngModel)]="titulo" name="titulo"
            placeholder="Descreva brevemente o problema" required maxlength="200">
        </div>

        <div class="form__field">
          <label class="form__label">Tipo *</label>
          <select class="form__select" [(ngModel)]="tipo" name="tipo" required>
            <option value="">Selecione...</option>
            <option value="ruido">Barulho / Ruído</option>
            <option value="vandalismo">Vandalismo</option>
            <option value="acidente">Acidente</option>
            <option value="entrada_suspeita">Entrada Suspeita</option>
            <option value="entrada_nao_autorizada">Entrada Não Autorizada</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div class="form__field">
          <label class="form__label">Local (opcional)</label>
          <input class="form__input" type="text" [(ngModel)]="local" name="local"
            placeholder="Ex: Garagem, Corredor 3º andar...">
        </div>

        <div class="form__field">
          <label class="form__label">Descrição *</label>
          <textarea class="form__textarea" [(ngModel)]="descricao" name="descricao"
            placeholder="Descreva o ocorrido com detalhes..." rows="4" required></textarea>
        </div>

        <div class="form__field">
          <label class="form__label">Foto (opcional)</label>
          <div class="upload-area" (click)="fileInput.click()">
            @if (previewUrl()) {
              <img class="upload-area__preview" [src]="previewUrl()" alt="Preview">
              <button type="button" class="upload-area__remove" (click)="removeImage($event)">✕</button>
            } @else {
              <span class="upload-area__icon">📷</span>
              <span class="upload-area__hint">Toque para adicionar foto</span>
            }
          </div>
          <input #fileInput type="file" accept="image/*" style="display:none"
            (change)="onFileSelected($event)">
          @if (fileError()) {
            <p class="form__error">{{ fileError() }}</p>
          }
        </div>

        <div class="form__actions">
          <cm-button type="submit" [disabled]="submitting() || !titulo || !tipo || !descricao">
            @if (submitting()) { <cm-spinner [size]="16"></cm-spinner> }
            @else { Registrar Ocorrência }
          </cm-button>
        </div>

        @if (submitError()) {
          <p class="form__error form__error--global">{{ submitError() }}</p>
        }
      </form>
    </div>
  `,
  styleUrl: './new-occurrence.component.scss',
})
export class NewOccurrenceComponent {
  readonly router              = inject(Router);
  private readonly occurrenceSvc = inject(OccurrenceService);
  private readonly uploadSvc     = inject(UploadService);
  private readonly authState     = inject(AuthState);

  titulo    = '';
  tipo: OccurrenceTipo | '' = '';
  local     = '';
  descricao = '';

  selectedFile = signal<File | null>(null);
  previewUrl   = signal<string | null>(null);
  fileError    = signal<string | null>(null);
  submitting   = signal(false);
  submitError  = signal<string | null>(null);

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      this.fileError.set('Arquivo muito grande. Máximo 5 MB.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      this.fileError.set('Apenas imagens são permitidas.');
      return;
    }
    this.fileError.set(null);
    this.selectedFile.set(file);
    const reader = new FileReader();
    reader.onload = (e) => this.previewUrl.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  removeImage(event: Event): void {
    event.stopPropagation();
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.fileError.set(null);
  }

  async submit(): Promise<void> {
    const user   = this.authState.user();
    const tenant = this.authState.currentTenant();
    if (!user || !tenant || !this.titulo || !this.tipo || !this.descricao) return;

    this.submitting.set(true);
    this.submitError.set(null);

    const occurrence = await this.occurrenceSvc.create({
      condominioId: tenant.id,
      userId:       user.id,
      titulo:       this.titulo,
      tipo:         this.tipo as OccurrenceTipo,
      descricao:    this.descricao,
      local:        this.local || undefined,
    });

    if (!occurrence) {
      this.submitError.set('Erro ao registrar ocorrência. Tente novamente.');
      this.submitting.set(false);
      return;
    }

    const file = this.selectedFile();
    if (file) {
      try {
        const compressed = await this.uploadSvc.compress(file);
        const path = this.uploadSvc.buildPath(tenant.id, occurrence.id, compressed);
        const url  = await this.uploadSvc.upload('ocorrencias', path, compressed);
        await this.occurrenceSvc.addImage(occurrence.id, url);
      } catch {
        // Image upload failure is non-blocking — occurrence was already saved
      }
    }

    this.submitting.set(false);
    this.router.navigate(['/ocorrencias', occurrence.id]);
  }
}
