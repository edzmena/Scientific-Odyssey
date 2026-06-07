import { useState, useRef, useEffect } from 'react'
import useStore from '@/store/useStore'
import { useClaude } from '@/hooks/useClaude'

const SYSTEM = `You are SciBot, a friendly and knowledgeable AI science tutor for Filipino Grade 6 students preparing for PSHS, Manila Science, QCSHS, and DOST-SEI entrance exams.

Your personality:
- Warm, encouraging, and enthusiastic about science
- Use simple language but don't oversimplify key terms
- Give concrete Philippine examples when possible
- Use emojis occasionally to keep things fun
- Always explain the "why" behind science concepts

Your scope:
- Science: Biology, Chemistry, Physics, Earth Science (Grade 6 level up to entrance exam difficulty)
- Math reasoning relevant to science
- Study tips and exam strategies
- Interview preparation for science high schools

Always end your answer with a short follow-up question or encouragement to keep the student engaged.`

const QUICK_PROMPTS = [
  '⚛️ Explain atoms and molecules',
  '🌱 How does photosynthesis work?',
  '🌍 What causes earthquakes in the Philippines?',
  '💡 Explain Newton\'s 3 Laws simply',
  '🧪 What\'s the difference between acids and bases?',
  '🦠 What are cells and what do they do?',
]

export default function AITutor() {
  const { user, profile, awardXP } = useStore()
  const { stream } = useClaude()

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Kamusta! 👋 I'm **SciBot**, your AI science tutor for the entrance exams!\n\nI can help you with Biology, Chemistry, Physics, Earth Science, study strategies, and even interview prep. What would you like to explore today?`,
    },
  ])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text) {
    const userMsg = text || input.trim()
    if (!userMsg || streaming) return
    setInput('')

    const newMessages = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setStreaming(true)

    // Add empty assistant placeholder
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    try {
      const apiMessages = newMessages
        .filter((m) => m.role !== 'assistant' || m.content) // skip empty
        .map((m) => ({ role: m.role, content: m.content }))

      let full = ''
      for await (const chunk of stream({ messages: apiMessages, system: SYSTEM, max_tokens: 1024 })) {
        full += chunk
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: full }
          return updated
        })
      }

      // Award XP for using SciBot
      if (user && profile) {
        await awardXP(user.id, 5, 'scibot')
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: '⚠️ Sorry, I ran into an error. Please try again in a moment.',
        }
        return updated
      })
    }
    setStreaming(false)
  }

  function renderContent(content) {
    // Very basic markdown: bold, code, newlines
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-xs font-mono">$1</code>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">🤖 SciBot AI Tutor</h1>
        <p className="text-gray-500 text-sm">Ask anything about science — powered by Claude AI · +5 XP per message</p>
      </div>

      {/* Quick prompts */}
      <div className="flex gap-2 flex-wrap mb-3">
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => sendMessage(p)}
            disabled={streaming}
            className="px-3 py-1.5 rounded-xl bg-brand-50 text-brand-700 text-xs font-semibold hover:bg-brand-100 transition-all disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto space-y-4 mb-4 pr-1">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-brand-600 text-white rounded-br-sm'
                : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs">🤖</span>
                  <span className="text-xs font-semibold text-brand-600">SciBot</span>
                </div>
              )}
              <div
                className={streaming && i === messages.length - 1 && msg.role === 'assistant' && !msg.content.length ? 'streaming' : ''}
                dangerouslySetInnerHTML={{ __html: renderContent(msg.content) || (streaming && i === messages.length - 1 ? '' : '…') }}
              />
              {streaming && i === messages.length - 1 && msg.role === 'assistant' && msg.content && (
                <span className="inline-block w-1.5 h-4 bg-brand-500 animate-pulse ml-0.5 align-middle rounded-sm" />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask SciBot anything about science…"
          disabled={streaming}
          className="input flex-1"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || streaming}
          className="btn-primary px-4"
        >
          {streaming ? '⏳' : '→'}
        </button>
      </div>
    </div>
  )
}
