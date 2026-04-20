-- ============================================================
-- CondoMais — Otimização de Índices v1.0
-- Análise completa: remoção de redundâncias, covering indexes,
-- índices faltantes para hot paths identificados
-- ============================================================

-- ============================================================
-- 1. MONITORAMENTO — pg_stat_statements
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- ============================================================
-- 2. REMOVER ÍNDICES REDUNDANTES
-- UNIQUE constraints criam índices B-tree automaticamente.
-- Manter duplicatas desperdiça memória e write overhead.
-- ============================================================

-- cnpj: coberto por uq_condominios_cnpj
DROP INDEX IF EXISTS public.idx_condominios_cnpj;

-- email: coberto por uq_users_email
DROP INDEX IF EXISTS public.idx_users_email;

-- ============================================================
-- 3. REMOVER ÍNDICES DE BAIXA SELETIVIDADE
-- status tem ~2 valores distintos ativos, role tem 5.
-- Standalone não ajudam o planner — apenas desperdiçam I/O.
-- ============================================================

DROP INDEX IF EXISTS public.idx_uc_status;
DROP INDEX IF EXISTS public.idx_uc_role;

-- ============================================================
-- 4. REMOVER ÍNDICES SUBSUÍDOS POR COMPOSTOS
-- ============================================================

-- idx_entregas_condominio subsuído por idx_entregas_condominio_status
DROP INDEX IF EXISTS public.idx_entregas_condominio;

-- idx_ocorrencias_condominio subsuído por idx_ocorrencias_condominio_status
DROP INDEX IF EXISTS public.idx_ocorrencias_condominio;

-- idx_reservas_condominio subsuído por idx_reservas_condominio_data
DROP INDEX IF EXISTS public.idx_reservas_condominio;

-- ============================================================
-- 5. UPGRADE: user_condominios — covering indexes para RLS
--
-- Funções has_role() / has_any_role() / get_user_role() fazem:
--   WHERE user_id = ? AND condominio_id = ? AND status = 'active'
--   e retornam ou comparam `role`.
-- Sem INCLUDE(role), cada hit exige heap fetch adicional.
-- ============================================================

DROP INDEX IF EXISTS public.idx_uc_user_active;
CREATE INDEX idx_uc_user_active
  ON public.user_condominios(user_id, condominio_id)
  INCLUDE (role)
  WHERE status = 'active';

-- Para o self-join em users_select_shared_tenant:
--   JOIN user_condominios ON condominio_id = ? AND user_id = ? AND status = 'active'
CREATE INDEX idx_uc_condominio_user_active
  ON public.user_condominios(condominio_id, user_id)
  INCLUDE (role)
  WHERE status = 'active';

-- Para listar membros de um condomínio por role (admin panel)
DROP INDEX IF EXISTS public.idx_uc_condominio_role_active;
CREATE INDEX idx_uc_condominio_role_active
  ON public.user_condominios(condominio_id, role)
  INCLUDE (user_id)
  WHERE status = 'active';

-- ============================================================
-- 6. UPGRADE: entregas — soft-delete aware composite
--
-- Todas as queries de entregas filtram deleted_at IS NULL.
-- Combinar condominio_id + status + created_at numa partial index
-- elimina dois índices separados e serve ambos os hot paths:
--   - Dashboard porteiro: WHERE condominio_id=? AND status='pendente' ORDER BY created_at DESC
--   - Listagem geral: WHERE condominio_id=? ORDER BY created_at DESC
-- ============================================================

DROP INDEX IF EXISTS public.idx_entregas_condominio_status;
DROP INDEX IF EXISTS public.idx_entregas_condominio_created;
DROP INDEX IF EXISTS public.idx_entregas_pendente_created;

CREATE INDEX idx_entregas_active
  ON public.entregas(condominio_id, status, created_at DESC)
  WHERE deleted_at IS NULL;

-- Job de expiração e notificação: busca pendentes/notificadas para renotificar
CREATE INDEX idx_entregas_notificacao_job
  ON public.entregas(created_at, tentativas_notificacao)
  WHERE status IN ('pendente', 'notificada') AND deleted_at IS NULL;

-- ============================================================
-- 7. UPGRADE: reservas — overlap detection + soft-delete
--
-- validar_reserva() executa:
--   WHERE equipamento_id=? AND data=? AND status='confirmada'
--   AND deleted_at IS NULL AND hora_inicio/hora_fim overlap
-- Incluir hora_inicio e hora_fim permite cobertura do range check.
-- ============================================================

DROP INDEX IF EXISTS public.idx_reservas_equipamento_data;

CREATE INDEX idx_reservas_disponibilidade
  ON public.reservas(equipamento_id, data, hora_inicio, hora_fim)
  WHERE status = 'confirmada' AND deleted_at IS NULL;

