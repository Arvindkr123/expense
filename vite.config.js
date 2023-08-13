import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  globals: true,
  environment: 'jsdom',
  setupFiles: './tests/setup.js',
=======
  base: "/expense/"
>>>>>>> e88594ff9437630a8f2ad597b67d80d1e1cb6de9
})
