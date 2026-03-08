// generateMockData.js
// node generateMockData.js
import fs from "fs";

const phases = [
    "要件定義",
    "基本設計",
    "詳細設計",
    "製造",
    "単体テスト",
    "結合テスト",
];

const phaseCounts = [17, 17, 17, 17, 16, 16]; // 合計100件

const startDates = {
    要件定義: new Date("2026-01-05"),
    基本設計: new Date("2026-02-01"),
    詳細設計: new Date("2026-02-20"),
    製造: new Date("2026-03-20"),
    単体テスト: new Date("2026-05-01"),
    結合テスト: new Date("2026-06-01"),
};

function toMidnight(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function diffDays(start, end) {
    const s = toMidnight(start);
    const e = toMidnight(end);
    const diffMs = e.getTime() - s.getTime();
    return diffMs / (1000 * 60 * 60 * 24);
}

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function formatDate(date) {
    return date.toISOString().split("T")[0];
}

function uuid(i) {
    return `a1f1e001-${String(i).padStart(4, "0")}-4000-9000-00000000${String(i).padStart(4, "0")}`;
}

const tasks = [];
const plan_cells = [];
const actual_cells = [];

let taskIndex = 1;

// for (let p = 0; p < phases.length; p++) {
//     const phase = phases[p];
//     const count = phaseCounts[p];

//     for (let i = 0; i < count; i++) {
//         const id = uuid(taskIndex);
//         const baseDate = addDays(startDates[phase], i);

//         // タスク本体
//         tasks.push({
//             id,
//             phase,
//             name: `${phase}タスク${taskIndex}`,
//             planned_start: baseDate.toISOString(),
//             planned_end: addDays(baseDate, 3).toISOString(),
//             actual_progress: Math.floor(Math.random() * 100),
//             created_at: baseDate.toISOString(),
//             updated_at: addDays(baseDate, 7).toISOString(),
//         });

//         // 計画工数（10〜20日）
//         // const planDays = 10 + Math.floor(Math.random() * 11);
//         const planDays = diffDays(
//             new Date(tasks[tasks.length - 1].planned_start),
//             new Date(tasks[tasks.length - 1].planned_end),
//         );
//         for (let d = 0; d < planDays; d++) {
//             plan_cells.push({
//                 task_id: id,
//                 date: formatDate(addDays(baseDate, d)),
//                 hours: 1 + Math.floor(Math.random() * 6),
//             });
//         }

//         // 実績工数（3〜10日）
//         // const actualDays = 3 + Math.floor(Math.random() * 8);
//         const actualDays = planDays + 1;
//         for (let d = 0; d < actualDays; d++) {
//             actual_cells.push({
//                 task_id: id,
//                 date: formatDate(addDays(baseDate, d + 1)),
//                 hours: 1 + Math.floor(Math.random() * 8),
//             });
//         }

//         taskIndex++;
//     }
// }

const output = {
    tasks,
    plan_cells,
    actual_cells,
};

fs.writeFileSync("db.json", JSON.stringify(output, null, 2), "utf-8");

console.log("db.json を生成しました！");
