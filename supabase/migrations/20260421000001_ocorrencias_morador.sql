-- ============================================================
-- Migration: Morador support for ocorrencias
-- Adds user_id (morador), titulo, extends status constraint,
-- updates RLS so moradores can insert/select own records,
-- and enables realtime CDC.
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
