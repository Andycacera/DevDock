<script lang="ts">
  import { useRoutesStore } from '$features/dashboard/dashboard-context.svelte'

  const routes = useRoutesStore()
</script>

<section data-card class="p-4 flex flex-col gap-3 w-full">
  <header class="flex items-center justify-between">
    <h2 class="text-lg font-semibold">Assigned routes</h2>
    <span class="text-xs text-muted">{routes.items.length} routes</span>
  </header>

  {#if routes.loading && routes.items.length === 0}
    <p class="text-sm text-muted">Loading…</p>
  {:else if routes.items.length === 0}
    <p class="text-sm text-muted">No routes yet.</p>
  {:else}
    <ul class="flex flex-col gap-2">
      {#each routes.items as route (route.id)}
        <li class="flex items-center gap-3 text-sm">
          <span class="font-jb-mono">{route.domain}</span>
          <span class="text-muted font-jb-mono">{route.targetHost}:{route.targetPort}</span>
          <span
            class="ml-auto text-xs uppercase"
            class:text-success={route.status === 'active'}
            class:text-warning={route.status === 'inactive'}
            class:text-danger={route.status === 'conflict'}
            class:text-muted={route.status === 'unassigned' || route.status === 'reserved'}
          >
            {route.status}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</section>
