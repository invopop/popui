const QUERY_SELECTORS = {
  hamburgerButton: '.popui-admin-page-title__wrapper > button',
  sidebar: '.popui-admin-sidebar',
  page: '.popui-admin-page',
  buttonCopy: '.popui-button-copy',
  buttonCopyValue: '[data-copy-value]',
  buttonCopyText: '.popui-button-copy__text',
  buttonCopyPopover: '.popui-button-copy__popover'
}
const ACTIVE_MENU_CLASS = 'menu--active'
const LOADING_CLASS = 'popui-button--loading'
const POPOVER_VISIBLE_CLASS = 'popui-button-copy__popover--visible'

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar
  const button = document.querySelector(QUERY_SELECTORS.hamburgerButton)
  const sidebar = document.querySelector(QUERY_SELECTORS.sidebar)
  const page = document.querySelector(QUERY_SELECTORS.page)

  const showSidebar = (e) => {
    e.stopPropagation()
    sidebar.classList.add(ACTIVE_MENU_CLASS)
    page.classList.add(ACTIVE_MENU_CLASS)
  }

  const hideSidebar = () => {
    sidebar.classList.remove(ACTIVE_MENU_CLASS)
    page.classList.remove(ACTIVE_MENU_CLASS)
  }

  if (button) {
    button.addEventListener('click', showSidebar)
  }

  if (page) {
    page.addEventListener('click', hideSidebar)
  }

  // ButtonCopy
  const containers = document.querySelectorAll(QUERY_SELECTORS.buttonCopy)

  containers.forEach((container) => {
    const input = container.querySelector(QUERY_SELECTORS.buttonCopyValue)
    if (!input) return

    updateButtonCopyText(input)

    input.addEventListener('input', () => {
      updateButtonCopyText(input)
    })
  })
})

// eslint-disable-next-line
function showButtonSpinner(button) {
  const form = button.form || button.closest('form')
  if (form && form.checkValidity()) {
    button.classList.add(LOADING_CLASS)
  }
}

// Remove any loading class from buttons after browser buttons navigation
window.addEventListener('visibilitychange', function () {
  if (document.visibilityState !== 'visible') return
  const loadingButtons = document.querySelectorAll(`.${LOADING_CLASS}`)
  loadingButtons.forEach((button) => {
    button.classList.remove(LOADING_CLASS)
  })
})

// eslint-disable-next-line
function copyButtonValue(button) {
  const container = button.closest(QUERY_SELECTORS.buttonCopy)
  if (!container) return

  const input = container.querySelector(QUERY_SELECTORS.buttonCopyValue)
  if (!input) return

  const value = input.value || input.getAttribute('value') || ''
  if (!value) return

  navigator.clipboard
    .writeText(value)
    .then(() => {
      // Show popover if it exists
      const popover = container.querySelector(QUERY_SELECTORS.buttonCopyPopover)
      if (popover) {
        popover.classList.add(POPOVER_VISIBLE_CLASS)
        setTimeout(() => {
          popover.classList.remove(POPOVER_VISIBLE_CLASS)
        }, 2000)
      }
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err)
    })
}

function updateButtonCopyText(input) {
  const container = input.closest(QUERY_SELECTORS.buttonCopy)
  if (!container) return

  const textButton = container.querySelector(QUERY_SELECTORS.buttonCopyText)
  if (!textButton) return

  const value = input.value || input.getAttribute('value') || ''
  const prefixLength = parseInt(input.dataset.prefixLength) || 0
  const suffixLength = parseInt(input.dataset.suffixLength) || 0

  textButton.textContent = formatButtonCopyText(value, prefixLength, suffixLength)
}

function formatButtonCopyText(text, prefixLength, suffixLength) {
  if (!text) return ''

  if (!prefixLength && !suffixLength) return text

  if (text.length <= prefixLength + suffixLength) return text

  let result = ''

  if (prefixLength > 0) {
    result += text.substring(0, prefixLength)
  }

  result += '...'

  if (suffixLength > 0) {
    result += text.substring(text.length - suffixLength)
  }

  return result
}
