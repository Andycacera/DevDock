<!-- Context: project-intelligence/bridge | Priority: high | Version: 1.2 | Updated: 2026-04-24 -->

# Business ↔ Tech Bridge

> This file maps DevDock workflows to the technical building blocks that will implement them.

## Quick Reference

- **Purpose**: Show how user workflows drive architecture and implementation choices
- **Update When**: New features, route/proxy changes, shell migration, UX shifts
- **Audience**: Developers, product/design, agents

## Core Mapping

| Business Need | Technical Solution | Why This Mapping | Business Value |
|---------------|-------------------|------------------|----------------|
| See running services fast | Port scanner + service list UI | Reduces friction versus raw ports | Faster development workflow |
| Open readable domains | Route storage + proxy config generation | Converts IP:port into friendly names | Less context switching |
| Manage from the tray | Electron tray popover + compact actions | Matches background utility use | Always available, low friction |
| Avoid shell lock-in | Adapter layer between UI and desktop shell | Keeps Svelte portable | Future migration flexibility |
| Stay lightweight | Minimal polling and lazy loading | Utility should not feel heavy | Lower idle CPU/RAM |
| Feel friendly, not rigid | Nunito + soft radius tokens + dark surfaces | Reduces visual tension in dense tooling | Better everyday usability |

## Feature Mapping Examples

### Feature: Friendly domain mapping

**Business Context**:
- User need: Stop typing `localhost:3000` all day
- Business goal: Reduce time wasted on repeated port lookups
- Priority: Core workflow

**Technical Implementation**:
- Solution: Store route mappings and generate proxy config
- Architecture: Core domain → adapter → system config
- Trade-offs: More setup than raw hosts file edits, but safer and clearer

**Connection**:
Users get memorable domains like `billing.localhost` while DevDock keeps the mapping managed in one place.

### Feature: Tray quick actions

**Business Context**:
- User need: Access DevDock without reopening the main window
- Business goal: Make the app feel like a system utility
- Priority: High for desktop usability

**Technical Implementation**:
- Solution: Tray popover with open, refresh, pause, quit actions
- Architecture: Electron shell + compact renderer view
- Trade-offs: Small surface area by design, not a full settings screen

**Connection**:
The tray keeps DevDock useful when the dashboard is hidden.

### Feature: Shared design system foundation

**Business Context**:
- User need: A consistent interface that feels approachable across every screen
- Business goal: Reduce design drift and speed up future UI work
- Priority: High for product quality

**Technical Implementation**:
- Solution: Centralize tokens in `base.css` and map them through Tailwind 4 in `styles.css`
- Architecture: One semantic theme source for color, font, radius, and shadows
- Trade-offs: Slight upfront setup, but far easier screen creation later

**Connection**:
DevDock can keep shipping new screens without re-deciding the same visual details every time.

## Trade-off Decisions

| Situation | Business Priority | Technical Priority | Decision Made | Rationale |
|-----------|-------------------|-------------------|---------------|-----------|
| Electron now vs Tauri later | Faster delivery | Lower memory footprint | Ship Electron first with adapters | Best balance of speed and future portability |
| /etc/hosts vs DNS service | Simplicity | Flexibility | Start simple, abstract backend | Easier MVP, room to evolve |
| Polling vs manual refresh | Immediate freshness | Low resource use | Prefer manual + configurable scanning | Utility should stay quiet when idle |

## Common Misalignments

| Misalignment | Warning Signs | Resolution Approach |
|--------------|---------------|---------------------|
| UI calls Electron directly | Hard-to-migrate components | Route through a service abstraction |
| Too much background polling | Idle CPU spikes | Add pause, backoff, and manual refresh |
| Proxy rules scattered | Confusing config drift | Centralize config generation |

## Stakeholder Communication

This file helps translate between worlds:

**For Business Stakeholders**:
- Shows that technical investments serve business goals
- Provides context for why certain choices were made
- Demonstrates ROI of technical decisions

**For Technical Stakeholders**:
- Provides business context for architectural decisions
- Shows the "why" behind constraints and requirements
- Helps prioritize technical debt with business impact

## Onboarding Checklist

- [ ] Understand the core business needs this project addresses
- [ ] See how each major feature maps to business value
- [ ] Know the key trade-offs and why decisions were made
- [ ] Be able to explain to stakeholders why technical choices matter
- [ ] Be able to explain to developers why business constraints exist

## 📂 Codebase References

- `apps/ui/src/routes/+page.svelte` - Current UI scaffold that will host the dashboard
- `apps/ui/src/routes/+layout.svelte` - Shared app shell/layout pattern
- `apps/ui/src/styles/base.css` - Shared design tokens and local font loading
- `apps/ui/src/styles/styles.css` - Tailwind 4 theme bridge
- `apps/ui/package.json` - Stack used to implement the UI and tests

## Related Files

- `business-domain.md` - Business needs in detail
- `technical-domain.md` - Technical implementation in detail
- `decisions-log.md` - Decisions made with full context
- `living-notes.md` - Current open questions and issues
