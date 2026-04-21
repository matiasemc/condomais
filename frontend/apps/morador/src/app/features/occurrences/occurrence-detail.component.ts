import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BadgeComponent, EmptyStateComponent } from '@condomais/ui';
import { OccurrenceService } from '@condomais/core';
import type { Occurrence, OccurrenceImage } from '@condomais/core';

@Component({
  selector: 'cm-occurrence-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, BadgeComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <a class="page__back" routerLink="/ocorrencias">←</a>
        <h1 class="page__title">Ocorrência</h1>
      </div>

      @if (loading()) {
        <cm-empty-state icon="⏳" title="Carregando…" subtitle=""></cm-empty-state>
      } @else if (!occurrence()) {
        <cm-empty-state icon="😕" title="Não encontrada"
          subtitle="Esta ocorrência não existe ou você não tem acesso."></cm-empty-state>
      } @else {
        <div class="detail">
          <div class="detail__status-bar">
            <cm-badge [variant]="statusVariant(occurrence()!.status)">{{ statusLabel(occurrence()!.status) }}</cm-badge>
            <span class="detail__date">{{ occurrence()!.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>

          <h2 class="detail__titulo">{{ occurrence()!.titulo ?? occurrence()!.tipo }}</h2>

          <div class="detail__meta">
            <span class="detail__chip">{{ tipoLabel(occurrence()!.tipo) }}</span>
            @if (occurrence()!.local) {
              <span class="detail__chip">📍 {{ occurrence()!.local }}</span>
            }
          </div>

          <p class="detail__descricao">{{ occurrence()!.descricao }}</p>

          @if (images().length > 0) {
            <div class="detail__images">
              @for (img of images(); track img.id) {
                <img class="detail__image" [src]="img.imageUrl" [alt]="'Foto ' + img.ordem">
              }
            </div>
          }

          @if (occurrence()!.resolucao) {
            <div class="detail__resolution">
              <p class="detail__resolution-label">Resposta do condomínio:</p>
              <p class="detail__resolution-text">{{ occurrence()!.resolucao }}</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './occurrence-detail.component.scss',
})
export class OccurrenceDetailComponent implements OnInit {
  private readonly route         = inject(ActivatedRoute);
  private readonly occurrenceSvc = inject(OccurrenceService);

  occurrence = signal<Occurrence | null>(null);
  images     = signal<OccurrenceImage[]>([]);
  loading    = signal(true);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id')!;
    const [occ, imgs] = await Promise.all([
      this.occurrenceSvc.loadById(id),
      this.occurrenceSvc.loadImages(id),
    ]);
    this.occurrence.set(occ);
    this.images.set(imgs);
    this.loading.set(false);
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      aberta: 'Aberta', em_analise: 'Em análise',
      resolvida: 'Resolvida', encerrada: 'Encerrada',
    };
    return map[status] ?? status;
  }

  statusVariant(status: string): 'accent' | 'warning' | 'success' {
    if (status === 'aberta') return 'accent';
    if (status === 'em_analise') return 'warning';
    return 'success';
  }

  tipoLabel(tipo: string): string {
    const map: Record<string, string> = {
      ruido: '🔊 Ruído', vandalismo: '🔨 Vandalismo',
      acidente: '⚠️ Acidente', entrada_suspeita: '👀 Entrada Suspeita',
      entrada_nao_autorizada: '🚫 Entrada Não Autorizada', outro: '📋 Outro',
    };
    return map[tipo] ?? tipo;
  }
}
