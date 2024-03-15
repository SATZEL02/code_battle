import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode}) =>{
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')

  return{
    server:{
      proxy: {
        '/api': {
          target: env.VITE_API_IPADDRESS,
          secure:false,
        },
        '/compiler':{
          target: env.VITE_AWS_PUBLIC_IPADDRESS,
          secure:false,
        },
      },
    },
    plugins: [react()],
  }
})
