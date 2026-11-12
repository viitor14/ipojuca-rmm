import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Se não houver backend local na porta 4000, conecta diretamente ao backend da VPS
const BACKEND_TARGET = process.env.VITE_BACKEND_URL || 'http://31.97.86.253:4005';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: BACKEND_TARGET,
        changeOrigin: true,
      },
      '/socket.io': {
        target: BACKEND_TARGET,
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
