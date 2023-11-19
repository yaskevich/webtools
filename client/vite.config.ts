import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: Number(loadEnv('', process.cwd(), 'VITE_PORT')?.['VITE_PORT']) || 8080,
  },
});
