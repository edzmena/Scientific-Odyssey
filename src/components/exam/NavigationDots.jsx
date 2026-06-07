export default function NavigationDots({ total, current, answered, onJump }) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-center">
      {Array.from({ length: total }, (_, i) => {
        const isAnswered = answered.has(i)
        const isCurrent = i === current
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            title={`Question ${i + 1}`}
            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
              isCurrent
                ? 'bg-indigo-600 text-white scale-110 shadow-md'
                : isAnswered
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        )
      })}
    </div>
  )
}
