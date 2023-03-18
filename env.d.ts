// Vite
// IntelliSense for TypeScript
// https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_VERSION: string;
	readonly VITE_COMMIT_HASH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
