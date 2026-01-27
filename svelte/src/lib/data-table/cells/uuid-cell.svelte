<script lang="ts">
  import ButtonUuidCopy from '$lib/ButtonUuidCopy.svelte'
  import type { UuidCellConfig } from '../data-table-types.js'

  let { value, config }: { value: string; config?: UuidCellConfig } = $props()
</script>

<ButtonUuidCopy
  uuid={value}
  prefixLength={config?.prefixLength}
  suffixLength={config?.suffixLength}
  full={config?.full}
  disabled={config?.disabled}
  oncopied={config?.onCopy}
/>
