import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import useStore from '@/store/useStore'

function StatusPill({ status }) {
  const styles = {
    active: 'bg-emerald-100 text-emerald-700',
    trial: 'bg-brand-100 text-brand-700',
    promo: 'bg-purple-100 text-purple-700',
    expired: 'bg-red-100 text-red-700',
  }
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles[status] ?? 'bg-gray-100 text-gray-600'}`}>{status}</span>
}

export default function AdminDashboard() {
  const { profile } = useStore()
  const [users, setUsers] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('users') // 'users' | 'payments'
  const [busyId, setBusyId] = useState(null)

  useEffect(() => {
    if (!profile?.is_admin) return
    loadAll()
  }, [profile?.is_admin])

  async function loadAll() {
    setLoading(true)
    const [{ data: u }, { data: p }] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('payments').select('*, profiles(full_name, email)').order('created_at', { ascending: false }),
    ])
    setUsers(u ?? [])
    setPayments(p ?? [])
    setLoading(false)
  }

  async function verifyPayment(payment, approve) {
    setBusyId(payment.id)
    const status = approve ? 'verified' : 'rejected'
    await supabase.from('payments').update({ status, verified_at: new Date().toISOString() }).eq('id', payment.id)

    if (approve) {
      // Extend the user's paid-until date and mark them active
      const base = new Date()
      const paidUntil = new Date(base); paidUntil.setDate(paidUntil.getDate() + 30)
      await supabase.from('profiles').update({
        subscription_status: 'active',
        paid_until: paidUntil.toISOString().split('T')[0],
      }).eq('id', payment.user_id)
    }
    await loadAll()
    setBusyId(null)
  }

  if (!profile) return <div className="text-gray-400 text-sm">Loading…</div>
  if (!profile.is_admin) return <Navigate to="/" replace />

  const trialCount = users.filter(u => u.subscription_status === 'trial').length
  const promoCount = users.filter(u => u.subscription_status === 'promo').length
  const activeCount = users.filter(u => u.subscription_status === 'active').length
  const pendingPayments = payments.filter(p => p.status === 'pending')

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">⚙️ Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Backend overview — users, subscriptions & payments.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card text-center">
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total users</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
          <p className="text-xs text-gray-500 mt-1">Active subs</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-brand-600">{trialCount}</p>
          <p className="text-xs text-gray-500 mt-1">On free trial</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-purple-600">{promoCount}</p>
          <p className="text-xs text-gray-500 mt-1">Promo users</p>
        </div>
      </div>

      {pendingPayments.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
          🔔 <strong>{pendingPayments.length}</strong> payment{pendingPayments.length === 1 ? '' : 's'} awaiting verification.
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 max-w-xs">
        {['users', 'payments'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${tab === t ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>
            {t === 'payments' && pendingPayments.length > 0 ? `Payments (${pendingPayments.length})` : t}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading data…</p>
      ) : tab === 'users' ? (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Email</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Trial / Promo Ends</th>
                <th className="py-2 pr-4 font-medium">Paid Until</th>
                <th className="py-2 pr-4 font-medium">Promo Code</th>
                <th className="py-2 font-medium">Streak</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 pr-4 font-medium text-gray-900 whitespace-nowrap">{u.full_name || '—'}{u.is_admin && <span className="ml-1.5 text-[10px] bg-gray-900 text-white px-1.5 py-0.5 rounded-full">ADMIN</span>}</td>
                  <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">{u.email}</td>
                  <td className="py-2 pr-4"><StatusPill status={u.subscription_status} /></td>
                  <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">{u.trial_ends_at ?? '—'}</td>
                  <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">{u.paid_until ?? '—'}</td>
                  <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">{u.promo_code ?? '—'}</td>
                  <td className="py-2 text-gray-500">🔥 {u.streak ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="text-center text-gray-400 text-sm py-6">No users yet.</p>}
        </div>
      ) : (
        <div className="space-y-3">
          {payments.length === 0 && <p className="text-center text-gray-400 text-sm py-6">No payments submitted yet.</p>}
          {payments.map(p => (
            <div key={p.id} className="card flex flex-wrap items-center gap-3 justify-between">
              <div>
                <p className="font-semibold text-gray-900">{p.profiles?.full_name ?? 'Unknown user'} <span className="text-gray-400 font-normal text-sm">· {p.profiles?.email}</span></p>
                <p className="text-sm text-gray-500 mt-0.5">₱{p.amount} via {p.method.toUpperCase()} · ref: <span className="font-mono">{p.reference}</span></p>
                <p className="text-xs text-gray-400 mt-0.5">Submitted {new Date(p.created_at).toLocaleString()} {p.period_start && `· covers ${p.period_start} → ${p.period_end}`}</p>
              </div>
              <div className="flex items-center gap-2">
                {p.status === 'pending' ? (
                  <>
                    <button onClick={() => verifyPayment(p, true)} disabled={busyId === p.id}
                      className="btn-primary py-1.5 px-3 text-sm bg-emerald-600 hover:bg-emerald-700 border-emerald-600">
                      ✓ Verify
                    </button>
                    <button onClick={() => verifyPayment(p, false)} disabled={busyId === p.id}
                      className="btn-outline py-1.5 px-3 text-sm border-red-200 text-red-600 hover:bg-red-50">
                      ✕ Reject
                    </button>
                  </>
                ) : (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {p.status === 'verified' ? '✓ Verified' : '✕ Rejected'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
