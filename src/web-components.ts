import BaseButton from './web-components/button.js'
import ButtonFile from './web-components/button-file.js'
import InputCheckbox from './web-components/checkbox.js'
import BaseDropdown from './web-components/dropdown.js'
import DataListItem from './web-components/list-item.js'
import InputRadio from './web-components/radio.js'
import TagStatus from './web-components/tag-status.js'
import TitleMain from './web-components/title-main.js'
import TitleSection from './web-components/title-section.js'

customElements.define('pop-button', BaseButton)
customElements.define('pop-button-file', ButtonFile)
customElements.define('pop-checkbox', InputCheckbox)
customElements.define('pop-dropdown', BaseDropdown)
customElements.define('pop-list-item', DataListItem)
customElements.define('pop-radio', InputRadio)
customElements.define('pop-tag-status', TagStatus)
customElements.define('pop-title-main', TitleMain)
customElements.define('pop-title-section', TitleSection)
