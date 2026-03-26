import { defineConfig } from "@playwright/test";

// |  |  | 
// | npx playwright test | テスト実行 | 
// | npx playwright test --ui | GUIテスト実行 | 
// | npx playwright codegen http://localhost:1420 | 自動テストコード生成 | 

// # ターミナル1
// npm run tauri dev

// # ターミナル2
// npx playwright test
export default defineConfig({
  testDir: "./__tests__",
  testIgnore: ["src/**", "node_modules/**"], // ← これが重要！
  timeout: 30000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
  },
});