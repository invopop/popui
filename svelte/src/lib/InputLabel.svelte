<script lang="ts">
  import type { InputLabelProps } from './types'

  let { id = '', label = '', ...rest }: InputLabelProps = $props()
</script>

<label for={id} class="text-sm font-medium text-neutral-500 mb-2" {...rest}>{label}</label>
