import type { IconSource } from '@steeze-ui/svelte-icon'

export type IconTheme = 'default' | 'solid' | 'mini'

export type IconPosition = 'right' | 'left'

export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'dark'

export type StatusType =
  | 'grey'
  | 'green'
  | 'yellow'
  | 'red'
  | 'orange'
  | 'blue'
  | 'purple'
  | 'empty'

export type AnyProp = string | number | object | boolean

export type SidebarIcon = {
  path: string
  icon: IconSource
  title: string
  iconTheme: IconTheme
}

export type Status = 'success' | 'warning' | 'error'

export type SelectOption = {
  label: string
  value: AnyProp
}

export type DrawerOption = SelectOption & {
  footer?: boolean
  destructive?: boolean
  selected?: boolean
  icon?: IconSource | undefined
  rightIcon?: IconSource | undefined
  country?: string
}

export type Company = {
  id: string
  slug: string
  name: string
  country?: string
}

export type FeedEvent = {
  status: {
    label: string
    type: StatusType
  }
  date: Date
  message?: string
}

export type MenuItemProps = {
  label?: string
  isFolderItem?: boolean
  collapsable?: boolean
  open?: boolean
  url?: string
  active?: boolean
  icon?: IconSource | string
  iconTheme?: IconTheme
  children?: MenuItemProps[]
  collapsedSidebar?: boolean
}

export type FeedItemStatus = 'success' | 'failure' | ''

export type FeedItemProps = {
  status?: FeedItemStatus
  icon?: IconSource
  title?: string
  date?: Date
  expandable?: boolean
  uuid?: string
  hasPrev?: boolean
  hasNext?: boolean
  isChild?: boolean
  children?: FeedItemProps[]
  events?: FeedEvent[]
  slug?: string
}

export type Badge = {
  label: string
  status: StatusType
  dot?: boolean
}

export type TableDataRow = { [key: string]: unknown }

export type TableAction = {
  icon?: IconSource
  label: string
  slug: string
  footer?: boolean
  destructive?: boolean
  value?: AnyProp
}

export type TableSortBy = '' | 'asc' | 'desc'

export type TableActionProp = undefined | ((data: TableDataRow) => TableAction[])

export type TableGroupLabelProp = undefined | ((data: TableDataRow) => string)

export type TableGroup = {
  label: string
  rows: TableDataRow[]
}

export type TableField = {
  headerLabel: string
  slug: string
  sortable?: boolean
  fullWidth?: boolean
  grayed?: boolean
  formatter?: undefined | ((data: TableDataRow) => string | number)
  helperBadge?: undefined | ((data: TableDataRow) => Badge | null)
  monospaced?: boolean
  rightAlign?: boolean
  isCountry?: boolean
  copy?: boolean
  width?: string
}

export type TabItem = {
  label: string
  counter?: number
}
