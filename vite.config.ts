import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue(), mkcert()],
  server: {
    https: true,
  },
});