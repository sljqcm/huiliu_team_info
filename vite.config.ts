import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: './',
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'HuiliuTeamApp',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [
    react(),
    tsconfigPaths()
  ],
})
