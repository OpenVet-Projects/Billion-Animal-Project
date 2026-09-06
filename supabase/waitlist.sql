-- Run once in the Supabase SQL editor for your core project.
-- Table used by the billionanimals.org "Be part of it" form (server-side insert only).

create table if not exists public.study_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null default '',
  role text not null,
  contribution text not null default '',
  source text not null default 'billionanimals.org',
  created_at timestamptz not null default now(),
  constraint study_waitlist_email_unique unique (email)
);

-- Migration for an existing table created before the form gained
-- name / contribution and the wider role list.
alter table public.study_waitlist
  add column if not exists name text not null default '',
  add column if not exists contribution text not null default '';

alter table public.study_waitlist
  drop constraint if exists study_waitlist_role_check;

-- Existing rows used the retired 'advocate' role; the new check would reject them.
update public.study_waitlist set role = 'other' where role = 'advocate';

alter table public.study_waitlist
  add constraint study_waitlist_role_check
  check (role in ('clinic', 'vet', 'owner', 'researcher', 'organization', 'other'));

alter table public.study_waitlist enable row level security;

-- No anon/authenticated policies on purpose.
-- The site inserts with SUPABASE_SERVICE_ROLE_KEY on the server only.

comment on table public.study_waitlist is
  'Billion Animals expressions of interest from billionanimals.org';
