import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

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

const ANALYSIS_PROMPT = `You are an NHS triage assistant. Analyse these symptoms and provide a concise clinical brief for the doctor.
Keep it professional, factual, and under 150 words. Include possible patterns but always flag urgency if present.

Patient's answers:
- Main symptom / reason: {symptoms}
- Duration: {duration}
- Severity (1-10): {severity}
- Pain location: {painLocation}
- Triggers: {triggers}
- What helps: {relief}
- Current medication: {medications}
- Additional notes: {additionalNotes}

Format:
**Chief Complaint:** ...
**Duration:** ...
**Severity:** ...
**AI Assessment:** ...`

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const groqKey = Deno.env.get('GROQ_API_KEY')
  if (!groqKey) {
    return new Response(JSON.stringify({ error: 'AI service not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()

    let groqMessages
    if (body.type === 'analyse') {
      const a = body.answers || {}
      const prompt = ANALYSIS_PROMPT
        .replace('{symptoms}', a.symptoms || 'Not provided')
        .replace('{duration}', a.duration || 'Not provided')
        .replace('{severity}', a.severity || 'Not provided')
        .replace('{painLocation}', a.pain_location || 'Not provided')
        .replace('{triggers}', a.triggers || 'Not provided')
        .replace('{relief}', a.relief || 'Not provided')
        .replace('{medications}', a.medications || 'Not provided')
        .replace('{additionalNotes}', a.additional_notes || 'Not provided')
      groqMessages = [{ role: 'system', content: prompt }]
    } else {
      const conversation = body.messages || []
      const userMessage = body.userMessage || ''
      groqMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversation.map((m: any) => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage },
      ]
    }

    const groqRes = await fetch(GROQ_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + groqKey,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: groqMessages,
        temperature: body.type === 'analyse' ? 0.3 : 0.5,
        max_tokens: body.type === 'analyse' ? 300 : 500,
      }),
    })

    if (!groqRes.ok) {
      const err = await groqRes.text()
      console.error('Groq API error:', err)
      return new Response(JSON.stringify({ error: 'AI service temporarily unavailable' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const data = await groqRes.json()
    const content = data.choices?.[0]?.message?.content || 'No response generated.'

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Edge Function error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
