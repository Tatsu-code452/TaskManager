import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { mockTaskApi } from "../domain/service/mock/mockTaskApi";
import TaskPage from "./TaskPage";

// API モック
vi.mock("../../api/taskApi", () => ({
    taskApi: mockTaskApi,
}));

describe("TaskPage 初期表示", () => {
    test("初期ロードでタスク一覧が表示される", async () => {
        render(<TaskPage />);

        // タイトル
        expect(screen.getByText("タスク管理")).toBeInTheDocument();

        // モックデータの1件目が表示される
        expect(await screen.findByText("要件定義")).toBeInTheDocument();

        // 詳細パネルは未選択状態
        expect(
            screen.getByText("タスクを選択してください"),
        ).toBeInTheDocument();
    });

    // test("行クリックで詳細パネルが表示される", async () => {
    //     render(<TaskPage />);

    //     const row = await screen.findByText("要件定義");
    //     fireEvent.click(row);

    //     expect(screen.getByText("要件定義")).toBeInTheDocument();
    //     expect(screen.getByText("プロジェクト")).toBeInTheDocument();
    // });

    // test("詳細編集して保存できる", async () => {
    //     render(<TaskPage />);

    //     const row = await screen.findByText("要件定義");
    //     fireEvent.click(row);

    //     // 編集モードへ
    //     fireEvent.click(screen.getByText("編集"));

    //     const nameInput = screen.getByLabelText("名前");
    //     expect(nameInput).toBeInTheDocument();

    //     // 値を変更
    //     fireEvent.input(nameInput, { target: { value: "要件定義（修正）" } });

    //     // 保存
    //     fireEvent.click(screen.getByText("保存"));

    //     expect(await screen.findByText("要件定義（修正）")).toBeInTheDocument();
    // });

    // test("タスクを削除できる", async () => {
    //     render(<TaskPage />);

    //     const row = await screen.findByText("要件定義");
    //     fireEvent.click(row);

    //     fireEvent.click(screen.getByText("削除"));

    //     await waitFor(() => {
    //         expect(screen.queryByText("要件定義")).not.toBeInTheDocument();
    //     });
    // });

    // test("プロジェクトIDでフィルタできる", async () => {
    //     render(<TaskPage />);

    //     fireEvent.click(screen.getByText("フィルタを開く"));

    //     const projectSelect = screen.getByLabelText("projectId");
    //     fireEvent.change(projectSelect, { target: { value: "1" } });

    //     await waitFor(() => {
    //         expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
    //     });
    // });

    // test("CSV モーダルを開閉できる", () => {
    //     render(<TaskPage />);

    //     fireEvent.click(screen.getByText("CSV から一括登録"));
    //     expect(screen.getByText("CSV インポート")).toBeInTheDocument();

    //     fireEvent.click(screen.getByText("閉じる"));
    //     expect(screen.queryByText("CSV インポート")).not.toBeInTheDocument();
    // });
});
