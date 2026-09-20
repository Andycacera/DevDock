<script lang="ts">
  import { onMount } from 'svelte'
  import AssignedList from '$features/dashboard/components/assigned-list.svelte'
  import SummaryCards from '$features/dashboard/components/summary-cards.svelte'
  import UnassignedList from '$features/dashboard/components/unassigned-list.svelte'
  import { useRoutesStore, useServicesStore } from '$features/dashboard/dashboard-context.svelte'

  const services = useServicesStore()
  const routes = useRoutesStore()

  onMount(() => {
    void services.refresh()
    void routes.refresh()
  })
</script>

<div class="flex flex-col gap-6 w-full h-full">
  <SummaryCards />

  <div class="grid grid-cols-2 gap-6 w-full">
    <UnassignedList />
    <AssignedList />
  </div>
</div>
