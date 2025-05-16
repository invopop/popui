<script lang="ts">
  import Select from 'svelte-select-kit'
  import type { SelectOption } from './types'
  import ComboBoxContent from './ComboBoxContent.svelte'

  export let disabled = false
  export let id = Math.random().toString(36).slice(2, 7)
  export let placeholder = ''
  export let value = ''
  export let options: SelectOption[] = []
</script>

<Select.Root label={id}>
  <ComboBoxContent {disabled} {placeholder} {options} bind:value />
</Select.Root>
