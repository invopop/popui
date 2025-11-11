<script lang="ts">
  import clsx from 'clsx'
  import RangeCalendar from '$lib/range-calendar/range-calendar.svelte'
  import { parseDate, type DateValue } from '@internationalized/date'
  import type { DateRange } from 'bits-ui'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Calendar } from '@invopop/ui-icons'
  import Transition from 'svelte-transition'
  import type { DatePickerProps } from './types'
  import { clickOutside } from './clickOutside'
  import BaseButton from './BaseButton.svelte'
  import { datesFromToday, toCalendarDate } from './helpers'

  const {
    startOfThisWeek,
    endOfThisWeek,
    startOfLastWeek,
    endOfLastWeek,
    startOfThisMonth,
    endOfThisMonth,
    startOfLastMonth,
    endOfLastMonth,
    startOfThisQuarter,
    endOfThisQuarter,
    startOfLastQuarter,
    endOfLastQuarter,
    today
  } = datesFromToday()

  const periods = [
    {
      slug: 'this-week',
      label: 'This Week',
      action: () => {
        value = {
          start: toCalendarDate(startOfThisWeek),
          end: toCalendarDate(endOfThisWeek)
        }
        selectedPeriod = 'this-week'
      }
    },
    {
      slug: 'last-week',
      label: 'Last Week',
      action: () => {
        value = {
          start: toCalendarDate(startOfLastWeek),
          end: toCalendarDate(endOfLastWeek)
        }
        selectedPeriod = 'last-week'
      }
    },
    {
      slug: 'this-month',
      label: 'This month',
      action: () => {
        value = {
          start: toCalendarDate(startOfThisMonth),
          end: toCalendarDate(endOfThisMonth)
        }
        selectedPeriod = 'this-month'
      }
    },
    {
      slug: 'last-month',
      label: 'Last month',
      action: () => {
        value = {
          start: toCalendarDate(startOfLastMonth),
          end: toCalendarDate(endOfLastMonth)
        }
        selectedPeriod = 'last-month'
      }
    },
    {
      slug: 'this-quarter',
      label: 'This quarter',
      action: () => {
        value = {
          start: toCalendarDate(startOfThisQuarter),
          end: toCalendarDate(endOfThisQuarter)
        }
        selectedPeriod = 'this-quarter'
      }
    },
    {
      slug: 'last-quarter',
      label: 'Last quarter',
      action: () => {
        value = {
          start: toCalendarDate(startOfLastQuarter),
          end: toCalendarDate(endOfLastQuarter)
        }
        selectedPeriod = 'last-quarter'
      }
    },
    {
      slug: 'custom',
      label: 'Custom',
      action: () => {
        value = {
          start: toCalendarDate(today),
          end: undefined
        }
        selectedPeriod = 'custom'
      }
    }
  ]

  let {
    label = 'Date',
    position = 'left',
    from = '',
    to = '',
    onSelect
  }: DatePickerProps = $props()

  let selectedPeriod = $state('custom')
  let value = $state<DateRange>({
    start: undefined,
    end: undefined
  })
  let isOpen = $state(false)
  let styles = $derived(
    clsx({
      'border-border-selected-bold shadow-active': isOpen,
      'border-border hover:border-border-default-secondary-hover': !isOpen
    })
  )
  let selectedLabel = $state(label)

  $effect(() => {
    if (!value.end) {
      selectedPeriod = 'custom'
    }
  })

  $effect(() => {
    if (from) {
      value = {
        start: parseDate(from),
        end: to ? parseDate(to) : undefined
      }
      return
    }
  })

  function cancel() {
    value = {
      start: undefined,
      end: undefined
    }
    selectedPeriod = 'custom'
    selectedLabel = label
    isOpen = false
    onSelect?.({ from: '', to: '' })
  }

  function getDisplayFromValue(value: DateValue | undefined) {
    if (!value) return ''

    const date = value.toString()

    const parts = date.split('-')

    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }

  function getLabel() {
    if (!value.start) return label

    if (value.start === value.end) return getDisplayFromValue(value.start)

    return `${getDisplayFromValue(value.start)} → ${getDisplayFromValue(value.end)}`
  }

  function confirm() {
    isOpen = false
    selectedLabel = getLabel()

    onSelect?.({ from: value.start?.toString() || '', to: value.end?.toString() || '' })
  }
</script>

<div>
  <div class="relative">
    <button
      onclick={() => {
        isOpen = !isOpen
      }}
      class="{styles} datepicker-trigger w-full py-1.25 pl-7 pr-8 border rounded-md text-foreground placeholder-foreground text-base cursor-pointer"
    >
      {selectedLabel}
    </button>
    <Icon src={Calendar} class="h-4 w-4 absolute top-2 left-2 text-foreground-default-secondary" />
  </div>

  <div class="relative">
    <Transition
      show={isOpen}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <!-- @ts-ignore -->
      <div
        class:left-0={position === 'left'}
        class:right-0={position === 'right'}
        class="bg-white inline-flex flex-col shadow-md rounded-lg absolute right-0 top-2 z-40"
        use:clickOutside
        onclick_outside={() => {
          if (!isOpen) return
          cancel()
        }}
      >
        <div class="flex border-b border-border min-h-[300px] rounded-lg shadow-calendar">
          <div class="flex flex-col space-y-2 items-start p-3 border-r border-border">
            {#each periods as period}
              <button
                onclick={period.action}
                class="{selectedPeriod === period.slug
                  ? 'selected-period text-foreground-accent bg-foreground-accent/10'
                  : 'text-foreground-default-secondary'} whitespace-nowrap text-base px-2 py-1 tracking-normal rounded cursor-pointer"
              >
                {period.label}
              </button>
            {/each}
          </div>
          <RangeCalendar bind:value numberOfMonths={2} />
        </div>
        <div class="p-3 flex justify-end items-center space-x-3">
          <BaseButton variant="secondary" onclick={cancel}>Cancel</BaseButton>
          <BaseButton variant="primary" onclick={confirm} disabled={!value.end}>Confirm</BaseButton>
        </div>
      </div>
    </Transition>
  </div>
</div>
