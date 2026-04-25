<!-- Context: project-intelligence/decisions | Priority: medium | Version: 1.3 | Updated: 2026-04-24 -->

# Decisions Log

> Record the decisions that shape DevDock so future changes preserve the original intent.

## Quick Reference

- **Purpose**: Preserve rationale behind core product and architecture choices
- **Format**: Short decision entries with impact and alternatives
- **Status**: Decided | Pending | Under Review | Deprecated

## Current Decision Set

- Shell strategy: Electron first, Tauri later if needed
- UI strategy: SvelteKit with a service abstraction layer
- Domain strategy: use `.localhost` to avoid `.local` ambiguity
- Routing strategy: local proxy + host resolution managed by DevDock
- Theme strategy: centralize tokens in `src/styles/base.css` and wire Tailwind 4 in `src/styles/styles.css`
- Typography strategy: load Nunito locally from variable `.woff2` files
- Shape strategy: use lightly rounded corners instead of sharp containers

## Decision: Shell-agnostic UI architecture

**Date**: 2026-04-24
**Status**: Decided
**Owner**: Tech lead

### Context
DevDock needs Electron capabilities now, but the UI should survive a future Tauri move.

### Decision
Keep Svelte components free of direct Electron calls and route operations through a frontend service layer.

### Rationale
This preserves portability and keeps business logic out of shell-specific APIs.

### Impact
- **Positive**: Easier shell migration and testing
- **Negative**: More upfront structure
- **Risk**: Abstraction can become leaky if rushed

### Related
- `technical-domain.md`
- `business-tech-bridge.md`

## Decision: Use `.localhost` for friendly domains

**Date**: 2026-04-24
**Status**: Decided
**Owner**: Tech lead

### Context
`.local` can conflict with mDNS behavior on Linux systems.

### Decision
Use `.localhost` domains for developer-facing routes.

### Rationale
It is clearer, safer, and aligned with local development intent.

### Impact
- **Positive**: Predictable local domain behavior
- **Negative**: Needs config generation

### Related
- `business-domain.md`
- `technical-domain.md`

## Decision: Centralize UI theme tokens in shared CSS

**Date**: 2026-04-24
**Status**: Decided
**Owner**: Tech lead

### Context
The UI needed one scalable design system instead of repeating colors and radius values per screen.

### Decision
Keep global theme variables in `apps/ui/src/styles/base.css` and map them into Tailwind 4 in `apps/ui/src/styles/styles.css`.

### Rationale
This keeps the design system semantic, reusable, and easy to extend as more UI surfaces are added.

### Impact
- **Positive**: One source of truth for color, radius, typography, and shadows
- **Negative**: Requires discipline to keep tokens current
- **Risk**: Token drift if screens bypass shared styles

### Related
- `technical-domain.md`
- `living-notes.md`

## Decision: Load Nunito locally and soften shapes

**Date**: 2026-04-24
**Status**: Decided
**Owner**: Tech lead

### Context
The original theme leaned too technical and sharp for the desired product feel.

### Decision
Use local Nunito variable fonts and a lightly rounded radius scale for a friendlier dark UI.

### Rationale
Nunito improves approachability and readability, while subtle rounding makes the interface feel less rigid.

### Impact
- **Positive**: Better visual tone and offline reliability
- **Negative**: Slightly less stark technical identity
- **Risk**: Over-rounding could weaken the utility feel

### Related
- `technical-domain.md`
- `business-tech-bridge.md`

## Decision: Electron first, Tauri later

**Date**: 2026-04-24
**Status**: Decided
**Owner**: Tech lead

### Context
The first version needs tray, IPC, file access, and browser integration quickly.

### Decision
Build with Electron first and keep a future Tauri path open.

### Rationale
Electron has the mature desktop APIs needed for the MVP.

### Impact
- **Positive**: Faster implementation
- **Negative**: Bigger footprint initially
- **Risk**: Coupling if abstraction is ignored

### Related
- `technical-domain.md`
- `living-notes.md`

## Deprecated Decisions

None yet.

## Onboarding Checklist

- [ ] Understand the philosophy behind major architectural choices
- [ ] Know why certain technologies were chosen over alternatives
- [ ] Understand trade-offs that were made
- [ ] Know where to find decision context when questions arise
- [ ] Understand what decisions are pending and why

## 📂 Codebase References

- `apps/ui/package.json` - Current stack that reflects these choices today
- `apps/ui/src/routes/+page.svelte` - Baseline UI entry point affected by shell decisions
- `apps/ui/src/styles/base.css` - Theme tokens, fonts, and base behavior
- `apps/ui/src/styles/styles.css` - Tailwind 4 mapping for the shared theme

## Related Files

- `technical-domain.md` - Technical implementation affected by these decisions
- `business-tech-bridge.md` - How decisions connect business and technical
- `living-notes.md` - Current open questions that may become decisions
