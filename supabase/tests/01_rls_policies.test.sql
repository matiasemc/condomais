-- ============================================================
-- CondoMais — RLS Policy Tests (pgTAP)
-- Cobertura: 10 tabelas × SELECT/INSERT/UPDATE/DELETE por role
-- Total: 74 assertions
--
-- Pré-requisito: CREATE EXTENSION pgtap (Supabase local inclui)
-- Execução:      supabase test db
-- ============================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgtap;

SELECT plan(74);

-- ============================================================
-- HELPERS
-- ============================================================

-- Simula sessão autenticada do Supabase para um user_id específico.
-- Equivale a um JWT com { "sub": "<uuid>", "role": "authenticated" }.
CREATE OR REPLACE FUNCTION tests.set_auth(p_user_id UUID)
RETURNS void LANGUAGE sql AS $$
  SELECT set_config(
    'request.jwt.claims',
    json_build_object('sub', p_user_id::text, 'role', 'authenticated')::text,
    true
  );
$$;

-- ============================================================
-- UUID CONSTANTS
-- ============================================================
-- Condominios
--   CONDO_A   = 10000000-0000-0000-0000-000000000001
--   CONDO_B   = 10000000-0000-0000-0000-000000000002
--   CONDO_DEL = 10000000-0000-0000-0000-000000000003 (soft-deleted)
--
-- Usuários
--   MASTER    = 00000000-0000-0000-0000-000000000001 (master_admin)
--   SINDICO   = 00000000-0000-0000-0000-000000000002 (sindico condo A)
--   PORTEIRO  = 00000000-0000-0000-0000-000000000003 (porteiro condo A)
--   MORADOR_A = 00000000-0000-0000-0000-000000000004 (morador condo A)
--   MORADOR_B = 00000000-0000-0000-0000-000000000005 (morador condo B only)
--   NOACCESS  = 00000000-0000-0000-0000-000000000006 (sem membership)
--
-- Recursos
--   EQUIP     = 20000000-0000-0000-0000-000000000001
--   AV_PUB    = 30000000-0000-0000-0000-000000000001 (aviso publicado)
--   AV_RAS    = 30000000-0000-0000-0000-000000000002 (aviso rascunho)
--   ENTREGA   = 40000000-0000-0000-0000-000000000001
--   ENTREGA_D = 40000000-0000-0000-0000-000000000002 (soft-deleted)
--   OCORR     = 50000000-0000-0000-0000-000000000001
--   OC_IMG    = 55000000-0000-0000-0000-000000000001
--   RESERVA   = 60000000-0000-0000-0000-000000000001
--   RESERVA_D = 60000000-0000-0000-0000-000000000002 (soft-deleted)
--   CL_AT     = 70000000-0000-0000-0000-000000000001 (ativo, dono=MORADOR_A)
--   CL_VD     = 70000000-0000-0000-0000-000000000002 (vendido, dono=MORADOR_A)

-- ============================================================
-- FIXTURE SETUP (superuser — bypassa RLS)
-- ============================================================

-- auth.users (FK requerida por public.users)
INSERT INTO auth.users (
  id, instance_id, aud, role, email,
  encrypted_password, email_confirmed_at, created_at, updated_at,
  is_sso_user, raw_app_meta_data, raw_user_meta_data
) VALUES
  ('00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000000',
   'authenticated','authenticated','master@test.local',
   '',NOW(),NOW(),NOW(),false,'{}','{}'),
  ('00000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000000',
   'authenticated','authenticated','sindico@test.local',
   '',NOW(),NOW(),NOW(),false,'{}','{}'),
  ('00000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000000',
   'authenticated','authenticated','porteiro@test.local',
   '',NOW(),NOW(),NOW(),false,'{}','{}'),
  ('00000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000000',
   'authenticated','authenticated','morador_a@test.local',
   '',NOW(),NOW(),NOW(),false,'{}','{}'),
  ('00000000-0000-0000-0000-000000000005','00000000-0000-0000-0000-000000000000',
   'authenticated','authenticated','morador_b@test.local',
   '',NOW(),NOW(),NOW(),false,'{}','{}'),
  ('00000000-0000-0000-0000-000000000006','00000000-0000-0000-0000-000000000000',
   'authenticated','authenticated','noaccess@test.local',
   '',NOW(),NOW(),NOW(),false,'{}','{}');

