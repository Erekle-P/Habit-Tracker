import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/assets/',
  plugins: [react(), tailwindcss()],
  
  build: {
    // Build output now goes to the backend static assets folder.
    outDir: '../backend/static/assets',
  },

  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
})
