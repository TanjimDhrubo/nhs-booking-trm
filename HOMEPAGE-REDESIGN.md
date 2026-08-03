# Homepage Redesign — Perspective, Plan & Open Questions

> Status: **Discussion / planning only — no code changed yet.**
> Companion docs: `V2-DESIGN.md`, `V2-ROADMAP.md`.

---

## 1. The problem

ChatGPT's critique of the current homepage (`v2/test run v2/index.html`) is largely correct:

- 6 identical feature cards (icon + title + description), equal spacing, all centered
- No visual hierarchy — nothing is "bigger" or "more important" than anything else
- This is the classic **AI-template layout** (ChatGPT/Claude/Lovable/v0 all generate it)
- The card grid makes the site feel like a generated dashboard, not a designed product

Current homepage sections:
1. Hero (centered: badge, headline, subtext, 2 CTAs, 3 trust bullets)
2. Stats bar (500+, 6, 100%, 24/7)
3. "Everything you need" — grid of **6 feature cards** ← the problem section
4. AI Assistant card (7th card, horizontal variant)
5. Teal CTA band

---

## 2. My perspective

### Agree with ChatGPT
- The 6-card grid is the weakest element and should be restructured, not polished
- The **patient-journey story** concept is the right framework for a booking system:
  visitors should understand "how do I see a doctor" in one scroll
- **Faces over icons** for doctors — you already have a `doctors.html` with real data
- **More whitespace** → premium feel; current sections are uniform 80px padding
- **Alternating left/right layouts** break the "every box is the same box" rhythm

### Disagree / nuance
1. **Features can't disappear entirely.** This is a uni project deliverable — the
   homepage should *prove* the system covers the spec. Fix = change weight, not remove
   features. Feature pages are already built and working; this is pure HTML/CSS
   restructuring of `index.html`.
2. **Testimonials would be invented content** (no testimonials data exists). Optional,
   not part of the redesign.
3. **Keep the 3 most "system" features prominent** (Book, Check-in, History) as full-width
   story sections; fold Notifications + Privacy into a small supporting row so nothing is lost.
4. **The botanical/watercolor corner idea stays relevant** — once layout rhythm is fixed,
   subtle corner art is what makes it stop looking templated. Design later, per earlier decision.

---

## 3. Proposed homepage structure (v3)

```
Hero (keep, tighten) ────────────── gradient bg + headline + CTAs
────────────────────────────
Stats bar (keep) ────────────────── credibility strip
────────────────────────────
① How it Works ──────────────────── numbered 4-step journey
   Find a doctor → Book → Reminder → Check in & Visit
   (replaces the 6-card grid concept, teaches the flow)
────────────────────────────
② Feature A — Book Appointment ───── left text + right illustration/SVG
   ("Need to see a doctor? Book in under 60 seconds.")
   [Book Now] button
────────────────────────────
③ Feature B — Check In ──────────── right text + left illustration (layout swapped)
   ("Check in before you arrive. Skip the queue.")
────────────────────────────
④ Doctors preview ───────────────── 3 large doctor cards (real data from doctors page)
────────────────────────────
⑤ AI Assistant banner ───────────── wide teal gradient section
────────────────────────────
Supporting row (small) ──────────── Notifications + Secure & Private + History links
────────────────────────────
CTA band (keep) ───────────────────
────────────────────────────
Footer (keep)
```

Design principles:
- **Rhythm variety**: full-width, alternating sides, small row — never 6 of the same box
- **Story order = patient journey**, not feature list
- **Faces/illustrations** where possible instead of icon tiles
- **More whitespace** (aim ~100-120px section padding)
- Every section keeps a real link (no dead ends)

---

## 4. Open questions for you

> ✅ **All answered (2026-08-01). Decisions locked:**

| Question | Decision |
|---|---|
| Scope | **Homepage only** (`index.html`) |
| Doctors preview data | **Pull real data** — same Supabase `doctors_trm` query as `doctors.html` (`id, name, specialisation`, `available = true`, `.limit(3)`), initials avatars with the existing `avatarColours` palette |
| Feature-section visuals | **Hand-built SVGs** (teal-palette calendar/doctor + phone check-in scenes), git-safe, no external assets |
| Testimonials | **Skip** — no data exists, avoid invented content |
| How-it-works layout | **Horizontal 4 numbered steps** (desktop), stacked vertical on mobile |

---

## 5. Suggested phases

- **P1** — Restructure `index.html` into the new section skeleton (story + features)
- **P2** — Design the "How it Works" journey component
- **P3** — Alternating feature sections with SVG illustration + CTA
- **P4** — Doctors preview (real data, 3 cards)
- **P5** — AI banner + supporting row + whitespace pass
- **P6** — Verify light/dark/mobile with Playwright, 0 console errors

Nothing in this file is implemented yet.
