<script lang="ts">
  import Icon from '@iconify/svelte'
  import UnassignedServiceCard from './components/unassigned-service-card.svelte'
  import { useServicesStore } from '$features/dashboard/dashboard-context.svelte'
  import { UiTooltip } from '$lib'
  import Loader from '$lib/components/loader.svelte'

  const services = useServicesStore()

  const unassigned = $derived(services.items.filter(service => service.status === 'unassigned'))

  let refreshing = $state(false)
</script>

<section
  class="flex flex-col gap-4 w-full h-auto @min-[1024px]:h-full overflow-hidden"
>
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

  <!-- Narrow container: horizontal list (scroll on X, hidden on Y, pb-2 for the
       scrollbar gap). Wide container: vertical list (scroll on Y, pr-2). -->
  <div
    class="flex flex-row justify-start items-stretch overflow-x-auto overflow-y-hidden h-auto w-full gap-4 pb-2 @min-[1024px]:flex-col @min-[1024px]:items-start @min-[1024px]:overflow-x-hidden @min-[1024px]:overflow-y-auto @min-[1024px]:h-full @min-[1024px]:pb-0 @min-[1024px]:pr-2"
  >
    {#if services.loading && services.items.length === 0}
      {#each new Array(5), i (i)}
        <div
          data-skeleton
          class="h-25 min-h-25 w-80 shrink-0 @min-[1024px]:w-full"
        ></div>
      {/each}
    {:else if unassigned.length === 0}
      <div
        class="flex justify-center items-center w-full min-w-full h-full min-h-25 border-4 border-border-muted rounded-xl"
      >
        <div class="flex gap-2 text-muted">
          <span class="font-bold text-2xl">Nothing pending</span>
          <Icon icon="material-symbols:cheer-rounded" class="text-3xl leading-none" />
        </div>
      </div>
    {:else}
      {#each unassigned as service (service.id)}
        <UnassignedServiceCard {service} />
      {/each}
    {/if}
  </div>
</section>
