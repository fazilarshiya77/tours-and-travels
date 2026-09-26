-- Fixes "row violates row-level security policy" errors that persist even
-- though the RLS policy itself looks correct. RLS policies are a SECOND gate —
-- Postgres also requires the anon/authenticated roles to have base table
-- privileges (GRANT) before RLS is even consulted. Run this in SQL Editor.

grant usage on schema public to anon, authenticated;

grant select, insert, update, delete on
  vehicles, services, tours, inquiries, website_content, admin_profile
to authenticated;

grant select on vehicles, services, tours, website_content to anon;
grant insert on inquiries to anon;

-- Confirm: should now show INSERT among anon's privileges on inquiries.
select grantee, table_name, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
order by table_name, grantee, privilege_type;
