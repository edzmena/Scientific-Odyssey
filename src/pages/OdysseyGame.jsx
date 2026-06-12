import { useState, useEffect } from 'react'
import useStore from '@/store/useStore'
import {
  STORY_SLIDES, ISLANDS, ISLAND_QUESTIONS,
  MUTINY_QUESTIONS, OLYMPUS_QUESTIONS, HARD_OLYMPUS_QUESTIONS, TRAINING_QUESTIONS,
  LEGENDARY_ISLANDS, LEGENDARY_ISLAND_QUESTIONS, LEGENDARY_OLYMPUS_QUESTIONS,
} from '@/data/gameQuestions'
import { pickQuestions } from '@/utils/questionHistory'
import Confetti from '@/components/Confetti'
import OwlHelper from '@/components/OwlHelper'
import { hasActiveAccess } from '@/lib/subscription'

const STORAGE_KEY = 'sciodyssey_game_v1'
const ISLAND_PASS = 3   // need 3/5+ to pass an island
const OLYMPUS_PASS = 7  // need 7/10 to pass Olympus

const INIT = {
  phase: 'title',
  hardMode: false,
  legendaryMode: false,
  introSlide: 0,
  completedIslands: [],
  currentIsland: null,
  islandPools: {},    // { [islandId]: [questions...] } — randomized per-session, re-rolled on island failure
  trainingPool: null, // randomized training question set (re-rolled each training day)
  mutinyPool: null,   // randomized, no-repeat mutiny question set (re-rolled each time the event triggers)
  olympusPool: null,  // randomized Olympus exam question set
  currentQ: 0,
  answers: {},
  submitted: {},      // tracks which questions have been locked in by clicking Next
  mutinyDone: false,
  mutinyQ: 0,
  mutinyAnswers: {},
  mutinySubmitted: {},
  olympusQ: 0,
  olympusAnswers: {},
  olympusSubmitted: {},
  trainingDay: 0,
  trainingQ: 0,
  trainingAnswers: {},
  trainingSubmitted: {},
  trainingDaysComplete: [],
  showHint: false,
  xpAwarded: false,
}

// Island illustrations — emoji art panels
const ISLAND_ILLUSTRATIONS = {
  geometry: `
    📐  ╱╲  📐
   ╱    ╲
  ╱  △△△  ╲
 ╱___□___◇___╲
  `,
  cyclops: `
  🕳️  ·  ·  🕳️
      👁️
   ╭──────╮
   │ Zzz  │
   ╰──────╯
  `,
  sirens: `
   🎵  ≋≋≋  🎵
  ≋  🧜‍♀️  🧜‍♀️  ≋
 ≋≋  ♪ ♬ ♪  ≋≋
  `,
  hermes: `
   🌿  📚  🌿
   A  B  C  D
   ✏️  📖  ✏️
  `,
  poseidon: `
  🌊  🐟  🌊
   ≈ 🔱 ≈
  🌊  🐚  🌊
  `,
  labyrinth: `
  🌀──┐  ┌──🌀
  │  │  │  │
  └──┘  └──┘
     🔮
  `,
}

