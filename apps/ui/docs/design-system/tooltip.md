<!-- Context: ui/design-system/tooltip | Priority: high | Version: 1.0 | Updated: 2026-09-23 -->

# Tooltip

> `UiTooltip` — a small info bubble on hover. Built on `bits-ui` `Tooltip`.

## Setup

Requires `<Tooltip.Provider>` as an ancestor (mounted once in the root layout).

```svelte
<script lang="ts">
  import { UiTooltip } from '$lib'
</script>
```

## Props

| Prop            | Type                                     | Default    | Notes                                   |
| --------------- | ---------------------------------------- | ---------- | --------------------------------------- |
| `trigger`       | `Snippet`                                | —          | Trigger content (required)              |
| `content`       | `string`                                 | —          | Simple text content                     |
| `children`      | `Snippet`                                | —          | Rich content (overrides `content`)      |
| `side`          | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`    |                                         |
| `align`         | `'start' \| 'center' \| 'end'`           | `'center'` |                                         |
| `sideOffset`    | `number`                                 | `8`        |                                         |
| `delayDuration` | `number`                                 | `700`      | ms before opening on hover              |
| `open`          | `boolean` (bindable)                     | —          | Only when you need programmatic control |
| `class`         | `string`                                 | —          | Applied to the trigger                  |
| `contentClass`  | `string`                                 | —          | Applied to the bubble                   |

Any other props (e.g. `data-btn data-base`) are forwarded to the trigger element.

## Examples

```svelte
<UiTooltip content="Default tooltip" data-btn data-base data-outline class="px-4 py-2">
  {#snippet trigger()}Hover me{/snippet}
</UiTooltip>
```

Position and delay:

```svelte
<UiTooltip content="Right side" side="right" delayDuration={0}>…</UiTooltip>
```

Controlled (programmatic/click):

```svelte
<script lang="ts">
  let open = $state(false)
</script>

<UiTooltip bind:open content="Controlled">…</UiTooltip>
<button onclick={() => (open = !open)}>Toggle</button>
```

Rich content:

```svelte
<UiTooltip>
  {#snippet trigger()}Info{/snippet}
  {#snippet children()}
    <strong>Custom</strong> content
  {/snippet}
</UiTooltip>
```

## Styling

`apps/ui/src/styles/components/tooltips.css` targets `[data-tooltip-content]`.

## Notes

- Default `delayDuration` is `700` (bits-ui default). Set `0` for instant tooltips.
- Tooltips are hover/focus only; they are not available on touch. Use `UiPopover` for
  tap/click-triggered info.
