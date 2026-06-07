import { useState } from 'react'
import { BADGES, getEarnedBadges, getNextBadge, TIER_LABELS } from '@/data/badges'

export default function OdysseyBadges({ streak = 0 }) {
  const [selected, setSelected] = useState(null)
  const earned = getEarnedBadges(streak)
  const next = getNextBadge(streak)
  const tiers = [1, 2, 3, 4, 5, 6]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900">🏺 Odyssey Badges</h2>
          <p className="text-xs text-gray-500 mt-0.5">Earn 1 badge every 5-day streak · Characters from Homer's The Odyssey</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-brand-600">{earned.length}<span className="text-sm text-gray-400">/{BADGES.length}</span></p>
          <p className="text-xs text-gray-400">badges earned</p>
        </div>
      </div>

      {/* Next badge preview */}
      {next && (
        <div className="rounded-2xl border border-dashed border-brand-300 bg-brand-50 p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-2xl grayscale opacity-40">
            {next.emoji}
          </div>
          <div className="flex-1">
            <p className="text-xs text-brand-600 font-semibold uppercase tracking-wide">Next Badge</p>
            <p className="font-bold text-gray-800">{next.name} — {next.role}</p>
            <div className="mt-1.5 w-full bg-brand-200 rounded-full h-1.5">
              <div
                className="bg-brand-600 h-1.5 rounded-full transition-all"
                style={{ width: `${Math.min((streak / next.days) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{streak} / {next.days} days · {next.days - streak} more to go</p>
          </div>
        </div>
      )}

      {next === null && earned.length === BADGES.length && (
        <div className="rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-4 text-center">
          <p className="text-3xl mb-1">⚡</p>
          <p className="font-bold text-lg">All Olympian Badges Collected!</p>
          <p className="text-sm text-yellow-100">The gods of Olympus welcome you among them.</p>
        </div>
      )}

      {/* Badge grid by tier */}
      {tiers.map(tier => {
        const tierBadges = BADGES.filter(b => b.tier === tier)
        return (
          <div key={tier}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{TIER_LABELS[tier]}</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {tierBadges.map(badge => {
                const isEarned = streak >= badge.days
                return (
                  <button
                    key={badge.id}
                    onClick={() => setSelected(isEarned ? badge : null)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all text-center ${
                      isEarned
                        ? `${badge.bg} ${badge.border} hover:shadow-md cursor-pointer`
                        : 'bg-gray-50 border-gray-200 opacity-50 cursor-default grayscale'
                    }`}
                  >
                    <span className="text-3xl">{badge.emoji}</span>
                    <span className={`text-xs font-semibold leading-tight ${isEarned ? badge.text : 'text-gray-400'}`}>
                      {badge.name}
                    </span>
                    <span className="text-[10px] text-gray-400">{badge.days}-day</span>
                    {isEarned && (
                      <span className="text-[10px] font-bold text-emerald-600">✓ Earned</span>
                    )}
                    {!isEarned && (
                      <span className="text-[10px] text-gray-400">🔒 Locked</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Badge detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className={`max-w-sm w-full rounded-3xl border-2 ${selected.bg} ${selected.border} p-6 shadow-2xl animate-fade-in`}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${selected.color} text-4xl mb-3`}>
                {selected.emoji}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Tier {selected.tier} · {selected.tierName}
              </p>
              <h3 className={`text-2xl font-bold ${selected.text}`}>{selected.name}</h3>
              <p className="text-sm text-gray-500 italic">{selected.role}</p>
            </div>
            <div className="bg-white/60 rounded-2xl p-4 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">{selected.lore}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>🗓️ Unlocked at {selected.days}-day streak</span>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-700 font-semibold"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
