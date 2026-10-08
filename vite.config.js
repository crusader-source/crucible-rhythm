
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/crucible-rhythm/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        background: resolve(import.meta.dirname, 'background.html'),
        entangled: resolve(import.meta.dirname, 'entangled.html')
      }
    }
  }
})
