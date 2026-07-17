import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: './',
  // GitHub Pages 部署需要相对路径，base 设为 './' 即可
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
