# TRM — Development Plans

> Planned features for the NHS Appointment Booking System

---

## 1. Auto-Generate NHS Number

**Status:** ✅ Complete  
**Priority:** High  
**Depends on:** Nothing

### Problem
New patients registering through `register.html` don't get an NHS number assigned.

### Solution
Generate a unique NHS number automatically when a new patient signs up if one isn't provided.

### Implementation (Chosen: Option A — Database Trigger)

**How it works:**
- Updated `handle_new_user_trm()` trigger on `auth.users`
- If `nhs_number` is not provided in signup metadata → generates a random 10-digit number
- Generated number doesn't start with `0`
- Loops until unique (collision probability is ~1 in 10^10)
- `register.html` simplified: passes `nhs_number` and `date_of_birth` via signup metadata, no separate upsert needed
- Auto-generated NHS number is displayed on the success message after registration
- User can also see/edit their NHS number on `profile.html`

### NHS Number Format
- 10 numeric digits with hyphens: `XXX-XXX-XXXX`
- Last digit is a check digit (modulus 11 algorithm)
- Should not start with `0`

### Edge Cases
- User provides their own NHS number → skip generation
- Generated number collides with existing → regenerate
- Very rare collision (1 in 10^10) → retry up to 5 times

---

## 2. Pre-Appointment Questionnaire

**Status:** ✅ Complete  
**Priority:** Medium  
**Depends on:** None (new table + new page)

### Problem
Doctors have no patient context before an appointment. Patients arrive without any pre-screening.

### Solution
Allow patients to fill out an optional symptom questionnaire when booking or before their appointment.

### Database Changes

```sql
CREATE TABLE questionnaires_trm (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments_trm(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  symptoms TEXT,              -- Main symptom / reason
  duration TEXT,              -- How long (days/weeks/months)
  severity INTEGER,           -- 1–10 scale
  pain_location TEXT,         -- Where it hurts
  triggers TEXT,              -- What makes it worse
  relief TEXT,                -- What makes it better
  medications TEXT,           -- Current medication
  additional_notes TEXT,      -- Free text
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### New/Modified Pages

| Page | Change |
|------|--------|
| `questionnaire.html` | **New** — symptom form (optional, shown after booking or linked from dashboard) |
| `book.html` | Add "Fill questionnaire" step or link after confirmation |
| `dashboard.html` | Show questionnaire status on appointment cards; link to fill/edit |
| `admin-dashboard.html` | Show "Has questionnaire" badge; link to view responses |
| `admin-questionnaire.html` | **New** — doctor's view of patient questionnaire |

### Questionnaire Flow

```
Booking → Confirmation → "Would you like to fill a pre-appointment questionnaire?"
                          [Skip] → Dashboard (link available anytime before appointment)
                          [Fill]  → questionnaire.html
```

- Questionnaire is **optional** — patients can skip
- Can be filled/changed anytime before the appointment
- Doctor sees a summary on their admin dashboard
- Questionnaire is locked after appointment is completed

### Doctor View

- Badge on appointment card: "Questionnaire" (green if filled, grey if empty)
- Click to open read-only view of patient answers
- Brief analysis summary at the top

---

## 3. AI Health Agent

**Status:** ✅ Complete  
**Priority:** Low (biggest scope)  
**Depends on:** Questionnaire feature (optional, but synergistic)

### Problem
- Users type health problems into Google and get scared
- No triage or preliminary advice before seeing a doctor
- Doctors have no pre-analysed patient summary

### Solution
Embed an AI agent directly into the website that:
1. Answers health-related questions conversationally (like a symptom checker)
2. Analyses the patient's questionnaire answers and generates a **doctor's brief**
3. Provides general health advice (disclaimer: not medical advice)

### Architecture

```
┌─────────────────────────────────────────────────┐
│                 Browser (JS)                     │
│  ┌───────────────┐    ┌──────────────────────┐  │
│  │ Chat UI       │    │ Questionnaire →      │  │
│  │ (chat.html)   │    │ AI Brief Generator   │  │
│  └───────┬───────┘    └──────────┬───────────┘  │
│          │                       │               │
│          ▼                       ▼               │
│  ┌───────────────────────────────────────────┐  │
│  │         AI Agent JS Module                │  │
│  │  (js/ai-agent.js)                         │  │
│  │  - API call to LLM provider               │  │
│  │  - Prompt engineering                     │  │
│  │  - Response parsing                       │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Implementation

