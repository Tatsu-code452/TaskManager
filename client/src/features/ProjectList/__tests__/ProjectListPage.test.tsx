import { createMock } from "./defines/mock";
const mocked = createMock();

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createAction, createExpect, createPageOptions } from "../../../test-utils";
import { ProjectListPage } from "../ProjectListPage";
import { actionDefines } from "./defines/actionDefines";
import { filteredList, initialList } from "./defines/data";
import { expectDefines } from "./defines/expectDefines";
import { pageDefines } from "./defines/pageDefines";
import {
    Action,
    assignToModal,
    Expect,
    helperRegistry,
    PageOptions,
} from "./defines/types";

let alertMock;
let page: PageOptions;
let expect: Expect;
let action: Action;
describe("ProjectListPage（画面ベース機能網羅）", () => {
    beforeEach(async () => {
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

        page = await createPageOptions(screen, pageDefines);
        expect = await createExpect(page, expectDefines, helperRegistry);
        action = createAction(page, actionDefines);
        alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {
        alertMock.mockRestore();
    });

    it("初期表示で一覧が表示され、検索条件は空である", async () => {
        await expect.wait.mockCalled(mocked.listMock, 1);
        await expect.search.init();
        await expect.table.searchRow(initialList[0]);
    });

    it("ステータスのプルダウンに正しい選択肢が表示される", async () => {
        action.search().openSelect("ステータス");
        expect.search.optionLabel();
    });

    it("検索ボタン押下で searchProjects が呼ばれる", async () => {
        await expect.wait.mockCalled(mocked.listMock, 1);
        action.search().inputSearch("案件名", "販売");
        action.search().clickSearch();
        await expect.wait.mockCalled(mocked.listMock, 2);
    });

    it("検索条件なしで検索すると全件が表示される", async () => {
        action.search().clickSearch();
        await expect.wait.mockCalled(mocked.listMock, 2);
        await expect.table.searchRow(initialList[0]);
    });

    it("検索条件を入力して検索すると結果が反映される", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: filteredList,
            total_num: 1,
        });
        action.search().inputSearch("案件名", "（改修）");
        action.search().clickSearch();
        await expect.wait.mockCalled(mocked.listMock, 2);
        await expect.table.searchRow(filteredList[0]);
    });

    it("クリア押下で検索条件が初期化され、loadProjects が呼ばれる", async () => {
        action.search().clickClear();
        await expect.wait.mockCalled(mocked.listMock, 2);
        await expect.search.init();
    });

    it("行クリックで詳細画面へ遷移する", async () => {
        await action.table().clickRow(initialList[0].id);
        expect.table.navigate(mocked.navigateMock, "/projects/PJT-001");
    });

    it("編集ボタン押下でモーダルが開く", async () => {
        await action.table().clickEdit();
        await (await expect.modal()).editModal();
    });

    it("新規作成ボタン押下でモーダルが開く", async () => {
        action.page().clickCreate();
        await (await expect.modal()).createModal();
    });

    it("作成ボタン押下で createProject が呼ばれる", async () => {
        action.page().clickCreate();
        await (await expect.modal()).createModal();
        const modal = await assignToModal(page);
        await modal.inputAll({
            name: "新規案件",
            id: "TEST-001",
            client: "XYZ",
            start_date: "2025-01-01",
            end_date: "2025-02-01",
            owner: "山田",
        });
        await (await action.modal()).clickCreate();
        await expect.wait.mockCalled(mocked.createMock, 1);
    });

    it("更新ボタン押下で updateProject が呼ばれる", async () => {
        action.table().clickEdit();
        await (await expect.modal()).editModal();
        await (await action.modal()).input("案件名", "更新後案件");
        await (await action.modal()).clickUpdate();
        await expect.wait.mockCalled(mocked.updateMock, 1);
    });

    it("必須項目が空なら alert が表示される", async () => {
        action.page().clickCreate();
        await (await expect.modal()).createModal();
        await (await action.modal()).clickCreate();
        await expect.wait.mockCalled(alertMock, 1);
    });

    it("キャンセルでモーダルが閉じる", async () => {
        action.page().clickCreate();
        await (await expect.modal()).createModal();
        await (await action.modal()).clickClose();
        await expect.wait.noModal(page);
    });

    it("初期表示でページ情報が 1 / totalPages と表示される", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 115,
        });
        action.search().clickClear();
        await expect.wait.mockCalled(mocked.listMock, 2);
        await expect.pagination.page(1, 6);
    });

    it("次へ押下で 2 ページ目が表示される", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 100,
        });
        action.search().clickClear();
        await expect.wait.mockCalled(mocked.listMock, 2);
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 100,
        });
        (await action.pagination()).clickNext();
        await expect.wait.mockCalled(mocked.listMock, 3);
        await expect.pagination.page(2, 5);
    });

    it("前へ押下で 1 ページ目に戻る", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 100,
        });
        action.search().clickClear();
        await expect.wait.mockCalled(mocked.listMock, 2);
        (await action.pagination()).clickNext();
        await expect.wait.mockCalled(mocked.listMock, 3);
        (await action.pagination()).clickPrev();
        await expect.wait.mockCalled(mocked.listMock, 4);
        await expect.pagination.page(1, 1);
    });

    it("最終ページでは次へが disabled になる", async () => {
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 40,
        });
        action.search().clickClear();
        await expect.wait.mockCalled(mocked.listMock, 2);
        mocked.listMock.mockResolvedValueOnce({
            items: initialList,
            total_num: 40,
        });
        (await action.pagination()).clickNext();
        await expect.wait.mockCalled(mocked.listMock, 3);
        await expect.pagination.page(2, 2);
        await expect.pagination.disableNext();
    });

    it("1 ページ目では前へが disabled になる", async () => {
        await expect.pagination.page(1, 1);
        await expect.pagination.disablePrev();
    });
});
