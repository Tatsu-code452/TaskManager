module.exports = {
    rootDir: "./",
    moduleDirectories: ["node_modules", "src"],

    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    moduleNameMapper: {
      // "^react-router-dom$": "<rootDir>/__mocks__/react-router-dom.tsx",
        "^@/(.*)$": "<rootDir>/src/$1", // 任意：パスエイリアス対応
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    extensionsToTreatAsEsm: [".ts", ".tsx"],
};
