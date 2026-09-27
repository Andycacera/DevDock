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

<div class="flex justify-start items-start w-full h-full overflow-hidden">
  <div class="flex flex-col w-full h-full overflow-hidden">
    <StatsRow />

    <!-- The wrapper is the query container (an element cannot query itself). The
         layout responds to this width, not the viewport. Base = narrow stack
         (unassigned first, then routes). At >=1024px the panels go side by side:
         routes in the wide column, unassigned in the narrow one. -->
    <div class="@container flex-1 min-h-0 w-full overflow-hidden">
      <div
        class="grid grid-cols-1 grid-rows-[auto_minmax(0,1fr)] @min-[1024px]:grid-cols-[minmax(0,1fr)_30rem] @min-[1024px]:grid-rows-[minmax(0,1fr)] gap-8 w-full h-full items-start p-8 overflow-hidden"
      >
        <div class="flex w-full h-full overflow-hidden @min-[1024px]:order-2">
          <UnassignedList />
        </div>
        <div class="flex w-full h-full overflow-hidden @min-[1024px]:order-1">
          <AssignedList />
        </div>
      </div>
    </div>
  </div>
</div>
