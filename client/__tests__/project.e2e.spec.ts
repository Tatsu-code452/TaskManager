import { expect, test } from "@playwright/test";

test.describe("Project E2E（欠陥ワークフロー）", () => {
    const BASE = "http://localhost:3001/projects/P1?tab=defect";

    test("DF-01：欠陥一覧が表示される", async ({ page }) => {
        await page.goto(BASE);

        await expect(page.getByText("新規欠陥")).toBeVisible();
        await expect(page.getByText("入力チェック漏れ")).toBeVisible();
    });

    test("DF-02：新規欠陥作成（タスク紐付けなし）", async ({ page }) => {
        await page.goto(BASE);

        await page.click("text=新規欠陥");

        await page.fill('input[name="title"]', "画面遷移不具合");
        await page.fill('textarea[name="description"]', "詳細説明テスト");
        await page.selectOption('select[name="severity"]', "Major");
        await page.selectOption('select[name="status"]', "Open");
        await page.selectOption('select[name="task_id"]', "none");

        await page.click("text=保存");

        await expect(page.getByText("画面遷移不具合")).toBeVisible();
    });

    test("DF-03：新規欠陥作成（タスク紐付けあり）", async ({ page }) => {
        await page.goto(BASE);

        await page.click("text=新規欠陥");

        await page.fill('input[name="title"]', "APIレスポンス不正");
        await page.fill('textarea[name="description"]', "レスポンス形式が異なる");
        await page.selectOption('select[name="severity"]', "Minor");
        await page.selectOption('select[name="status"]', "Open");
        await page.selectOption('select[name="task_id"]', "T1");

        await page.click("text=保存");

        await expect(page.getByText("APIレスポンス不正")).toBeVisible();
        await expect(page.getByText("T1")).toBeVisible();
    });

    test("DF-04：欠陥編集（ステータス変更）", async ({ page }) => {
        await page.goto(BASE);

        await page.click(
            "text=入力チェック漏れ >> xpath=../..//button[contains(text(),'✎')]"
        );

        await page.selectOption('select[name="status"]', "Fixed");
        await page.click("text=保存");

        await expect(page.getByText("Fixed")).toBeVisible();
    });

    test("DF-05：欠陥削除", async ({ page }) => {
        await page.goto(BASE);

        await page.click(
            "text=APIレスポンス不正 >> xpath=../..//button[contains(text(),'削除')]"
        );

        await page.click("text=OK");

        await expect(page.getByText("APIレスポンス不正")).not.toBeVisible();
    });

    test("DF-06：必須項目エラー（タイトルなし）", async ({ page }) => {
        await page.goto(BASE);

        await page.click("text=新規欠陥");

        await page.fill('input[name="title"]', "");
        await page.click("text=保存");

        await expect(page.getByText("タイトルは必須です")).toBeVisible();
    });

    test("DF-07：存在しない ID を直接 URL で開いた場合 → エラー表示", async ({ page }) => {
        // モーダル表示なので URL ではなく UI 側のエラーを確認する必要がある
        await page.goto(BASE);

        // 存在しない ID を編集する UI があるならここで操作
        // なければこのテストはスキップ or UI に合わせて修正
    });

    test("DF-08：ID 採番確認（欠番がある場合）", async ({ page }) => {
        await page.goto(BASE);

        await page.click("text=新規欠陥");

        await page.fill('input[name="title"]', "採番テスト");
        await page.selectOption('select[name="severity"]', "Minor");
        await page.selectOption('select[name="status"]', "Open");

        await page.click("text=保存");

        await expect(page.getByText("DEFECT-4")).toBeVisible();
    });
});