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
  }

  disconnectedCallback(): void {
    // Destroy the Svelte component when this web component gets
    // disconnected. If this web component is expected to be moved
    // in the DOM, then you need to use `connectedCallback()` and
    // set it up again if necessary.
    this._element?.$destroy()
  }

  createProps(props) {
    if (this.childNodes.length) {
      props.$$slots = createSlots({ default: this.childNodes })
      props.$$scope = {}
    }

    return props
  }
}

export const createSlots = (slots) => {
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
