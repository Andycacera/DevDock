# Architecture

> How DevDock is structured internally and how its layers communicate.
> **Status**: decided — v1.0. Changes require a new entry in the decisions log.

## Core principle

> The UI depends on an interface, not on an implementation.

The Svelte UI never calls Electron, Tauri, or the operating system directly. It talks to a single service API, which delegates to an adapter. Swapping the desktop shell means writing a new adapter, not rewriting the UI.

## Decisions

| # | Topic | Decision |
|---|-------|----------|
| 1 | Adapter boundary | The frontend service API is the only contract the UI knows. Adapters live in the UI |
| 2 | Electron role | Shell only: windows, tray, IPC, OS access. No business logic |
| 3 | Mock-first | Build the UI against fixtures and a Bun dev-bridge before any shell |
| 4 | Privileged operations | `sudo`/`polkit` on demand now; helper service later. The interface stays the same |
| 5 | Proxy backend | Caddy, managed by DevDock with its own config and instance |
| 6 | Monorepo shape | `apps/{ui,dev-bridge,desktop-electron,desktop-tauri}` + `packages/{core,shared}` |
| 7 | Route persistence | JSON under `~/.config/devdock/`, migratable to SQLite |
| 8 | Tauri migration | New shell app + new adapter + Rust backend. UI and core untouched |

## Sections

| File | Covers |
|------|--------|
| [layers.md](./layers.md) | Layer responsibilities and dependency rules |
| [adapters.md](./adapters.md) | Adapter contract, the four implementations, full call chains |
| [desktop-shell.md](./desktop-shell.md) | Electron process model, IPC, tray, security |
| [privileged-ops.md](./privileged-ops.md) | System operations and privilege strategy |
| [proxy-strategy.md](./proxy-strategy.md) | Caddy, DNS, reversibility, the manifest |
| [migration-tauri.md](./migration-tauri.md) | Path from Electron to Tauri |

## Related

- [UI adapter environment resolution](../../apps/ui/docs/adapters-environment.md) — implementation note for the UI layer
- [technical/modules.md](../technical/modules.md)
- [technical/domain-model.md](../technical/domain-model.md)
- [roadmap.md](../roadmap.md)
