-- Diagnostic: test the RLS policy directly inside Postgres, bypassing the
-- API gateway entirely. This tells us whether the policy itself is broken,
-- or whether the problem is how the API resolves the "anon" role.

set role anon;
insert into inquiries (customer_name, phone) values ('SQL Editor RLS Test', '1234567890');
reset role;

-- Also print the exact policy definition (not just the summary columns) in
-- case something subtle (e.g. a bad character) crept into the check expression.
select tablename, policyname, cmd, qual, with_check
from pg_policies
where tablename = 'inquiries';
