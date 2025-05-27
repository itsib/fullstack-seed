import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { version, description, config } = JSON.parse(await readFile('./package.json', 'utf8'));

  return {
    define: {
      'import.meta.env.MODE': JSON.stringify(mode),
      'import.meta.env.VERSION': JSON.stringify(version),
    },
    resolve: {
      alias: {
        '@app-types': resolve(__dirname, 'src/types/index.ts'),
        '@app-hooks': resolve(__dirname, 'src/hooks'),
        '@app-context': resolve(__dirname, 'src/context'),
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
      tailwindcss(),
      VitePWA({
        base: '/',
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        strategies: 'generateSW',
        devOptions: {
          enabled: false,
          type: 'module',
          navigateFallback: 'index.html',
          resolveTempFolder: () => join(process.cwd(), 'dist'),
        },
        manifestFilename: 'manifest.webmanifest',
        manifest: {
          name: config.name,
          short_name: config.name,
          description: description,
          lang: 'en-US',
          orientation: 'any',
          start_url: '/',
          display: 'standalone',
          display_override: ['fullscreen', 'browser'],
          icons: [],
          background_color: '#000000',
          theme_color: '#12FF80',
          screenshots: [],
          shortcuts: [],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 3000000,
          globDirectory: join(process.cwd(), 'dist'),
          globPatterns: [
            '**/*.{js,css,html}',
            'locales/**/*.{json,svg}',
            'fonts/**/*.{woff2,woff,ttf}',
          ],
          globIgnores: ['stats.html'],
          navigateFallbackDenylist: [/^\/health/, /^\/api/, /^\/docs/],
          modifyURLPrefix: { '': '/' },
          navigateFallback: "index.html",
          disableDevLogs: true,
          runtimeCaching: [
            {
              urlPattern: /\.(?:eot|woff2|font.css)/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-font-assets',
                expiration: {
                  maxEntries: 64,
                  maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                },
              },
            },
            {
              urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-image-assets',
                expiration: {
                  maxEntries: 64,
                  maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
              },
            },
          ]
        }
      }),
    ],
    server: {
      port: parseInt(env.VITE_PORT),
      host: '0.0.0.0',
    }
  }
})
