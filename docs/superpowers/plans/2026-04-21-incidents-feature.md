# Incidents Feature (Ocorrências) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement morador-reported incident management with image upload, status tracking, role-based views, and realtime notifications.

**Architecture:** Extends the existing `ocorrencias` table (already in schema) via a migration that adds `user_id` and `titulo` fields, then wires Angular services (`UploadService`, `OccurrenceService`) through the shared `libs/core` library following the identical pattern as `DeliveryService`. Realtime notifications flow through the existing `NotificationService` by subscribing to a new `OccurrenceService.realtimeEvents$` Subject.

**Tech Stack:** Angular 19 Standalone + Signals, Supabase JS v2 (Storage + Realtime), RxJS Subject, SCSS BEM, `libs/core` monorepo library.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `supabase/migrations/20260421000001_ocorrencias_morador.sql` | Schema updates + RLS + Realtime |
| Create | `supabase/migrations/20260421000002_ocorrencias_storage.sql` | Storage bucket + policies |
| Modify | `frontend/libs/core/src/lib/models/index.ts` | Add Occurrence models; extend NotificationType |
| Create | `frontend/libs/core/src/lib/services/upload.service.ts` | Supabase Storage upload |
| Create | `frontend/libs/core/src/lib/services/occurrence.service.ts` | CRUD + realtime events |
| Modify | `frontend/libs/core/src/lib/services/notification.service.ts` | Subscribe to occurrence events |
| Modify | `frontend/libs/core/src/index.ts` | Export new services + types |
| Modify | `frontend/apps/morador/src/app/layout/app-shell/app-shell.component.ts` | Subscribe occurrence channel at shell level |
| Create | `frontend/apps/morador/src/app/features/occurrences/occurrences.component.ts` | Morador list |
| Create | `frontend/apps/morador/src/app/features/occurrences/occurrences.component.scss` | List styles |
| Create | `frontend/apps/morador/src/app/features/occurrences/new-occurrence.component.ts` | Create form + image upload |
| Create | `frontend/apps/morador/src/app/features/occurrences/new-occurrence.component.scss` | Form styles |
| Create | `frontend/apps/morador/src/app/features/occurrences/occurrence-detail.component.ts` | Morador detail |
| Create | `frontend/apps/morador/src/app/features/occurrences/occurrence-detail.component.scss` | Detail styles |
| Modify | `frontend/apps/morador/src/app/app.routes.ts` | Add /ocorrencias routes |
| Modify | `frontend/apps/morador/src/app/layout/bottom-nav/bottom-nav.component.ts` | Replace marketplace with ocorrencias |
| Create | `frontend/apps/admin/src/app/core/toast.service.ts` | Admin toast |
| Modify | `frontend/apps/admin/src/app/layout/shell.component.ts` | Toast + occurrence subscription |
| Create | `frontend/apps/admin/src/app/features/occurrences/occurrences.component.ts` | Admin list + filter |
| Create | `frontend/apps/admin/src/app/features/occurrences/occurrences.component.scss` | Admin list styles |
| Create | `frontend/apps/admin/src/app/features/occurrences/occurrence-detail.component.ts` | Admin detail + status update |
| Create | `frontend/apps/admin/src/app/features/occurrences/occurrence-detail.component.scss` | Admin detail styles |
| Modify | `frontend/apps/admin/src/app/app.routes.ts` | Add /ocorrencias routes |

---

## Task 1: SQL Migration — Schema Updates + RLS + Realtime

**Files:**
- Create: `supabase/migrations/20260421000001_ocorrencias_morador.sql`

- [ ] **Step 1: Create migration file**

The existing `ocorrencias` table was designed for porteiro-reported incidents. We need to add morador support (`user_id`, `titulo`) and extend the `status` constraint to include `em_analise`. We also update RLS so moradores can INSERT and SELECT their own records.

```sql
-- ============================================================
-- Migration: Morador support for ocorrencias
-- ============================================================

-- 1. Add user_id (morador who reported) and titulo
ALTER TABLE public.ocorrencias
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS titulo  VARCHAR(200);

-- 2. Extend status constraint to include em_analise
ALTER TABLE public.ocorrencias
  DROP CONSTRAINT IF EXISTS ck_ocorrencias_status;

ALTER TABLE public.ocorrencias
  ADD CONSTRAINT ck_ocorrencias_status
    CHECK (status IN ('aberta', 'em_analise', 'investigando', 'resolvida', 'encerrada'));

-- 3. Index on user_id for morador queries
CREATE INDEX IF NOT EXISTS idx_ocorrencias_user_id
  ON public.ocorrencias(user_id)
  WHERE user_id IS NOT NULL;

-- 4. RLS: Replace existing insert + select policies
--    Old insert only allowed staff — moradores need to insert their own
DROP POLICY IF EXISTS "ocorrencias_insert_staff" ON public.ocorrencias;

CREATE POLICY "ocorrencias_insert_staff_or_morador"
  ON public.ocorrencias FOR INSERT
  WITH CHECK (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['porteiro', 'sindico', 'conselho'])
    OR (
      user_id = (SELECT auth.uid())
      AND public.has_role(condominio_id, 'morador')
    )
  );

--    Old select allowed all members — moradores should only see own
DROP POLICY IF EXISTS "ocorrencias_select_member" ON public.ocorrencias;

CREATE POLICY "ocorrencias_select_staff"
  ON public.ocorrencias FOR SELECT
  USING (
    public.is_master_admin()
    OR public.has_any_role(condominio_id, ARRAY['porteiro', 'sindico', 'conselho'])
  );

CREATE POLICY "ocorrencias_select_own_morador"
  ON public.ocorrencias FOR SELECT
  USING (
    user_id = (SELECT auth.uid())
    AND public.has_role(condominio_id, 'morador')
  );

-- 5. Allow morador to insert images on their own occurrence
DROP POLICY IF EXISTS "ocorrencia_imagens_insert" ON public.ocorrencia_imagens;

CREATE POLICY "ocorrencia_imagens_insert"
  ON public.ocorrencia_imagens FOR INSERT
  WITH CHECK (
    public.is_master_admin()
    OR EXISTS (
      SELECT 1 FROM public.ocorrencias o
      JOIN public.user_condominios uc
        ON uc.condominio_id = o.condominio_id
       AND uc.user_id = (SELECT auth.uid())
       AND uc.status = 'active'
      WHERE o.id = ocorrencia_imagens.ocorrencia_id
        AND (
          uc.role IN ('porteiro', 'sindico', 'conselho')
          OR o.user_id = (SELECT auth.uid())
        )
    )
  );

-- 6. Realtime
ALTER TABLE public.ocorrencias REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'ocorrencias'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.ocorrencias;
  END IF;
END $$;
```

