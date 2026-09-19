# Domain Model

> Core types and state rules. Language-agnostic; implement in TypeScript.

## DetectedService

A service found by the port scanner.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | stable identifier |
| `host` | string | e.g. `127.0.0.1` |
| `port` | number | |
| `protocol` | `http` \| `https` \| `tcp` | |
| `processName` | string? | |
| `pid` | number? | |
| `sourceType` | `local` \| `lan` \| `vpn` | |
| `hasDomain` | boolean | |
| `status` | `ServiceStatus` | |

## RouteMapping

A domain -> target mapping managed by DevDock.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `domain` | string | must end in `.localhost` |
| `targetHost` | string | |
| `targetPort` | number | |
| `protocol` | `http` \| `https` | |
| `sourceType` | `local` \| `lan` \| `vpn` | |
| `status` | `RouteStatus` | |
| `processName` | string? | |
| `pid` | number? | |
| `label` | string? | optional friendly name |
| `createdAt` | string | ISO date |

## RouteStatus

```ts
type RouteStatus = 'unassigned' | 'active' | 'inactive' | 'conflict' | 'reserved';
```

| Status | Meaning |
|--------|---------|
| `unassigned` | Service detected, no domain mapped |
| `active` | Route exists, target responds |
| `inactive` | Route exists, target not responding |
| `conflict` | Duplicate domain or invalid config |
| `reserved` | Domain is reserved or collides with a public TLD (safety net) |

## ValidationCode

Returned when a route fails validation. A route that fails validation is never persisted.

```ts
type ValidationCode =
  | 'RESERVED_DOMAIN'
  | 'PUBLIC_TLD'
  | 'INVALID_LABEL'
  | 'DUPLICATE_DOMAIN'
  | 'INVALID_HOST'
  | 'INVALID_PORT'
  | 'TARGET_UNREACHABLE';
```

| Code | Meaning | Blocks save |
|------|---------|-------------|
| `RESERVED_DOMAIN` | Name is reserved (RFC or mDNS/LAN) | Yes |
| `PUBLIC_TLD` | Name collides with a real public TLD | Yes |
| `INVALID_LABEL` | Label is not valid DNS | Yes |
| `DUPLICATE_DOMAIN` | Domain already mapped | Yes |
| `INVALID_HOST` | Target host is malformed | Yes |
| `INVALID_PORT` | Port out of range | Yes |
| `TARGET_UNREACHABLE` | Target does not respond | No |

## Reserved domains

Validation rejects anything that is not a subdomain of `.localhost`, plus these categories:

| Category | Examples |
|----------|----------|
| RFC 6761 | `localhost`, `test`, `invalid`, `example` |
| RFC 2606 | `example.com`, `example.net`, `example.org` |
| RFC 7686 | `onion` |
| RFC 8375 | `home.arpa` |
| mDNS / LAN | `local`, `lan`, `home`, `corp`, `internal`, `intranet`, `private` |
| Public gTLDs with HSTS preload | `dev`, `app`, `page` |

Rules:

- The default list lives in `core` and is not editable
- Users may extend the list; they may not remove default entries
- `.dev` and `.app` matter most: they are real TLDs with HSTS preload, so browsers force HTTPS and routing breaks silently

## ProxyStatus

| Field | Type | Notes |
|-------|------|-------|
| `backend` | `hosts` \| `nginx` \| `caddy` \| `dnsmasq` | active backend |
| `running` | boolean | proxy/service reachable |
| `lastReloadAt` | string? | ISO date |
| `lastError` | string? | last reload/apply error |

## ScanResult

| Field | Type | Notes |
|-------|------|-------|
| `scannedAt` | string | ISO date |
| `durationMs` | number | |
| `services` | `DetectedService[]` | |
| `errors` | `string[]` | parse/permission errors |

## Relationships

```txt
DetectedService  --(0..1)-->  RouteMapping     (match by host + port)
RouteMapping     --(0..*)-->  Proxy config     (generated)
ScanResult       --(0..*)-->  DetectedService
ProxyStatus      --(0..1)-->  RouteMapping     (last apply error)
```

## State computation

```txt
service detected + route valid + target responds    -> active
service detected + route valid + target no respond  -> inactive
route with duplicate domain or invalid config       -> conflict
route with a reserved or public-TLD domain          -> reserved
service detected + no route                         -> unassigned
```
