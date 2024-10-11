import DrawerContext from '../lib/DrawerContext.svelte'
import WebComponent from './component.js'

export default class extends WebComponent {
  constructor() {
    super()

    this.hasSlots = true
  }

  connectedCallback(): void {
    // Instantiate the Svelte Component
    this._element = new DrawerContext({
      // Tell it that it lives in the shadow root
      target: this._shadowRoot,
      // Pass any props
      props: this.createProps({
        // This is the place where you do any conversion between
        // the native string attributes and the types you expect
        // in your svelte components
        items: JSON.parse(this.getAttribute('items') || '[]'),
        multiple: this.getAttribute('multiple') === 'true' || false,
        searchable: this.getAttribute('searchable') === 'true' || false
      })
    })

    super.connectedCallback()
  }
}
