// eslint-disable-next-line no-unused-vars
import { defineConfig,loadEnv} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// eslint-disable-next-line no-unused-vars
export default defineConfig(({ mode })=>{
  
  // eslint-disable-next-line no-undef
  // const env = loadEnv(mode, process.cwd(), '');
  return ({
    // server:{
    //   proxy: {
    //     '/api': {
    //       target: env.API_IPADDRESS,
    //       changeOrigin:true,
    //       secure:false,
    //     },
    //     '/compiler':{
    //       target: env.AWS_PUBLIC_IPADDRESS,
    //       changeOrigin:true,
    //       secure:false,
    //     },
    //   },
    // },
    plugins: [react()]
  });
});