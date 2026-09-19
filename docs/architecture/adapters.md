# Adapters

> The seam that keeps the UI independent from the desktop shell.

## What an adapter is

An adapter is a translator. It makes one interface work on top of a different reality without the consumer knowing.

```txt
Laptop needs 19V DC
Wall delivers 220V AC
Charger converts one into the other

The laptop does not know, or care, where the power comes from
```

In DevDock, the UI needs a fixed set of operations. The underlying reality differs: fixtures in memory, HTTP, Electron IPC, or Tauri IPC. The adapter converts.

## Vocabulary

| Term | Meaning | How many |
|------|---------|----------|
| Port | The interface the UI needs | 1 |
| Adapter | An implementation of the port over a transport | 4 |
| Transport | The wire: HTTP, IPC, invoke | 1 per adapter |
| Backend | The process that answers the transport and talks to the OS | 3 |

## The port

The UI knows only this:

```ts
// packages/core/src/ports/devdock-adapter.ts
export interface DevDockAdapter {
  scanPorts(): Promise<DetectedService[]>;
  getRoutes(): Promise<RouteMapping[]>;
  createRoute(input: NewRoute): Promise<RouteMapping>;
  updateRoute(id: string, patch: Partial<RouteMapping>): Promise<RouteMapping>;
  deleteRoute(id: string): Promise<void>;
  getProxyStatus(): Promise<ProxyStatus>;
  reloadProxy(): Promise<ProxyStatus>;
  openRoute(id: string): Promise<void>;
}
```

## The four adapters

```ts
// 1. mock — no transport, no backend. Fixtures in memory.
export function createMockAdapter(fixtures: Fixtures): DevDockAdapter {
  return {
    async scanPorts() {
      return fixtures.services;
    },
  };
}

// 2. bridge — HTTP transport to the Bun service
export function createBridgeAdapter(baseUrl: string): DevDockAdapter {
  return {
    async scanPorts() {
      const res = await fetch(`${baseUrl}/scan`);
      if (!res.ok) throw new DevDockError('SCAN_FAILED');
      const dto = (await res.json()) as ScanDto;
      return dto.services.map(toDetectedService);
    },
  };
}

// 3. electron — IPC transport through the preload bridge
export function createElectronAdapter(bridge: DevDockBridge): DevDockAdapter {
  return {
    async scanPorts() {
      const dto = await bridge.scanPorts();
      return dto.services.map(toDetectedService);
    },
  };
}

// 4. tauri (future) — invoke transport
export function createTauriAdapter(invoke: TauriInvoke): DevDockAdapter {
  return {
    async scanPorts() {
      const dto = await invoke<ScanDto>('scan_ports');
      return dto.services.map(toDetectedService);
    },
  };
}
```

An adapter is not a pass-through. It does three real jobs:

1. Translates transport payloads into domain types
2. Normalizes responses (`toDetectedService`)
3. Unifies errors (`DevDockError`) so the UI handles them uniformly

## The channel name is the URL

| Transport | "Address" | Example |
|-----------|-----------|---------|
| HTTP | URL path | `/scan` |
| Electron IPC | channel name | `devdock:scan-ports` |
| Tauri IPC | command name | `scan_ports` |
| Mock | function name | `scanPorts()` |

Electron and Tauri are local RPC: the same concept as a URL, with a different wire format.

## Full call chains

### Mock

```txt
Component -> devdock-api -> mock-adapter -> (memory) -> Component
```

### dev-bridge

```txt
Component -> devdock-api -> bridge-adapter -> fetch('/scan')
                                             -> Bun -> fixtures | OS
                                             <- JSON
```

### Electron

```txt
Component -> devdock-api -> electron-adapter          [renderer / Chromium]
                             -> window.devdock.scanPorts()
                             -> preload
                             -> ipcRenderer.invoke('devdock:scan-ports')
                             === IPC (structured clone) ===
                             -> ipcMain.handle('devdock:scan-ports')  [main / Node]
                             -> ss -tulnp                             [OS]
                             <- { services: [...] }
                             <- Promise resolves
                             -> toDetectedService()
                             -> Component renders
```

