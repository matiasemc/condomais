-- ============================================================
-- Master Admin Platform Layer
-- Adds: full-access SELECT for master_admin on condominios
--       (including deleted/suspended), platform stats view
-- ============================================================

-- Allow master_admin to see ALL condominios (including deleted).
-- Existing "condominios_select_public" only shows deleted_at IS NULL.
CREATE POLICY "condominios_select_master"
  ON public.condominios FOR SELECT
  USING (public.is_master_admin());

-- ============================================================
-- Platform stats view (aggregates cross-tenant metrics)
-- SECURITY DEFINER bypasses per-row RLS for counting
-- ============================================================
CREATE OR REPLACE VIEW public.v_platform_stats AS
SELECT
  (SELECT count(*)::int FROM public.condominios WHERE deleted_at IS NULL)                AS total_tenants,
  (SELECT count(*)::int FROM public.condominios WHERE subscription_status = 'trial'
                                                   AND deleted_at IS NULL)               AS tenants_trial,
  (SELECT count(*)::int FROM public.condominios WHERE subscription_status = 'active'
                                                   AND deleted_at IS NULL)               AS tenants_active,
  (SELECT count(*)::int FROM public.condominios WHERE subscription_status = 'suspended'
                                                   AND deleted_at IS NULL)               AS tenants_suspended,
  (SELECT count(*)::int FROM public.users)                                               AS total_users,
  (SELECT count(*)::int FROM public.entregas    WHERE deleted_at IS NULL)                AS total_deliveries,
  (SELECT count(*)::int FROM public.entregas    WHERE status = 'pendente'
                                                   AND deleted_at IS NULL)               AS pending_deliveries,
  (SELECT count(*)::int FROM public.ocorrencias WHERE deleted_at IS NULL)                AS total_occurrences,
  (SELECT count(*)::int FROM public.reservas    WHERE deleted_at IS NULL)                AS total_reservations;

GRANT SELECT ON public.v_platform_stats TO authenticated;
