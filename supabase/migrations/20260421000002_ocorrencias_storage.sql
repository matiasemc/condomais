-- ============================================================
-- Migration: Storage bucket for occurrence images
-- Public bucket; 5 MB limit; jpeg/png/webp/gif only.
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'ocorrencias',
  'ocorrencias',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Any authenticated user can upload
CREATE POLICY "ocorrencias_storage_insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'ocorrencias');

-- Public read
CREATE POLICY "ocorrencias_storage_select"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'ocorrencias');

-- Owner can delete their own files
CREATE POLICY "ocorrencias_storage_delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'ocorrencias' AND owner = auth.uid());
