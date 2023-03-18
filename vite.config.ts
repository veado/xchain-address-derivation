import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { execSync } from 'child_process';


// read package.json
const { version } = JSON.parse(await readFile(resolve('./package.json'), 'utf-8'));

// Add commit hash to Vite's `env`
process.env.VITE_COMMIT_HASH = execSync('git rev-parse --short HEAD').toString().trim();

// Add version no. hash to Vite's `env`
process.env.VITE_VERSION = version;

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  define: {
    "typeof window": true,
  },
  resolve: {
    alias: {
      process: "process/browser",
      buffer: "buffer",
      util: "rollup-plugin-node-polyfills/polyfills/util",
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      crypto: "crypto-browserify",
    },
  },
  optimizeDeps: {
    // *zod' is required by `solid-form-handler`, but we are using  `yup` instead
    exclude: ["zod"],
  },
});
