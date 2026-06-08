import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import logo from '@/assets/logo.png'

// Landing page for the link sent by `supabase.auth.resetPasswordForEmail`.
// Supabase signs the user into a temporary recovery session automatically
// when they click the emailed link, so we just need to collect & set a new password.
export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (password !== confirm) { setError("Passwords don't match."); return }

    setLoading(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (err) { setError(err.message); return }
    setDone(true)
    setTimeout(() => navigate('/'), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl overflow-hidden mb-4 shadow-lg ring-1 ring-gray-100 bg-white">
            <img src={logo} alt="Scientific Odyssey logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Set a New Password</h1>
          <p className="text-sm text-gray-500 mt-1">Choose a fresh password for your account.</p>
        </div>

        <div className="card">
          {done ? (
            <div className="text-center py-4 space-y-2">
              <div className="text-4xl">✅</div>
              <p className="text-gray-800 font-semibold">Password updated!</p>
              <p className="text-sm text-gray-500">Taking you to your dashboard…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'} required minLength={6}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input pr-10"
                  />
                  <button type="button" onClick={() => setShow(s => !s)} tabIndex={-1}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 text-sm">
                    {show ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type={show ? 'text' : 'password'} required minLength={6}
                  value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="input"
                />
              </div>
              {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg p-2">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
