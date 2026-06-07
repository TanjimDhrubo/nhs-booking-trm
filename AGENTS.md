# NHS Appointment Booking System — TRM
## Context for AI Assistants (OpenCode / Claude / Cursor)
## READ THIS ENTIRE FILE BEFORE WRITING ANY CODE

---

## Project Overview
University group project — NHS Appointment Booking System built by team TRM.
- No PHP. No server. No MySQL. No backend.
- Files open directly in browser via VS Code Live Server extension.

---

## Tech Stack
- HTML5 + CSS3 + Vanilla JavaScript (ES Modules only)
- Supabase (cloud PostgreSQL database + built-in auth)
- Supabase JS SDK v2 (imported via CDN esm in supabase.js)

---

## Supabase Credentials
- URL: https://ataqzfyppitexytlitsw.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0YXF6ZnlwcGl0ZXh5dGxpdHN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NjQzODEsImV4cCI6MjA5NjM0MDM4MX0.-aQr3ALpgV4AbKCeo9ftvmXQ7u5nBHqIT67o5NlSRGM

---

## Project Root
D:\test run\

---

## File Structure
D:\test run\
├── AGENTS.md
├── css/
│   └── style.css        ✅ COMPLETE — do not touch unless asked
├── js/
│   ├── supabase.js      ✅ COMPLETE — do not touch unless asked
│   └── auth.js          ✅ COMPLETE — do not touch unless asked
├── book.html            ⬜ needs code
├── checkin.html         ⬜ needs code
├── dashboard.html       ⬜ needs code
├── doctors.html         ⬜ needs code
├── history.html         ⬜ needs code
├── index.html           ⬜ needs code
├── login.html           ⬜ needs code
├── notifications.html   ⬜ needs code
├── privacy.html         ⬜ needs code
├── register.html        ⬜ needs code
└── reschedule.html      ⬜ needs code

---

## Shared Files — Import Pattern
Every HTML page must use these exact import paths:
```js
import { supabase } from './js/supabase.js'
import { requireAuth, showUserName, logout } from './js/auth.js'
```

---

## Database Tables
| Table | Columns |
|-------|---------|
| profiles_trm | id (uuid FK auth.users), full_name, date_of_birth, nhs_number, created_at |
| doctors_trm | id (uuid), name, specialisation, available (bool) |
| appointments_trm | id, user_id (FK), doctor_id (FK), appointment_type, appointment_date, status, created_at |
| checkins_trm | id, appointment_id (FK), checkin_time |
| notifications_trm | id, user_id (FK), message, sent_at, type |

Appointment status values: confirmed / cancelled / completed / checked_in
RLS enabled on all tables — users only access their own data.
doctors_trm is publicly readable.

---

## BRANDING — APPLY TO EVERY SINGLE FILE
- `<title>NHS Booking | TRM</title>`
- `<meta name="author" content="TRM">`
- Navbar brand left side: `<div class="navbar-logo">NHS</div>` blue box + `<span class="navbar-name">NHS Appointment Booking <span>| TRM</span></span>`
- Footer every page: `© 2025 NHS Appointment Booking System · <span class="footer-trm">Developed by TRM</span> · <a href="privacy.html">Privacy Policy</a>`
- Watermark fixed bottom-right every page: `<div class="trm-watermark">Developed by TRM</div>`

---

## DESIGN RULES — NEVER BREAK THESE

### Visual Style
- This site must look MINIMAL, CLEAN, EXCLUSIVE — like a premium health app
- Inspired by: warm off-white backgrounds, generous white space, soft shadows
- NOT a generic NHS clone with heavy blue navbar and sharp boxes
- Think: Apple-level cleanliness applied to NHS branding

### Colours (use CSS variables from style.css)
- Page background: var(--bg-page) = #F9F7F4 warm off-white
- Cards: var(--bg-card) = #FFFFFF pure white
- Primary blue: var(--nhs-blue) = #005EB8 — used SPARINGLY as accent
- Text: var(--nhs-dark) = #1A2332
- Muted text: var(--nhs-muted) = #6B7280
- Never use raw hex values — always use CSS variables

### Typography
- Headings: large, bold, tight letter-spacing (-0.5px to -1px)
- Body: 16px, line-height 1.6
- Labels: 14px, font-weight 600
- Muted info: 13-14px, var(--nhs-muted)

