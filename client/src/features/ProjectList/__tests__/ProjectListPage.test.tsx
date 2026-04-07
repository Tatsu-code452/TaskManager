import { createMock } from "./mock";
const mocked = createMock();

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProjectListPage } from "../ProjectListPage";
import { filteredList, initialList } from "./data";
import { createExpect } from "./expect";
import {
    actionModal,
    actionPage,
    actionPagination,
    actionSearch,
    actionTable,
} from "./flow";
import { pageOptions } from "./page";

let alertMock;
let page: ReturnType<typeof pageOptions>;
let expect: ReturnType<typeof createExpect>;
describe("ProjectListPage（画面ベース機能網羅）", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mocked.listMock.mockResolvedValue({
            items: initialList,
            total_num: 1,
        });

        render(
            <MemoryRouter>
                <ProjectListPage />
            </MemoryRouter>,
        );

        page = pageOptions(screen);
        expect = createExpect(page);
        alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {
        alertMock.mockRestore();
    });

    it("初期表示で一覧が表示され、検索条件は空である", async () => {
        await expect.wait.mockCalled(mocked.listMock, 1);
        await expect.search.init();
        await expect.table.searchRow(initialList[0]);
        await expect.table.searchRow(initialList[0]);
    });

    it("ステータスのプルダウンに正しい選択肢が表示される", async () => {
        actionSearch(page).openSelect("ステータス");
        expect.search.optionLabel();
    });

    it("検索ボタン押下で searchProjects が呼ばれる", async () => {
        const action = actionSearch(page);
        await expect.wait.mockCalled(mocked.listMock, 1);
        action.inputSearch("案件名", "販売");
        action.clickSearch();
        await expect.wait.mockCalled(mocked.listMock, 2);
    });

    it("検索条件なしで検索すると全件が表示される", async () => {
        const action = actionSearch(page);
        action.clickSearch();
        await expect.wait.mockCalled(mocked.listMock, 2);
        await expect.table.searchRow(initialList[0]);
    });

    it("検索条件を入力して検索すると結果が反映される", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: filteredList,
            total_num: 1,
        });
        actionSearch(page).inputSearch("案件名", "（改修）");
        actionSearch(page).clickSearch();
        await expect.wait.mockCalled(mocked.listMock, 2);
        await expect.table.searchRow(filteredList[0]);
    });

    it("クリア押下で検索条件が初期化され、loadProjects が呼ばれる", async () => {
        actionSearch(page).clickClear();
        await expect.wait.mockCalled(mocked.listMock, 2);
        await expect.search.init();
    });

    it("行クリックで詳細画面へ遷移する", async () => {
        await actionTable(page).clickRow(initialList[0]);
        expect.table.navigate(mocked.navigateMock, "/projects/PJT-001");
    });

    it("編集ボタン押下でモーダルが開く", async () => {
        await actionTable(page).clickEdit();
        await (await expect.modal()).editModal();
    });

    it("新規作成ボタン押下でモーダルが開く", async () => {
        await actionPage(page).clickCreate();
        await (await expect.modal()).createModal();
    });

    it("作成ボタン押下で createProject が呼ばれる", async () => {
        actionPage(page).clickCreate();
        await (await expect.modal()).createModal();
        await (
            await actionModal(page)
        ).inputAll({
            name: "新規案件",
            id: "TEST-001",
            client: "XYZ",
            start_date: "2025-01-01",
            end_date: "2025-02-01",
            owner: "山田",
        });
        await (await actionModal(page)).clickCreate();
        await expect.wait.mockCalled(mocked.createMock, 1);
    });

    it("更新ボタン押下で updateProject が呼ばれる", async () => {
        actionTable(page).clickEdit();
        await (await expect.modal()).editModal();
        await (await actionModal(page)).input("案件名", "更新後案件");
        await (await actionModal(page)).clickUpdate();
        await expect.wait.mockCalled(mocked.updateMock, 1);
    });

    it("必須項目が空なら alert が表示される", async () => {
        actionPage(page).clickCreate();
        await (await expect.modal()).createModal();
        await (await actionModal(page)).clickCreate();
        await expect.wait.mockCalled(alertMock, 1);
    });

    it("キャンセルでモーダルが閉じる", async () => {
        actionPage(page).clickCreate();
        await (await expect.modal()).createModal();
        await (await actionModal(page)).clickClose();
        await expect.wait.noModal(page);
    });

    it("初期表示でページ情報が 1 / totalPages と表示される", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 5,
        });
        actionSearch(page).clickClear();
        await expect.wait.mockCalled(mocked.listMock, 2);
        expect.pagination.page(1, 5);
    });

    it("次へ押下で 2 ページ目が表示される", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 5,
        });
        actionSearch(page).clickClear();
        await expect.wait.mockCalled(mocked.listMock, 2);
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 5,
        });
        actionPagination(page).clickNext();
        await expect.wait.mockCalled(mocked.listMock, 3);
        expect.pagination.page(2, 5);
    });

    it("前へ押下で 1 ページ目に戻る", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 5,
        });
        actionSearch(page).clickClear();
        await expect.wait.mockCalled(mocked.listMock, 2);
        actionPagination(page).clickNext();
        await expect.wait.mockCalled(mocked.listMock, 3);
        actionPagination(page).clickPrev();
        await expect.wait.mockCalled(mocked.listMock, 4);
        expect.pagination.page(1, 1);
    });

    it("最終ページでは次へが disabled になる", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 2,
        });
        actionSearch(page).clickClear();
        await expect.wait.mockCalled(mocked.listMock, 2);
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 2,
        });
        actionPagination(page).clickNext();
        await expect.wait.mockCalled(mocked.listMock, 3);
        expect.pagination.page(2, 2);
        expect.pagination.disableNext();
    });

    it("1 ページ目では前へが disabled になる", async () => {
        expect.pagination.page(1, 1);
        expect.pagination.disablePrev();
    });
});
