/**
 * A friendly owl that swoops across the screen when the player seems stuck
 * on a question (no "Next" click within 10 seconds). Just a gentle nudge —
 * purely decorative, doesn't block interaction.
 */
export default function OwlHelper({ show }) {
  if (!show) return null

  return (
    <div className="fixed inset-x-0 top-20 h-0 z-40 pointer-events-none overflow-visible">
      <div className="absolute animate-owl-fly" style={{ top: 0 }}>
        <div className="animate-owl-bob flex flex-col items-center -translate-x-1/2">
          <span className="text-4xl drop-shadow-md">🦉</span>
          <span className="mt-1 whitespace-nowrap text-[11px] font-semibold text-amber-700 bg-amber-50/95 border border-amber-200 rounded-full px-2 py-0.5 shadow">
            Need a hint? Take your time! 💡
          </span>
        </div>
      </div>
    </div>
  )
}
