# UX Direction

> How DevDock should look and feel: dark, technical, developer-focused.

## Design direction

Feel like a mix of:

- a system monitor
- a local proxy manager
- a developer command center
- a compact network routing dashboard

## Visual characteristics

- Dark mode first
- Technical and minimal
- Compact but readable
- Soft borders, rounded cards, subtle gradients
- Blue, cyan, and violet accents
- Green / yellow / red status indicators
- Monospace for domains, ports, PIDs, and config snippets
- Practical utility UI — not generic SaaS

## Main dashboard

Suggested layout:

```txt
┌──────────────────────────────────────────────────────────┐
│ DevDock   [proxy status]   [refresh]   [settings]        │
├──────────────────────────────────────────────────────────┤
│ [Active services] [Unassigned] [Assigned] [Proxy status] │
├───────────────────────────────┬──────────────────────────┤
│ Unassigned services           │ Details panel            │
│  - port, process, PID, host   │  - selected item         │
│  - action: assign domain      │  - target + linked route │
│                               │  - health                │
│ Assigned routes               │  - config preview        │
│  - domain, target, status     │  - errors / conflicts    │
│  - open / edit / remove       │                          │
└───────────────────────────────┴──────────────────────────┘
```

### Unassigned service card

Shows: port, process name, PID, host, protocol, status, and an assign-domain action.

### Assigned route card

Shows: domain, target URL, process name, status badge, and open / edit / remove actions.

## Tray panel

Small utility popover, not a dashboard. Target size ~`360 x 480`.

```txt
┌─────────────────────────────┐
│ DevDock         [proxy ●]   │
│                   [refresh] │
├─────────────────────────────┤
│ ⚠ New unassigned services   │
├─────────────────────────────┤
│ Needs domain                │
│  - :5173 vite               │
│  - :8080 api                │
├─────────────────────────────┤
│ Assigned                    │
│  - billing.localhost  open  │
│  - api.localhost      open  │
├─────────────────────────────┤
│ Open Dashboard | Pause | Quit│
└─────────────────────────────┘
```

### Tray rules

- Optimized for quick actions only
- See what is running, assign a domain, open a route, check status
- Never becomes a full settings screen

## States

| State | Visual |
|-------|--------|
| Active | green indicator |
| Inactive | yellow indicator |
| Conflict | red indicator |
| Unassigned | neutral/muted indicator |
