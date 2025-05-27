/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/info" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}