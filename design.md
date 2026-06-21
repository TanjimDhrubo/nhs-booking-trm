# NHS Booking — Design System

## 1. Design Tokens

### Color Palette

```css
--nhs-blue:       #005EB8;  /* Primary accent — used sparingly */
--nhs-blue-soft:  #E8F1FB;  /* Hover/tint surfaces */
--nhs-blue-mid:   #0072CE;  /* Button hover state */
--nhs-dark:       #1A2332;  /* Body text */
--nhs-muted:      #6B7280;  /* Secondary text */
--nhs-green:      #007F3B;  /* Success / completed */
--nhs-green-soft: #E8F5EE;
--nhs-red:        #D5281B;  /* Cancelled / danger */
--nhs-red-soft:   #FDF0EF;
--nhs-amber:      #FFB81C;  /* Admin staff badge */
--bg-page:        #F9F7F4;  /* Warm off-white page background */
--bg-card:        #FFFFFF;  /* Card surface */
--bg-subtle:      #F3F4F6;  /* Table header, subtle hover fills */
--border:         #E5E7EB;  /* Card borders, table borders */
--border-soft:    #F0F0EE;  /* Navbar bottom border, light dividers */
```

- Only one accent: `--nhs-blue`. Greens, reds, and amber are semantic (status indicators), not decorative accents.
- Page background is warm off-white (`#F9F7F4`), never pure white.
- All surfaces use `--bg-card` (white) — cards pop against the warm page.

## 2. Typography

### Font Stack
```css
--font: 'Segoe UI', Arial, sans-serif;
```

### Size Scale
| Use | Size | Weight | Letter-spacing |
|-----|------|--------|---------------|
| Hero H1 | 48px / clamp | 700–800 | -1px to -2.5px |
| Page H1 | 32px | 700 | -0.5px |
| Section H2 | 24–28px | 700 | -0.5px |
| Card title | 16–18px | 600 | normal |
| Body | 15–16px | 400 | normal |
| Meta / small | 13–14px | 500 | normal |
| Badge | 12px | 600 | +0.2px |
| Caption | 11px | 600 | +1px (uppercase) |

### Rules
- Body line-height: 1.6 (generous reading rhythm)
- Body max-width constraint: 65ch on content paragraphs
- H1 line-height: 1.08–1.2 (tight, intentional)
- H1 letter-spacing: negative tracking for display impact
- Header hierarchy: exactly one `<h1>` per page

## 3. Spacing

| Token | Value | Used for |
|-------|-------|----------|
| Card internal padding | 24–28px | All `.card`, `.feature-card`, `.auth-card` |
| Section vertical padding | 60–100px | Hero, feature sections, CTA blocks |
| Grid gap (cards) | 16px | `.grid-2`, `.grid-3` |
| Form field gap | 20px | `.form-group` margin-bottom |
| Navbar height | 64px | Sticky top bar |
| Section margin-bottom | 32px | Below `.page-header`, between sections |
| Button padding (default) | 12px 24px | `.btn-primary`, `.btn-secondary` |
| Button padding (small) | 7px 14px | `.btn-sm`, `.btn-danger` |

Generous whitespace is a defining characteristic — never compress vertical rhythm to fit more content.

## 4. Borders & Dividers

```css
--border: #E5E7EB;       /* Card outlines, table cell borders */
--border-soft: #F0F0EE;  /* Navbar bottom, light content dividers */
```

- Cards: `1px solid var(--border)` always — shadow alone is not enough definition
- Dividers between sections: `1px solid var(--border-soft)` or `var(--border)`
- Form inputs: `1.5px solid var(--border)` for clear active/inactive contrast
- Focus ring: `3px solid rgba(0,94,184,0.12)` — never `outline: none` without replacement

---

## 5. Elevation (Shadow System)

Borrow Cal.com's discipline here: shadows are layered, not single-value,
and pair with a hairline border rather than relying on shadow alone.

```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
--shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
--shadow-lg: 0 8px 32px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06);
--shadow-hover-blue: 0 20px 40px rgba(0,94,184,0.12);
```

- Resting card: `--shadow-sm` + `1px solid var(--border)`
- Hover/lift: `--shadow-hover-blue`, border tints toward
  `rgba(0,94,184,0.25)`, `translateY(-6px) scale(1.02)`
- Modal/dropdown/popup: `--shadow-lg`

## 6. Radius Scale

```css
--radius-sm: 6px;   /* badges, small buttons, inputs */
--radius-md: 12px;  /* buttons, action cards */
--radius-lg: 18px;  /* cards, panels */
--radius-xl: 24px;  /* auth-card, modals */
```

