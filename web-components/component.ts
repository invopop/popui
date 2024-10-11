import { detach, insert, noop, SvelteComponent } from 'svelte/internal'
import install from '@twind/with-web-components'
import config from '../svelte/twind.config.js'
const withTwind = install(config)

export default class extends withTwind(HTMLElement) {
  component: SvelteComponent | undefined = undefined

  _element: SvelteComponent | undefined = undefined

  _shadowRoot: ShadowRoot

  _slots: Record<string, Element[]> = {}

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
      const childrenArray = Array.from(element.children)
      this._slots[slotName] = childrenArray
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

export const createSlots = (slots: Record<string, Element[]>) => {
  const svelteSlots: Record<string, unknown> = {}

  for (const slotName in slots) {
    svelteSlots[slotName] = [createSlotFn(slots[slotName])]
  }

  function createSlotFn(ele: Element[]) {
    return function () {
      return {
        c: noop,
        m: function mount(target: Node, anchor: Node) {
          ele.forEach((el: Element) => {
            insert(target, el, anchor)
          })
        },
        d: function destroy(detaching: boolean) {
          if (detaching) {
            ele.forEach((el: Element) => {
              detach(el)
            })
          }
        },
        l: noop
      }
    }
  }

  return svelteSlots
}
