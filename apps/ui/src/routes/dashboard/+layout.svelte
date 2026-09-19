<script lang="ts">
  import Header from '../../features/dashboard/components/header.svelte'
  import Sidenav from '../../features/dashboard/components/sidenav.svelte'

  let { children } = $props()
</script>

<div class="flex flex-col w-full h-full justify-center items-center">
  <!-- HEADER -->
  <Header />
  <div class="flex w-full h-full justify-center items-center">
    <!-- SIDENAV -->
    <Sidenav />
    <!-- BODY -->
    <div class="flex w-full h-full justify-center items-center p-8">
      {@render children()}
    </div>
  </div>
</div>
