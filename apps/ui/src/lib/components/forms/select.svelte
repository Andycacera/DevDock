<script lang="ts">
  import Icon from '@iconify/svelte'
  import { Select } from 'bits-ui'

  export type SelectItem = {
    value: string
    label: string
    disabled?: boolean
  }

  type Props = {
    items: SelectItem[]
    value?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
    name?: string
    class?: string
  }

  let {
    items,
    value = $bindable(''),
    placeholder = 'Select an option',
    disabled = false,
    required = false,
    name,
    class: className = ''
  }: Props = $props()
</script>

<Select.Root type="single" bind:value {items} {disabled} {required} {name}>
  <Select.Trigger
    data-select-trigger
    class={`inline-flex min-w-56 h-fit items-center justify-between gap-2 text-left ${className}`}
  >
    <Select.Value {placeholder} />
    <Icon
      icon="material-symbols:keyboard-arrow-down-rounded"
      class="pointer-events-none text-xl text-muted"
    />
  </Select.Trigger>

  <Select.Portal>
    <Select.Content
      data-select-content
      class="z-50 min-w-(--bits-select-anchor-width) p-1"
      sideOffset={10}
    >
      <Select.Viewport class="max-h-64 overflow-auto">
        {#each items as item (item.value)}
          <Select.Item
            data-select-item
            value={item.value}
            label={item.label}
            disabled={item.disabled}
            class="flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize"
          >
            {#snippet children({ selected })}
              {item.label}
              {#if selected}
                <div class="ml-auto">
                  <Icon icon="material-symbols:check-rounded" class="text-lg leading-none" />
                </div>
              {/if}
            {/snippet}
          </Select.Item>
        {/each}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>
