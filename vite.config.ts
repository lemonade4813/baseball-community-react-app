import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { ViteUserConfig } from "vitest/config";

const vitestConfig: ViteUserConfig = {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTest.ts",
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ...vitestConfig,
  define : {'global' : {}},
})
