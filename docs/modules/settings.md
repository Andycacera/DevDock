# Settings

> Phase 5 deliverable. Control over behavior, transparency, and cleanup.

## Purpose

Settings is where the user controls how DevDock behaves and, more importantly, where they inspect and undo what DevDock has done. It is the control surface for the project's reversibility promise.

## Where it lives

- Route: `apps/ui/src/routes/settings/`
- Section-based layout with side navigation
- Reached from the global header and from the tray

## Sections

1. Scanning
2. Routes
3. Proxy / Routing
4. Domains and validation
5. System and permissions
6. Behavior
7. Notifications
8. Storage and data
9. Transparency and cleanup
10. About and diagnostics

---

## 1. Scanning

| Setting | Control | Default | Effect | MVP |
|---------|---------|---------|--------|-----|
| Scan mode | manual / interval | interval | Whether scanning repeats automatically | Yes |
| Interval | 10s / 30s / 1m / 5m / custom | 30s | How often services are re-detected | Yes |
| Auto-refresh | toggle | on | Refresh the UI after a scan completes | Yes |
| Pause scanning | toggle | off | Stop all scanning until resumed | Yes |
| Scan on startup | toggle | on | Run a scan when the app launches | Yes |
| Backoff when idle | toggle | on | Increase the interval when nothing changes | No |
| Ignore system ports | range | — | Skip low ports that are never user services | No |

## 2. Routes

| Setting | Control | Default | Effect | MVP |
|---------|---------|---------|--------|-----|
| Default protocol | http / https | http | Protocol used when creating a route | Yes |
| Auto-suggest display name | toggle | on | Prefill the display name from the process name | Yes |
| Confirm before delete | toggle | on | Ask before removing a route | Yes |
| Show inactive routes | toggle | on | Include inactive routes in the list | Yes |
| List density | compact / comfortable | comfortable | Row height in the routes list | No |

## 3. Proxy / Routing

| Setting | Control | Default | Effect | MVP |
|---------|---------|---------|--------|-----|
| Backend | select | Caddy | Which routing engine DevDock manages | Yes |
| Caddy binary path | text (auto-detected) | auto | Override the detected binary | Yes |
| Auto-start proxy | toggle | on | Start the proxy when DevDock starts | Yes |
| View generated Caddyfile | read-only viewer | — | Inspect the current generated config | Yes |
| Reload proxy | action | — | Apply the current config again | Yes |
| Restart proxy | action | — | Restart the proxy process | Yes |
| Process status and last error | read-only | — | Current proxy state | Yes |
| Admin API port | number | 2019 | Port for the Caddy admin API | No |
| Listen port | number | 80 | Port the proxy answers on | No |

## 4. Domains and validation

| Setting | Control | Default | Effect | MVP |
|---------|---------|---------|--------|-----|
| Reserved domains | read-only list | — | Names that can never be used | Yes |
| Custom extensions | add / remove list | empty | Extra names to block | Yes |
| Remove default entries | not allowed | — | Keeps the default guarantee intact | — |

## 5. System and permissions

| Setting | Control | Default | Effect | MVP |
|---------|---------|---------|--------|-----|
| Privilege mode | select | sudo on-demand | How elevated operations are authorized | Yes |
| Consent status | read-only + re-review | — | Whether the user authorized system changes | Yes |
| Helper status | read-only | — | State of the privileged helper, when it exists | No |
| Port 80 binding method | select | sudo | How the proxy obtains port 80 | No |

## 6. Behavior

| Setting | Control | Default | Effect | MVP |
|---------|---------|---------|--------|-----|
| Start minimized to tray | toggle | off | Launch without showing the main window | Yes |
| Close window behavior | hide / quit | hide | What closing the window does | Yes |
| Theme | select | dark | Light theme is planned later | Yes |
| Language | select | en | Future | No |

## 7. Notifications

| Setting | Control | Default | Effect | MVP |
|---------|---------|---------|--------|-----|
| New unassigned services | toggle | on | Notify when a service appears without a domain | Yes |
| Proxy errors | toggle | on | Notify when the proxy fails | Yes |
| Successful apply | toggle | off | Notify on every successful apply | No |

## 8. Storage and data

| Setting | Control | Default | Effect | MVP |
|---------|---------|---------|--------|-----|
| Config directory | read-only path | `~/.config/devdock` | Where DevDock stores data | Yes |
| Log retention | size / age | 30 days | How long activity entries are kept | Yes |
| Export routes | action | — | Write routes to a JSON file | Yes |
| Import routes | action | — | Read routes from a JSON file | Yes |
| Reset to defaults | action | — | Restore all settings | Yes |
| Manual backup | action | — | Create a config backup | No |

## 9. Transparency and cleanup

The most important section for user trust.

| Setting | Control | Default | Effect | MVP |
|---------|---------|---------|--------|-----|
| Manifest viewer | read-only | — | Everything DevDock created or modified | Yes |
| Dry-run preview | action | — | Preview pending changes before applying | Yes |
| Clean up routing | action | — | Remove exactly what DevDock added | Yes |
| Full uninstall | action | — | Stop the proxy, remove config, report leftovers | Yes |
| System paths touched | read-only | — | Which locations outside the config dir are used | Yes |

## 10. About and diagnostics

| Setting | Control | Default | Effect | MVP |
|---------|---------|---------|--------|-----|
| App version and build | read-only | — | Build identification | Yes |
| System info | read-only | — | OS, kernel, GNOME version | Yes |
| Caddy version | read-only | — | Detected proxy version | Yes |
| Copy diagnostics | action | — | Copy an environment report for bug reports | Yes |
| Open config folder | action | — | Open the config directory | Yes |
| Open log folder | action | — | Open the log directory | Yes |
| Repository and docs links | links | — | Project references | Yes |

---

## Data model

```ts
interface Settings {
  scanning: {
    mode: 'manual' | 'interval';
    intervalMs: number;
    autoRefresh: boolean;
    paused: boolean;
    scanOnStartup: boolean;
    backoffWhenIdle: boolean;
  };
  routes: {
    defaultProtocol: 'http' | 'https';
    autoSuggestDisplayName: boolean;
    confirmBeforeDelete: boolean;
    showInactive: boolean;
    density: 'compact' | 'comfortable';
  };
  proxy: {
    backend: 'caddy';
    caddyPath: string | null;
    autoStart: boolean;
    adminApiPort: number;
    listenPort: number;
  };
  domains: {
    customReserved: string[];
  };
  system: {
    privilegeMode: 'sudo' | 'helper';
    consentGrantedAt: string | null;
  };
  behavior: {
    startMinimized: boolean;
    closeBehavior: 'hide' | 'quit';
    theme: 'dark' | 'light';
    language: string;
  };
  notifications: {
    newUnassigned: boolean;
    proxyErrors: boolean;
    successfulApply: boolean;
  };
  storage: {
    logRetentionDays: number;
  };
}
```

## Persistence

- Stored at `~/.config/devdock/settings.json`
- Written atomically
- Versioned for future migration

## MVP vs future

| MVP | Future |
|-----|--------|
| Sections 1–10, core items | Backoff tuning |
| Transparency and cleanup complete | Helper service settings |
| Settings type and persistence | Light theme and language |
| Atomic writes and a migration field | Manual backups |

## Related

- [activity-log.md](./activity-log.md)
- [architecture/proxy-strategy.md](../architecture/proxy-strategy.md)
- [architecture/privileged-ops.md](../architecture/privileged-ops.md)
- [roadmap.md](../roadmap.md)
