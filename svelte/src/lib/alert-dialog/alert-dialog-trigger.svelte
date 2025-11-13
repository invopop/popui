<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  let { ref = $bindable(null), children }: AlertDialogPrimitive.TriggerProps = $props()
</script>

<AlertDialogPrimitive.Trigger bind:ref data-slot="alert-dialog-trigger">
  {@render children?.()}
</AlertDialogPrimitive.Trigger>
