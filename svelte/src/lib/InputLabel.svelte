<script lang="ts">
  import type { InputLabelProps } from './types'

  let { id = '', label = '', ...rest }: InputLabelProps = $props()
</script>

<label for={id} class="text-sm font-medium text-foreground-default-secondary" {...rest}>
  {label}
</label>
