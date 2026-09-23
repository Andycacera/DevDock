<!-- Context: ui/design-system/toast | Priority: high | Version: 1.0 | Updated: 2026-09-23 -->

# Toast

> `notify` (API) + `UiToaster` (viewport). Built on `svelte-sonner`.

## Setup

`UiToaster` is mounted once in the root layout. Then call `notify` from anywhere.

```ts
import { notify } from '$lib';
```

## API

| Method | Description |
|--------|-------------|
| `notify.success(message, options?)` | Success toast |
| `notify.error(message, options?)` | Error toast |
| `notify.warning(message, options?)` | Warning toast |
| `notify.info(message, options?)` | Info toast |
| `notify.loading(message, options?)` | Loading toast (persistent until updated/dismissed) |
| `notify.promise(promise, { loading, success, error })` | Tracks a promise through its states |
| `notify.dismiss(id?)` | Dismiss one toast (by id) or all |
| `notify.custom(component)` | Render a custom Svelte component as a toast |

`options`: `description?`, `duration?`, `action?: { label, onClick }`, `id?`.

## Examples

```ts
notify.success('Route applied');
notify.error('Proxy reload failed', { description: 'Caddy returned exit code 1' });
notify.loading('Scanning ports…');
```

Promise:

```ts
notify.promise(saveConfig(), {
  loading: 'Applying config…',
  success: 'Config applied',
  error: (err) => `Apply failed: ${err}`
});
```

Action + manual dismissal:

```ts
const id = notify.success('Route deleted', {
  action: { label: 'Undo', onClick: () => restoreRoute() }
});

notify.dismiss(id);
```

## Types and icons

`UiToaster` passes icon snippets for `success`, `error`, `warning`, `info`, and `loading`.
The loading toast uses `UiLoader`.

## Styling

`UiToaster` runs sonner with `unstyled: true`. Styling lives in
`apps/ui/src/styles/components/toasts.css` and targets sonner's attributes:

```css
[data-sonner-toast] { … }
[data-sonner-toast][data-type='success'] { border-left-color: var(--ds-success); }
```

The icon slot (`[data-icon]`) is a sized flex box so the loader and icons sit in place, and
the hidden loader (`data-visible="false"`) is `display: none` to avoid leaving a gap after a
promise resolves.

## Notes

- The app never imports `svelte-sonner` directly; `notify` wraps it so the implementation can
  be swapped.
- Toasts work for `loading → success/error` transitions via `notify.promise`.
