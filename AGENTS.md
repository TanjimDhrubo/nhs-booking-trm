# NHS Appointment Booking System — TRM
## Context for AI Assistants (OpenCode / Claude / Cursor)
## READ THIS ENTIRE FILE BEFORE WRITING ANY CODE

---

## Project Overview
University group project — NHS Appointment Booking System built by team TRM.
- No PHP. No server. No MySQL. No backend.
- Files served via VS Code Live Server or GitHub Pages (https://)
- University requires semantic HTML coding throughout

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
│   └── style.css            ✅ COMPLETE — do not touch unless asked
├── js/
│   ├── supabase.js          ✅ COMPLETE — do not touch unless asked
│   ├── auth.js              ✅ COMPLETE — do not touch unless asked
│   ├── theme.js             ✅ COMPLETE — do not touch unless asked
│   └── helpers.js           ✅ COMPLETE — shared module (formatDate, renderBadge, showMsg, generateTimeSlots, etc.)
├── index.html               ✅ Complete
├── login.html               ✅ Complete
├── register.html            ✅ Complete
├── dashboard.html           ✅ Complete
├── book.html                ✅ Complete
├── history.html             ✅ Complete
├── checkin.html             ✅ Complete
├── doctors.html             ✅ Complete
├── reschedule.html          ✅ Complete
├── notifications.html       ✅ Complete
├── privacy.html             ✅ Complete
├── admin-login.html         ✅ Complete
├── admin-dashboard.html     ✅ Complete
├── design.md                ✅ Complete
├── 404.html                 ✅ Complete — branded error page
├── profile.html             ✅ Complete — patient profile/settings page
├── confirmation.html        ✅ Complete — post-booking confirmation with print
├── admin-patients.html      ✅ Complete — admin view all patients with search
├── admin-analytics.html     ✅ Complete — admin appointment analytics with stats
└── team.html                ✅ Complete — TRM team portfolio page

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
| doctors_trm | id (uuid), name, specialisation, available (bool), email (text), auth_id (uuid) |
| appointments_trm | id, user_id (FK), doctor_id (FK), appointment_type, appointment_date, status, created_at |
| checkins_trm | id, appointment_id (FK), checkin_time |
| notifications_trm | id, user_id (FK), message, sent_at, type |

### Important notes:
- doctors_trm.name already includes "Dr." prefix — NEVER add "Dr." manually
- Appointment status values: confirmed / cancelled / completed / checked_in
- RLS enabled on all tables — users only access their own data
- doctors_trm is publicly readable by all (including unauthenticated users)
- dependents_trm: id (uuid), guardian_id (uuid FK auth.users), full_name, date_of_birth, nhs_number, created_at
- appointments_trm.dependent_id (uuid FK dependents_trm, nullable) — set when booking for a dependent
- Run this SQL in Supabase SQL Editor to create dependents_trm table and add dependent_id column:
  ```sql
  CREATE TABLE dependents_trm (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guardian_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    date_of_birth DATE,
    nhs_number TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  );
  ALTER TABLE appointments_trm ADD COLUMN dependent_id UUID REFERENCES dependents_trm(id) ON DELETE SET NULL;
  ```

---

## BRANDING — APPLY TO EVERY SINGLE FILE
- `<title>NHS Booking | TRM</title>`
- `<meta name="author" content="TRM">`
- Navbar brand: NHS blue box + "NHS Appointment Booking | TRM"
- Footer every page: © 2026 NHS Appointment Booking System · Developed by TRM · Privacy Policy
- Watermark fixed bottom-right: `<div class="trm-watermark">Developed by TRM</div>`
- Team page link in footer and navbar menu

---

## SEMANTIC HTML RULES — UNIVERSITY REQUIREMENT
The university requires semantic HTML throughout. Always use:

- `<nav>` for navigation bars
- `<header>` for page headers
- `<main>` for main page content
- `<footer>` for page footers
- `<section>` for distinct page sections
- `<article>` for self-contained content (appointment cards, notification items)
- `<aside>` for sidebar content
- `<h1>` through `<h6>` in correct hierarchy (one h1 per page)
- `<ul>` `<ol>` `<li>` for lists
- `<button>` for clickable actions (not divs)
- `<a>` for navigation links
- `<form>` `<label>` `<input>` `<select>` with proper for/id associations
- `<table>` `<thead>` `<tbody>` `<tr>` `<th>` `<td>` for tabular data
- `<time datetime="">` for dates and times
- `<figure>` and `<figcaption>` for images with captions
- `<abbr title="">` for abbreviations like NHS
- `aria-label` on icon-only buttons
- `role` attributes where needed
- `alt` text on all images

NEVER use:
- `<div>` or `<span>` where a semantic tag exists
- `<br>` for spacing (use CSS margin/padding)
- `<b>` or `<i>` instead of `<strong>` or `<em>`
- Tables for layout (only for tabular data)
- Inline event handlers (onclick=) — use addEventListener instead
- `<div class="button">` instead of `<button>`

---

## DESIGN RULES — NEVER BREAK THESE

### Visual Style
- Minimal, clean, exclusive — like a premium health app
- Warm off-white backgrounds, generous white space, soft shadows
- NHS blue used sparingly as accent only
- NOT a generic NHS clone with heavy blue navbar

### Colours (use CSS variables from style.css)
- Page background: var(--bg-page) = #F9F7F4
- Cards: var(--bg-card) = #FFFFFF
- Primary: var(--nhs-blue) = #005EB8
- Text: var(--nhs-dark) = #1A2332
- Muted: var(--nhs-muted) = #6B7280

### Layout
- Max width 980px — class="container"
- Max width 520px — class="container-sm" (auth/form pages)
- Cards: border-radius var(--radius-lg)
- Buttons: border-radius var(--radius-md)
- Generous padding — minimum 40px top/bottom

### Navbar
- White background, sticky, 64px height
- Logo left, links right
- Never heavy solid blue navbar

---

## JAVASCRIPT RULES
- Always `<script type="module">`
- Always `const` and `let` — never `var`
- Always check `if (error)` after every Supabase call
- Always call `requireAuth()` first on protected pages
- Always show loading state while fetching
- Always show empty state when no data returned
- Never hardcode user IDs
- Never use localStorage for auth
- Always use addEventListener — never inline onclick handlers
- Always use semantic event handling

---

## PROTECTED PAGES (must call requireAuth())
dashboard.html, book.html, history.html, checkin.html,
reschedule.html, notifications.html

## PUBLIC PAGES (no auth redirect)
index.html, login.html, register.html, doctors.html,
privacy.html, team.html

---

## STANDARD SEMANTIC PAGE TEMPLATE
Every HTML file must follow this exact structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="TRM">
  <meta name="description" content="NHS Appointment Booking System by TRM">
  <title>NHS Booking | TRM</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="navbar" aria-label="Main navigation">
    <a href="index.html" class="navbar-brand" aria-label="NHS Booking home">
      <div class="navbar-logo" aria-hidden="true">NHS</div>
      <span class="navbar-name">
        <abbr title="National Health Service">NHS</abbr> 
        Appointment Booking <span>| TRM</span>
      </span>
    </a>
    <div class="navbar-links">
      <!-- page specific links -->
    </div>
  </nav>

  <main class="container" id="main-content">
    <header class="page-header">
      <h1>Page Title</h1>
      <p>Page subtitle</p>
    </header>

    <!-- page sections -->
    <section aria-labelledby="section-heading">
      <h2 id="section-heading">Section Title</h2>
      <!-- content -->
    </section>

  </main>

  <footer class="site-footer" role="contentinfo">
    <p>
      <span>© 2026 NHS Appointment Booking System</span>
      <span aria-hidden="true">·</span>
      <span class="footer-trm">Developed by <a href="team.html" aria-label="Meet the TRM team">TRM</a></span>
      <span aria-hidden="true">·</span>
      <a href="privacy.html">Privacy Policy</a>
      <span aria-hidden="true">·</span>
      <a href="team.html">Meet the Team</a>
    </p>
  </footer>

  <a href="team.html" class="trm-watermark" aria-label="Meet the TRM team">Developed by TRM</a>

  <script type="module">
    // page JS here — always use addEventListener not onclick
  </script>

</body>
</html>
```

---

## REUSABLE JS PATTERNS

### Shared helpers (import from js/helpers.js):
```js
import { formatDate, renderBadge, showMsg, generateTimeSlots, insertNotification } from './js/helpers.js'
```

Available exports:
- `formatDate(iso)` — full date/time display
- `formatDateShort(iso)` — date only
- `formatTime(iso)` / `formatTimeShort(iso)` — time formats
- `renderBadge(status)` — status badge HTML
- `showMsg(elementId, message, type)` — alert display
- `generateTimeSlots()` — array of {label, value} time slots
- `getDayBounds(date)` — {start, end} ISO strings for day
- `timeAgo(isoString)` — relative time string
- `insertNotification(userId, message)` — silent notification insert
- `getTomorrow()` — tomorrow's date string
- `getDay(iso)` / `getMonth(iso)` — date parts
```

### Loading state:
```js
el.innerHTML = '<div class="loading">Loading</div>'
```

### Empty state:
```js
el.innerHTML = `
  <div class="empty-state">
    <div class="empty-state-icon" aria-hidden="true">🗓️</div>
    <p>No appointments found.</p>
    <a href="book.html" class="btn-primary">Book Now</a>
  </div>`
```

### Show message:
```js
function showMsg(elementId, message, type = 'error') {
  const el = document.getElementById(elementId)
  el.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`
}
```

### Silent notification insert:
```js
async function insertNotification(userId, message) {
  await supabase.from('notifications_trm').insert({
    user_id: userId,
    message,
    type: 'in-app'
  })
}
```

### Auth-aware navigation:
```js
const { data: { session } } = await supabase.auth.getSession()
if (session) {
  document.getElementById('nav-signin').style.display = 'none'
  document.getElementById('nav-register').style.display = 'none'
  document.getElementById('nav-dashboard').style.display = 'flex'
}
```

---

## ADMIN PORTAL RULES

### Access
- Completely separate from patient portal
- Accessed directly via admin-login.html URL
- Three dot menu ⋮ on index.html navbar links here

### Authentication Flow
- Sign in with Supabase Auth
- Check email against doctors_trm.email column
- If match → admin-dashboard.html
- If no match → sign out, show error

### Doctor emails in doctors_trm:
- sarah.mitchell@nhs-trm.com → Dr. Sarah Mitchell
- james.okafor@nhs-trm.com → Dr. James Okafor
- priya.sharma@nhs-trm.com → Dr. Priya Sharma
- thomas.webb@nhs-trm.com → Dr. Thomas Webb
- aisha.rahman@nhs-trm.com → Dr. Aisha Rahman
- david.chen@nhs-trm.com → Dr. David Chen

### Admin Dashboard Shows
- Doctor's name and specialisation
- Today's appointments (with patient names from profiles_trm)
- This week's appointments
- Mark complete button per appointment

### Admin Branding
- Navbar: "NHS Admin Portal | TRM" + "STAFF ONLY" amber badge
- Amber accent strip below navbar: 3px solid #FFB81C
- Same footer and watermark as patient pages

---

## SECURITY NOTES FOR REPORT
- RLS enabled on all 5 tables ✅
- Passwords managed by Supabase Auth (bcrypt) ✅  
- JWT session tokens (not cookies) ✅
- HTTPS enforced on GitHub Pages ✅
- Leaked password protection: requires Pro plan — documented ✅
- rls_auto_enable: internal Supabase function — cannot modify ✅
- In production: would add MFA, NHS Staff Identity Provider ✅

---

## PAGE COMPLETION STATUS
| File | Status |
|------|--------|
| css/style.css | ✅ Complete |
| js/supabase.js | ✅ Complete |
| js/auth.js | ✅ Complete |
| index.html | ✅ Complete |
| login.html | ✅ Complete |
| register.html | ✅ Complete |
| dashboard.html | ✅ Complete |
| book.html | ✅ Complete |
| history.html | ✅ Complete |
| checkin.html | ✅ Complete |
| doctors.html | ✅ Complete |
| reschedule.html | ✅ Complete |
| notifications.html | ✅ Complete |
| privacy.html | ✅ Complete |
| admin-login.html | ✅ Complete |
| admin-dashboard.html | ✅ Complete |
| design.md                | ✅ Complete |
| team.html                | ✅ Complete — TRM team portfolio page
| 404.html                 | ✅ Complete — branded error page with navigation links
| profile.html             | ✅ Complete — patient profile/settings page
| confirmation.html        | ✅ Complete — post-booking confirmation with print
| admin-patients.html      | ✅ Complete — admin view all patients with search
| admin-analytics.html     | ✅ Complete — admin appointment analytics with stats |

---

## KNOWN BUGS
- index.html: buttons don't update after login (needs async session check in non-module script)
- doctors pages: "Dr." showing twice (DB stores names with prefix already)
- notifications.html: layout broken (uses inline styles instead of CSS classes)
- admin-login.html: invalid credentials error (signOut before signIn can cause issues)

## MISTAKES TO NEVER MAKE
- Never add "Dr." prefix — names already include it in DB
- Never use var — always const/let
- Never use require() — ES modules only
- Never use PHP, MySQL, or any server language
- Never use non-semantic divs where semantic tags exist
- Never skip aria labels on interactive elements
- Never use sharp corners on cards or buttons
- Never skip error handling on Supabase calls
- Never skip requireAuth() on protected pages
- Never break TRM branding rules
- Never use pure white as page background
- Never regenerate style.css, supabase.js, auth.js unless asked
- Never use inline onclick handlers — always addEventListener
- Year is 2026 not 2025 — never write 2025 in any file