<script lang="ts">
  import Select from 'svelte-select-kit'
  import type { SelectOption } from './types'
  import ComboBoxContent from './ComboBoxContent.svelte'

  interface Props {
    disabled?: boolean;
    id?: any;
    placeholder?: string;
    value?: string;
    options?: SelectOption[];
  }

  let {
    disabled = false,
    id = Math.random().toString(36).slice(2, 7),
    placeholder = '',
    value = $bindable(''),
    options = []
  }: Props = $props();
</script>

<Select.Root label={id}>
  <ComboBoxContent {disabled} {placeholder} {options} bind:value />
</Select.Root>
