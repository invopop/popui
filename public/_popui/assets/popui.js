const QUERY_SELECTORS = {
  hamburgerButton: '.popui-admin-page-title__wrapper > button',
  sidebar: '.popui-admin-sidebar',
  page: '.popui-admin-page'
}
const ACTIVE_MENU_CLASS = 'menu--active'

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
