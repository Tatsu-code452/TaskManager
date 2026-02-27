import { describe, expect, test } from "vitest";
import { csvToTaskForms } from "./csvToEditForms";

describe("csvToTaskForms", () => {
    test("空 CSV はエラーを返す", () => {
        const result = csvToTaskForms("");
        expect(result.forms).toEqual([]);
        expect(result.errors).toContain("CSV が空です");
    });

    test("未知のヘッダーがある場合エラーを返す", () => {
        const csv = `unknown,name
test,A`;

        const result = csvToTaskForms(csv);

        expect(result.errors).toContain("未知のヘッダーです: unknown");
    });

    test("正常な CSV をパースできる", () => {
        const csv = `name,projectId
要件定義,1`;

        const result = csvToTaskForms(csv);

        expect(result.errors.length).toBe(0);
        expect(result.forms[0].name).toBe("要件定義");
        expect(result.forms[0].projectId).toBe("1");
    });

    test("数値項目が NaN の場合エラーを返す", () => {
        const csv = `name,progressRate
A,abc`;

        const result = csvToTaskForms(csv);

        expect(result.errors[0]).toContain("progressRate は数値ではありません");
    });

    test("複数行の CSV をパースできる", () => {
        const csv = `name,projectId
A,1
B,2`;

        const result = csvToTaskForms(csv);

        expect(result.forms.length).toBe(2);
        expect(result.forms[1].name).toBe("B");
    });
});