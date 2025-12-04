<script lang="ts">
  import { Toaster } from '$lib'
  import '../app.css'

  let { children } = $props()
</script>

<Toaster />

{@render children()}
