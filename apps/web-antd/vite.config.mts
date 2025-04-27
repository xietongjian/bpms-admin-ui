import { defineConfig } from '@vben/vite-config';
const targetBasePath = 'http://47.106.196.177:8888';
// const targetBasePath = 'http://localhost:8888';
export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/flow/': {
            changeOrigin: true,
            // rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: targetBasePath,
            ws: true,
          },
          '/dragon-api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/dragon-api/, ''),
            // mock代理目标地址
            target: targetBasePath,
            ws: true,
          },
        },
      },
    },
  };
});
