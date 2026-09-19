# UI: Adapter Environment Resolution

> **Status**: implementation note — apply when building the UI adapter layer.
> **Scope**: `apps/ui` only. This is not part of the general architecture docs.

## Why this note exists

The UI must detect which backend it is running against (Electron, Tauri, dev-bridge, or fixtures). That detection requires reading untyped runtime globals, which is where TypeScript and ESLint warnings come from when done carelessly.

This note defines the approved pattern so the adapter layer is written cleanly from the start instead of being patched with `any` or `@ts-ignore` later.

## The rule

> All untyped global access lives in one file. The rest of the code consumes types.

Applies to `window`, `globalThis`, `import.meta.env`, and anything the shell injects.

## Detection precedence

1. Explicit override (`VITE_DEVDOCK_TARGET`) — always wins
2. `window.devdock` — Electron
3. `window.__TAURI_INTERNALS__` — Tauri
4. `VITE_DEVDOCK_BRIDGE_URL` — dev-bridge
5. Fallback — fixtures (development only)

## Production safety

Never fall back to fixtures silently in production.

| Environment | Behavior when no shell is detected |
|-------------|-----------------------------------|
| Development | Fall back to fixtures |
| Production | Throw and show an error screen |

A silent fallback would render fake data and hide a broken preload.

---

## Layer 1 — Global type declarations

Makes `window.devdock` compile and narrow correctly. No `any`, no `@ts-ignore`.

```ts
// apps/ui/src/types/globals.d.ts
import type { DevDockBridge } from '@devdock/shared';

declare global {
  interface Window {
    devdock?: DevDockBridge; // exists only inside Electron
    __TAURI_INTERNALS__?: unknown;
  }
}

export {};
```

```ts
// apps/ui/src/app.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEVDOCK_TARGET?: 'electron' | 'tauri' | 'bridge' | 'mock';
  readonly VITE_DEVDOCK_BRIDGE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Layer 2 — Environment module

The only file in the project that touches untyped globals.

```ts
// apps/ui/src/lib/adapters/environment.ts
import type { DevDockBridge } from '@devdock/shared';

export type DevDockTarget = 'electron' | 'tauri' | 'bridge' | 'mock';

export interface RuntimeGlobals {
  devdock?: DevDockBridge;
  tauriInternals?: unknown;
}

export interface RuntimeEnv {
  forcedTarget?: DevDockTarget;
  bridgeUrl?: string;
  isDev: boolean;
}

/** The only place in the project that reads untyped globals. */
export function readRuntimeGlobals(): RuntimeGlobals {
  const g = globalThis as Record<string, unknown>;
  return {
    devdock: g['devdock'] as DevDockBridge | undefined,
    tauriInternals: g['__TAURI_INTERNALS__'],
  };
}

export function readRuntimeEnv(): RuntimeEnv {
  return {
    forcedTarget: import.meta.env.VITE_DEVDOCK_TARGET,
    bridgeUrl: import.meta.env.VITE_DEVDOCK_BRIDGE_URL,
    isDev: import.meta.env.DEV,
  };
}
```

Two explicit casts, both contained in one small file.

## Layer 3 — Pure resolver

Returns a discriminated union so the consumer never needs `!` or `as`.

```ts
// apps/ui/src/lib/adapters/resolve-target.ts
import type { DevDockBridge } from '@devdock/shared';
import type { RuntimeGlobals, RuntimeEnv } from './environment';

export type TargetResolution =
  | { target: 'electron'; bridge: DevDockBridge }
  | { target: 'tauri' }
  | { target: 'bridge'; baseUrl: string }
  | { target: 'mock' };

export function resolveTarget(
  globals: RuntimeGlobals,
  env: RuntimeEnv,
): TargetResolution {
  if (env.forcedTarget === 'mock') return { target: 'mock' };
  if (env.forcedTarget === 'bridge' && env.bridgeUrl) {
    return { target: 'bridge', baseUrl: env.bridgeUrl };
  }
  if (globals.devdock) return { target: 'electron', bridge: globals.devdock };
  if (globals.tauriInternals) return { target: 'tauri' };
  if (env.bridgeUrl) return { target: 'bridge', baseUrl: env.bridgeUrl };
  return { target: 'mock' };
}
```

Because the function is pure, it is testable without a browser, Electron, or HTTP.

## Bootstrap

```ts
// apps/ui/src/lib/services/bootstrap.ts
export async function initDevDock(): Promise<void> {
  const globals = readRuntimeGlobals();
  const env = readRuntimeEnv();
  const resolution = resolveTarget(globals, env);

  switch (resolution.target) {
    case 'electron':
      setAdapter(createElectronAdapter(resolution.bridge));
      return;
    case 'tauri': {
      const { invoke } = await import('@tauri-apps/api/core');
      setAdapter(createTauriAdapter(invoke));
      return;
    }
    case 'bridge':
      setAdapter(createBridgeAdapter(resolution.baseUrl));
      return;
    case 'mock':
      if (!env.isDev) throw new DevDockInitError('NO_SHELL_IN_PRODUCTION');
      setAdapter(createMockAdapter(devFixtures));
      return;
  }
}
```

The `switch` is exhaustive with no `default`, so adding a new target forces a compile-time update here.

## Testing

```ts
import { resolveTarget } from '$lib/adapters/resolve-target';

it('detects electron when window.devdock exists', () => {
  const result = resolveTarget({ devdock: fakeBridge }, { isDev: true });
  expect(result.target).toBe('electron');
});

it('the explicit override wins over detection', () => {
  const result = resolveTarget(
    { devdock: fakeBridge },
    { forcedTarget: 'mock', isDev: true },
  );
  expect(result.target).toBe('mock');
});
```

No Electron, no HTTP, no browser required.

---

## Alternative: build-time selection

If runtime detection is ever unwanted:

```ts
// vite.config.ts
export default defineConfig({
  define: {
    __DEVDOCK_TARGET__: JSON.stringify(process.env.DEVDOCK_TARGET ?? 'mock'),
  },
});
```

| | Runtime detection | Build-time constant |
|---|---|---|
| Builds required | One | One per target |
| Tree-shaking | No | Yes |
| Config complexity | Low | Higher |
| Dev/test convenience | High | Lower |

Recommendation: keep runtime detection. A desktop app loads its bundle from local disk, so bundle size is not a concern.

---

## Shared type location

`DevDockBridge` (the shape of `window.devdock`) must live in `packages/shared`, because two projects use it:

```txt
apps/desktop-electron/src/preload  -> exposes it
apps/ui/src/lib/adapters           -> consumes it
```

If each defines its own copy, they drift and produce hard-to-debug failures.

---

## Implementation checklist

- [ ] `packages/shared` exports `DevDockBridge`
- [ ] `apps/ui/src/types/globals.d.ts` declares `Window.devdock` and `Window.__TAURI_INTERNALS__`
- [ ] `apps/ui/src/app.d.ts` types `ImportMetaEnv`
- [ ] `environment.ts` is the only file touching untyped globals
- [ ] `resolve-target.ts` is a pure function returning a discriminated union
- [ ] Bootstrap switches exhaustively with no `default`
- [ ] Production throws when no shell is detected
- [ ] Resolver covered by unit tests

## Related

- [Architecture: adapters](../../../docs/architecture/adapters.md)
- [Documentation index](../../../docs/README.md)
