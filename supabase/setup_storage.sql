-- Creates a public storage bucket for vehicle/service/tour photos uploaded
-- from the admin panel, and the access policies for it. Run once in SQL Editor.

insert into storage.buckets (id, name, public)
values ('fleet-images', 'fleet-images', true)
on conflict (id) do nothing;

-- Anyone can view images (needed so the public website can display them)
create policy "public read fleet images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'fleet-images');

-- Only logged-in admins can upload/replace/delete
create policy "admin upload fleet images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'fleet-images');

create policy "admin update fleet images"
on storage.objects for update
to authenticated
using (bucket_id = 'fleet-images')
with check (bucket_id = 'fleet-images');

create policy "admin delete fleet images"
on storage.objects for delete
to authenticated
using (bucket_id = 'fleet-images');
