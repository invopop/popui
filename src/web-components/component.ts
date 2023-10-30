import type { SvelteComponent } from 'svelte'
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

    // Add slots
    // TODO: Find a way to only replace the slot content if a slot is defined in the svelte component
    const parentElem = this._shadowRoot.firstChild

    if (!parentElem) return

    this.childNodes.forEach((slot) => {
      parentElem.appendChild(slot)
    })
  }

  disconnectedCallback(): void {
    // Destroy the Svelte component when this web component gets
    // disconnected. If this web component is expected to be moved
    // in the DOM, then you need to use `connectedCallback()` and
    // set it up again if necessary.
    this._element?.$destroy()
  }
}
