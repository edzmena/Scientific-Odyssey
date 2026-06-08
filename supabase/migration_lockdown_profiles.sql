-- ─────────────────────────────────────────────────────────────────────────
-- Lock down sensitive profile columns so regular users can't grant
-- themselves admin access or free subscriptions via the client SDK.
-- Run this once in the Supabase SQL editor.
-- ─────────────────────────────────────────────────────────────────────────

create or replace function public.protect_sensitive_profile_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' then
    -- If the person making the change is not an admin, force these
    -- columns to keep their previous (database-controlled) values —
    -- no matter what the client tried to send.
    if not coalesce((select is_admin from public.profiles where id = auth.uid()), false) then
      new.is_admin            := old.is_admin;
      new.subscription_status := old.subscription_status;
      new.trial_ends_at       := old.trial_ends_at;
      new.paid_until          := old.paid_until;
      new.promo_code          := old.promo_code;
    end if;
  elsif tg_op = 'INSERT' then
    -- A user inserting/upserting their own profile row at signup can never
    -- set themselves as admin or grant themselves a paid/active status —
    -- those are always assigned server-side (trigger / admin / verified payment).
    if not coalesce((select is_admin from public.profiles where id = auth.uid()), false) then
      new.is_admin := false;
      if new.subscription_status not in ('trial', 'promo') then
        new.subscription_status := 'trial';
      end if;
      new.paid_until := null;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_sensitive_profile_columns_trigger on public.profiles;
create trigger protect_sensitive_profile_columns_trigger
  before insert or update on public.profiles
  for each row execute procedure public.protect_sensitive_profile_columns();
