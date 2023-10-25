import type { IconSource } from '@steeze-ui/svelte-icon'

export type IconTheme = 'default' | 'solid' | 'mini'

export type IconPosition = 'right' | 'left'

export type ButtonType = 'default' | 'primary' | 'secondary' | 'danger' | 'dark'
export type StatusType = 'default' | 'success' | 'warning' | 'danger' | 'orange'

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

export type DrawerOption = SelectOption & {
  footer?: boolean
}

export type Company = {
  id: string
  slug: string
  name: string
}

export type FeedEvent = {
  status: {
    label: string
    type: StatusType
  }
  date: Date
  message?: string
}
