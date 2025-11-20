<script lang="ts">
  import 'flag-icons/css/flag-icons.min.css'
  import type { BaseFlagProps } from './types'

  let { country = '' }: BaseFlagProps = $props()

  let iso = $derived(country.toLowerCase())
</script>

<div class="w-3.5 h-2.5 rounded-[1.5px] overflow-hidden flex items-center justify-center">
  <span class="fi fi-{country.toLocaleLowerCase()} text-[14px] leading-none"></span>
</div>
