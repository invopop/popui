<script lang="ts">
  import Transition from 'svelte-transition'
  import flatpickr from 'flatpickr'
  import type { Instance } from 'flatpickr/dist/types/instance.js'
  import 'flatpickr/dist/flatpickr.min.css'
  import { createEventDispatcher, onMount } from 'svelte'
  import BaseButton from './BaseButton.svelte'
  import {
    startOfWeek,
    endOfWeek,
    subWeeks,
    endOfMonth,
    startOfMonth,
    subMonths,
    startOfQuarter,
    endOfQuarter,
    subQuarters
  } from 'date-fns'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Calendar } from '@invopop/ui-icons'
  import clsx from 'clsx'

  const dispatch = createEventDispatcher()

  export let label = 'Date'
  export let position: 'left' | 'right' = 'left'
  export let from = ''
  export let to = ''

  $: if (datepicker) {
    setDates(from, to)
  }

  $: styles = clsx({
    'border-accent-500 input-shadow': isOpen,
    'border-neutral-200': !isOpen
  })

  let datePickerEl: HTMLElement
  let selectedLabel = label
  let datepicker: Instance
  let selectedDates = { from: { value: '', display: '' }, to: { value: '', display: '' } }
  let isOpen = false
  let selectedPeriod = 'custom'

  const today = new Date()
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 })
  const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 })
  const startOfLastWeek = subWeeks(startOfThisWeek, 1)
  const endOfLastWeek = endOfWeek(startOfLastWeek, { weekStartsOn: 1 })
  const startOfThisMonth = startOfMonth(today)
  const endOfThisMonth = endOfMonth(today)
  const startOfLastMonth = subMonths(startOfThisMonth, 1)
  const endOfLastMonth = endOfMonth(startOfLastMonth)
  const startOfThisQuarter = startOfQuarter(today)
  const endOfThisQuarter = endOfQuarter(today)
  const startOfLastQuarter = subQuarters(startOfThisQuarter, 1)
  const endOfLastQuarter = endOfQuarter(startOfLastQuarter)

  const periods = [
    {
      slug: 'this-week',
      label: 'This Week',
      action: () => {
        selectedPeriod = 'this-week'
        datepicker.setDate([startOfThisWeek, endOfThisWeek], true)
        datepicker.jumpToDate(startOfThisWeek)
      }
    },
    {
      slug: 'last-week',
      label: 'Last Week',
      action: () => {
        selectedPeriod = 'last-week'
        datepicker.setDate([startOfLastWeek, endOfLastWeek], true)
        datepicker.jumpToDate(startOfLastWeek)
      }
    },
    {
      slug: 'this-month',
      label: 'This month',
      action: () => {
        selectedPeriod = 'this-month'
        datepicker.setDate([startOfThisMonth, endOfThisMonth], true)
        datepicker.jumpToDate(startOfThisMonth)
      }
    },
    {
      slug: 'last-month',
      label: 'Last month',
      action: () => {
        selectedPeriod = 'last-month'
        datepicker.setDate([startOfLastMonth, endOfLastMonth], true)
        datepicker.jumpToDate(startOfLastMonth)
      }
    },
    {
      slug: 'this-quarter',
      label: 'This quarter',
      action: () => {
        selectedPeriod = 'this-quarter'
        datepicker.setDate([startOfThisQuarter, endOfThisQuarter], true)
        datepicker.jumpToDate(startOfThisQuarter)
      }
    },
    {
      slug: 'last-quarter',
      label: 'Last quarter',
      action: () => {
        selectedPeriod = 'last-quarter'
        datepicker.setDate([startOfLastQuarter, endOfLastQuarter], true)
        datepicker.jumpToDate(startOfLastQuarter)
      }
    },
    {
      slug: 'custom',
      label: 'Custom',
      action: () => {
        datepicker.clear()
        selectedPeriod = 'custom'
      }
    }
  ]

  onMount(() => {
    datepicker = flatpickr(datePickerEl, {
      onChange: function (dates: Date[]) {
        if (dates.length === 0) {
          selectedLabel = label
          return
        }

        if (dates.length === 1) {
          selectedPeriod = 'custom'
          return
        }

        const from = getDate(dates[0])
        const to = getDate(dates[1])

        selectedDates = { from, to }
      },
      locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
      },
      inline: true,
      mode: 'range',
      dateFormat: 'Y-m-d',
      showMonths: 2
    })
  })

  function getDate(date: Date) {
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)

    return { value: `${year}-${month}-${day}`, display: `${day}/${month}/${year}` }
  }

  function cancel() {
    isOpen = false
    datepicker.clear()
    dispatch('selected', { from: '', to: '' })
  }

  function confirm() {
    isOpen = false
    selectedLabel = getLabel()

    dispatch('selected', { from: selectedDates.from.value, to: selectedDates.to.value })
  }

  function getLabel() {
    if (!selectedDates.from.value) return label

    if (selectedDates.from.value === selectedDates.to.value) return selectedDates.from.display

    return `${selectedDates.from.display} → ${selectedDates.to.display}`
  }

  function setDates(from: string, to: string) {
    datepicker.setDate([from, to])
    selectedDates = {
      from: { value: from, display: getDisplayFromValue(from) },
      to: { value: to, display: getDisplayFromValue(to) }
    }
    selectedLabel = getLabel()
  }

  function getDisplayFromValue(value: string) {
    if (!value) return ''

    const parts = value.split('-')

    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }
