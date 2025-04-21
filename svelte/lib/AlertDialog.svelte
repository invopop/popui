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
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let open = false
  export let destructive = false
  export let title = ''
  export let description = ''
  export let cancelText = 'Cancel'
  export let actionText = 'OK'
  export let cancelActionEl: HTMLButtonElement | undefined = undefined
  export let okActionEl: HTMLButtonElement | undefined = undefined
</script>

<AlertDialog openFocus="[data-alert-dialog-action]:nth-of-type(2)" bind:open>
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
      <AlertDialogCancel
        bind:el={cancelActionEl}
        on:click={() => {
          dispatch('cancel')
        }}
        on:keydown={(e) => {
          if (e.detail.originalEvent.key === 'Enter') {
            dispatch('cancel')
          }
        }}>{cancelText}</AlertDialogCancel
      >
      <AlertDialogAction
        bind:el={okActionEl}
        {destructive}
        on:click={() => {
          dispatch('confirm')
        }}
        on:keydown={(e) => {
          if (e.detail.originalEvent.key === 'Enter') {
            dispatch('confirm')
          }
        }}
      >
        {actionText}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
