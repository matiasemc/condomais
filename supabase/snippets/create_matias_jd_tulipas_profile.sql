-- Cria/atualiza o perfil publico de matiasemc@gmail.com e vincula ao
-- condominio JD/Jardim das Tulipas como sindico.
--
-- Observacao: o schema atual permite apenas um role por usuario+condominio
-- em public.user_condominios. Por isso o role efetivo fica como 'sindico'.
-- A intencao de perfil morador fica registrada em metadata.

DO $$
DECLARE
  v_user_id UUID;
  v_condominio_id UUID;
BEGIN
  SELECT au.id
    INTO v_user_id
  FROM auth.users au
  WHERE lower(au.email) = lower('matiasemc@gmail.com')
  ORDER BY au.created_at DESC
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuario auth.users nao encontrado para o email %', 'matiasemc@gmail.com';
  END IF;

  INSERT INTO public.users (id, email, nome)
  SELECT
    au.id,
    au.email,
    COALESCE(
      au.raw_user_meta_data->>'full_name',
      au.raw_user_meta_data->>'name',
      'Matias'
    )
  FROM auth.users au
  WHERE au.id = v_user_id
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      nome = COALESCE(NULLIF(public.users.nome, ''), EXCLUDED.nome),
      updated_at = NOW();

  SELECT c.id
    INTO v_condominio_id
  FROM public.condominios c
  WHERE c.deleted_at IS NULL
    AND (
      lower(c.subdomain) IN ('jd-tulipas', 'jardim-das-tulipas')
      OR c.nome ILIKE '%tulipas%'
      OR c.nome_fantasia ILIKE '%tulipas%'
    )
  ORDER BY
    CASE
      WHEN lower(c.subdomain) = 'jd-tulipas' THEN 0
      WHEN lower(c.subdomain) = 'jardim-das-tulipas' THEN 1
      ELSE 2
    END,
    c.created_at DESC
  LIMIT 1;

  IF v_condominio_id IS NULL THEN
    RAISE EXCEPTION 'Condominio JD/Jardim das Tulipas nao encontrado';
  END IF;

  INSERT INTO public.user_condominios (
    user_id,
    condominio_id,
    role,
    status,
    joined_at,
    metadata
  )
  VALUES (
    v_user_id,
    v_condominio_id,
    'sindico',
    'active',
    NOW(),
    jsonb_build_object('perfil_morador', true)
  )
  ON CONFLICT (user_id, condominio_id) DO UPDATE
  SET role = 'sindico',
      status = 'active',
      metadata = COALESCE(public.user_condominios.metadata, '{}'::jsonb)
        || jsonb_build_object('perfil_morador', true),
      updated_at = NOW();

  RAISE NOTICE 'Perfil OK: usuario %, condominio %, role sindico', v_user_id, v_condominio_id;
END;
$$;

SELECT
  u.id AS user_id,
  u.email,
  u.nome,
  c.id AS condominio_id,
  c.nome AS condominio,
  c.subdomain,
  uc.role,
  uc.status,
  uc.metadata
FROM public.users u
JOIN public.user_condominios uc ON uc.user_id = u.id
JOIN public.condominios c ON c.id = uc.condominio_id
WHERE lower(u.email) = lower('matiasemc@gmail.com')
  AND (
    lower(c.subdomain) IN ('jd-tulipas', 'jardim-das-tulipas')
    OR c.nome ILIKE '%tulipas%'
    OR c.nome_fantasia ILIKE '%tulipas%'
  );