### Layout
- Max width 980px for normal pages (container class)
- Max width 520px for auth/form pages (container-sm class)
- Generous padding — minimum 40px top/bottom on containers
- Cards always have border-radius var(--radius-lg) = 18px
- Buttons always rounded var(--radius-md) = 12px — never sharp

### Navbar
- White background, very subtle bottom border
- Sticky top, z-index 100
- Height 64px
- Logo box on left, nav links right — clean and minimal
- Never a heavy solid blue navbar

### Footer
- White background, subtle top border
- Lightweight — just one line centered
- "Developed by TRM" in NHS blue

---

## JAVASCRIPT RULES
- Always `<script type="module">` — never regular script tags
- Always `const` and `let` — never `var`
- Always check `if (error)` after every Supabase call
- Always call `requireAuth()` first on protected pages
- Always show a loading state while fetching data
- Always show an empty state when no data is returned
- Never hardcode user IDs
- Never use localStorage for auth
- Never use inline styles — always CSS classes

---

## PROTECTED PAGES (must call requireAuth())
dashboard.html, book.html, history.html, checkin.html, reschedule.html, notifications.html

## PUBLIC PAGES (no auth redirect)
index.html, login.html, register.html, doctors.html, privacy.html

---

## STANDARD PAGE TEMPLATE
Every HTML file must follow this exact structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="TRM">
  <title>NHS Booking | TRM</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <a href="index.html" class="navbar-brand">
      <div class="navbar-logo">NHS</div>
      <span class="navbar-name">NHS Appointment Booking <span>| TRM</span></span>
    </a>
    <div class="navbar-links">
      <!-- page specific links here -->
    </div>
  </nav>

  <!-- MAIN CONTENT -->
  <main class="container">
    <!-- content here -->
  </main>

  <!-- FOOTER -->
  <footer>
    <span>© 2026 NHS Appointment Booking System</span>
    <span>·</span>
    <span class="footer-trm">Developed by TRM</span>
    <span>·</span>
    <a href="privacy.html">Privacy Policy</a>
  </footer>

  <!-- TRM WATERMARK -->
  <div class="trm-watermark">Developed by TRM</div>

  <script type="module">
    // page JS here
  </script>

</body>
</html>
```

---

## REUSABLE JS PATTERNS

### Date formatter (use in every page that shows dates):
```js
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric',
    month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}
```

### Loading state:
```js
el.innerHTML = '<div class="loading">Loading</div>'
```

### Empty state:
```js
el.innerHTML = `
  <div class="empty-state">
    <div class="empty-state-icon">🗓️</div>
    <p>No appointments found.</p>
    <a href="book.html" class="btn-primary">Book Now</a>
  </div>`
```

### Show message:
```js
function showMsg(id, msg, type = 'error') {
  document.getElementById(id).innerHTML =
    `<div class="alert alert-${type}">${msg}</div>`
}
```

### Silent notification insert after every action:
```js
async function insertNotification(userId, message) {
  await supabase.from('notifications_trm').insert({
    user_id: userId,
    message,
    type: 'in-app'
  })
}
```

---

## PAGE COMPLETION STATUS
| File | Status |
|------|--------|
| css/style.css | ✅ Complete |
| js/supabase.js | ✅ Complete |
| js/auth.js | ✅ Complete |
| index.html | ⬜ Pending |
| login.html | ⬜ Pending |
| register.html | ⬜ Pending |
| dashboard.html | ⬜ Pending |
| book.html | ⬜ Pending |
| history.html | ⬜ Pending |
| checkin.html | ⬜ Pending |
| doctors.html | ⬜ Pending |
| reschedule.html | ⬜ Pending |
| notifications.html | ⬜ Pending |
| privacy.html | ⬜ Pending |

---

## MISTAKES TO NEVER MAKE
- Never use require() — ES modules only
- Never use PHP, MySQL, or any server language
- Never use inline styles
- Never use sharp corners on cards or buttons
- Never use a heavy blue navbar
- Never skip error handling on Supabase calls
- Never skip requireAuth() on protected pages
- Never break the TRM branding rules
- Never use pure white #FFFFFF as page background
- Never regenerate style.css, supabase.js, or auth.js unless explicitly asked