-- public.users
INSERT INTO public.users (id, email, nome) VALUES
  ('00000000-0000-0000-0000-000000000001','master@test.local',  'Master Admin'),
  ('00000000-0000-0000-0000-000000000002','sindico@test.local', 'Síndico A'),
  ('00000000-0000-0000-0000-000000000003','porteiro@test.local','Porteiro A'),
  ('00000000-0000-0000-0000-000000000004','morador_a@test.local','Morador A'),
  ('00000000-0000-0000-0000-000000000005','morador_b@test.local','Morador B'),
  ('00000000-0000-0000-0000-000000000006','noaccess@test.local', 'No Access');

-- condominios (2 ativos + 1 soft-deleted)
INSERT INTO public.condominios (id, cnpj, nome, subdomain, plan, subscription_status) VALUES
  ('10000000-0000-0000-0000-000000000001','11.111.111/0001-11','Condo A','condo-a','plus','active'),
  ('10000000-0000-0000-0000-000000000002','22.222.222/0001-22','Condo B','condo-b','basic','active'),
  ('10000000-0000-0000-0000-000000000003','33.333.333/0001-33','Condo Deletado','condo-del','basic','cancelled');

UPDATE public.condominios SET deleted_at = NOW()
WHERE id = '10000000-0000-0000-0000-000000000003';

-- memberships
INSERT INTO public.user_condominios (user_id, condominio_id, role, status) VALUES
  ('00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','master_admin','active'),
  ('00000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001','sindico',    'active'),
  ('00000000-0000-0000-0000-000000000003','10000000-0000-0000-0000-000000000001','porteiro',   'active'),
  ('00000000-0000-0000-0000-000000000004','10000000-0000-0000-0000-000000000001','morador',    'active'),
  ('00000000-0000-0000-0000-000000000005','10000000-0000-0000-0000-000000000002','morador',    'active');

-- equipamentos
INSERT INTO public.equipamentos (id, condominio_id, nome, horario_inicio, horario_fim) VALUES
  ('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001',
   'Salão de Festas','08:00','22:00');

-- avisos (1 publicado + 1 rascunho)
INSERT INTO public.avisos (id, condominio_id, criado_por, titulo, mensagem, status, publicado_em) VALUES
  ('30000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000002','Aviso Publicado','Mensagem publicada','publicado',NOW()),
  ('30000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000002','Aviso Rascunho', 'Mensagem rascunho', 'rascunho', NULL);

-- entregas (1 ativa + 1 soft-deleted)
INSERT INTO public.entregas (id, condominio_id, porteiro_id, unidade, tipo, status) VALUES
  ('40000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000003','101','encomenda','pendente'),
  ('40000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000003','102','encomenda','retirada');

UPDATE public.entregas SET deleted_at = NOW()
WHERE id = '40000000-0000-0000-0000-000000000002';

-- ocorrencias + imagem
INSERT INTO public.ocorrencias (id, condominio_id, porteiro_id, tipo, descricao, data_ocorrido) VALUES
  ('50000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000003','ruido','Barulho excessivo',NOW());

INSERT INTO public.ocorrencia_imagens (id, ocorrencia_id, image_url) VALUES
  ('55000000-0000-0000-0000-000000000001','50000000-0000-0000-0000-000000000001',
   'https://storage.test/img1.jpg');

-- reservas (1 ativa + 1 soft-deleted)
INSERT INTO public.reservas (id, condominio_id, equipamento_id, morador_id, data, hora_inicio, hora_fim) VALUES
  ('60000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001',
   '20000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000004',
   CURRENT_DATE + 7, '14:00','16:00'),
  ('60000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001',
   '20000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000004',
   CURRENT_DATE + 14,'10:00','12:00');

UPDATE public.reservas SET deleted_at = NOW()
WHERE id = '60000000-0000-0000-0000-000000000002';

-- classificados (1 ativo + 1 vendido, ambos de morador_a)
INSERT INTO public.classificados (id, condominio_id, morador_id, titulo, descricao, status) VALUES
  ('70000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000004','Bicicleta à venda','Bike seminova','ativo'),
  ('70000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000004','Sofá vendido',    'Sofá 3 lug',   'vendido');

-- ============================================================
-- SEÇÃO 1: condominios (#1–#9)
-- SELECT é aberto (sem restrição de role).
-- INSERT/UPDATE/DELETE requerem master_admin ou sindico do condo.
-- ============================================================

-- #1 morador_a vê condo_a ativo
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.condominios
   WHERE id = '10000000-0000-0000-0000-000000000001'),
  1, '#1: morador_a vê condo_a ativo');
