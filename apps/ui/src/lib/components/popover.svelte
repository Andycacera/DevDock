<script lang="ts">
  import { Popover } from 'bits-ui'
  import type { Snippet } from 'svelte'

  let {
    open = $bindable(false),
    trigger,
    children,
    side = 'bottom',
    align = 'center',
    sideOffset = 8,
    trapFocus = true,
    onOpenChange,
    class: className = '',
    contentClass = '',
    ...restProps
  }: {
    open?: boolean
    trigger: Snippet
    children: Snippet
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    sideOffset?: number
    trapFocus?: boolean
    onOpenChange?: (open: boolean) => void
    class?: string
    contentClass?: string
  } & Record<string, unknown> = $props()
</script>

<Popover.Root bind:open {onOpenChange}>
  <Popover.Trigger class={className} {...restProps}>
    {@render trigger()}
  </Popover.Trigger>

  <Popover.Portal>
    <Popover.Content
      {side}
      {align}
      {sideOffset}
      {trapFocus}
      data-popover-content
      class={contentClass}
    >
      {@render children()}
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
