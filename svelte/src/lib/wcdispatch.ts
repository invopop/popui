export const dispatchWcEvent = (
  rootEl: EventTarget | null,
  name: string,
  detail: unknown = null
) => {
  if (!rootEl) return

  rootEl.dispatchEvent(
    new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true // propagate across the shadow DOM
    })
  )
}
