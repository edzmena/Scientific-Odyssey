import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import useStore from '@/store/useStore'

const MONTHLY_PRICE = 250
const GCASH_NUMBER = '0966-774-3444'   // TODO: replace with your real GCash number
const GCASH_NAME = 'Edilyn Mena'    // TODO: replace with the GCash account name

function localDateStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function daysLeft(dateStr) {
  if (!dateStr) return 0
  const [ty, tm, td] = dateStr.split('-').map(Number)
  const [ny, nm, nd] = localDateStr().split('-').map(Number)
  const diff = new Date(ty, tm - 1, td) - new Date(ny, nm - 1, nd)
  return Math.round(diff / 86400000)
}

export default function Subscription() {
  const { profile, user } = useStore()
  const [reference, setReference] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const status = profile?.subscription_status ?? 'trial'
  const trialEnds = profile?.trial_ends_at
  const paidUntil = profile?.paid_until
  const remaining = status === 'active' ? daysLeft(paidUntil) : daysLeft(trialEnds)
  const isPromo = status === 'promo'
  const expired = remaining <= 0 && status !== 'active'

  async function submitPayment(e) {
    e.preventDefault()
    setError('')
    if (!reference.trim()) { setError('Please enter your GCash reference number.'); return }

    setSubmitting(true)
    const today = new Date()
    const periodEnd = new Date(today); periodEnd.setDate(periodEnd.getDate() + 30)
    const { error: err } = await supabase.from('payments').insert({
      user_id: user.id,
      amount: MONTHLY_PRICE,
      currency: 'PHP',
      method: 'gcash',
      reference: reference.trim(),
      status: 'pending',
      period_start: today.toISOString().split('T')[0],
      period_end: periodEnd.toISOString().split('T')[0],
    })
    setSubmitting(false)
    if (err) { setError(err.message); return }
    setSubmitted(true)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your Scientific Odyssey access.</p>
      </div>

      {/* Status card */}
      <div className={`card border ${expired ? 'bg-red-50 border-red-200' : isPromo ? 'bg-purple-50 border-purple-200' : 'bg-brand-50 border-brand-200'}`}>
        {status === 'active' && (
          <>
            <p className="text-sm font-semibold text-emerald-700">✅ Active subscription</p>
            <p className="text-gray-700 mt-1">Your plan is active until <strong>{paidUntil}</strong> ({remaining} day{remaining === 1 ? '' : 's'} left).</p>
          </>
        )}
        {status === 'promo' && (
          <>
            <p className="text-sm font-semibold text-purple-700">🎁 Promo access — code "{profile?.promo_code}"</p>
            <p className="text-gray-700 mt-1">
              {expired
                ? 'Your free promo period has ended. Subscribe below to keep your odyssey going!'
                : <>You have <strong>{remaining} day{remaining === 1 ? '' : 's'}</strong> of free access remaining (until {trialEnds}).</>
              }
            </p>
          </>
        )}
        {status === 'trial' && (
          <>
            <p className="text-sm font-semibold text-brand-700">🧪 Free trial</p>
            <p className="text-gray-700 mt-1">
              {expired
                ? 'Your 7-day free trial has ended. Subscribe below to continue your journey!'
                : <>You have <strong>{remaining} day{remaining === 1 ? '' : 's'}</strong> left in your free trial (until {trialEnds}).</>
              }
            </p>
          </>
        )}
        {status === 'expired' && (
          <>
            <p className="text-sm font-semibold text-red-700">⏳ Access expired</p>
            <p className="text-gray-700 mt-1">Subscribe below to regain full access to Scientific Odyssey.</p>
          </>
        )}
      </div>

      {/* Plan details */}
      <div className="card">
        <h2 className="font-bold text-gray-900 mb-2">Monthly Plan</h2>
        <p className="text-3xl font-bold text-gray-900">₱{MONTHLY_PRICE}<span className="text-base font-normal text-gray-400">/month</span></p>
        <ul className="text-sm text-gray-600 mt-3 space-y-1.5 list-disc list-inside">
          <li>Unlimited Mock Exams across all subjects</li>
          <li>Mock Interview practice with AI feedback</li>
          <li>Full access to Scientific Odyssey (all modes & islands)</li>
          <li>PotPot AI Tutor — ask anything, anytime</li>
          <li>Progress tracking, streak badges, and more</li>
        </ul>
      </div>

      {/* GCash payment instructions */}
      <div className="card bg-blue-50 border border-blue-200">
        <h2 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-xl">💙</span> Pay via GCash
        </h2>
        <ol className="text-sm text-gray-700 space-y-1.5 list-decimal list-inside">
          <li>Open your GCash app and send <strong>₱{MONTHLY_PRICE}</strong> to:</li>
        </ol>
        <div className="bg-white rounded-xl border border-blue-100 p-3 my-2">
          <p className="text-sm text-gray-500">GCash Number</p>
          <p className="font-mono font-bold text-gray-900 text-lg">{GCASH_NUMBER}</p>
          <p className="text-sm text-gray-500 mt-1">Account Name</p>
          <p className="font-semibold text-gray-900">{GCASH_NAME}</p>
        </div>
        <ol start="2" className="text-sm text-gray-700 space-y-1.5 list-decimal list-inside">
          <li>Copy the <strong>reference number</strong> from your GCash receipt.</li>
          <li>Paste it below and submit — we'll verify and activate your subscription within 24 hours.</li>
        </ol>

        {submitted ? (
          <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-700">
            ✅ Payment submitted! We'll verify your GCash reference and activate your subscription soon.
          </div>
        ) : (
          <form onSubmit={submitPayment} className="mt-4 space-y-2">
            <input
              type="text" value={reference} onChange={(e) => setReference(e.target.value)}
              placeholder="GCash reference number (e.g. 1234 5678 9012)"
              className="input"
            />
            {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg p-2">{error}</p>}
            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-2.5">
              {submitting ? 'Submitting…' : `I've Paid ₱${MONTHLY_PRICE} — Submit Reference`}
            </button>
          </form>
        )}
        <p className="text-xs text-gray-400 mt-3">
          Note: payments are verified manually for now. Once confirmed by an admin, your subscription
          will be activated for 30 days from your payment date.
        </p>
      </div>
    </div>
  )
}
