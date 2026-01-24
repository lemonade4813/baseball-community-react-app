import { defineConfig } from 'vitest/config'; // 'vite'가 아닌 'vitest/config'에서 가져옵니다.
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTest.ts",
  },
  base: "/",
  define: { 'global': {} },
  // resolve: { alias: { "@": path.resolve(__dirname, "src") } } 
  // tsconfigPaths() 사용 시 위 alias는 생략 가능합니다.
});