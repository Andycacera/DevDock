# Modules

> Technical breakdown of DevDock modules: responsibility, operations, and concrete elements.

## Dependency order

1. Domain models
2. Service discovery
3. Persistence
4. Route registry
5. Validation and conflict engine
6. Frontend service API
7. Dashboard UI
8. Proxy config generator
9. Privileged operations
10. Tray
11. Settings and diagnostics

---

## 1. Service Discovery (port scanner)

**Responsibility**: detect active services on the machine.

**Operations**: `scanPorts()`, pause/resume scanning, manual refresh, scheduled refresh, backoff when nothing changed.

**Elements**:

- Parse `ss -tulnp` or `lsof -i -P -n`
- Normalize results into a common service model
- Filter to relevant protocols
- Deduplicate results
- Resolve process name and PID
- Classify local / LAN / VPN
- Mark services that already have a domain

---

## 2. Route Registry

**Responsibility**: source of truth for domain -> target mappings.

**Operations**: `getRoutes()`, `createRoute()`, `updateRoute()`, `deleteRoute()`.

**Elements**:

- Local persistence
- Optional metadata: label, notes, created date
- Search/filter by domain or port
- Link a route to a detected service

**Route fields**: `id`, `domain`, `targetHost`, `targetPort`, `protocol`, `sourceType`, `status`, `processName?`, `pid?`

---

## 3. Validation and Conflict Engine

**Responsibility**: protect config integrity before touching the system.

**Validations**:

- Domain valid and under `.localhost`
- Domain not in the reserved-domain blacklist
- Domain does not collide with a public TLD
- Host and port valid
- No duplicate domain
- No corrupt or circular mapping
- Optional: target reachable
- Conflict between a detected service and a manual mapping

**Reserved domains**: a curated list lives in `core` (hardcoded). It covers RFC 6761/2606/7686/8375 names, common mDNS/LAN suffixes, and public gTLDs with HSTS preload (`.dev`, `.app`, `.page`). Users may extend the list, but only by adding entries — defaults cannot be removed.

**Operations**: validate on create, on edit, and in batch before apply. Block apply when config is invalid.

**Output**: a `ValidationCode` per failure so the UI can explain the exact reason.

---

## 4. Proxy Config Generator

**Responsibility**: translate stored routes into real proxy configuration.

**Flow**:

```txt
Generate -> write temp config -> validate -> apply -> reload -> update UI state
```

**Elements**:

- Generate config text from routes
- Preview before applying
- Validate syntax
- Identify which route broke validation
- Simple rollback when validation fails

---

## 5. Hosts / Local Domain Resolver

**Responsibility**: keep local resolution in sync with routes.

**Elements**:

- Add / update / remove resolution entries
- Avoid duplicate entries
- Safe write to hosts or DNS backend
- Clean up when a route is deleted
- Sync with the route registry

---

## 6. Privileged Operations Layer

**Responsibility**: isolate operations that need elevated permissions.

**Sensitive operations**: write proxy config, edit `/etc/hosts`, reload Nginx/Caddy, run system validations.

**Elements**:

- Request sudo/polkit only when needed
- Run a fixed set of controlled commands
- Capture stdout/stderr
- Return structured results to the UI
- Never accept arbitrary commands

---

## 7. Frontend Service API

**Responsibility**: single API used by Svelte components.

**Operations**: `scanPorts()`, `getRoutes()`, `createRoute()`, `updateRoute()`, `deleteRoute()`, `reloadProxy()`, `getProxyStatus()`, `openRouteInBrowser()`, `pauseScanning()`, `resumeScanning()`.

**Rule**: components call the service layer, the service layer calls the adapter. Never Electron directly.

---

## 8. Desktop Adapter Layer

**Responsibility**: hide which shell is running.

**Implementations**: `mock-adapter`, `bridge-adapter` (dev-bridge), `electron-adapter`, `tauri-adapter`.

**Covers**: IPC, tray, windows, browser open, filesystem, system commands, notifications.

**Rule**: all adapters implement the same port (`DevDockAdapter`). The mock and bridge adapters enable UI development without a shell. See [architecture/adapters.md](../architecture/adapters.md).

---

## 9. Dashboard UI

**Responsibility**: full management interface.

**Sections**: header with proxy status, refresh, settings; summary cards; unassigned services list; assigned routes list; details panel.

**Actions**: assign domain, open, edit, remove, revalidate, refresh.

---

## 10. Tray Module

**Responsibility**: quick access without the main window.

**Elements**: status, refresh, unassigned alert, "Needs domain" list, "Assigned" list, open dashboard / pause / quit.

**Rule**: quick actions only, no full settings.

---

## 11. Route Editor / Assign Flow

**Responsibility**: UX flow to create or change a mapping.

**Fields**: domain, target host, target port, protocol, optional label.

**Supports**: create from a detected service (prefilled), create manually, edit, live validation, save, cancel, conflict display.

---

## 12. Status / Health Module

**Responsibility**: compute the user-visible state.

**Rules**:

- detected + valid route = `active`
- route exists, target not responding = `inactive`
- duplicate/invalid config = `conflict`
- service without route = `unassigned`
- domain in the reserved list = `reserved` (safety net; normally blocked at validation)

**Elements**: recompute after scan and after edits; feed dashboard and tray badges.

---

## 13. Persistence

**Responsibility**: store local app state.

**Stores**: routes, basic preferences, scan interval, paused state, optional last snapshot.

**Elements**: load on start, update after CRUD, future schema migration.

---

## 14. Logging / Diagnostics

**Responsibility**: make real problems debuggable.

**Records**: last scan, config apply errors, proxy reload errors, detected conflicts, important user actions.

**UI**: at minimum clear error messages; ideally a simple "recent operations" list with detail and copy.

---

## 15. Settings

**Responsibility**: basic configuration.

**Minimum**: selected proxy backend, scan interval, start minimized, auto-refresh toggle, relevant config paths.

---

## 16. Browser / Open Integration

**Responsibility**: open a configured route in the default browser.

**Elements**: open from dashboard and tray, optional raw target open for debugging, block when the route is invalid.

---

## 17. Notifications / Alerts

**Responsibility**: surface important events.

**Cases**: new unassigned service, config applied, reload failed, conflict detected.

**Levels**: inline banner or badge first, desktop notifications later. Optional for the MVP.

---

## Development-only: dev-bridge

Not a product module. A Bun service used during development.

**Responsibility**: expose the same operations over HTTP so the UI can run without a shell.

**Elements**:

- Implements the `ServiceSource` port internally: `fixtureSource` first, `osSource` later
- Optionally serves the UI build during development
- Never shipped, never used for e2e, never used in production

See [architecture/adapters.md](../architecture/adapters.md).
