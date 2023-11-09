<script lang="ts">
  import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte'
  import { CalendarStyle } from '@beyonk/svelte-datepicker/src/calendar-style'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let label = 'Date'

  let currentLabel = label

  const styling = new CalendarStyle({
    timeConfirmButtonColor: '#169958',
    dayHighlightedBackgroundColor: '#169958',
    highlightColor: '#169958',
    passiveHighlightColor: '#F3F5F5',
    dayTextColorInRange: 'black',
    monthYearTextColor: '09101C',
    legendTextColor: '7E7F7F',
    toolbarBorderColor: '#F3F5F5'
  })

  function getDate(date: Date) {
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)

    return `${year}-${month}-${day}`
  }

  function handleRangeSelected(event: CustomEvent) {
    const from = getDate(event.detail.from)
    const to = getDate(event.detail.to)
    currentLabel = `${from} → ${to}`
    dispatch('selected', { from, to })
  }

  function clearDates() {
    currentLabel = label
    dispatch('selected', { from: '', to: '' })
  }
</script>

<div class="relative">
  <DatePicker
    continueText="Confirm"
    {styling}
    range={true}
    defaultRange={[1, 'day']}
    on:range-selected={handleRangeSelected}
  >
    <button
      class:pr-9={currentLabel === label}
      class:pr-18={currentLabel !== label}
      class="datepicker-trigger py-1.25 pl-3 border border-neutral-200 hover:border-neutral-300 w-full rounded text-neutral-800 text-base outline-accent-400"
      >{currentLabel}</button
    >
    {#if currentLabel !== label}
      <button on:click|stopPropagation={clearDates} class="absolute right-10 top-2 mt-px z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    {/if}
  </DatePicker>
</div>

<style>
  .datepicker-trigger {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iI0YzRjVGNSIvPgo8cGF0aCBkPSJNNi41IDguMjUwMDRMMTAgMTEuNzVMMTMuNSA4LjI1IiBzdHJva2U9IiMwQTBBMEEiIHN0cm9rZS13aWR0aD0iMS4yIi8+Cjwvc3ZnPgo=');
    background-repeat: no-repeat;
    background-position: center right 12px;
  }
</style>
