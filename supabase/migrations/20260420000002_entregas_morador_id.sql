-- ============================================================
-- Adds morador_id and recebido_por to entregas
-- Enables per-user RLS so moradores see only their deliveries
-- ============================================================

ALTER TABLE public.entregas
  ADD COLUMN IF NOT EXISTS morador_id   UUID REFERENCES public.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS recebido_por UUID REFERENCES public.users(id) ON DELETE SET NULL;

-- Back-fill: copy existing porteiro_id into recebido_por
UPDATE public.entregas
  SET recebido_por = porteiro_id
  WHERE recebido_por IS NULL AND porteiro_id IS NOT NULL;

-- Index for morador self-service query
CREATE INDEX IF NOT EXISTS idx_entregas_morador_id
  ON public.entregas(morador_id)
  WHERE morador_id IS NOT NULL;

-- Composite index for tenant + morador (hot-path for morador app)
CREATE INDEX IF NOT EXISTS idx_entregas_condominio_morador
  ON public.entregas(condominio_id, morador_id)
  WHERE deleted_at IS NULL;

-- ============================================================
-- RLS: replace broad member policy with role-scoped policies
-- ============================================================

DROP POLICY IF EXISTS "entregas_select_member" ON public.entregas;

-- Staff (porteiro, sindico, conselho) see all deliveries for the tenant
CREATE POLICY "entregas_select_staff"
  ON public.entregas FOR SELECT
  USING (
    deleted_at IS NULL
    AND (
      public.is_master_admin()
      OR public.has_any_role(condominio_id, ARRAY['porteiro', 'sindico', 'conselho'])
    )
  );

-- Morador sees only their own deliveries
CREATE POLICY "entregas_select_morador_own"
  ON public.entregas FOR SELECT
  USING (
    deleted_at IS NULL
    AND public.is_member(condominio_id)
    AND morador_id = (SELECT auth.uid())
  );

-- Morador can mark their own pending delivery as retirada
CREATE POLICY "entregas_update_morador_own"
  ON public.entregas FOR UPDATE
  USING (
    morador_id = (SELECT auth.uid())
    AND public.is_member(condominio_id)
    AND status IN ('pendente', 'notificada')
  )
  WITH CHECK (
    morador_id = (SELECT auth.uid())
    AND public.is_member(condominio_id)
  );
