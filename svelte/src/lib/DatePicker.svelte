<script lang="ts">
  import clsx from 'clsx'
  import RangeCalendar from '$lib/range-calendar/range-calendar.svelte'
  import { parseDate, type DateValue } from '@internationalized/date'
  import type { DateRange } from 'bits-ui'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import Transition from 'svelte-transition'
  import type { DatePickerProps } from './types'
  import { clickOutside } from './clickOutside'
  import BaseButton from './BaseButton.svelte'
  import { datesFromToday, toCalendarDate, resolveIcon } from './helpers'
  import { buttonVariants } from './button/button.svelte'
  import { offset, flip, shift } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import { portal } from 'svelte-portal'
  import { cn } from './utils'

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
    placement = 'bottom-start',
    from = '',
    to = '',
    onSelect,
    stackLeft = false,
    stackRight = false,
    icon = undefined,
    iconTheme = 'default'
  }: DatePickerProps = $props()

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement,
    middleware: [offset(8), flip(), shift()]
  })

  let resolvedIcon: IconSource | undefined = $state()

  $effect(() => {
    resolveIcon(icon).then((res) => (resolvedIcon = res))
  })

  let selectedPeriod = $state('custom')
  let value = $state<DateRange>({
    start: undefined,
    end: undefined
  })
  let isOpen = $state(false)
  let selectedLabel = $state(label)
  let isStacked = $derived(stackLeft || stackRight)
  let hasSelectedDates = $derived(value.start !== undefined)
  let hasConfirmedDates = $derived(selectedLabel !== label)
  let styles = $derived(
    isStacked
      ? buttonVariants({
          variant: 'ghost',
          stackedLeft: stackLeft,
          stackedRight: stackRight
        })
      : clsx('border backdrop-blur-sm backdrop-filter', {
          'border-border-selected-bold shadow-active': isOpen,
          'border-border-default-secondary hover:border-border-default-secondary-hover': !isOpen
        })
  )

  $effect(() => {
    if (!value.end) {
      selectedPeriod = 'custom'
    }
  })

  $effect(() => {
    if (from) {
      const startDate = parseDate(from)
      const endDate = to ? parseDate(to) : undefined

      value = {
        start: startDate,
        end: endDate
      }

      // Update label directly without calling getLabel() to avoid circular dependency
      if (startDate === endDate) {
        selectedLabel = getDisplayFromValue(startDate)
      } else {
        selectedLabel = `${getDisplayFromValue(startDate)} → ${getDisplayFromValue(endDate)}`
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
  <button
    use:floatingRef
    onclick={() => {
      isOpen = !isOpen
    }}
    class="{styles} {isStacked
      ? 'h-7 py-1.5'
      : 'py-1.5'} datepicker-trigger flex items-center w-full {resolvedIcon
      ? 'pl-7'
      : 'pl-2'} pr-2 text-left rounded-lg bg-background cursor-pointer relative overflow-hidden"
  >
    {#if resolvedIcon}
      <Icon
        src={resolvedIcon}
        theme={iconTheme}
        class="h-4 w-4 absolute top-1.5 left-2 text-foreground-default-secondary"
      />
    {/if}
    <span
      class={clsx('flex-1 text-base truncate', {
        'text-foreground': hasConfirmedDates,
        'text-foreground-default-secondary': !hasConfirmedDates,
        'font-normal': isStacked && !hasConfirmedDates
      })}
    >
      {selectedLabel}
    </span>
  </button>

  {#if isOpen}
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
        use:portal
        use:floatingContent
        class="bg-background inline-flex flex-col shadow-lg rounded-xl absolute z-1001 border border-border"
        use:clickOutside
        onclick_outside={() => {
          if (!isOpen) return
          cancel()
        }}
      >
        <div class="flex border-b border-border min-h-[300px] shadow-calendar">
          <div class="flex flex-col space-y-2 items-start p-3 border-r border-border">
            {#each periods as period}
              <button
                onclick={period.action}
                class="{selectedPeriod === period.slug
                  ? 'selected-period text-foreground-selected bg-background-selected font-medium'
                  : 'text-foreground-default-secondary'} whitespace-nowrap text-base px-2 py-1 tracking-normal rounded-md cursor-pointer"
              >
                {period.label}
              </button>
            {/each}
          </div>
          <RangeCalendar bind:value numberOfMonths={2} />
        </div>
        <div class="p-3 flex justify-end items-center space-x-3">
          <BaseButton variant="secondary" size="lg" onclick={cancel}>Cancel</BaseButton>
          <BaseButton variant="primary" size="lg" onclick={confirm} disabled={!value.end}
            >Confirm</BaseButton
          >
        </div>
      </div>
    </Transition>
  {/if}
</div>
