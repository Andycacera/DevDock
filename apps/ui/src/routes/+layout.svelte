<script lang="ts">
  import '../styles/styles.css'
  import { Tooltip } from 'bits-ui'
  import favicon from '$lib/assets/favicon.svg'
  import UiDialogHost from '$lib/components/dialog-host.svelte'
  import UiToaster from '$lib/components/toaster.svelte'

  let { children } = $props()
</script>

<svelte:head>
  <title>DevDock</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<Tooltip.Provider>
  <div class="flex flex-col w-full h-full justify-center items-center">
    {@render children()}
  </div>
  <UiToaster />
  <UiDialogHost />
</Tooltip.Provider>
