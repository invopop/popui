<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Alert } from '@invopop/ui-icons'
  import type { InputErrorProps } from './types'

  let { errorText = '' }: InputErrorProps = $props()
</script>

<p class="flex items-center gap-1 text-xs text-foreground-critical">
  <Icon src={Alert} class="size-3 shrink-0" />
  <span>{errorText}</span>
</p>
