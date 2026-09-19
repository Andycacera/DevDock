# Activity Log

> Phase 4 deliverable. The human-readable view of everything DevDock does, and the main diagnostic tool.

## Purpose

The Activity log makes the project's transparency promise visible. It is the human-readable counterpart to `manifest.json`, and the first place to look when something breaks.

## Where it lives

- Route: `apps/ui/src/routes/activity/`
- Reached from the global header and from proxy error states

## Event catalog

| Category | Event | Level |
|----------|-------|-------|
| Scan | scan started | info |
| Scan | scan completed (duration, service count) | info |
| Scan | parse failure | error |
| Scan | insufficient permissions | warning |
| Routes | route created / updated / deleted | info |
| Routes | route rejected by validation | warning |
| Proxy | config generated | info |
| Proxy | validation passed | info |
| Proxy | validation failed | error |
| Proxy | config applied | info |
| Proxy | apply failed | error |
| Proxy | reload succeeded | info |
| Proxy | reload failed | error |
| Proxy | rollback executed | warning |
| Process | proxy started / stopped | info |
| Process | proxy crash detected | error |
| Process | port 80 could not be bound | error |
| System | Caddy detected / installed | info |
| System | consent granted | info |
| System | privileged operation denied | warning |
| App | started / closed | info |
| App | configuration changed | info |

## Entry anatomy

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | stable identifier |
| `at` | string | ISO timestamp |
| `level` | `info` \| `warning` \| `error` | severity |
| `category` | `scan` \| `routes` \| `proxy` \| `process` \| `system` \| `app` | origin |
| `message` | string | human-readable summary |
| `detail` | string? | command, exit code, stderr excerpt |
| `entity` | string? | domain or route id involved |
| `reversible` | boolean | whether DevDock can undo it |
| `relatedRoute` | string? | link to a route |

## UI capabilities

### List

- Chronological order, newest first
- Pagination or infinite scroll for long histories

### Filters

- Level: all / warnings / errors
- Category: scan, routes, proxy, process, system, app
- Free-text search across message and detail

### Entry interactions

- Expand an entry to reveal its technical detail
- Copy the entry
- Copy the technical detail only, for bug reports
- Navigate to the related route or setting

### Live behavior

- New entries appear without reloading the page
- Consecutive scan entries collapse into a group to avoid flooding the list

### Bulk actions

- Export the visible log to a file
- Clear the log, with confirmation

## Storage

| Aspect | Value |
|--------|-------|
| Location | `~/.config/devdock/logs/` |
| Format | newline-delimited JSON |
| Rotation | by size and by age |
| Retention | configurable in Settings |
| Survival | persists across restarts |

## Data model

```ts
interface LogEntry {
  id: string;
  at: string;
  level: 'info' | 'warning' | 'error';
  category: 'scan' | 'routes' | 'proxy' | 'process' | 'system' | 'app';
  message: string;
  detail?: string;
  entity?: string;
  reversible: boolean;
  relatedRoute?: string;
}
```

## MVP vs future

| MVP | Future |
|-----|--------|
| List, levels, filters, search | Collapse repeated scans into groups |
| Expandable technical detail | Contextual links to other screens |
| Persistence and rotation | Export to file |
| Live tail | Formatted copy for issue reports |

## Related

- [settings.md](./settings.md)
- [roadmap.md](../roadmap.md)
- [architecture/proxy-strategy.md](../architecture/proxy-strategy.md)
