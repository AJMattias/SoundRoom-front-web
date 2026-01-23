import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables del archivo .env
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'dist'
    },
    define: {
      // Esto mapea process.env.API_URL al valor de tu .env o de Vercel
      'process.env.API_URL': JSON.stringify(env.API_URL)
    }
  }
});