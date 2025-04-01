<script lang="ts">
  import 'inter-ui/inter.css'
  import { install } from '@twind/core'
  import twconfig from '../twind.config.js'
  import AlertDialogComponent from '../stories/helpers/AlertDialogComponent.svelte'

  install(twconfig)
</script>

<div class="p-4 space-y-4">
  <h1 class="text-xl">Popui</h1>
  <p>Library of shared, re-usable UI components for Invopop projects</p>

  <AlertDialogComponent
    description="Restoring V3 as draft will discard your current changes, are you sure you want to continue?"
    withSlot
  />
</div>
