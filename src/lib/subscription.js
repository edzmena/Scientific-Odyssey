function localDateStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/**
 * Returns true if the user's profile has active access to premium features.
 * - null trial_ends_at → perpetual free (safety fallback / admin override)
 * - active subscription with valid paid_until → access
 * - trial or promo within date → access
 * - everything else → locked
 */
export function hasActiveAccess(profile) {
  if (!profile) return false
  const { subscription_status, trial_ends_at, paid_until } = profile
  const today = localDateStr()

  if (subscription_status === 'active') {
    return !paid_until || paid_until >= today
  }
  if (!trial_ends_at) return true // no date set = perpetual free
  if (subscription_status === 'trial' || subscription_status === 'promo') {
    return trial_ends_at >= today
  }
  return false
}
