<!-- Context: project-intelligence/business | Priority: high | Version: 1.2 | Updated: 2026-04-24 -->

# Business Domain

> DevDock is a lightweight Linux utility that turns local services into readable developer-friendly domains.

## Quick Reference

- **Purpose**: Explain why DevDock exists and who it serves
- **Update When**: Product direction changes, new workflows land, target users shift
- **Audience**: Contributors, agents, product/design, stakeholders

## Project Identity

- **Name**: DevDock
- **Tagline**: Manage local development services through friendly local domains
- **Problem**: Developers keep reopening raw localhost ports and internal IPs
- **Solution**: A Linux desktop UI that detects services, maps them to `.localhost` domains, and opens them quickly

## Target Users

| User Segment | Who They Are | What They Need | Pain Points |
|--------------|--------------|----------------|-------------|
| Primary | Linux developers running multiple local services | Fast access to readable service domains | Port juggling, manual browser typing, config drift |
| Secondary | Devs on LAN/VPN services | Clear visibility into network-exposed services | Remembering IP:port pairs, inconsistent routing |
| Tertiary | Power users in GNOME | Tray access and quiet background behavior | UI clutter, too much polling, noisy tools |

## Value Proposition

**For Users**:
- Open `app.localhost` instead of `localhost:3000`
- See unassigned ports at a glance
- Manage routes from a compact dashboard or tray panel
- Experience a calmer, friendlier UI with a consistent dark theme and soft corners

**For Product**:
- Faster developer workflow
- Lower friction for multi-service setups
- Clear foundation for future proxy/DNS automation

## Success Metrics

| Metric | Definition | Target | Current |
|--------|------------|--------|---------|
| Time to open service | Seconds to reach a running app | Near-instant | Baseline not yet measured |
| Unassigned services visible | Detected services shown in UI | 100% of scans | Planned |
| Tray usefulness | Actions available from tray popover | Open, assign, pause, quit | Planned |

## Business Model (if applicable)

- **Model**: Internal developer utility
- **Pricing**: Not applicable for current scope
- **Positioning**: Lightweight desktop companion for local proxy/domain management

## Key Stakeholders

| Role | Name | Responsibility | Contact |
|------|------|----------------|---------|
| Product owner | Project owner | Defines user workflows and scope | N/A |
| Tech lead | Implementation owner | Keeps shell-agnostic architecture aligned | N/A |
| User advocate | Developer/operator | Validates workflow friction and UX | N/A |

## Roadmap Context

**Current Focus**: Build the Svelte dashboard and tray UI for local service management on top of the new design system
**Next Milestone**: Detect active ports and show assigned vs unassigned routes
**Long-term Vision**: Add proxy/DNS automation with a shell-agnostic adapter layer

## Business Constraints

- Must work well on Linux desktop (GNOME-first)
- Must stay lightweight and quiet in the background
- Must avoid coupling the UI to Electron specifics

## 📂 Codebase References

- `apps/ui/src/routes/+page.svelte` - Current dashboard entry point scaffold
- `apps/ui/src/routes/+layout.svelte` - Shared layout and favicon setup
- `apps/ui/src/styles/base.css` - Global visual language and theme tokens
- `apps/ui/src/styles/styles.css` - Tailwind 4 theme entrypoint
- `apps/ui/package.json` - UI stack, build, and test tooling
- `.opencode/context/project-intelligence/technical-domain.md` - Technical implementation context

## Onboarding Checklist

- [ ] Understand the problem statement
- [ ] Identify target users and their needs
- [ ] Know the key value proposition
- [ ] Understand success metrics
- [ ] Know who the stakeholders are
- [ ] Understand current business constraints

## Related Files

- `technical-domain.md` - How this business need is solved technically
- `business-tech-bridge.md` - Mapping between business and technical
- `decisions-log.md` - Business decisions with context
