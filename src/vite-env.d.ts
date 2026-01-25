/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ZATTERA_RPC_URL: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
