import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  base: './',                 //  **critical** for file:// loads in production
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')   // allows "@/…" imports
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
