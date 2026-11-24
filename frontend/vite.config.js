import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Por segurança, o proxy local aponta para o backend local (:4000).
// Para testar contra outro servidor, defina VITE_BACKEND_URL explicitamente no ambiente.
const BACKEND_TARGET = process.env.VITE_BACKEND_URL || 'http://localhost:4000';

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
