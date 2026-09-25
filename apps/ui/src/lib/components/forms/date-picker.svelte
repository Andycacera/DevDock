<script lang="ts">
  import { DatePicker } from 'bits-ui'
  import { CalendarDate, getLocalTimeZone, type DateValue, today } from '@internationalized/date'
  import Icon from '@iconify/svelte'

  type Props = {
    value?: DateValue
    placeholder?: DateValue
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    minValue?: DateValue
    maxValue?: DateValue
    name?: string
    class?: string
    locale?: string
  }

  let {
    value = $bindable<DateValue | undefined>(undefined),
    placeholder = today(getLocalTimeZone()),
    disabled = false,
    readonly = false,
    required = false,
    minValue,
    maxValue,
    name,
    class: className = '',
    locale = 'en-GB'
  }: Props = $props()

  const isOutsideMonth = (monthValue: DateValue, dayValue: DateValue): boolean => {
    return monthValue.month !== dayValue.month || monthValue.year !== dayValue.year
  }
</script>

<DatePicker.Root
  bind:value
  {locale}
  {placeholder}
  {disabled}
  {readonly}
  {required}
  {minValue}
  {maxValue}
>
  <div class={`inline-flex w-fit h-fit min-w-56 items-center gap-2 ${className}`}>
    <DatePicker.Input {name} data-date-picker-input class="inline-flex flex-1 items-center gap-1">
      {#snippet children({ segments })}
        {#each segments as { part, value }, i (part + i)}
          <DatePicker.Segment {part} class="text-sm">{value}</DatePicker.Segment>
        {/each}

        <DatePicker.Trigger
          data-date-picker-trigger
          class="inline-flex h-6 w-6 items-center justify-center ml-auto bg-background text-foreground"
        >
          <Icon
            icon="material-symbols:calendar-today-rounded"
            class="pointer-events-none text-xl text-muted"
          />
        </DatePicker.Trigger>
      {/snippet}
    </DatePicker.Input>
  </div>

  <DatePicker.Portal>
    <DatePicker.Content data-date-picker-content class="z-50 p-3">
      <DatePicker.Calendar class="flex flex-col gap-2">
        {#snippet children({ months, weekdays })}
          {#each months as month (month.value.toString())}
            <DatePicker.Header class="mb-2 flex items-center justify-between gap-2">
              <DatePicker.PrevButton data-calendar-nav aria-label="Previous month">
                <Icon
                  icon="material-symbols:keyboard-arrow-left"
                  class="pointer-events-none text-xl text-muted"
                />
              </DatePicker.PrevButton>
              <DatePicker.Heading class="text-sm font-semibold" />
              <DatePicker.NextButton data-calendar-nav aria-label="Next month">
                <Icon
                  icon="material-symbols:keyboard-arrow-right"
                  class="pointer-events-none text-xl text-muted"
                />
              </DatePicker.NextButton>
            </DatePicker.Header>

            <DatePicker.Grid class="w-full border-separate border-spacing-1">
              <DatePicker.GridHead>
                <DatePicker.GridRow>
                  {#each weekdays as day, i (i + day)}
                    <DatePicker.HeadCell class="text-muted w-8 text-center text-xs"
                      >{day}</DatePicker.HeadCell
                    >
                  {/each}
                </DatePicker.GridRow>
              </DatePicker.GridHead>

              <DatePicker.GridBody>
                {#each month.weeks as weekDates, weekIndex (`${month.value.toString()}-week-${weekIndex}`)}
                  <DatePicker.GridRow>
                    {#each weekDates as date (date.toString())}
                      <DatePicker.Cell {date} month={month.value}>
                        <DatePicker.Day
                          data-calendar-day
                          data-outside-month={isOutsideMonth(month.value as CalendarDate, date)
                            ? ''
                            : undefined}
                          class="relative text-sm data-today:underline"
                        >
                          {date.day}
                        </DatePicker.Day>
                      </DatePicker.Cell>
                    {/each}
                  </DatePicker.GridRow>
                {/each}
              </DatePicker.GridBody>
            </DatePicker.Grid>
          {/each}
        {/snippet}
      </DatePicker.Calendar>
    </DatePicker.Content>
  </DatePicker.Portal>
</DatePicker.Root>
