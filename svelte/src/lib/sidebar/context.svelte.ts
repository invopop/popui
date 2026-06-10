import { getContext, setContext } from 'svelte'
import {
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_MAX_WIDTH_PX,
  SIDEBAR_MIN_WIDTH_PX,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_STORAGE_KEY
} from './constants.js'
import { IsMobile } from './is-mobile.svelte.js'

type Getter<T> = () => T

export type SidebarStateProps = {
  open: Getter<boolean>
  setOpen: (open: boolean) => void
}

class SidebarState {
  readonly props: SidebarStateProps
  open = $derived.by(() => this.props.open())
  openMobile = $state(false)
  width = $state<string>(SIDEBAR_WIDTH)
  isResizing = $state(false)
  setOpen: SidebarStateProps['setOpen']
  #isMobile: IsMobile
  state = $derived.by(() => (this.open ? 'expanded' : 'collapsed'))

  constructor(props: SidebarStateProps) {
    this.setOpen = props.setOpen
    this.#isMobile = new IsMobile()
    this.props = props
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY)
      if (stored) this.width = stored
    }
  }

  get isMobile() {
    return this.#isMobile.current
  }

  setWidth = (px: number) => {
    const clamped = Math.max(SIDEBAR_MIN_WIDTH_PX, Math.min(SIDEBAR_MAX_WIDTH_PX, px))
    this.width = `${clamped}px`
  }

  persistWidth = () => {
    if (typeof localStorage === 'undefined') return
    try {
      localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, this.width)
    } catch {
      // ignore quota / private-mode errors
    }
  }

  resetWidth = () => {
    this.width = SIDEBAR_WIDTH
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem(SIDEBAR_WIDTH_STORAGE_KEY)
      } catch {
        // ignore private-mode errors
      }
    }
  }

  handleShortcutKeydown = (e: KeyboardEvent) => {
    if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      this.toggle()
    }
  }

  setOpenMobile = (value: boolean) => {
    this.openMobile = value
  }

  toggle = () => {
    return this.#isMobile.current
      ? (this.openMobile = !this.openMobile)
      : this.setOpen(!this.open)
  }
}

const SYMBOL_KEY = 'scn-sidebar'

export function setSidebar(props: SidebarStateProps): SidebarState {
  return setContext(Symbol.for(SYMBOL_KEY), new SidebarState(props))
}

export function useSidebar(): SidebarState {
  return getContext(Symbol.for(SYMBOL_KEY))
}
