import InputSelect from '../lib/InputSelect.svelte'
import WebComponent from './component.js'

export default class extends WebComponent {
  constructor() {
    super()

    this._element = new InputSelect({
      // Tell it that it lives in the shadow root
      target: this._shadowRoot,
      // Pass any props
      props: this.createProps({
        // This is the place where you do any conversion between
        // the native string attributes and the types you expect
        // in your svelte components
        id: this.getAttribute('id') || '',
        name: this.getAttribute('name') || '',
        label: this.getAttribute('label') || '',
        placeholder: this.getAttribute('placeholder') || '',
        value: this.getAttribute('value') || '',
        icon: this.getAttribute('icon') || undefined,
        disabled: this.getAttribute('disabled') === 'true' || false,
        disablePlaceholder: this.getAttribute('disablePlaceholder') === 'true' || false,
        options: JSON.parse(this.getAttribute('options') || '[]')
      })
    })
  }

  connectedCallback(): void {
    super.connectedCallback()

    const sheet = new CSSStyleSheet()
    sheet.replaceSync(`select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iI0YzRjVGNSIvPgo8cGF0aCBkPSJNNi41IDguMjUwMDRMMTAgMTEuNzVMMTMuNSA4LjI1IiBzdHJva2U9IiMwQTBBMEEiIHN0cm9rZS13aWR0aD0iMS4yIi8+Cjwvc3ZnPgo=');
      background-repeat: no-repeat;
      background-position: center right 12px;
    }`)
    this._shadowRoot.adoptedStyleSheets = [...this._shadowRoot.adoptedStyleSheets, sheet]
  }
}
