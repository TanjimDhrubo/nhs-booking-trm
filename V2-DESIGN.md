# V2 Design — NHS Booking TRM

Visual spec for the Phase V2 redesign. Agreed direction, docs phase — no code yet.

## V2 Positioning

- **Register:** product. Users: patients + doctors/admin staff.
- **Personality:** Warm · Calm · Trustworthy (see PRODUCT.md).
- **Mood:** *Editorial serif.* A premium reinterpretation of the NHS booking experience — magazine-grade confidence on a warm cream canvas, calm enough to reassure an anxious patient.
- **Anti-AI guardrails** (from PRODUCT.md, non-negotiable): no heavy-blue navbar, no generic NHS clone, no emoji icons, no gradient text, no over-rounded 32px+ cards, no side-stripe borders, no `opacity:0` scroll reveals.
- **Architecture stays fixed:** same file structure/paths. All functionality preserved (auth, booking, check-in, chat, questionnaire, admin, dark mode).

---

## 1. Palette — Light

Source: user's palette reference. Teal is the structural brand color; coral is the single call-to-action; indigo is a supporting accent for badges/new features only.

| Token | Value | Use |
|---|---|---|
| `--teal` | `#146C64` | primary brand — header, nav, links, secondary buttons |
| `--teal-tint` | `#DCEEEA` | selected states, hover fills, focus rings |
| `--cream` | `#FBF8F3` | page background (never pure white) |
| `--card` | `#FFFFFF` | cards, forms, surfaces |
| `--ink` | `#2B2B2B` | headlines + body text |
| `--muted` | `#5F6E6A` | helper text, captions (≥4.5:1 on cream/white) |
| `--coral` | `#C6461F` | **primary CTA** — "Book appointment" buttons |
| `--coral-dark` | `#B23D1B` | CTA hover state |
| `--indigo` | `#5B5FEF` | badges, "new feature" accents (used sparingly) |
| `--green` | `#1F8449` | success / confirmed |
| `--red` | `#C23333` | errors / cancelled |
| `--border` | `#E7E0D5` | card/table borders (warm neutral) |
| `--border-soft` | `#F0EBE2` | navbar bottom, light dividers |

Rules:
- One CTA color: coral. Nothing else uses coral.
- Teal is the brand/structure color; indigo is a supporting accent; green/red are semantic status, never decorative.
- Amber `#FFB81C` is reserved for the **admin-only** "STAFF ONLY" badge + admin accent strip (unchanged from v1).

## 2. Dark Mode — Deep Teal Night

Near-black green-teal surfaces, warm cream text, coral retained as the glow accent. *Initial proposal — tuned during the dark-mode pass.*

| Token | Value |
|---|---|
| `--bg-page` | `#0F1E1D` |
| `--bg-card` | `#162726` |
| `--bg-subtle` | `#1D302E` |
| `--border` | `#29423F` |
| `--border-soft` | `#1D302E` |
| `--ink` | `#EAE6DE` |
| `--muted` | `#9FB0AC` |
| `--teal` | `#45B5AA` |
| `--teal-tint` | `#1C3533` |
| `--coral` | `#E06940` |
| `--indigo` | `#8588FF` |
| `--green` | `#43B069` |
| `--red` | `#E26363` |

---

## 3. Typography

- **Display:** **Fraunces** (weights 400–700) — H1/H2, brand wordmark, hero, big numbers.
- **Body:** **Work Sans** (400–600) — body, buttons, labels, forms, UI text.
- **Mono:** system mono for NHS numbers, codes, badge values.

### Scale
| Use | Font | Size / Weight | Notes |
|---|---|---|---|
| Hero H1 | Fraunces | `clamp(2.5rem, 6vw, 4rem)` / 600 | tight tracking `-0.02em`, `line-height 1.05` |
| Page H1 | Fraunces | `2rem` / 600 | `-0.01em` |
| Section H2 | Fraunces | `1.5rem` / 600 | |
| Card title | Work Sans | `1.125rem` / 600 | |
| Body | Work Sans | `1rem` / 400 | `line-height 1.6` |
| Small / meta | Work Sans | `0.875rem` / 500 | |
| Badge / caption | Work Sans | `0.75rem` / 600 | uppercase, `+0.06em` |
| Brand wordmark | Fraunces | `1.125rem` / 600 | |

