<script lang="ts">
  import Icon from '@iconify/svelte'
  import RouteRow from './components/route-row.svelte'
  import { useRoutesStore } from '$features/dashboard/dashboard-context.svelte'

  const routes = useRoutesStore()
</script>

<section class="flex flex-col gap-4 w-full">
  <header class="flex items-center gap-3 w-full">
    <Icon icon="material-symbols:route-rounded" class="text-2xl text-aqua-cyan-300" />
    <h2 class="text-xl font-semibold">Assigned Routes</h2>

    <div class="ml-auto flex items-center gap-2">
      <button type="button" data-btn data-base class="p-2" aria-label="Search routes">
        <Icon icon="material-symbols:search-rounded" class="text-xl" />
      </button>
      <button type="button" data-btn data-base class="p-2" aria-label="Filter routes">
        <Icon icon="material-symbols:filter-list-rounded" class="text-xl" />
      </button>
    </div>
  </header>

  {#if routes.loading && routes.items.length === 0}
    <p class="text-sm text-muted">Loading…</p>
  {:else if routes.items.length === 0}
    <p class="text-sm text-muted">No routes yet.</p>
  {:else}
    <div class="flex flex-col gap-3">
      {#each routes.items as route (route.id)}
        <RouteRow {route} />
      {/each}
    </div>
  {/if}
</section>
