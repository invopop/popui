import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: 'web-components/web-components.ts',
      formats: ['iife'],
      name: 'app',
      fileName: () => 'index.js'
    }
  }
})
