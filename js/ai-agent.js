import { supabase } from './supabase.js'

const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.3-70b-versatile'
const GROQ_API_KEY = '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'

const SYSTEM_PROMPT = `You are a friendly and professional NHS health information assistant. 

## Your role
- Answer health-related questions conversationally
- Provide general health information, symptom guidance, and self-care advice
- Help users understand when they should see a doctor
- Keep answers clear, concise, and easy to understand

## Rules
- Only answer health and wellbeing questions. If asked about other topics, politely redirect: "I'm here to help with health-related questions. Please ask me about symptoms, conditions, or NHS services."
- Always include this disclaimer at the end of every response: "This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your GP for health concerns. If you're experiencing a medical emergency, call 999 immediately."
- If symptoms sound urgent (chest pain, difficulty breathing, severe bleeding, stroke symptoms), say: "These symptoms could be serious. Please call 999 or visit A&E immediately."
- If symptoms warrant a GP visit, suggest: "Based on what you've described, it's a good idea to book an appointment with your GP."
- Be reassuring but honest. Never diagnose. Never prescribe medication.
- Use plain English, not medical jargon.`

async function callGroq(messages) {
  if (!GROQ_API_KEY) return 'AI assistant is unavailable right now. Please try again later.'

  try {
    const res = await fetch(GROQ_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_API_KEY
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.5,
        max_tokens: 500
      })
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Groq API error:', err)
      return 'AI assistant is temporarily unavailable. Please try again later.'
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content || 'I could not generate a response. Please try rephrasing your question.'
  } catch (err) {
    console.error('AI agent error:', err)
    return 'AI assistant is temporarily unavailable. Please try again later.'
  }
}

export async function chatWithAI(conversation, userMessage) {
  const messages = [
    ...conversation.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage }
  ]
  return await callGroq(messages)
}

export async function analyseSymptoms(answers) {
  if (!GROQ_API_KEY) return 'AI analysis unavailable. Set up a Groq API key in settings.'

  const prompt = `You are an NHS triage assistant. Analyse these symptoms and provide a concise clinical brief for the doctor.
Keep it professional, factual, and under 150 words. Include possible patterns but always flag urgency if present.

Patient's answers:
- Main symptom / reason: ${answers.symptoms || 'Not provided'}
- Duration: ${answers.duration || 'Not provided'}
- Severity (1-10): ${answers.severity || 'Not provided'}
- Pain location: ${answers.pain_location || 'Not provided'}
- Triggers: ${answers.triggers || 'Not provided'}
- What helps: ${answers.relief || 'Not provided'}
- Current medication: ${answers.medications || 'Not provided'}
- Additional notes: ${answers.additional_notes || 'Not provided'}

Format:
**Chief Complaint:** ...
**Duration:** ...
**Severity:** ...
**AI Assessment:** ...`

  try {
    const res = await fetch(GROQ_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_API_KEY
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.3,
        max_tokens: 300
      })
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Groq API error:', err)
      return 'AI analysis temporarily unavailable.'
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content || 'No analysis generated.'
  } catch (err) {
    console.error('AI agent error:', err)
    return 'AI analysis temporarily unavailable.'
  }
}
