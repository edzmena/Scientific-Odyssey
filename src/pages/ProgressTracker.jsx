import useStore, { getXPProgress, LEVEL_THRESHOLDS } from '@/store/useStore'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import { format, parseISO } from 'date-fns'

const SUBJECT_COLORS = {
  Biology: '#10b981',
  Chemistry: '#3b82f6',
  Physics: '#f59e0b',
  'Earth Science': '#8b5cf6',
  'Full Exam': '#6366f1',
}

export default function ProgressTracker() {
  const { profile, examAttempts, interviewSessions } = useStore()
  const xpData = profile ? getXPProgress(profile.xp ?? 0) : null

  // Score history by date
  const scoreHistory = examAttempts
    .slice(0, 20)
    .reverse()
    .map((a, i) => ({
      name: format(parseISO(a.created_at), 'MMM d'),
      score: Math.round((a.score / a.total) * 100),
      subject: a.subject,
    }))

  // Average per subject
  const subjectMap = {}
  examAttempts.forEach((a) => {
    if (!subjectMap[a.subject]) subjectMap[a.subject] = { total: 0, count: 0 }
    subjectMap[a.subject].total += Math.round((a.score / a.total) * 100)
    subjectMap[a.subject].count++
  })
  const subjectData = Object.entries(subjectMap).map(([subject, { total, count }]) => ({
    subject: subject.replace('Earth Science', 'Earth Sci').replace('Full Exam', 'Full'),
    avg: Math.round(total / count),
  }))

  // Radar data for science balance
  const radarData = ['Biology', 'Chemistry', 'Physics', 'Earth Science'].map((s) => {
    const attempts = examAttempts.filter((a) => a.subject === s || a.subject === 'Full Exam')
    const avg = attempts.length
      ? Math.round(attempts.reduce((sum, a) => sum + (a.score / a.total) * 100, 0) / attempts.length)
      : 0
    return { subject: s.replace('Earth Science', 'Earth Sci'), avg }
  })

  const totalExams = examAttempts.length
  const totalInterviews = interviewSessions.length
  const bestScore = totalExams
    ? Math.max(...examAttempts.map((a) => Math.round((a.score / a.total) * 100)))
    : null
  const avgInterviewScore = totalInterviews
    ? Math.round(interviewSessions.reduce((sum, s) => sum + (s.score ?? 0), 0) / totalInterviews * 10) / 10
    : null

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📊 Progress Tracker</h1>
        <p className="text-gray-500 text-sm mt-1">Your learning journey at a glance.</p>
      </div>

      {/* XP & Level */}
      {xpData && (
        <div className="card">
          <h2 className="font-bold text-gray-900 mb-4">⭐ XP & Level</h2>
          <div className="flex items-center gap-6">
            <div className="shrink-0 w-20 h-20 rounded-2xl bg-brand-600 text-white flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{xpData.level}</span>
              <span className="text-xs">Level</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{xpData.levelName}</p>
              <div className="w-full bg-gray-100 rounded-full h-3 mt-2 mb-1">
                <div
                  className="bg-brand-600 h-3 rounded-full transition-all"
                  style={{ width: `${xpData.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{xpData.xp} / {xpData.next} XP · {xpData.progress}% to next level</p>
            </div>
          </div>
          {/* Level progress bar */}
          <div className="mt-4 flex gap-1">
            {LEVEL_THRESHOLDS.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full ${i <= xpData.level ? 'bg-brand-500' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Lv 0</span>
            <span>Lv {LEVEL_THRESHOLDS.length - 1}</span>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-2xl font-bold text-brand-600">{totalExams}</p>
          <p className="text-xs text-gray-500 mt-1">Exams taken</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-emerald-600">{bestScore ?? '—'}%</p>
          <p className="text-xs text-gray-500 mt-1">Best score</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-amber-500">{totalInterviews}</p>
          <p className="text-xs text-gray-500 mt-1">Interview sessions</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-purple-600">{avgInterviewScore ?? '—'}/10</p>
          <p className="text-xs text-gray-500 mt-1">Avg interview score</p>
        </div>
      </div>

      {totalExams === 0 ? (
        <div className="card text-center py-12">
          <p className="text-4xl mb-3">📝</p>
          <p className="font-semibold text-gray-700">No exam data yet</p>
          <p className="text-sm text-gray-400 mt-1">Take a mock exam to see your charts here!</p>
        </div>
      ) : (
        <>
          {/* Score history line chart */}
          <div className="card">
            <h2 className="font-bold text-gray-900 mb-4">📈 Score History</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                <Tooltip formatter={(v) => [`${v}%`, 'Score']} />
                <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Subject averages bar chart */}
          {subjectData.length > 0 && (
            <div className="card">
              <h2 className="font-bold text-gray-900 mb-4">📊 Average Score by Subject</h2>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={subjectData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip formatter={(v) => [`${v}%`, 'Average']} />
                  <Bar dataKey="avg" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Radar — science balance */}
          <div className="card">
            <h2 className="font-bold text-gray-900 mb-4">🕸 Science Balance Radar</h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Avg %" dataKey="avg" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                <Tooltip formatter={(v) => [`${v}%`, 'Average']} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent attempts */}
          <div className="card">
            <h2 className="font-bold text-gray-900 mb-4">🕒 Recent Exam Attempts</h2>
            <div className="space-y-2">
              {examAttempts.slice(0, 10).map((a) => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{a.subject}</p>
                    <p className="text-xs text-gray-400">{format(parseISO(a.created_at), 'MMM d, yyyy · h:mm a')}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${
                      (a.score / a.total) >= 0.8 ? 'text-emerald-600' :
                      (a.score / a.total) >= 0.6 ? 'text-amber-600' : 'text-red-500'
                    }`}>
                      {Math.round((a.score / a.total) * 100)}%
                    </span>
                    <p className="text-xs text-gray-400">{a.score}/{a.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
