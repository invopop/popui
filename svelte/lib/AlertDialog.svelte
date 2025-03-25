<script lang="ts">
  import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
  } from '$lib/alert-dialog'

  export let open = false
  export let destructive = false
  export let title = ''
  export let description = ''
  export let cancelText = 'Cancel'
  export let actionText = 'OK'
</script>

<AlertDialog openFocus="[data-alert-dialog-action]" bind:open>
  <AlertDialogTrigger>
    <slot />
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>
        {description}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>{cancelText}</AlertDialogCancel>
      <AlertDialogAction {destructive} on:click>
        {actionText}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
