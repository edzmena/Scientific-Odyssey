import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import logo from '@/assets/logo.png'
import { PROMO_CODES, FREE_DAYS_PER_CODE } from '@/data/promoCodes'

const TRIAL_DAYS = 7

function addDays(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export default function Auth() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [name, setName] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccessMsg(''); setLoading(true)

    if (mode === 'forgot') {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (err) { setError(err.message); setLoading(false); return }
      setSuccessMsg("Password reset link sent! Check your email's inbox (and spam folder).")
      setLoading(false)
      return
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please re-enter to confirm.')
        setLoading(false)
        return
      }

      // Validate promo code (optional) before creating the account
      let appliedCode = null
      const trimmedCode = promoCode.trim().toUpperCase()
      if (trimmedCode) {
        const known = PROMO_CODES.find(c => c.code === trimmedCode)
        if (!known) {
          setError(`"${trimmedCode}" isn't a recognized promo code. Leave it blank to continue without one.`)
          setLoading(false)
          return
        }
        appliedCode = trimmedCode
      }

      const { data, error: err } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: name } },
      })
      if (err) { setError(err.message); setLoading(false); return }

      // Create profile row — apply promo code (60 days free) or standard 7-day trial
      if (data.user) {
        const trialEnds = appliedCode ? addDays(FREE_DAYS_PER_CODE) : addDays(TRIAL_DAYS)
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: name,
          email,
          xp: 0,
          streak: 0,
          last_active: new Date().toISOString().split('T')[0],
          trial_ends_at: trialEnds,
          subscription_status: appliedCode ? 'promo' : 'trial',
          promo_code: appliedCode,
        })
      }

      setSuccessMsg(
        appliedCode
          ? `Account created with code "${appliedCode}" applied — enjoy ${FREE_DAYS_PER_CODE} days free! Check your email to confirm, then log in.`
          : `Account created! You get a ${TRIAL_DAYS}-day free trial. Check your email to confirm, then log in.`
      )
      setMode('login')
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) { setError(err.message); setLoading(false); return }
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl overflow-hidden mb-4 shadow-lg ring-1 ring-gray-100 bg-white">
            <img src={logo} alt="Scientific Odyssey logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Scientific Odyssey</h1>
          <p className="text-sm text-gray-500 mt-1">Grade 7 Science High School Prep</p>
        </div>

        <div className="card">
          {mode !== 'forgot' && (
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              {['login', 'signup'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => { setMode(m); setError(''); setSuccessMsg('') }}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                    mode === m ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {m === 'login' ? 'Log In' : 'Sign Up'}
                </button>
              ))}
            </div>
          )}

          {mode === 'forgot' && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">Reset your password</h2>
              <p className="text-sm text-gray-500 mt-1">Enter your account email and we'll send you a reset link.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Juan dela Cruz"
                  className="input"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="input"
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} required minLength={6}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 text-sm"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(''); setSuccessMsg('') }}
                    className="text-xs text-brand-600 hover:text-brand-700 font-medium mt-1.5"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'} required minLength={6}
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`input pr-10 ${confirmPassword && confirmPassword !== password ? 'border-red-300 focus:ring-red-200' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 text-sm"
                    tabIndex={-1}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? '🙈' : '👁️'}
                  </button>
                </div>
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-xs text-red-500 mt-1">Passwords don't match yet.</p>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Promo Code <span className="text-gray-400 font-normal">(optional — get {FREE_DAYS_PER_CODE} days free)</span>
                </label>
                <input
                  type="text" value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ITHACA60"
                  className="input uppercase tracking-wide"
                />
              </div>
            )}

            {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg p-2">{error}</p>}
            {successMsg && <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg p-2">{successMsg}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
              {loading
                ? 'Please wait…'
                : mode === 'login' ? 'Log In'
                : mode === 'forgot' ? 'Send Reset Link'
                : 'Create Account'}
            </button>

            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccessMsg('') }}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to log in
              </button>
            )}
          </form>

          {mode === 'signup' && (
            <p className="text-center text-xs text-gray-400 mt-4">
              New accounts start with a {TRIAL_DAYS}-day free trial, then ₱250/month.
            </p>
          )}
          <p className="text-center text-xs text-gray-400 mt-1">
            Preparing Filipino Grade 6 students for PSHS · Manila Science · QCSHS · DOST-SEI
          </p>
        </div>
      </div>
    </div>
  )
}
