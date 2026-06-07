-- Scientific Odyssey — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. PROFILES
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  email         text,
  xp            integer not null default 0,
  streak        integer not null default 0,
  last_active   date,
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. EXAM ATTEMPTS
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.exam_attempts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  subject     text not null,          -- 'Biology' | 'Chemistry' | 'Physics' | 'Earth Science' | 'Full Exam'
  score       integer not null,
  total       integer not null,
  xp_earned   integer not null default 0,
  answers     jsonb,                  -- { "0": "A", "1": "C", ... }
  created_at  timestamptz not null default now()
);

create index if not exists exam_attempts_user_id_idx on public.exam_attempts(user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. INTERVIEW SESSIONS
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.interview_sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  question_id  text,
  question     text not null,
  answer       text,
  feedback     text,                  -- raw JSON string from Claude
  score        integer,               -- 1–10
  xp_earned    integer not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists interview_sessions_user_id_idx on public.interview_sessions(user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.profiles         enable row level security;
alter table public.exam_attempts    enable row level security;
alter table public.interview_sessions enable row level security;

-- Profiles: users can read/update their own profile
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Exam attempts: users can CRUD their own rows
create policy "exam_attempts_select_own" on public.exam_attempts
  for select using (auth.uid() = user_id);

create policy "exam_attempts_insert_own" on public.exam_attempts
  for insert with check (auth.uid() = user_id);

-- Interview sessions: users can CRUD their own rows
create policy "interview_sessions_select_own" on public.interview_sessions
  for select using (auth.uid() = user_id);

create policy "interview_sessions_insert_own" on public.interview_sessions
  for insert with check (auth.uid() = user_id);
