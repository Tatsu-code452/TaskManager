import { TaskRowEditForm } from "../../types/types";
import { createEmptyTask } from "../logic/createEmptyTask";
import { taskToEditForm } from "./taskToEditForm";

type CsvHeader =
    | "name"
    | "projectId"
    | "phaseId"
    | "categoryId"
    | "userId"
    | "plannedStart"
    | "plannedEnd"
    | "actualStart"
    | "actualEnd"
    | "progressRate"
    | "priority";

const KNOWN_HEADERS: CsvHeader[] = [
    "name",
    "projectId",
    "phaseId",
    "categoryId",
    "userId",
    "plannedStart",
    "plannedEnd",
    "actualStart",
    "actualEnd",
    "progressRate",
    "priority",
];

export type CsvParseResult = {
    forms: TaskRowEditForm[];
    errors: string[];
};

export const csvToTaskForms = (csv: string): CsvParseResult => {
    const errors: string[] = [];

    const lines = csv
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

    if (lines.length === 0) {
        return { forms: [], errors: ["CSV が空です"] };
    }

    // ---- ヘッダー解析 ----
    const rawHeader = lines[0].split(",").map((h) => h.trim());

    // 型安全にヘッダーをフィルタ
    const header: CsvHeader[] = rawHeader.filter((h): h is CsvHeader =>
        KNOWN_HEADERS.includes(h as CsvHeader)
    );

    // 未知のヘッダーを検出
    rawHeader.forEach((h) => {
        if (!KNOWN_HEADERS.includes(h as CsvHeader)) {
            errors.push(`未知のヘッダーです: ${h}`);
        }
    });

    const rows = lines.slice(1);
    const forms: TaskRowEditForm[] = [];

    rows.forEach((row, rowIndex) => {
        const cols = row.split(",").map((c) => c.trim());
        const form = taskToEditForm(createEmptyTask());

        header.forEach((key, i) => {
            const value = cols[i] ?? "";

            // ---- key ごとの型安全な代入 ----
            switch (key) {
                case "name":
                case "projectId":
                case "phaseId":
                case "categoryId":
                case "userId":
                case "plannedStart":
                case "plannedEnd":
                case "actualStart":
                case "actualEnd":
                    form[key] = value;
                    break;

                case "progressRate":
                case "priority": {
                    const num = Number(value);
                    if (Number.isNaN(num)) {
                        errors.push(
                            `${rowIndex + 2} 行目: ${key} は数値ではありません (${value})`
                        );
                    }
                    form[key] = num;
                    break;
                }
            }
        });

        forms.push(form);
    });

    return { forms, errors };
};