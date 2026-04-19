# Storage Buckets

```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES 
  ('entregas-fotos', 'entregas-fotos', true, 10485760),
  ('classificados-fotos', 'classificados-fotos', true, 5242880),
  ('moradores-fotos', 'moradores-fotos', true, 2097152);

-- RLS for storage
CREATE POLICY "Public read uploads"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('entregas-fotos', 'classificados-fotos'));
```