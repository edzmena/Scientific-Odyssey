import PomodoroTimer from '@/components/pomodoro/PomodoroTimer'

const TECHNIQUES = [
  {
    icon: '🍅',
    title: 'Pomodoro Technique',
    subtitle: '25-min focus bursts',
    color: 'bg-red-50 border-red-100',
    iconBg: 'bg-red-100 text-red-700',
    steps: [
      'Set your timer to 25 minutes.',
      'Focus on ONE subject — no distractions.',
      'Take a 5-minute break when the timer rings.',
      'After 4 pomodoros, take a 15-minute long break.',
    ],
    tip: 'Close all social media tabs. Put your phone face-down. 25 minutes of deep focus beats 2 hours of distracted studying.',
  },
  {
    icon: '🃏',
    title: 'Active Recall (Flashcards)',
    subtitle: 'Test yourself — don\'t just re-read',
    color: 'bg-blue-50 border-blue-100',
    iconBg: 'bg-blue-100 text-blue-700',
    steps: [
      'Write a question on one side of a card.',
      'Write the answer on the other side.',
      'Test yourself — say the answer before flipping.',
      'Mark cards as "easy," "medium," or "hard."',
      'Review hard cards daily, easy cards weekly.',
    ],
    tip: 'Research shows active recall is 3× more effective than re-reading notes. Apps like Anki use spaced repetition for free.',
  },
  {
    icon: '🗺️',
    title: 'Mind Mapping',
    subtitle: 'Connect concepts visually',
    color: 'bg-emerald-50 border-emerald-100',
    iconBg: 'bg-emerald-100 text-emerald-700',
    steps: [
      'Write your main topic in the center.',
      'Draw branches for each key concept.',
      'Add sub-branches for supporting details.',
      'Use colors, icons, and short keywords.',
      'Redraw your map from memory to test yourself.',
    ],
    tip: 'Great for Biology (body systems), Earth Science (rock cycle), or Chemistry (element families). One sheet of paper = 1 chapter.',
  },
  {
    icon: '🔬',
    title: 'Feynman Technique',
    subtitle: 'Teach it to learn it',
    color: 'bg-purple-50 border-purple-100',
    iconBg: 'bg-purple-100 text-purple-700',
    steps: [
      'Choose a science concept you want to master.',
      'Explain it out loud as if teaching a Grade 4 student.',
      'Notice where you get stuck or use vague words.',
      'Go back to your notes and fill those gaps.',
      'Simplify again using analogies and plain language.',
    ],
    tip: 'If you can\'t explain photosynthesis without using the word "photosynthesis," you don\'t understand it yet. That\'s okay — that\'s the whole point!',
  },
  {
    icon: '📅',
    title: 'Spaced Repetition',
    subtitle: 'Review at increasing intervals',
    color: 'bg-amber-50 border-amber-100',
    iconBg: 'bg-amber-100 text-amber-700',
    steps: [
      'Day 1: Learn new material.',
      'Day 2: Review what you studied yesterday.',
      'Day 4: Review again.',
      'Day 8, then Day 16: Review at wider intervals.',
      'Use Anki or a handwritten review schedule.',
    ],
    tip: 'Your brain strengthens memories right before they fade. Spaced repetition uses this to make forgetting almost impossible before your exam.',
  },
  {
    icon: '✍️',
    title: 'Cornell Note-Taking',
    subtitle: 'Smart structured notes',
    color: 'bg-indigo-50 border-indigo-100',
    iconBg: 'bg-indigo-100 text-indigo-700',
    steps: [
      'Divide your paper into 3 sections: Notes (right, big), Cues (left, narrow), Summary (bottom).',
      'Take regular notes in the right column during study.',
      'After studying, write keywords/questions in the left cue column.',
      'Write a 2-3 sentence summary at the bottom.',
      'Use the cue column to quiz yourself later.',
    ],
    tip: 'Cover the right side and only look at your cue column. Can you remember everything? This is passive-to-active recall.',
  },
]

export default function StudyTechniques() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📚 Study Techniques</h1>
        <p className="text-gray-500 text-sm mt-1">Science-backed strategies used by top-performing students.</p>
      </div>

      {/* Pomodoro timer */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">⏱ Pomodoro Timer</h2>
        <PomodoroTimer />
      </div>

      {/* Technique cards */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">🧠 Effective Study Methods</h2>
        <div className="grid gap-5">
          {TECHNIQUES.map((t) => (
            <div key={t.title} className={`card border ${t.color}`}>
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg ${t.iconBg}`}>
                  {t.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{t.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{t.subtitle}</p>
                  <ol className="space-y-1 mb-3">
                    {t.steps.map((step, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-white border border-gray-200 text-xs font-bold flex items-center justify-center text-gray-500">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-gray-600 bg-white/70 rounded-lg p-2 border border-gray-100">
                    💡 <strong>Pro tip:</strong> {t.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
