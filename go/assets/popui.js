const QUERY_SELECTORS = {
  hamburgerButton: '.popui-admin-page-title__wrapper > button',
  sidebar: '.popui-admin-sidebar',
  page: '.popui-admin-page'
}
const ACTIVE_MENU_CLASS = 'menu--active'
const LOADING_CLASS = 'popui-button--loading'

document.addEventListener('DOMContentLoaded', () => {
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
