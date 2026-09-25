<script lang="ts">
  import Icon from '@iconify/svelte'
  import RouteRow from './components/route-row.svelte'
  import { useRoutesStore } from '$features/dashboard/dashboard-context.svelte'
  import { fuzzySearch } from '$lib/utils/search'

  const routes = useRoutesStore()
  let search = $state('')
  const filteredRoutes = $derived(fuzzySearch(routes.items, search))
</script>

<section class="flex flex-col gap-4 w-full h-full overflow-hidden">
  <header class="flex items-center gap-3 w-full">
    <Icon icon="material-symbols:route-rounded" class="text-2xl text-aqua-cyan-300" />
    <h2 class="text-xl font-semibold">Assigned Routes</h2>

    <div class="ml-auto flex items-center gap-2 pr-1">
      <div class="relative flex">
        <Icon
          icon="material-symbols:search-rounded"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-border"
        />
        <input bind:value={search} type="text" placeholder="Search routes" class="pl-9!" />
      </div>
      <!-- <button type="button" data-btn data-base class="p-2" aria-label="Search routes">
        <Icon icon="material-symbols:search-rounded" class="text-xl" />
      </button> -->
      <!-- <button type="button" data-btn data-base class="p-2" aria-label="Filter routes">
        <Icon icon="material-symbols:filter-list-rounded" class="text-xl" />
      </button> -->
    </div>
  </header>

  <div
    class="flex flex-col justify-start items-start overflow-y-auto overflow-x-hidden h-full w-full gap-4 pr-2"
  >
    {#if routes.loading && routes.items.length === 0}
      {#each new Array(5), i (i)}
        <!-- content here -->
        <div data-skeleton class="w-full h-22 min-h-22"></div>
      {/each}
    {:else if routes.items.length === 0}
      <div
        class="flex justify-center items-center w-full h-full border-4 border-border-muted rounded-xl"
      >
        <div class="flex flex-col justify-center items-center gap-8">
          <div class="flex gap-2 text-muted">
            <Icon icon="material-symbols:database-off-rounded" class="text-3xl leading-none" />
            <span class="font-bold text-2xl">No routes yet</span>
          </div>

          <button
            data-btn
            data-base
            data-outline
            data-bg-pr
            class="flex items-center gap-2 px-3 py-2 hover:border-primary-400/20!"
          >
            <Icon icon="material-symbols:alt-route-rounded" class="text-2xl leading-none" />
            <span class="font-jb-sans uppercase font-semibold"> Add your first route </span>
          </button>
        </div>
      </div>
    {:else}
      <div class="flex flex-col w-full gap-3">
        {#each filteredRoutes as route (route.id)}
          <RouteRow {route} />
        {/each}
      </div>
    {/if}
  </div>
</section>
