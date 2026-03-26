import { ProjectStatus } from "../../types/db/project";
import { useProjectListController } from "./hooks/controller/useProjectListController";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";
import { ProjectListPage as Component } from "./index";

describe("Component: index", () => {
    vi.mock("./hooks/controller/useProjectListController");
    type Controller = ReturnType<typeof useProjectListController>;
    const mockController: Controller = {
        projects: [],
        loadProjects: vi.fn(),
        search: { name: "", client: "", status: ProjectStatus.Planned },
        setSearch: vi.fn(),
        searchProjects: vi.fn(),
        clearSearch: vi.fn(),
        modalMode: null,
        form: null,
        setForm: vi.fn(),
        openCreateModal: vi.fn(),
        openEditModal: vi.fn(),
        closeModal: vi.fn(),
        handleSubmitCreate: vi.fn(),
        handleSubmitUpdate: vi.fn(),
    };
    (useProjectListController as Mock).mockReturnValue(mockController);
    const { setSearch, openCreateModal, searchProjects } = mockController;

    it("select[ステータス] の onChange で setSearch が呼ばれる", () => {
        render(<Component />);

        const el = screen.getAllByRole("combobox")[0];

        fireEvent.change(el, { target: { value: "test" } });

        expect(setSearch).toHaveBeenCalled();
    });
    it("input[案件名] の onChange で setSearch が呼ばれる", () => {
        render(<Component />);

        const el = screen.getAllByRole("textbox")[0];

        fireEvent.change(el, { target: { value: "test" } });

        expect(setSearch).toHaveBeenCalled();
    });
    it("input[顧客名] の onChange で setSearch が呼ばれる", () => {
        render(<Component />);

        const el = screen.getAllByRole("textbox")[1];

        fireEvent.change(el, { target: { value: "test" } });

        expect(setSearch).toHaveBeenCalled();
    });

    it("ボタン '新規案件作成' を押すと openCreateModal が呼ばれる", () => {
        render(<Component />);

        fireEvent.click(screen.getByText("新規案件作成"));

        expect(openCreateModal).toHaveBeenCalled();
    });
    it("ボタン '検索' を押すと searchProjects が呼ばれる", () => {
        render(<Component />);

        fireEvent.click(screen.getByText("検索"));

        expect(searchProjects).toHaveBeenCalled();
    });
    //   it("ボタン 'クリア' を押すと  が呼ばれる", () => {
    //     render(
    //       <Component
    //       />
    //     );

    //     fireEvent.click(screen.getByText("クリア"));

    //   });
    //   it("ボタン '✏️' を押すと  が呼ばれる", () => {
    //     render(
    //       <Component
    //       />
    //     );

    //     fireEvent.click(screen.getByText("✏️"));

    //   });
});
