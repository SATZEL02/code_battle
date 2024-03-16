import { defineConfig,loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode })=>{
  
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');
  return ({
    server:{
      proxy: {
        '/api': {
          target: env.API_IPADDRESS,
          changeOrigin:true,
          secure:true,
        },
        '/compiler':{
          target: env.AWS_PUBLIC_IPADDRESS,
          changeOrigin:true,
          secure:false,
        },
      },
    },
    plugins: [react()]
  });
});