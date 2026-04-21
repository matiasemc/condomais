-- ============================================================
-- Enable Realtime for reservas and equipamentos
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.reservas;
ALTER PUBLICATION supabase_realtime ADD TABLE public.equipamentos;

-- ============================================================
-- Store Google OAuth tokens in users table
-- ============================================================

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS google_access_token  TEXT,
  ADD COLUMN IF NOT EXISTS google_refresh_token TEXT,
  ADD COLUMN IF NOT EXISTS google_token_expiry   TIMESTAMPTZ;
