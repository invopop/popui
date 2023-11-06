import {
  destroy_component,
  detach,
  insert,
  is_function,
  mount_component,
  noop,
  SvelteComponent
} from 'svelte/internal'
import install from '@twind/with-web-components'
import config from '../twind.config.js'
const withTwind = install(config)

export default class extends withTwind(HTMLElement) {
  component: SvelteComponent | undefined = undefined

  _element: SvelteComponent | undefined = undefined

  _shadowRoot: ShadowRoot

  _slots: Record<string, Element[] | HTMLCollection> = {}

  hasSlots = false

  disableNativeEvents: string[] = []

  constructor() {
    super()

    // Create the shadow root.
    this._shadowRoot = this.attachShadow({ mode: 'open' })
  }

  connectedCallback(): void {
    super.connectedCallback()

    // Shadow root has a few limitations embeding custom fonts
    // Here we are adding a global import to the parent document
    const FONT_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'

    const fontAlreadyAdded = !!document.querySelectorAll(`link[href='${FONT_URL}']`).length

    if (!fontAlreadyAdded) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = FONT_URL
      document.getElementsByTagName('head')[0].appendChild(link)
    }

    // Disable native events to avoid duplication
    // TODO: disabled buttons are still emiting click events
    for (const eventName of this.disableNativeEvents) {
      this._shadowRoot.removeEventListener(eventName, () => {})
      this._shadowRoot.addEventListener(eventName, function (event) {
        if (!(event instanceof CustomEvent)) {
          event.preventDefault()
          event.stopImmediatePropagation()
        }
      })
    }
  }

  disconnectedCallback(): void {
    // Destroy the Svelte component when this web component gets
    // disconnected. If this web component is expected to be moved
    // in the DOM, then you need to use `connectedCallback()` and
    // set it up again if necessary.
    this._element?.$destroy()
  }

  createProps(props: Record<string, any> = {}) {
    if (!this.hasSlots) return props

    // Find slots different to default
    Array.from(this.children).forEach((c) => {
      const slotAttribute = Array.from(c.attributes).find((a) => a.name === 'slot')

      if (!slotAttribute) return

      const slotName = slotAttribute.nodeValue

      if (!slotName) return

      this.addChildrenToSlot(c, slotName)

      // remove from the default slot
      this.removeChild(c)
    })

    // add the rest to the default slot
    this.addChildrenToSlot(this, 'default')

    props.$$slots = createSlots(this._slots)
    props.$$scope = {}

    return props
  }

  addChildrenToSlot(element: Element, slotName: string) {
    if (element.children.length) {
      if (element.children.length > 1) {
        const childrenArray = Array.from(element.children)
        const spanElement = document.createElement('span')
        for (const child of childrenArray) {
          spanElement.appendChild(child).cloneNode(true)
        }
        this._slots[slotName] = [spanElement]
      } else {
        this._slots[slotName] = [...element.children]
      }
      while (element.firstChild) {
        element.removeChild(element.firstChild)
      }
    } else if (element.textContent) {
      const spanElement = document.createElement('span')
      spanElement.textContent = element.textContent
      this._slots[slotName] = [spanElement]
      element.innerHTML = ''
    }
  }
}

export const createSlots = (slots: Record<string, Element[] | HTMLCollection>) => {
  const svelteSlots = {}

  for (const slotName in slots) {
    svelteSlots[slotName] = [createSlotFn(slots[slotName])]
  }

  function createSlotFn([ele, props = {}]) {
    if (is_function(ele) && ele.prototype instanceof SvelteComponent) {
      let component
      return function () {
        return {
          c: noop,
          m(target, anchor) {
            component = new ele({ target, props })
            mount_component(component, target, anchor, null)
          },
          d(detaching) {
            destroy_component(component, detaching)
          },
          l: noop
        }
      }
    } else {
      return function () {
        return {
          c: noop,
          m: function mount(target, anchor) {
            insert(target, ele, anchor)
          },
          d: function destroy(detaching) {
            if (detaching) {
              detach(ele)
            }
          },
          l: noop
        }
      }
    }
  }
  return svelteSlots
}
