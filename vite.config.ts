import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ViteAliases } from 'vite-aliases';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteAliases(),
    checker({
      typescript: true,
    }),
  ],
});
