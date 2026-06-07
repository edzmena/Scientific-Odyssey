import { useState, useEffect } from 'react'

const CATEGORIES = [
  {
    title: '📝 Documents & Requirements',
    items: [
      'Secure Official Report Card (Form 138) for Grade 5',
      'Prepare 2×2 and 1×1 ID photos (white background)',
      'Check PSA Birth Certificate (original + 1 photocopy)',
      'Ask school for Certificate of Enrollment',
      'Verify exam fee payment requirements',
      'Download and fill out application form from exam website',
      'Double-check all submission deadlines',
    ],
  },
  {
    title: '🔬 Science Review Topics',
    items: [
      'Biology: Cell structure & function, photosynthesis, respiration',
      'Biology: Genetics basics, ecosystems, classification',
      'Chemistry: Atoms, molecules, periodic table, mixtures vs. compounds',
      'Chemistry: Physical & chemical changes, acids & bases',
      'Physics: Forces, motion, Newton\'s Laws, energy',
      'Physics: Waves, light, electricity basics',
      'Earth Science: Rock cycle, plate tectonics, atmosphere layers',
      'Earth Science: Solar system, seasons, water cycle',
    ],
  },
  {
    title: '🧮 Math Review Topics',
    items: [
      'Fractions, decimals, and percentages',
      'Ratios and proportions',
      'Area, perimeter, and volume',
      'Patterns, sequences, and algebraic thinking',
      'Word problems and logical reasoning',
      'Graphs and data interpretation',
    ],
  },
  {
    title: '📖 Language & Reading',
    items: [
      'Reading comprehension — timed practice (15–20 min sessions)',
      'Vocabulary in context — science terminology',
      'Analogies and word relationships',
      'Non-verbal reasoning and pattern recognition',
    ],
  },
  {
    title: '🎤 Interview Preparation',
    items: [
      'Practice daily using the Mock Interview section',
      'Know your "Why this school?" answer cold',
      'Prepare 2–3 science topics you can discuss confidently',
      'Practice speaking clearly and slowly — pace yourself',
      'Read recent science news (NASA, DOST, PhilStar Science)',
      'Know your favorite scientist and their contribution',
      'Dress rehearsal: wear your school uniform, stand/sit properly',
    ],
  },
  {
    title: '🗓️ Exam Day Logistics',
    items: [
      'Visit the exam venue the day before (check commute time)',
      'Prepare exam materials: pencils, eraser, ID, permit',
      'Sleep by 9:30 PM the night before',
      'Eat a proper breakfast — avoid heavy food',
      'Arrive at least 30 minutes before the exam starts',
      'Bring water and a small snack for the break',
      'Read all instructions carefully before answering',
    ],
  },
  {
    title: '🧘 Mental & Physical Wellness',
    items: [
      'Exercise for 20–30 min daily during review period',
      'Avoid all-night cramming in the final week',
      'Practice deep breathing before the exam',
      'Study with breaks — use the Pomodoro timer',
      'Talk to a parent, teacher, or friend if you feel anxious',
    ],
  },
]

const STORAGE_KEY = 'sciodyssey_prep_checklist'

export default function ExamPrepPlan() {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
    } catch { return {} }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
  }, [checked])

  function toggle(key) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const allItems = CATEGORIES.flatMap((c) => c.items)
  const doneCount = allItems.filter((_, i) => checked[i]).length

  // Build a flat index map
  let globalIdx = 0

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">🗓️ Exam Prep Plan</h1>
        <p className="text-gray-500 text-sm mt-1">Your complete checklist for science high school entrance exams.</p>
      </div>

      {/* Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-gray-900">Overall Progress</p>
          <p className="text-sm font-bold text-brand-600">{doneCount}/{allItems.length}</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-brand-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(doneCount / allItems.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{Math.round((doneCount / allItems.length) * 100)}% complete</p>
      </div>

      {/* Category checklists */}
      {CATEGORIES.map((cat) => {
        const startIdx = globalIdx
        globalIdx += cat.items.length
        const catDone = cat.items.filter((_, i) => checked[startIdx + i]).length

        return (
          <div key={cat.title} className="card space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900">{cat.title}</h2>
              <span className="text-xs font-semibold text-gray-500">{catDone}/{cat.items.length}</span>
            </div>
            <div className="space-y-2">
              {cat.items.map((item, i) => {
                const key = startIdx + i
                return (
                  <label key={key} className="flex items-start gap-3 cursor-pointer group">
                    <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      checked[key] ? 'bg-brand-600 border-brand-600' : 'border-gray-300 group-hover:border-brand-400'
                    }`}
                      onClick={() => toggle(key)}
                    >
                      {checked[key] && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span
                      onClick={() => toggle(key)}
                      className={`text-sm leading-relaxed ${checked[key] ? 'line-through text-gray-400' : 'text-gray-700'}`}
                    >
                      {item}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}

      <div className="text-center">
        <button
          onClick={() => { if (window.confirm('Reset all checkboxes?')) setChecked({}) }}
          className="btn-outline text-xs"
        >
          Reset checklist
        </button>
      </div>
    </div>
  )
}
