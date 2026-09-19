# Roadmap

> **Reference plan, not a contract.** The phases below describe intent and likely order. Scope, sequencing, and granularity change as the project evolves, and some work happens out of order when it unblocks something else.
>
> This is a solo project. Phases are worked through as needed rather than completed in lockstep.

## How to read this document

- Phases are a reference, not a schedule
- A phase can be split, reordered, or revisited
- Only the [MVP scope](#mvp-scope) is a real target
- Nothing is "finished" until it holds up in daily use

---

## Phase 1 — Design system foundation

Establish the minimum design system needed to build the UI.

- Tokens: colors, typography, spacing, radii, elevation, status colors
- Base components: buttons, cards, badges, inputs, lists, panels, popovers/modals
- Monospace treatment for domains, ports, PIDs, and config snippets
- Reference: `apps/ui/docs/DESIGN.md`

Largely defined already. Extend it on demand while building the UI rather than trying to complete it upfront.

## Phase 2 — Dashboard UI with mock data

Build the complete dashboard against mock data.

**Summary statistics**

- Active services
- Unassigned ports
- Assigned domains

**Unassigned Detected Services**

- List of detected services that have no domain assigned
- Recognize common services (PostgreSQL, MySQL, React, Angular, and similar)
- Show service name, IP/port, and PID
- Refresh action for the list

**Assigned Routes**

- Search by domain name
- Each item shows: domain, port, IP, and a user-defined display name
- Per-item actions: open in browser, edit, delete

**Forms**

- Clicking a route opens a side panel (or a popup on narrow windows) with an edit form
- Clicking an unassigned service opens the same form, prefilled, to create a new route
- A "new route" button creates an empty route — placement likely in a global header, still to be decided

**Deliverable**: a complete, interactive dashboard running entirely on mock data.

## Phase 3 — Real system data through dev-bridge

Replace mock data with real data from the operating system, still through dev-bridge.

- dev-bridge switches its internal source from fixtures to real system reads
- Port discovery from real listening services
- Real route listing, editing, and deleting against `routes.json`
- No system writes yet — the proxy layer is not touched
- Validates that the adapter boundary holds over a real transport

**Deliverable**: the same dashboard, now backed by real data.

## Phase 4 — Activity / Logs

Give the app a place to show what it has done.

- Event history across scanning, routes, proxy, process, system, and app activity
- Level and category filters, search, and expandable technical detail
- Persistent storage with rotation and configurable retention
- Live updates as new events occur

This is the human-readable view of the manifest and the primary diagnostic surface.

**Full specification**: [modules/activity-log.md](./modules/activity-log.md)

## Phase 5 — Settings

Control behavior, transparency, and cleanup.

- Scanning, routes, proxy, domains, permissions, behavior, and notifications
- Proxy control: view the generated Caddyfile, reload, restart, inspect status
- Storage: log retention, export and import routes, reset to defaults
- **Transparency and cleanup**: manifest viewer, dry-run preview, routing cleanup, full uninstall
- About and diagnostics, including a copyable environment report

The transparency section is what turns Settings from a toggle panel into the place where the user keeps control of the machine.

**Full specification**: [modules/settings.md](./modules/settings.md)

## Phase 6 — Tray UI (GNOME)

The tray is a quick-action surface, not a dashboard.

- Global proxy status indicator
- Bell icon for newly detected services without a domain, capped at 9 and showing `+9` beyond that
- Up to 2 unassigned services, each showing service name, IP/port, and PID
  - An "assign" action opens a compact form inside the tray
  - Submitting refreshes the remaining data
- Assigned routes list, each with a colored status dot, display name, domain, and IP/port
  - Clicking an item opens its details in the dashboard
- Header actions: add a new route (opens the dashboard form) and open settings

GNOME only for now.

## Phase 7 — Desktop shell and privileged operations

Move from dev-bridge to a real desktop shell.

- Electron project: main process, preload bridge, IPC, tray
- Electron adapter implementing the same port
- Real operating system operations
- `sudo` helper for elevated operations
- First-run consent screen
- Proxy integration (DevDock-managed Caddy)

**Deliverable**: DevDock running as a real desktop application.

## Phase 8 — Quality and beta

- Testing pass across the application
- Internal beta used in daily work
- Public beta published on GitHub, clearly marked as beta

---

## MVP scope

The first stage is complete when DevDock can:

1. Detect active services on Linux (host, port, process, PID, state)
2. List assigned and unassigned services
3. Create a domain → target mapping
4. Edit and delete mappings
5. Detect and block conflicts and reserved domains
6. Generate and apply local routing config safely
7. Open a configured service in the browser
8. Provide a usable tray panel (status, open, refresh, pause, quit)
9. Show clear states: active / inactive / conflict / reserved / unassigned
10. Keep the Svelte UI free of direct shell calls

## Working principles

- Build the UI against mocks first, then swap the transport
- Keep the UI shell-agnostic at every step
- Every system change is explicit, logged, and reversible
- Prefer a small working slice over a large incomplete one
- Revisit the plan when reality disagrees with it

## Future work

Deferred items that are intentionally out of the MVP, kept here so they are not forgotten.

### Services screen

A full inventory of every detected service, not just the assigned and unassigned ones.

**Why it is needed**: a normal machine exposes ports nobody wants to map — system services, printers, Docker. Listing them all as unassigned makes the dashboard unusable. The fix is an "ignore" action, and ignored items need a place to be reviewed and restored, which does not fit in the dashboard.

**Planned scope**:

- Complete list of detected services
- Filters: all / assigned / unassigned / ignored / stopped
- Sorting by port, process, or state
- Ignore and restore actions
- Reasoning for why a service is hidden from the dashboard

### Other deferred items

- Tauri migration ([architecture/migration-tauri.md](./architecture/migration-tauri.md))
- Light theme and language selection
- Helper service for privileged operations ([architecture/privileged-ops.md](./architecture/privileged-ops.md))
- Scan backoff tuning and system port filtering

## Related

- [architecture/](./architecture/README.md)
- [features.md](./features.md)
- [modules/activity-log.md](./modules/activity-log.md)
- [modules/settings.md](./modules/settings.md)
- [technical/modules.md](./technical/modules.md)
- [technical/domain-model.md](./technical/domain-model.md)
