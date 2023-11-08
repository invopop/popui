import BaseButton from './web-components/button.js'
import ButtonFile from './web-components/button-file.js'
import InputCheckbox from './web-components/checkbox.js'
import DrawerContext from './web-components/drawer-context.js'
import BaseDropdown from './web-components/dropdown.js'
import FormLayoutModal from './web-components/form-modal.js'
import InputText from './web-components/input-text.js'
import InputSearch from './web-components/input-search.js'
import InputToggle from './web-components/toggle.js'
import DataListItem from './web-components/list-item.js'
import InputRadio from './web-components/radio.js'
import InputSelect from './web-components/select.js'
import SectionLayout from './web-components/section.js'
import TagSearch from './web-components/tag-search.js'
import TagStatus from './web-components/tag-status.js'
import TitleMain from './web-components/title-main.js'
import TitleSection from './web-components/title-section.js'

const NAMESPACE = 'ui'

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
