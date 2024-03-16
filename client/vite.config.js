import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server:{
      proxy: {
        '/api': {
          target: "https://codebattle-production-3bad.up.railway.app",
          secure:false,
        },
        '/compiler':{
          target: "http://13.201.133.203:8080",
          changeOrigin:true,
          secure:false,
        },
      },
    },
    plugins: [react()],
    }
)