export default function OdysseyGame() {
  const { user, awardXP, profile } = useStore()
  const canAccessPremium = hasActiveAccess(profile)

  const [gs, setGs] = useState(() => {
    try { return { ...INIT, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) } }
    catch { return INIT }
  })

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(gs)) }, [gs])

  function set(patch) { setGs(p => ({ ...p, ...patch })) }
  function reset(hard = false) { setGs({ ...INIT, hardMode: hard }) }

  // Legendary Mode swaps in a brand-new set of islands, questions, and final exam
  const activeIslands = gs.legendaryMode ? LEGENDARY_ISLANDS : ISLANDS
  const activeIslandQuestions = gs.legendaryMode ? LEGENDARY_ISLAND_QUESTIONS : ISLAND_QUESTIONS
  const islandData = activeIslands.find(i => i.id === gs.currentIsland)
  const islandQs = gs.currentIsland
    ? (gs.islandPools[gs.currentIsland] ?? activeIslandQuestions[gs.currentIsland] ?? [])
    : []
  const mutinyQs = gs.mutinyPool ?? MUTINY_QUESTIONS
  const olympusBank = gs.legendaryMode ? LEGENDARY_OLYMPUS_QUESTIONS : (gs.hardMode ? HARD_OLYMPUS_QUESTIONS : OLYMPUS_QUESTIONS)
  const olympusQs = gs.olympusPool ?? olympusBank

  // Build a freshly-randomized, no-repeat pool for one island (5 questions)
  function rollIslandPool(islandId) {
    const bank = activeIslandQuestions[islandId] ?? []
    return pickQuestions(user?.id, bank, Math.min(5, bank.length), { record: false })
  }
  // Re-roll EVERY island's question pool — used when the player fails an island,
  // so retrying that island (and visiting any other island) avoids repeats.
  function rerollAllIslands() {
    const pools = {}
    activeIslands.forEach((isl) => { pools[isl.id] = rollIslandPool(isl.id) })
    return pools
  }

  function getIslandScore() {
    let score = 0
    islandQs.forEach((q, i) => { if (gs.answers[i] === q.answer) score++ })
    return score
  }
  function getMutinyScore() {
    let score = 0
    mutinyQs.forEach((q, i) => { if (gs.mutinyAnswers[i] === q.answer) score++ })
    return score
  }
  function getOlympusScore() {
    let score = 0
    olympusQs.forEach((q, i) => { if (gs.olympusAnswers[i] === q.answer) score++ })
    return score
  }

  // Helper: given a question and its answer letter, return the full option text
  function getAnswerText(q, letter) {
    if (!letter) return 'Not answered'
    const opt = (q.options ?? []).find(o => o[0] === letter)
    return opt ?? letter
  }

  // ── CELEBRATION (confetti + congrats popup) ──────────────────────────────
  // Fires once whenever the player conquers an island, or completes a whole
  // mode (normal / hard / legendary) by winning the final exam.
  const [celebration, setCelebration] = useState(null) // { message, sub } | null
  useEffect(() => {
    if (gs.phase === 'island-result' && islandData && getIslandScore() >= ISLAND_PASS) {
      setCelebration({ message: `${islandData.name} Conquered!`, sub: 'Onward across the Sea of Knowledge ⛵' })
    } else if (gs.phase === 'win') {
      const modeName = gs.legendaryMode ? 'Legendary Mode' : gs.hardMode ? 'Hard Mode' : 'Scientific Odyssey'
      setCelebration({ message: `${modeName} Complete!`, sub: 'You did it — congratulations, scholar! 🎓' })
    } else {
      setCelebration(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gs.phase])

  useEffect(() => {
    if (!celebration) return
    const t = setTimeout(() => setCelebration(null), 2800)
    return () => clearTimeout(t)
  }, [celebration])

  // ── STUCK OWL ─────────────────────────────────────────────────────────────
  // If the player lingers on a question for 10+ seconds without clicking
  // Next, a friendly owl flies across the screen with an encouraging nudge.
  const QUESTION_PHASES = ['island', 'mutiny', 'olympus', 'training']
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    setStuck(false)
    if (!QUESTION_PHASES.includes(gs.phase)) return
    const t = setTimeout(() => setStuck(true), 10000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gs.phase, gs.currentQ, gs.mutinyQ, gs.olympusQ, gs.trainingQ])

  // ── TITLE ────────────────────────────────────────────────────────────────
  if (gs.phase === 'title') return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in">
      {/* Illustration */}
      <div className="mb-6 select-none">
        <div className="text-7xl mb-2">⛵</div>
        <div className="text-2xl tracking-widest text-brand-300 font-mono">≈ ≈ ≈ ≈ ≈ ≈ ≈</div>
        <div className="text-xs text-gray-400 font-mono mt-1">🌊 Sea of Knowledge 🌊</div>
      </div>
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

    const SLIDE_ILLUSTRATIONS = [
      // Sea of Knowledge
      <div className="font-mono text-center text-base text-brand-400 leading-tight select-none">
        <div>☁️{'  '}☁️{'       '}☁️</div>
        <div className="text-brand-600">{'  '}⛵{'    '}⛵</div>
        <div className="text-cyan-400">≈≈≈≈≈≈≈≈≈≈≈≈</div>
        <div className="text-blue-400">🌊🌊🌊🌊🌊🌊</div>
      </div>,
      // Your Mission
      <div className="font-mono text-center text-base leading-tight select-none">
        <div>📜{'  '}⚔️{'  '}🛡️</div>
        <div className="text-amber-500">✨ YOUR MISSION ✨</div>
        <div>📐 🔬 📖 🌿 🌊</div>
        <div className="text-xs text-gray-400">Conquer all 6 islands</div>
      </div>,
      // Your Crew
      <div className="font-mono text-center text-base leading-tight select-none">
        <div>🧑‍✈️ 👩‍🔬 🧑‍🎓 👨‍🏫</div>
        <div className="text-brand-500 font-bold">YOUR CREW</div>
        <div className="text-xs text-gray-400">aboard the <em>Elpis</em></div>
        <div>⚓{'  '}🗺️{'  '}🧭</div>
      </div>,
      // Journey Begins
      <div className="font-mono text-center text-base leading-tight select-none">
        <div>🏛️{'        '}🏛️</div>
        <div className="text-amber-500">  OLYMPUS ACADEMY</div>
        <div className="text-gray-300">{'    '}↑↑↑↑↑↑</div>
        <div className="text-blue-400">≈≈ ⛵ ≈≈≈≈ ⛵ ≈≈</div>
      </div>,
    ]

    return (
      <div className="max-w-xl mx-auto animate-fade-in">
        <div className="card min-h-72 flex flex-col justify-between">
          <div>
            <div className="mb-4 p-3 bg-gray-50 rounded-2xl">
              {SLIDE_ILLUSTRATIONS[gs.introSlide] ?? <div className="text-4xl text-center">{slide.emoji}</div>}
            </div>
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
    const allDone = gs.completedIslands.length === activeIslands.length
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🗺️ Sea of Knowledge</h1>
            <p className="text-sm text-gray-500">
              {gs.completedIslands.length}/{activeIslands.length} islands conquered
              {gs.mutinyDone && ' · Mutiny resolved ✓'}
            </p>
          </div>
          {gs.legendaryMode
            ? <span className="text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1 rounded-xl">🔥 LEGENDARY MODE</span>
            : gs.hardMode && <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-xl">⚡ HARD MODE</span>}
        </div>

        {/* Map illustration */}
        <div className="font-mono text-center text-sm text-gray-400 bg-blue-50 rounded-2xl py-3 select-none leading-relaxed">
          <span className="text-blue-300">≈≈ </span>
          {activeIslands.map(isl => (
            <span key={isl.id}>
              <span title={isl.name} className={gs.completedIslands.includes(isl.id) ? 'grayscale-0' : 'opacity-60'}>
                {gs.completedIslands.includes(isl.id) ? '✅' : isl.emoji}
              </span>
              <span className="text-blue-300"> ≈ </span>
            </span>
          ))}
          {allDone && gs.mutinyDone ? '🏛️' : '🌫️'}
          <span className="text-blue-300"> ≈≈</span>
          <p className="text-xs text-blue-400 mt-1">⛵ Your journey across the Sea of Knowledge</p>
        </div>

        {needsMutiny && (
          <div className="card border-red-200 bg-red-50 cursor-pointer hover:shadow-md transition" onClick={() => set({
            phase: 'mutiny', mutinyQ: 0, mutinyAnswers: {}, mutinySubmitted: {},
            mutinyPool: pickQuestions(user?.id, MUTINY_QUESTIONS, Math.min(5, MUTINY_QUESTIONS.length), { record: false }),
          })}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              <div>
                <p className="font-bold text-red-700">Mutiny Event!</p>
                <p className="text-sm text-red-600">Your crew is in conflict. Resolve it before continuing.</p>
              </div>
              <button className="ml-auto btn-primary bg-red-600 hover:bg-red-700 text-sm">Handle Mutiny →</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeIslands.map((island) => {
            const done = gs.completedIslands.includes(island.id)
            const locked = needsMutiny && !done
            return (
              <div
                key={island.id}
                onClick={() => !locked && set({
                  phase: 'island', currentIsland: island.id, currentQ: 0, answers: {}, submitted: {}, showHint: false,
                  islandPools: gs.islandPools[island.id] ? gs.islandPools : { ...gs.islandPools, [island.id]: rollIslandPool(island.id) },
                })}
                className={`card border transition-all ${island.border} ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'} ${done ? 'bg-emerald-50 border-emerald-300' : island.bg}`}
              >
                <div className="text-4xl mb-2">{done ? '✅' : island.emoji}</div>
                <p className="font-bold text-gray-900">{island.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 mb-1">{island.subject}</p>
                <p className="text-xs text-gray-600">{island.description}</p>
                {done && <p className="text-xs text-emerald-600 font-semibold mt-2">✓ Conquered</p>}
                {locked && <p className="text-xs text-red-500 font-semibold mt-2">🔒 Resolve mutiny first</p>}
              </div>
            )
          })}
        </div>

        {allDone && gs.mutinyDone && (
          <div className="card bg-gradient-to-r from-brand-600 to-indigo-500 text-white text-center">
            <p className="text-3xl mb-2">🏛️</p>
            <p className="text-xl font-bold mb-1">All Islands Conquered!</p>
            <p className="text-sm text-indigo-100 mb-4">The gates of Mount Olympus Academy await.</p>
            <button
              onClick={() => set({
                phase: 'olympus', olympusQ: 0, olympusAnswers: {}, olympusSubmitted: {},
                olympusPool: pickQuestions(user?.id, olympusBank, Math.min(10, olympusBank.length), { record: false }),
              })}
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
    const isSubmitted = gs.submitted?.[gs.currentQ]
    const isLast = gs.currentQ === totalQs - 1

    return (
      <div className="max-w-2xl space-y-5 animate-fade-in">
        <OwlHelper show={stuck} />
        {/* Header */}
        <div className={`rounded-2xl bg-gradient-to-r ${islandData.color} p-4 text-white`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{islandData.emoji}</span>
            <div className="flex-1">
              <h2 className="text-lg font-bold">{islandData.name}</h2>
              <p className="text-xs text-white/70">{islandData.subject}</p>
            </div>
            <div className="text-right text-xs text-white/70">
              {gs.currentQ + 1}/{totalQs}
            </div>
          </div>
          <div className="w-full bg-white/30 rounded-full h-1.5 mt-3">
            <div className="bg-white h-1.5 rounded-full transition-all" style={{ width: `${((gs.currentQ) / totalQs) * 100}%` }} />
          </div>
        </div>

        {/* Island illustration on first question */}
        {gs.currentQ === 0 && (
          <div className="card bg-gray-50 space-y-2">
            {ISLAND_ILLUSTRATIONS[islandData.id] && (
              <pre className="text-center text-sm leading-tight select-none text-gray-500 font-mono overflow-hidden">
                {ISLAND_ILLUSTRATIONS[islandData.id]}
              </pre>
            )}
            <p className="text-sm text-gray-600 italic text-center">📜 {islandData.intro}</p>
          </div>
        )}

        {/* Question */}
        <div className="card space-y-4">
          <div className="flex items-start gap-2">
            <span className="shrink-0 text-xs font-bold text-gray-400 bg-gray-100 rounded-lg px-2 py-1 mt-0.5">Q{gs.currentQ + 1}</span>
            <p className="font-semibold text-gray-900 leading-relaxed">{q.q}</p>
          </div>

          <div className="space-y-2">
            {q.options.map((opt) => {
              const letter = opt[0]
              const chosen = selected === letter
              // After submitting this question, show correct/wrong colors
              const locked = !!isSubmitted
              const isCorrect = letter === q.answer
              return (
                <button
                  key={letter}
                  onClick={() => {
                    if (!locked) set({ answers: { ...gs.answers, [gs.currentQ]: letter }, showHint: false })
                  }}
                  disabled={locked}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    locked && isCorrect
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                      : locked && chosen && !isCorrect
                        ? 'bg-red-50 border-red-400 text-red-700'
                        : locked
                          ? 'border-gray-200 text-gray-400 cursor-default'
                          : chosen
                            ? 'bg-brand-50 border-brand-400 text-brand-800 ring-2 ring-brand-200'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt}
                  {locked && isCorrect && <span className="ml-2 text-emerald-500 font-bold">✓</span>}
                  {locked && chosen && !isCorrect && <span className="ml-2 text-red-400 font-bold">✗</span>}
                </button>
              )
            })}
          </div>

          {/* Change-answer notice */}
          {selected && !isSubmitted && (
            <p className="text-xs text-gray-400 italic text-center">
              You can change your answer before clicking Next.
            </p>
          )}

          {/* Athena hint */}
          {!gs.hardMode && !isSubmitted && (
            <button
              onClick={() => set({ showHint: !gs.showHint })}
              className="text-xs text-brand-500 hover:text-brand-700 flex items-center gap-1"
            >
              🦉 {gs.showHint ? 'Hide hint' : 'Ask Athena for a hint'}
            </button>
          )}
          {gs.showHint && !isSubmitted && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800">
              <span className="font-semibold">🦉 Athena:</span> {q.hint}
            </div>
          )}

          {/* After lock: show explanation */}
          {isSubmitted && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-800">
              <span className="font-semibold">📖 Answer:</span> {getAnswerText(q, q.answer)}
              {q.hint && <p className="mt-1 text-blue-600">🦉 {q.hint}</p>}
            </div>
          )}

          {/* Next button — appears when an answer is selected */}
          {selected && (
            <button
              onClick={() => {
                if (!isSubmitted) {
                  // Lock in this answer
                  const newSubmitted = { ...(gs.submitted ?? {}), [gs.currentQ]: true }
                  if (isLast) {
                    const score = Object.entries({ ...gs.answers }).filter(([i, a]) => a === islandQs[+i].answer).length
                    const passed = score >= ISLAND_PASS
                    if (passed && !gs.completedIslands.includes(gs.currentIsland)) {
                      const updated = [...gs.completedIslands, gs.currentIsland]
                      set({ phase: 'island-result', completedIslands: updated, submitted: newSubmitted })
                      if (user) awardXP(user.id, 30, 'island')
                    } else {
                      set({ phase: 'island-result', submitted: newSubmitted })
                    }
                  } else {
                    set({ submitted: newSubmitted, currentQ: gs.currentQ + 1, showHint: false })
                  }
                }
              }}
              className="btn-primary"
            >
              {isLast ? '📊 See Results' : 'Next →'}
            </button>
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
        {passed && <Confetti show={!!celebration} message={celebration?.message} sub={celebration?.sub} />}
        {/* Score card with illustration */}
        <div className={`card text-center ${passed ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <div className="text-5xl mb-3">{passed ? '🏆' : '💪'}</div>
          <h2 className="text-xl font-bold text-gray-900">{islandData.name}</h2>
          <p className="text-3xl font-bold mt-2 mb-1 text-gray-900">{score}/{total}</p>
          <p className={`font-semibold ${passed ? 'text-emerald-700' : 'text-red-600'}`}>
            {passed ? `Island Conquered! +30 XP` : `Need ${ISLAND_PASS}/${total} to pass. Try again!`}
          </p>
          {passed && islandData.crew && (
            <p className="text-sm text-gray-600 mt-2">🧑‍✈️ {islandData.crew} joins your crew!</p>
          )}
        </div>

        {/* Answer review — show full answer text */}
        <div className="space-y-3">
          {islandQs.map((q, i) => {
            const ua = gs.answers[i]
            const correct = ua === q.answer
            return (
              <div key={i} className={`card border-l-4 ${correct ? 'border-emerald-400' : 'border-red-400'} py-3 px-4`}>
                <p className="text-sm font-medium text-gray-800 mb-1">
                  <span className={correct ? 'text-emerald-600' : 'text-red-500'}>{correct ? '✓' : '✗'}</span>
                  {' '}{q.q}
                </p>
                {!correct && (
                  <p className="text-xs text-red-500 mb-1">
                    Your answer: <strong>{getAnswerText(q, ua)}</strong>
                  </p>
                )}
                <p className="text-xs text-emerald-700 mb-1">
                  ✅ Correct answer: <strong>{getAnswerText(q, q.answer)}</strong>
                </p>
                {!gs.hardMode && q.hint && (
                  <p className="text-xs text-gray-500 bg-amber-50 rounded-lg p-2 mt-1">🦉 {q.hint}</p>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={() => set({ phase: 'map' })} className="btn-outline">← Back to Map</button>
          {!passed && (
            <button
              onClick={() => set({
                phase: 'island', currentQ: 0, answers: {}, submitted: {}, showHint: false,
                // Failing an island reshuffles every island's question pool to avoid repeats
                islandPools: rerollAllIslands(),
              })}
              className="btn-primary"
            >
              🔄 Try Again (questions reshuffled)
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── MUTINY EVENT ─────────────────────────────────────────────────────────
  if (gs.phase === 'mutiny') {
    const q = mutinyQs[gs.mutinyQ]
    const isLast = gs.mutinyQ === mutinyQs.length - 1
    const selected = gs.mutinyAnswers[gs.mutinyQ]
    const isSubmitted = gs.mutinySubmitted?.[gs.mutinyQ]

    return (
      <div className="max-w-2xl space-y-5 animate-fade-in">
        <OwlHelper show={stuck} />
        <div className="card bg-gradient-to-r from-red-500 to-orange-400 text-white">
          {/* Mutiny illustration */}
          <div className="font-mono text-center text-sm mb-3 opacity-80 select-none leading-tight">
            <div>⚡ 😤 👤 👤 👤 😤 ⚡</div>
            <div>{'  '}⚓{'  '}YOUR CREW{'  '}⚓</div>
            <div>🌊🌊🌊🌊🌊🌊🌊🌊🌊</div>
          </div>
          <div className="text-3xl mb-2">⚡ MUTINY!</div>
          <p className="font-bold text-lg">Your crew is in conflict.</p>
          <p className="text-sm text-red-100 mt-1">
            Eurylochus has stirred unrest. Answer wisely to restore harmony aboard the Elpis.
          </p>
          <p className="text-xs text-red-200 mt-2">Question {gs.mutinyQ + 1} of {mutinyQs.length}</p>
        </div>

        <div className="card space-y-4">
          <p className="font-semibold text-gray-900 leading-relaxed">{q.q}</p>
          <div className="space-y-2">
            {q.options.map((opt) => {
              const letter = opt[0]
              const chosen = selected === letter
              const locked = !!isSubmitted
              const isCorrect = letter === q.answer
              return (
                <button
                  key={letter}
                  onClick={() => { if (!locked) set({ mutinyAnswers: { ...gs.mutinyAnswers, [gs.mutinyQ]: letter } }) }}
                  disabled={locked}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    locked && isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-800' :
                    locked && chosen && !isCorrect ? 'bg-red-50 border-red-400 text-red-700' :
                    locked ? 'border-gray-200 text-gray-400 cursor-default' :
                    chosen ? 'bg-brand-50 border-brand-400 text-brand-800 ring-2 ring-brand-200' :
                    'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
          {selected && !isSubmitted && (
            <p className="text-xs text-gray-400 italic text-center">You can change your answer before clicking Next.</p>
          )}
          {selected && (
            <button
              onClick={() => {
                if (!isSubmitted) {
                  const newSub = { ...(gs.mutinySubmitted ?? {}), [gs.mutinyQ]: true }
                  if (isLast) set({ phase: 'mutiny-result', mutinySubmitted: newSub })
                  else set({ mutinyQ: gs.mutinyQ + 1, mutinySubmitted: newSub })
                }
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
        <p className="text-gray-500 text-sm">{score}/{mutinyQs.length} correct leadership choices</p>
        <button onClick={() => set({ phase: 'map', mutinyDone: true })} className="btn-primary mx-auto">
          🗺️ Return to Map
        </button>
      </div>
    )
  }

  // ── OLYMPUS EXAM ─────────────────────────────────────────────────────────
  if (gs.phase === 'olympus') {
    const q = olympusQs[gs.olympusQ]
    const selected = gs.olympusAnswers[gs.olympusQ]
    const isSubmitted = gs.olympusSubmitted?.[gs.olympusQ]
    const isLast = gs.olympusQ === olympusQs.length - 1

    return (
      <div className="max-w-2xl space-y-5 animate-fade-in">
        <OwlHelper show={stuck} />
        <div className="card bg-gradient-to-r from-brand-700 to-indigo-600 text-white">
          {/* Olympus illustration */}
          <div className="font-mono text-center text-sm mb-2 opacity-70 select-none leading-tight">
            <div>{'    '}⚡{'  '}🏛️{'  '}⚡</div>
            <div>{'  '}{'╱‾‾‾‾‾‾‾‾‾╲'}</div>
            <div>{'╱'}{'  '}OLYMPUS{'  '}{'╲'}</div>
          </div>
          <div className="text-2xl mb-1">🏛️ Mount Olympus Exam</div>
          <p className="text-indigo-200 text-sm">Score {OLYMPUS_PASS}/{olympusQs.length} or higher to enter the Academy.</p>
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
              const locked = !!isSubmitted
              const isCorrect = letter === q.answer
              return (
                <button
                  key={letter}
                  onClick={() => { if (!locked) set({ olympusAnswers: { ...gs.olympusAnswers, [gs.olympusQ]: letter } }) }}
                  disabled={locked}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    locked && isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-800' :
                    locked && chosen && !isCorrect ? 'bg-red-50 border-red-400 text-red-700' :
                    locked ? 'border-gray-200 text-gray-400 cursor-default' :
                    chosen ? 'bg-brand-50 border-brand-400 text-brand-800 ring-2 ring-brand-200' :
                    'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {selected && !isSubmitted && (
            <p className="text-xs text-gray-400 italic text-center">You can change your answer before clicking Next.</p>
          )}

          {!gs.hardMode && !isSubmitted && (
            <button onClick={() => set({ showHint: !gs.showHint })} className="text-xs text-brand-500 hover:text-brand-700">
              🦉 {gs.showHint ? 'Hide hint' : 'Ask Athena for a hint'}
            </button>
          )}
          {!gs.hardMode && gs.showHint && !isSubmitted && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800">
              🦉 <strong>Athena:</strong> {q.hint}
            </div>
          )}

          {isSubmitted && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-800">
              <span className="font-semibold">📖 Correct answer:</span> {getAnswerText(q, q.answer)}
              {!gs.hardMode && q.hint && <p className="mt-1 text-blue-600">🦉 {q.hint}</p>}
            </div>
          )}

          {selected && (
            <button
              onClick={() => {
                if (!isSubmitted) {
                  const newSub = { ...(gs.olympusSubmitted ?? {}), [gs.olympusQ]: true }
                  if (isLast) {
                    const score = Object.entries({ ...gs.olympusAnswers, [gs.olympusQ]: selected })
                      .filter(([i, a]) => a === olympusQs[+i].answer).length
                    const passed = score >= OLYMPUS_PASS
                    set({ phase: passed ? 'win' : 'fail', showHint: false, olympusSubmitted: newSub })
                    if (passed && user && !gs.xpAwarded) {
                      awardXP(user.id, gs.hardMode ? 200 : 100, 'olympus')
                      set({ xpAwarded: true })
                    }
                  } else {
                    set({ olympusQ: gs.olympusQ + 1, showHint: false, olympusSubmitted: newSub })
                  }
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
        <Confetti show={!!celebration} message={celebration?.message} sub={celebration?.sub} />
        {/* Win illustration */}
        <div className="font-mono text-center text-base select-none bg-gradient-to-b from-amber-50 to-yellow-50 rounded-2xl py-4 border border-amber-100">
          <div className="text-2xl">⚡{'  '}⭐{'  '}⚡</div>
          <div className="text-4xl my-1">🏛️</div>
          <div className="text-lg text-amber-600 font-bold">OLYMPUS ACADEMY</div>
          <div className="text-sm text-amber-400">✨ Gates Open ✨</div>
          <div className="text-2xl mt-1">🎉{'  '}🏆{'  '}🎉</div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          {gs.legendaryMode ? '🔥 Legendary Status Achieved!' : gs.hardMode ? '⚡ Legend of Olympus!' : '🎉 You Made It!'}
        </h1>
        <p className="text-gray-600">
          {gs.legendaryMode
            ? "Even Zeus is impressed. You have braved the Underworld, outwitted Prometheus, and unlocked the secrets of Atlantis. No trial in this world — or the next — can shake you now."
            : gs.hardMode
            ? "You have conquered the hardest trial the gods could devise. Your name is etched in the Hall of Olympus forever. Athena herself bows in respect."
            : "The gates of Mount Olympus Academy open wide. The gods applaud as you walk through. Back home, Nanay Penelope wipes tears of joy, and little Telemo runs to embrace you. You did it."}
        </p>
        <p className="text-2xl font-bold text-brand-600">{score}/{olympusQs.length} correct ✨ {gs.legendaryMode ? '+300 XP' : gs.hardMode ? '+200 XP' : '+100 XP'}</p>
        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-6 border border-amber-200">
          <p className="text-2xl mb-2">👨‍👩‍👦</p>
          <p className="text-sm text-amber-800 font-medium italic">
            "Ang taong may kaalaman ay may kapangyarihan."<br/>
            <span className="text-xs text-amber-600">(A person with knowledge has power.)</span>
          </p>
        </div>
        {!gs.hardMode && !gs.legendaryMode && (
          canAccessPremium ? (
            <button
              onClick={() => set({ phase: 'hard-intro', hardMode: true, completedIslands: [], mutinyDone: false, currentIsland: null, xpAwarded: false })}
              className="btn-primary mx-auto"
            >
              ⚡ Try Hard Mode
            </button>
          ) : (
            <div className="text-center space-y-1">
              <button disabled className="btn-primary mx-auto opacity-60 cursor-not-allowed">
                🔒 Hard Mode
              </button>
              <p className="text-xs text-gray-400">Subscribe to unlock Hard Mode and earn +200 XP</p>
            </div>
          )
        )}
        {gs.hardMode && !gs.legendaryMode && (
          <button
            onClick={() => set({
              phase: 'legendary-intro', legendaryMode: true, hardMode: false, completedIslands: [], mutinyDone: false,
              currentIsland: null, xpAwarded: false, islandPools: {}, olympusPool: null,
            })}
            className="btn-primary mx-auto bg-purple-600 hover:bg-purple-700"
          >
            🔥 Enter Legendary Mode
          </button>
        )}
        {gs.legendaryMode && (
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
        {/* Fail illustration */}
        <div className="font-mono text-center text-base select-none bg-blue-50 rounded-2xl py-4 border border-blue-100">
          <div className="text-3xl">🌊🌊🌊</div>
          <div className="text-2xl text-gray-400 my-1">⛵💧</div>
          <div className="text-sm text-blue-400">The storm has passed...</div>
          <div className="text-xs text-gray-400 mt-1">but the journey isn't over</div>
        </div>
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
            <button onClick={() => set({
              phase: 'training', trainingDay: 0, trainingQ: 0, trainingAnswers: {}, trainingSubmitted: {}, trainingDaysComplete: [],
              trainingPool: pickQuestions(user?.id, TRAINING_QUESTIONS, Math.min(10, TRAINING_QUESTIONS.length), { record: false }),
            })} className="btn-primary w-full justify-center">
              🦉 Begin Athena's Training
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-48 mx-auto">
            <button onClick={() => set({ ...INIT, hardMode: false })} className="btn-primary justify-center">
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
      <div className="font-mono text-center text-base select-none bg-gray-900 text-yellow-400 rounded-xl py-4">
        <div>⚡{'   '}⚡{'   '}⚡</div>
        <div className="text-xl font-bold my-1">HARD MODE</div>
        <div className="text-sm">The gods grow impatient.</div>
      </div>
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

  // ── LEGENDARY MODE INTRO ─────────────────────────────────────────────────
  if (gs.phase === 'legendary-intro') return (
    <div className="max-w-xl mx-auto card text-center space-y-4 animate-fade-in">
      <div className="font-mono text-center text-base select-none bg-gradient-to-b from-purple-900 to-slate-900 text-orange-300 rounded-xl py-4">
        <div>🔥{'   '}💀{'   '}🔱</div>
        <div className="text-xl font-bold my-1">LEGENDARY MODE</div>
        <div className="text-sm text-purple-200">Beyond Olympus lies a darker sea...</div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Three New Islands Await</h2>
      <div className="text-left bg-gray-50 rounded-xl p-4 text-sm text-gray-700 space-y-2">
        <p>💀 <strong>Gates of the Underworld</strong> — Hades blends every science subject into one trial</p>
        <p>🔥 <strong>Prometheus' Forge</strong> — pure critical thinking and scientific reasoning, no formulas</p>
        <p>🔱 <strong>Lost Atlantis</strong> — advanced math and physics from the sunken city</p>
        <p>👑 <strong>Trial of Zeus</strong> — an all-new, even tougher final exam (need 7/12 to pass)</p>
        <p>🏆 Win? → Become a true Legend (+300 XP)</p>
      </div>
      <button onClick={() => set({ phase: 'map', islandPools: rerollAllIslands() })} className="btn-primary mx-auto bg-purple-600 hover:bg-purple-700">
        🔥 Set Sail into Legend
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
        <div className="font-mono text-center text-base select-none bg-amber-50 rounded-xl py-3">
          <div>🦉{'  '}✨{'  '}🦉</div>
          <div className="text-amber-600 font-bold">TRAINING COMPLETE</div>
          <div>{'✓ '.repeat(daysNeeded)}</div>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Training Complete!</h2>
        <p className="text-gray-600">Athena nods with approval. "You are ready, young scholar. Return to Olympus."</p>
        <div className="flex gap-2 justify-center">
          {Array.from({ length: daysNeeded }, (_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">✓</div>
          ))}
        </div>
        <button onClick={() => set({ phase: 'map', completedIslands: ISLANDS.map(i => i.id), mutinyDone: true, olympusQ: 0, olympusAnswers: {}, olympusSubmitted: {}, xpAwarded: false })} className="btn-primary mx-auto">
          🏛️ Challenge Olympus Again
        </button>
      </div>
    )

    const trainingQs = gs.trainingPool ?? TRAINING_QUESTIONS.slice(0, 10)
    const tq = trainingQs[gs.trainingQ]
    const tSelected = gs.trainingAnswers[gs.trainingQ]
    const tSubmitted = gs.trainingSubmitted?.[gs.trainingQ]
    const isLast = gs.trainingQ === trainingQs.length - 1

    return (
      <div className="max-w-2xl space-y-5 animate-fade-in">
        <OwlHelper show={stuck} />
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
              const locked = !!tSubmitted
              const isCorrect = letter === tq.answer
              return (
                <button
                  key={letter}
                  onClick={() => { if (!locked) set({ trainingAnswers: { ...gs.trainingAnswers, [gs.trainingQ]: letter } }) }}
                  disabled={locked}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    locked && isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-800' :
                    locked && chosen && !isCorrect ? 'bg-red-50 border-red-400 text-red-700' :
                    locked ? 'border-gray-200 text-gray-400 cursor-default' :
                    chosen ? 'bg-brand-50 border-brand-400 ring-2 ring-brand-200' :
                    'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {tSelected && !tSubmitted && (
            <p className="text-xs text-gray-400 italic text-center">You can change your answer before clicking Next.</p>
          )}

          {tSubmitted && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800">
              📖 <strong>Correct answer:</strong> {getAnswerText(tq, tq.answer)}
              {tq.hint && <p className="mt-1">🦉 <strong>Athena:</strong> {tq.hint}</p>}
            </div>
          )}

          {tSelected && (
            <button
              onClick={() => {
                if (!tSubmitted) {
                  const newSub = { ...(gs.trainingSubmitted ?? {}), [gs.trainingQ]: true }
                  if (isLast) {
                    set({
                      trainingDaysComplete: [...gs.trainingDaysComplete, daysDone], trainingQ: 0, trainingAnswers: {}, trainingSubmitted: {},
                      trainingPool: pickQuestions(user?.id, TRAINING_QUESTIONS, Math.min(10, TRAINING_QUESTIONS.length), { record: false }),
                    })
                  } else {
                    set({ trainingQ: gs.trainingQ + 1, trainingSubmitted: newSub })
                  }
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
