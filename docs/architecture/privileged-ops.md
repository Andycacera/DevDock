# Privileged Operations

> How DevDock performs system-level operations without turning the UI into a security hole.

## Why privileges are needed

| Operation | Why it needs elevation |
|-----------|------------------------|
| Write proxy config | Files under system-managed paths |
| Bind port 80 | Ports below 1024 are privileged |
| Reload the proxy | Service control |
| Edit `/etc/hosts` | System file (only if needed) |

## Strategy

### Phase 1 — sudo / polkit on demand

Each sensitive operation requests authorization when it runs.

- Simple, no extra service to install
- The prompt appears per operation
- Acceptable for the MVP

### Phase 2 — helper service

A small privileged helper plus a polkit rule.

- Authorize once at install time
- The UI stays unprivileged
- The helper exposes a narrow, fixed API
- Better long-term UX

**The interface does not change between phases.** `core` asks for "write this config"; whether `sudo` or a helper sits behind it is an implementation detail.

## Rules

1. **Allow-list only.** The privileged layer runs a fixed set of named operations. It never accepts arbitrary commands.
2. **No shell interpolation.** Arguments are passed as arrays, never concatenated into a shell string.
3. **Structured results.** Every operation returns a typed result, not raw console output.
4. **Capture everything.** stdout, stderr, and exit code are recorded for diagnostics.
5. **Least privilege window.** Elevate for the smallest possible scope, then drop it.
6. **Never in the renderer.** Privileged work happens in the backend process only.

## Port 80

The proxy must answer on port 80 for friendly domains to work without a port number.

Standard approach:

```txt
1. Start the proxy with elevated privileges
2. Bind port 80
3. Drop privileges immediately
4. Continue running as the normal user
```

## Result shape

```ts
interface OpResult<T> {
  ok: boolean;
  data?: T;
  exitCode?: number;
  stdout?: string;
  stderr?: string;
  errorCode?: 'PERMISSION_DENIED' | 'COMMAND_FAILED' | 'VALIDATION_FAILED';
}
```

## Logging

Every privileged operation is written to the manifest log:

- Timestamp
- Operation name
- Target files
- Result
- Whether a rollback is available

This is what makes the app transparent and reversible.

## Related

- [proxy-strategy.md](./proxy-strategy.md)
- [desktop-shell.md](./desktop-shell.md)
