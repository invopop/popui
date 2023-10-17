import type { IconSource } from '@steeze-ui/svelte-icon'

export type IconTheme = 'default' | 'solid' | 'mini'

export type IconPosition = 'right' | 'left'

export type ButtonType = 'default' | 'primary' | 'secondary' | 'danger'

export type SidebarIcon = {
  path: string
  icon: IconSource
  title: string
  iconTheme: IconTheme
}

export type Status = 'success' | 'warning' | 'error'

export type SelectOption = {
  label: string
  value: string | number | object | boolean
}
