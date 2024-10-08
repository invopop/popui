/* eslint-disable @typescript-eslint/no-var-requires */
import twTheme from './src/svelte/lib/tw.theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    /* tslint:disable no-var-requires */
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ],
  theme: {
    extend: { ...twTheme.extend }
  }
}
