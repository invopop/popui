/**
 * Dispatch event on click outside of node
 * @param {HTMLElement} node
 */
export function clickOutside(node) {
  /**
   * @param {MouseEvent} event
   */
  const handleClick = (event) => {
    if (node && !node.contains(/** @type {Node} */ (event.target)) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside'))
    }
  }

  document.addEventListener('click', handleClick, true)
  document.addEventListener('contextmenu', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('contextmenu', handleClick, true)
    }
  }
}
