-- Defense-in-depth: enforce file type and size limits at the Supabase Storage
-- bucket level, not just in the browser's JS (which a logged-in admin's
-- browser could be tricked or scripted into bypassing). Run once in SQL Editor.

update storage.buckets
set
  file_size_limit = 5242880, -- 5MB, matches the app's client-side check
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
where id = 'fleet-images';
