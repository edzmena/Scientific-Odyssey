import { supabase } from '@/lib/supabase'

const EDGE_FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/claude`

export function useClaude() {
  /**
   * Non-streaming call via supabase.functions.invoke()
   */
  async function call({ messages, system, max_tokens = 1024 }) {
    const { data, error } = await supabase.functions.invoke('claude', {
      body: { messages, system, max_tokens },
    })
    if (error) throw error
    return data?.content?.[0]?.text ?? ''
  }

  /**
   * Streaming call — fetches edge function directly and returns async generator of text chunks.
   * Usage:
   *   for await (const chunk of stream({ messages })) { setText(t => t + chunk) }
   */
  async function* stream({ messages, system, max_tokens = 2048 }) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('Not authenticated')

    const res = await fetch(EDGE_FN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ messages, system, max_tokens, stream: true }),
    })

    if (!res.ok) {
      const msg = await res.text()
      throw new Error(`Edge function error ${res.status}: ${msg}`)
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() // keep incomplete line in buffer

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const payload = line.slice(6).trim()
        if (payload === '[DONE]') return
        try {
          const json = JSON.parse(payload)
          const text = json?.delta?.text ?? json?.content_block_delta?.delta?.text ?? ''
          if (text) yield text
        } catch {
          // ignore parse errors on non-JSON SSE lines
        }
      }
    }
  }

  return { call, stream }
}
