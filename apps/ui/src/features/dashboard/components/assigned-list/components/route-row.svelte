<script lang="ts">
  import Icon from '@iconify/svelte'
  import type { RouteMapping } from '@devdock/core'
  import { UiStatusPill, UiTooltip } from '$lib'

  let { route }: { route: RouteMapping } = $props()

  const meta = $derived(
    `${route.sourceType.toUpperCase()}:${route.targetPort}${
      route.processName ? ` • ${route.processName.toUpperCase()}` : ''
    }`
  )
</script>

<div
  data-card
  class="flex items-stretch gap-4 w-full hover:brightness-110 transition-all ease-material duration-250"
>
  <div data-btn class="flex gap-4 items-stretch w-full active:scale-100!">
    <div class="flex flex-col gap-1 min-w-0 py-4 pl-4">
      <span class="text-lg font-semibold truncate">{route.domain}</span>
      <span class="text-sm uppercase tracking-wide text-muted truncate">{meta}</span>
    </div>

    <div class="flex items-center">
      <UiStatusPill status={route.status} />
    </div>
  </div>

  <div class="flex items-center gap-1 pr-4 ml-auto z-1">
    <UiTooltip content="Open in browser">
      {#snippet trigger()}
        <button type="button" data-btn data-base data-bg-pr class="p-3" aria-label="Open route">
          <Icon icon="material-symbols:open-in-new-rounded" class="text-xl" />
        </button>
      {/snippet}
    </UiTooltip>

    <UiTooltip content="Delete route">
      {#snippet trigger()}
        <button
          type="button"
          data-btn
          data-base
          data-bg-danger
          class="p-3"
          aria-label="Delete route"
        >
          <Icon icon="material-symbols:delete-rounded" class="text-xl text-danger" />
        </button>
      {/snippet}
    </UiTooltip>
  </div>
</div>
