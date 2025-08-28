<script lang="ts">
  import AlertDialog from '../../lib/AlertDialog.svelte'

  interface Props {
    open?: boolean;
    destructive?: boolean;
    withSlot?: boolean;
    title?: string;
    description?: string;
    cancelText?: string;
    actionText?: string;
  }

  let {
    open = $bindable(false),
    destructive = false,
    withSlot = false,
    title = '',
    description = '',
    cancelText = 'Cancel',
    actionText = 'OK'
  }: Props = $props();
</script>

<div>
  {open}
  <AlertDialog
    on:cancel={() => {
      console.log('Canceled')
    }}
    on:confirm={() => {
      console.log('Confirmed')
    }}
    bind:open
    {title}
    {description}
    {cancelText}
    {actionText}
    {destructive}
  >
    {#if withSlot}
      Open
    {/if}
  </AlertDialog>
</div>
