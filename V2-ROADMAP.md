# V2 Roadmap — NHS Booking TRM

Work order for the Phase V2 redesign. **No code until the user directs each step.**

## Ground Rules
- User is the designer; assistant executes step-by-step. Nothing auto-starts.
- Preserve ALL functionality: Supabase auth, booking, check-in, chat, questionnaire, admin panel, dark mode.
- Architecture stays fixed: same file structure/paths (`test run/css/style.css`, `test run/js/`, `test run/*.html`).
- Single CSS source: `test run/css/style.css`. No inline styles.
- Spec of record: `V2-DESIGN.md`.

## Phases

| # | Phase | Scope |
|---|-------|-------|
| 0 | **Docs** ✅ | `V2-DESIGN.md` + `V2-ROADMAP.md` written. AGENTS.md slimmed; REFERENCE.md created. |
| 1 | **Foundation** | Rewrite token block + fonts in `css/style.css`: Fraunces + Work Sans, light tokens + deep-teal-night dark tokens. No page HTML changes yet. |
| 2 | **Core chrome** | Navbar (teal box + Fraunces wordmark), footer, watermark, skip-link across all 22 pages. |
| 3 | **Homepage** | `index.html` — editorial serif hero, restyled feature sections, CTA in coral. |
| 4 | **Component pass** | style.css component restyle: buttons (coral CTA), cards, badges, forms, alerts, loading/empty states. |
| 5 | **Patient portal** | login, register, dashboard, book, history, checkin, reschedule, notifications, profile, questionnaire, confirmation. |
| 6 | **Chat** | `chat.html` AI assistant restyle. |
| 7 | **Admin portal** | admin-login, admin-dashboard, admin-patients, admin-analytics, admin-questionnaire + amber strip. |
| 8 | **Utility pages** | doctors, privacy, team, 404. |
| 9 | **Dark mode pass** | Tune deep-teal-night tokens; verify every page in dark + light. |
| 10 | **QA** | WCAG AA contrast audit, 40px tap targets, semantic HTML check, full functionality regression (auth, booking, check-in, chat, questionnaire, admin, dark mode). |

## Sequencing Notes
- Phases 1–4 are the visual backbone — most pages restyle "for free" via the shared component vocabulary.
- Phase 9 depends on 1; verify dark mode continuously, not just at the end.
- Phase 10 is the gate before any submission/demo.
