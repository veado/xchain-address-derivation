import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  define: {
    'typeof window': true
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
    exclude: ["zod"],
  },
});
