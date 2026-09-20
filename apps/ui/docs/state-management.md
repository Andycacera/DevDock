<!-- Context: ui/state-management | Priority: critical | Version: 1.0 | Updated: 2026-09-20 -->

# State Management — DevDock UI

> How state is scoped and shared in the Svelte UI. Read this before creating a store.
> Scope: `apps/ui` only.

## Why this document exists

Svelte 5 runes make state easy to share, which makes it easy to share **too much**. A
module-level `export const store = createStore()` is effectively global: every importer
gets the same instance. That is sometimes correct and often accidental.

This document defines the approved scopes and the rules that keep state boundaries
explicit, so the app stays testable and scalable.

## The four scopes

Pick the **narrowest** scope that works. From widest to narrowest:

| Scope | Use when | Mechanism | Location |
|-------|----------|-----------|----------|
| Global | App-wide state, exactly one instance | Module singleton | `src/lib/stores/` |
| Domain | Several features share state or a workflow | Scope factory + Context | `src/domains/<domain>/` |
| Feature | State belongs to one feature and must not leak | Factory + Context (provide/use) | `src/features/<feature>/` |
| Component | One component needs complex, testable state | Local `$state`; private factory instance | the component file |

Terminology: a **store** is the file/container (`stores/*.svelte.ts`); a **state** is the model/interface a store exposes (`XState`).

---

## 1. Component state

Prefer local runes. Do not create a store just because a value is reactive.

```svelte
<script lang="ts">
  let open = $state(false);
  const label = $derived(open ? 'Close' : 'Open');
</script>
```

Good fits: modal visibility, form input, expanded sections, local loading flags.

If a component genuinely needs a state container, instantiate the factory inside it and do
not export the instance:

```svelte
<script lang="ts">
  import { createFiltersStore } from './filters-store.svelte';
  const filters = createFiltersStore();
</script>
```

This is rare. If it appears often, the component is probably too large and should be split.

---

## 2. Feature stores (the default for features)

A feature store is created by a factory and shared through Svelte Context, so only the
feature subtree can reach it.

### 2.1 The factory

```ts
// features/dashboard/stores/services.svelte.ts
import type { DetectedService } from '@devdock/core';
import { devdockApi } from '$lib/services/devdock-api';
import { toUiError, type UiError } from '$lib/services/errors';

/** Model (state) exposed by the services store. */
export interface ServicesState {
  readonly items: DetectedService[];
  readonly loading: boolean;
  readonly error: UiError | null;
  readonly lastScanAt: string | null;
  refresh(): Promise<void>;
}

export function createServicesStore(): ServicesState {
  let items = $state<DetectedService[]>([]);
  let loading = $state(false);
  let error = $state<UiError | null>(null);
  let lastScanAt = $state<string | null>(null);

  async function refresh() {
    loading = true;
    error = null;
    try {
      items = await devdockApi.scanPorts();
      lastScanAt = new Date().toISOString();
    } catch (cause) {
      error = toUiError(cause);
      console.error(error);
    } finally {
      loading = false;
    }
  }

  return {
    get items() {
      return items;
    },
    get loading() {
      return loading;
    },
    get error() {
      return error;
    },
    get lastScanAt() {
      return lastScanAt;
    },
    refresh
  };
}
```

Rules:

