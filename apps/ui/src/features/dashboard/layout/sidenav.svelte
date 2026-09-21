<script lang="ts">
  import { PUBLIC_ENVIRONMENT, PUBLIC_VERSION } from '$env/static/public'
  import Icon from '@iconify/svelte'
  import { useSidenavStore } from '$features/dashboard/dashboard-context.svelte'
  import { page } from '$app/state'

  const sidenav = useSidenavStore()

  const currentPath = $derived(page.url.hash.replace(/^#/, '').split('?')[0] || '/')

  function isSelected(route: string) {
    return currentPath === route || currentPath.startsWith(`${route}/`)
  }
</script>

<div class="flex flex-col w-85 h-full p-4 bg-surface border-r-3 border-r-border-muted">
  <!-- TOP -->
  <div class="flex flex-col h-full gap-2">
    <span class="font-jb-sans font-semibold uppercase text-lg text-muted mb-2">Navigation</span>
    {#each sidenav.items as navItem (navItem.label)}
      <a
        href={`#${navItem.path}`}
        data-btn
        class="flex px-4 py-3 gap-4 items-center rounded-sm!"
        class:selected={isSelected(navItem.path)}
      >
        {#if navItem.icon}
          <Icon class={'text-xl leading-none ' + navItem.icon.class} icon={navItem.icon.name} />
        {/if}
        <span class="text-lg leading-none">{navItem.label}</span>
      </a>
    {/each}
  </div>
  <!-- BOTTOM -->
  <div class="flex justify-end w-full">
    <span class="text-sm text-primary-300 font-bold opacity-50"
      >v{PUBLIC_VERSION}-{PUBLIC_ENVIRONMENT}</span
    >
  </div>
</div>

<style>
  a.selected {
    background-color: color-mix(in oklab, var(--ds-primary-900) 30%, transparent);
    color: var(--ds-primary-300);
    border-right: solid 3px var(--ds-primary-300);

    &:hover {
      color: var(--ds-primary-200);
    }
  }

  a:hover:not(.selected) {
    background-color: var(--ds-surface-2);
    transition: all 250ms var(--material-anim);
  }
</style>