- Exactly one `<h1>` per page; correct h1–h6 hierarchy (university requirement).
- Body paragraphs max `65ch`.

---

## 4. Layout & Containers

- `.container` max-width **1040px** (slightly wider than v1's 980 for editorial air).
- `.container-sm` max-width **520px** (auth/form pages).
- Section vertical padding 56–96px; card padding 24–28px; grid gaps 16px (`grid-2`, `grid-3`, stack <768px).
- Navbar 64px sticky, cream surface, `--border-soft` bottom hairline.
- Hero content max-width 680px, generous top padding.
- Generous whitespace is the defining quality — never compress vertical rhythm.

## 5. Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6px | badges, small inputs |
| `--radius-md` | 10px | buttons, action cards |
| `--radius-lg` | 16px | cards, panels |
| `--radius-xl` | 22px | auth-card, modals |

No sharp corners; no pill (9999px) except badges and the admin tag. **Never 32px+.**

## 6. Elevation

Warm-tinted, layered — shadows pair with a 1px border, never rely on shadow alone.

```css
--shadow-sm: 0 1px 3px rgba(43,43,43,.05), 0 1px 2px rgba(43,43,43,.04);
--shadow-md: 0 4px 16px rgba(43,43,43,.08), 0 2px 6px rgba(43,43,43,.05);
--shadow-lg: 0 8px 32px rgba(20,108,100,.10), 0 4px 12px rgba(20,108,100,.06);
```

---

## 7. Components

### Navbar
- Cream surface, sticky 64px, `--border-soft` bottom hairline.
- **Logo:** teal box (keep the square-box shape, recolored to `--teal`) + Fraunces wordmark "NHS Appointment Booking | TRM".
- Links in Work Sans; primary navbar action = coral "Book now" button.

### Buttons
- **Primary (CTA):** coral fill, white text — book, confirm, check-in.
- **Secondary:** white/cream fill, teal border + teal text — cancel, back, view.
- **Ghost:** transparent, `--muted` text.
- **Danger:** red-soft tint, red text.
- All: `translateY(-1px)` + shadow lift on hover; radius `--radius-md`.

### Cards
- White surface, 1px `--border`, `--radius-lg`, `--shadow-sm`.
- Interactive cards lift + teal-tint border on hover; static cards never fake hover.

### Badges (status pills)
- Soft-tint pills, 11–12px, 600: confirmed=green, cancelled=red, checked_in=teal, completed=green-soft, questionnaire=indigo. Always carries text — color is never the only signal.

### Forms
- Inputs: 1.5px `--border`, `--radius-sm`, 12–14px padding; focus ring = 3px `--teal-tint` (never `outline:none`).
- Labels Work Sans 500; helper text `--muted`.

### Icons
- Unicode symbol set (▤ ☑ ◷ ◈ ⚕ ⊠ ⌂ ⛨ ⓘ ✦ ⁂) wrapped in `<span class="sym" aria-hidden="true">` — never emoji.

### Backgrounds
- Soft organic blobs ≤8% opacity (teal/cream tint), dot-grid on hero only; `pointer-events:none`, `aria-hidden`.

---

## 8. Motion

- Standard: `all 0.2s ease`.
- Card lift: `all 0.3s cubic-bezier(0.34,1.56,0.64,1)`.
- No page-load fade-in gating (caused real bugs — never `opacity:0` reveals).
- `prefers-reduced-motion: reduce` disables all animation.

## 9. Accessibility

Carried from PRODUCT.md — WCAG AA floor, semantic HTML throughout, one h1 per page, visible focus rings, 40×40px tap targets, color never the only signal, dark mode via `.dark` + localStorage, reduced-motion support.

## 10. Deliberately Rejected

- Heavy solid-blue navbar / NHS.uk clone
- Emoji icons · gradient text · glassmorphism
- Over-rounded (32px+) cards · side-stripe borders · ghost-card + wide shadow combos
- `opacity:0` scroll reveals · pure white page backgrounds
- Generic AI template tells (identical card grids, tiny uppercase eyebrows everywhere)
