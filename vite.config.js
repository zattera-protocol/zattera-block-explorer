import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  const config = {
    plugins: [react()],
    build: {
      outDir: 'build',
    },
  }

  // Development mode: use proxy
  if (mode === 'development') {
    config.server = {
      proxy: {
        '/rpc': {
          target: env.VITE_ZATTERA_RPC_URL || 'http://localhost:8090',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/rpc/, ''),
        },
      },
    }
  }

  return config
})