### Tauri

```txt
Component -> devdock-api -> tauri-adapter -> invoke('scan_ports')
                             === Tauri IPC (serde) ===
                             -> #[tauri::command] scan_ports()        [Rust]
                             -> /proc, ss, lsof                       [OS]
                             <- Result<ScanDto, String>
                             -> toDetectedService()
                             -> Component renders
```

The UI is identical in all four. Only what sits behind the adapter changes.

## Why the factories receive an argument

That is dependency injection. Each adapter needs a different connection detail:

```ts
createMockAdapter(fixtures)            // in-memory data
createBridgeAdapter(baseUrl)           // where the HTTP server is
createElectronAdapter(window.devdock)  // what the preload exposed
createTauriAdapter(invoke)             // the Tauri call function
```

The adapter does not go looking for its connection; it is handed one. That makes it testable:

```ts
const adapter = createElectronAdapter(fakeBridge);
expect(await adapter.scanPorts()).toHaveLength(2);
```

## Why adapters live in the UI

The seam must sit where the consumer decides which backend to use, and it must stay invisible to components.

```txt
Component        <- knows nothing about the shell
  |
devdock-api      <- single entry point
  |
active adapter   <- the seam is here
  |
dev-bridge / Electron / Rust / memory
```

The UI is the only JavaScript consumer of the port. dev-bridge and the Electron main process do not need the JS adapters; they expose the transport.

Extract them into `packages/adapters` if a second JS consumer appears (a second renderer, a CLI).

## The pattern appears twice

```txt
LEVEL 1 — UI <-> backend
  port:     DevDockAdapter
  adapters: mock | bridge | electron | tauri

LEVEL 2 — inside dev-bridge
  port:     ServiceSource
  adapters: fixtureSource | osSource
```

`dev-bridge` exposes a single HTTP API from day one. Internally it starts with `fixtureSource` and later switches to `osSource`:

```ts
const source: ServiceSource = env.USE_OS
  ? createOsSource()
  : createFixtureSource();

Bun.serve({
  fetch(req) {
    if (new URL(req.url).pathname === '/scan') {
      return Response.json({ services: await source.scan() });
    }
  },
});
```

The HTTP API never changes, so the UI never notices when dev-bridge goes from fixtures to real system data.

## Selecting the adapter

Environment detection, precedence, and the typed global access pattern are documented in the UI note:

[apps/ui/docs/adapters-environment.md](../../apps/ui/docs/adapters-environment.md)

Precedence summary:

1. Explicit override (`VITE_DEVDOCK_TARGET`) — always wins
2. `window.devdock` — Electron
3. `window.__TAURI_INTERNALS__` — Tauri
4. `VITE_DEVDOCK_BRIDGE_URL` — dev-bridge
5. Fallback — fixtures (development only)

## Security boundary

Never expose the raw IPC object:

```ts
// NEVER
contextBridge.exposeInMainWorld('ipc', ipcRenderer);
```

With that, any XSS in the UI could send arbitrary IPC messages to the main process and execute commands on the machine. DevDock runs privileged commands, so this matters.

```ts
// CORRECT — explicit allow-list
contextBridge.exposeInMainWorld('devdock', {
  scanPorts: () => ipcRenderer.invoke('devdock:scan-ports'),
  getRoutes: () => ipcRenderer.invoke('devdock:get-routes'),
  createRoute: (input) => ipcRenderer.invoke('devdock:create-route', input),
  openRoute: (id) => ipcRenderer.invoke('devdock:open-route', id),
});
```

Rule: **operating system work runs in the backend (Node main process or Rust), never in the renderer.**

## Shared types

`DevDockBridge` must live in `packages/shared`, because two projects use it:

```txt
apps/desktop-electron/src/preload  -> exposes it
apps/ui/src/lib/adapters           -> consumes it
```

If each side defines its own copy, they drift and produce hard-to-debug failures.

## Related

- [layers.md](./layers.md)
- [desktop-shell.md](./desktop-shell.md)
- [UI adapter environment resolution](../../apps/ui/docs/adapters-environment.md)
