-- Run this in Supabase SQL Editor to fix "Confirm Booking" not saving inquiries.
-- Safe to run even if the policy already exists.

drop policy if exists "public insert inquiries" on inquiries;
create policy "public insert inquiries" on inquiries for insert to anon, authenticated with check (true);

-- Diagnostic: list every policy currently active on every table, so we can
-- confirm this worked and spot if anything else is missing.
select schemaname, tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
order by tablename, policyname;
