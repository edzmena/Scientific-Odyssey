import { useEffect, useState } from 'react'

export default function CountdownTimer({ totalSeconds, onExpire, paused = false }) {
  const [seconds, setSeconds] = useState(totalSeconds)

  useEffect(() => {
    if (paused || seconds <= 0) return
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { clearInterval(id); onExpire?.(); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, seconds <= 0])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const urgent = seconds < 60

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-sm ${
      urgent ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'
    }`}>
      <span className={urgent ? 'animate-pulse' : ''}>⏱</span>
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </div>
  )
}
