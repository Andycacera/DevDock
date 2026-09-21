<script lang="ts">
  /**
   * size: width of the loader (in pixels)
   * color: color of the loader (see design system color tokens)
   * duration: duration of the loader animation (in milliseconds)
   * */
  let { size = 24, color = 'primary-500', duration = 800 } = $props()
</script>

<div
  class="loader"
  style="--ds-ldr-width: {size}px; --ds-ldr-color: var(--ds-{color}); --ds-ldr-duration: {duration}ms"
></div>
