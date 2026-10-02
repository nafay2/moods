import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using a relative base ('./') means the built site works correctly
// on GitHub Pages no matter what you name your repository —
// you don't need to edit this file when you deploy.
export default defineConfig({
  plugins: [react()],
  base: './',
  // inline fonts so the site is fully self-contained (works offline / as one file)
  build: { assetsInlineLimit: 100000000 },
})
