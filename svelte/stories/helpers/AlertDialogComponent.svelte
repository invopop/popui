<script lang="ts">
  import AlertDialog from '../../lib/AlertDialog.svelte'

  export let open = false
  export let destructive = false
  export let withSlot = false
  export let title = ''
  export let description = ''
  export let cancelText = 'Cancel'
  export let actionText = 'OK'
</script>

<div>
  {open}
  <AlertDialog bind:open {title} {description} {cancelText} {actionText} {destructive}>
    {#if withSlot}
      Open
    {/if}
  </AlertDialog>
</div>
