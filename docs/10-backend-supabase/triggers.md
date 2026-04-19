# Database Triggers

```sql
-- Auto-populate delivery notifications
CREATE OR REPLACE FUNCTION notify_new_entrega()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notificacoes (user_id, tipo, titulo, dados)
  SELECT u.id, 'entrega', 'Nova entrega', json_build_object('entrega_id', NEW.id)
  FROM usuarios u
  WHERE u.unidade_id = NEW.unidade_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_entrega
  AFTER INSERT ON entregas
  FOR EACH ROW EXECUTE FUNCTION notify_new_entrega();
```