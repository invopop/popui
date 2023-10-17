<script lang="ts">
  import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte'
  import { CalendarStyle } from '@beyonk/svelte-datepicker/src/calendar-style'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let label = 'Date'

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
    dispatch('selected', { from: getDate(event.detail.from), to: getDate(event.detail.to) })
  }
</script>

<div>
  <DatePicker
    continueText="Confirm"
    {styling}
    range={true}
    defaultRange={[1, 'day']}
    on:range-selected={handleRangeSelected}
  >
    <button
      class="datepicker-trigger py-1.25 pl-3 border border-neutral-200 hover:border-neutral-300 w-full rounded text-neutral-800 text-base pr-9 outline-accent-400"
      >{label}</button
    >
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
