import { defineConfig, loadEnv } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {
      alias: {
        '@app-types': resolve(__dirname, 'src/types/index.ts'),
        '@app-hooks': resolve(__dirname, 'src/hooks'),
        '@app-context': resolve(__dirname, 'src/context/index.ts'),
        '@app-components': resolve(__dirname, 'src/components'),
      },
    },
    plugins: [
      TanStackRouterVite({
        target: 'react',
        routeFileIgnorePrefix: '-',
        generatedRouteTree: './src/route-tree.gen.ts',
        routesDirectory: './src/pages',
        quoteStyle: 'single',
        semicolons: true,
        disableLogging: false,
      }),
      react(),
    ],
    server: {
      port: parseInt(env.VITE_PORT),
      host: '0.0.0.0',
    }
  }
})
