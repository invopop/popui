import { create, cssomSheet } from 'twind'
// import twConfig from '../../tailwind.config.js'

export function createTwind() {
  // TODO: Some custom classes are not applying
  // setup({
  //   theme: {
  //     extend: twConfig.theme?.extend
  //   }
  // })
  const sheet = cssomSheet({ target: new CSSStyleSheet() })

  const { tw } = create({ sheet })

  return { tw, sheet }
}
