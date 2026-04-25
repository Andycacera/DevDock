<!-- Context: project-intelligence/technical | Priority: critical | Version: 1.2 | Updated: 2026-04-24 -->

# Technical Domain

> DevDock is a shell-agnostic Linux desktop app: Svelte UI first, Electron now, Tauri later if needed.

## Quick Reference

- **Purpose**: Explain how DevDock is built and where key integration points live
- **Update When**: Stack changes, new adapters, architecture shifts, system integration work
- **Audience**: Developers, maintainers, agents

## Current Stack

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| UI framework | SvelteKit | 2.57.0 | Fast UI development, strong Svelte 5 support |
| UI language | TypeScript | 6.x | Safer desktop/UI logic |
| Build tool | Vite | 8.x | Fast dev/build cycles |
| Styling | Tailwind CSS 4 | 4.x | Compact utility styling with a central theme layer |
| Testing | Vitest + Playwright | 4.x / 1.59 | Unit + E2E coverage |
| Package/runtime tooling | Bun | current project default | Fast scripts and dependency management |
| Desktop shell | Electron (planned target) | N/A | Mature tray/IPC/system APIs |
| Future shell | Tauri v2 | N/A | Lower memory, future migration path |

## Architecture Pattern

Type: Hybrid desktop utility
Pattern: Svelte UI → service abstraction → desktop adapter → system integration

### Why This Architecture?

It keeps the UI portable while allowing Electron to handle tray, IPC, browser opening, and system commands today. The same abstraction can later delegate to Tauri without rewriting Svelte components.

## Project Structure

```txt
devdock/
├─ apps/
│  └─ ui/
│     ├─ src/routes/+page.svelte
│     ├─ src/routes/+layout.svelte
│     ├─ src/styles/styles.css
│     ├─ src/styles/base.css
│     └─ src/lib/
├─ .opencode/context/project-intelligence/
└─ docs/ (planned)
```

**Key Directories**:
- `apps/ui/` - Current SvelteKit app
- `apps/ui/src/routes/` - Entry pages/layouts
- `apps/ui/src/styles/` - Global theme tokens and Tailwind wiring
- `apps/ui/src/lib/` - Shared UI/service code

## UI Styling Foundation

The UI now centralizes design tokens in `apps/ui/src/styles/base.css` and wires Tailwind 4 through `apps/ui/src/styles/styles.css`. The app loads local Nunito variable fonts from `apps/ui/src/lib/assets/fonts/` and maps the theme into semantic Tailwind tokens for background, surface, border, primary, and radius values.

### Why This Matters

This keeps visual decisions in one place, makes the theme easy to scale, and avoids scattering color or radius values across components.

## Key Technical Decisions

| Decision | Rationale | Impact |
|----------|-----------|--------|
| SvelteKit UI first | Lightweight, reactive, good fit for utility UX | Fast dashboard and tray implementation |
| Adapter layer before shell coupling | Avoid Electron-specific code in components | Easier future Tauri migration |
| `.localhost` domain strategy | Safer than `.local` on Linux/mDNS | Clear, predictable dev domains |
| Local proxy + hosts/DNS control | Matches the app's routing mission | Can manage friendly URLs safely |
| Centralized theme tokens in `base.css` | Keep design values reusable and semantic | Easier UI scaling and maintenance |
| Local Nunito variable fonts | Avoid external font dependency | Reliable typography offline |
| Lightly rounded radius scale | Make the UI feel friendlier | Softer visual language than sharp corners |

See `decisions-log.md` for rationale and trade-offs.

## Integration Points

| System | Purpose | Protocol | Direction |
|--------|---------|----------|-----------|
| Electron adapter | Tray, IPC, browser, filesystem | Electron APIs | Outbound |
| Linux system tools | Detect ports/processes | `ss`, `lsof`, `systemctl` | Outbound |
| Local proxy backend | Route friendly domains | HTTP / config files | Outbound |
| UI service layer | Frontend-facing API | TypeScript modules | Internal |

## Technical Constraints

| Constraint | Origin | Impact |
|------------|--------|--------|
| Low idle resource use | Product goal | Avoid heavy polling and renderer bloat |
| Linux/GNOME focus | Target environment | Tray and window behavior must fit desktop UX |
| Privileged system ops | OS integration | Separate safe UI actions from elevated operations |
| Shell portability | Roadmap | No direct Electron calls inside Svelte components |

## Development Environment

- Setup: `cd apps/ui && bun install`
- Requirements: Bun, Node-compatible tooling, Playwright browsers
- Local Dev: `bun run dev`
- Checks: `bun run check && bun run test:unit`

## Deployment

- Environment: Local desktop app
- Platform: Linux desktop first
- Packaging: Electron initially, Tauri later if adopted
- Monitoring: Manual inspection + runtime metrics (planned)

## Onboarding Checklist

- [ ] Know the UI stack and current repo layout
- [ ] Understand the shell-agnostic adapter pattern
- [ ] Know the planned Linux system integration points
- [ ] Understand `.localhost` routing and proxy strategy
- [ ] Be able to run the Svelte app locally

## Current Implementation Notes

- The repo currently contains the `apps/ui` SvelteKit app, global styling foundation, and OpenAgent context files
- `apps/ui/src/routes/+page.svelte` is still the starter page, but the theme system is now in place
- Desktop shell folders (Electron/Tauri) are planned but not present in code yet

## 📂 Codebase References

- `apps/ui/package.json` - SvelteKit, TypeScript, Tailwind, Vitest, Playwright setup
- `apps/ui/src/routes/+page.svelte` - Current app entry scaffold
- `apps/ui/src/routes/+layout.svelte` - Shared layout and asset loading
- `apps/ui/src/styles/styles.css` - Tailwind 4 theme entrypoint
- `apps/ui/src/styles/base.css` - Global tokens, font faces, and base styles
- `apps/ui/src/lib/index.ts` - Shared library alias entry point

## Related Files

- `business-domain.md` - Why this technical foundation exists
- `business-tech-bridge.md` - How business needs map to technical solutions
- `decisions-log.md` - Full decision history with context
