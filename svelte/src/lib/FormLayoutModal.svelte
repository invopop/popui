<script lang="ts">
  import { FormLayoutModalProps } from './types'

  let { children, footer }: FormLayoutModalProps = $props()
</script>

<div class="flex flex-col max-w-lg w-128 py-8 px-6 gap-4">
  {@render children?.()}
  {#if footer}
    <div class="mt-4 pt-4 flex items-center justify-end gap-x-6 border-t">
      {@render footer?.()}
    </div>
  {/if}
</div>
