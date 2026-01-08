import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          vendor: ['react', 'react-dom'],
          // Split UI libraries
          ui: ['framer-motion', 'lucide-react'],
          // Split router
          router: ['react-router-dom'],
          // Split other large dependencies
          utils: ['lenis']
        }
      }
    },
    chunkSizeWarningLimit: 2000
  }
})
