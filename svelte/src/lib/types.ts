import type { Placement } from '@floating-ui/dom'
import type { IconSource } from '@steeze-ui/svelte-icon'
import type { Snippet } from 'svelte'

export type IconTheme = 'default' | 'solid' | 'mini'

export type IconPosition = 'right' | 'left'

export type ButtonVariant =
  | 'warning'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'dark'
  | 'outline'
  | 'ghost'
  | 'selected'
  | 'dark-ghost'

export type StatusType =
  | 'grey'
  | 'green'
  | 'yellow'
  | 'red'
  | 'orange'
  | 'blue'
  | 'purple'
  | 'olive'
  | 'teal'
  | 'crimson'
  | 'blueViolet'
  | 'steelBlue'
  | 'empty'

export type AnyProp = string | number | object | boolean

export type SidebarIcon = {
  path: string
  icon: IconSource
  title: string
  iconTheme: IconTheme
}

export type Status = 'success' | 'warning' | 'error' | 'info' | 'neutral'

export type SelectOption = {
  label: string
  value: AnyProp
}

export type DrawerGroup = {
  label: string
  slug: string
  emptyIcon?: IconSource
  emptyTitle?: string
  emptyDescription?: string
  hideCounter?: boolean
}

export type DrawerOption = SelectOption & {
  separator?: boolean
  destructive?: boolean
  selected?: boolean
  focused?: boolean
  icon?: IconSource | undefined
  rightIcon?: IconSource | undefined
  country?: string
  color?: StatusType
  picture?: string
  sandbox?: boolean
  iconClass?: string
  disabled?: boolean
  locked?: boolean
  groupBy?: string
  useAvatar?: boolean
  action?: Snippet<[DrawerOption]>
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

export type FeedItemStatus = 'success' | 'failure' | 'run' | 'queued' | 'alert' | 'skip' | 'signed'

export type FeedItemUser = {
  name: string
  picture?: string
}

export type Badge = {
  label: string
  status: StatusType
  dot?: boolean
}

export type TableDataRow = { [key: string]: unknown }

export type TableAction = DrawerOption & {
  slug?: string
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


export type DataListItem = {
  label: string
  value: string
}

export type DatesFromToday = {
  today: Date
  startOfThisWeek: Date
  endOfThisWeek: Date
  startOfLastWeek: Date
  endOfLastWeek: Date
  startOfThisMonth: Date
  endOfThisMonth: Date
  startOfLastMonth: Date
  endOfLastMonth: Date
  startOfThisQuarter: Date
  endOfThisQuarter: Date
  startOfLastQuarter: Date
  endOfLastQuarter: Date
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
    cancelActionEl?: HTMLButtonElement | null
    okActionEl?: HTMLButtonElement | null
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
    size?: 'sm' | 'md' | 'lg';
    dangerIcon?: boolean;
    shortcut?: boolean;
    fullwidth?: boolean;
    notification?: boolean;
    stackedLeft?: boolean;
    stackedRight?: boolean;
    children?: Snippet;
    [key: string]: any
    onclick?: (event: MouseEvent) => void;
  }

  export interface BaseCardProps {
    imageUrl?: string;
    imageAlt?: string;
    title?: string;
    description?: string;
    type?: 'default' | 'soon' | 'beta';
    footer?: Snippet;
    [key: string]: any;
    onclick?: (event: MouseEvent) => void;
  }

  export interface BaseCounterProps {
    value: number;
    theme?: 'light' | 'navigation' | 'accent';
  }

export interface CounterWidgetProps {
	label: string;
	current: number;
	total: number;
	resetDate?: string;
	icon?: IconSource;
	allowOverage?: boolean;
}

export interface ProgressBarProps {
	percentage?: number;
	current?: number;
	total?: number;
	allowOverage?: boolean;
  warningPercentage?: number;
}

export interface ProgressBarCircleProps {
	progress: number;
	size: number;
	variant?: 'default' | 'dark';
}

export interface TagProgressProps {
	progress: number;
	variant?: 'default' | 'dark';
}

export interface BaseDropdownProps {
    isOpen?: boolean;
    fullWidth?: boolean;
    placement?: Placement;
    matchParentWidth?: boolean;
    usePortal?: boolean;
    trigger?: Snippet;
    children?: Snippet;
    [key: string]: any
  }

  export interface BaseFlagProps {
    country?: string;
  }

  export interface BaseTableActionsProps {
    actions: TableAction[];
    onclick?: (value: AnyProp) => void;
  }

  export interface BaseTableHeaderOrderByProps {
    isActive?: boolean;
    sortDirection: TableSortBy;
    onOrderBy?: (direction: TableSortBy) => void;
    onHide?: () => void;
    onFilter?: () => void;
    onFreeze?: () => void;
    isFrozen?: boolean;
    showSortOptions?: boolean;
    showFilterOption?: boolean;
    showHideOption?: boolean;
  }

  export interface BreadcrumbProps {
    breadcrumb: Breadcrumb;
    isLast: boolean;
    oncopied?: (label: string) => void;
  }

  export interface BreadcrumbsProps {
    breadcrumbs?: Breadcrumb[];
    oncopied?: (label: string) => void;
  }

  export type ButtonFileType = 'pdf' | 'xml' | 'png' | 'generic';

  export interface ButtonFileProps {
    name?: string;
    disabled?: boolean;
    date?: string;
    fileType?: ButtonFileType;
    onPreview?: () => void;
    onDownload?: () => void;
    class?: string;
    [key: string]: any
  }

  export interface ButtonUuidCopyProps {
    uuid?: string;
    prefixLength?: number;
    suffixLength?: number;
    full?: boolean;
    disabled?: boolean;
    oncopied?: (label: string) => void;
  }

  export interface ButtonSearchProps {
    value?: string;
    expanded?: boolean;
    placeholder?: string;
    size?: 'sm' | 'md';
    loading?: boolean;
    autofocus?: boolean;
    oninput?: (value: string) => void;
    onExpand?: () => void;
    onCollapse?: () => void;
  }

  export interface CardCheckboxProps {
    id?: any;
    name?: string;
    title?: string;
    description?: string;
    accentText?: string;
    checked?: boolean;
    disabled?: boolean;
    icon?: IconSource | undefined;
    hideRadio?: boolean;
    footer?: Snippet;
    onchange?: (checked: boolean) => void;
  }

  export interface CardRelationProps {
    title?: string;
    icon?: IconSource | undefined;
    items?: DataListItem[];
    onclick?: (event: MouseEvent) => void;
  }

  export interface CompanySelectorProps {
    companies?: Company[];
    selectedCompany?: Company | null;
    collapsed?: boolean;
    onAdd?: () => void;
    onSelect?: (company: Company | null) => void;
  }

  export interface DataListItemProps {
    label?: string;
    value?: string;
    monospaced?: boolean;
    monospacedNums?: boolean;
    fullWidth?: boolean;
    children?: Snippet;
  }

  export interface DatePickerProps {
    label?: string;
    placement?: Placement;
    from?: string;
    to?: string;
    onSelect?: (date: {from: string, to: string}) => void;
    stackLeft?: boolean;
    stackRight?: boolean;
    icon?: IconSource | string;
    iconTheme?: IconTheme;
    isOpen?: boolean;
  }

  export interface DrawerContextProps {
    items?: DrawerOption[];
    multiple?: boolean;
    draggable?: boolean;
    widthClass?: string;
    collapsibleGroups?: boolean;
    onclick?: (value: AnyProp) => void;
    onselect?: (selected: DrawerOption[]) => void;
    onreorder?: (items: DrawerOption[]) => void;
    ondropitem?: (groups: Record<string, DrawerOption[]>) => void;
    children?: Snippet;
    groups?: DrawerGroup[];
  }

  export interface DrawerContextItemProps {
    multiple?: boolean;
    item: DrawerOption;
    scrollIfSelected?: boolean;
    onclick?: (value: AnyProp) => void;
    onchange?: (item: DrawerOption) => void;
    onfocus?: (item: DrawerOption) => void;
  }


  export interface DropdownSelectProps {
    value?: AnyProp;
    icon?: IconSource | string | undefined;
    iconTheme?: IconTheme;
    options?: DrawerOption[];
    placeholder?: string;
    multiple?: boolean;
    fullWidth?: boolean;
    widthClass?: string;
    onSelect?: (value: AnyProp) => void;
    onOpenChange?: (isOpen: boolean) => void;
    stackLeft?: boolean;
    stackRight?: boolean;
    multipleLabel?: string;
  }

  export interface EmptyStateProps {
    icon?: Snippet;
    iconSource?: IconSource;
    title?: string;
    description?: string;
    check?: boolean;
    children?: Snippet;
  }

  export interface FeedEventsProps {
    events?: FeedEvent[];
  }

  export interface FeedIconEventProps {
    icon?: IconSource | undefined;
    iconTheme?: IconTheme;
  }

  export interface FeddIconStatusProps {
    status: FeedItemStatus;
  }

  export interface FeedItemProps {
    status?: FeedItemStatus | undefined;
    icon?: IconSource | undefined;
    title?: string;
    date?: Date | undefined;
    hasNext?: boolean;
    slug?: string;
    viewable?: boolean;
    viewableText?: string;
    user?: FeedItemUser | undefined;
    type?: string;
    extraText?: string;
    onView?: (slug: string) => void;
  }

  export interface FeedItemDetailProps {
    status?: FeedItemStatus | undefined;
    title?: string;
    uuid?: string;
    events?: FeedEvent[];
    idLabel?: string;
    onCopied?: (uuid: string) => void;
    cancelable?: boolean;
    onCancel?: () => void;
  }

  export interface FeedViewerProps {
    items?: FeedItemProps[];
    onView?: (slug: string) => void;
  }

  export interface GlobalSearchProps {
    collapsed?: boolean;
    onOpen?: () => void;
  }

  export interface InputCheckboxProps {
    id?: string;
    checked?: boolean;
    indeterminate?: boolean;
    label?: string;
    onchange?: (checked: boolean) => void;
    onclick?: (event: MouseEvent) => void;
    [key: string]: any
  }

  export interface InputErrorProps {
    errorText?: string;
  }

  export interface InputLabelProps {
    id?: string;
    label?: string;
    [key: string]: any
  }

  export interface InputRadioProps {
    checked?: boolean;
    disabled?: boolean;
    id?: any;
    name?: string;
    label?: string;
    onchange?: (checked: boolean) => void;
    [key: string]: any
  }

  export interface InputSearchProps {
    value?: string;
    shortcut?: string;
    placeholder?: string;
    icon?: IconSource;
    focusOnLoad?: boolean;
    size?: 'xs' | 'sm' | 'md';
    loading?: boolean;
    oninput?: (value: string) => void;
    onclick?: (event: MouseEvent) => void;
    onfocus?: (event: FocusEvent) => void;
    onblur?: (event: FocusEvent) => void;
    [key: string]: any
  }

  export interface InputSelectProps {
    id?: any;
    name?: string;
    label?: string;
    disabled?: boolean;
    value?: string;
    icon?: IconSource | string | undefined;
    iconTheme?: IconTheme;
    options?: SelectOption[];
    placeholder?: string;
    disablePlaceholder?: boolean;
    errorText?: string;
    size?: 'xs' | 'sm' | 'md';
    onchange?: (value: string) => void;
    [key: string]: any
  }

  export interface InputTextProps {
    id?: any;
    label?: string;
    placeholder?: string;
    errorText?: string;
    disabled?: boolean;
    value?: string | number;
    focusOnLoad?: boolean;
    stackLeft?: boolean;
    stackRight?: boolean;
    widthClass?: string;
    size?: 'xs' | 'sm' | 'md';
    oninput?: (value: string) => void;
    onfocus?: (event: FocusEvent) => void;
    onblur?: (event: FocusEvent) => void;
    onkeydown?: (event: KeyboardEvent) => void;
    [key: string]: any
  }

  export interface InputTextareaProps {
    id?: any;
    label?: string;
    placeholder?: string;
    errorText?: string;
    disabled?: boolean;
    value?: string | number;
    rows?: number;
    oninput?: (value: string) => void;
    [key: string]: any
  }

  export interface InputToggleProps {
    id?: string;
    checked?: boolean;
    label?: string;
    onchange?: (checked: boolean) => void;
    [key: string]: any
  }

  export interface MenuItemProps {
    label?: string;
    url?: string;
    isFolderItem?: boolean;
    collapsable?: boolean;
    open?: boolean;
    active?: boolean;
    collapsedSidebar?: boolean;
    iconTheme?: IconTheme;
    icon?: IconSource | string | undefined;
    beta?: boolean;
    children?: MenuItemProps[] | undefined;
    onclick?: (url: string) => void;
  }

  export interface MenuItemCollapsibleProps {
    collapsed?: boolean;
    title?: string;
    subtitle?: string;
    active?: boolean;
    bold?: boolean;
    icon?: IconSource | undefined;
    children?: Snippet;
  }

  export interface NotificationProps {
    title?: string;
    description?: string;
    type?: Status;
    children?: Snippet;
    [key: string]: any
  }

  export interface ProfileAvatarProps {
    name?: string;
    variant?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    dark?: boolean;
    picture?: string;
    country?: string;
    icon?: IconSource;
  }

  export interface StatusLabelProps {
    status: FeedItemStatus;
    label?: string;
  }

  export interface StepIconListProps {
    icons?: StepIcon[]
    [key: string]: any
  }

  export interface StepIconProps {
    name?: string
    showMask?: boolean
    tooltipContent?: Snippet
    children: Snippet
  }

  export interface TagSearchProps {
    label?: string;
    icon?: IconSource | string | undefined;
    iconTheme?: IconTheme;
    onclear?: () => void;
  }

  export interface TagStatusProps {
    label?: string;
    status?: StatusType;
    dot?: boolean;
  }

  export interface TitleMainProps {
    title?: string;
    children?: Snippet;
  }

  export interface TitleSectionProps {
    title?: string;
    children?: Snippet;
  }

  export interface ShortcutWrapperProps {
    size?: 'sm' | 'md';
    theme?: 'light' | 'navigation';
    children?: Snippet;
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

  // Re-export DataTable types
  export type {
    DataTableColumn,
    DataTableProps,
    CellType,
    TextCellConfig,
    BooleanCellConfig,
    TagCellConfig,
    DateCellConfig,
    CurrencyCellConfig,
    CellConfig
  } from './data-table/data-table-types.js';