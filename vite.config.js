import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   build: {
    outDir: 'dist',
  },
  // Si tienes problemas con las rutas, agrega:
  base: './',
})
