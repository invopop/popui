import BaseDropdown from '../svelte/lib/BaseDropdown.svelte'
import WebComponent from './component.js'

export default class extends WebComponent {
  constructor() {
    super()

    this.hasSlots = true
  }

  connectedCallback(): void {
    this._element = new BaseDropdown({
      // Tell it that it lives in the shadow root
      target: this._shadowRoot,
      // We need to call createProps even with empty props
      // in order to inject the slots
      props: this.createProps() as Record<string, never>
    })

    super.connectedCallback()
  }
}
