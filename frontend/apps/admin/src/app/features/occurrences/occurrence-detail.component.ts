import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BadgeComponent, ButtonComponent, EmptyStateComponent } from '@condomais/ui';
import { OccurrenceService } from '@condomais/core';
import type { Occurrence, OccurrenceImage, OccurrenceStatus } from '@condomais/core';

@Component({
  selector: 'cm-admin-occurrence-detail',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe, BadgeComponent, ButtonComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="detail-page">
      <div class="detail-page__header">
        <a class="detail-page__back" routerLink="/ocorrencias">â† Voltar</a>
        <h2 class="detail-page__title">OcorrÃªncia</h2>
      </div>

      @if (loading()) {
        <cm-empty-state icon="â³" title="Carregandoâ€¦" subtitle=""></cm-empty-state>
      } @else if (!occurrence()) {
        <cm-empty-state icon="ðŸ˜•" title="NÃ£o encontrada" subtitle="Esta ocorrÃªncia nÃ£o existe."></cm-empty-state>
      } @else {
        <div class="detail">
          <div class="detail__row">
            <cm-badge [variant]="statusVariant(occurrence()!.status)">{{ statusLabel(occurrence()!.status) }}</cm-badge>
            <span class="detail__date">{{ occurrence()!.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>

          <h3 class="detail__titulo">{{ occurrence()!.titulo ?? occurrence()!.tipo }}</h3>

          <div class="detail__chips">
            <span class="detail__chip">{{ occurrence()!.tipo }}</span>
            @if (occurrence()!.local) {
              <span class="detail__chip">ðŸ“ {{ occurrence()!.local }}</span>
            }
          </div>

          <p class="detail__descricao">{{ occurrence()!.descricao }}</p>

          @if (images().length > 0) {
            <div class="detail__images">
              @for (img of images(); track img.id) {
                <a [href]="img.imageUrl" target="_blank">
                  <img class="detail__image" [src]="img.imageUrl" alt="Foto da ocorrÃªncia">
                </a>
              }
            </div>
          }

          <div class="detail__actions">
            <h4 class="detail__actions-title">Atualizar Status</h4>

            <div class="detail__field">
              <label class="detail__label">Novo status</label>
              <select class="detail__select" [(ngModel)]="newStatus">
                <option value="aberta">Aberta</option>
                <option value="em_analise">Em anÃ¡lise</option>
                <option value="resolvida">Resolvida</option>
              </select>
            </div>

            <div class="detail__field">
              <label class="detail__label">Resposta / ResoluÃ§Ã£o (opcional)</label>
              <textarea class="detail__textarea" [(ngModel)]="resolucao"
                placeholder="Descreva as aÃ§Ãµes tomadas..." rows="3"></textarea>
            </div>

            <cm-button (click)="saveStatus()" [disabled]="saving()">
              @if (saving()) { Salvandoâ€¦ }
              @else { Salvar AlteraÃ§Ãµes }
            </cm-button>

            @if (saveSuccess()) {
              <p class="detail__success">âœ“ Status atualizado com sucesso.</p>
            }
            @if (saveError()) {
              <p class="detail__error">{{ saveError() }}</p>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './occurrence-detail.component.css',
})
export class AdminOccurrenceDetailComponent implements OnInit {
  private readonly route         = inject(ActivatedRoute);
  private readonly occurrenceSvc = inject(OccurrenceService);

  occurrence  = signal<Occurrence | null>(null);
  images      = signal<OccurrenceImage[]>([]);
  loading     = signal(true);
  saving      = signal(false);
  saveSuccess = signal(false);
  saveError   = signal<string | null>(null);

  newStatus = 'aberta';
  resolucao = '';

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id')!;
    const [occ, imgs] = await Promise.all([
      this.occurrenceSvc.loadById(id),
      this.occurrenceSvc.loadImages(id),
    ]);
    this.occurrence.set(occ);
    this.images.set(imgs);
    this.newStatus = occ?.status ?? 'aberta';
    this.resolucao = occ?.resolucao ?? '';
    this.loading.set(false);
  }

  async saveStatus(): Promise<void> {
    const occ = this.occurrence();
    if (!occ) return;
    this.saving.set(true);
    this.saveSuccess.set(false);
    this.saveError.set(null);
    const ok = await this.occurrenceSvc.updateStatus(
      occ.id,
      this.newStatus as OccurrenceStatus,
      this.resolucao || undefined,
    );
    this.saving.set(false);
    if (ok) {
      this.saveSuccess.set(true);
      this.occurrence.update(o => o ? { ...o, status: this.newStatus as OccurrenceStatus, resolucao: this.resolucao || o.resolucao } : o);
      setTimeout(() => this.saveSuccess.set(false), 3000);
    } else {
      this.saveError.set('Erro ao atualizar. Tente novamente.');
    }
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      aberta: 'Aberta', em_analise: 'Em anÃ¡lise',
      resolvida: 'Resolvida', encerrada: 'Encerrada',
    };
    return map[status] ?? status;
  }

  statusVariant(status: string): 'accent' | 'warning' | 'success' {
    if (status === 'aberta') return 'accent';
    if (status === 'em_analise') return 'warning';
    return 'success';
  }
}
