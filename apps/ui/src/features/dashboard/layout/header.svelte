<script lang="ts">
  import logo from '$lib/assets/DevDock_3D.png'
  import Icon from '@iconify/svelte'
  import ProxyStatus from './components/proxy-status.svelte'
</script>

<div class="flex w-full items-center bg-background-2 px-8 py-4 border-b-3 border-b-border-muted">
  <div class="flex justify-center items-center gap-2">
    <img src={logo} alt="DevDock logo" class="w-10" />
    <span class="font-jb-sans font-black text-xl leading-none text-primary-500">DevDock</span>
  </div>
  <div class="ml-auto">
    <ProxyStatus />
  </div>
  <div class="w-px h-full mx-4 rounded-full bg-border-muted"></div>
  <!-- HEADER ACTIONS -->
  <button data-btn data-pr class="flex items-center gap-2 px-3 py-2">
    <Icon icon="material-symbols:alt-route-rounded" class="text-xl leading-none" />
    <span class="font-jb-sans text-sm uppercase font-semibold"> New route </span>
  </button>
</div>
