-- ============================================================
-- User management support: global master-admin flag on users
-- ============================================================

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS is_master_admin BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE public.users AS u
SET is_master_admin = TRUE
WHERE EXISTS (
  SELECT 1
  FROM public.user_condominios uc
  WHERE uc.user_id = u.id
    AND uc.role = 'master_admin'
    AND uc.status = 'active'
);

CREATE OR REPLACE FUNCTION public.is_master_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users u
    WHERE u.id = auth.uid()
      AND u.is_master_admin = TRUE
  )
  OR EXISTS (
    SELECT 1
    FROM public.user_condominios uc
    WHERE uc.user_id = auth.uid()
      AND uc.role = 'master_admin'
      AND uc.status = 'active'
  );
$$;

DROP POLICY IF EXISTS "users_update_master_admin" ON public.users;
CREATE POLICY "users_update_master_admin"
  ON public.users FOR UPDATE
  USING (public.is_master_admin())
  WITH CHECK (public.is_master_admin());