RESET ROLE;

-- #2 condo soft-deleted está oculto (deleted_at IS NOT NULL)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.condominios
   WHERE id = '10000000-0000-0000-0000-000000000003'),
  0, '#2: condo com deleted_at está oculto');
RESET ROLE;

-- #3 usuário sem membership também vê condominios (SELECT policy é pública)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000006');
SELECT is(
  (SELECT COUNT(*)::int FROM public.condominios WHERE deleted_at IS NULL),
  2, '#3: noaccess vê condominios ativos (SELECT policy aberta)');
RESET ROLE;

-- #4 master_admin pode INSERT condominio
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000001');
SELECT is(
  (WITH ins AS (
    INSERT INTO public.condominios (cnpj, nome, subdomain, plan, subscription_status)
    VALUES ('44.444.444/0001-44','Condo Insert Test','condo-ins','basic','trial')
    RETURNING id
  ) SELECT COUNT(*)::int FROM ins),
  1, '#4: master_admin pode INSERT condominio');
RESET ROLE;

-- #5 sindico NÃO pode INSERT condominio (apenas master_admin)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT throws_ok(
  $$INSERT INTO public.condominios (cnpj, nome, plan, subscription_status)
    VALUES ('55.555.555/0001-55','Condo Hack','basic','trial')$$,
  '42501', NULL, '#5: sindico NÃO pode INSERT condominio');
RESET ROLE;

-- #6 morador NÃO pode INSERT condominio
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT throws_ok(
  $$INSERT INTO public.condominios (cnpj, nome, plan, subscription_status)
    VALUES ('66.666.666/0001-66','Condo Hack 2','basic','trial')$$,
  '42501', NULL, '#6: morador NÃO pode INSERT condominio');
RESET ROLE;

-- #7 sindico pode UPDATE no próprio condo (1 row afetada)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH u AS (
    UPDATE public.condominios SET nome_fantasia = 'Condo A Update'
    WHERE id = '10000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  1, '#7: sindico pode UPDATE no próprio condo');
RESET ROLE;

-- #8 sindico NÃO pode UPDATE em condo alheio (0 rows)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH u AS (
    UPDATE public.condominios SET nome_fantasia = 'Hack B'
    WHERE id = '10000000-0000-0000-0000-000000000002'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  0, '#8: sindico NÃO pode UPDATE condominio alheio');
RESET ROLE;

-- #9 morador NÃO pode UPDATE nenhum condo (0 rows)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH u AS (
    UPDATE public.condominios SET nome_fantasia = 'Hack'
    WHERE id = '10000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  0, '#9: morador NÃO pode UPDATE condominio');
RESET ROLE;

-- ============================================================
-- SEÇÃO 2: users (#10–#16)
-- SELECT: próprio OU membros de condo compartilhado.
-- UPDATE: somente o próprio perfil.
-- ============================================================

-- #10 usuário vê o próprio perfil
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.users
   WHERE id = '00000000-0000-0000-0000-000000000004'),
  1, '#10: morador_a vê o próprio perfil');
RESET ROLE;

-- #11 morador_a vê colega do mesmo condo (morador_a e sindico compartilham condo A)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.users
   WHERE id = '00000000-0000-0000-0000-000000000002'),
  1, '#11: morador_a vê sindico (mesmo condo)');
RESET ROLE;

-- #12 morador_a NÃO vê morador_b (condos sem overlap)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.users
   WHERE id = '00000000-0000-0000-0000-000000000005'),
  0, '#12: morador_a NÃO vê morador_b (condos distintos)');
RESET ROLE;

-- #13 master_admin vê todos os 6 usuários
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000001');
SELECT is(
  (SELECT COUNT(*)::int FROM public.users),
  6, '#13: master_admin vê todos os usuários');
RESET ROLE;

-- #14 morador_a pode UPDATE o próprio perfil (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH u AS (
    UPDATE public.users SET telefone = '(11) 99999-0000'
    WHERE id = '00000000-0000-0000-0000-000000000004'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  1, '#14: morador_a pode UPDATE o próprio perfil');
RESET ROLE;

-- #15 morador_a NÃO pode UPDATE perfil do sindico (0 rows)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH u AS (
    UPDATE public.users SET nome = 'Hacked'
    WHERE id = '00000000-0000-0000-0000-000000000002'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  0, '#15: morador_a NÃO pode UPDATE perfil alheio');
RESET ROLE;