- [ ] **Step 2: Commit**

```bash
git add supabase/migrations/20260421000001_ocorrencias_morador.sql
git commit -m "feat(db): extend ocorrencias for morador self-reporting + RLS + realtime"
```

---

## Task 2: SQL Migration — Storage Bucket

**Files:**
- Create: `supabase/migrations/20260421000002_ocorrencias_storage.sql`

- [ ] **Step 1: Create storage migration**

Public bucket so images are accessible via URL without signed tokens. Authenticated users can upload; public can read.

```sql
-- ============================================================
-- Migration: Storage bucket for occurrence images
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'ocorrencias',
  'ocorrencias',
  true,
  5242880,  -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Any authenticated user can upload (path scoping enforced in app)
CREATE POLICY "ocorrencias_storage_insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'ocorrencias');

-- Public read
CREATE POLICY "ocorrencias_storage_select"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'ocorrencias');

-- Owner can delete their files
CREATE POLICY "ocorrencias_storage_delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'ocorrencias' AND owner = auth.uid()::text);
```

- [ ] **Step 2: Commit**

```bash
git add supabase/migrations/20260421000002_ocorrencias_storage.sql
git commit -m "feat(db): add ocorrencias storage bucket with size/type limits"
```

---

## Task 3: Core Models

**Files:**
- Modify: `frontend/libs/core/src/lib/models/index.ts`

- [ ] **Step 1: Add Occurrence types and extend notification types**

Append to the end of `models/index.ts`. Also change `deliveryId: string` → `deliveryId?: string` and add `ocorrenciaId?: string` to `AppNotification`. And extend `NotificationType`.

Replace the existing `NotificationType` and `AppNotification` block:

```typescript
// OLD:
export type NotificationType = 'nova_entrega' | 'entrega_retirada';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  deliveryId: string;
  read: boolean;
  createdAt: Date;
}
```

With:

```typescript
export type NotificationType =
  | 'nova_entrega'
  | 'entrega_retirada'
  | 'nova_ocorrencia'
  | 'ocorrencia_atualizada';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  deliveryId?: string;
  ocorrenciaId?: string;
  read: boolean;
  createdAt: Date;
}
```

Then append at the end of the file:

```typescript
export type OccurrenceStatus = 'aberta' | 'em_analise' | 'resolvida';
export type OccurrenceTipo =
  | 'entrada_suspeita'
  | 'ruido'
  | 'vandalismo'
  | 'acidente'
  | 'entrada_nao_autorizada'
  | 'outro';

export interface Occurrence {
  id: string;
  condominioId: string;
  userId: string | null;
  porteiroId: string | null;
  titulo: string | null;
  tipo: OccurrenceTipo;
  descricao: string;
  local: string | null;
  dataOcorrido: string;
  status: OccurrenceStatus;
  resolvidaPor: string | null;
  resolucao: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OccurrenceImage {
  id: string;
  ocorrenciaId: string;
  imageUrl: string;
  ordem: number;
  createdAt: string;
}

export interface CreateOccurrenceInput {
  condominioId: string;
  userId: string;
  titulo: string;
  tipo: OccurrenceTipo;
  descricao: string;
  local?: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/libs/core/src/lib/models/index.ts
git commit -m "feat(core): add Occurrence models and extend NotificationType"
```

---

## Task 4: UploadService

**Files:**
- Create: `frontend/libs/core/src/lib/services/upload.service.ts`

- [ ] **Step 1: Create UploadService**

Folder structure: `{condominioId}/{ocorrenciaId}/{uuid}-{sanitized_name}`

```typescript
import { Injectable, inject } from '@angular/core';
import { SUPABASE_CLIENT } from '../supabase/client';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  async upload(bucket: string, path: string, file: File): Promise<string> {
    const { error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: false, contentType: file.type });
    if (error) throw new Error(error.message);
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  buildPath(condominioId: string, ocorrenciaId: string, file: File): string {
    const uuid = crypto.randomUUID();
    const ext = file.name.split('.').pop() ?? 'jpg';
    return `${condominioId}/${ocorrenciaId}/${uuid}.${ext}`;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/libs/core/src/lib/services/upload.service.ts
git commit -m "feat(core): add UploadService for Supabase Storage"
```

---

## Task 5: OccurrenceService

**Files:**
- Create: `frontend/libs/core/src/lib/services/occurrence.service.ts`

- [ ] **Step 1: Create OccurrenceService**

Same pattern as `DeliveryService`: signals for state, `RealtimeChannel` for subscriptions, `Subject` for cross-service events.

