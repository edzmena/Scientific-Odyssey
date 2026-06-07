import { useEffect, useRef, useState } from 'react'

const MODES = [
  { label: 'Focus',       minutes: 25, color: 'bg-brand-600' },
  { label: 'Short Break', minutes: 5,  color: 'bg-emerald-500' },
  { label: 'Long Break',  minutes: 15, color: 'bg-amber-500' },
]

export default function PomodoroTimer() {
  const [modeIdx, setModeIdx] = useState(0)
  const [seconds, setSeconds] = useState(MODES[0].minutes * 60)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef(null)

  const mode = MODES[modeIdx]
  const pct = (seconds / (mode.minutes * 60)) * 100

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            if (modeIdx === 0) setSessions((n) => n + 1)
            // Auto-advance to break after focus
            const next = modeIdx === 0 ? (sessions > 0 && (sessions + 1) % 4 === 0 ? 2 : 1) : 0
            setModeIdx(next)
            setSeconds(MODES[next].minutes * 60)
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  function switchMode(idx) {
    setRunning(false)
    setModeIdx(idx)
    setSeconds(MODES[idx].minutes * 60)
  }

  function reset() {
    setRunning(false)
    setSeconds(mode.minutes * 60)
  }

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  // SVG circle progress
  const r = 54
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <div className="card flex flex-col items-center gap-4 max-w-xs mx-auto">
      {/* Mode selector */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-full">
        {MODES.map((m, i) => (
          <button
            key={m.label}
            onClick={() => switchMode(i)}
            className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
              i === modeIdx ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* SVG ring */}
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke={modeIdx === 0 ? '#4f46e5' : modeIdx === 1 ? '#10b981' : '#f59e0b'}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 70 70)"
          className="transition-all duration-1000"
        />
        <text x="70" y="65" textAnchor="middle" className="font-mono" fontSize="22" fontWeight="700" fill="#111827">
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </text>
        <text x="70" y="82" textAnchor="middle" fontSize="11" fill="#6b7280">{mode.label}</text>
      </svg>

      {/* Controls */}
      <div className="flex gap-3">
        <button onClick={reset} className="btn-outline text-xs px-3 py-2">↺ Reset</button>
        <button
          onClick={() => setRunning((r) => !r)}
          className={`btn-primary text-xs px-6 py-2 ${mode.color}`}
        >
          {running ? '⏸ Pause' : '▶ Start'}
        </button>
      </div>

      {/* Session count */}
      <p className="text-xs text-gray-500">
        🍅 {sessions} focus session{sessions !== 1 ? 's' : ''} completed
      </p>
    </div>
  )
}
