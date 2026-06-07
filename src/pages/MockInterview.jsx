import { useState, useRef } from 'react'
import useStore from '@/store/useStore'
import { useClaude } from '@/hooks/useClaude'
import INTERVIEW_QUESTIONS, { INTERVIEW_CATEGORIES, getQuestionsByCategory, getRandomInterviewQuestion } from '@/data/interviewQuestions'

// Suggested answer patterns per category
const ANSWER_PATTERNS = {
  'About Yourself': {
    framework: 'PEER Method',
    steps: ['Point — state your main point', 'Evidence — give a specific example', 'Explain — explain how it relates', 'Relevance — connect it to the school'],
    starter: 'I am [name], a Grade 6 student from [school]. One thing that defines me as a science learner is…',
  },
  'Science & Academics': {
    framework: 'EEL Method',
    steps: ['Explain the concept clearly', 'Example — give a real-world or Philippine example', 'Link — connect it to your own experience or future goal'],
    starter: '[Topic] is the process/study of… A great example of this is… This interests me because…',
  },
  'Problem Solving': {
    framework: 'Scientific Method',
    steps: ['Observe — what is the problem?', 'Hypothesize — what do I think will work?', 'Experiment — what steps would I take?', 'Conclude — how would I verify the result?'],
    starter: 'First, I would carefully observe the situation to understand… Then I would hypothesize that… My steps would be…',
  },
  'Goals & Motivation': {
    framework: 'Past → Present → Future',
    steps: ['Past — where does your passion come from?', 'Present — what are you doing now to pursue it?', 'Future — where do you want to go, and how does THIS school help?'],
    starter: 'My passion for [subject] started when… Right now, I am preparing by… My dream is to… and this school will help me get there because…',
  },
  'Science Awareness': {
    framework: 'PEEL Method',
    steps: ['Point — state the issue/discovery', 'Evidence — give facts or data you know', 'Explain — why does this matter?', 'Link — connect to Philippines or your personal view'],
    starter: 'A recent development I found impressive is… The evidence shows… This matters because… As a Filipino student, I think…',
  },
}

