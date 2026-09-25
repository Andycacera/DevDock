<script lang="ts">
  import Icon from '@iconify/svelte'
  import { browser } from '$app/environment'
  import UnassignedServiceCard from './components/unassigned-service-card.svelte'
  import { useServicesStore } from '$features/dashboard/dashboard-context.svelte'
  import { UiTooltip } from '$lib'
  import Loader from '$lib/components/loader.svelte'

  // TEMPORARY: only 2 services are shown for now. The UX to explore every detected
  // service from this view without hurting usability is still undefined.
  // const MAX_VISIBLE = 2

  const services = useServicesStore()

  const unassigned = $derived(services.items.filter(service => service.status === 'unassigned'))

  let isSmall = $state(false)
  let index = $state(0)
  let refreshing = $state(false)

  $effect(() => {
    if (!browser) return
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => (isSmall = query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  })

  const safeIndex = $derived(unassigned.length === 0 ? 0 : Math.min(index, unassigned.length - 1))

  // const visible = $derived(
  //   isSmall ? unassigned.slice(safeIndex, safeIndex + 1) : unassigned.slice(0, MAX_VISIBLE)
  // )
  const visible = $derived(isSmall ? unassigned.slice(safeIndex, safeIndex + 1) : unassigned)

  function go(delta: number) {
    const total = unassigned.length
    if (total === 0) return
    index = (safeIndex + delta + total) % total
  }
</script>

<section class="flex flex-col gap-4 w-full h-full overflow-hidden">
  <header class="flex items-center justify-between gap-4 w-full">
    <div class="flex items-center gap-3 w-full">
      <Icon icon="material-symbols:settings-rounded" class="text-2xl text-signal-orange-300" />
      <h2 class="text-xl font-semibold">Unassigned Detected Services</h2>
      {#if refreshing}
        <Loader color="signal-orange-300" />
      {/if}
    </div>
    <div class="flex pr-2">
      <UiTooltip>
        {#snippet trigger()}
          <button data-btn data-base data-outline data-bg-pr class="flex items-center gap-2 p-2">
            <Icon icon="material-symbols:refresh-rounded" class="text-xl leading-none" />
          </button>
        {/snippet}
        <span>Refresh</span>
      </UiTooltip>
    </div>
  </header>

  <div
    class="flex flex-col justify-start items-start overflow-y-auto overflow-x-hidden h-full w-full gap-4"
  >
    {#if services.loading && services.items.length === 0}
      {#each new Array(5), i (i)}
        <div data-skeleton class="w-full h-25 min-h-25"></div>
      {/each}
    {:else if unassigned.length === 0}
      <div
        class="flex justify-center items-center w-full h-full border-4 border-border-muted rounded-xl"
      >
        <div class="flex gap-2 text-muted">
          <span class="font-bold text-2xl">Nothing pending</span>
          <Icon icon="material-symbols:cheer-rounded" class="text-3xl leading-none" />
        </div>
      </div>
    {:else}
      <div
        class="flex flex-col justify-start items-start overflow-y-auto overflow-x-hidden h-full w-full gap-4 pr-2"
      >
        {#each visible as service (service.id)}
          <UnassignedServiceCard {service} />
        {/each}
      </div>
      <div class="flex justify-end w-full">
        {#if isSmall && unassigned.length > 1}
          <!-- TEMPORARY: provisional navigation. The final design is undefined. -->
          <div class="flex items-center justify-between gap-2">
            <button
              type="button"
              data-btn
              data-base
              data-outline
              class="p-1"
              aria-label="Previous service"
              onclick={() => go(-1)}
            >
              <Icon icon="material-symbols:chevron-left-rounded" class="text-xl" />
            </button>

            <span class="text-muted">{safeIndex + 1} / {unassigned.length}</span>

            <button
              type="button"
              data-btn
              data-base
              data-outline
              class="p-1"
              aria-label="Next service"
              onclick={() => go(1)}
            >
              <Icon icon="material-symbols:chevron-right-rounded" class="text-xl" />
            </button>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>
