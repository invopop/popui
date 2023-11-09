import type { ButtonVariant } from '$lib/types.js'
import BaseButton from '../lib/BaseButton.svelte'
import WebComponent from './component.js'

export default class extends WebComponent {
  constructor() {
    super()

    this.disableNativeEvents = ['click']

    this.hasSlots = true
  }

  connectedCallback(): void {
    this._element = new BaseButton({
      // Tell it that it lives in the shadow root
      target: this._shadowRoot,
      // Pass any props
      props: this.createProps({
        // This is the place where you do any conversion between
        // the native string attributes and the types you expect
        // in your svelte components
        icon: this.getAttribute('icon') || undefined,
        iconPosition: this.getAttribute('iconPosition') || undefined,
        variant: getType(this.getAttribute('variant') || 'default'),
        disabled: this.getAttribute('disabled') === 'true' || false,
        small: this.getAttribute('small') === 'true' || false
      })
    })

    super.connectedCallback()
  }
}

function getType(type: string): ButtonVariant {
  const types: ButtonVariant[] = ['default', 'primary', 'secondary', 'danger', 'dark']

  if (types.includes(type as ButtonVariant)) return type as ButtonVariant

  return 'default'
}
