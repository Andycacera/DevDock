<!-- Context: project-intelligence/notes | Priority: medium | Version: 1.2 | Updated: 2026-04-24 -->

# Living Notes

> Current gaps, risks, and follow-up items for DevDock.

## Quick Reference

- **Purpose**: Capture active issues, unresolved questions, and technical debt
- **Update**: Weekly or when status changes
- **Archive**: Move resolved items to the archive section with dates

## Current State Snapshot

- Core context files are now populated for business, technical, bridge, and decisions
- The UI styling foundation now exists in `src/styles/base.css` and `src/styles/styles.css`
- The UI codebase still needs the actual dashboard/tray screens, but the theme layer is ready
- Electron, port scanning, and proxy automation are planned but not implemented yet

## Technical Debt

| Item | Impact | Priority | Mitigation |
|------|--------|----------|------------|
| UI screens are still scaffold-only | No real dashboard/tray experience yet | High | Build the DevDock screens on top of the new theme layer |
| No adapter layer in code | Shell migration blocked | High | Introduce service + adapter boundaries early |
| No port scanning implementation | Unassigned services can't be detected | Medium | Build Linux scanner module next |
| Theme foundation must stay in sync | Design drift would spread fast | Medium | Keep `base.css` and `styles.css` as the source of truth |

### Technical Debt Details

**UI screens are still scaffold-only**  
*Priority*: High  
*Impact*: No product workflow exists yet, even though the theme system is now ready  
*Root Cause*: Screens have not been replaced yet  
*Proposed Solution*: Build dashboard and tray UI using the new design tokens  
*Effort*: Large  
*Status*: Scheduled

## Open Questions

| Question | Stakeholders | Status | Next Action |
|----------|--------------|--------|-------------|
| Which proxy backend should be the MVP default? | Tech lead | Open | Decide between `/etc/hosts`, Nginx, or Caddy |
| Should port scanning be manual-first or scheduled? | Product + tech | Open | Define refresh behavior and idle policy |
| Do we need privileged helper services? | Tech lead | Open | Evaluate config write/reload flow |

### Open Question Details

**Which proxy backend should be the MVP default?**  
*Context*: DevDock must generate or manage routing configs safely  
*Stakeholders*: Tech lead, future users  
*Options*: `/etc/hosts`, Nginx, Caddy, dnsmasq  
*Timeline*: Before proxy integration starts  
*Status*: Open

## Known Issues

| Issue | Severity | Workaround | Status |
|-------|----------|------------|--------|
| No production code for routing yet | High | Use context docs as source of truth | Known |
| No tray implementation yet | Medium | None | Known |

### Issue Details

**No production code for routing yet**  
*Severity*: High  
*Impact*: The main product value is still unrealized  
*Reproduction*: Open the app scaffold; no DevDock UI exists yet  
*Workaround*: None  
*Root Cause*: Implementation phase has not started  
*Fix Plan*: Build UI, scanner, and route management in phases  
*Status*: Known

## Insights & Lessons Learned

### What Works Well
- Clear product intent - business and technical goals are aligned
- Shell-agnostic architecture - future migration remains possible
- Centralized styling foundation - theme tokens are now reusable and easy to extend

### What Could Be Better
- Concrete implementation milestones - needed before coding starts
- Resource/scan strategy - should be defined to keep the app lightweight

### Lessons Learned
- Start with the UI/service boundary - prevents shell lock-in
- Decide proxy strategy early - it drives permissions and UX
- Define the global theme early - it prevents repeated visual decisions in screens

## Patterns & Conventions

### Code Patterns Worth Preserving
- SvelteKit starter layout - easy entry point for the new dashboard
- Context-first planning - keeps business and tech aligned
- Tailwind 4 theme wiring - global tokens live in `base.css` and flow into `styles.css`

### Gotchas for Maintainers
- Do not let Electron APIs leak into Svelte components
- Avoid aggressive background polling before measuring idle cost

## Active Projects

| Project | Goal | Owner | Timeline |
|---------|------|-------|----------|
| DevDock MVP | Build dashboard, tray, scanner, and route management | Tech lead | Next phases |

## Archive (Resolved Items)

Moved here for historical reference. Current team should refer to current notes above.

### Resolved: None yet
- **Resolved**: N/A
- **Resolution**: N/A
- **Learnings**: N/A

## Onboarding Checklist

- [ ] Review known technical debt and understand impact
- [ ] Know what open questions exist and who's involved
- [ ] Understand current issues and workarounds
- [ ] Be aware of patterns and gotchas
- [ ] Know active projects and timelines
- [ ] Understand the team's priorities

## 📂 Codebase References

- `apps/ui/src/routes/+page.svelte` - Current UI scaffold that needs replacement
- `apps/ui/src/routes/+layout.svelte` - Shared app layout entry
- `apps/ui/src/styles/base.css` - Global design tokens and Nunito font faces
- `apps/ui/src/styles/styles.css` - Tailwind 4 theme wiring
- `apps/ui/package.json` - Current toolchain and test scripts

## Related Files

- `decisions-log.md` - Past decisions that inform current state
- `business-domain.md` - Business context for current priorities
- `technical-domain.md` - Technical context for current state
- `business-tech-bridge.md` - Context for current trade-offs
