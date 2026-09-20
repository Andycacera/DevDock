<script lang="ts">
  import { useRoutesStore, useServicesStore } from '$features/dashboard/dashboard-context.svelte'

  const services = useServicesStore()
  const routes = useRoutesStore()

  const activeServices = $derived(
    services.items.filter((service) => service.status === 'active').length
  )
  const unassignedPorts = $derived(
    services.items.filter((service) => service.status === 'unassigned').length
  )
  const assignedDomains = $derived(routes.items.length)
  const proxyRunning = $derived(routes.proxyStatus?.running ?? false)
</script>

<div class="grid grid-cols-4 gap-4 w-full">
  <div data-card class="p-4 flex flex-col gap-1">
    <span class="text-sm text-muted">Active services</span>
    <span class="text-3xl font-semibold">{activeServices}</span>
  </div>

  <div data-card class="p-4 flex flex-col gap-1">
    <span class="text-sm text-muted">Unassigned ports</span>
    <span class="text-3xl font-semibold">{unassignedPorts}</span>
  </div>

  <div data-card class="p-4 flex flex-col gap-1">
    <span class="text-sm text-muted">Assigned domains</span>
    <span class="text-3xl font-semibold">{assignedDomains}</span>
  </div>

  <div data-card class="p-4 flex flex-col gap-1">
    <span class="text-sm text-muted">Proxy status</span>
    <span
      class="text-3xl font-semibold"
      class:text-success={proxyRunning}
      class:text-danger={!proxyRunning}
    >
      {proxyRunning ? 'Online' : 'Offline'}
    </span>
  </div>
</div>
