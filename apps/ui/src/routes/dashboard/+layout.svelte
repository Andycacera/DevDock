<script lang="ts">
  import Header from '$features/dashboard/layout/header.svelte'
  import Sidenav from '$features/dashboard/layout/sidenav.svelte'
  import { provideDashboardStores } from '$features/dashboard/dashboard-context.svelte'

  provideDashboardStores()

  let { children } = $props()
</script>

<div class="flex flex-col w-full h-full justify-center items-center">
  <!-- HEADER -->
  <Header />
  <div class="flex w-full h-full justify-center items-center">
    <!-- SIDENAV -->
    <Sidenav />
    <!-- BODY -->
    <div class="flex w-full h-full justify-center items-center">
      {@render children()}
    </div>
  </div>
</div>
