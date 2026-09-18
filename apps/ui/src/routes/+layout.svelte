<script lang="ts">
  import '../styles/styles.css'
  import favicon from '$lib/assets/favicon.svg'

  let { children } = $props()
</script>

<svelte:head>
  <title>DevDock</title>
  <link rel="icon" href={favicon} />
</svelte:head>
<div class="flex flex-col w-full h-full justify-center items-center gap-8 p-8">
  <div class="flex flex-col w-full h-full justify-start items-center">
    {@render children()}
  </div>
</div>