</script>

<div>
  <div class="relative">
    <button
      on:click={() => (isOpen = !isOpen)}
      class="{styles} datepicker-trigger w-full py-1.25 pl-7 pr-8 border hover:border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-800 text-base focus:border-accent-500"
    >
      {selectedLabel}
    </button>
    <Icon src={Calendar} class="h-4 w-4 absolute top-2 left-2 text-neutral-500" />
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
      <div
        class:left-0={position === 'left'}
        class:right-0={position === 'right'}
        class="bg-white inline-flex flex-col shadow rounded-lg absolute right-0 top-2 z-40"
      >
        <div class="flex border-b border-neutral-100 h-[300px]">
          <div class="flex flex-col space-y-2 items-start p-3 border-r border-neutral-100">
            {#each periods as period}
              <button
                on:click={period.action}
                class="{selectedPeriod === period.slug
                  ? 'text-accent-500 border-accent-500/20 bg-accent-500/5'
                  : 'text-neutral-500 border-transparent'} whitespace-nowrap text-base px-2 py-1 tracking-normal border rounded"
              >
                {period.label}
              </button>
            {/each}
          </div>
          <div bind:this={datePickerEl} />
        </div>
        <div class="p-3 flex justify-end items-center space-x-3">
          <BaseButton variant="secondary" on:click={cancel}>Cancel</BaseButton>
          <BaseButton variant="primary" on:click={confirm} disabled={!selectedDates.to.value}>
            Confirm
          </BaseButton>
        </div>
      </div>
    </Transition>
  </div>
</div>

