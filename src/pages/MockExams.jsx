import { useState } from 'react'
import useStore from '@/store/useStore'
import { getQuestionsBySubject, getFullExam, SUBJECTS } from '@/data/questions'
import CountdownTimer from '@/components/exam/CountdownTimer'
import NavigationDots from '@/components/exam/NavigationDots'

const EXAM_TIME = 50 * 60 // 50 minutes for full exam, 15 min per subject

export default function MockExams() {
  const { user, saveExamAttempt } = useStore()

  const [phase, setPhase] = useState('select') // select | exam | result
  const [examType, setExamType] = useState('full') // full | Biology | Chemistry | Physics | Earth Science
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({}) // { [questionIdx]: 'A'|'B'|'C'|'D' }
  const [result, setResult] = useState(null)
  const [xpEarned, setXpEarned] = useState(0)

  function startExam() {
    const qs = examType === 'full' ? getFullExam() : getQuestionsBySubject(examType)
    setQuestions(qs)
    setAnswers({})
    setCurrent(0)
    setResult(null)
    setPhase('exam')
  }

  async function submitExam() {
    const score = questions.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0)
    const total = questions.length
    const subject = examType === 'full' ? 'Full Exam' : examType
    const { xpEarned: xp } = await saveExamAttempt(user.id, { subject, score, total, answers })
    setResult({ score, total, answers: { ...answers } })
    setXpEarned(xp)
    setPhase('result')
  }

  function handleAnswer(letter) {
    setAnswers((prev) => ({ ...prev, [current]: letter }))
  }

  // ── SELECT PHASE ──────────────────────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📝 Mock Exams</h1>
          <p className="text-gray-500 text-sm mt-1">PSHS-style multiple-choice questions — choose a subject or take the full exam.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['full', ...SUBJECTS].map((type) => (
            <button
              key={type}
              onClick={() => { setExamType(type); setPhase('confirm') }}
              className={`card text-left hover:shadow-md hover:border-brand-200 transition-all ${
                examType === type ? 'border-brand-400 ring-2 ring-brand-200' : ''
              }`}
            >
              <p className="font-semibold text-gray-900">{type === 'full' ? '🔬 Full Exam (40 questions)' : `🧪 ${type} (10 questions)`}</p>
              <p className="text-xs text-gray-500 mt-1">
                {type === 'full' ? '10 questions per subject · 50 minutes' : `15 minutes · ${type} only`}
              </p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── CONFIRM PHASE ─────────────────────────────────────────────────────────
  if (phase === 'confirm') {
    return (
      <div className="max-w-md mx-auto animate-fade-in">
        <div className="card text-center space-y-4">
          <p className="text-4xl">📋</p>
          <h2 className="text-xl font-bold text-gray-900">
            {examType === 'full' ? 'Full Science Exam' : `${examType} Quiz`}
          </h2>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Questions: <strong className="text-gray-800">{examType === 'full' ? 40 : 10}</strong></p>
            <p>Time limit: <strong className="text-gray-800">{examType === 'full' ? '50 minutes' : '15 minutes'}</strong></p>
            <p>XP reward: <strong className="text-amber-600">20–75 XP</strong> based on score</p>
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <button onClick={() => setPhase('select')} className="btn-outline">← Back</button>
            <button onClick={startExam} className="btn-primary">Start Exam →</button>
          </div>
        </div>
      </div>
    )
  }

  // ── EXAM PHASE ────────────────────────────────────────────────────────────
  if (phase === 'exam') {
    const q = questions[current]
    const totalTime = examType === 'full' ? EXAM_TIME : 15 * 60
    const answered = new Set(Object.keys(answers).map(Number))

    return (
      <div className="space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {examType === 'full' ? 'Full Science Exam' : `${examType} Quiz`}
            </h1>
            <p className="text-xs text-gray-500">Question {current + 1} of {questions.length}</p>
          </div>
          <CountdownTimer totalSeconds={totalTime} onExpire={submitExam} />
        </div>

        {/* Navigation dots */}
        <NavigationDots
          total={questions.length}
          current={current}
          answered={answered}
          onJump={setCurrent}
        />

        {/* Question card */}
        <div className="card space-y-4">
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-7 h-7 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">
              {current + 1}
            </span>
            <p className="font-medium text-gray-900 leading-relaxed">{q.question}</p>
          </div>
          <div className="space-y-2">
            {q.options.map((opt) => {
              const letter = opt[0]
              const selected = answers[current] === letter
              return (
                <button
                  key={letter}
                  onClick={() => handleAnswer(letter)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    selected
                      ? 'bg-brand-50 border-brand-400 text-brand-800'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="btn-outline"
          >← Prev</button>
          <span className="text-sm text-gray-500">{answered.size}/{questions.length} answered</span>
          {current < questions.length - 1 ? (
            <button onClick={() => setCurrent((c) => c + 1)} className="btn-primary">Next →</button>
          ) : (
            <button
              onClick={submitExam}
              className="btn-primary bg-emerald-600 hover:bg-emerald-700"
            >
              Submit ✓
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── RESULT PHASE ──────────────────────────────────────────────────────────
  if (phase === 'result' && result) {
    const pct = Math.round((result.score / result.total) * 100)
    const grade = pct >= 90 ? '🏆 Excellent!' : pct >= 75 ? '🌟 Great job!' : pct >= 60 ? '👍 Good effort!' : '📖 Keep studying!'

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Score card */}
        <div className="card text-center space-y-3">
          <p className="text-5xl font-bold text-brand-600">{pct}%</p>
          <p className="text-xl font-semibold text-gray-800">{grade}</p>
          <p className="text-gray-500 text-sm">{result.score} / {result.total} correct</p>
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl text-sm font-semibold">
            ✨ +{xpEarned} XP earned
          </div>
        </div>

        {/* Review answers */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Answer Review</h2>
          <div className="space-y-4">
            {questions.map((q, i) => {
              const userAns = result.answers[i]
              const correct = userAns === q.answer
              return (
                <div key={q.id} className={`card border-l-4 ${correct ? 'border-emerald-400' : 'border-red-400'}`}>
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    <span className={`mr-2 ${correct ? 'text-emerald-600' : 'text-red-500'}`}>{correct ? '✓' : '✗'}</span>
                    Q{i + 1}. {q.question}
                  </p>
                  {!correct && (
                    <p className="text-xs text-red-600 mb-1">Your answer: {userAns ?? 'Not answered'}</p>
                  )}
                  <p className="text-xs text-emerald-700 mb-2">Correct: {q.answer}</p>
                  <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">{q.explanation}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setPhase('select')} className="btn-outline">← Choose another exam</button>
          <button onClick={() => { setPhase('confirm') }} className="btn-primary">Retry same exam</button>
        </div>
      </div>
    )
  }

  return null
}
