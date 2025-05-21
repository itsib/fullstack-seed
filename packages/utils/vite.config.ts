/// <reference types='vitest' />
/// <reference types='vite' />
import { defineConfig, type UserConfig } from 'vite';
import { join } from 'node:path';

export default defineConfig(async (): Promise<UserConfig> => {
  return {
    root: __dirname,
    plugins: [],
    build: {
      emptyOutDir: true,
      outDir: join(__dirname, 'dist'),
      lib: {
        entry: {
          index: join(__dirname, 'lib/index.ts'),
          converters: join(__dirname, 'lib/converters/index.ts'),
          serializer: join(__dirname, 'lib/serializer/index.ts'),
          utils: join(__dirname, 'lib/utils/index.ts'),
        },
        formats: ['cjs', 'es'],
      },
    },
    test: {
      watch: false,
      globals: true,
      environment: 'node',
      include: ['lib/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: { reportsDirectory: join(__dirname, 'coverage'), provider: 'v8' },
      setupFiles: 'test-setup.ts',
    },
  };
});