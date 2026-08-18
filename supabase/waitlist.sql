-- Run once in the Supabase SQL editor for your core project.
-- Table used by billionanimals.org waitlist (server-side insert only).

create table if not exists public.study_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text not null check (role in ('clinic', 'vet', 'owner', 'advocate')),
  source text not null default 'billionanimals.org',
  created_at timestamptz not null default now(),
  constraint study_waitlist_email_unique unique (email)
);

alter table public.study_waitlist enable row level security;

-- No anon/authenticated policies on purpose.
-- The site inserts with SUPABASE_SERVICE_ROLE_KEY on the server only.

comment on table public.study_waitlist is
  'Billion Animal Project enrollment waitlist from billionanimals.org';
