<script lang="ts">
  import Icon from '@iconify/svelte'
  import { useRoutesStore } from '$features/dashboard/dashboard-context.svelte'

  const routes = useRoutesStore()

  const running = $derived(routes.proxyStatus?.running ?? false)
  const backend = $derived(routes.proxyStatus?.backend ?? 'unknown')
</script>

<div
  class="flex px-4 py-2 items-center gap-2 text-xs uppercase tracking-widest text-muted rounded-md border-2 border-border-muted"
>
  <Icon
    icon="material-symbols:circle"
    class={`text-md ${running ? 'text-success' : 'text-danger'}`}
  />
  <span>{backend}</span>
  <span class="text-foreground">{running ? 'Online' : 'Offline'}</span>
</div>
