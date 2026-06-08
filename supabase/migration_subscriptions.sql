-- ─────────────────────────────────────────────────────────────────────────
-- Subscriptions, trials, promo codes & admin access
-- Run this once in the Supabase SQL editor (after the base schema.sql).
-- ─────────────────────────────────────────────────────────────────────────

-- 1. New columns on profiles ------------------------------------------------
alter table public.profiles
  add column if not exists is_admin           boolean not null default false,
  add column if not exists trial_ends_at      date,
  add column if not exists subscription_status text not null default 'trial',
    -- one of: 'trial' | 'active' | 'expired' | 'promo'
  add column if not exists paid_until         date,
  add column if not exists promo_code         text;

-- Give every existing user (and new ones via the trigger update below)
-- a 7-day trial starting from when this column is first populated.
update public.profiles
  set trial_ends_at = coalesce(trial_ends_at, (current_date + interval '7 days')::date)
where trial_ends_at is null;

-- 2. Promo codes table -------------------------------------------------------
create table if not exists public.promo_codes (
  code        text primary key,
  description text,
  days_free   integer not null default 60,
  max_uses    integer not null default 1,
  used_count  integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.promo_codes enable row level security;

-- Anyone signed in can read codes (needed to validate at signup)
create policy "promo_codes_select_all" on public.promo_codes
  for select using (true);

-- Seed the 10 Odyssey-themed codes (60 days free each)
insert into public.promo_codes (code, description, days_free, max_uses) values
  ('ITHACA60',     'Return home to 60 days free — Odysseus''s homeland',            60, 100),
  ('ATHENAGIFT',   'A gift from the goddess of wisdom',                              60, 100),
  ('TROJANHORSE',  'Sneak in 60 days of free access',                                60, 100),
  ('CYCLOPSEYE',   'One-eyed giant, double the studying',                            60, 100),
  ('SIRENSONG',    'An offer too good to resist',                                    60, 100),
  ('LOTUSEATER',   'Lose track of time — in a good way',                             60, 100),
  ('PENELOPEWEAVE','Patience rewarded with 60 free days',                            60, 100),
  ('OLYMPUSPASS',  'Your pass to the gods'' favor',                                   60, 100),
  ('ARGONAUT60',   'Set sail with 60 days free',                                     60, 100),
  ('ZEUSBOLT',     'A thunderous welcome — 60 days on us',                           60, 100)
on conflict (code) do nothing;

-- 3. Payments table -----------------------------------------------------------
create table if not exists public.payments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  amount      numeric not null default 250,
  currency    text not null default 'PHP',
  method      text not null default 'gcash',
  reference   text,                         -- GCash reference number the user provides
  status      text not null default 'pending', -- 'pending' | 'verified' | 'rejected'
  period_start date,
  period_end   date,
  created_at  timestamptz not null default now(),
  verified_at timestamptz
);

alter table public.payments enable row level security;

create policy "payments_select_own" on public.payments
  for select using (auth.uid() = user_id);

create policy "payments_insert_own" on public.payments
  for insert with check (auth.uid() = user_id);

-- Admins can see & manage everything (checked via profiles.is_admin)
create policy "payments_admin_all" on public.payments
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
  );

create policy "profiles_admin_select_all" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
  );

-- 4. Make yourself an admin ----------------------------------------------------
-- Replace the email below with your own account's email, then run:
--
--   update public.profiles set is_admin = true
--   where email = 'you@example.com';
