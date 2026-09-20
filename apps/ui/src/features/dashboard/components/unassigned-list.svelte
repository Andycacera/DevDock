<script lang="ts">
  import { useServicesStore } from '$features/dashboard/dashboard-context.svelte'

  const services = useServicesStore()

  const unassigned = $derived(
    services.items.filter((service) => service.status === 'unassigned')
  )
</script>

<section data-card class="p-4 flex flex-col gap-3 w-full">
  <header class="flex items-center justify-between">
    <h2 class="text-lg font-semibold">Unassigned services</h2>
    <span class="text-xs text-muted">{unassigned.length} pending</span>
  </header>

  {#if services.loading && services.items.length === 0}
    <p class="text-sm text-muted">Loading…</p>
  {:else if unassigned.length === 0}
    <p class="text-sm text-muted">Nothing pending.</p>
  {:else}
    <ul class="flex flex-col gap-2">
      {#each unassigned as service (service.id)}
        <li class="flex items-center gap-3 font-jb-mono text-sm">
          <span class="text-muted">{service.host}:{service.port}</span>
          <span>{service.processName ?? 'unknown'}</span>
          {#if service.pid}
            <span class="text-muted">PID {service.pid}</span>
          {/if}
          <span class="ml-auto text-xs uppercase text-muted">{service.status}</span>
        </li>
      {/each}
    </ul>
  {/if}
</section>
