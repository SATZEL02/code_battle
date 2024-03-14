import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure:false,
      },
      '/compiler':{
        target: import.meta.env.VITE_AWS_PUBLIC_IPV4,
        secure:false,
      },
    },
  },
  plugins: [react()],
})
