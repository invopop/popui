import InputText from '../lib/InputText.svelte'
import WebComponent from './component.js'

export default class extends WebComponent {
  constructor() {
    super()

    this.disableNativeEvents = ['input']
  }

  connectedCallback(): void {
    // Instantiate the Svelte Component
    this._element = new InputText({
      // Tell it that it lives in the shadow root
      target: this._shadowRoot,
      // Pass any props
      props: this.createProps({
        // This is the place where you do any conversion between
        // the native string attributes and the types you expect
        // in your svelte components
        id: this.getAttribute('id') || '',
        label: this.getAttribute('label') || '',
        placeholder: this.getAttribute('placeholder') || '',
        errorText: this.getAttribute('errorText') || '',
        disabled: this.getAttribute('disabled') === 'true' || false
      })
    })

    super.connectedCallback()
  }
}
