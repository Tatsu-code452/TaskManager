/// <reference types="vitest" />
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
});