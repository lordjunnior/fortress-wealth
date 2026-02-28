-- Create public storage bucket for audiobooks
INSERT INTO storage.buckets (id, name, public)
VALUES ('audiobooks', 'audiobooks', true);

-- Allow public read access
CREATE POLICY "Audiobooks are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'audiobooks');

-- Allow authenticated users to upload audiobooks
CREATE POLICY "Authenticated users can upload audiobooks"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'audiobooks' AND auth.role() = 'authenticated');
