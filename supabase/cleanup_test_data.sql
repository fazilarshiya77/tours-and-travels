-- Removes the junk test inquiries created during earlier debugging sessions
-- (RLS verification, post-restart checks, etc.) so they don't clutter the
-- real Inquiries dashboard or get mistaken for actual customer leads.
delete from inquiries
where customer_name ilike '%delete me%'
   or customer_name = 'SQL Editor RLS Test';
