import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3001, // 任意のポート番号に変更
        strictPort: true, // 使用中なら起動を失敗させる（falseなら自動で別ポートに切り替わる）
        proxy: {
            '/api': 'http://localhost:3000', // Expressのポートに合わせる
        },
    },
});
