import { useState } from 'react'
import useStore from '@/store/useStore'
import { useClaude } from '@/hooks/useClaude'
import INTERVIEW_QUESTIONS, { INTERVIEW_CATEGORIES, getQuestionsByCategory, getRandomInterviewQuestion } from '@/data/interviewQuestions'

export default function MockInterview() {
  const { user, saveInterviewSession } = useStore()
  const { call } = useClaude()

  const [phase, setPhase] = useState('select') // select | answer | feedback
  const [selectedQ, setSelectedQ] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)
  const [filterCat, setFilterCat] = useState('All')

  const displayed = filterCat === 'All'
    ? INTERVIEW_QUESTIONS
    : getQuestionsByCategory(filterCat)

  async function submitAnswer() {
    if (!answer.trim()) return
    setLoading(true)
    try {
      const system = `You are an expert interviewer for Philippine science high schools (PSHS, Manila Science, QCSHS).
Evaluate the student's interview answer. Be encouraging but honest. The student is a Grade 6 Filipino student.

Return ONLY valid JSON in this exact shape (no markdown, no extra text):
{
  "score": <integer 1-10>,
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "modelAnswer": "A short model answer (2-3 sentences)"
}`

      const messages = [
        {
          role: 'user',
          content: `Interview Question: "${selectedQ.question}"\n\nStudent's Answer: "${answer}"\n\nTip for this question: ${selectedQ.tip}`,
        },
      ]

      const raw = await call({ messages, system, max_tokens: 800 })
      const parsed = JSON.parse(raw)
      setFeedback(parsed)
      setScore(parsed.score)

      const { xpEarned: xp } = await saveInterviewSession(user.id, {
        questionId: selectedQ.id,
        question: selectedQ.question,
        answer,
        feedback: raw,
        score: parsed.score,
      })
      setXpEarned(xp)
      setPhase('feedback')
    } catch (err) {
      console.error(err)
      setFeedback({ error: 'Failed to get feedback. Please try again.' })
      setPhase('feedback')
    }
    setLoading(false)
  }

  // ── SELECT ────────────────────────────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🎤 Mock Interview</h1>
          <p className="text-gray-500 text-sm mt-1">Practice science high school interview questions with AI feedback from Claude.</p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {['All', ...INTERVIEW_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterCat === cat ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          {displayed.map((q) => (
            <button
              key={q.id}
              onClick={() => { setSelectedQ(q); setAnswer(''); setFeedback(''); setScore(null); setPhase('answer') }}
              className="card text-left hover:shadow-md hover:border-brand-200 transition-all"
            >
              <span className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-lg mb-2">{q.category}</span>
              <p className="text-sm font-medium text-gray-900">{q.question}</p>
              <p className="text-xs text-gray-400 mt-1">💡 {q.tip}</p>
            </button>
          ))}
        </div>

        <button
          onClick={() => { setSelectedQ(getRandomInterviewQuestion()); setAnswer(''); setFeedback(''); setScore(null); setPhase('answer') }}
          className="btn-secondary"
        >
          🎲 Random question
        </button>
      </div>
    )
  }

  // ── ANSWER ────────────────────────────────────────────────────────────────
  if (phase === 'answer') {
    return (
      <div className="max-w-2xl space-y-5 animate-fade-in">
        <button onClick={() => setPhase('select')} className="text-sm text-gray-500 hover:text-gray-800">← Back to questions</button>

        <div className="card">
          <span className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-lg mb-3">{selectedQ.category}</span>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{selectedQ.question}</h2>
          <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2">💡 {selectedQ.tip}</p>
        </div>

        <div className="card space-y-4">
          <label className="block text-sm font-semibold text-gray-700">Your Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here. Speak naturally — imagine you're in a real interview..."
            rows={6}
            className="input resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">{answer.length} characters</p>
            <button
              onClick={submitAnswer}
              disabled={loading || answer.trim().length < 20}
              className="btn-primary"
            >
              {loading ? '⏳ Getting feedback…' : '✨ Get AI Feedback'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── FEEDBACK ──────────────────────────────────────────────────────────────
  if (phase === 'feedback') {
    const fb = feedback

    return (
      <div className="max-w-2xl space-y-5 animate-fade-in">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Interview Feedback</h2>
          <p className="text-sm text-gray-500">{selectedQ.question}</p>
        </div>

        {fb.error ? (
          <div className="card text-red-600">{fb.error}</div>
        ) : (
          <>
            {/* Score */}
            <div className="card flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white ${
                score >= 8 ? 'bg-emerald-500' : score >= 6 ? 'bg-amber-500' : 'bg-red-500'
              }`}>
                {score}/10
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {score >= 8 ? '🏆 Excellent answer!' : score >= 6 ? '👍 Good answer!' : '📖 Needs improvement'}
                </p>
                <p className="text-xs text-amber-600 font-semibold">+{xpEarned} XP earned</p>
              </div>
            </div>

            {/* Strengths */}
            {fb.strengths?.length > 0 && (
              <div className="card">
                <h3 className="text-sm font-bold text-emerald-700 mb-2">✅ Strengths</h3>
                <ul className="space-y-1">
                  {fb.strengths.map((s, i) => <li key={i} className="text-sm text-gray-700">• {s}</li>)}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {fb.improvements?.length > 0 && (
              <div className="card">
                <h3 className="text-sm font-bold text-amber-700 mb-2">💡 Areas to Improve</h3>
                <ul className="space-y-1">
                  {fb.improvements.map((s, i) => <li key={i} className="text-sm text-gray-700">• {s}</li>)}
                </ul>
              </div>
            )}

            {/* Model answer */}
            {fb.modelAnswer && (
              <div className="card bg-brand-50 border-brand-100">
                <h3 className="text-sm font-bold text-brand-700 mb-2">🌟 Sample Strong Answer</h3>
                <p className="text-sm text-brand-900">{fb.modelAnswer}</p>
              </div>
            )}
          </>
        )}

        {/* Your answer */}
        <div className="card">
          <h3 className="text-sm font-bold text-gray-700 mb-2">Your Answer</h3>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{answer}</p>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setPhase('select')} className="btn-outline">← More questions</button>
          <button onClick={() => { setAnswer(''); setFeedback(''); setScore(null); setPhase('answer') }} className="btn-secondary">
            Try again
          </button>
        </div>
      </div>
    )
  }

  return null
}
