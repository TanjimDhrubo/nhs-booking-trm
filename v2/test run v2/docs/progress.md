# NHS Appointment Booking System — Project Progress

## Current State
The project is fully restored to its git-tracked state. All 22 HTML pages, CSS, JS modules, and auxiliary files are intact and organised.

## Directory Structure
- `D:\NHS Website\test run\` — Main web application (22 pages, css/, js/)
- `D:\NHS Website\nhs-auxiliary\` — Docs, assignments, design plans, supabase config
- `D:\NHS Website\PRODUCT.md` — Strategic product context (impeccable design skill)
- `D:\NHS Website\DESIGN.md` — Visual design system + agreed v2 direction
- `D:\NHS Website\.impeccable\live\config.json` — Live mode pre-configured

## Tooling
- Impeccable skill updated to v4.0.4 (hooks installed)
- MCP servers added: Supabase (OAuth authed) + Context7 — both connected
- Playwright MCP connected; Telegram disabled
- All 43 skills up to date
- Config reference path fixed (`D:/test run` → `D:/NHS Website/test run`)

## Next Session — V2 Redesign
The user will DIRECT the redesign step-by-step (user is the designer, assistant executes). Do NOT start without their direction.

- **Phase V2 started** — docs phase complete:
  - `D:\NHS Website\V2-DESIGN.md` — active V2 spec (palette, typography, components, dark mode, a11y)
  - `D:\NHS Website\V2-ROADMAP.md` — 10-phase work order (Phase 0 docs ✅)
- **V2 palette (user-provided, replaces teal/terracotta/cream):** teal #146C64 (brand) · coral #C6461F (CTA only) · cream #FBF8F3 (page bg) · white cards · ink #2B2B2B · muted #5F6E6A · indigo #5B5FEF (badges) · green #1F8449 · red #C23333. Dark = deep teal night.
- **V2 decisions:** editorial serif hero (Fraunces display + Work Sans body), teal-box logo + Fraunces wordmark, dark mode = deep teal night.
- **Context slimming:** `nhs-auxiliary/AGENTS.md` cut from 475→81 lines; full reference moved to `nhs-auxiliary/REFERENCE.md` (read on demand).

- **No boundaries** — be bold, creative, anything goes visually.
- **Architecture stays the same** — keep file structure/paths mostly absolute and unchanged (`test run/css/style.css`, `test run/js/`, `test run/*.html`).

- Full UI redesign (v2) — premium visual overhaul while preserving all functionality
- Keep ALL existing features: Supabase auth, booking, check-in, chat, questionnaire, admin panel, dark mode
- Anti-AI patterns: no heavy blue navbar, no generic NHS clone, no emoji icons, no gradient text, no over-rounded cards, no side-stripe borders
- Note: live mode (`$impeccable live`) needs `http://localhost:8400` allowed in the CSP meta tags of all 22 pages