**Chosen: Option A — Browser Direct (Groq API)**
- Call LLM API directly from the browser — Groq API with `llama-3.3-70b-versatile`
- API key hardcoded in `js/ai-agent.js` — acceptable for university demo
- Server-side proxy (Edge Function) would be used in production to secure API key
- `settings_trm` table stores the key but RLS policy `USING(true)` does not allow anon reads (returns `[]`) — known Supabase quirk, worked around by hardcoding

**Option B — Supabase Edge Functions (Better)**
- Deploy Edge Functions (Deno) as middleware
- Keeps API keys secure
- Rate limiting, logging, caching
- More professional architecture — recommended for production

### Features

#### 3a. Health Chatbot (`chat.html`)
- Conversational interface styled like NHS-approved chat
- Users describe symptoms, get triage-level advice
- Clear disclaimers: "I'm an AI assistant, not a doctor. If you're in an emergency, call 999."
- Escalation to booking flow: "Based on your symptoms, you should see a GP. Book now?"
- Chat history stored locally or in `chat_history_trm` table

#### 3b. Questionnaire Analysis (Doctor Brief)
- When patient submits questionnaire, AI generates a concise summary:
  ```
  ┌─────────────────────────────────────┐
  │ Patient Brief for Dr. David Chen    │
  │─────────────────────────────────────│
  │ Patient: John Doe (42)              │
  │ Appointment: 22 Jun 2026, 10:00     │
  │─────────────────────────────────────│
  │ Chief Complaint: Recurring headache │
  │ Duration: 2 weeks                   │
  │ Severity: 6/10                      │
  │ Pattern: Worsens in afternoon       │
  │ Triggers: Screen time, stress       │
  │─────────────────────────────────────│
  │ AI Assessment: Possible tension     │
  │ headache. No red flags detected.    │
  │ Consider ergonomic assessment.      │
  └─────────────────────────────────────┘
  ```
- Stored in `ai_brief` column on `questionnaires_trm` table
- Doctor sees it on `admin-questionnaire.html`

### Database Changes (AI Feature)

```sql
CREATE TABLE chat_history_trm (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,         -- 'user' or 'assistant'
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

- `ai_brief` column is included directly in `questionnaires_trm` CREATE TABLE (not added via ALTER)

### Pages

| Page | Description |
|------|-------------|
| `chat.html` | AI health chatbot with conversational interface — ask health questions, get guidance |
| `admin-questionnaire.html` | Doctor view of questionnaire + AI brief |
| Existing `book.html` | "Talk to AI Assistant" link on choice card |
| Existing `dashboard.html` | "Health Assistant" card in quick actions grid |

### Implementation Notes

- `chatWithAI(conversation, userMessage)` — exported from `js/ai-agent.js`, maintains conversation context
- System prompt restricts AI to health-only topics, includes disclaimer in every response
- Chat history persisted in `chat_history_trm` table per user
- AI provides triage advice and suggests GP booking or 999 when appropriate
- If AI response mentions GP or booking, a "Book an Appointment" link appears after the message
- Uses Groq API (`llama-3.3-70b-versatile`) with 0.5 temperature for conversational responses

### Disclaimer
Every AI-generated response must include prominent disclaimer:
> **"This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your GP for health concerns. If you're experiencing a medical emergency, call 999 immediately."**

---

## Implementation Order

```
Phase 1:
  ├── NHS Number auto-generation
  │   └── SQL trigger update + register.html changes
  │
  ├── Dependents
  │   ├── SQL: dependents_trm table + dependent_id on appointments_trm
  │   └── Book for dependent option in booking flow
  │
  ├── Questionnaire
  │   ├── SQL: questionnaires_trm table
  │   ├── questionnaire.html (patient form)
  │   ├── admin-questionnaire.html (doctor view)
  │   └── Update book.html, dashboard.html, admin-dashboard.html
  │
  └── AI Agent
      ├── js/ai-agent.js (chatWithAI + analyseSymptoms exports)
      ├── chat.html (patient health chatbot)
      ├── AI brief generation on questionnaire submit
      └── Doctor brief view on admin-questionnaire.html
```

---

*Last updated: 21 June 2026 · TRM Team*
