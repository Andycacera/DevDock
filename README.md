# DevDock

DevDock is a lightweight Linux desktop utility for developers who manage multiple local services.

It helps you detect running services, map them to friendly local domains like `app.localhost` or `api.localhost`, and access them from a simple desktop dashboard or GNOME tray panel.

## Why DevDock exists

When you work with several frontend apps, APIs, or internal tools, it is easy to end up juggling raw ports and IP addresses:

- `localhost:3000`
- `localhost:5173`
- `192.168.1.50:8080`

DevDock aims to replace that friction with readable local domains and a compact interface that stays available in the background.

## What it does

- Detects active local and network services
- Shows assigned and unassigned ports
- Lets you map services to friendly `.localhost` domains
- Opens configured services in the browser
- Provides quick access from a GNOME tray/top-bar panel

## How it is designed

DevDock is built as a layered desktop application:

```txt
Svelte UI
→ frontend service layer
→ desktop adapter layer
→ Electron today / Tauri later
→ Linux system integration
```

This structure keeps the UI independent from the desktop shell so the app can evolve without rewriting the whole frontend.

## Technology stack

- **SvelteKit** for the UI
- **TypeScript** for application code
- **Vite** for development and builds
- **Tailwind CSS** for styling
- **Vitest** and **Playwright** for testing
- **Bun** for package and script management
- **Electron** as the initial desktop shell target
- **Tauri** as a future migration option

## Target environment

DevDock is being designed primarily for:

- Linux desktop
- GNOME environments
- Local development workflows
- Services running on localhost, LAN, or VPN-accessible addresses

## Current status

This repository is currently in the early build phase.

The project context and architecture are defined, but the product UI and system integration are still being implemented.

## Planned integration

DevDock will eventually coordinate:

- port scanning
- route management
- local proxy configuration
- domain/hosts resolution
- tray actions and browser launching

The goal is to make it easy to manage development services without constantly remembering raw ports.

## Local domain strategy

DevDock uses `.localhost` domains instead of `.local` to reduce ambiguity on Linux systems and keep local development routes predictable.

Example:

```txt
billing.localhost -> http://127.0.0.1:4200
api.localhost     -> http://127.0.0.1:8080
admin.localhost   -> http://127.0.0.1:5173
```

## Repository layout

The codebase is organized to support a shell-agnostic UI and future desktop adapters.

```txt
devdock/
├─ apps/
│  └─ ui/
├─ docs/
├─ .opencode/
└─ README.md
```

## Project direction

DevDock is intended to become a practical desktop companion for developers who want:

- faster access to local services
- less time spent typing ports
- clearer visibility into running applications
- a lightweight background utility instead of a heavy dashboard

## Future work

This README will evolve as the project grows. Future updates will likely include:

- installation instructions
- development setup
- build and packaging steps
- system requirements
- configuration details
- release notes

## License

License information will be added when the project reaches that stage.
