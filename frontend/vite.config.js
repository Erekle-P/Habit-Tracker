import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/assets/',
  plugins: [react(), tailwindcss()],
  
  build: {
    outDir: '../backend/static/assets',
  },

  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
})
