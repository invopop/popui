import TitleMain from './lib/TitleMain.svelte'
import type { SvelteComponent } from 'svelte'

customElements.define(
  'pop-title-main',
  class extends HTMLElement {
    _element: SvelteComponent

    constructor() {
      super()

      // Create the shadow root.
      const shadowRoot = this.attachShadow({ mode: 'open' })

      // Instantiate the Svelte Component
      this._element = new TitleMain({
        // Tell it that it lives in the shadow root
        target: shadowRoot,
        // Pass any props
        props: {
          // This is the place where you do any conversion between
          // the native string attributes and the types you expect
          // in your svelte components
          title: this.getAttribute('title') || ''
        }
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
