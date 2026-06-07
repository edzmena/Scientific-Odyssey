import { useState } from 'react'
import useStore from '@/store/useStore'
import { getQuestionsBySubject, SUBJECTS } from '@/data/questions'
import MATH_QUESTIONS from '@/data/mathQuestions'
import VERBAL_QUESTIONS from '@/data/verbalQuestions'
import SCIENCE_ABILITY_QUESTIONS from '@/data/scienceAbilityQuestions'
import ABSTRACT_REASONING_QUESTIONS from '@/data/abstractReasoningQuestions'
import VISUAL_REASONING_QUESTIONS from '@/data/visualReasoningQuestions'
import VisualReasoningItem from '@/components/VisualReasoningItem'
import CountdownTimer from '@/components/exam/CountdownTimer'
import NavigationDots from '@/components/exam/NavigationDots'
import { pickQuestions } from '@/utils/questionHistory'

const EXAM_TIME = 110 * 60 // 110 minutes for the 100-question full exam

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

// Build a 100-question full exam by combining every question bank, using the
// 5-day no-repeat picker so users see fresh questions across sessions:
// 8 each of Biology/Chemistry/Physics/Earth Science (32) + 14 Math
// + 20 Verbal/English + 16 NCE Scientific Ability + 18 Abstract Reasoning = 100 total
function getHundredQuestionExam(userId) {
  const sciences = ['Biology', 'Chemistry', 'Physics', 'Earth Science']
    .flatMap((s) => pickQuestions(userId, getQuestionsBySubject(s), 8))
  const math = pickQuestions(userId, MATH_QUESTIONS, 14)
  const verbal = pickQuestions(userId, VERBAL_QUESTIONS, 20)
  const scienceAbility = pickQuestions(userId, SCIENCE_ABILITY_QUESTIONS, 16)
  const abstractReasoning = pickQuestions(userId, ABSTRACT_REASONING_QUESTIONS, 12)
  const visualReasoning = pickQuestions(userId, VISUAL_REASONING_QUESTIONS, 6)
  return shuffle([...sciences, ...math, ...verbal, ...scienceAbility, ...abstractReasoning, ...visualReasoning])
}

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
    let qs
    if (examType === 'full') qs = getHundredQuestionExam(user?.id)
    else if (examType === 'Math') qs = pickQuestions(user?.id, MATH_QUESTIONS, 15)
    else if (examType === 'English') qs = pickQuestions(user?.id, VERBAL_QUESTIONS, 20)
    else if (examType === 'NCE Science') qs = pickQuestions(user?.id, SCIENCE_ABILITY_QUESTIONS, 20)
    else if (examType === 'Abstract Reasoning') qs = pickQuestions(user?.id, ABSTRACT_REASONING_QUESTIONS, 20)
    else if (examType === 'Visual Reasoning') qs = pickQuestions(user?.id, VISUAL_REASONING_QUESTIONS, 8)
    else qs = pickQuestions(user?.id, getQuestionsBySubject(examType), 10)
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

        {/* Test-Taking Skills Strategies — from page 1 of the official NCE Reviewer */}
        <details className="card group">
          <summary className="cursor-pointer font-bold text-gray-900 list-none flex items-center justify-between">
            <span>🧭 Test-Taking Skills Strategies <span className="text-xs font-normal text-gray-400">(NCE Reviewer, p.1)</span></span>
            <span className="text-gray-400 text-sm group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <div className="mt-4 text-sm text-gray-600 space-y-4 leading-relaxed">
            <p>Having effective skills is essential to improve your examination performance and achieve good results. Below are strategic approaches to boost your chances of passing the test:</p>

            <div>
              <p className="font-semibold text-gray-800">1. Preparation for taking the NCE</p>
              <ul className="list-disc list-inside ml-2 space-y-1 mt-1">
                <li><strong>Study Plan</strong> — Organize your study by creating a plan. Understand the main concepts of the subjects covered.</li>
                <li><strong>Study Time</strong> — Allocate sufficient time for each subject. Avoid the urge to stay up late or cram the night before the examination.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-800">2. Practice Answering Test Questions</p>
              <ul className="list-disc list-inside ml-2 space-y-1 mt-1">
                <li><strong>Question Analysis</strong> — Read the questions carefully before providing an answer. Understanding the question structure and considering the expected type of answer can be helpful.</li>
                <li><strong>Matching Concepts</strong> — Whenever possible, align each answer with their relevance on the primary idea of the corresponding subject.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-800">3. Test Research</p>
              <ul className="list-disc list-inside ml-2 space-y-1 mt-1">
                <li><strong>Understanding Test Type</strong> — Identify the specific test format, whether it will be multiple-choice, true or false, essay, etc. Familiarize yourself with the test structures to enhance your comfort level during the examination.</li>
                <li><strong>Practice with Sample Questions</strong> — Engage with this reviewer to be familiar with the test style.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-800">4. Time Tactics</p>
              <ul className="list-disc list-inside ml-2 space-y-1 mt-1">
                <li><strong>Time Management</strong> — Know the allocated time for each part of the test. Avoid rushing and ensure ample time for every question or section.</li>
                <li><strong>Start with the Easy Parts</strong> — To maximize time utilization, begin by tackling questions that you find easier. This minimizes the risk of spending excessive time on more challenging sections.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-800">5. Focus on the Details</p>
              <ul className="list-disc list-inside ml-2 space-y-1 mt-1">
                <li><strong>Read Carefully</strong> — Scrutinize questions thoroughly and respond accurately. Ensure a clear understanding of each question before providing your answer.</li>
                <li><strong>Proofreading</strong> — If time permits, dedicate a moment to review and verify your answers before submission.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-800">6. Stay Calm and Confident</p>
              <ul className="list-disc list-inside ml-2 space-y-1 mt-1">
                <li><strong>Breathing</strong> — When you feel too nervous, take deep breaths to stay calm.</li>
                <li><strong>Positive Outlook</strong> — Avoid succumbing to negative thoughts. Believe in yourself and in your preparation.</li>
              </ul>
            </div>

            <p>By using these strategies, you can improve your test-taking abilities and ensure good results.</p>
            <p className="font-semibold text-gray-700">Good luck! — Admissions Office, DOST–PSHS System</p>
          </div>
        </details>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['full', ...SUBJECTS, 'NCE Science', 'Abstract Reasoning', 'Visual Reasoning'].map((type) => (
            <button
              key={type}
              onClick={() => { setExamType(type); setPhase('confirm') }}
              className={`card text-left hover:shadow-md hover:border-brand-200 transition-all ${
                examType === type ? 'border-brand-400 ring-2 ring-brand-200' : ''
              }`}
            >
              <p className="font-semibold text-gray-900">
                {type === 'full' ? '🔬 Full Exam (100 questions)'
                  : type === 'Math' ? '📐 Math / Quantitative (15 questions)'
                  : type === 'English' ? '📖 English / Verbal Aptitude (20 questions)'
                  : type === 'NCE Science' ? '🔭 NCE Scientific Ability (20 questions)'
                  : type === 'Abstract Reasoning' ? '🧩 Abstract Reasoning (20 questions)'
                  : type === 'Visual Reasoning' ? '🔷 Visual Reasoning (8 questions)'
                  : `🧪 ${type} (10 questions)`}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {type === 'full' ? 'All subjects + Math, English, NCE Science, Abstract & Visual Reasoning · 110 minutes'
                  : type === 'Math' ? '15 NCE-style quantitative questions · 25 minutes'
                  : type === 'English' ? '20 NCE verbal aptitude questions · 30 minutes'
                  : type === 'NCE Science' ? 'Data analysis, experiments, reasoning · 20 minutes'
                  : type === 'Abstract Reasoning' ? 'Patterns, sequences, analogies, logic puzzles · 25 minutes'
                  : type === 'Visual Reasoning' ? 'Shape matrices, sequences, odd-one-out diagrams · 20 minutes'
                  : `15 minutes · ${type} only`}
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
            <p>Questions: <strong className="text-gray-800">{examType === 'full' ? 100 : examType === 'Math' ? 15 : examType === 'English' ? 20 : examType === 'NCE Science' ? 20 : examType === 'Abstract Reasoning' ? 20 : examType === 'Visual Reasoning' ? 8 : 10}</strong></p>
            <p>Time limit: <strong className="text-gray-800">{examType === 'full' ? '110 minutes' : examType === 'Math' ? '25 minutes' : examType === 'English' ? '30 minutes' : examType === 'NCE Science' ? '30 minutes' : examType === 'Abstract Reasoning' ? '25 minutes' : examType === 'Visual Reasoning' ? '20 minutes' : '15 minutes'}</strong></p>
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
    const totalTime = examType === 'full' ? EXAM_TIME : examType === 'Math' ? 25 * 60 : examType === 'English' ? 30 * 60 : examType === 'NCE Science' ? 30 * 60 : examType === 'Abstract Reasoning' ? 25 * 60 : examType === 'Visual Reasoning' ? 20 * 60 : 15 * 60
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
          {q.kind ? (
            // Visual (matrix/sequence/odd-one-out) reasoning item — rendered as shapes
            <>
              <div className="flex items-start gap-3 mb-1">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                  {current + 1}
                </span>
                <span className="text-xs text-gray-400 mt-1.5">Visual Abstract Reasoning</span>
              </div>
              <VisualReasoningItem question={q} />
              <div className="flex justify-center gap-2 pt-1">
                {q.options.map((_, i) => {
                  const letter = ['A', 'B', 'C', 'D', 'E'][i]
                  const selected = answers[current] === letter
                  return (
                    <button
                      key={letter}
                      onClick={() => handleAnswer(letter)}
                      className={`w-10 h-10 rounded-xl border text-sm font-bold transition-all ${
                        selected
                          ? 'bg-brand-50 border-brand-400 text-brand-800 ring-2 ring-brand-200'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {letter}
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
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
                    Q{i + 1}. {q.kind ? (q.prompt ?? 'Visual reasoning item') : q.question}
                  </p>
                  {q.kind && (
                    <div className="mb-2 scale-90 origin-left"><VisualReasoningItem question={q} /></div>
                  )}
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