<style>
  :global(.flatpickr-calendar) {
    width: 508px !important;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 4px;
    padding-bottom: 8px;
    font-family: 'Inter' !important;
    top: 0 !important;
    border-radius: 0;
    box-shadow: none;
  }
  :global(.flatpickr-weekdaycontainer:nth-child(2)) {
    margin-left: 28px;
  }
  :global(.dayContainer:nth-child(1)) {
    margin-right: 28px;
  }
  :global(.flatpickr-months) {
    padding-top: 8px;
    padding-bottom: 12px;
  }
  :global(.flatpickr-current-month) {
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    height: 24px !important;
    letter-spacing: -0.07px;
  }
  :global(.flatpickr-monthDropdown-months) {
    font-weight: 500 !important;
    height: 22px !important;
    color: #09101c !important;
  }
  :global(.cur-month:hover) {
    background-color: transparent !important;
  }
  :global(.numInputWrapper:hover) {
    background-color: #fafbfb !important;
    border: 1px solid #f3f5f5 !important;
  }
  :global(.numInputWrapper span.arrowUp) {
    right: -4px;
    border: 0;
    background-color: transparent;
  }
  :global(.numInputWrapper span.arrowDown) {
    right: -4px;
    border: 0;
    background-color: transparent;
  }
  :global(.cur-year, .cur-month) {
    font-weight: 600 !important;
    color: #09101c !important;
  }
  :global(.numInputWrapper) {
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: 22px;
  }
  :global(.flatpickr-next-month) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px !important;
    width: 24px !important;
    border: 1px solid #e9ebeb;
    right: 12px !important;
    top: 12px !important;
    padding: 0 !important;
    border-radius: 4px;
  }
  :global(.flatpickr-prev-month) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px !important;
    width: 24px !important;
    border: 1px solid #e9ebeb;
    left: 12px !important;
    top: 12px !important;
    padding: 0 !important;
    border-radius: 4px;
  }
  :global(.flatpickr-weekdays) {
    height: 32px;
  }
  :global(.flatpickr-day.selected, .flatpickr-day.startRange, .flatpickr-day.endRange) {
    background-color: #169958 !important;
    border: 0;
    border-radius: 4px !important;
    box-shadow: 0px 0px 0px 2px rgba(22, 153, 88, 0.12) !important;
  }
  :global(
      .flatpickr-day.selected:hover,
      .flatpickr-day.startRange:hover,
      .flatpickr-day.endRange:hover
    ) {
    border: 0;
  }
  :global(.flatpickr-day.inRange) {
    background-color: #f4f5f5;
    border: 1px solid #f4f5f5;
    box-shadow: none !important;
  }
  :global(.prevMonthDay, .nextMonthDay) {
    color: #cccece !important;
    font-weight: 500;
    font-size: 13px;
  }
  :global(.prevMonthDay.inRange, .nextMonthDay.inRange) {
    background-color: #f4f5f5 !important;
    border: 1px solid #f4f5f5 !important;
  }
  :global(.flatpickr-weekday) {
    width: 32px;
    height: 32px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    font-weight: 400 !important;
    color: #9ca3af !important;
    font-size: 12px !important;
  }
  :global(.flatpickr-weekdaycontainer) {
    flex: 0 !important;
    border-bottom: 1px solid #f3f5f5 !important;
  }
  :global(.flatpickr-prev-month svg) {
    fill: #0a0a0a;
    height: 10px !important;
    width: 10px !important;
  }
  :global(.flatpickr-next-month svg) {
    fill: #0a0a0a;
    height: 10px !important;
    width: 10px !important;
  }
  :global(.flatpickr-prev-month:hover svg, .flatpickr-next-month:hover svg) {
    fill: #0a0a0a !important;
  }
  :global(.flatpickr-days) {
    width: 496px !important;
  }
  :global(.dayContainer) {
    width: 224px;
    min-width: 224px;
    max-width: 224px;
    justify-content: start;
    box-shadow: none !important;
  }
  :global(.flatpickr-day) {
    margin-top: 2px !important;
    border-radius: 4px;
    width: 32px;
    max-width: 32px;
    height: 32px;
    line-height: 32px;
    display: flex !important;
    font-weight: 500 !important;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
  }
  :global(.flatpickr-day.today) {
    border: 0;
    border-bottom: 1px solid #169958;
    border-radius: 0;
  }
  :global(.flatpickr-day.today:hover) {
    background-color: #fafbfb !important;
    border: 1px solid #f3f5f5 !important;
    color: #0a0a0a;
    border-radius: 4px;
  }
  :global(.flatpickr-day:hover) {
    background-color: #fafbfb;
    border: 1px solid #f3f5f5;
  }
  :global(.prevMonthDay:hover, .nextMonthDay:hover) {
    background-color: #fafbfb !important;
    border: 1px solid #f3f5f5 !important;
  }
  .datepicker-trigger {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNNi41IDguMjUwMDRMMTAgMTEuNzVMMTMuNSA4LjI1IiBzdHJva2U9IiMwMzA3MTIiIHN0cm9rZS13aWR0aD0iMS4xIi8+Cjwvc3ZnPg==');
    background-repeat: no-repeat;
    background-position: center right 8px;
  }
  .datepicker-trigger:focus {
    box-shadow: 0px 0px 0px 2px rgba(22, 153, 88, 0.12);
  }
  .input-shadow {
    box-shadow: 0px 0px 0px 2px rgba(22, 153, 88, 0.12);
  }
</style>
