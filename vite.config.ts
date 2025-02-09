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
  resolve : {
    alias : [
      {find : "@", replacement : "/src"},
      {find : "@assets", replacement : "/src/assets"},
      {find : "@components", replacement :"/src/components"},
      {find : "@hooks", replacement :"/src/hooks"},
      {find : "@store", replacement :"/src/store"},
      {find : "@util", replacement :"/src/util"},
    ]
  },
  define : {'global' : {}},
})
