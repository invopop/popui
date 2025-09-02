import type { Placement } from '@floating-ui/dom'
import type { IconSource } from '@steeze-ui/svelte-icon'
import type { Snippet } from 'svelte'

export type IconTheme = 'default' | 'solid' | 'mini'

export type IconPosition = 'right' | 'left'

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'dark'
  | 'outline'

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
  separator?: boolean
  destructive?: boolean
  selected?: boolean
  icon?: IconSource | undefined
  rightIcon?: IconSource | undefined
  country?: string
  color?: StatusType
  picture?: string
  sandbox?: boolean
  iconClass?: string
  disabled?: boolean
}

export type Company = {
  id: string
  slug: string
  name: string
  country?: string
  logo_url?: string
  sandbox?: boolean
}

export type FeedEvent = {
  status: {
    label: string
    type: StatusType
  }
  date: Date
  code?: string
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

export type FeedItemStatus = 'success' | 'failure' | 'run' | 'queued' | 'alert' | 'skip' | 'signed'

export type FeedItemUser = {
  name: string
  picture?: string
}

export type FeedItemProps = {
  status?: FeedItemStatus
  icon?: IconSource
  title?: string
  date?: Date
  hasNext?: boolean
  slug?: string
  viewable?: boolean
  viewableText?: string
  type?: string
  user?: FeedItemUser
  extraText?: string
}

export type Badge = {
  label: string
  status: StatusType
  dot?: boolean
}

export type TableDataRow = { [key: string]: unknown }

export type TableAction = {
  icon?: IconSource
  label?: string
  slug?: string
  separator?: boolean
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

export type TableIcon = string | IconSource

export type TableField = {
  headerLabel: string
  slug: string
  sortable?: boolean
  grayed?: boolean
  formatter?: (data: TableDataRow) => string | number
  helperBadge?: (data: TableDataRow) => Badge | null
  helperStatus?: (data: TableDataRow) => FeedItemStatus | null
  helperIcons?: (data: TableDataRow) => TableIcon[]
  monospaced?: boolean
  nowrap?: boolean
  monospacedNums?: boolean
  rightAlign?: boolean
  isCountry?: boolean
  copy?: boolean
  style?: string
  status?: boolean
  noPadding?: boolean
}

export type TabItem = {
  label: string
  slug: string
  counter?: number
  check?: boolean
  warning?: boolean
}

export type EmptyStateIcon = 'invoices' | 'contacts' | 'products' | 'pdf' | 'file' | 'no-results'

export type DataListItem = {
  label: string
  value: string
}

export type Breadcrumb = {
  label: string
  url?: string
  country?: string
  copiable?: boolean
}

export type StepIcon = {
  name: string
  url: string
}

// Component props
export interface AlertDialogProps {
    open?: boolean
    destructive?: boolean
    title?: string
    descriptionText?: string
    cancelText?: string
    actionText?: string
    cancelActionEl?: HTMLButtonElement
    okActionEl?: HTMLButtonElement
    oncancel?: () => void
    onconfirm?: () => void
    description?: Snippet
    children?: Snippet
  }
  export interface BaseButtonProps {
    icon?: IconSource;
    iconTheme?: IconTheme;
    iconPosition?: IconPosition;
    type?: 'button' | 'submit' | 'reset' | null;
    variant?: ButtonVariant;
    disabled?: boolean;
    small?: boolean;
    big?: boolean;
    dangerIcon?: boolean;
    shortcut?: boolean;
    fullwidth?: boolean;
    notification?: boolean;
    children?: import('svelte').Snippet;
    [key: string]: any
    onclick?: (event: MouseEvent) => void;
  }

  export interface BaseCardProps {
    imageUrl?: string;
    imageAlt?: string;
    title?: string;
    description?: string;
    type?: 'default' | 'soon' | 'beta';
    enabled?: boolean;
    footer?: Snippet;
    [key: string]: any;
    onclick?: (event: MouseEvent) => void;
  }

  export interface BaseCounterProps {
    content: number;
    variant?: 'default' | 'light' | 'dark';
  }

  export interface BaseDropdownProps {
    isOpen?: boolean;
    fullWidth?: boolean;
    placement?: Placement;
    matchParentWidth?: boolean;
    trigger?: Snippet;
    children?: Snippet;
    [key: string]: any
  }

  export interface BaseFlagProps {
    country?: string;
    width?: number;
  }

  export interface BaseTableProps {
    sortBy?: string;
    sortDirection?: TableSortBy;
    fields?: TableField[];
    data?: TableDataRow[];
    getActions?: TableActionProp;
    groupLabel?: TableGroupLabelProp;
    disableRowClick?: boolean;
    hideCounter?: boolean;
    selectable?: boolean;
    selectedRows?: TableDataRow[];
    selectedTrackedBy?: string;
    hideSelectAll?: boolean;
    disableKeyboardNavigation?: boolean;
    [key: string]: any
    ontableEndReached?: () => void;
    onSelectAllRows?: (selected: boolean) => void;
    onRowClick?: (row: TableDataRow) => void;
    onRowRightClick?: (row: TableDataRow) => void;
    onRowNewTabClick?: (row: TableDataRow) => void;
    onCopied?: (uuid: string) => void;
    onOrderBy?: (field: string, direction: TableSortBy) => void;
    onClickAction?: (args: {row: TableDataRow, action: AnyProp}) => void;
  }

  export interface BaseTableActionsProps {
    actions: TableAction[];
    onclick?: (value: AnyProp) => void;
  }

  export interface BaseTableCellContentProps {
    field: TableField;
    data?: unknown;
    isMobile?: boolean;
    badge?: Badge | null;
    status?: FeedItemStatus | null;
    icons?: TableIcon[] | null;
    onCopied?: (uuid: string) => void;
  }

  export interface BaseTableCheckboxProps {
    checkboxButton?: HTMLButtonElement | undefined;
    checked?: boolean;
    hidden?: boolean;
    indeterminate?: boolean;
    onChecked?: (checked: boolean) => void;
  }

  export interface BaseTableHeaderProps {
    field: TableField;
    sortBy?: string;
    sortDirection: TableSortBy;
    onOrderBy?: (field: string, direction: TableSortBy) => void;
  }

  export interface BaseTableHeaderOrderByProps {
    isActive?: boolean;
    sortDirection: TableSortBy;
    onOrderBy?: (direction: TableSortBy) => void;
  }

  export interface BaseTableRowProps {
    row: TableDataRow;
    getActions?: TableActionProp;
    fields?: TableField[];
    disableRowClick?: boolean;
    selectable?: boolean;
    selected?: boolean;
    selectionMode?: string;
    selectedTrackedBy?: string;
    selectedRows?: TableDataRow[];
    onclick?: (event: MouseEvent) => void;
    onmouseover?: () => void;
    oncontextmenu?: () => void;
    onfocus?: () => void;
    onChecked?: (checked: boolean) => void;
    onCopied?: (uuid: string) => void;
    onClickAction?: (args: {row: TableDataRow, action: AnyProp}) => void;
  }

  export interface DrawerContextProps {
    items?: DrawerOption[];
    multiple?: boolean;
    searchable?: boolean;
    widthClass?: string;
    onclick?: (value: AnyProp) => void;
    onselect?: (selected: DrawerOption[]) => void;
  }

  export interface DrawerContextItemProps {
    multiple?: boolean;
    item: DrawerOption;
    scrollIfSelected?: boolean;
    workspace?: boolean;
    onclick?: (value: AnyProp) => void;
    onchange?: (item: DrawerOption) => void;
  }

  export interface InputCheckboxProps {
    checked?: boolean;
    indeterminate?: boolean;
    onchange?: (checked: boolean) => void;
    onclick?: (event: MouseEvent) => void;
    [key: string]: any
  }

  export interface UuidCopyProps {
    uuid?: string;
    small?: boolean;
    dark?: boolean;
    rightAlign?: boolean;
    prefixLength?: number;
    suffixLength?: number;
    full?: boolean;
    compact?: boolean;
    link?: boolean;
    onCopied?: (uuid: string) => void;
    onLinkClick?: (uuid: string) => void;
  }