# Proxy Strategy

> How DevDock routes friendly domains, and how every change stays reversible.

## Two separate problems

| Layer | Question | Solution |
|-------|----------|----------|
| Name resolution | How does `billing.localhost` resolve to an IP? | Handled by the OS or the browser |
| Routing | How does `billing.localhost` reach `127.0.0.1:4200`? | Reverse proxy |

A hostname cannot carry a port, so routing always requires a proxy.

## Name resolution

`localhost` and `*.localhost` are reserved by RFC 6761. Modern browsers resolve `*.localhost` to loopback on their own, with no `/etc/hosts` change.

Command-line tools generally do not, because `getaddrinfo` does not resolve `foo.localhost` by default.

**Consequence:** for the primary use case (open in browser) DNS may need no changes at all. Verify on the target machine before adding hosts entries.

## Backend choice: Caddy

DevDock uses Caddy instead of Nginx.

```caddyfile
http://billing.localhost {
    reverse_proxy 127.0.0.1:4200
}
```

Reasons:

- Far simpler configuration than Nginx
- `caddy validate` for pre-apply validation
- Admin API for zero-downtime reload
- Single static binary, no runtime dependencies

The `http://` scheme prefix is required. Without it Caddy attempts automatic HTTPS and generates an internal certificate the browser does not trust.

## DevDock-managed instance

DevDock does not use the system Caddy. It manages its own instance.

| Aspect | System Caddy | DevDock-managed |
|--------|--------------|-----------------|
| Config | `/etc/caddy/Caddyfile` | `~/.config/devdock/Caddyfile` |
| Instance | OS service | Process spawned by DevDock |
| Admin API | shared `:2019` | dedicated port |
| Reversibility | medium | high |

Result: Caddy's robustness with zero writes to `/etc/`.

The only system-level touches are the Caddy binary and port 80.

## Apply flow

```txt
Generate config from routes
  -> write temp file
  -> validate (caddy validate)
  -> apply (admin API load)
  -> reload
  -> update app state
  -> record in manifest
```

If validation fails, nothing is applied and the previous configuration stays active.

## Reversibility rules

These are mandatory for any change outside `~/.config/devdock/`:

1. **Never edit user files in place.** Only create DevDock-owned files in DevDock-owned locations.
2. **Dedicated directories only.** Never the user's main config file.
3. **Ownership marker** in every generated file: `# managed by devdock - do not edit`.
4. **Manifest** at `~/.config/devdock/manifest.json` recording every file, directory, backup, and entry created.
5. **Atomic writes** (temp + rename) and a backup before modifying anything.
6. **Validate before applying.** On failure, roll back.
7. **Explicit cleanup action** that removes exactly what the manifest lists, nothing more.
8. **One-time consent** before the first system write, showing the exact diff.
9. **Dry-run mode** to preview every file change before applying.

Reversibility is a verifiable property, not a promise.

## Manifest

```json
{
  "version": 1,
  "created": [
    { "type": "file", "path": "~/.config/devdock/Caddyfile" },
    { "type": "dir", "path": "~/.config/devdock/logs" }
  ],
  "operations": [
    {
      "at": "2026-04-24T10:12:00Z",
      "operation": "proxy.apply",
      "targets": ["~/.config/devdock/Caddyfile"],
      "result": "ok",
      "reversible": true
    }
  ]
}
```

## Uninstall

Removing DevDock should leave the machine as it was found:

1. Stop the proxy process
2. Remove everything listed in the manifest
3. Remove `~/.config/devdock/`
4. Report anything that could not be removed

## Domain safety

Reserved and public domains are rejected before a route is created. See the domain model for validation codes and the reserved list.

## Related

- [privileged-ops.md](./privileged-ops.md)
- [technical/domain-model.md](../technical/domain-model.md)
- [technical/modules.md](../technical/modules.md)