export default function MockInterview() {
  const { user, saveInterviewSession } = useStore()
  const { call } = useClaude()

  const [phase, setPhase] = useState('select')
  const [selectedQ, setSelectedQ] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)
  const [filterCat, setFilterCat] = useState('All')
  const [showTips, setShowTips] = useState(false)
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  const displayed = filterCat === 'All' ? INTERVIEW_QUESTIONS : getQuestionsByCategory(filterCat)
  const pattern = selectedQ ? ANSWER_PATTERNS[selectedQ.category] : null

  // ── MICROPHONE ────────────────────────────────────────────────────────────
  function toggleMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      alert('Speech recognition is only supported in Google Chrome. Please use Chrome and try again.')
      return
    }

    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const rec = new SR()
    recognitionRef.current = rec
    rec.lang = 'en-US'
    rec.continuous = true
    rec.interimResults = true

    rec.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('')
      setAnswer(transcript)
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => setListening(false)
    rec.start()
    setListening(true)
  }

  async function submitAnswer() {
    if (!answer.trim()) return
    setLoading(true)
    try {
      const system = `You are an expert interviewer for Philippine science high schools (PSHS, Manila Science, QCSHS).
Evaluate this Grade 6 student's interview answer. Be encouraging but honest.

Return ONLY valid JSON (no markdown, no extra text):
{
  "score": <integer 1-10>,
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "modelAnswer": "A short model answer (2-3 sentences)"
}`
      const messages = [{ role: 'user', content: `Interview Question: "${selectedQ.question}"\n\nStudent's Answer: "${answer}"\n\nTip: ${selectedQ.tip}` }]
      const raw = await call({ messages, system, max_tokens: 800 })
      const parsed = JSON.parse(raw)
      setFeedback(parsed)
      setScore(parsed.score)
      const { xpEarned: xp } = await saveInterviewSession(user.id, { questionId: selectedQ.id, question: selectedQ.question, answer, feedback: raw, score: parsed.score })
      setXpEarned(xp)
      setPhase('feedback')
    } catch (err) {
      setFeedback({ error: 'Could not get feedback. Please check your connection and try again.' })
      setPhase('feedback')
    }
    setLoading(false)
  }

  // ── SELECT ────────────────────────────────────────────────────────────────
  if (phase === 'select') return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">🎤 Mock Interview</h1>
        <p className="text-gray-500 text-sm mt-1">Practice science high school interview questions with AI feedback.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['All', ...INTERVIEW_CATEGORIES].map((cat) => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${filterCat === cat ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {displayed.map((q) => (
          <button key={q.id}
            onClick={() => { setSelectedQ(q); setAnswer(''); setFeedback(''); setScore(null); setShowTips(false); setPhase('answer') }}
            className="card text-left hover:shadow-md hover:border-brand-200 transition-all">
            <span className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-lg mb-2">{q.category}</span>
            <p className="text-sm font-medium text-gray-900">{q.question}</p>
            <p className="text-xs text-gray-400 mt-1">💡 {q.tip}</p>
          </button>
        ))}
      </div>

      <button onClick={() => { setSelectedQ(getRandomInterviewQuestion()); setAnswer(''); setFeedback(''); setScore(null); setShowTips(false); setPhase('answer') }} className="btn-secondary">
        🎲 Random question
      </button>
    </div>
  )

  // ── ANSWER ────────────────────────────────────────────────────────────────
  if (phase === 'answer') return (
    <div className="max-w-2xl space-y-5 animate-fade-in">
      <button onClick={() => setPhase('select')} className="text-sm text-gray-500 hover:text-gray-800">← Back to questions</button>

      {/* Question card */}
      <div className="card">
        <span className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-lg mb-3">{selectedQ.category}</span>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{selectedQ.question}</h2>
        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2">💡 {selectedQ.tip}</p>
      </div>

      {/* Suggested answer pattern */}
      {pattern && (
        <div className="card border-brand-100 bg-brand-50">
          <button onClick={() => setShowTips(!showTips)} className="flex items-center justify-between w-full text-left">
            <span className="text-sm font-semibold text-brand-700">✨ Suggested Answer Pattern: {pattern.framework}</span>
            <span className="text-brand-500 text-xs">{showTips ? '▲ Hide' : '▼ Show tips'}</span>
          </button>
          {showTips && (
            <div className="mt-3 space-y-2">
              <div className="space-y-1">
                {pattern.steps.map((step, i) => (
                  <div key={i} className="flex gap-2 text-xs text-brand-800">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-brand-200 text-brand-700 font-bold flex items-center justify-center">{i + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-brand-100">
                <p className="text-xs text-brand-600 font-semibold mb-1">💬 Answer starter you can use:</p>
                <p className="text-xs text-brand-800 italic bg-white rounded-lg p-2">"{pattern.starter}"</p>
                <button
                  onClick={() => setAnswer(pattern.starter.replace(/\[.*?\]/g, '___'))}
                  className="text-xs text-brand-600 hover:text-brand-800 mt-1 underline"
                >
                  Use this starter →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Answer input */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-700">Your Answer</label>
          {/* Microphone button */}
          <button
            onClick={toggleMic}
            title={listening ? 'Stop recording' : 'Speak your answer (Chrome only)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              listening
                ? 'bg-red-100 text-red-600 animate-pulse'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🎙️ {listening ? 'Listening… (click to stop)' : 'Use Mic'}
          </button>
        </div>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type or speak your answer here…"
          rows={6}
          className="input resize-none"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{answer.length} characters · aim for 150–300 words</p>
          <button onClick={submitAnswer} disabled={loading || answer.trim().length < 20} className="btn-primary">
            {loading ? '⏳ Getting feedback…' : '✨ Get AI Feedback'}
          </button>
        </div>
      </div>
    </div>
  )

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
            <div className="card flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white ${score >= 8 ? 'bg-emerald-500' : score >= 6 ? 'bg-amber-500' : 'bg-red-500'}`}>
                {score}/10
              </div>
              <div>
                <p className="font-semibold text-gray-900">{score >= 8 ? '🏆 Excellent!' : score >= 6 ? '👍 Good!' : '📖 Keep practicing!'}</p>
                <p className="text-xs text-amber-600 font-semibold">+{xpEarned} XP earned</p>
              </div>
            </div>

            {fb.strengths?.length > 0 && (
              <div className="card">
                <h3 className="text-sm font-bold text-emerald-700 mb-2">✅ Strengths</h3>
                <ul className="space-y-1">{fb.strengths.map((s, i) => <li key={i} className="text-sm text-gray-700">• {s}</li>)}</ul>
              </div>
            )}
            {fb.improvements?.length > 0 && (
              <div className="card">
                <h3 className="text-sm font-bold text-amber-700 mb-2">💡 Areas to Improve</h3>
                <ul className="space-y-1">{fb.improvements.map((s, i) => <li key={i} className="text-sm text-gray-700">• {s}</li>)}</ul>
              </div>
            )}
            {fb.modelAnswer && (
              <div className="card bg-brand-50 border-brand-100">
                <h3 className="text-sm font-bold text-brand-700 mb-2">🌟 Sample Strong Answer</h3>
                <p className="text-sm text-brand-900">{fb.modelAnswer}</p>
              </div>
            )}
          </>
        )}

        <div className="card">
          <h3 className="text-sm font-bold text-gray-700 mb-2">Your Answer</h3>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{answer}</p>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setPhase('select')} className="btn-outline">← More questions</button>
          <button onClick={() => { setAnswer(''); setFeedback(''); setScore(null); setPhase('answer') }} className="btn-secondary">Try again</button>
        </div>
      </div>
    )
  }

  return null
}
