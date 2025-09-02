<script lang="ts">
  import type { BaseFlagProps } from './types'

  let { country = '', width = 12 }: BaseFlagProps = $props()

  let iso = $derived(country.toLowerCase())
</script>

<!-- https://github.com/HatScripts/circle-flags -->
<img src={`https://hatscripts.github.io/circle-flags/flags/${iso}.svg`} alt={country} {width} />
