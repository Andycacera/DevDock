# Features

> Functional capabilities DevDock must provide. For internal structure see [technical/modules.md](./technical/modules.md).

## 1. Service discovery

- Scan for active listening services
- Show host, port, protocol, process name, PID, and status
- Distinguish local, LAN, and VPN targets
- Mark whether each service already has a domain assigned
- Manual refresh, optional scheduled scan, and pause

## 2. Route management

- Create a mapping: domain -> target host/port
- Edit an existing mapping
- Delete a mapping
- Search/filter routes by domain or port
- Attach a route to a detected service

## 3. Conflict detection and validation

- Reject duplicate domains
- Validate domain, host, and port format
- Detect conflicts between detected services and manual mappings
- Block applying invalid configuration
- Show clear, actionable errors in the UI

## 4. Proxy and DNS integration

- Generate reverse proxy configuration from stored routes
- Preview generated configuration before applying
- Validate configuration, then apply, then reload the proxy
- Keep local domain resolution in sync (hosts or DNS backend)
- Roll back safely when validation fails

## 5. Status and health

Every service/route resolves to one of four states:

| State | Meaning |
|-------|---------|
| `unassigned` | Service detected, no domain mapped |
| `active` | Route exists and target responds |
| `inactive` | Route exists but target is not responding |
| `conflict` | Duplicate domain or invalid configuration |

## 6. Dashboard

- Global proxy status
- Summary cards: active services, unassigned ports, assigned domains, proxy status
- List of unassigned detected services
- List of assigned routes
- Details panel for the selected item
- Refresh/scan and settings entry points

## 7. Tray panel

- Compact popover, not a full dashboard
- Proxy status indicator
- Alert for newly detected unassigned services
- "Needs domain" and "Assigned" sections
- Quick actions: open route, open dashboard, pause scanning, quit

## 8. Browser integration

- Open an assigned route in the default browser
- Available from the dashboard and the tray
- Blocked when the route is invalid or in conflict

## 9. Settings

- Scan interval and auto-refresh behavior
- Selected proxy/DNS backend
- Start-minimized behavior
- Relevant config paths

## 10. Diagnostics

- Recent operations log
- Clear error reporting for scan, apply, and reload failures
- Enough detail to debug without attaching a debugger
