<script lang="ts">
  import { Tooltip } from 'bits-ui'
  import type { Snippet } from 'svelte'

  let {
    trigger,
    content,
    children,
    side = 'top',
    align = 'center',
    sideOffset = 8,
    delayDuration = 100,
    open = $bindable(false),
    class: className = '',
    contentClass = '',
    ...restProps
  }: {
    trigger: Snippet
    content?: string
    children?: Snippet
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    sideOffset?: number
    delayDuration?: number
    open?: boolean
    class?: string
    contentClass?: string
  } & Record<string, unknown> = $props()
</script>

<Tooltip.Root bind:open {delayDuration}>
  <Tooltip.Trigger class={className} {...restProps}>
    {@render trigger()}
  </Tooltip.Trigger>

  <Tooltip.Portal>
    <Tooltip.Content {side} {align} {sideOffset} data-tooltip-content class={contentClass}>
      {#if children}
        {@render children()}
      {:else}
        {content}
      {/if}
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip.Root>
