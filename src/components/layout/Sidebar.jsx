import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import useStore, { getXPProgress } from '@/store/useStore'

const NAV = [
  { to: '/',               label: 'Dashboard',       icon: '🏠' },
  { to: '/exams',          label: 'Mock Exams',       icon: '📝' },
  { to: '/interview',      label: 'Mock Interview',   icon: '🎤' },
  { to: '/study',          label: 'Study Techniques', icon: '📚' },
  { to: '/prep',           label: 'Exam Prep Plan',   icon: '🗓️' },
  { to: '/scibot',         label: 'SciBot AI Tutor',  icon: '🤖' },
  { to: '/progress',       label: 'Progress Tracker', icon: '📊' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { user, profile } = useStore()
  const xpData = profile ? getXPProgress(profile.xp ?? 0) : null

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white text-lg">
          {/* Atom SVG */}
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">Scientific</p>
          <p className="text-xs font-semibold text-brand-600 leading-tight">Odyssey</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* XP / level bar */}
      {xpData && (
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-brand-700">Lv {xpData.level} · {xpData.levelName}</span>
            {profile?.streak > 0 && (
              <span className="text-xs text-orange-500 font-semibold">🔥 {profile.streak}d</span>
            )}
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
            <div
              className="bg-brand-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${xpData.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">{xpData.xp} / {xpData.next} XP</p>
        </div>
      )}

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <span>🚪</span> Log out
        </button>
      </div>
    </aside>
  )
}
