# DevDock Documentation

> Product and technical documentation for DevDock — a lightweight Linux desktop utility that maps local development services to friendly local domains.

## Start here

| Doc | What it covers | Read when |
|-----|----------------|-----------|
| [overview.md](./overview.md) | What DevDock is, problem, users, value | First contact with the project |
| [features.md](./features.md) | Functional capabilities of the app | Planning what to build |
| [ux.md](./ux.md) | Dashboard and tray panel design | Building UI |
| [roadmap.md](./roadmap.md) | Delivery phases and MVP definition | Deciding what comes next |
| [architecture/](./architecture/README.md) | How the app is structured internally | Before implementation |
| [technical/modules.md](./technical/modules.md) | Module-by-module responsibilities | Before coding a module |
| [technical/domain-model.md](./technical/domain-model.md) | Core data types and state rules | Defining types and stores |

## Architecture

| Doc | Covers |
|-----|--------|
| [architecture/README.md](./architecture/README.md) | Decisions and index |
| [architecture/layers.md](./architecture/layers.md) | Layer responsibilities and dependency rules |
| [architecture/adapters.md](./architecture/adapters.md) | Adapter contract, implementations, full call chains |
| [architecture/desktop-shell.md](./architecture/desktop-shell.md) | Electron process model, IPC, tray, security |
| [architecture/privileged-ops.md](./architecture/privileged-ops.md) | Privilege strategy for system operations |
| [architecture/proxy-strategy.md](./architecture/proxy-strategy.md) | Caddy, DNS, reversibility, manifest |
| [architecture/migration-tauri.md](./architecture/migration-tauri.md) | Path from Electron to Tauri |

## Module specifications

| Doc | Covers |
|-----|--------|
| [modules/activity-log.md](./modules/activity-log.md) | Activity log event catalog, UI, storage |
| [modules/settings.md](./modules/settings.md) | Settings sections, defaults, data model |

## Documentation layout

```txt
docs/
├── README.md              # this index
├── overview.md            # product idea
├── features.md            # capabilities
├── ux.md                  # dashboard + tray UX
├── roadmap.md             # phases + MVP scope
├── architecture/          # internal structure
├── technical/             # deep technical detail
└── modules/               # detailed module specifications
```

## UI implementation notes

UI-scoped notes live next to the code they describe:

| Doc | Covers |
|-----|--------|
| [apps/ui/docs/adapters-environment.md](../../apps/ui/docs/adapters-environment.md) | Adapter environment detection pattern |
| [apps/ui/docs/state-management.md](../../apps/ui/docs/state-management.md) | Store scopes and state management rules |

## Status

DevDock is in an early build phase. Product intent and architecture are defined; implementation has not started.
