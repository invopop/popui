import TagSearch from '../lib/TagSearch.svelte'
import WebComponent from './component.js'

export default class extends WebComponent {
  connectedCallback(): void {
    this._element = new TagSearch({
      // Tell it that it lives in the shadow root
      target: this._shadowRoot,
      // Pass any props
      props: this.createProps({
        // This is the place where you do any conversion between
        // the native string attributes and the types you expect
        // in your svelte components
        label: this.getAttribute('label') || '',
        icon: this.getAttribute('icon') || undefined
      })
    })

    super.connectedCallback()
  }
}
