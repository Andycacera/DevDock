<!-- Context: ui/design-system/dialog | Priority: high | Version: 1.0 | Updated: 2026-09-23 -->

# Dialog

> `UiDialog` (declarative) + `confirmDialog` / `alertDialog` (imperative). Built on `bits-ui` `Dialog`.

## Setup

- `UiDialog`: import and use it anywhere.
- `confirmDialog` / `alertDialog`: require `<UiDialogHost />` mounted once (root layout does it).

```svelte
<script lang="ts">
  import { UiDialog, confirmDialog, alertDialog } from '$lib'
</script>
```

## `UiDialog` props

| Prop                   | Type                      | Default | Notes                      |
| ---------------------- | ------------------------- | ------- | -------------------------- |
| `open`                 | `boolean` (bindable)      | `false` |                            |
| `trigger`              | `Snippet`                 | —       | Optional trigger element   |
| `title`                | `string`                  | —       | Required (accessible name) |
| `description`          | `string`                  | —       | Optional                   |
| `children`             | `Snippet`                 | —       | Dialog body                |
| `actions`              | `Snippet`                 | —       | Footer buttons             |
| `closeOnOutsideClick`  | `boolean`                 | `true`  |                            |
| `closeOnEscape`        | `boolean`                 | `true`  |                            |
| `showClose`            | `boolean`                 | `true`  | Renders the X button       |
| `size`                 | `'sm' \| 'md' \| 'lg'`    | `'md'`  |                            |
| `class`                | `string`                  | —       | Applied to the content     |
| `onOpenChange`         | `(open: boolean) => void` | —       |                            |
| `onOpenChangeComplete` | `(open: boolean) => void` | —       | Fires after the transition |

### Declarative example

```svelte
<script lang="ts">
  let open = $state(false)
</script>

<button data-btn data-pr class="px-4 py-2" onclick={() => (open = true)}>New route</button>

<UiDialog bind:open title="Create route" description="Map a friendly domain to a service.">
  <p>Body content.</p>
  {#snippet actions()}
    <button data-btn data-sc class="px-4 py-2" onclick={() => (open = false)}>Cancel</button>
    <button data-btn data-pr class="px-4 py-2" onclick={() => (open = false)}>Create</button>
  {/snippet}
</UiDialog>
```

## Imperative API

Both return a `Promise<boolean>` (`true` = confirmed).

```ts
const ok = await confirmDialog({
  title: 'Delete route?',
  description: 'This cannot be undone.',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  confirmType: 'danger',
  cancelType: 'secondary',
  confirmClass: 'custom-class',
  cancelClass: '',
  onConfirm: () => {},
  onCancel: () => {}
})

if (ok) notify.success('Route deleted')
```

```ts
await alertDialog({
  title: 'Proxy reloaded',
  description: 'The routing config is up to date.',
  confirmText: 'OK',
  confirmType: 'info',
  confirmClass: ''
})
```

### Options

| Option                                         | Type                                        | Applies to           |
| ---------------------------------------------- | ------------------------------------------- | -------------------- |
| `title`                                        | `string`                                    | both                 |
| `description`                                  | `string?`                                   | both                 |
| `confirmText` / `confirmType` / `confirmClass` | `string?` / `DialogButtonType?` / `string?` | both                 |
| `cancelText` / `cancelType` / `cancelClass`    | `string?` / `DialogButtonType?` / `string?` | `confirmDialog` only |
| `onConfirm`                                    | `() => void`                                | both                 |
| `onCancel`                                     | `() => void`                                | `confirmDialog` only |

### Button types

`DialogButtonType` maps to the design-system button attribute:

| Type        | Attribute      |
| ----------- | -------------- |
| `primary`   | `data-pr`      |
| `secondary` | `data-sc`      |
| `success`   | `data-success` |
| `warning`   | `data-warning` |
| `danger`    | `data-danger`  |
| `info`      | `data-info`    |

## Styling

`apps/ui/src/styles/components/dialogs.css` targets `[data-dialog-overlay]`,
`[data-dialog-content]`, `[data-dialog-title]`, `[data-dialog-description]`,
`[data-dialog-body]`, `[data-dialog-actions]`, `[data-dialog-close]`.

## Notes

- The imperative host keeps the dialog mounted and only toggles `open`, so the enter and exit
  transitions run like the declarative dialog. The request data is cleared after the close
  animation (`onOpenChangeComplete`) so the content does not disappear mid-transition.
- Imperative dialogs do not close on outside click; Escape cancels them.
- `UiDialog` always renders `Dialog.Title` for accessibility.
