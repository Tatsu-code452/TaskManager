/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/setupTests.ts",
        css: false,
        coverage: {
            provider: "v8", // or "istanbul"
            reporter: ["text", "html"],
            reportsDirectory: "./coverage",
            exclude: ["node_modules/", "dist/"],
        },
    },
    resolve: {
        alias: {
            "@api": path.resolve(__dirname, "src/api/tauri"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@features": path.resolve(__dirname, "src/features"),
            "@components": path.resolve(__dirname, "src/components"),
            "@comtypes": path.resolve(__dirname, "src/types"),
        },
    },
});