-- #16 noaccess NÃO pode UPDATE perfil do master_admin (0 rows)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000006');
SELECT is(
  (WITH u AS (
    UPDATE public.users SET nome = 'Hacked'
    WHERE id = '00000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  0, '#16: noaccess NÃO pode UPDATE perfil do master_admin');
RESET ROLE;

-- ============================================================
-- SEÇÃO 3: user_condominios (#17–#23)
-- SELECT: própria membership OU sindico/conselho do condo.
-- INSERT/UPDATE: sindico ou master_admin.
-- DELETE: somente master_admin.
-- ============================================================

-- #17 morador_a vê a própria membership (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.user_condominios
   WHERE user_id = '00000000-0000-0000-0000-000000000004'),
  1, '#17: morador_a vê a própria membership');
RESET ROLE;

-- #18 sindico vê as 4 memberships do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (SELECT COUNT(*)::int FROM public.user_condominios
   WHERE condominio_id = '10000000-0000-0000-0000-000000000001'),
  4, '#18: sindico vê as 4 memberships do condo A');
RESET ROLE;

-- #19 morador_a NÃO vê membership de morador_b (condo diferente)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.user_condominios
   WHERE user_id = '00000000-0000-0000-0000-000000000005'),
  0, '#19: morador_a NÃO vê memberships de morador_b');
RESET ROLE;

-- #20 sindico pode INSERT nova membership (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH ins AS (
    INSERT INTO public.user_condominios (user_id, condominio_id, role, status)
    VALUES ('00000000-0000-0000-0000-000000000006',
            '10000000-0000-0000-0000-000000000001','morador','active')
    RETURNING user_id
  ) SELECT COUNT(*)::int FROM ins),
  1, '#20: sindico pode INSERT nova membership');
RESET ROLE;

-- #21 morador NÃO pode INSERT membership → throws 42501
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT throws_ok(
  $$INSERT INTO public.user_condominios (user_id, condominio_id, role, status)
    VALUES ('00000000-0000-0000-0000-000000000006',
            '10000000-0000-0000-0000-000000000001','porteiro','active')$$,
  '42501', NULL, '#21: morador NÃO pode INSERT membership');
RESET ROLE;

-- #22 sindico pode UPDATE status de membership (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH u AS (
    UPDATE public.user_condominios SET status = 'inactive'
    WHERE user_id       = '00000000-0000-0000-0000-000000000003'
      AND condominio_id = '10000000-0000-0000-0000-000000000001'
    RETURNING user_id
  ) SELECT COUNT(*)::int FROM u),
  1, '#22: sindico pode UPDATE status de membership');
RESET ROLE;

-- #23 master_admin pode DELETE membership (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000001');
SELECT is(
  (WITH d AS (
    DELETE FROM public.user_condominios
    WHERE user_id       = '00000000-0000-0000-0000-000000000003'
      AND condominio_id = '10000000-0000-0000-0000-000000000001'
    RETURNING user_id
  ) SELECT COUNT(*)::int FROM d),
  1, '#23: master_admin pode DELETE membership');
RESET ROLE;

-- ============================================================
-- SEÇÃO 4: equipamentos (#24–#29)
-- SELECT: membros ativos do condo.
-- ALL (write): sindico/conselho ou master_admin.
-- ============================================================

-- #24 morador_a vê equipamentos do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.equipamentos
   WHERE condominio_id = '10000000-0000-0000-0000-000000000001'),
  1, '#24: morador_a vê equipamentos do condo A');
RESET ROLE;

-- #25 morador_b NÃO vê equipamentos do condo A (condo diferente)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000005');
SELECT is(
  (SELECT COUNT(*)::int FROM public.equipamentos
   WHERE condominio_id = '10000000-0000-0000-0000-000000000001'),
  0, '#25: morador_b NÃO vê equipamentos do condo A');
RESET ROLE;

-- #26 sindico pode INSERT equipamento (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH ins AS (
    INSERT INTO public.equipamentos (condominio_id, nome, horario_inicio, horario_fim)
    VALUES ('10000000-0000-0000-0000-000000000001','Piscina','08:00','20:00')
    RETURNING id
  ) SELECT COUNT(*)::int FROM ins),
  1, '#26: sindico pode INSERT equipamento');
RESET ROLE;

-- #27 morador NÃO pode INSERT equipamento → throws 42501
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT throws_ok(
  $$INSERT INTO public.equipamentos (condominio_id, nome, horario_inicio, horario_fim)
    VALUES ('10000000-0000-0000-0000-000000000001','Hack','08:00','20:00')$$,
  '42501', NULL, '#27: morador NÃO pode INSERT equipamento');
