<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'

  // The app root always lands on the dashboard. With the hash router, `resolve()` adds the
  // `#` prefix (turning `/dashboard` into `#/dashboard`), so `goto` stays inside the client
  // router instead of requesting a real `/dashboard` path.
  onMount(() => {
    void goto(resolve('/dashboard'), { replaceState: true })
  })
</script>

<div class="w-full h-full"></div>