- One coherent state domain per store.
- Return **getters + actions**. Never expose raw `$state`.
- Export the `XState` interface (the store's model) and return it from the factory.
- **Never export an instance** from this file.

### 2.2 The context helpers

```ts
// features/dashboard/dashboard-context.svelte.ts
import { getContext, setContext } from 'svelte';
import { createSidenavStore, type SidenavState } from './stores/sidenav.svelte';
import { createServicesStore, type ServicesState } from './stores/services.svelte';
import { createRoutesStore, type RoutesState } from './stores/routes.svelte';

const DASHBOARD_KEY = Symbol('dashboard-stores');

export interface DashboardStores {
  sidenav: SidenavState;
  services: ServicesState;
  routes: RoutesState;
}

export function provideDashboardStores(): DashboardStores {
  const stores: DashboardStores = {
    sidenav: createSidenavStore(),
    services: createServicesStore(),
    routes: createRoutesStore()
  };
  setContext(DASHBOARD_KEY, stores);
  return stores;
}

function useDashboardStores(): DashboardStores {
  const stores = getContext<DashboardStores | undefined>(DASHBOARD_KEY);
  if (!stores) {
    throw new Error(
      'Dashboard stores are not available. Render this component inside the dashboard provider.'
    );
  }
  return stores;
}

export function useSidenavStore(): SidenavState {
  return useDashboardStores().sidenav;
}

export function useServicesStore(): ServicesState {
  return useDashboardStores().services;
}

export function useRoutesStore(): RoutesState {
  return useDashboardStores().routes;
}
```

Rules:

- Hide raw `setContext` / `getContext` behind `provideXStore()` / `useXStore()`.
- The `use...` helper throws when the provider is missing.
- Expose **narrow helpers** (`useServicesStore()`) so a component depends only on what it uses.
- Never call `getContext` inside a store factory to resolve a dependency.

### 2.3 Providing and consuming

The feature root provides:

```svelte
<!-- routes/dashboard/+layout.svelte -->
<script lang="ts">
  import { provideDashboardStores } from '$features/dashboard/dashboard-context.svelte';
  provideDashboardStores();
</script>
```

Descendants consume:

```svelte
<script lang="ts">
  import { useServicesStore } from '$features/dashboard/dashboard-context.svelte';
  const services = useServicesStore();
</script>

<span>{services.items.length}</span>
```

---

## 3. Global stores

Use only for state that is conceptually global: theme, notifications/toasts, app config.

```ts
// lib/stores/notifications.svelte.ts
export function createNotificationsStore() { /* ... */ }
export const notificationsStore = createNotificationsStore();
```

Rules:

- `export const xStore = createXStore()`.
- Live in `src/lib/stores/`, not inside a feature.
- One instance for the whole app is the intended behavior.
- Do not promote feature state to global because importing is convenient.

---

## 4. Domain scopes (reserved)

When several features share state or participate in the same workflow, create a domain
scope above them.

```ts
// domains/checkout/checkout-scope.svelte.ts
export function createCheckoutScope() {
  const cart = createCartStore();
  const shipping = createShippingStore();
  const payment = createPaymentStore({ cart });
  const orchestrator = createCheckoutOrchestrator({ cart, shipping, payment });
  return { cart, shipping, payment, orchestrator };
}
```

Then provide it through Context with `provideCheckoutScope()` / `useCheckoutScope()` and
narrow helpers.

Rules:

- Raise a provider only to the lowest common ancestor that logically owns the features.
- Do not build a giant root provider that holds everything.

This level is not used yet. The rule stays for when it is needed.

---

## 5. Cross-store communication

Keep the dependency graph one-way.

**Simple one-way dependency** — inject explicitly:

```ts
export function createPaymentStore({ cartStore }: { cartStore: CartStore }) { /* ... */ }
```

**Multi-store workflow or bidirectional relations** — add an orchestrator:

```ts
export function createCheckoutOrchestrator({
  cartStore,
  shippingStore,
  paymentStore
}: {
  cartStore: CartStore;
  shippingStore: ShippingStore;
  paymentStore: PaymentStore;
}) {
  async function submitOrder() {
    const items = cartStore.items;
    await paymentStore.pay({ items, total: cartStore.total });
    cartStore.clear();
  }
  return { submitOrder };
}
```

Rules:

- Cycles (`A -> B -> C -> A`) mean the design is wrong. Fix it before adding code.
- Never import a scoped store as a module singleton inside another store.
- Never resolve a store dependency with `getContext` inside a factory.
- When a store starts talking to many others, stop and add an orchestrator.

---

## 6. Data access

```
Component -> store -> devdock-api -> adapter -> transport
```

- Components never call `devdock-api` or the shell directly.
- Stores are the only door to data.
- Stores catch failures, apply `toUiError`, and expose `error`. Views only render.

---

## 7. Shared rules

- Files use the `.svelte.ts` suffix so runes compile.
- Factories return getters + actions; never expose raw `$state`.
- **Never destructure reactive getters**:

  ```ts
  const { items } = store;        // captures the value once; breaks reactivity
  const items = store.items;      // still a one-time read outside a reactive context
  ```

  Read inside a reactive context instead:

  ```svelte
  <span>{store.items.length}</span>
  ```
  ```ts
  const count = $derived(store.items.length);
  ```

- Do not create stores for static data.
- Do not use the `zustand` dependency; the pattern is Svelte 5 runes.
- SSR caveat: module-level state is shared across requests. This app is a SPA, so it is
  safe today; do not rely on module state if SSR is ever enabled.

---

## 8. Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|--------------|--------------|------------|
| Everything is global | Boundaries disappear | Use the narrowest scope |
| "Factory = scoped" | A factory only creates instances | Context defines visibility |
| Direct imports between scoped stores | Silently creates global state | Inject explicitly |
| Circular store dependencies | Unclear init order, untestable | Add an orchestrator |
| `getContext` inside a store factory | Hidden dependency | Pass it as a parameter |
| Giant root provider | Global state in disguise | Raise to the lowest common scope |
| One store owns unrelated domains | Low cohesion | Split into cohesive stores |
| Destructuring reactive getters | Loses reactivity | Read `store.prop` in a reactive context |
| Exposing raw `$state` | External mutation | Return getters + actions |
| Store for static data | Unnecessary reactivity | Use a plain constant |

---

## 9. Decision guide

- One component needs the value -> local `$state`.
- Several components of one feature need it -> feature store + Context.
- Several features share it -> domain scope + Context.
- The whole app needs it, one instance -> global store.
- A workflow uses several stores -> orchestrator.

---

## 10. Folder structure

```txt
src/
├── lib/
│   └── stores/                        # global stores
├── domains/
│   └── <domain>/
│       ├── <domain>-scope.svelte.ts
│       ├── <domain>-context.svelte.ts
│       └── <domain>-orchestrator.svelte.ts
└── features/
    └── <feature>/
        ├── stores/
        │   └── <name>.svelte.ts
        ├── <feature>-context.svelte.ts
        ├── <feature>-orchestrator.svelte.ts   # only when needed
        └── components/
```

---

## Related

- [Architecture: layers](../../../docs/architecture/layers.md)
- [Adapter environment](./adapters-environment.md)
- [Design system](./DESIGN.md)
