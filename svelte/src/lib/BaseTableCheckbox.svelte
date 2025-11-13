<script lang="ts">
  import InputCheckbox from './InputCheckbox.svelte'
  import type { BaseTableCheckboxProps } from './types'

  let {
    checkboxButton = $bindable(undefined),
    checked = false,
    indeterminate = false,
    onChecked
  }: BaseTableCheckboxProps = $props()

  function handleClick(event: MouseEvent) {
    event.stopPropagation()
    onChecked?.(!checked)
  }
</script>

<button
  role="checkbox"
  aria-checked={checked}
  bind:this={checkboxButton}
  class="pl-3 h-full w-full flex items-center justify-center outline-none group cursor-default"
  onclick={handleClick}
>
  <InputCheckbox
    {checked}
    {indeterminate}
    onclick={(e) => e.stopPropagation()}
    onchange={(changed) => {
      onChecked?.(changed)
    }}
  />
</button>
