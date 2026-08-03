# Dashboard Redesign — Patient Control Center (v2)

**File:** `v2\test run v2\dashboard.html`
**Backup:** `v2\test run v2\dashboard.backup-v2.html` (restore point)
**Status:** ✅ IMPLEMENTED + verified (light/dark/mobile, 0 console errors, no horizontal scroll)

## The Problem
The current dashboard is a *menu*: 8 identical cards on a rigid 3-col grid, an
almost-empty hero ("Good morning" + number chips), no hierarchy, no real
information. It answers "here are all the pages" instead of "what do I need to
do today?"

## The Shift
**Think patient control center, not homepage.** Every section must show real
data from the database, not just links. Mix summaries, lists, and actions so no
two sections look identical. Different widths create hierarchy.

---

## New Layout (desktop ≥1024)

```
┌──────────────────────────────────────────────────────┐
│ HERO — "Good morning, Tanjim"                        │
│        "You have 1 appointment today at 2:30 PM"     │
│        [ View Details ]  [ Check In ]                │
├───────────────────────────────┬──────────────────────┤
│ NEXT APPOINTMENT (2fr)        │ QUICK ACTIONS (1fr)  │
│  Dr. Sarah Ahmed              │  + Book              │
│  Tomorrow · 14:30             │  👨 Doctors          │
│  Cardiology  [View]           │  🤖 AI Assistant     │
│                               │  📜 History          │
├───────────────────────────────┼──────────────────────┤
│ UPCOMING APPOINTMENTS (2fr)   │ RECENT ACTIVITY (1fr)│
│  list w/ date block, doctor,  │  last 5 notifications│
│  status, Reschedule, Cancel   │  with timeAgo        │
├───────────────────────────────┴──────────────────────┤
│ HEALTH TIP banner (full width)                       │
└──────────────────────────────────────────────────────┘
```

**Mobile:** single column, stacked — Hero → Next Appt → Quick Actions →
Upcoming → Recent Activity → Tip.

---

## Decisions (locked)

1. **Kill the 8-card grid** entirely. No wall of identical cards.
2. **Hero = real summary, not empty greeting.** Time-based greeting + name,
   then a live line: count of today's appointments, or this week's, or "No
   appointments today — Book one." Buttons appear only when meaningful.
3. **Next Appointment card replaces the "Book" card.** Pulls the real next
   upcoming appointment: doctor, date/time, specialty, status. No data → a
   friendly empty state with a Book Now button.
4. **Quick Actions = small, 4 items only:** Book, Doctors, AI Assistant,
   History. Compact icon buttons, not cards.
5. **Removed from dashboard:** Privacy (lives in footer + nav menu), Profile
   (moves to an initials avatar chip in the navbar), giant stat chips.
6. **Recent Activity** = last 5 `notifications_trm` rows with `timeAgo` +
   semantic colored status dot.
7. **One accent colour.** Icons are teal by default; colour only communicates
   meaning (green success / amber pending / red warning / blue info).
8. **Upcoming Appointments list keeps** its date block, doctor, specialty,
   status badge, Reschedule + Cancel (real working actions).
9. **Hero buttons** — Check In actually performs the check-in flow inline
   (inserts into `checkins_trm`, updates status to `checked_in`) — pending
   question below.
10. **Reversible** — backup `dashboard.backup-v2.html` before editing.

---

## Open Questions — RESOLVED

- [x] **Health Tip banner** → **SKIP IT.** No data source; keep the dashboard
      tight and fully data-driven.
- [x] **Check In button** → **Link to `checkin.html`.** The dedicated page
      already owns the QR + full flow; duplicating inline risks bugs and
      breaks consistency. Hero shows Check In only when there's a confirmed
      appointment today.
- [x] **Recent Activity** → **Plain list.** Last 5 notifications with a
      semantic coloured dot + `timeAgo`.
- [x] **Profile** → **Initials avatar chip in the navbar** linking
      `profile.html`. Kills the Profile card, keeps access.

## Homepage Consistency (user directive)

Dashboard MUST feel like the same product as the redesigned homepage, not a
second website. Therefore:

- Reuse the v3 homepage visual language: cream `--bg-page`, teal
  `--nhs-blue` accents, coral `.btn-primary` CTAs, `--radius-lg` cards,
  `--border`, `--shadow-sm`.
- Reuse the homepage's **eyebrow** treatment (`.story-eyebrow`: small
  uppercase teal label) above section headings.
- Same `.container` (980px) wrapper the homepage uses.
- Icons teal by default; colour only communicates meaning
  (green success / amber pending / red warning / blue info).
- Greeting uses the patient's **first name** ("Good morning, Tanjim") to
  match the homepage's personal tone.

---

## Data wiring

| Section | Query |
|---|---|
| Hero summary | `appointments_trm` filtered to today (confirmed) |
| Next appointment | `appointments_trm` ≥ now, not cancelled, order asc, limit 1 + `doctors_trm(name, specialisation)` |
| Upcoming list | same, limit 5 (all upcoming, incl. today) |
| Recent activity | `notifications_trm` order `sent_at desc`, limit 5 |
| Check-in (if inline) | insert `checkins_trm` + update `appointments_trm.status = 'checked_in'` + notification |

## Verification
- Playwright: light + dark + mobile (375px), 0 console errors, no horizontal
  scroll, check-in state updates, empty-state renders when no appointments.
- Screenshot for user review.