-- Calendário do condomínio com filtro de status
DROP INDEX IF EXISTS public.idx_reservas_condominio_data;
CREATE INDEX idx_reservas_condominio_data_status
  ON public.reservas(condominio_id, data, status)
  WHERE deleted_at IS NULL;

-- Reservas do morador ordenadas por data
DROP INDEX IF EXISTS public.idx_reservas_morador;
CREATE INDEX idx_reservas_morador_data
  ON public.reservas(morador_id, data DESC)
  WHERE deleted_at IS NULL;

-- ============================================================
-- 8. NOVOS ÍNDICES: avisos
-- ============================================================

-- Job de auto-arquivamento: WHERE status='publicado' AND expira_em < NOW()
CREATE INDEX idx_avisos_expira_job
  ON public.avisos(expira_em)
  WHERE status = 'publicado' AND expira_em IS NOT NULL;

-- ============================================================
-- 9. NOVOS ÍNDICES: ocorrencias
-- ============================================================

-- Timeline do admin: WHERE condominio_id=? ORDER BY data_ocorrido DESC
CREATE INDEX idx_ocorrencias_condominio_data
  ON public.ocorrencias(condominio_id, data_ocorrido DESC);

-- ============================================================
-- 10. UPGRADE: classificados — listagem ativa por recência
-- ============================================================

DROP INDEX IF EXISTS public.idx_classificados_condominio_status;
CREATE INDEX idx_classificados_condominio_ativo_created
  ON public.classificados(condominio_id, created_at DESC)
  WHERE status = 'ativo';

-- ============================================================
-- 11. ANÁLISE DE PERFORMANCE — queries diagnóstico
-- Executar no Supabase SQL Editor para validar otimizações.
-- ============================================================

-- 11.1 Queries mais lentas (requer pg_stat_statements ativo)
/*
SELECT
  LEFT(query, 120)        AS query_preview,
  calls,
  ROUND(mean_exec_time::numeric, 2) AS avg_ms,
  ROUND(total_exec_time::numeric, 2) AS total_ms,
  ROUND((100 * total_exec_time / SUM(total_exec_time) OVER ())::numeric, 1) AS pct_total
FROM pg_stat_statements
WHERE mean_exec_time > 10
ORDER BY mean_exec_time DESC
LIMIT 20;
*/

-- 11.2 Chaves estrangeiras sem índice (causam Seq Scan em DELETEs em cascata)
/*
SELECT
  tc.conrelid::regclass AS tabela,
  a.attname             AS coluna_fk
FROM pg_constraint tc
JOIN pg_attribute a
  ON a.attrelid = tc.conrelid AND a.attnum = ANY(tc.conkey)
WHERE tc.contype = 'f'
  AND NOT EXISTS (
    SELECT 1 FROM pg_index i
    WHERE i.indrelid = tc.conrelid
      AND a.attnum = ANY(i.indkey)
  )
ORDER BY tabela, coluna_fk;
*/

-- 11.3 Índices pouco ou nunca usados (candidatos à remoção futura)
/*
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan    AS vezes_usado,
  pg_size_pretty(pg_relation_size(indexrelid)) AS tamanho
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
  AND idx_scan < 50
ORDER BY idx_scan ASC, pg_relation_size(indexrelid) DESC;
*/

-- 11.4 Bloat de tabelas (linhas mortas que precisam de VACUUM)
/*
SELECT
  relname                            AS tabela,
  n_dead_tup                         AS linhas_mortas,
  n_live_tup                         AS linhas_vivas,
  ROUND(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 1) AS pct_mortas,
  last_vacuum,
  last_autovacuum
FROM pg_stat_user_tables
WHERE schemaname = 'public'
  AND n_dead_tup > 100
ORDER BY n_dead_tup DESC;
*/

-- 11.5 Tamanho dos índices por tabela
/*
SELECT
  t.tablename,
  pg_size_pretty(pg_total_relation_size(c.oid))    AS total,
  pg_size_pretty(pg_relation_size(c.oid))          AS tabela,
  pg_size_pretty(pg_indexes_size(c.oid))           AS indices
FROM pg_tables t
JOIN pg_class c ON c.relname = t.tablename
WHERE t.schemaname = 'public'
ORDER BY pg_total_relation_size(c.oid) DESC;
*/

-- 11.6 Validar índices criados nesta migração
/*
SELECT
  indexname,
  tablename,
  pg_size_pretty(pg_relation_size(indexrelid)) AS tamanho,
  indisvalid AS valido
FROM pg_stat_user_indexes
JOIN pg_index USING (indexrelid)
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
*/
