import ButtonFile from '../svelte/lib/ButtonFile.svelte'
import WebComponent from './component.js'

export default class extends WebComponent {
  constructor() {
    super()

    this.disableNativeEvents = ['click']
  }

  connectedCallback(): void {
    this._element = new ButtonFile({
      // Tell it that it lives in the shadow root
      target: this._shadowRoot,
      // Pass any props
      props: this.createProps({
        // This is the place where you do any conversion between
        // the native string attributes and the types you expect
        // in your svelte components
        type: this.getAttribute('type') || '',
        name: this.getAttribute('name') || '',
        disabled: this.getAttribute('disabled') === 'true' || false,
        fullwidth: this.getAttribute('fullwidth') === 'true' || false
      })
    })

    super.connectedCallback()
  }
}