RESET ROLE;

-- #28 sindico pode UPDATE equipamento (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH u AS (
    UPDATE public.equipamentos SET capacidade = 100
    WHERE id = '20000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  1, '#28: sindico pode UPDATE equipamento');
RESET ROLE;

-- #29 morador NÃO pode UPDATE equipamento (0 rows)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH u AS (
    UPDATE public.equipamentos SET capacidade = 999
    WHERE id = '20000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  0, '#29: morador NÃO pode UPDATE equipamento');
RESET ROLE;

-- ============================================================
-- SEÇÃO 5: avisos (#30–#37)
-- SELECT publicado: membros ativos.
-- SELECT todos: sindico/conselho/master_admin.
-- INSERT/UPDATE/DELETE: sindico/conselho ou master_admin.
-- ============================================================

-- #30 morador_a vê aviso publicado do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.avisos
   WHERE id = '30000000-0000-0000-0000-000000000001'),
  1, '#30: morador_a vê aviso publicado');
RESET ROLE;

-- #31 morador_a NÃO vê aviso rascunho (status != publicado)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.avisos
   WHERE id = '30000000-0000-0000-0000-000000000002'),
  0, '#31: morador_a NÃO vê aviso rascunho');
RESET ROLE;

-- #32 sindico vê todos os avisos do condo A (publicado + rascunho = 2)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (SELECT COUNT(*)::int FROM public.avisos
   WHERE condominio_id = '10000000-0000-0000-0000-000000000001'),
  2, '#32: sindico vê todos os avisos (publicado + rascunho)');
RESET ROLE;

-- #33 morador_b NÃO vê nenhum aviso do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000005');
SELECT is(
  (SELECT COUNT(*)::int FROM public.avisos
   WHERE condominio_id = '10000000-0000-0000-0000-000000000001'),
  0, '#33: morador_b NÃO vê avisos do condo A');
RESET ROLE;

-- #34 sindico pode INSERT aviso (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH ins AS (
    INSERT INTO public.avisos
      (condominio_id, criado_por, titulo, mensagem, status)
    VALUES ('10000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000002',
            'Aviso Teste','Conteúdo','rascunho')
    RETURNING id
  ) SELECT COUNT(*)::int FROM ins),
  1, '#34: sindico pode INSERT aviso');
RESET ROLE;

-- #35 morador NÃO pode INSERT aviso → throws 42501
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT throws_ok(
  $$INSERT INTO public.avisos
      (condominio_id, criado_por, titulo, mensagem, status)
    VALUES ('10000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000004',
            'Hack','Hack msg','publicado')$$,
  '42501', NULL, '#35: morador NÃO pode INSERT aviso');
RESET ROLE;

-- #36 sindico pode UPDATE aviso (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH u AS (
    UPDATE public.avisos SET prioridade = 'alta'
    WHERE id = '30000000-0000-0000-0000-000000000002'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  1, '#36: sindico pode UPDATE aviso');
RESET ROLE;

-- #37 morador NÃO pode UPDATE aviso (0 rows)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH u AS (
    UPDATE public.avisos SET titulo = 'Hack'
    WHERE id = '30000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  0, '#37: morador NÃO pode UPDATE aviso');
RESET ROLE;

-- ============================================================
-- SEÇÃO 6: entregas (#38–#45)
-- SELECT: membros ativos (deleted_at IS NULL).
-- INSERT/UPDATE: porteiro ou sindico.
-- DELETE: sindico ou master_admin.
-- ============================================================

-- #38 morador_a vê entrega ativa do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.entregas
   WHERE id = '40000000-0000-0000-0000-000000000001'),
  1, '#38: morador_a vê entrega ativa');
RESET ROLE;

-- #39 morador_b NÃO vê entregas do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000005');
SELECT is(
  (SELECT COUNT(*)::int FROM public.entregas
   WHERE condominio_id = '10000000-0000-0000-0000-000000000001'),
  0, '#39: morador_b NÃO vê entregas do condo A');
RESET ROLE;

-- #40 entrega soft-deleted está oculta (deleted_at IS NOT NULL)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.entregas
   WHERE id = '40000000-0000-0000-0000-000000000002'),
  0, '#40: entrega soft-deleted está oculta');
RESET ROLE;

