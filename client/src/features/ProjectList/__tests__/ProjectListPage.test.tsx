import { createMock } from "./mock";
const mocked = createMock();

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProjectListPage } from "../ProjectListPage";
import { filteredList, initialList } from "./data";
import {
    expectModal,
    expectPagination,
    expectSearch,
    expectTable,
    expectWait,
} from "./expect";
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
describe("ProjectListPage（画面ベース機能網羅）", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mocked.listMock.mockResolvedValue({
            items: initialList,
            total_pages: 1,
        });

        render(
            <MemoryRouter>
                <ProjectListPage />
            </MemoryRouter>,
        );

        page = pageOptions(screen);

        alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {
        alertMock.mockRestore();
    });

    it("初期表示で一覧が表示され、検索条件は空である", async () => {
        await expectWait().mockCalled(mocked.listMock, 1);
        expectSearch(page).init();
        await expectTable(page).searchRow(initialList[0]);
    });

    it("ステータスのプルダウンに正しい選択肢が表示される", async () => {
        actionSearch(page).openSelect("ステータス");
        expectSearch(page).optionLabel();
    });

    it("検索ボタン押下で searchProjects が呼ばれる", async () => {
        const action = actionSearch(page);
        await expectWait().mockCalled(mocked.listMock, 1);
        action.inputSearch("案件名", "販売");
        action.clickSearch();
        await expectWait().mockCalled(mocked.listMock, 2);
    });

    it("検索条件なしで検索すると全件が表示される", async () => {
        const action = actionSearch(page);
        action.clickSearch();
        await expectWait().mockCalled(mocked.listMock, 2);
        await expectTable(page).searchRow(initialList[0]);
    });

    it("検索条件を入力して検索すると結果が反映される", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: filteredList,
            total_pages: 1,
        });
        actionSearch(page).inputSearch("案件名", "（改修）");
        actionSearch(page).clickSearch();
        await expectWait().mockCalled(mocked.listMock, 2);
        await expectTable(page).searchRow(filteredList[0]);
    });

    it("クリア押下で検索条件が初期化され、loadProjects が呼ばれる", async () => {
        actionSearch(page).clickClear();
        await expectWait().mockCalled(mocked.listMock, 2);
        await expectSearch(page).init();
    });

    it("行クリックで詳細画面へ遷移する", async () => {
        await actionTable(page).clickRow(initialList[0]);
        expectTable(page).navigate(mocked.navigateMock, "/projects/PJT-001");
    });

    it("編集ボタン押下でモーダルが開く", async () => {
        await actionTable(page).clickEdit();
        await (await expectModal(page)).editModal();
    });

    it("新規作成ボタン押下でモーダルが開く", async () => {
        await actionPage(page).clickCreate();
        await (await expectModal(page)).createModal();
    });

    it("作成ボタン押下で createProject が呼ばれる", async () => {
        actionPage(page).clickCreate();
        await (await expectModal(page)).createModal();
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
        await expectWait().mockCalled(mocked.createMock, 1);
    });

    it("更新ボタン押下で updateProject が呼ばれる", async () => {
        actionTable(page).clickEdit();
        await (await expectModal(page)).editModal();
        await (await actionModal(page)).input("案件名", "更新後案件");
        await (await actionModal(page)).clickUpdate();
        await expectWait().mockCalled(mocked.updateMock, 1);
    });

    it("必須項目が空なら alert が表示される", async () => {
        actionPage(page).clickCreate();
        await (await expectModal(page)).createModal();
        await (await actionModal(page)).clickCreate();
        await expectWait().mockCalled(alertMock, 1);
    });

    it("キャンセルでモーダルが閉じる", async () => {
        actionPage(page).clickCreate();
        await (await expectModal(page)).createModal();
        await (await actionModal(page)).clickClose();
        await expectWait().noModal(page);
    });

    it("初期表示でページ情報が 1 / totalPages と表示される", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_pages: 5,
        });
        actionSearch(page).clickClear();
        await expectWait().mockCalled(mocked.listMock, 2);
        expectPagination(page).page(1, 5);
    });

    it("次へ押下で 2 ページ目が表示される", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_pages: 5,
        });
        actionSearch(page).clickClear();
        await expectWait().mockCalled(mocked.listMock, 2);
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_pages: 5,
        });
        actionPagination(page).clickNext();
        await expectWait().mockCalled(mocked.listMock, 3);
        expectPagination(page).page(2, 5);
    });

    it("前へ押下で 1 ページ目に戻る", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_pages: 5,
        });
        actionSearch(page).clickClear();
        await expectWait().mockCalled(mocked.listMock, 2);
        actionPagination(page).clickNext();
        await expectWait().mockCalled(mocked.listMock, 3);
        actionPagination(page).clickPrev();
        await expectWait().mockCalled(mocked.listMock, 4);
        expectPagination(page).page(1, 1);
    });

    it("最終ページでは次へが disabled になる", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_pages: 2,
        });
        actionSearch(page).clickClear();
        await expectWait().mockCalled(mocked.listMock, 2);
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_pages: 2,
        });
        actionPagination(page).clickNext();
        await expectWait().mockCalled(mocked.listMock, 3);
        expectPagination(page).page(2, 2);
        expectPagination(page).disableNext();
    });

    it("1 ページ目では前へが disabled になる", async () => {
        expectPagination(page).page(1, 1);
        expectPagination(page).disablePrev();
    });
});
