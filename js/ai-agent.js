import { supabase } from './supabase.js'

async function callEdgeFunction(payload) {
  try {
    const { data, error } = await supabase.functions.invoke('ai-agent', { body: payload })

    if (error) {
      console.error('Edge Function error:', error)
      return 'AI assistant is temporarily unavailable. Please try again later.'
    }

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