Never sharp (0px) corners anywhere. Never full-pill (9999px) except
badges and the staff/admin tag.

## 7. Components

### Buttons
- Primary: `--nhs-blue` fill, white text, `--radius-md`, weight 600
- Secondary: white fill, `--nhs-blue` border + text
- Danger: `--nhs-red-soft` fill, `--nhs-red` text/border, fills solid red on hover
- Ghost: transparent, `--nhs-muted` text, `--bg-subtle` on hover
- All buttons: `translateY(-1px)` + shadow lift on hover, never scale > 1.02

### Cards
- White surface, `1px solid var(--border)`, `--radius-lg`, `--shadow-sm`
- Hover (if interactive): lift + blue-tinted shadow + border tint
- Non-interactive cards (info, content) do not get hover treatment —
  hover states signal "this is clickable," don't fake it on static content

### Badges (status pills)
- `--radius-sm` rounded, 11–12px text, weight 600, soft-tint background
  matching the semantic color (confirmed=blue, completed=green,
  cancelled=red, checked_in=teal)

### Icons
- Use the Unicode symbol set already defined in AGENTS.md
  (▤ ☑ ◷ ◈ ⚕ ⊠ ⌂ ⛨ ⓘ ✦ ⁂) — never emoji, never broken SVG
- Wrap in `<span class="sym" aria-hidden="true">`
- Decorative only — always paired with visible text, never icon-only
  without an `aria-label` on the parent interactive element

### Background decoration
- Soft organic blobs (radial-gradient + irregular border-radius) at
  5–8% opacity max, NHS blue or green tint
- Dot-grid overlay at 6–8% opacity for hero sections only
- Never more than 2 decorative blobs per section
- Decoration always `pointer-events: none` and `aria-hidden="true"`

## 8. Motion

- Standard transition: `all 0.2s ease` (buttons, links, simple hover)
- Card lift: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)` (slight bounce)
- Page load: none required — keep first paint instant, no fade-in
  gatekeeping content (this caused real bugs earlier in this project —
  never reintroduce opacity:0 reveal-on-scroll patterns)
- Respect `prefers-reduced-motion` — wrap decorative animation in:
```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
```

## 9. Layout Containers

- `.container` — max-width 980px, standard content pages
- `.container-sm` — max-width 520px, auth/form pages
- Hero content — max-width 640px, centered, text-align center
- Two-column sections — `grid-2`, gap 16px, stacks to 1 column under 768px
- Three-column feature grids — `grid-3`, same stacking rule

## 10. Accessibility Non-Negotiables

(These come from the university semantic-HTML requirement — see
AGENTS.md section "Semantic HTML Rules" for the full mandate. This
section covers the **visual** consequences of that requirement.)

- Color is never the only signal — every badge has text, not just color
- Focus states are always visible: `outline: 3px solid` blue-tinted ring,
  never `outline: none` without a replacement focus style
- Minimum tap target 40×40px for any clickable element
- Text contrast: body text on `--bg-page` and `--bg-card` must clear
  WCAG AA (4.5:1) — `--nhs-muted` (#6B7280) on white passes; don't go
  lighter than that for body copy
- Skip-link present on every page

## 11. What This Project Deliberately Rejects

(Documenting these explicitly so future prompts to OpenCode don't
accidentally reintroduce them — every one of these caused a real bug
or a "looks unprofessional" complaint earlier in this project.)

- ❌ Emoji as icons — replaced with Unicode symbol set
- ❌ Pure white (#FFFFFF) page backgrounds — always warm off-white
- ❌ Heavy solid-blue navbar — white navbar, blue as accent only
- ❌ Inline `onclick=` handlers — `addEventListener` only
- ❌ `opacity:0` scroll-reveal patterns — broke card visibility before
- ❌ Generic NHS-clone look — this is a deliberately elevated, premium
  reinterpretation, not a literal NHS.uk reproduction
- ❌ Glassmorphism / heavy blur effects — clashes with the flat warm-card style
- ✅ Dark mode supported — `.dark` class toggle on `<html>`, persisted in localStorage (`trm-theme` key). Toggle button in navbar / menu popup. All component colors adapt via `:root.dark` CSS variables.

## 12. Reference Lineage

This system was informed by structural patterns (type-scale discipline,
layered shadow elevation, spacing rigor) from Cal.com's DESIGN.md
(getdesign.md/cal/design-md) and the warm-surface softness of Notion's
(getdesign.md/notion/design-md) — but the actual palette, components,
and rules above are original to NHS Booking TRM and supersede both
sources in any conflict.
