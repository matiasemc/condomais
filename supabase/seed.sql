-- ============================================================
-- CondoMais — Seed Data (dev / staging apenas)
-- Executado por: supabase db reset (após migrations)
-- ============================================================

DO $$
DECLARE
  v_condo_id UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid;
  v_user_id  UUID := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid;
  v_eq_id    UUID := 'cccccccc-cccc-cccc-cccc-cccccccccccc'::uuid;
BEGIN

  -- auth.users (necessário por FK public.users → auth.users)
  INSERT INTO auth.users (
    id, instance_id, aud, role, email,
    encrypted_password, email_confirmed_at, created_at, updated_at,
    is_sso_user, raw_app_meta_data, raw_user_meta_data
  ) VALUES (
    v_user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'joao.silva@example.com',
    '', NOW(), NOW(), NOW(),
    false, '{}', '{"full_name": "João Silva"}'
  ) ON CONFLICT (id) DO NOTHING;

  -- condominio seed
  INSERT INTO public.condominios (
    id, cnpj, nome, nome_fantasia, subdomain,
    endereco, cep, cidade, estado,
    telefone, whatsapp, email,
    plan, subscription_status
  ) VALUES (
    v_condo_id,
    '12.345.678/0001-90',
    'Condomínio Edifício Solar do Vale',
    'Edifício Solar',
    'solar',
    'Rua das Flores, 123', '01310-100', 'São Paulo', 'SP',
    '(11) 3456-7890', '(11) 98765-4321', 'admin@solar.example.com',
    'plus', 'active'
  ) ON CONFLICT (id) DO NOTHING;

  -- public.users (criado pelo trigger handle_new_user em produção;
  -- inserido manualmente no seed porque não há auth signup aqui)
  INSERT INTO public.users (id, email, nome, telefone)
  VALUES (
    v_user_id,
    'joao.silva@example.com',
    'João Silva',
    '(11) 99999-1111'
  ) ON CONFLICT (id) DO NOTHING;

  -- João é síndico do Solar
  INSERT INTO public.user_condominios (user_id, condominio_id, role, status, joined_at)
  VALUES (v_user_id, v_condo_id, 'sindico', 'active', NOW())
  ON CONFLICT (user_id, condominio_id) DO NOTHING;

  -- Equipamento seed
  INSERT INTO public.equipamentos (
    id, condominio_id, nome, descricao, capacidade,
    horario_inicio, horario_fim
  ) VALUES (
    v_eq_id, v_condo_id,
    'Salão de Festas A',
    'Salão climatizado com churrasqueira, capacidade 80 pessoas',
    80, '08:00', '23:00'
  ) ON CONFLICT (id) DO NOTHING;

  -- Aviso seed
  INSERT INTO public.avisos (
    id, condominio_id, criado_por, titulo, mensagem,
    prioridade, status, publicado_em
  ) VALUES (
    'dddddddd-dddd-dddd-dddd-dddddddddddd'::uuid,
    v_condo_id, v_user_id,
    'Bem-vindo ao CondoMais!',
    'O sistema de gestão do condomínio foi ativado com sucesso.',
    'alta', 'publicado', NOW()
  ) ON CONFLICT (id) DO NOTHING;

  RAISE NOTICE 'Seed OK — condominio=%, sindico=%', v_condo_id, v_user_id;
END;
$$;
