<script lang="ts">
  import InputCheckbox from './InputCheckbox.svelte'
  import type { BaseTableCheckboxProps } from './types'

  let {
    checkboxButton = $bindable(undefined),
    checked = false,
    hidden = false,
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
  class="absolute inset-0 h-full w-full flex items-center justify-center outline-none group cursor-default"
  onclick={handleClick}
>
  <div class:invisible={hidden} class="group-hover:visible">
    <InputCheckbox
      {checked}
      {indeterminate}
      onchange={(changed) => {
        onChecked?.(changed)
      }}
    />
  </div>
</button>
