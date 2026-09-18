<script lang="ts">
  import { Switch, useId, type WithoutChildrenOrChild } from 'bits-ui'

  export type SwitchSize = 'sm' | 'md' | 'lg'

  type SizeConfig = {
    root: string
    thumb: string
    thumbOffset: string
  }

  /**
   * Geometry invariant (keeps the thumb centered with identical padding at every size):
   *   padding = 3px (px-0.75)
   *   thumb   = trackHeight - 6px  -> 3px + thumb + 3px = trackHeight
   *   width   = trackHeight * 5/3
   *   travel  = trackHeight * 2/3  -> thumb ends flush with the opposite padding
   */
  const SIZE_CLASSES: Record<SwitchSize, SizeConfig> = {
    sm: {
      root: 'h-6 min-h-6 w-10 px-0.75',
      thumb: 'size-4.5',
      thumbOffset: 'data-[state=checked]:translate-x-4'
    },
    md: {
      root: 'h-7.5 min-h-7.5 w-12.5 px-0.75',
      thumb: 'size-6',
      thumbOffset: 'data-[state=checked]:translate-x-5'
    },
    lg: {
      root: 'h-9 min-h-9 w-15 px-0.75',
      thumb: 'size-7.5',
      thumbOffset: 'data-[state=checked]:translate-x-6'
    }
  }

  const DEFAULT_COLOR = 'var(--ds-primary)'
  const DEFAULT_OFF_COLOR = 'var(--ds-border-muted)'

  /** Accepts `--ds-token`, `var(--ds-token)` or a raw CSS color. */
  const resolveColor = (value: string, fallback: string): string => {
    const color = value.trim()
    if (!color) return fallback
    if (color.includes('(')) return color
    if (color.startsWith('--')) return `var(${color})`
    return color
  }

  type Props = WithoutChildrenOrChild<Switch.RootProps> & {
    size?: SwitchSize
    color?: string
    offColor?: string
    checked?: boolean
    disabled?: boolean
    name?: string
    class?: string
    thumbClass?: string
  }

  let {
    id = useId(),
    size = 'md',
    color = DEFAULT_COLOR,
    offColor = DEFAULT_OFF_COLOR,
    checked = $bindable(false),
    ref = $bindable(null),
    disabled = false,
    name,
    class: className = '',
    thumbClass = '',
    ...restProps
  }: Props = $props()

  const sizeConfig = $derived(SIZE_CLASSES[size])
  const switchColor = $derived(resolveColor(color, DEFAULT_COLOR))
  const switchOffColor = $derived(resolveColor(offColor, DEFAULT_OFF_COLOR))
</script>

<div
  class="flex items-center space-x-3"
  style:--ui-switch-color={switchColor}
  style:--ui-switch-color-off={switchOffColor}
>
  <Switch.Root
    {id}
    bind:checked
    bind:ref
    {disabled}
    {name}
    {...restProps}
    class={`focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-(--ui-switch-color) data-[state=unchecked]:bg-(--ui-switch-color-off) focus-visible:outline-hidden inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${sizeConfig.root} ${className}`}
  >
    <Switch.Thumb
      class={`bg-foreground pointer-events-none block shrink-0 rounded-full shadow-xs transition-transform ${sizeConfig.thumb} ${sizeConfig.thumbOffset} ${thumbClass}`}
    />
  </Switch.Root>
</div>
