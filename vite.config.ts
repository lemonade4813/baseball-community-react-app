import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { ViteUserConfig } from "vitest/config";
import path from "path";

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
  base : "/",
  resolve : {
    alias : [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {find : "@assets", replacement: path.resolve(__dirname, "/src/assets")},
      {find : "@components", replacement: path.resolve(__dirname, "src/components")},
      {find : "@hooks", replacement: path.resolve(__dirname, "/src/hooks")},
      {find : "@store", replacement: path.resolve(__dirname,"/src/store")},
      {find : "@util", replacement: path.resolve(__dirname,"/src/util")},
    ]
  },
  define : {'global' : {}},
})
