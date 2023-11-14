<script lang="ts">
  import ProfileAvatar from './ProfileAvatar.svelte'

  export let name = ''
</script>

<button
  class="text-white text-sm font-medium flex items-center justify-between space-x-1 border border-white-10 hover:border-white-20 focus:bg-white-5 px-2 py-1.5 rounded w-full"
>
  <span class="flex items-center space-x-1">
    <ProfileAvatar {name} dark />
    <span>{name}</span>
  </span>
</button>
