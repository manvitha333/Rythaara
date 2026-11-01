/*
# Tighten grants on admin_users and products tables

## Why
The initial migration left default broad grants on `admin_users` (SELECT, INSERT, UPDATE, DELETE to both anon and authenticated). RLS policies already block unauthorized operations, but the grants violate least-privilege and could expose the table if a policy is accidentally dropped later.

## Changes
1. `admin_users` — revoke all privileges from `anon` and `authenticated`, then grant only SELECT to `authenticated` (needed for the admin self-membership check). No writes are ever performed through the Data API on this table; admin membership is managed by an operator in the Supabase dashboard.
2. `products` — revoke INSERT, UPDATE, DELETE from `anon`. The anon role only needs SELECT (public catalogue reads). Authenticated admins retain INSERT, UPDATE, DELETE (guarded by RLS admin policies).

## Security
- RLS remains enabled on both tables.
- No policies are changed.
- After this change, `anon` can only SELECT from `products`, and `authenticated` can SELECT from both tables plus write to `products` (admin only, via RLS).
*/

REVOKE ALL PRIVILEGES ON public.admin_users FROM anon, authenticated;
GRANT SELECT ON public.admin_users TO authenticated;

REVOKE INSERT, UPDATE, DELETE ON public.products FROM anon;
