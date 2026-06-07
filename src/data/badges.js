// Streak badge system — characters from Homer's The Odyssey
// 1 character unlocked per 5-day streak milestone, starting from Tier 1 (servants)
// progressing to Tier 6 (High Olympian Gods) at 100 days.

export const BADGES = [
  // ── TIER 1: Domestics / Servants ─────────────────────────────────── days 5–20
  {
    id: 'argos', days: 5, tier: 1, tierName: 'Domestic',
    name: 'Argos', role: "Odysseus's Faithful Hound",
    emoji: '🐕',
    color: 'from-stone-400 to-stone-500',
    bg: 'bg-stone-50', border: 'border-stone-200', text: 'text-stone-700',
    lore: 'Argos waited 20 years for his master to return. His loyalty was unmatched. You have shown that same dedication — 5 days of showing up.',
  },
  {
    id: 'melantho', days: 10, tier: 1, tierName: 'Domestic',
    name: 'Melantho', role: 'Maidservant of Ithaca',
    emoji: '🪡',
    color: 'from-stone-500 to-gray-500',
    bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700',
    lore: 'Melantho served the halls of Odysseus. Like the daily work of the household, your study streak has built a foundation — 10 days strong.',
  },
  {
    id: 'eurycleia', days: 15, tier: 1, tierName: 'Domestic',
    name: 'Eurycleia', role: "Odysseus's Nurse",
    emoji: '🕯️',
    color: 'from-amber-500 to-stone-500',
    bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700',
    lore: "Eurycleia, wise nurse, recognized Odysseus by his scar after 20 years. She kept his secret with patient wisdom. You've kept your streak for 15 days.",
  },
  {
    id: 'eumaeus', days: 20, tier: 1, tierName: 'Domestic',
    name: 'Eumaeus', role: 'Loyal Swineherd',
    emoji: '🐷',
    color: 'from-green-500 to-teal-500',
    bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700',
    lore: 'Eumaeus remained faithful to his master even through years of absence. He welcomed the disguised Odysseus with open arms. 20-day streak — faithful like Eumaeus.',
  },

  // ── TIER 2: Suitors / Local Elites ────────────────────────────── days 25–35
  {
    id: 'telemachus', days: 25, tier: 2, tierName: 'Local Elite',
    name: 'Telemachus', role: "Odysseus's Son",
    emoji: '🧒',
    color: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700',
    lore: "Telemachus set sail at a young age to find his father, showing courage beyond his years. At 25 days, you've proven you can start a journey and keep going.",
  },
  {
    id: 'antinous', days: 30, tier: 2, tierName: 'Local Elite',
    name: 'Antinous', role: 'Leader of the Suitors',
    emoji: '😤',
    color: 'from-red-400 to-orange-400',
    bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700',
    lore: "Antinous was bold, persistent, and refused to give up — even if for the wrong reasons. You've claimed this badge not for arrogance but for 30 days of bold persistence.",
  },
  {
    id: 'eurymachus', days: 35, tier: 2, tierName: 'Local Elite',
    name: 'Eurymachus', role: 'Scheming Suitor',
    emoji: '🎭',
    color: 'from-purple-400 to-pink-400',
    bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700',
    lore: "Eurymachus was cunning and strategic. You've now spent 35 days strategically building your knowledge. The suitors played the long game — and so do you.",
  },

  // ── TIER 3: Mortal Kings / Queens ────────────────────────────── days 40–60
  {
    id: 'penelope', days: 40, tier: 3, tierName: 'Mortal Royalty',
    name: 'Penelope', role: 'Queen of Ithaca',
    emoji: '🧵',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700',
    lore: 'Penelope wove by day and unraveled by night for years, outwitting everyone. Her patience and cleverness never wavered. 40 days of your own quiet persistence earns her.',
  },
  {
    id: 'alcinous', days: 45, tier: 3, tierName: 'Mortal Royalty',
    name: 'Alcinous', role: 'King of the Phaeacians',
    emoji: '👑',
    color: 'from-yellow-500 to-amber-500',
    bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700',
    lore: 'Alcinous heard Odysseus\'s story with great generosity and provided him ships to go home. Like him, you generously give your time to learning — 45 days now.',
  },
  {
    id: 'arete', days: 50, tier: 3, tierName: 'Mortal Royalty',
    name: 'Arête', role: 'Queen of the Phaeacians',
    emoji: '👸',
    color: 'from-fuchsia-500 to-rose-500',
    bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-700',
    lore: "Arête (whose name literally means 'excellence') commanded great respect through wisdom. You've shown excellence over 50 days. This is your badge of virtue.",
  },
  {
    id: 'menelaus', days: 55, tier: 3, tierName: 'Mortal Royalty',
    name: 'Menelaus', role: 'King of Sparta',
    emoji: '⚔️',
    color: 'from-gray-600 to-slate-600',
    bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700',
    lore: "Menelaus fought at Troy and wandered the seas before finally returning home. His journey mirrored Odysseus's. 55 days — you too have fought your own long battles.",
  },
  {
    id: 'nestor', days: 60, tier: 3, tierName: 'Mortal Royalty',
    name: 'Nestor', role: 'Wise King of Pylos',
    emoji: '📜',
    color: 'from-teal-500 to-cyan-500',
    bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700',
    lore: 'Nestor, oldest and wisest among the Greek kings, gave counsel to all. At 60 days, your consistent practice has made you wise beyond your years, young scholar.',
  },

  // ── TIER 4: The Epic Hero ─────────────────────────────────────────── day 65
  {
    id: 'odysseus', days: 65, tier: 4, tierName: 'Epic Hero',
    name: 'Odysseus', role: 'King of Ithaca, Hero of the Odyssey',
    emoji: '⚓',
    color: 'from-indigo-600 to-brand-600',
    bg: 'bg-indigo-50', border: 'border-indigo-300', text: 'text-indigo-700',
    lore: "Odysseus — clever, enduring, brave. He outsmarted gods, monsters, and men. At 65 days you've earned the right to bear his name. You ARE the hero of your own odyssey.",
  },

  // ── TIER 5: Minor Deities / Monsters ─────────────────────────── days 70–85
  {
    id: 'polyphemus', days: 70, tier: 5, tierName: 'Minor Deity',
    name: 'Polyphemus', role: 'The Cyclops',
    emoji: '👁️',
    color: 'from-stone-600 to-red-700',
    bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-800',
    lore: "Polyphemus, son of Poseidon, was terrifying — but Odysseus outsmarted him with a single word: 'Nobody.' You've faced 70 days of challenges and outsmarted them all.",
  },
  {
    id: 'circe', days: 75, tier: 5, tierName: 'Minor Deity',
    name: 'Circe', role: 'Sorceress of Aeaea',
    emoji: '🧙‍♀️',
    color: 'from-violet-500 to-purple-700',
    bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700',
    lore: 'Circe transformed men but was herself transformed by Odysseus\'s courage. She became his teacher, telling him how to navigate the underworld. 75 days — you too transform knowledge into power.',
  },
  {
    id: 'calypso', days: 80, tier: 5, tierName: 'Minor Deity',
    name: 'Calypso', role: 'Nymph of Ogygia',
    emoji: '🏝️',
    color: 'from-cyan-500 to-teal-600',
    bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700',
    lore: "Calypso offered Odysseus immortality — but he chose home. Some temptations are real. You've chosen, for 80 days, to study over easier distractions. That deserves a goddess.",
  },
  {
    id: 'hermes', days: 85, tier: 5, tierName: 'Minor Deity',
    name: 'Hermes', role: 'Messenger of the Gods',
    emoji: '✉️',
    color: 'from-amber-400 to-yellow-500',
    bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700',
    lore: "Hermes, swift messenger of Olympus, carried divine knowledge across the cosmos. You've carried your knowledge forward for 85 days. Swift, consistent, divine.",
  },

  // ── TIER 6: High Olympian Gods ────────────────────────────── days 90–100
  {
    id: 'athena', days: 90, tier: 6, tierName: 'Olympian God',
    name: 'Athena', role: 'Goddess of Wisdom & Strategy',
    emoji: '🦉',
    color: 'from-brand-600 to-indigo-600',
    bg: 'bg-brand-50', border: 'border-brand-300', text: 'text-brand-700',
    lore: "Athena guided Odysseus's every step. She is the patron of science, strategy, and wisdom. At 90 days you've earned her blessing. She looks upon you with pride.",
  },
  {
    id: 'poseidon', days: 95, tier: 6, tierName: 'Olympian God',
    name: 'Poseidon', role: 'God of the Sea',
    emoji: '🌊',
    color: 'from-blue-600 to-cyan-700',
    bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700',
    lore: "Poseidon threw storm after storm at Odysseus — and still Odysseus sailed on. You've weathered 95 days of your own storms and kept going. Even the sea bows to you now.",
  },
  {
    id: 'zeus', days: 100, tier: 6, tierName: 'Olympian God',
    name: 'Zeus', role: 'King of the Gods',
    emoji: '⚡',
    color: 'from-yellow-500 to-amber-600',
    bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800',
    lore: '100 days. The Fates themselves mark this moment. Zeus, ruler of Olympus, watches from above and nods. You have earned the highest badge. The gods themselves are impressed.',
  },
]

// Returns badges the user has already earned
export function getEarnedBadges(streak) {
  return BADGES.filter(b => streak >= b.days)
}

// Returns the next badge the user will earn
export function getNextBadge(streak) {
  return BADGES.find(b => streak < b.days) ?? null
}

export const TIER_COLORS = {
  1: 'text-stone-600',
  2: 'text-blue-600',
  3: 'text-rose-600',
  4: 'text-indigo-700',
  5: 'text-purple-600',
  6: 'text-amber-600',
}

export const TIER_LABELS = {
  1: '🏠 Tier 1 — Domestics',
  2: '🎭 Tier 2 — Local Elites',
  3: '👑 Tier 3 — Mortal Royalty',
  4: '⚓ Tier 4 — The Epic Hero',
  5: '🌟 Tier 5 — Minor Deities',
  6: '⚡ Tier 6 — Olympian Gods',
}
