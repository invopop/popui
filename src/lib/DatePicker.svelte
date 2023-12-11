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
  import { Calendar } from '@steeze-ui/heroicons'

  const dispatch = createEventDispatcher()

  export let label = 'Date'
  export let position: 'left' | 'right' = 'left'

  let datePickerEl: HTMLElement
  let selectedLabel = label
  let datepicker: Instance
  let selectedDates = { from: { value: '', display: '' }, to: { value: '', display: '' } }
  let isOpen = false

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

  onMount(() => {
    datepicker = flatpickr(datePickerEl, {
      onChange: function (dates: Date[]) {
        if (dates.length === 0) {
          selectedLabel = label
          return
        }

        if (dates.length === 1) return

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
      showMonths: 2,
      numberOfMonths: 2
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

  function onThisWeek() {
    datepicker.setDate([startOfThisWeek, endOfThisWeek], true)
    datepicker.jumpToDate(startOfThisWeek)
  }

  function onLastWeek() {
    datepicker.setDate([startOfLastWeek, endOfLastWeek], true)
    datepicker.jumpToDate(startOfLastWeek)
  }

  function onThisMonth() {
    datepicker.setDate([startOfThisMonth, endOfThisMonth], true)
    datepicker.jumpToDate(startOfThisMonth)
  }

  function onLastMonth() {
    datepicker.setDate([startOfLastMonth, endOfLastMonth], true)
    datepicker.jumpToDate(startOfLastMonth)
  }

  function onThisQuarter() {
    datepicker.setDate([startOfThisQuarter, endOfThisQuarter], true)
    datepicker.jumpToDate(startOfThisQuarter)
  }

  function onLastQuarter() {
    datepicker.setDate([startOfLastQuarter, endOfLastQuarter], true)
    datepicker.jumpToDate(startOfLastQuarter)
  }
</script>

<div>
  <div class="relative">
    <button
      on:click={() => (isOpen = !isOpen)}
      class="datepicker-trigger w-full py-1.25 pl-7 pr-8 border border-neutral-200 hover:border-neutral-300 rounded text-neutral-800 placeholder-neutral-800 text-base outline-accent-400"
      >{selectedLabel}</button
    >
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
        class="bg-white inline-flex flex-col shadow rounded-lg absolute right-0 top-2 z-30"
      >
        <div class="flex border-b border-neutral-100">
          <div
            class="flex flex-col justify-around items-start px-3 py-2 border-r border-neutral-100"
          >
            <button
              on:click={onThisWeek}
              class="whitespace-nowrap text-neutral-500 text-sm px-2 py-1.5">This Week</button
            >
            <button
              on:click={onLastWeek}
              class="whitespace-nowrap text-neutral-500 text-sm px-2 py-1.5">Last Week</button
            >
            <button
              on:click={onThisMonth}
              class="whitespace-nowrap text-neutral-500 text-sm px-2 py-1.5">This Month</button
            >
            <button
              on:click={onLastMonth}
              class="whitespace-nowrap text-neutral-500 text-sm px-2 py-1.5">Last Month</button
            >
            <button
              on:click={onThisQuarter}
              class="whitespace-nowrap text-neutral-500 text-sm px-2 py-1.5">This Quarter</button
            >
            <button
              on:click={onLastQuarter}
              class="whitespace-nowrap text-neutral-500 text-sm px-2 py-1.5">Last Quarter</button
            >
          </div>
          <div bind:this={datePickerEl} />
        </div>
        <div class="p-4 flex justify-end items-center space-x-3">
          <BaseButton variant="secondary" on:click={cancel}>Cancel</BaseButton>
          <BaseButton variant="primary" on:click={confirm} disabled={!selectedDates.to.value}
            >Confirm</BaseButton
          >
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
    font-size: 15px;
    height: 24px !important;
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
    box-shadow: none !important;
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
    font-weight: 500 !important;
    color: #7e7f7f !important;
    font-size: 13px !important;
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
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iI0YzRjVGNSIvPgo8cGF0aCBkPSJNNi41IDguMjUwMDRMMTAgMTEuNzVMMTMuNSA4LjI1IiBzdHJva2U9IiMwQTBBMEEiIHN0cm9rZS13aWR0aD0iMS4yIi8+Cjwvc3ZnPgo=');
    background-repeat: no-repeat;
    background-position: center right 8px;
  }
</style>