-- #41 porteiro pode INSERT entrega (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000003');
SELECT is(
  (WITH ins AS (
    INSERT INTO public.entregas (condominio_id, porteiro_id, unidade, tipo, status)
    VALUES ('10000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000003','201','encomenda','pendente')
    RETURNING id
  ) SELECT COUNT(*)::int FROM ins),
  1, '#41: porteiro pode INSERT entrega');
RESET ROLE;

-- #42 morador NÃO pode INSERT entrega → throws 42501
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT throws_ok(
  $$INSERT INTO public.entregas (condominio_id, unidade, tipo, status)
    VALUES ('10000000-0000-0000-0000-000000000001','301','encomenda','pendente')$$,
  '42501', NULL, '#42: morador NÃO pode INSERT entrega');
RESET ROLE;

-- #43 porteiro pode UPDATE entrega (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000003');
SELECT is(
  (WITH u AS (
    UPDATE public.entregas SET transportadora = 'Correios'
    WHERE id = '40000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  1, '#43: porteiro pode UPDATE entrega');
RESET ROLE;

-- #44 morador NÃO pode UPDATE entrega (0 rows — blocked by RLS)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH u AS (
    UPDATE public.entregas SET status = 'retirada'
    WHERE id = '40000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  0, '#44: morador NÃO pode UPDATE entrega');
RESET ROLE;

-- #45 sindico pode DELETE entrega (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH d AS (
    DELETE FROM public.entregas
    WHERE id = '40000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM d),
  1, '#45: sindico pode DELETE entrega');
RESET ROLE;

-- ============================================================
-- SEÇÃO 7: ocorrencias (#46–#52)
-- SELECT: membros ativos.
-- INSERT/UPDATE: porteiro/sindico/conselho.
-- DELETE: sindico ou master_admin.
-- ============================================================

-- #46 morador_a vê ocorrencias do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.ocorrencias
   WHERE condominio_id = '10000000-0000-0000-0000-000000000001'),
  1, '#46: morador_a vê ocorrencias do condo A');
RESET ROLE;

-- #47 morador_b NÃO vê ocorrencias do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000005');
SELECT is(
  (SELECT COUNT(*)::int FROM public.ocorrencias
   WHERE condominio_id = '10000000-0000-0000-0000-000000000001'),
  0, '#47: morador_b NÃO vê ocorrencias do condo A');
RESET ROLE;

-- #48 porteiro pode INSERT ocorrencia (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000003');
SELECT is(
  (WITH ins AS (
    INSERT INTO public.ocorrencias
      (condominio_id, porteiro_id, tipo, descricao, data_ocorrido)
    VALUES ('10000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000003',
            'vandalismo','Pichação no elevador',NOW())
    RETURNING id
  ) SELECT COUNT(*)::int FROM ins),
  1, '#48: porteiro pode INSERT ocorrencia');
RESET ROLE;

-- #49 morador NÃO pode INSERT ocorrencia → throws 42501
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT throws_ok(
  $$INSERT INTO public.ocorrencias
      (condominio_id, tipo, descricao, data_ocorrido)
    VALUES ('10000000-0000-0000-0000-000000000001','ruido','Hack',NOW())$$,
  '42501', NULL, '#49: morador NÃO pode INSERT ocorrencia');
RESET ROLE;

-- #50 porteiro pode UPDATE ocorrencia (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000003');
SELECT is(
  (WITH u AS (
    UPDATE public.ocorrencias SET local = 'Portão Principal'
    WHERE id = '50000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  1, '#50: porteiro pode UPDATE ocorrencia');
RESET ROLE;

-- #51 morador NÃO pode UPDATE ocorrencia (0 rows)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH u AS (
    UPDATE public.ocorrencias SET status = 'resolvida'
    WHERE id = '50000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  0, '#51: morador NÃO pode UPDATE ocorrencia');
RESET ROLE;

-- #52 sindico pode DELETE ocorrencia (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH d AS (
    DELETE FROM public.ocorrencias
    WHERE id = '50000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM d),
  1, '#52: sindico pode DELETE ocorrencia');
RESET ROLE;

-- ============================================================
-- SEÇÃO 8: ocorrencia_imagens (#53–#57)
-- Acesso derivado da ocorrencia (via JOIN + condominio_id).
-- ocorrencia foi deletada no #52; re-insere para esta seção.
-- ============================================================

INSERT INTO public.ocorrencias (id, condominio_id, porteiro_id, tipo, descricao, data_ocorrido)
VALUES ('50000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000003','ruido','Restaurada para teste imagem',NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.ocorrencia_imagens (id, ocorrencia_id, image_url)
VALUES ('55000000-0000-0000-0000-000000000001','50000000-0000-0000-0000-000000000001',
        'https://storage.test/img1.jpg')
ON CONFLICT (id) DO NOTHING;

-- #53 morador_a vê imagens de ocorrencias do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.ocorrencia_imagens
   WHERE id = '55000000-0000-0000-0000-000000000001'),
  1, '#53: morador_a vê imagens do condo A');
RESET ROLE;

-- #54 morador_b NÃO vê imagens do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000005');
SELECT is(
  (SELECT COUNT(*)::int FROM public.ocorrencia_imagens
   WHERE id = '55000000-0000-0000-0000-000000000001'),
  0, '#54: morador_b NÃO vê imagens do condo A');
RESET ROLE;

-- #55 porteiro pode INSERT imagem (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000003');
SELECT is(
  (WITH ins AS (
    INSERT INTO public.ocorrencia_imagens (ocorrencia_id, image_url, ordem)
    VALUES ('50000000-0000-0000-0000-000000000001',
            'https://storage.test/img2.jpg', 1)
    RETURNING id
  ) SELECT COUNT(*)::int FROM ins),
  1, '#55: porteiro pode INSERT imagem');
RESET ROLE;

-- #56 morador NÃO pode INSERT imagem → throws 42501
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT throws_ok(
  $$INSERT INTO public.ocorrencia_imagens (ocorrencia_id, image_url)
    VALUES ('50000000-0000-0000-0000-000000000001','https://hack.test/img.jpg')$$,
  '42501', NULL, '#56: morador NÃO pode INSERT imagem');
RESET ROLE;

-- #57 sindico pode DELETE imagem (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH d AS (
    DELETE FROM public.ocorrencia_imagens
    WHERE id = '55000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM d),
  1, '#57: sindico pode DELETE imagem');
RESET ROLE;

-- ============================================================
-- SEÇÃO 9: reservas (#58–#66)
-- SELECT: membros ativos (deleted_at IS NULL).
-- INSERT: membro com morador_id = auth.uid() OU sindico/conselho.
-- UPDATE: próprio morador OU sindico/conselho.
-- DELETE: sindico ou master_admin.
-- ============================================================

-- #58 morador_a vê reserva ativa do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.reservas
   WHERE id = '60000000-0000-0000-0000-000000000001'),
  1, '#58: morador_a vê reserva ativa');
RESET ROLE;

-- #59 morador_b NÃO vê reservas do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000005');
SELECT is(
  (SELECT COUNT(*)::int FROM public.reservas
   WHERE condominio_id = '10000000-0000-0000-0000-000000000001'),
  0, '#59: morador_b NÃO vê reservas do condo A');
RESET ROLE;

-- #60 reserva soft-deleted está oculta
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.reservas
   WHERE id = '60000000-0000-0000-0000-000000000002'),
  0, '#60: reserva soft-deleted está oculta');
