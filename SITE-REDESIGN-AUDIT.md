# Site-Wide Page Audit — v3 Consistency Pass

Date: 2026-08-03
Purpose: Find any page still carrying the old v1 design language or the "AI template" patterns,
after the homepage (v3) and dashboard (v2) redesigns.

## Design language we enforce everywhere
- Shared navbar + `page-header` (h1 + short muted subtitle) + `.container` / `.container-sm`
- Teal `--nhs-blue` accents, coral `.btn-primary` CTAs, cream `--bg-page`, `--radius-lg` cards
- Icons teal by default; color only for meaning (green success / red danger / amber pending)
- No hero-sections, no gradient borders, no blobs/dot-grids, no centered stats-bar with dividers
- Pages answer one core question: lists for history/activity, forms for input, prose for docs
- Consistency rule: navbar avatar on every protected page (dashboard decision, propagated site-wide)

## Per-page verdict (all 22 read in full)

| Page | Verdict | Notes |
|------|---------|-------|
| index.html | ✅ done (v3) | story sections, doctors preview, AI banner |
| dashboard.html | ✅ done (v2) | hero summary + next card + quick actions + lists |
| privacy.html | 🔧 docs-style | content excellent but wrapped in 9 colored icon-cards — the pattern we dropped. Convert to GitHub/Stripe-docs layout, keep copy verbatim. |
| team.html | 🔧 v3 refresh | ONLY page still on old `.hero-section` + blobs + dot-grid + stats-bar + gradient card borders. Content fine. |
| notifications.html | 🔧 stats fix | "Activity Summary" counts only the last 50 rows. Make totals real via exact count queries. |
| book.html | ✅ consistent | form page, single card, fine |
| doctors.html | ✅ consistent | search + card directory (cards OK — it's a directory) |
| history.html | ✅ consistent | filter chips + table, data-first |
| checkin.html | ✅ consistent | dropdown + today/upcoming lists |
| profile.html | ✅ consistent | two form cards |
| reschedule / confirmation / questionnaire | ✅ consistent | flow pages, functional |
| chat.html | ✅ consistent | assistant UI |
| login / register / 404 | ✅ consistent | auth/error pages |
| admin-* (5 pages) | ✅ consistent | staff portal amber identity — separate audience, leave as-is |

## Site-wide change
- `js/auth.js` → `showUserName` also renders the initials avatar chip (→ profile.html) used on the
  dashboard, so every protected page gets it with one shared change. No per-page edits needed.
- Shared `.navbar-avatar` CSS moves into `css/style.css` (dashboard keeps its inline copy).

## Status
- [x] Full read of all 22 pages
- [x] privacy.html docs-style redesign
- [x] team.html v3 refresh
- [x] notifications.html real stats
- [x] auth.js navbar avatar propagation
- [x] Playwright verification + screenshots
