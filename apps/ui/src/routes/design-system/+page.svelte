<script lang="ts">
  import type { Component } from 'svelte'

  let Showcase = $state<Component | null>(null)

  // `import.meta.env.DEV` is replaced with `false` in a production build, so this block is
  // removed entirely and the bundler never emits `showcase.svelte`.
  if (import.meta.env.DEV) {
    void import('./showcase.svelte').then(module => (Showcase = module.default))
  }
</script>

{#if Showcase}
  <Showcase />
{/if}
