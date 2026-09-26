-- PostgREST caches roles, grants, and RLS policies in memory and only reloads
-- on certain triggers. Since the policy checks out fine directly in Postgres,
-- the REST API is very likely still serving a stale cache from before all
-- the fixes above. This forces an immediate reload.
notify pgrst, 'reload schema';
notify pgrst, 'reload config';
