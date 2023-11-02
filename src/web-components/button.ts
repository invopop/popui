import type { ButtonType } from '$lib/types.js'
import BaseButton from '../lib/BaseButton.svelte'
import WebComponent from './component.js'

export default class extends WebComponent {
  constructor() {
    super()

    this.hasSlots = true

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
        type: getType(this.getAttribute('type') || 'default'),
        disabled: this.getAttribute('disabled') === 'true' || false,
        small: this.getAttribute('small') === 'true' || false
      })
    })
  }
}

function getType(type: string): ButtonType {
  const types: ButtonType[] = ['default', 'primary', 'secondary', 'danger', 'dark']

  if (types.includes(type as ButtonType)) return type as ButtonType

  return 'default'
}
