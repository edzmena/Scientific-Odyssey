import { Link } from 'react-router-dom'
import useStore, { getXPProgress } from '@/store/useStore'

const CARDS = [
  { to: '/exams',     icon: '📝', title: 'Mock Exams',       desc: '40 PSHS-style questions across 4 subjects' },
  { to: '/interview', icon: '🎤', title: 'Mock Interview',   desc: 'AI feedback on your interview answers' },
  { to: '/study',     icon: '📚', title: 'Study Techniques', desc: 'Pomodoro, active recall, mind mapping & more' },
  { to: '/prep',      icon: '🗓️', title: 'Exam Prep Plan',   desc: 'Personalised checklist for exam day' },
  { to: '/scibot',    icon: '🤖', title: 'PotPot AI Tutor',  desc: 'Ask anything — powered by Claude AI' },
  { to: '/progress',  icon: '📊', title: 'Progress Tracker', desc: 'XP, streaks, and score history charts' },
]

export default function Dashboard() {
  const { user, profile, examAttempts } = useStore()
  const name = profile?.full_name || user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Explorer')
  const firstName = name.split(' ')[0]
  const xpData = profile ? getXPProgress(profile.xp ?? 0) : null

  const totalExams = examAttempts.length
  const avgScore = totalExams
    ? Math.round(examAttempts.reduce((sum, a) => sum + (a.score / a.total) * 100, 0) / totalExams)
    : null

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero greeting */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-500 rounded-2xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-1">Welcome back, {firstName}! 👋</h1>
        <p className="text-indigo-100 text-sm">
          Keep up the momentum — every study session brings you closer to your dream school.
        </p>
        {xpData && (
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="text-xs text-indigo-200 mb-1">Level {xpData.level} · {xpData.levelName}</p>
              <div className="w-48 bg-indigo-700/50 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${xpData.progress}%` }}
                />
              </div>
              <p className="text-xs text-indigo-200 mt-1">{xpData.xp} / {xpData.next} XP</p>
            </div>
            {profile?.streak > 0 && (
              <div className="text-center">
                <p className="text-2xl font-bold">🔥 {profile.streak}</p>
                <p className="text-xs text-indigo-200">day streak</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick stats */}
      {totalExams > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="card text-center">
            <p className="text-2xl font-bold text-brand-600">{totalExams}</p>
            <p className="text-xs text-gray-500 mt-1">Exams taken</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-emerald-600">{avgScore}%</p>
            <p className="text-xs text-gray-500 mt-1">Average score</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-amber-500">{profile?.xp ?? 0}</p>
            <p className="text-xs text-gray-500 mt-1">Total XP</p>
          </div>
        </div>
      )}

      {/* Feature cards */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">What would you like to do?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map(({ to, icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="card hover:shadow-md hover:border-brand-200 transition-all group"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Motivational tip */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
        <span className="text-xl">💡</span>
        <div>
          <p className="text-sm font-semibold text-amber-800">Study Tip of the Day</p>
          <p className="text-sm text-amber-700 mt-0.5">
            Use the <strong>Feynman Technique</strong>: pick one science concept today and explain it out loud
            in simple words as if teaching a classmate. If you get stuck, that's exactly where to study next!
          </p>
        </div>
      </div>
    </div>
  )
}
