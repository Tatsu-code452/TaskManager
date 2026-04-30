import fs from "fs";
import path from "path";

export async function getFiles(dir: string): Promise<string[]> {
    return await walk(dir);
}

async function walk(current: string): Promise<string[]> {
    const entries = await fs.promises.readdir(current, { withFileTypes: true });

    const files = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(current, entry.name);

            if (entry.isDirectory()) {
                return walk(fullPath); // 再帰して結果を返す
            }

            if (entry.isFile() && isTargetSource(entry.name)) {
                return [fullPath];
            }

            return [];
        })
    );

    // 二次元配列をフラット化
    return files.flat();
}

function isTargetSource(filename: string): boolean {
    // .ts / .tsx だが .test.ts / .test.tsx は除外
    const isTs = filename.endsWith(".ts") || filename.endsWith(".tsx");
    const isTest = filename.endsWith(".test.ts") || filename.endsWith(".test.tsx");
    return isTs && !isTest;
}