import InputRadio from '../lib/InputRadio.svelte'
import WebComponent from './component.js'

export default class extends WebComponent {
  constructor() {
    super()

    this._element = new InputRadio({
      // Tell it that it lives in the shadow root
      target: this._shadowRoot,
      // Pass any props
      props: this.createProps({
        // This is the place where you do any conversion between
        // the native string attributes and the types you expect
        // in your svelte components
        checked: this.getAttribute('checked') === 'true' || false
      })
    })
  }
}
