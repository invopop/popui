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

  let recentAction = false

  function cancel() {
    recentAction = true
    dispatch('cancel')
    setTimeout(() => {
      recentAction = false
    }, 10)
  }

  function confirm() {
    recentAction = true
    dispatch('confirm')
    setTimeout(() => {
      recentAction = false
    }, 10)
  }

  $: if (!open) {
    cancelByEsc()
  }

  function cancelByEsc() {
    if (recentAction) return

    dispatch('cancel')
  }
</script>

<AlertDialog openFocus="[data-alert-dialog-action]:nth-of-type(2)" bind:open>
  <AlertDialogTrigger class={$$slots.default ? '' : 'hidden'}>
    <slot />
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>
        <slot name="description" />
        {#if !$$slots.description}
          {description}
        {/if}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel
        bind:el={cancelActionEl}
        on:click={() => {
          cancel()
        }}
        on:keydown={(e) => {
          if (e.detail.originalEvent.key === 'Enter') {
            cancel()
          }
        }}>{cancelText}</AlertDialogCancel
      >
      <AlertDialogAction
        bind:el={okActionEl}
        {destructive}
        on:click={() => {
          confirm()
        }}
        on:keydown={(e) => {
          if (e.detail.originalEvent.key === 'Enter') {
            confirm()
          }
        }}
      >
        {actionText}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
