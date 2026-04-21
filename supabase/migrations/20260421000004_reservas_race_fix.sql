-- ============================================================
-- Fix race condition in validar_reserva trigger.
-- Adds pg_advisory_xact_lock to serialize concurrent inserts
-- for the same (equipamento_id, data) pair, preventing overlap
-- under READ COMMITTED isolation when two transactions run the
-- conflict SELECT simultaneously before either commits.
-- ============================================================

CREATE OR REPLACE FUNCTION public.validar_reserva()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v_conflicts INTEGER;
BEGIN
  -- Serialize concurrent inserts scoped to equipamento+date.
  -- Lock is released automatically at end of transaction.
  PERFORM pg_advisory_xact_lock(
    hashtext(NEW.equipamento_id::text || '|' || NEW.data::text)
  );

  SELECT COUNT(*) INTO v_conflicts
  FROM public.reservas
  WHERE equipamento_id = NEW.equipamento_id
    AND data           = NEW.data
    AND status         = 'confirmada'
    AND deleted_at     IS NULL
    AND NEW.hora_inicio < hora_fim
    AND NEW.hora_fim   > hora_inicio
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid);

  IF v_conflicts > 0 THEN
    RAISE EXCEPTION 'Conflito de horário: equipamento já reservado nesse período'
      USING ERRCODE = 'exclusion_violation';
  END IF;

  RETURN NEW;
END;
$$;
