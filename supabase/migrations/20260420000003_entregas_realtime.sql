-- ============================================================
-- Enable Supabase Realtime for entregas
-- REPLICA IDENTITY FULL: sends old+new row on UPDATE/DELETE
-- so realtime filters on non-PK columns (condominio_id, morador_id) work
-- ============================================================

ALTER TABLE public.entregas REPLICA IDENTITY FULL;

-- Add table to the default Supabase publication
-- (supabase_realtime is created automatically by Supabase)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname   = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename  = 'entregas'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.entregas;
  END IF;
END $$;