```typescript
import { Injectable, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/client';
import type { Occurrence, OccurrenceImage, OccurrenceStatus, CreateOccurrenceInput } from '../models/index';

export interface OccurrenceRealtimeEvent {
  eventType: 'INSERT' | 'UPDATE';
  occurrence: Occurrence;
}

function mapRow(row: any): Occurrence {
  return {
    id:           row.id,
    condominioId: row.condominio_id,
    userId:       row.user_id ?? null,
    porteiroId:   row.porteiro_id ?? null,
    titulo:       row.titulo ?? null,
    tipo:         row.tipo,
    descricao:    row.descricao,
    local:        row.local ?? null,
    dataOcorrido: row.data_ocorrido,
    status:       row.status,
    resolvidaPor: row.resolvida_por ?? null,
    resolucao:    row.resolucao ?? null,
    createdAt:    row.created_at,
    updatedAt:    row.updated_at,
  };
}

function mapImageRow(row: any): OccurrenceImage {
  return {
    id:           row.id,
    ocorrenciaId: row.ocorrencia_id,
    imageUrl:     row.image_url,
    ordem:        row.ordem,
    createdAt:    row.created_at,
  };
}

@Injectable({ providedIn: 'root' })
export class OccurrenceService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  readonly occurrences  = signal<Occurrence[]>([]);
  readonly isLoading    = signal(false);
  readonly error        = signal<string | null>(null);

  private channel: RealtimeChannel | null = null;

  readonly realtimeEvents$ = new Subject<OccurrenceRealtimeEvent>();

  // ── Subscriptions ──────────────────────────────────────────

  subscribeToTenant(condominioId: string): void {
    this.stopRealtime();
    this.channel = this.supabase
      .channel(`ocorrencias:tenant:${condominioId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ocorrencias', filter: `condominio_id=eq.${condominioId}` },
        (payload) => this.handleRealtimeEvent(payload),
      )
      .subscribe();
  }

  subscribeForUser(userId: string): void {
    this.stopRealtime();
    this.channel = this.supabase
      .channel(`ocorrencias:user:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ocorrencias', filter: `user_id=eq.${userId}` },
        (payload) => this.handleRealtimeEvent(payload),
      )
      .subscribe();
  }

  stopRealtime(): void {
    if (this.channel) {
      this.supabase.removeChannel(this.channel);
      this.channel = null;
    }
  }

  private handleRealtimeEvent(payload: any): void {
    const { eventType, new: newRow, old: oldRow } = payload;
    if (eventType === 'INSERT') {
      const occurrence = mapRow(newRow);
      this.occurrences.update(list => [occurrence, ...list]);
      this.realtimeEvents$.next({ eventType: 'INSERT', occurrence });
    } else if (eventType === 'UPDATE') {
      const occurrence = mapRow(newRow);
      this.occurrences.update(list => list.map(o => o.id === occurrence.id ? occurrence : o));
      this.realtimeEvents$.next({ eventType: 'UPDATE', occurrence });
    } else if (eventType === 'DELETE') {
      this.occurrences.update(list => list.filter(o => o.id !== oldRow.id));
    }
  }

  // ── Queries ───────────────────────────────────────────────

  async loadMyOccurrences(condominioId: string, userId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    const { data, error } = await this.supabase
      .from('ocorrencias')
      .select('*')
      .eq('condominio_id', condominioId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    this.isLoading.set(false);
    if (error) { this.error.set(error.message); return; }
    this.occurrences.set((data ?? []).map(mapRow));
  }

  async loadForTenant(condominioId: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    const { data, error } = await this.supabase
      .from('ocorrencias')
      .select('*')
      .eq('condominio_id', condominioId)
      .order('created_at', { ascending: false });
    this.isLoading.set(false);
    if (error) { this.error.set(error.message); return; }
    this.occurrences.set((data ?? []).map(mapRow));
  }

  async loadById(id: string): Promise<Occurrence | null> {
    const { data, error } = await this.supabase
      .from('ocorrencias')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return mapRow(data);
  }

  async loadImages(ocorrenciaId: string): Promise<OccurrenceImage[]> {
    const { data, error } = await this.supabase
      .from('ocorrencia_imagens')
      .select('*')
      .eq('ocorrencia_id', ocorrenciaId)
      .order('ordem');
    if (error || !data) return [];
    return data.map(mapImageRow);
  }

  async create(input: CreateOccurrenceInput): Promise<Occurrence | null> {
    const { data, error } = await this.supabase
      .from('ocorrencias')
      .insert({
        condominio_id: input.condominioId,
        user_id:       input.userId,
        titulo:        input.titulo,
        tipo:          input.tipo,
        descricao:     input.descricao,
        local:         input.local ?? null,
        status:        'aberta',
      })
      .select()
      .single();
    if (error || !data) { this.error.set(error?.message ?? 'Erro ao criar ocorrência'); return null; }
    const occurrence = mapRow(data);
    this.occurrences.update(list => [occurrence, ...list]);
    return occurrence;
  }

  async addImage(ocorrenciaId: string, imageUrl: string, ordem = 0): Promise<boolean> {
    const { error } = await this.supabase
      .from('ocorrencia_imagens')
      .insert({ ocorrencia_id: ocorrenciaId, image_url: imageUrl, ordem });
    return !error;
  }

  async updateStatus(id: string, status: OccurrenceStatus, resolucao?: string): Promise<boolean> {
    const patch: any = { status };
    if (resolucao !== undefined) patch.resolucao = resolucao;
    const { error } = await this.supabase
      .from('ocorrencias')
      .update(patch)
      .eq('id', id);
    if (error) { this.error.set(error.message); return false; }
    this.occurrences.update(list =>
      list.map(o => o.id === id ? { ...o, status, resolucao: resolucao ?? o.resolucao } : o)
    );
    return true;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/libs/core/src/lib/services/occurrence.service.ts
git commit -m "feat(core): add OccurrenceService with CRUD, realtime, and image support"
```

---

## Task 6: Extend NotificationService

**Files:**
- Modify: `frontend/libs/core/src/lib/services/notification.service.ts`

- [ ] **Step 1: Replace file content**

Change `private readonly sub: Subscription` to `private readonly sub = new Subscription()` so we can add multiple subscriptions. Import `OccurrenceService`. Add occurrence subscription.

```typescript
import { Injectable, inject, signal, computed, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeliveryService } from './delivery.service';
import { OccurrenceService } from './occurrence.service';
import type { AppNotification } from '../models/index';

@Injectable({ providedIn: 'root' })
export class NotificationService implements OnDestroy {
  private readonly deliveryService  = inject(DeliveryService);
  private readonly occurrenceService = inject(OccurrenceService);
  private readonly sub = new Subscription();

  readonly notifications = signal<AppNotification[]>([]);
  readonly unreadCount   = computed(() => this.notifications().filter(n => !n.read).length);

  constructor() {
    this.sub.add(
      this.deliveryService.realtimeEvents$.subscribe(event => {
        const d = event.delivery;
        if (event.eventType === 'INSERT') {
          this.push({
            id: crypto.randomUUID(), type: 'nova_entrega', title: 'Nova entrega',
            body: `${d.transportadora ?? d.tipo} chegou — Apto ${d.unidade}`,
            deliveryId: d.id, read: false, createdAt: new Date(),
          });
        } else if (event.eventType === 'UPDATE' && d.status === 'retirada') {
          this.push({
            id: crypto.randomUUID(), type: 'entrega_retirada', title: 'Entrega retirada',
            body: `Entrega do Apto ${d.unidade} foi retirada`,
            deliveryId: d.id, read: false, createdAt: new Date(),
          });
        }
      })
    );

    this.sub.add(
      this.occurrenceService.realtimeEvents$.subscribe(event => {
        const o = event.occurrence;
        if (event.eventType === 'INSERT') {
          this.push({
            id: crypto.randomUUID(), type: 'nova_ocorrencia', title: 'Nova ocorrência',
            body: `${o.titulo ?? o.tipo} registrada`,
            ocorrenciaId: o.id, read: false, createdAt: new Date(),
          });
        } else if (event.eventType === 'UPDATE') {
          const label: Record<string, string> = {
            em_analise: 'Em análise',
            resolvida:  'Resolvida',
            encerrada:  'Encerrada',
          };
          const statusLabel = label[o.status];
          if (statusLabel) {
            this.push({
              id: crypto.randomUUID(), type: 'ocorrencia_atualizada',
              title: 'Ocorrência atualizada',
              body: `${o.titulo ?? o.tipo}: ${statusLabel}`,
              ocorrenciaId: o.id, read: false, createdAt: new Date(),
            });
          }
        }
      })
    );
  }

  markAsRead(id: string): void {
    this.notifications.update(list => list.map(n => n.id === id ? { ...n, read: true } : n));
  }

  markAllAsRead(): void {
    this.notifications.update(list => list.map(n => ({ ...n, read: true })));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private push(n: AppNotification): void {
    this.notifications.update(list => [n, ...list].slice(0, 50));
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/libs/core/src/lib/services/notification.service.ts
git commit -m "feat(core): extend NotificationService for occurrence events"
```

---

## Task 7: Core Exports

**Files:**
- Modify: `frontend/libs/core/src/index.ts`

- [ ] **Step 1: Add new exports**

Append after the existing service exports:

```typescript
export { UploadService } from './lib/services/upload.service';
export { OccurrenceService } from './lib/services/occurrence.service';
export type { OccurrenceRealtimeEvent } from './lib/services/occurrence.service';
```

Also add to models export (already exported via `./lib/models/index` so the new types are automatic).

- [ ] **Step 2: Commit**

```bash
git add frontend/libs/core/src/index.ts
git commit -m "feat(core): export UploadService and OccurrenceService"
```

---

## Task 8: Morador AppShell — Occurrence Subscription

**Files:**
- Modify: `frontend/apps/morador/src/app/layout/app-shell/app-shell.component.ts`

- [ ] **Step 1: Add occurrence realtime subscription at shell level**

The shell subscribes to the user's occurrence channel so status-change notifications work even when not on the occurrences page.

Replace the entire file:

```typescript
import { Component, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { NotificationService, OccurrenceService, AuthState } from '@condomais/core';

@Component({
  selector: 'cm-app-shell',
  standalone: true,
  imports: [RouterOutlet, BottomNavComponent, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell">
      <main class="shell__content">
        <router-outlet></router-outlet>
      </main>
      <cm-bottom-nav></cm-bottom-nav>
      <cm-toast [toast]="toastSvc.toast()"></cm-toast>
    </div>
  `,
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  toastSvc = inject(ToastService);
  private readonly notifSvc      = inject(NotificationService);
  private readonly occurrenceSvc = inject(OccurrenceService);
  private readonly authState     = inject(AuthState);
  private lastShownId: string | null = null;

  constructor() {
    // Show toast for any new unread notification
    effect(() => {
      const list   = this.notifSvc.notifications();
      const latest = list[0];
      if (latest && !latest.read && latest.id !== this.lastShownId) {
        this.lastShownId = latest.id;
        this.toastSvc.show({ message: latest.body, icon: '📋', duration: 3500 });
      }
    });

    // Subscribe to occurrence realtime at shell level so morador gets
    // status-change notifications even when not on the occurrences page
    effect(() => {
      const user = this.authState.user();
      if (user) {
        this.occurrenceSvc.subscribeForUser(user.id);
      }
    });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/apps/morador/src/app/layout/app-shell/app-shell.component.ts
git commit -m "feat(morador): subscribe to occurrence realtime at shell level"
```

---

## Task 9: Morador — Occurrence List

**Files:**
- Create: `frontend/apps/morador/src/app/features/occurrences/occurrences.component.ts`
- Create: `frontend/apps/morador/src/app/features/occurrences/occurrences.component.scss`

- [ ] **Step 1: Create list component**

```typescript
import { Component, ChangeDetectionStrategy, signal, computed, inject, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TabBarComponent, BadgeComponent, EmptyStateComponent, ButtonComponent } from '@condomais/ui';
import { OccurrenceService, AuthState } from '@condomais/core';
import type { TabItem } from '@condomais/ui';

@Component({
  selector: 'cm-occurrences',
  standalone: true,
  imports: [RouterLink, DatePipe, TabBarComponent, BadgeComponent, EmptyStateComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Ocorrências</h1>
        <a routerLink="/ocorrencias/nova">
          <cm-button size="sm">+ Nova</cm-button>
        </a>
      </div>
      <div class="page__tabs">
        <cm-tab-bar [tabs]="tabs" [activeId]="activeTab()" (tabChange)="activeTab.set($event)"></cm-tab-bar>
      </div>
      <div class="occurrence-list">
        @if (isLoading()) {
          <cm-empty-state icon="⏳" title="Carregando…" subtitle="Buscando suas ocorrências"></cm-empty-state>
        } @else {
          @for (o of filtered(); track o.id) {
            <a class="occurrence-row" [routerLink]="['/ocorrencias', o.id]">
              <div class="occurrence-row__icon">{{ tipoIcon(o.tipo) }}</div>
              <div class="occurrence-row__body">
                <p class="occurrence-row__title">{{ o.titulo ?? o.tipo }}</p>
                <p class="occurrence-row__sub">{{ o.tipo }} · {{ o.createdAt | date:'dd/MM HH:mm' }}</p>
              </div>
              <cm-badge [variant]="statusVariant(o.status)">{{ statusLabel(o.status) }}</cm-badge>
            </a>
          } @empty {
            <cm-empty-state icon="📋" title="Nenhuma ocorrência"
              [subtitle]="'Você não tem ocorrências ' + (activeTab() === 'aberta' ? 'abertas' : 'resolvidas') + '.'">
            </cm-empty-state>
          }
        }
      </div>
    </div>
  `,
  styleUrl: './occurrences.component.scss',
})
export class OccurrencesComponent {
  private readonly occurrenceSvc = inject(OccurrenceService);
  private readonly authState     = inject(AuthState);

  tabs: TabItem[] = [
    { id: 'aberta',   label: 'Abertas' },
    { id: 'resolvida', label: 'Resolvidas' },
  ];

  activeTab  = signal('aberta');
  isLoading  = this.occurrenceSvc.isLoading;
  occurrences = this.occurrenceSvc.occurrences;

  filtered = computed(() => {
    const tab  = this.activeTab();
    const list = this.occurrences();
    if (tab === 'aberta') return list.filter(o => o.status === 'aberta' || o.status === 'em_analise');
    return list.filter(o => o.status === 'resolvida' || o.status === 'encerrada');
  });

  constructor() {
    effect(() => {
      const user   = this.authState.user();
      const tenant = this.authState.currentTenant();
      if (user && tenant) {
        this.occurrenceSvc.loadMyOccurrences(tenant.id, user.id);
      }
    });
  }

  tipoIcon(tipo: string): string {
    const map: Record<string, string> = {
      ruido: '🔊', vandalismo: '🔨', acidente: '⚠️',
      entrada_suspeita: '👀', entrada_nao_autorizada: '🚫', outro: '📋',
    };
    return map[tipo] ?? '📋';
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
}
```

- [ ] **Step 2: Create styles**

```scss
.page {
  min-height: 100%;
  padding-bottom: 80px;

  &__header {
    display: flex;
    align-items: center;
    padding: var(--s-6) var(--s-5) var(--s-4);
    background: var(--c-bg-raised);
    border-bottom: 1px solid var(--c-border);
  }

  &__title {
    flex: 1;
    font-family: var(--font-serif);
    font-size: 26px;
    font-weight: 400;
    letter-spacing: -0.4px;
    margin: 0;
  }

  &__tabs { padding: var(--s-4) var(--s-5); }
}

.occurrence-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.occurrence-row {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-4) var(--s-5);
  text-decoration: none;
  color: var(--c-text);
  border-bottom: 1px solid var(--c-border);
  background: var(--c-card);
  transition: background var(--t-fast);

  &:first-child { border-top: 1px solid var(--c-border); }
  &:active { background: var(--c-card-muted); }

  &__icon {
    width: 44px; height: 44px;
    border-radius: var(--r-sm);
    background: var(--c-accent-soft);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }

  &__body { flex: 1; min-width: 0; }
  &__title { font-size: 14px; font-weight: 600; margin: 0 0 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  &__sub { font-size: 12px; color: var(--c-text-muted); margin: 0; }
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/apps/morador/src/app/features/occurrences/
git commit -m "feat(morador): add occurrences list component"
```

---

## Task 10: Morador — New Occurrence Form

**Files:**
- Create: `frontend/apps/morador/src/app/features/occurrences/new-occurrence.component.ts`
- Create: `frontend/apps/morador/src/app/features/occurrences/new-occurrence.component.scss`

- [ ] **Step 1: Create form component with image preview + upload**

```typescript
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
            @if (submitting()) { <cm-spinner size="sm"></cm-spinner> }
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
  readonly router        = inject(Router);
  private readonly occurrenceSvc = inject(OccurrenceService);
  private readonly uploadSvc     = inject(UploadService);
  private readonly authState     = inject(AuthState);

  titulo     = '';
  tipo: OccurrenceTipo | '' = '';
  local      = '';
  descricao  = '';

  selectedFile  = signal<File | null>(null);
  previewUrl    = signal<string | null>(null);
  fileError     = signal<string | null>(null);
  submitting    = signal(false);
  submitError   = signal<string | null>(null);

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
        const path = this.uploadSvc.buildPath(tenant.id, occurrence.id, file);
        const url  = await this.uploadSvc.upload('ocorrencias', path, file);
        await this.occurrenceSvc.addImage(occurrence.id, url);
      } catch {
        // Image upload failure is non-blocking — occurrence was already saved
      }
    }

    this.submitting.set(false);
    this.router.navigate(['/ocorrencias', occurrence.id]);
  }
}
```

- [ ] **Step 2: Create styles**

```scss
.page {
  min-height: 100%;
  padding-bottom: 80px;

  &__header {
    display: flex;
    align-items: center;
    gap: var(--s-3);
    padding: var(--s-6) var(--s-5) var(--s-4);
    background: var(--c-bg-raised);
    border-bottom: 1px solid var(--c-border);
  }

  &__back {
    background: none; border: none; cursor: pointer;
    color: var(--c-text); font-size: 20px; padding: 0 var(--s-2);
  }

  &__title {
    font-family: var(--font-serif); font-size: 22px;
    font-weight: 400; margin: 0;
  }
}

.form {
  padding: var(--s-5);
  display: flex; flex-direction: column; gap: var(--s-5);

  &__field { display: flex; flex-direction: column; gap: var(--s-2); }

  &__label { font-size: 13px; font-weight: 600; color: var(--c-text-muted); }

  &__input, &__select, &__textarea {
    width: 100%; padding: var(--s-3) var(--s-4);
    border: 1.5px solid var(--c-border);
    border-radius: var(--r-sm); background: var(--c-input, var(--c-card));
    color: var(--c-text); font-size: 15px; font-family: inherit;
    transition: border-color var(--t-fast);

    &:focus { outline: none; border-color: var(--c-accent); }
  }

  &__textarea { resize: vertical; min-height: 100px; }

  &__actions { padding-top: var(--s-2); }

  &__error {
    font-size: 12px; color: var(--c-danger, #e53e3e); margin: 0;

    &--global { text-align: center; }
  }
}

.upload-area {
  position: relative;
  min-height: 120px; border: 2px dashed var(--c-border);
  border-radius: var(--r-md); display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: var(--s-2);
  cursor: pointer; overflow: hidden; transition: border-color var(--t-fast);

  &:active { border-color: var(--c-accent); }

  &__preview {
    width: 100%; max-height: 200px; object-fit: cover;
  }

  &__remove {
    position: absolute; top: 8px; right: 8px;
    background: rgba(0,0,0,0.5); color: #fff; border: none;
    border-radius: 50%; width: 28px; height: 28px;
    cursor: pointer; font-size: 14px; display: flex;
    align-items: center; justify-content: center;
  }

  &__icon { font-size: 32px; }

  &__hint { font-size: 13px; color: var(--c-text-muted); }
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/apps/morador/src/app/features/occurrences/new-occurrence.component.ts
git add frontend/apps/morador/src/app/features/occurrences/new-occurrence.component.scss
git commit -m "feat(morador): add new occurrence form with image upload and preview"
```

---

## Task 11: Morador — Occurrence Detail

**Files:**
- Create: `frontend/apps/morador/src/app/features/occurrences/occurrence-detail.component.ts`
- Create: `frontend/apps/morador/src/app/features/occurrences/occurrence-detail.component.scss`

- [ ] **Step 1: Create detail component**

```typescript
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
        <cm-empty-state icon="😕" title="Não encontrada" subtitle="Esta ocorrência não existe ou você não tem acesso."></cm-empty-state>
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
```

- [ ] **Step 2: Create styles**

```scss
.page {
  min-height: 100%;
  padding-bottom: 80px;

  &__header {
    display: flex; align-items: center; gap: var(--s-3);
    padding: var(--s-6) var(--s-5) var(--s-4);
    background: var(--c-bg-raised); border-bottom: 1px solid var(--c-border);
  }

  &__back { color: var(--c-text); text-decoration: none; font-size: 20px; }
  &__title { font-family: var(--font-serif); font-size: 22px; font-weight: 400; margin: 0; }
}

.detail {
  padding: var(--s-5);
  display: flex; flex-direction: column; gap: var(--s-4);

  &__status-bar { display: flex; align-items: center; justify-content: space-between; }

  &__date { font-size: 12px; color: var(--c-text-muted); }

  &__titulo { font-size: 20px; font-weight: 600; margin: 0; }

  &__meta { display: flex; flex-wrap: wrap; gap: var(--s-2); }

  &__chip {
    font-size: 12px; color: var(--c-text-muted);
    background: var(--c-bg-muted, var(--c-card));
    border: 1px solid var(--c-border); border-radius: var(--r-pill, 999px);
    padding: 2px var(--s-3);
  }

  &__descricao { font-size: 15px; line-height: 1.6; color: var(--c-text); margin: 0; }

  &__images { display: flex; flex-direction: column; gap: var(--s-3); }

  &__image { width: 100%; border-radius: var(--r-md); object-fit: cover; max-height: 280px; }

  &__resolution {
    padding: var(--s-4); background: var(--c-success-soft, #f0fff4);
    border-left: 3px solid var(--c-success, #38a169); border-radius: var(--r-sm);
  }

  &__resolution-label { font-size: 12px; font-weight: 600; color: var(--c-success, #38a169); margin: 0 0 var(--s-2); }

  &__resolution-text { font-size: 14px; margin: 0; color: var(--c-text); }
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/apps/morador/src/app/features/occurrences/occurrence-detail.component.ts
git add frontend/apps/morador/src/app/features/occurrences/occurrence-detail.component.scss
git commit -m "feat(morador): add occurrence detail view"
```

---

## Task 12: Morador — Routing + Bottom Nav

**Files:**
- Modify: `frontend/apps/morador/src/app/app.routes.ts`
- Modify: `frontend/apps/morador/src/app/layout/bottom-nav/bottom-nav.component.ts`

- [ ] **Step 1: Add occurrence routes to morador app.routes.ts**

Add these three routes to the children array (after the `entregas/:id` route):

```typescript
{ path: 'ocorrencias',       loadComponent: () => import('./features/occurrences/occurrences.component').then(m=>m.OccurrencesComponent) },
{ path: 'ocorrencias/nova',  loadComponent: () => import('./features/occurrences/new-occurrence.component').then(m=>m.NewOccurrenceComponent) },
{ path: 'ocorrencias/:id',   loadComponent: () => import('./features/occurrences/occurrence-detail.component').then(m=>m.OccurrenceDetailComponent) },
```

- [ ] **Step 2: Update bottom-nav — replace marketplace with ocorrências**

Replace the `{ path: '/marketplace', label: 'Mercado', icon: shopIcon }` item with:

```typescript
{ path: '/ocorrencias', label: 'Ocorrências', icon: clipboardIcon },
```

And add the SVG constant at the bottom of the file:

```typescript
const clipboardIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>`;
```

Also update the badge check in the template — the badge was on `/entregas`, keep it there but also check `/ocorrencias` if needed. No changes to the badge condition are required since we only badge entregas.

- [ ] **Step 3: Commit**

```bash
git add frontend/apps/morador/src/app/app.routes.ts
git add frontend/apps/morador/src/app/layout/bottom-nav/bottom-nav.component.ts
git commit -m "feat(morador): add occurrence routes and update bottom nav"
```

---

## Task 13: Admin — ToastService

**Files:**
- Create: `frontend/apps/admin/src/app/core/toast.service.ts`

- [ ] **Step 1: Create toast service (identical pattern to morador's)**

```typescript
import { Injectable, signal } from '@angular/core';
import { ToastData } from '@condomais/ui';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toast = signal<ToastData | null>(null);
  private timer: ReturnType<typeof setTimeout> | null = null;

  show(data: ToastData): void {
    if (this.timer) clearTimeout(this.timer);
    this.toast.set(data);
    this.timer = setTimeout(() => this.toast.set(null), data.duration ?? 2400);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/apps/admin/src/app/core/toast.service.ts
git commit -m "feat(admin): add ToastService"
```

---

## Task 14: Admin Shell — Notifications + Occurrence Subscription

**Files:**
- Modify: `frontend/apps/admin/src/app/layout/shell.component.ts`

- [ ] **Step 1: Enhance admin shell with toast, notifications, and occurrence subscription**

Replace the entire file:

```typescript
import { Component, inject, effect, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '@condomais/ui';
import { AuthService, AuthState, OccurrenceService, NotificationService } from '@condomais/core';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'cm-admin-shell',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell">
      <header class="shell__header">
        <b class="shell__brand">CondoMais Admin</b>
        <span class="shell__tenant">{{ state.currentTenant()?.nome }}</span>
        <nav class="shell__nav">
          <a class="shell__nav-link" routerLink="/dashboard">Painel</a>
          <a class="shell__nav-link" routerLink="/ocorrencias">Ocorrências</a>
        </nav>
        <button class="shell__logout" (click)="auth.logout()">Sair</button>
      </header>
      <main class="shell__main">
        <router-outlet></router-outlet>
      </main>
      <cm-toast [toast]="toastSvc.toast()"></cm-toast>
    </div>
  `,
  styles: [`
    .shell { display: flex; flex-direction: column; min-height: 100vh; }
    .shell__header {
      display: flex; align-items: center; gap: 16px;
      padding: 14px 24px; background: #2d6a4f; color: #fff;
    }
    .shell__brand { flex: 1; font-weight: 700; font-size: 16px; }
    .shell__tenant { font-size: 14px; opacity: 0.8; }
    .shell__nav { display: flex; gap: 8px; }
    .shell__nav-link { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 14px; padding: 4px 10px; border-radius: 6px; transition: background 0.15s; }
    .shell__nav-link:hover { background: rgba(255,255,255,0.15); }
    .shell__logout { background: rgba(255,255,255,0.15); border: none; color: #fff; cursor: pointer; padding: 6px 14px; border-radius: 6px; font-size: 14px; }
    .shell__main { padding: 24px; flex: 1; }
  `],
})
export class ShellComponent {
  readonly auth      = inject(AuthService);
  readonly state     = inject(AuthState);
  readonly toastSvc  = inject(ToastService);
  private readonly notifSvc      = inject(NotificationService);
  private readonly occurrenceSvc = inject(OccurrenceService);
  private lastShownId: string | null = null;

  constructor() {
    // Subscribe to tenant's occurrence channel so admins get realtime events
    effect(() => {
      const tenant = this.state.currentTenant();
      if (tenant) {
        this.occurrenceSvc.subscribeToTenant(tenant.id);
      }
    });

    // Show toast for new occurrence notifications
    effect(() => {
      const list   = this.notifSvc.notifications();
      const latest = list[0];
      if (
        latest && !latest.read &&
        latest.id !== this.lastShownId &&
        (latest.type === 'nova_ocorrencia' || latest.type === 'ocorrencia_atualizada')
      ) {
        this.lastShownId = latest.id;
        this.toastSvc.show({ message: latest.body, icon: '📋', duration: 4000 });
      }
    });

    inject(DestroyRef).onDestroy(() => this.occurrenceSvc.stopRealtime());
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/apps/admin/src/app/layout/shell.component.ts
git commit -m "feat(admin): enhance shell with occurrence subscription and toast notifications"
```

---

## Task 15: Admin — Occurrences List

**Files:**
- Create: `frontend/apps/admin/src/app/features/occurrences/occurrences.component.ts`
- Create: `frontend/apps/admin/src/app/features/occurrences/occurrences.component.scss`

- [ ] **Step 1: Create admin list component**

```typescript
import { Component, ChangeDetectionStrategy, signal, computed, inject, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BadgeComponent, EmptyStateComponent, SearchInputComponent, TabBarComponent } from '@condomais/ui';
import { OccurrenceService, AuthState } from '@condomais/core';
import type { TabItem } from '@condomais/ui';

@Component({
  selector: 'cm-admin-occurrences',
  standalone: true,
  imports: [RouterLink, DatePipe, BadgeComponent, EmptyStateComponent, SearchInputComponent, TabBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Ocorrências</h2>
        <span class="admin-page__count">{{ filtered().length }} resultado(s)</span>
      </div>

      <div class="admin-page__filters">
        <cm-search-input placeholder="Buscar por título ou descrição..."
          (valueChange)="search.set($event)"></cm-search-input>
        <cm-tab-bar [tabs]="tabs" [activeId]="activeTab()" (tabChange)="activeTab.set($event)"></cm-tab-bar>
      </div>

      @if (isLoading()) {
        <cm-empty-state icon="⏳" title="Carregando…" subtitle=""></cm-empty-state>
      } @else {
        <div class="occurrence-table">
          @for (o of filtered(); track o.id) {
            <a class="occurrence-row" [routerLink]="['/ocorrencias', o.id]">
              <div class="occurrence-row__body">
                <p class="occurrence-row__titulo">{{ o.titulo ?? o.tipo }}</p>
                <p class="occurrence-row__meta">{{ o.tipo }} · {{ o.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
              </div>
              <cm-badge [variant]="statusVariant(o.status)">{{ statusLabel(o.status) }}</cm-badge>
            </a>
          } @empty {
            <cm-empty-state icon="📋" title="Nenhuma ocorrência encontrada" subtitle="Tente ajustar os filtros."></cm-empty-state>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './occurrences.component.scss',
})
export class AdminOccurrencesComponent {
  private readonly occurrenceSvc = inject(OccurrenceService);
  private readonly authState     = inject(AuthState);

  tabs: TabItem[] = [
    { id: 'all',       label: 'Todas' },
    { id: 'aberta',    label: 'Abertas' },
    { id: 'em_analise', label: 'Em Análise' },
    { id: 'resolvida', label: 'Resolvidas' },
  ];

  activeTab   = signal('all');
  search      = signal('');
  isLoading   = this.occurrenceSvc.isLoading;
  occurrences = this.occurrenceSvc.occurrences;

  filtered = computed(() => {
    const tab   = this.activeTab();
    const query = this.search().toLowerCase();
    return this.occurrences()
      .filter(o => tab === 'all' || o.status === tab)
      .filter(o => !query || (o.titulo ?? o.tipo).toLowerCase().includes(query) || o.descricao.toLowerCase().includes(query));
  });

  constructor() {
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant) {
        this.occurrenceSvc.loadForTenant(tenant.id);
      }
    });
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
}
```

- [ ] **Step 2: Create styles**

```scss
.admin-page {
  &__header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  &__title { font-size: 22px; font-weight: 600; margin: 0; }
  &__count { font-size: 13px; color: #666; }
  &__filters { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
}

.occurrence-table { display: flex; flex-direction: column; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }

.occurrence-row {
  display: flex; align-items: center; gap: 16px;
  padding: 14px 18px; text-decoration: none; color: inherit;
  border-bottom: 1px solid #e2e8f0; background: #fff; transition: background 0.15s;

  &:last-child { border-bottom: none; }
  &:hover { background: #f7fafc; }
  &__body { flex: 1; min-width: 0; }
  &__titulo { font-size: 14px; font-weight: 600; margin: 0 0 3px; }
  &__meta { font-size: 12px; color: #718096; margin: 0; }
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/apps/admin/src/app/features/occurrences/
git commit -m "feat(admin): add occurrences list with search and status filter"
```

---

## Task 16: Admin — Occurrence Detail + Status Update

**Files:**
- Create: `frontend/apps/admin/src/app/features/occurrences/occurrence-detail.component.ts`
- Create: `frontend/apps/admin/src/app/features/occurrences/occurrence-detail.component.scss`

- [ ] **Step 1: Create admin detail component**

```typescript
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
        <a class="detail-page__back" routerLink="/ocorrencias">← Voltar</a>
        <h2 class="detail-page__title">Ocorrência</h2>
      </div>

      @if (loading()) {
        <cm-empty-state icon="⏳" title="Carregando…" subtitle=""></cm-empty-state>
      } @else if (!occurrence()) {
        <cm-empty-state icon="😕" title="Não encontrada" subtitle="Esta ocorrência não existe."></cm-empty-state>
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
              <span class="detail__chip">📍 {{ occurrence()!.local }}</span>
            }
          </div>

          <p class="detail__descricao">{{ occurrence()!.descricao }}</p>

          @if (images().length > 0) {
            <div class="detail__images">
              @for (img of images(); track img.id) {
                <a [href]="img.imageUrl" target="_blank">
                  <img class="detail__image" [src]="img.imageUrl" alt="Foto da ocorrência">
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
                <option value="em_analise">Em análise</option>
                <option value="resolvida">Resolvida</option>
              </select>
            </div>

            <div class="detail__field">
              <label class="detail__label">Resposta / Resolução (opcional)</label>
              <textarea class="detail__textarea" [(ngModel)]="resolucao"
                placeholder="Descreva as ações tomadas..." rows="3"></textarea>
            </div>

            <cm-button (click)="saveStatus()" [disabled]="saving()">
              @if (saving()) { Salvando… }
              @else { Salvar Alterações }
            </cm-button>

            @if (saveSuccess()) {
              <p class="detail__success">✓ Status atualizado com sucesso.</p>
            }
            @if (saveError()) {
              <p class="detail__error">{{ saveError() }}</p>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './occurrence-detail.component.scss',
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
}
```

- [ ] **Step 2: Create styles**

```scss
.detail-page {
  max-width: 720px;

  &__header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
  &__back { color: #2d6a4f; text-decoration: none; font-size: 14px; }
  &__title { font-size: 22px; font-weight: 600; margin: 0; }
}

.detail {
  display: flex; flex-direction: column; gap: 20px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px;

  &__row { display: flex; align-items: center; justify-content: space-between; }
  &__date { font-size: 12px; color: #718096; }
  &__titulo { font-size: 20px; font-weight: 600; margin: 0; }
  &__chips { display: flex; flex-wrap: wrap; gap: 8px; }
  &__chip { font-size: 12px; color: #718096; background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 999px; padding: 2px 10px; }
  &__descricao { font-size: 15px; line-height: 1.65; color: #2d3748; margin: 0; }

  &__images { display: flex; flex-wrap: wrap; gap: 12px; }
  &__image { width: 180px; height: 130px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0; }

  &__actions {
    border-top: 1px solid #e2e8f0; padding-top: 20px;
    display: flex; flex-direction: column; gap: 14px;
  }

  &__actions-title { font-size: 15px; font-weight: 600; margin: 0; }

  &__field { display: flex; flex-direction: column; gap: 6px; }
  &__label { font-size: 12px; font-weight: 600; color: #718096; }

  &__select, &__textarea {
    width: 100%; padding: 10px 14px; border: 1.5px solid #e2e8f0;
    border-radius: 6px; font-size: 14px; font-family: inherit; color: #2d3748;
    &:focus { outline: none; border-color: #2d6a4f; }
  }

  &__textarea { resize: vertical; min-height: 80px; }

  &__success { font-size: 13px; color: #38a169; margin: 0; }
  &__error { font-size: 13px; color: #e53e3e; margin: 0; }
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/apps/admin/src/app/features/occurrences/occurrence-detail.component.ts
git add frontend/apps/admin/src/app/features/occurrences/occurrence-detail.component.scss
git commit -m "feat(admin): add occurrence detail with status update and image gallery"
```

---

## Task 17: Admin — Routing

**Files:**
- Modify: `frontend/apps/admin/src/app/app.routes.ts`

- [ ] **Step 1: Add occurrence routes to admin app**

In the `children` array (after the dashboard route), add:

```typescript
{ path: 'ocorrencias',      loadComponent: () => import('./features/occurrences/occurrences.component').then(m=>m.AdminOccurrencesComponent) },
{ path: 'ocorrencias/:id',  loadComponent: () => import('./features/occurrences/occurrence-detail.component').then(m=>m.AdminOccurrenceDetailComponent) },
```

- [ ] **Step 2: Commit**

```bash
git add frontend/apps/admin/src/app/app.routes.ts
git commit -m "feat(admin): add occurrence routes"
```

---

## Self-Review

**Spec coverage check:**

| Requirement | Task |
|-------------|------|
| Morador creates occurrence | Task 10 |
| Morador uploads image | Task 10 (UploadService Task 4) |
| Morador views own occurrences | Task 9 |
| Morador tracks status | Task 11 |
| Admin views all tenant occurrences | Task 15 |
| Admin updates status | Task 16 |
| Admin adds response/comment | Task 16 (resolucao field) |
| RLS tenant isolation | Task 1 |
| RLS morador sees own | Task 1 |
| RLS staff sees all tenant | Task 1 |
| Storage bucket with size + type limits | Task 2 |
| Realtime notify admin on new | Tasks 5, 6, 14 |
| Realtime notify morador on status change | Tasks 5, 6, 8 |
| Large file validation (5 MB) | Task 10 |
| Invalid file type validation | Task 10 |
| Upload failure non-blocking | Task 10 |
| Angular services typed | Tasks 4, 5 |
| Routing /ocorrencias | Tasks 12, 17 |
| Bottom nav updated | Task 12 |

**Placeholder scan:** No TBD or TODO placeholders present. All code steps are complete.

**Type consistency:**
- `OccurrenceStatus`, `OccurrenceTipo`, `Occurrence`, `OccurrenceImage`, `CreateOccurrenceInput` defined in Task 3; used in Tasks 4, 5, 9, 10, 11, 15, 16 ✓
- `OccurrenceRealtimeEvent` defined in Task 5; consumed in Task 6 ✓
- `mapRow` internal to `OccurrenceService` ✓
- `statusVariant` returns `'accent' | 'warning' | 'success'` — matches `BadgeComponent`'s expected variants ✓
