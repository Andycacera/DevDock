<!-- Context: ui/design-system | Priority: critical | Version: 2.0 | Updated: 2026-05-06 -->

# Design System: DevDock UI
**Project ID:** apps/ui

## 1. Visual Theme & Atmosphere
Dark, technical, calm. UI feels like a focused control surface: low glare, strong structure, and clear hierarchy. Mood is precise rather than decorative, with warm accents used only for emphasis and state.

## 2. Color Palette & Roles
- **Deep Graphite Background** (`#131313`) — main app backdrop.
- **Night Surface** (`#111111`) — primary panels and cards.
- **Raised Slate Surface** (`#2a2a2a`) — stronger surface layer for contrast.
- **Soft Foreground** (`#e2e2e2`) — main text and icons.
- **Muted Border Slate** (`#424754`) — default separation lines.
- **Primary Cobalt** (`#005ac2`) — primary actions, focus states, active highlights.
- **Primary Sky Tint** (`#adc6ff`) — lighter interactive emphasis.
- **Primary Deep Ink** (`#001a42`) — deepest primary tone for contrast.
- **Secondary Blue-Gray** (`#283044`) — secondary fills and supporting UI.
- **Warm Amber Accent** (`#ffb786`) — attention, callouts, positive warmth.
- **Success Green** (`#22c55e`) — success state.
- **Warning Gold** (`#f59e0b`) — warning state.
- **Danger Rose** (`#ffb4ab`) — error and destructive state.

## 3. Typography Rules
Nunito is the main voice: friendly, rounded, and readable in dense interfaces. System monospace is reserved for IDs, code, logs, and technical values. Text leans clean and compact; no ornamental display styling.

## 4. Component Stylings
* **Buttons:** Slightly rounded, fast-feeling controls. Primary buttons use cobalt fill with light text; secondary buttons use slate fills; base buttons stay transparent until hover. Hover brightens, active state scales down a touch.
* **Cards/Containers:** Flat, grounded surfaces with a muted border and subtle rounding. Cards use surface fills; tinted variants pull from primary or secondary deep tones.
* **Inputs/Forms:** Darker base fill, medium rounding, and a firm border. Focus uses ring feedback instead of glow-heavy effects. Disabled and read-only states reduce opacity.

## 5. Layout Principles
Grid rhythm stays tight and predictable. Spacing follows a 4px unit, with comfortable density and clear separation lines. Borders do more work than shadows; depth comes from layered surfaces, not dramatic elevation.

## 📂 Codebase References
- `apps/ui/src/styles/base.css` — semantic tokens, fonts, radius, shadows
- `apps/ui/src/styles/styles.css` — Tailwind theme bridge
- `apps/ui/src/styles/components/buttons.css` — button states and fills
- `apps/ui/src/styles/components/cards.css` — card surface variants
- `apps/ui/src/styles/forms.css` — input and textarea rules
- `apps/ui/src/routes/+layout.svelte` — global stylesheet entrypoint

## Reference
Source of truth: stylesheet tokens in `apps/ui/src/styles/base.css` and `apps/ui/src/styles/styles.css`.
