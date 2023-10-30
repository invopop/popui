import TitleMain from './lib/TitleMain.svelte'
import type { SvelteComponent } from 'svelte'
import install from '@twind/with-web-components'
import config from './twind.config.js'
const withTwind = install(config)

customElements.define(
  'pop-title-main',
  class extends withTwind(HTMLElement) {
    _element: SvelteComponent

    _shadowRoot: ShadowRoot

    constructor() {
      super()

      // Create the shadow root.
      this._shadowRoot = this.attachShadow({ mode: 'open' })

      // Instantiate the Svelte Component
      this._element = new TitleMain({
        // Tell it that it lives in the shadow root
        target: this._shadowRoot,
        // Pass any props
        props: {
          // This is the place where you do any conversion between
          // the native string attributes and the types you expect
          // in your svelte components
          title: this.getAttribute('title') || ''
        }
      })
    }

    connectedCallback(): void {
      super.connectedCallback()

      // Shadow root has a few limitations embeding custom fonts
      // Here we are adding a global import to the parent document
      const FONT_URL =
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'

      const fontAlreadyAdded = !!document.querySelectorAll(`link[href='${FONT_URL}']`).length

      if (!fontAlreadyAdded) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = FONT_URL
        document.getElementsByTagName('head')[0].appendChild(link)
      }

      // Add slots
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
)
