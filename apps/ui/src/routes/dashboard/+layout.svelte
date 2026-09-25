<script lang="ts">
  import Header from '$features/dashboard/layout/header.svelte'
  import Sidenav from '$features/dashboard/layout/sidenav.svelte'
  import { provideDashboardStores } from '$features/dashboard/dashboard-context.svelte'

  provideDashboardStores()

  let { children } = $props()
</script>

<div class="flex flex-col w-full h-full justify-center items-center overflow-hidden">
  <!-- HEADER -->
  <Header />
  <div class="flex w-full h-full justify-center items-center overflow-hidden">
    <!-- SIDENAV -->
    <Sidenav />
    <!-- BODY -->
    <div class="flex w-full h-full justify-center items-center overflow-hidden">
      {@render children()}
    </div>
  </div>
</div>
