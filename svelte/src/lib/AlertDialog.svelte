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
  import type { AlertDialogProps } from './types'

  let {
    open = $bindable(false),
    destructive = false,
    title = '',
    descriptionText = '',
    cancelText = 'Cancel',
    actionText = 'OK',
    cancelActionEl = $bindable(),
    okActionEl = $bindable(),
    oncancel,
    onconfirm,
    description,
    children
  }: AlertDialogProps = $props()

  let recentAction = $state(false)

  function cancel() {
    recentAction = true
    oncancel?.()
    setTimeout(() => {
      recentAction = false
    }, 10)
  }

  function confirm() {
    recentAction = true
    onconfirm?.()
    setTimeout(() => {
      recentAction = false
    }, 10)
  }

  $effect(() => {
    if (!open) {
      cancelByEsc()
    }
  })

  function cancelByEsc() {
    if (recentAction) return

    oncancel?.()
  }

  function handleOpen(value: boolean) {
    if (value) {
      const focusEl = document.querySelector(
        '[data-alert-dialog-action]:nth-of-type(2)'
      ) as HTMLElement
      focusEl?.focus()
    }
  }
</script>

<AlertDialog onOpenChange={handleOpen} bind:open>
  <AlertDialogTrigger class={children ? '' : 'hidden'}>
    {@render children?.()}
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>
        {#if description}
          {@render description()}
        {:else}
          {descriptionText}
        {/if}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel
        bind:ref={cancelActionEl}
        onclick={() => {
          cancel()
        }}
        onkeydown={(e) => {
          if (e.key === 'Enter') {
            cancel()
          }
        }}
      >
        {cancelText}
      </AlertDialogCancel>
      <AlertDialogAction
        bind:ref={okActionEl}
        {destructive}
        onclick={() => {
          confirm()
        }}
        onkeydown={(e) => {
          if (e.key === 'Enter') {
            confirm()
          }
        }}
      >
        {actionText}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
