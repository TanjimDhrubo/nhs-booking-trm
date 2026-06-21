import { supabase } from './supabase.js'

const EDGE_FUNCTION_URL = 'https://ataqzfyppitexytlitsw.supabase.co/functions/v1/ai-agent'

async function callEdgeFunction(payload) {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const headers = {
      'Content-Type': 'application/json',
    }
    if (session) headers['Authorization'] = 'Bearer ' + session.access_token

    const res = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      console.error('Edge Function error:', err)
      return 'AI assistant is temporarily unavailable. Please try again later.'
    }

    const data = await res.json()
    return data.content || 'I could not generate a response. Please try rephrasing your question.'
  } catch (err) {
    console.error('AI agent error:', err)
    return 'AI assistant is temporarily unavailable. Please try again later.'
  }
}

export async function chatWithAI(conversation, userMessage) {
  return await callEdgeFunction({
    type: 'chat',
    messages: conversation.map(m => ({ role: m.role, content: m.content })),
    userMessage,
  })
}

export async function analyseSymptoms(answers) {
  const response = await callEdgeFunction({
    type: 'analyse',
    answers,
  })
  return response || 'No analysis generated.'
}