RESET ROLE;

-- #61 morador pode INSERT reserva para si mesmo (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH ins AS (
    INSERT INTO public.reservas
      (condominio_id, equipamento_id, morador_id, data, hora_inicio, hora_fim)
    VALUES ('10000000-0000-0000-0000-000000000001',
            '20000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000004',
            CURRENT_DATE + 21,'09:00','11:00')
    RETURNING id
  ) SELECT COUNT(*)::int FROM ins),
  1, '#61: morador pode INSERT reserva para si mesmo');
RESET ROLE;

-- #62 morador NÃO pode INSERT reserva com morador_id alheio → throws 42501
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT throws_ok(
  $$INSERT INTO public.reservas
      (condominio_id, equipamento_id, morador_id, data, hora_inicio, hora_fim)
    VALUES ('10000000-0000-0000-0000-000000000001',
            '20000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000003',
            CURRENT_DATE + 28,'15:00','17:00')$$,
  '42501', NULL, '#62: morador NÃO pode INSERT reserva com morador_id alheio');
RESET ROLE;

-- #63 morador_b NÃO pode INSERT reserva no condo A (não é membro) → throws 42501
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000005');
SELECT throws_ok(
  $$INSERT INTO public.reservas
      (condominio_id, equipamento_id, morador_id, data, hora_inicio, hora_fim)
    VALUES ('10000000-0000-0000-0000-000000000001',
            '20000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000005',
            CURRENT_DATE + 35,'18:00','20:00')$$,
  '42501', NULL, '#63: morador_b NÃO pode INSERT reserva no condo A');
