<!-- Context: project-intelligence/nav | Priority: high | Version: 1.2 | Updated: 2026-04-24 -->

# Project Intelligence

> Start here for quick project understanding. These files bridge business goals, technical choices, and current project state.

## Quick Reference

| File | Purpose | Priority |
|------|---------|----------|
| `business-domain.md` | Why DevDock exists | high |
| `technical-domain.md` | Stack, architecture, implementation patterns | critical |
| `business-tech-bridge.md` | Business needs → technical solutions | high |
| `decisions-log.md` | Architectural and product decisions | medium |
| `living-notes.md` | Current issues, debt, open questions | medium |

## Structure

```
.opencode/context/project-intelligence/
├── navigation.md              # This file - quick overview
├── business-domain.md         # Business context and problem statement
├── technical-domain.md        # Stack, architecture, technical decisions
├── business-tech-bridge.md    # How business needs map to solutions
├── decisions-log.md           # Major decisions with rationale
└── living-notes.md            # Active issues, debt, open questions
```

## Quick Routes

| What You Need | File | Description |
|---------------|------|-------------|
| Understand the "why" | `business-domain.md` | Problem, users, value proposition |
| Understand the "how" | `technical-domain.md` | Stack, architecture, integrations |
| See the connection | `business-tech-bridge.md` | Business → technical mapping |
| Know the context | `decisions-log.md` | Why decisions were made |
| Current state | `living-notes.md` | Active issues and open questions |
| All of the above | Read all files in order | Full project intelligence |

## Deep Dives

| Topic | File | When to Read |
|-------|------|--------------|
| DevDock product context | `business-domain.md` | Before feature planning |
| Desktop architecture | `technical-domain.md` | Before implementation |
| UI theme foundation | `technical-domain.md` | Before styling or screen work |
| Route/proxy mapping | `business-tech-bridge.md` | Before workflow changes |
| Architecture history | `decisions-log.md` | Before refactors |
| Current risks & gaps | `living-notes.md` | Before shipping |

## Usage

**New Team Member / Agent**:
1. Start with `navigation.md` (this file)
2. Read all files in order for complete understanding
3. Follow onboarding checklist in each file

**Quick Reference**:
- Business focus → `business-domain.md`
- Technical focus → `technical-domain.md`
- Decision context → `decisions-log.md`

**Codebase snapshot**:
- Current UI scaffold lives in `apps/ui/src/routes/+page.svelte`
- App shell/layout starts in `apps/ui/src/routes/+layout.svelte`
- Global styles live in `apps/ui/src/styles/base.css` and `apps/ui/src/styles/styles.css`
- Tooling and stack live in `apps/ui/package.json`

## Integration

This folder is referenced from:
- `.opencode/context/core/standards/project-intelligence.md` (standards and patterns)
- `.opencode/context/core/system/context-guide.md` (context loading)

See `.opencode/context/core/context-system.md` for the broader context architecture.

## Maintenance

Keep this folder current:
- Update when business direction changes
- Document decisions as they're made
- Review `living-notes.md` regularly
- Archive resolved items from decisions-log.md

**Management Guide**: See `.opencode/context/core/standards/project-intelligence-management.md` for complete lifecycle management including:
- How to update, add, and remove files
- How to create new subfolders
- Version tracking and frontmatter standards
- Quality checklists and anti-patterns
- Governance and ownership

See `.opencode/context/core/standards/project-intelligence.md` for the standard itself.

## 📂 Codebase References

- `apps/ui/src/routes/+page.svelte` - Current SvelteKit landing page scaffold
- `apps/ui/src/routes/+layout.svelte` - Global layout and shared assets
- `apps/ui/src/styles/base.css` - Theme tokens, fonts, and base CSS
- `apps/ui/src/styles/styles.css` - Tailwind 4 theme wiring
- `apps/ui/package.json` - Current UI stack and tooling
