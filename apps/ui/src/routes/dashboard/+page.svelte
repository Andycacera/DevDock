<script lang="ts">
  import { onMount } from 'svelte'
  import AssignedList from '$features/dashboard/components/assigned-list/assigned-list.svelte'
  import StatsRow from '$features/dashboard/components/stats-row.svelte'
  import UnassignedList from '$features/dashboard/components/unassigned-list/unassigned-list.svelte'
  import { useRoutesStore, useServicesStore } from '$features/dashboard/dashboard-context.svelte'

  const services = useServicesStore()
  const routes = useRoutesStore()

  onMount(() => {
    void services.refresh()
    void routes.refresh()
  })
</script>

<div class="flex flex-col w-full h-full overflow-hidden">
  <StatsRow />

  <!-- DOM order is unassigned -> routes so `md` matches the reference. On `lg+`
       the wrappers swap with `order`: routes in the wide column, unassigned in
       the narrow one. -->
  <div
    class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_30rem] gap-8 w-full h-full items-start p-8 overflow-hidden"
  >
    <div class="flex w-full h-full overflow-hidden xl:order-2">
      <UnassignedList />
    </div>
    <div class="flex w-full h-full overflow-hidden xl:order-1">
      <AssignedList />
    </div>
  </div>
</div>
