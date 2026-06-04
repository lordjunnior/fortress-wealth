
-- 1) Leads: explicit restrictive deny for SELECT/UPDATE/DELETE to anon/authenticated
REVOKE SELECT, UPDATE, DELETE ON public.leads FROM anon, authenticated;

CREATE POLICY "Deny select to public roles"
ON public.leads AS RESTRICTIVE
FOR SELECT TO anon, authenticated
USING (false);

CREATE POLICY "Deny update to public roles"
ON public.leads AS RESTRICTIVE
FOR UPDATE TO anon, authenticated
USING (false) WITH CHECK (false);

CREATE POLICY "Deny delete to public roles"
ON public.leads AS RESTRICTIVE
FOR DELETE TO anon, authenticated
USING (false);

-- 2) Storage: remove broad public listing of audiobooks bucket
DROP POLICY IF EXISTS "Audiobooks are publicly accessible" ON storage.objects;

-- Files in a public bucket remain accessible via their public CDN URL,
-- but listing the bucket via the API is no longer allowed.

-- 3) Block update/delete on audiobooks objects by regular users
CREATE POLICY "Block audiobook updates"
ON storage.objects AS RESTRICTIVE
FOR UPDATE TO anon, authenticated
USING (bucket_id <> 'audiobooks')
WITH CHECK (bucket_id <> 'audiobooks');

CREATE POLICY "Block audiobook deletes"
ON storage.objects AS RESTRICTIVE
FOR DELETE TO anon, authenticated
USING (bucket_id <> 'audiobooks');
