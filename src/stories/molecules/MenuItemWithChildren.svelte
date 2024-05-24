<script lang="ts">
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import MenuItem from '../../lib/MenuItem.svelte'
  import type { MenuItemProps } from '../../lib/types.ts'
  import ProfileAvatar from '$lib/ProfileAvatar.svelte'

  export let collapsable = false
  export let collapsedSidebar = false
  export let open = false
  export let active = false
  export let children: MenuItemProps[]
  export let icon: IconSource | undefined = undefined
  export let url = ''
</script>

<div class="h-full relative">
  <div class="h-[400px]">
    <div class="absolute inset-0 h-full z-10">
      <div class="flex flex-1 h-full">
        <nav class="w-30 flex flex-col">
          <div class="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <MenuItem
              label="Parent Item"
              {icon}
              {active}
              {collapsable}
              {collapsedSidebar}
              {open}
              {children}
              {url}
            />
          </div>
          <div>
            <ProfileAvatar name="Sam Lown" />
          </div>
        </nav>
        <div class="bg-white flex-1 h-full p-1">Content</div>
      </div>
    </div>
  </div>
</div>
