import { useState, useEffect } from 'react'
import useStore from '@/store/useStore'
import {
  STORY_SLIDES, ISLANDS, ISLAND_QUESTIONS,
  MUTINY_QUESTIONS, OLYMPUS_QUESTIONS, HARD_OLYMPUS_QUESTIONS, TRAINING_QUESTIONS,
} from '@/data/gameQuestions'

const STORAGE_KEY = 'sciodyssey_game_v1'
const ISLAND_PASS = 3   // need 3/5+ to pass an island
const OLYMPUS_PASS = 7  // need 7/10 to pass Olympus

const INIT = {
  phase: 'title',       // title|intro|map|island|island-result|mutiny|mutiny-result|olympus|win|fail|hard-intro|training
  hardMode: false,
  introSlide: 0,
  completedIslands: [], // ['geometry', 'cyclops', ...]
  currentIsland: null,
  currentQ: 0,
  answers: {},
  mutinyDone: false,
  mutinyQ: 0,
  mutinyAnswers: {},
  olympusQ: 0,
  olympusAnswers: {},
  trainingDay: 0,
  trainingQ: 0,
  trainingAnswers: {},
  trainingDaysComplete: [],
  showHint: false,
  xpAwarded: false,
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function OdysseyGame() {
  const { user, awardXP } = useStore()

  const [gs, setGs] = useState(() => {
    try { return { ...INIT, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) } }
    catch { return INIT }
  })

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(gs)) }, [gs])

  function set(patch) { setGs(p => ({ ...p, ...patch })) }
  function reset(hard = false) { setGs({ ...INIT, hardMode: hard }) }

  // Helpers
  const islandData = ISLANDS.find(i => i.id === gs.currentIsland)
  const islandQs = gs.currentIsland ? (ISLAND_QUESTIONS[gs.currentIsland] ?? []) : []
  const olympusQs = gs.hardMode ? HARD_OLYMPUS_QUESTIONS : OLYMPUS_QUESTIONS

  function getIslandScore() {
    let score = 0
    islandQs.forEach((q, i) => { if (gs.answers[i] === q.answer) score++ })
    return score
  }

  function getMutinyScore() {
    let score = 0
    MUTINY_QUESTIONS.forEach((q, i) => { if (gs.mutinyAnswers[i] === q.answer) score++ })
    return score
  }

  function getOlympusScore() {
    let score = 0
    olympusQs.forEach((q, i) => { if (gs.olympusAnswers[i] === q.answer) score++ })
    return score
  }

  // ── TITLE ────────────────────────────────────────────────────────────────
  if (gs.phase === 'title') return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="text-7xl mb-4">⛵</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Scientific Odyssey</h1>
      <p className="text-gray-500 mb-1 text-sm">A story-based science adventure game</p>
      <p className="text-xs text-brand-600 font-semibold mb-8">Grade 6 NCE Reviewer · PSHS · Manila Science · QCSHS</p>

      <div className="flex flex-col gap-3 w-64">
        <button onClick={() => set({ phase: 'intro', introSlide: 0 })} className="btn-primary justify-center py-3 text-base">
          ⚔️ Begin Your Odyssey
        </button>
        {gs.completedIslands?.length > 0 && (
          <button onClick={() => set({ phase: 'map' })} className="btn-secondary justify-center">
            🗺️ Continue Journey
          </button>
        )}
        {gs.hardMode && (
          <div className="text-xs text-amber-600 font-semibold bg-amber-50 rounded-xl p-2">
            ⚡ Hard Mode Active — Athena's hints are limited
          </div>
        )}
        {gs.completedIslands?.length > 0 && (
          <button onClick={() => { if (window.confirm('Reset your entire journey?')) reset() }} className="btn-outline text-xs justify-center">
            🔄 Reset Journey
          </button>
        )}
      </div>
    </div>
  )

  // ── STORY INTRO ──────────────────────────────────────────────────────────
  if (gs.phase === 'intro') {
    const slide = STORY_SLIDES[gs.introSlide]
    const isLast = gs.introSlide === STORY_SLIDES.length - 1
    return (
      <div className="max-w-xl mx-auto animate-fade-in">
        <div className="card min-h-72 flex flex-col justify-between">
          <div>
            <div className="text-5xl mb-4 text-center">{slide.emoji}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">{slide.title}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{slide.text}</p>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-1.5">
              {STORY_SLIDES.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === gs.introSlide ? 'bg-brand-600' : 'bg-gray-200'}`} />
              ))}
            </div>
            <button
              onClick={() => isLast ? set({ phase: 'map' }) : set({ introSlide: gs.introSlide + 1 })}
              className="btn-primary"
            >
              {isLast ? '🗺️ Set Sail →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── ISLAND MAP ───────────────────────────────────────────────────────────
  if (gs.phase === 'map') {
    const needsMutiny = !gs.mutinyDone && gs.completedIslands.length >= 3
    const allDone = gs.completedIslands.length === ISLANDS.length
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🗺️ Sea of Knowledge</h1>
            <p className="text-sm text-gray-500">
              {gs.completedIslands.length}/{ISLANDS.length} islands conquered
              {gs.mutinyDone && ' · Mutiny resolved ✓'}
            </p>
          </div>
          {gs.hardMode && <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-xl">⚡ HARD MODE</span>}
        </div>

        {/* Mutiny warning */}
        {needsMutiny && (
          <div className="card border-red-200 bg-red-50 cursor-pointer hover:shadow-md transition" onClick={() => set({ phase: 'mutiny', mutinyQ: 0, mutinyAnswers: {} })}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              <div>
                <p className="font-bold text-red-700">Mutiny Event!</p>
                <p className="text-sm text-red-600">Your crew is in conflict. Resolve it before continuing.</p>
              </div>
              <button className="ml-auto btn-primary bg-red-600 hover:bg-red-700 text-sm">
                Handle Mutiny →
              </button>
            </div>
          </div>
        )}

        {/* Islands */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ISLANDS.map((island) => {
            const done = gs.completedIslands.includes(island.id)
            const locked = needsMutiny && !done
            return (
              <div
                key={island.id}
                onClick={() => !locked && set({ phase: 'island', currentIsland: island.id, currentQ: 0, answers: {}, showHint: false })}
                className={`card border transition-all ${island.border} ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'} ${done ? 'bg-emerald-50 border-emerald-300' : island.bg}`}
              >
                <div className="text-3xl mb-2">{done ? '✅' : island.emoji}</div>
                <p className="font-bold text-gray-900">{island.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 mb-1">{island.subject}</p>
                <p className="text-xs text-gray-600">{island.description}</p>
                {done && <p className="text-xs text-emerald-600 font-semibold mt-2">✓ Conquered</p>}
                {locked && <p className="text-xs text-red-500 font-semibold mt-2">🔒 Resolve mutiny first</p>}
              </div>
            )
          })}
        </div>

        {/* Proceed to Olympus */}
        {allDone && gs.mutinyDone && (
          <div className="card bg-gradient-to-r from-brand-600 to-indigo-500 text-white text-center">
            <p className="text-3xl mb-2">🏛️</p>
            <p className="text-xl font-bold mb-1">All Islands Conquered!</p>
            <p className="text-sm text-indigo-100 mb-4">The gates of Mount Olympus Academy await.</p>
            <button
              onClick={() => set({ phase: 'olympus', olympusQ: 0, olympusAnswers: {} })}
              className="bg-white text-brand-700 font-bold px-6 py-2 rounded-xl hover:bg-indigo-50 transition"
            >
              ⚡ Ascend to Mount Olympus
            </button>
          </div>
        )}
        {allDone && !gs.mutinyDone && (
          <p className="text-center text-sm text-amber-600 font-semibold">Resolve the mutiny event to unlock Mount Olympus!</p>
        )}
      </div>
    )
  }

  // ── ISLAND CHALLENGE ─────────────────────────────────────────────────────
  if (gs.phase === 'island' && islandData) {
    const q = islandQs[gs.currentQ]
    const totalQs = islandQs.length
    const selected = gs.answers[gs.currentQ]
    const isLast = gs.currentQ === totalQs - 1

    return (
      <div className="max-w-2xl space-y-5 animate-fade-in">
        {/* Header */}
        <div className={`rounded-2xl bg-gradient-to-r ${islandData.color} p-4 text-white`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{islandData.emoji}</span>
            <h2 className="text-lg font-bold">{islandData.name}</h2>
          </div>
          <div className="w-full bg-white/30 rounded-full h-1.5 mt-2">
            <div className="bg-white h-1.5 rounded-full transition-all" style={{ width: `${((gs.currentQ) / totalQs) * 100}%` }} />
          </div>
          <p className="text-xs text-white/80 mt-1">Question {gs.currentQ + 1} of {totalQs}</p>
        </div>

        {/* Story intro on first question */}
        {gs.currentQ === 0 && (
          <div className="card bg-gray-50 text-sm text-gray-600 italic">
            📜 {islandData.intro}
          </div>
        )}

        {/* Question */}
        <div className="card space-y-4">
          <p className="font-semibold text-gray-900 leading-relaxed">{q.q}</p>
          <div className="space-y-2">
            {q.options.map((opt) => {
              const letter = opt[0]
              const chosen = selected === letter
              return (
                <button
                  key={letter}
                  onClick={() => { if (!selected) set({ answers: { ...gs.answers, [gs.currentQ]: letter }, showHint: false }) }}
                  disabled={!!selected}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    chosen ? 'bg-brand-50 border-brand-400 text-brand-800' :
                    'border-gray-200 text-gray-700 hover:bg-gray-50 disabled:cursor-default'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Athena hint */}
          {!gs.hardMode && !selected && (
            <button
              onClick={() => set({ showHint: !gs.showHint })}
              className="text-xs text-brand-500 hover:text-brand-700 flex items-center gap-1"
            >
              🦉 {gs.showHint ? 'Hide' : 'Ask Athena for a hint'}
            </button>
          )}
          {gs.showHint && !selected && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800">
              <span className="font-semibold">🦉 Athena:</span> {q.hint}
            </div>
          )}

          {/* Next button after answering */}
          {selected && (
            <div className="pt-2">
              <button
                onClick={() => {
                  if (isLast) {
                    const score = Object.entries({ ...gs.answers }).filter(([i, a]) => a === islandQs[+i].answer).length
                    const passed = score >= ISLAND_PASS
                    if (passed && !gs.completedIslands.includes(gs.currentIsland)) {
                      const updated = [...gs.completedIslands, gs.currentIsland]
                      set({ phase: 'island-result', completedIslands: updated })
                      if (user) awardXP(user.id, 30, 'island')
                    } else {
                      set({ phase: 'island-result' })
                    }
                  } else {
                    set({ currentQ: gs.currentQ + 1, showHint: false })
                  }
                }}
                className="btn-primary"
              >
                {isLast ? '📊 See Results' : 'Next →'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── ISLAND RESULT ────────────────────────────────────────────────────────
  if (gs.phase === 'island-result' && islandData) {
    const score = getIslandScore()
    const passed = score >= ISLAND_PASS
    const total = islandQs.length

    return (
      <div className="max-w-xl mx-auto space-y-5 animate-fade-in">
        <div className={`card text-center ${passed ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <div className="text-5xl mb-3">{passed ? '🏆' : '💪'}</div>
          <h2 className="text-xl font-bold text-gray-900">{islandData.name}</h2>
          <p className="text-3xl font-bold mt-2 mb-1 text-gray-900">{score}/{total}</p>
          <p className={`font-semibold ${passed ? 'text-emerald-700' : 'text-red-600'}`}>
            {passed ? `Island Conquered! +30 XP` : `Need ${ISLAND_PASS}/${total} to pass. Try again!`}
          </p>
          {passed && islandData.crew && (
            <p className="text-sm text-gray-600 mt-2">
              🧑‍✈️ {islandData.crew} joins your crew!
            </p>
          )}
        </div>

        {/* Answer review */}
        <div className="space-y-3">
          {islandQs.map((q, i) => {
            const ua = gs.answers[i]
            const correct = ua === q.answer
            return (
              <div key={i} className={`card border-l-4 ${correct ? 'border-emerald-400' : 'border-red-400'} py-3 px-4`}>
                <p className="text-sm font-medium text-gray-800">{correct ? '✓' : '✗'} {q.q}</p>
                {!correct && <p className="text-xs text-red-500 mt-1">Your answer: {ua ?? 'Not answered'}</p>}
                <p className="text-xs text-emerald-700">Correct: {q.answer}</p>
                {!gs.hardMode && <p className="text-xs text-gray-500 mt-1">🦉 {q.hint}</p>}
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={() => set({ phase: 'map' })} className="btn-outline">← Back to Map</button>
          {!passed && (
            <button onClick={() => set({ phase: 'island', currentQ: 0, answers: {}, showHint: false })} className="btn-primary">
              🔄 Try Again
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── MUTINY EVENT ─────────────────────────────────────────────────────────
  if (gs.phase === 'mutiny') {
    const q = MUTINY_QUESTIONS[gs.mutinyQ]
    const isLast = gs.mutinyQ === MUTINY_QUESTIONS.length - 1
    const selected = gs.mutinyAnswers[gs.mutinyQ]

    return (
      <div className="max-w-2xl space-y-5 animate-fade-in">
        <div className="card bg-gradient-to-r from-red-500 to-orange-400 text-white">
          <div className="text-3xl mb-2">⚡ MUTINY!</div>
          <p className="font-bold text-lg">Your crew is in conflict.</p>
          <p className="text-sm text-red-100 mt-1">
            Eurylochus has stirred unrest. The crew threatens to turn back. Your leadership is being tested.
            Answer wisely to restore harmony aboard the Elpis.
          </p>
          <p className="text-xs text-red-200 mt-2">Question {gs.mutinyQ + 1} of {MUTINY_QUESTIONS.length}</p>
        </div>

        <div className="card space-y-4">
          <p className="font-semibold text-gray-900 leading-relaxed">{q.q}</p>
          <div className="space-y-2">
            {q.options.map((opt) => {
              const letter = opt[0]
              const chosen = selected === letter
              return (
                <button
                  key={letter}
                  onClick={() => { if (!selected) set({ mutinyAnswers: { ...gs.mutinyAnswers, [gs.mutinyQ]: letter } }) }}
                  disabled={!!selected}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    chosen ? 'bg-brand-50 border-brand-400 text-brand-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50 disabled:cursor-default'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
          {selected && (
            <button
              onClick={() => {
                if (isLast) set({ phase: 'mutiny-result' })
                else set({ mutinyQ: gs.mutinyQ + 1 })
              }}
              className="btn-primary"
            >
              {isLast ? 'See Outcome' : 'Next →'}
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── MUTINY RESULT ────────────────────────────────────────────────────────
  if (gs.phase === 'mutiny-result') {
    const score = getMutinyScore()
    const resolved = score >= 2
    return (
      <div className="max-w-xl mx-auto card text-center space-y-4 animate-fade-in">
        <div className="text-5xl">{resolved ? '🕊️' : '⚡'}</div>
        <h2 className="text-xl font-bold text-gray-900">
          {resolved ? 'Mutiny Resolved!' : 'The Crew is Still Uneasy...'}
        </h2>
        <p className="text-gray-600 text-sm">
          {resolved
            ? "Your wise leadership has calmed the crew. Eurylochus nods in respect. The Elpis sails forward, united."
            : "Some tension remains, but the journey must continue. Learn from this and lead with more wisdom next time."}
        </p>
        <p className="text-gray-500 text-sm">{score}/{MUTINY_QUESTIONS.length} correct leadership choices</p>
        <button
          onClick={() => set({ phase: 'map', mutinyDone: true })}
          className="btn-primary mx-auto"
        >
          🗺️ Return to Map
        </button>
      </div>
    )
  }

  // ── OLYMPUS EXAM ─────────────────────────────────────────────────────────
  if (gs.phase === 'olympus') {
    const q = olympusQs[gs.olympusQ]
    const selected = gs.olympusAnswers[gs.olympusQ]
    const isLast = gs.olympusQ === olympusQs.length - 1

    return (
      <div className="max-w-2xl space-y-5 animate-fade-in">
        <div className="card bg-gradient-to-r from-brand-700 to-indigo-600 text-white">
          <div className="text-3xl mb-1">🏛️ Mount Olympus Exam</div>
          <p className="text-indigo-200 text-sm">The final trial. Score {OLYMPUS_PASS}/{olympusQs.length} or higher to enter the Academy.</p>
          <div className="w-full bg-white/20 rounded-full h-1.5 mt-3">
            <div className="bg-white h-1.5 rounded-full transition-all" style={{ width: `${(gs.olympusQ / olympusQs.length) * 100}%` }} />
          </div>
          <p className="text-xs text-indigo-300 mt-1">Question {gs.olympusQ + 1} of {olympusQs.length}</p>
          {gs.hardMode && <p className="text-xs text-amber-300 font-semibold mt-1">⚡ Hard Mode — No hints from Athena</p>}
        </div>

        <div className="card space-y-4">
          <p className="font-semibold text-gray-900 leading-relaxed">{q.q}</p>
          <div className="space-y-2">
            {q.options.map((opt) => {
              const letter = opt[0]
              const chosen = selected === letter
              return (
                <button
                  key={letter}
                  onClick={() => { if (!selected) set({ olympusAnswers: { ...gs.olympusAnswers, [gs.olympusQ]: letter } }) }}
                  disabled={!!selected}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    chosen ? 'bg-brand-50 border-brand-400 text-brand-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50 disabled:cursor-default'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Athena hint — only in normal mode */}
          {!gs.hardMode && !selected && (
            <button onClick={() => set({ showHint: !gs.showHint })} className="text-xs text-brand-500 hover:text-brand-700">
              🦉 {gs.showHint ? 'Hide hint' : 'Ask Athena for a hint'}
            </button>
          )}
          {!gs.hardMode && gs.showHint && !selected && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800">
              🦉 <strong>Athena:</strong> {q.hint}
            </div>
          )}

          {selected && (
            <button
              onClick={() => {
                if (isLast) {
                  const score = Object.entries(gs.olympusAnswers).filter(([i, a]) => a === olympusQs[+i].answer).length
                  const passed = score >= OLYMPUS_PASS
                  set({ phase: passed ? 'win' : 'fail', showHint: false })
                  if (passed && user && !gs.xpAwarded) {
                    awardXP(user.id, gs.hardMode ? 200 : 100, 'olympus')
                    set({ xpAwarded: true })
                  }
                } else {
                  set({ olympusQ: gs.olympusQ + 1, showHint: false })
                }
              }}
              className="btn-primary"
            >
              {isLast ? '⚡ Submit Exam' : 'Next →'}
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── WIN ENDING ───────────────────────────────────────────────────────────
  if (gs.phase === 'win') {
    const score = getOlympusScore()
    return (
      <div className="max-w-xl mx-auto text-center space-y-6 animate-fade-in">
        <div className="text-7xl">🏛️</div>
        <h1 className="text-3xl font-bold text-gray-900">
          {gs.hardMode ? '⚡ Legend of Olympus!' : '🎉 You Made It!'}
        </h1>
        <p className="text-gray-600">
          {gs.hardMode
            ? "You have conquered the hardest trial the gods could devise. Your name is etched in the Hall of Olympus forever. Athena herself bows in respect."
            : "The gates of Mount Olympus Academy open wide. The gods applaud as you walk through. Back home, Nanay Penelope wipes tears of joy, and little Telemo runs to embrace you. You did it."}
        </p>
        <p className="text-2xl font-bold text-brand-600">{score}/{olympusQs.length} correct ✨ {gs.hardMode ? '+200 XP' : '+100 XP'}</p>

        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-6 border border-amber-200">
          <p className="text-2xl mb-2">👨‍👩‍👦</p>
          <p className="text-sm text-amber-800 font-medium italic">
            "Ang taong may kaalaman ay may kapangyarihan."<br/>
            <span className="text-xs text-amber-600">(A person with knowledge has power.)</span>
          </p>
        </div>

        {!gs.hardMode && (
          <button
            onClick={() => set({ phase: 'hard-intro', hardMode: true, completedIslands: [], mutinyDone: false, currentIsland: null, xpAwarded: false })}
            className="btn-primary mx-auto"
          >
            ⚡ Try Hard Mode
          </button>
        )}
        {gs.hardMode && (
          <button onClick={() => reset()} className="btn-outline mx-auto">🔄 Start a New Journey</button>
        )}
      </div>
    )
  }

  // ── FAIL ENDING ──────────────────────────────────────────────────────────
  if (gs.phase === 'fail') {
    const score = getOlympusScore()
    const needsTraining = gs.hardMode
    return (
      <div className="max-w-xl mx-auto text-center space-y-5 animate-fade-in">
        <div className="text-7xl">🌊</div>
        <h1 className="text-2xl font-bold text-gray-900">Not This Time, Odysseus...</h1>
        <p className="text-gray-600">
          Mount Olympus falls silent. The gates remain closed. But back home, Nanay Penelope watches the door, and little Telemo clutches your photo close.
          They still believe in you. <strong>So do we.</strong>
        </p>
        <p className="text-lg font-bold text-gray-700">{score}/{olympusQs.length} — Need {OLYMPUS_PASS} to pass</p>

        {needsTraining ? (
          <div className="card bg-amber-50 border-amber-200 space-y-3">
            <p className="text-amber-800 font-semibold">🦉 Athena appears before you...</p>
            <p className="text-sm text-amber-700">
              "Young Odysseus, you have failed the hard trial. But I will train you for 7 days. 30 minutes a day. When you are ready, you may challenge Olympus again."
            </p>
            <button onClick={() => set({ phase: 'training', trainingDay: 0, trainingQ: 0, trainingAnswers: {}, trainingDaysComplete: [] })} className="btn-primary w-full justify-center">
              🦉 Begin Athena's Training
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-48 mx-auto">
            <button
              onClick={() => set({ ...INIT, hardMode: false })}
              className="btn-primary justify-center"
            >
              ⚓ Begin Again
            </button>
            <p className="text-xs text-gray-400">New questions await on your next journey.</p>
          </div>
        )}
      </div>
    )
  }

  // ── HARD MODE INTRO ──────────────────────────────────────────────────────
  if (gs.phase === 'hard-intro') return (
    <div className="max-w-xl mx-auto card text-center space-y-4 animate-fade-in">
      <div className="text-5xl">⚡</div>
      <h2 className="text-2xl font-bold text-gray-900">Hard Mode Unlocked</h2>
      <div className="text-left bg-gray-50 rounded-xl p-4 text-sm text-gray-700 space-y-2">
        <p>⚡ Harder questions — the gods are less forgiving</p>
        <p>🦉 Athena's hints are gone — you're on your own</p>
        <p>📊 Need 7/10 to pass Olympus (same threshold, harder questions)</p>
        <p>💀 Fail Olympus? → 7-day Athena Training before you can retry</p>
        <p>🏆 Win? → You become a Legend of Olympus (+200 XP)</p>
      </div>
      <button onClick={() => set({ phase: 'intro', introSlide: 0 })} className="btn-primary mx-auto">
        ⚡ Accept the Challenge
      </button>
    </div>
  )

  // ── ATHENA TRAINING ──────────────────────────────────────────────────────
  if (gs.phase === 'training') {
    const daysNeeded = 7
    const daysDone = gs.trainingDaysComplete.length
    const allTrainingDone = daysDone >= daysNeeded

    if (allTrainingDone) return (
      <div className="max-w-xl mx-auto card text-center space-y-4 animate-fade-in">
        <div className="text-5xl">🦉</div>
        <h2 className="text-xl font-bold text-gray-900">Training Complete!</h2>
        <p className="text-gray-600">Athena nods with approval. "You are ready, young scholar. Return to Olympus."</p>
        <div className="flex gap-2 justify-center">
          {Array.from({ length: daysNeeded }, (_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">✓</div>
          ))}
        </div>
        <button onClick={() => set({ phase: 'map', completedIslands: ISLANDS.map(i => i.id), mutinyDone: true, olympusQ: 0, olympusAnswers: {}, xpAwarded: false })} className="btn-primary mx-auto">
          🏛️ Challenge Olympus Again
        </button>
      </div>
    )

    // Training session
    const trainingQs = TRAINING_QUESTIONS.slice(0, 10)
    const tq = trainingQs[gs.trainingQ]
    const tSelected = gs.trainingAnswers[gs.trainingQ]
    const isLast = gs.trainingQ === trainingQs.length - 1

    return (
      <div className="max-w-2xl space-y-5 animate-fade-in">
        <div className="card bg-gradient-to-r from-amber-500 to-yellow-400 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🦉</span>
            <h2 className="font-bold">Athena's Training — Day {daysDone + 1}/{daysNeeded}</h2>
          </div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: daysNeeded }, (_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full ${i < daysDone ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
          <p className="text-xs text-amber-100 mt-1">Question {gs.trainingQ + 1} of {trainingQs.length}</p>
        </div>

        <div className="card space-y-4">
          <p className="font-semibold text-gray-900">{tq.q}</p>
          <div className="space-y-2">
            {tq.options.map((opt) => {
              const letter = opt[0]
              const chosen = tSelected === letter
              const showResult = !!tSelected
              const isCorrect = letter === tq.answer
              return (
                <button
                  key={letter}
                  onClick={() => { if (!tSelected) set({ trainingAnswers: { ...gs.trainingAnswers, [gs.trainingQ]: letter } }) }}
                  disabled={!!tSelected}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    showResult && isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-800' :
                    showResult && chosen && !isCorrect ? 'bg-red-50 border-red-400 text-red-700' :
                    chosen ? 'bg-brand-50 border-brand-400' :
                    'border-gray-200 text-gray-700 hover:bg-gray-50 disabled:cursor-default'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {tSelected && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800">
              🦉 <strong>Athena:</strong> {tq.hint}
            </div>
          )}

          {tSelected && (
            <button
              onClick={() => {
                if (isLast) {
                  set({ trainingDaysComplete: [...gs.trainingDaysComplete, daysDone], trainingQ: 0, trainingAnswers: {} })
                } else {
                  set({ trainingQ: gs.trainingQ + 1 })
                }
              }}
              className="btn-primary"
            >
              {isLast ? `✓ Complete Day ${daysDone + 1}` : 'Next →'}
            </button>
          )}
        </div>
      </div>
    )
  }

  return null
}
