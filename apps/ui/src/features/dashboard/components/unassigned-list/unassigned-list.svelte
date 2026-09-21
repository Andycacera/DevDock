<script lang="ts">
  import Icon from '@iconify/svelte'
  import { browser } from '$app/environment'
  import UnassignedServiceCard from './components/unassigned-service-card.svelte'
  import { useServicesStore } from '$features/dashboard/dashboard-context.svelte'

  // TEMPORARY: only 2 services are shown for now. The UX to explore every detected
  // service from this view without hurting usability is still undefined.
  const MAX_VISIBLE = 2

  const services = useServicesStore()

  const unassigned = $derived(services.items.filter(service => service.status === 'unassigned'))

  let isSmall = $state(false)
  let index = $state(0)

  $effect(() => {
    if (!browser) return
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => (isSmall = query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  })

  const safeIndex = $derived(unassigned.length === 0 ? 0 : Math.min(index, unassigned.length - 1))

  const visible = $derived(
    isSmall ? unassigned.slice(safeIndex, safeIndex + 1) : unassigned.slice(0, MAX_VISIBLE)
  )

  function go(delta: number) {
    const total = unassigned.length
    if (total === 0) return
    index = (safeIndex + delta + total) % total
  }
</script>

<section class="flex flex-col gap-4 w-full">
  <header class="flex items-center gap-3 w-full">
    <Icon icon="material-symbols:settings-rounded" class="text-2xl text-signal-orange-300" />
    <h2 class="text-xl font-semibold">Unassigned Detected Services</h2>
  </header>

  {#if services.loading && services.items.length === 0}
    <p class="text-sm text-muted">Loading…</p>
  {:else if unassigned.length === 0}
    <p class="text-sm text-muted">Nothing pending.</p>
  {:else}
    <div class="flex flex-col gap-3">
      {#each visible as service (service.id)}
        <UnassignedServiceCard {service} />
      {/each}
    </div>

    {#if isSmall && unassigned.length > 1}
      <!-- TEMPORARY: provisional navigation. The final design is undefined. -->
      <div class="flex items-center justify-between">
        <button
          type="button"
          data-btn
          data-base
          class="p-2"
          aria-label="Previous service"
          onclick={() => go(-1)}
        >
          <Icon icon="material-symbols:chevron-left-rounded" class="text-xl" />
        </button>

        <span class="text-xs text-muted">{safeIndex + 1} / {unassigned.length}</span>

        <button
          type="button"
          data-btn
          data-base
          class="p-2"
          aria-label="Next service"
          onclick={() => go(1)}
        >
          <Icon icon="material-symbols:chevron-right-rounded" class="text-xl" />
        </button>
      </div>
    {/if}
  {/if}
</section>
