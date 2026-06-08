// 10 Odyssey-themed promo codes — each grants 60 days of free access when
// entered at signup. The authoritative copy lives in the `promo_codes` table
// (see supabase/migration_subscriptions.sql); this list is kept in sync for
// quick client-side reference/display only.
export const PROMO_CODES = [
  { code: 'ITHACA60',      desc: "Return home to 60 days free — Odysseus's homeland" },
  { code: 'ATHENAGIFT',    desc: 'A gift from the goddess of wisdom' },
  { code: 'TROJANHORSE',   desc: 'Sneak in 60 days of free access' },
  { code: 'CYCLOPSEYE',    desc: 'One-eyed giant, double the studying' },
  { code: 'SIRENSONG',     desc: 'An offer too good to resist' },
  { code: 'LOTUSEATER',    desc: 'Lose track of time — in a good way' },
  { code: 'PENELOPEWEAVE', desc: 'Patience rewarded with 60 free days' },
  { code: 'OLYMPUSPASS',   desc: "Your pass to the gods' favor" },
  { code: 'ARGONAUT60',    desc: 'Set sail with 60 days free' },
  { code: 'ZEUSBOLT',      desc: 'A thunderous welcome — 60 days on us' },
]

export const FREE_DAYS_PER_CODE = 60
