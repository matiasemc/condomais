-- Fix feature-gated RLS by replacing permissive insert policies with combined checks.
-- Also move platform stats access to a master-admin guarded RPC.

DROP POLICY IF EXISTS "ocorrencias_insert_staff" ON public.ocorrencias;
DROP POLICY IF EXISTS "ocorrencias_insert_feature_gate" ON public.ocorrencias;

CREATE POLICY "ocorrencias_insert_staff_feature_gate"
  ON public.ocorrencias FOR INSERT
  WITH CHECK (
    public.check_plan_feature(condominio_id, 'ocorrencias')
    AND (
      public.is_master_admin()
      OR public.has_any_role(condominio_id, ARRAY['porteiro', 'sindico', 'conselho'])
    )
  );

DROP POLICY IF EXISTS "reservas_insert_member" ON public.reservas;
DROP POLICY IF EXISTS "reservas_insert_feature_gate" ON public.reservas;

CREATE POLICY "reservas_insert_member_feature_gate"
  ON public.reservas FOR INSERT
  WITH CHECK (
    public.check_plan_feature(condominio_id, 'reservas')
    AND (public.is_master_admin() OR public.is_member(condominio_id))
    AND (
      morador_id = (SELECT auth.uid())
      OR public.has_any_role(condominio_id, ARRAY['sindico', 'conselho'])
    )
  );

REVOKE ALL ON public.v_platform_stats FROM anon;
REVOKE ALL ON public.v_platform_stats FROM authenticated;

CREATE OR REPLACE FUNCTION public.get_platform_stats()
RETURNS TABLE (
  total_tenants int,
  tenants_trial int,
  tenants_active int,
  tenants_suspended int,
  total_users int,
  total_deliveries int,
  pending_deliveries int,
  total_occurrences int,
  total_reservations int
)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    (SELECT count(*)::int FROM public.condominios WHERE deleted_at IS NULL) AS total_tenants,
    (SELECT count(*)::int FROM public.condominios WHERE subscription_status = 'trial' AND deleted_at IS NULL) AS tenants_trial,
    (SELECT count(*)::int FROM public.condominios WHERE subscription_status = 'active' AND deleted_at IS NULL) AS tenants_active,
    (SELECT count(*)::int FROM public.condominios WHERE subscription_status = 'suspended' AND deleted_at IS NULL) AS tenants_suspended,
    (SELECT count(*)::int FROM public.users) AS total_users,
    (SELECT count(*)::int FROM public.entregas WHERE deleted_at IS NULL) AS total_deliveries,
    (SELECT count(*)::int FROM public.entregas WHERE status = 'pendente' AND deleted_at IS NULL) AS pending_deliveries,
    (SELECT count(*)::int FROM public.ocorrencias) AS total_occurrences,
    (SELECT count(*)::int FROM public.reservas WHERE deleted_at IS NULL) AS total_reservations
  WHERE public.is_master_admin();
$$;

REVOKE ALL ON FUNCTION public.get_platform_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_platform_stats() TO authenticated;

