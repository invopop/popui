export const dispatchWcEvent = (rootEl: HTMLElement, name: string, detail: any = null) => {
  rootEl.dispatchEvent(
    new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true // propagate across the shadow DOM
    })
  )
}
