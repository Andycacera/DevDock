# Layers

> Layer responsibilities, dependency direction, and the rules that keep the UI portable.

## Repository layout

```txt
apps/
  ui/                  # SvelteKit: components, stores, service API, adapters
  dev-bridge/          # Bun service (development only)
  desktop-electron/    # Electron shell
  desktop-tauri/       # Tauri shell (future)

packages/
  core/                # domain logic + port definitions
  shared/              # types, constants, utilities
```

## Dependency graph

```txt
apps/ui               -> core, shared
apps/dev-bridge       -> core, shared
apps/desktop-electron -> core, shared
apps/desktop-tauri    -> core, shared

packages/core         -> shared
packages/shared       -> (nothing)
```

No cycles. `shared` depends on nothing.

## Why `core` is a package but the UI is not

`core` has three consumers: the UI, dev-bridge, and the desktop shells. It must be importable.

The UI has a single kind of consumer: the shells. They load the UI's **built static files** — nobody imports it as a library. So the UI stays an app.

## Layers

| Layer | Lives in | Responsibility | Must not |
|-------|----------|----------------|----------|
| Presentation | `apps/ui` components | Render state, capture input | Call the shell or the OS |
| Service API | `apps/ui/src/lib/services` | Single entry point for the UI | Hold domain rules |
| Adapter | `apps/ui/src/lib/adapters` | Translate the port into a transport | Hold domain rules |
| Transport | HTTP / IPC / invoke | Move data across a process boundary | Know the domain |
| Backend | dev-bridge, Electron main, Rust | Talk to the operating system | Hold UI concerns |
| Domain | `packages/core` | Models, validation, conflicts, state | Perform I/O |

## Rules

1. UI components import `devdock-api` and `core` types. Nothing shell-specific.
2. Adapters are imported only in the bootstrap composition root.
3. `core` is pure: no Electron, no Tauri, no Svelte, no filesystem, no `fetch`.
4. Backends call `core` for domain rules instead of reimplementing them.
5. Every adapter satisfies the same port.

## Related

- [adapters.md](./adapters.md)
- [desktop-shell.md](./desktop-shell.md)