RESET ROLE;

-- #64 morador_a pode UPDATE a própria reserva (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH u AS (
    UPDATE public.reservas SET motivo = 'Aniversário'
    WHERE id = '60000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  1, '#64: morador_a pode UPDATE a própria reserva');
RESET ROLE;

-- #65 porteiro NÃO pode UPDATE reserva de outro morador (0 rows)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000003');
SELECT is(
  (WITH u AS (
    UPDATE public.reservas SET motivo = 'Hack'
    WHERE id = '60000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  0, '#65: porteiro NÃO pode UPDATE reserva de outro morador');
RESET ROLE;

-- #66 sindico pode DELETE reserva (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH d AS (
    DELETE FROM public.reservas
    WHERE id = '60000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM d),
  1, '#66: sindico pode DELETE reserva');
RESET ROLE;

-- ============================================================
-- SEÇÃO 10: classificados (#67–#74)
-- SELECT ativo: membros do condo.
-- SELECT próprio: qualquer status (morador_id = auth.uid()).
-- INSERT: membro com morador_id = auth.uid().
-- UPDATE: próprio morador OU sindico/conselho/master_admin.
-- DELETE: sindico ou master_admin.
-- ============================================================

-- #67 morador_a vê classificado ativo do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.classificados
   WHERE id = '70000000-0000-0000-0000-000000000001'),
  1, '#67: morador_a vê classificado ativo');
RESET ROLE;

-- #68 porteiro NÃO vê classificado vendido de outro morador (não é dono, não é admin)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000003');
SELECT is(
  (SELECT COUNT(*)::int FROM public.classificados
   WHERE id = '70000000-0000-0000-0000-000000000002'),
  0, '#68: porteiro NÃO vê classificado vendido de outro morador');
RESET ROLE;

-- #69 morador_a VÊ o próprio classificado vendido (policy OR morador_id = auth.uid())
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (SELECT COUNT(*)::int FROM public.classificados
   WHERE id = '70000000-0000-0000-0000-000000000002'),
  1, '#69: morador_a vê o próprio classificado mesmo vendido');
RESET ROLE;

-- #70 morador_b NÃO vê nenhum classificado do condo A
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000005');
SELECT is(
  (SELECT COUNT(*)::int FROM public.classificados
   WHERE condominio_id = '10000000-0000-0000-0000-000000000001'),
  0, '#70: morador_b NÃO vê classificados do condo A');
RESET ROLE;

-- #71 morador pode INSERT classificado para si (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH ins AS (
    INSERT INTO public.classificados
      (condominio_id, morador_id, titulo, descricao, categoria, status)
    VALUES ('10000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000004',
            'Mesa de jantar','Mesa 6 lugares','venda','ativo')
    RETURNING id
  ) SELECT COUNT(*)::int FROM ins),
  1, '#71: morador pode INSERT classificado para si');
RESET ROLE;

-- #72 morador NÃO pode INSERT classificado com morador_id alheio → throws 42501
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT throws_ok(
  $$INSERT INTO public.classificados
      (condominio_id, morador_id, titulo, descricao, categoria, status)
    VALUES ('10000000-0000-0000-0000-000000000001',
            '00000000-0000-0000-0000-000000000003',
            'Hack','Hack desc','venda','ativo')$$,
  '42501', NULL, '#72: morador NÃO pode INSERT classificado com morador_id alheio');
RESET ROLE;

-- #73 morador pode UPDATE o próprio classificado (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000004');
SELECT is(
  (WITH u AS (
    UPDATE public.classificados SET preco = 150.00
    WHERE id = '70000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM u),
  1, '#73: morador pode UPDATE o próprio classificado');
RESET ROLE;

-- #74 sindico pode DELETE qualquer classificado do condo A (1 row)
SET LOCAL ROLE authenticated;
SELECT tests.set_auth('00000000-0000-0000-0000-000000000002');
SELECT is(
  (WITH d AS (
    DELETE FROM public.classificados
    WHERE id = '70000000-0000-0000-0000-000000000001'
    RETURNING id
  ) SELECT COUNT(*)::int FROM d),
  1, '#74: sindico pode DELETE classificado do condo A');
RESET ROLE;

-- ============================================================
-- FINALIZAÇÃO
-- ============================================================

SELECT * FROM finish();

ROLLBACK;
