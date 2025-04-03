import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { manifest } from './manifest';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest: defineManifest(manifest) }),
  ],
  // Use the crxjs plugin for handling the manifest
  build: {
    sourcemap: false,
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    hmr: {
      port: 5173,
    },
  },
});
