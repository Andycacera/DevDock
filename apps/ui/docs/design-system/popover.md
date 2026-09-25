<!-- Context: ui/design-system/popover | Priority: high | Version: 1.0 | Updated: 2026-09-23 -->

# Popover

> `UiPopover` — a floating panel anchored to a trigger, with dynamic content. Built on
> `bits-ui` `Popover`.

## Setup

```svelte
<script lang="ts">
  import { UiPopover } from '$lib'
</script>
```

Not used in the app yet; it is prepared for future features that need tap/click info panels.

## Props

| Prop           | Type                                     | Default    | Notes                      |
| -------------- | ---------------------------------------- | ---------- | -------------------------- |
| `open`         | `boolean` (bindable)                     | `false`    |                            |
| `trigger`      | `Snippet`                                | —          | Trigger content (required) |
| `children`     | `Snippet`                                | —          | Popover content (required) |
| `side`         | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` |                            |
| `align`        | `'start' \| 'center' \| 'end'`           | `'center'` |                            |
| `sideOffset`   | `number`                                 | `8`        |                            |
| `trapFocus`    | `boolean`                                | `true`     |                            |
| `onOpenChange` | `(open: boolean) => void`                | —          |                            |
| `class`        | `string`                                 | —          | Applied to the trigger     |
| `contentClass` | `string`                                 | —          | Applied to the panel       |

Any other props (e.g. `data-btn data-base`) are forwarded to the trigger element.

## Example

```svelte
<script lang="ts">
  import { UiPopover, notify } from '$lib'

  let open = $state(false)
</script>

<UiPopover bind:open data-btn data-base data-outline class="px-4 py-2">
  {#snippet trigger()}Open popover{/snippet}

  <div class="flex flex-col gap-2">
    <span class="font-semibold">Popover content</span>
    <p class="text-sm text-muted">Dynamic content passed by the caller.</p>
    <button data-btn data-pr class="px-3 py-1 self-start" onclick={() => notify.info('Action')}>
      Action
    </button>
  </div>
</UiPopover>
```

## Calling back into the caller

Pass content as snippets and communicate with plain function props (Svelte 5):

```svelte
<UiPopover onOpenChange={v => console.log('open:', v)}>…</UiPopover>
```

Inside the content snippet, call the caller's handlers directly (closures) or close the
popover by setting the bound `open` to `false`:

```svelte
<script lang="ts">
  let open = $state(false)

  function handleAction(id: string) {
    console.log('action:', id)
    open = false
  }
</script>
```

## Styling

`apps/ui/src/styles/components/popovers.css` targets `[data-popover-content]`.

## Notes

- `trapFocus` defaults to `true`.
- For tap/click info use a popover; tooltips are hover-only.
