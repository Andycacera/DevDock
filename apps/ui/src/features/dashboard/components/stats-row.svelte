<script lang="ts">
  import { useRoutesStore, useServicesStore } from '$features/dashboard/dashboard-context.svelte'

  const services = useServicesStore()
  const routes = useRoutesStore()

  const activeServices = $derived(
    services.items.filter(service => service.status === 'active').length
  )
  const unassignedPorts = $derived(
    services.items.filter(service => service.status === 'unassigned').length
  )
  const assignedDomains = $derived(routes.items.length)

  const stats = $derived([
    { label: 'Active services', value: activeServices, color: 'text-aqua-cyan-200' },
    { label: 'Unassigned ports', value: unassignedPorts, color: 'text-signal-orange-200' },
    { label: 'Assigned domains', value: assignedDomains, color: 'text-electric-purple-200' }
  ])
</script>

<div class="grid grid-cols-1 sm:grid-cols-3 w-full bg-surface p-4 border-b-3 border-b-border-muted">
  {#each stats as stat, index (stat.label)}
    <div
      class={`flex flex-col gap-1 py-3 sm:px-6 ${
        index > 0 ? 'border-t-3 border-border-muted sm:border-t-0 sm:border-l-3' : ''
      }`}
    >
      <span class="text-xs font-semibold uppercase tracking-widest text-muted">{stat.label}</span>
      <span class={`text-4xl font-semibold ${stat.color} tabular-nums`}>
        {String(stat.value).padStart(2, '0')}
      </span>
    </div>
  {/each}
</div>
