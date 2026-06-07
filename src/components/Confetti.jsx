import { useEffect } from 'react'
import confetti from 'canvas-confetti'

/**
 * Fires a celebratory confetti burst (raining down from the top of the screen)
 * plus a congratulating message that pops up in the center, whenever `show`
 * becomes true. Used on island-completion and mode-completion (win) screens.
 */
export default function Confetti({ show, message, sub }) {
  useEffect(() => {
    if (!show) return

    const duration = 2600
    const end = Date.now() + duration
    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#a855f7']

    ;(function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: -0.1 },
        colors,
        startVelocity: 45,
        gravity: 0.9,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: -0.1 },
        colors,
        startVelocity: 45,
        gravity: 0.9,
      })
      confetti({
        particleCount: 3,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: -0.1 },
        colors,
        startVelocity: 40,
        gravity: 0.9,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="animate-fade-in bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-200 px-10 py-8 text-center">
        <div className="text-5xl mb-2">🎉</div>
        <p className="text-2xl font-bold text-gray-900">{message}</p>
        {sub && <p className="text-sm text-gray-500 mt-1">{sub}</p>}
      </div>
    </div>
  )
}
