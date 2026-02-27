import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  preview: {
    port: 3001,        // ← ここで preview のポートを指定
    strictPort: true,
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    cssCodeSplit: true,
  },
})