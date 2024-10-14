import BaseButton from './button.js'
import ButtonFile from './button-file.js'
import InputCheckbox from './checkbox.js'
import DrawerContext from './drawer-context.js'
import BaseDropdown from './dropdown.js'
import FormLayoutModal from './form-modal.js'
import InputText from './input-text.js'
import InputSearch from './input-search.js'
import InputToggle from './toggle.js'
import DataListItem from './list-item.js'
import InputRadio from './radio.js'
import InputSelect from './select.js'
import SectionLayout from './section.js'
import TagSearch from './tag-search.js'
import TagStatus from './tag-status.js'
import TitleMain from './title-main.js'
import TitleSection from './title-section.js'

const NAMESPACE = 'popui'

customElements.define(`${NAMESPACE}-button`, BaseButton)
customElements.define(`${NAMESPACE}-button-file`, ButtonFile)
customElements.define(`${NAMESPACE}-checkbox`, InputCheckbox)
customElements.define(`${NAMESPACE}-drawer-context`, DrawerContext)
customElements.define(`${NAMESPACE}-dropdown`, BaseDropdown)
customElements.define(`${NAMESPACE}-form-layout-modal`, FormLayoutModal)
customElements.define(`${NAMESPACE}-input-text`, InputText)
customElements.define(`${NAMESPACE}-input-search`, InputSearch)
customElements.define(`${NAMESPACE}-toggle`, InputToggle)
customElements.define(`${NAMESPACE}-list-item`, DataListItem)
customElements.define(`${NAMESPACE}-radio`, InputRadio)
customElements.define(`${NAMESPACE}-select`, InputSelect)
customElements.define(`${NAMESPACE}-section`, SectionLayout)
customElements.define(`${NAMESPACE}-tag-search`, TagSearch)
customElements.define(`${NAMESPACE}-tag-status`, TagStatus)
customElements.define(`${NAMESPACE}-title-main`, TitleMain)
customElements.define(`${NAMESPACE}-title-section`, TitleSection)
