-- ============================================================
-- Billing System
-- Adds: planos, subscriptions, feature gating fn + RLS
-- ============================================================

-- 1. Extend condominios.plan to include 'free'
ALTER TABLE public.condominios DROP CONSTRAINT IF EXISTS ck_condominios_plan;
ALTER TABLE public.condominios
  ADD CONSTRAINT ck_condominios_plan
    CHECK (plan IN ('free', 'basic', 'plus', 'premium'));

-- 2. planos — static plan definitions with feature flags
CREATE TABLE IF NOT EXISTS public.planos (
  id                UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  nome              VARCHAR(20) NOT NULL UNIQUE
                    CHECK (nome IN ('free', 'basic', 'plus', 'premium')),
  label             VARCHAR(50)  NOT NULL,
  price_monthly_brl NUMERIC(10,2) NOT NULL DEFAULT 0,
  features          JSONB   NOT NULL DEFAULT '{}'::jsonb
);

INSERT INTO public.planos (nome, label, price_monthly_brl, features) VALUES
  ('free',    'Grátis',   0,      '{"entregas":true,"ocorrencias":false,"reservas":false,"marketplace":false,"max_unidades":20}'),
  ('basic',   'Básico',   99.90,  '{"entregas":true,"ocorrencias":true, "reservas":false,"marketplace":false,"max_unidades":50}'),
  ('plus',    'Plus',     199.90, '{"entregas":true,"ocorrencias":true, "reservas":true, "marketplace":false,"max_unidades":200}'),
  ('premium', 'Premium',  399.90, '{"entregas":true,"ocorrencias":true, "reservas":true, "marketplace":true, "max_unidades":999999}')
ON CONFLICT (nome) DO UPDATE SET
  label             = EXCLUDED.label,
  price_monthly_brl = EXCLUDED.price_monthly_brl,
  features          = EXCLUDED.features;

-- 3. subscriptions — one per tenant, holds Stripe IDs + lifecycle
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id          UUID NOT NULL UNIQUE REFERENCES public.condominios(id) ON DELETE CASCADE,
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT,
  plano_nome             VARCHAR(20) NOT NULL DEFAULT 'free'
                         CHECK (plano_nome IN ('free', 'basic', 'plus', 'premium')),
  status                 VARCHAR(20) NOT NULL DEFAULT 'TRIALING'
                         CHECK (status IN ('ACTIVE', 'PAST_DUE', 'CANCELED', 'TRIALING')),
  current_period_end     TIMESTAMPTZ,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX  IF NOT EXISTS idx_subscriptions_condominio  ON public.subscriptions(condominio_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_stripe_sub
  ON public.subscriptions(stripe_subscription_id)
  WHERE stripe_subscription_id IS NOT NULL;

-- Bootstrap: create subscription rows for existing active tenants
INSERT INTO public.subscriptions (condominio_id, plano_nome, status)
SELECT id,
       plan,
       CASE subscription_status
         WHEN 'active'    THEN 'ACTIVE'
         WHEN 'suspended' THEN 'CANCELED'
         WHEN 'cancelled' THEN 'CANCELED'
         ELSE 'TRIALING'
       END
FROM   public.condominios
WHERE  deleted_at IS NULL
ON CONFLICT (condominio_id) DO NOTHING;

-- ============================================================
-- 4. Feature gating function (SECURITY DEFINER — backend enforcement)
-- Returns TRUE if tenant's active subscription includes the feature.
-- ============================================================
CREATE OR REPLACE FUNCTION public.check_plan_feature(p_condominio_id UUID, p_feature TEXT)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (
      SELECT (pl.features ->> p_feature)::boolean
      FROM   public.subscriptions s
      JOIN   public.planos        pl ON pl.nome = s.plano_nome
      WHERE  s.condominio_id = p_condominio_id
        AND  s.status IN ('ACTIVE', 'TRIALING')
    ),
    false
  );
$$;

-- ============================================================
-- 5. Feature-gating RLS (MANDATORY backend enforcement)
-- ============================================================

-- ocorrencias INSERT — requires 'ocorrencias' feature on plan
DROP POLICY IF EXISTS "ocorrencias_insert_feature_gate" ON public.ocorrencias;
CREATE POLICY "ocorrencias_insert_feature_gate"
  ON public.ocorrencias FOR INSERT
  WITH CHECK (
    public.check_plan_feature(condominio_id, 'ocorrencias')
    AND public.is_member(condominio_id)
  );

-- reservas INSERT — requires 'reservas' feature on plan
DROP POLICY IF EXISTS "reservas_insert_feature_gate" ON public.reservas;
CREATE POLICY "reservas_insert_feature_gate"
  ON public.reservas FOR INSERT
  WITH CHECK (
    public.check_plan_feature(condominio_id, 'reservas')
    AND public.is_member(condominio_id)
  );

-- ============================================================
-- 6. RLS on new tables
-- ============================================================
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planos        ENABLE ROW LEVEL SECURITY;

-- Members read their own tenant subscription; master_admin reads all
CREATE POLICY "subscriptions_select"
  ON public.subscriptions FOR SELECT
  USING (
    public.is_master_admin()
    OR public.is_member(condominio_id)
  );

-- Only master_admin or service_role can update subscriptions
CREATE POLICY "subscriptions_update_master"
  ON public.subscriptions FOR UPDATE
  USING (public.is_master_admin());

-- planos are public (no sensitive data)
CREATE POLICY "planos_select_all" ON public.planos FOR SELECT USING (true);

GRANT SELECT ON public.planos        TO authenticated;
GRANT SELECT ON public.subscriptions TO authenticated;
