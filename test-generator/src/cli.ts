#!/usr/bin/env ts-node

import inquirer from "inquirer";
import path from "path";
import { Project } from "ts-morph";
import { detectFileType, FileType } from "./detectFileType";
import { getFiles } from "./fileSelector";
import { generateTest } from "./generator/generateTest";
import {
    parseAPI,
    parseComponent,
    parseController,
    parseHook
} from "./parser";

async function main() {
    console.log("🧪 React Test Generator 起動");
    console.log("📂 Current Directory:", process.cwd());

    const targetPath = await askTargetPath();
    const files = await getFiles(targetPath);
    const selected = await askFileSelection(files);

    const project = new Project();

    for (const file of selected) {
        try {
            await processFile(file, project);
        } catch (err) {
            console.error(`❌ エラー: ${file}`, err);
        }
    }

    console.log("🎉 全テスト生成完了");
}

async function askTargetPath(): Promise<string> {
    const { targetPath } = await inquirer.prompt([
        {
            type: "input",
            name: "targetPath",
            message: "テスト対象ソースのあるパスを入力してください:",
        },
    ]);
    return targetPath;
}

async function askFileSelection(files: string[]): Promise<string[]> {
    const { selected } = await inquirer.prompt([
        {
            type: "checkbox",
            name: "selected",
            message: "テスト生成するファイルを選択してください:",
            choices: files,
        },
    ]);
    return selected;
}

async function processFile(file: string, project: Project) {
    const source = project.addSourceFileAtPath(file);
    const type = detectFileType(source);

    console.log(`📄 ${file} → 種別: ${type}`);

    const parser = PARSERS[type];
    const template = TEMPLATES[type];

    if (!parser || !template) {
        console.log(`⚠ 未対応のファイル形式: ${file}`);
        return;
    }

    const parsed = parser(source);
    const output = buildOutputFileName(file, type);

    await generateTest(
        {
            fileName: path.basename(file).replace(/\.tsx?$/, ""),
            ...parsed,
        },
        template,
        output
    );

    console.log(`✔ テスト生成完了: ${output}`);
}

const PARSERS: Record<FileType, any> = {
    component: parseComponent,
    hook: parseHook,
    api: parseAPI,
    controller: parseController,
    unknown: null,
};

const TEMPLATES: Record<FileType, string | null> = {
    component: "component.test.hbs",
    hook: "hook.test.hbs",
    api: "api.test.hbs",
    controller: "controller.test.hbs",
    unknown: null,
};

function buildOutputFileName(file: string, type: FileType): string {
    const suffix = type === "component" ? ".test.tsx" : ".test.ts";
    return file.replace(/\.tsx?$/, suffix);
}

main();

