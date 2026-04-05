import { fireEvent, waitFor, within } from "@testing-library/react";
import { MockedFunction } from "vitest";
import { ProjectRow, ProjectSearchCondition, ProjectSearchResult } from "../../../types/db/project";
import { PageOptions } from "./page";

export const actionPage = (page: PageOptions) => {
    return {
        setListMock: (
            listMock: MockedFunction<(condition?: ProjectSearchCondition, page?: number, limit?: number)
                => Promise<ProjectSearchResult>>,
            items: ProjectRow[],
            totalPages: number
        ) => {
            listMock.mockResolvedValueOnce({ items, total_pages: totalPages });
        },
        clickCreate: () => {
            fireEvent.click(page.createButton);
        },
    };
}

export const actionSearch = (page: PageOptions) => {
    const search = page.search;

    return {
        clickSearch: () => {
            fireEvent.click(search.searchButton());
        },
        clickClear: () => {
            fireEvent.click(search.clearButton());
        },
        inputSearch: (label: string, value: string) => {
            fireEvent.input(search.input(label), {
                target: { value },
            });
        },
        openSelect: (label: string) => {
            fireEvent.mouseDown(search.select(label));
        },
    };
}

export const actionTable = (page: PageOptions) => {
    const table = page.table;

    return {
        clickRow: async (project: ProjectRow) => {
            fireEvent.click(await table.rowByText(project.id));
        },
        clickEdit: async () => {
            fireEvent.click(await table.editButton());
        }
    };
}

export const actionModal = async (page: PageOptions) => {
    const modal = await page.modal;

    return {
        input: async (label: string, value: string) => {
            fireEvent.input(modal.input(label), {
                target: { value },
            });
        },
        inputDate: async (label: string, value: string) => {
            fireEvent.input(modal.input(label), {
                target: { value },
            });
            return self;
        },
        async inputAll(fields: Partial<ProjectRow>) {
            if (fields.name)
                fireEvent.input(modal.input("案件名"), {
                    target: { value: fields.name },
                });

            if (fields.id)
                fireEvent.input(modal.input("ID"), {
                    target: { value: fields.id },
                });

            if (fields.client)
                fireEvent.input(modal.input("顧客名"), {
                    target: { value: fields.client },
                });

            if (fields.start_date)
                fireEvent.input(modal.date("開始日"), {
                    target: { value: fields.start_date },
                });

            if (fields.end_date)
                fireEvent.input(modal.date("終了日"), {
                    target: { value: fields.end_date },
                });

            if (fields.owner)
                fireEvent.input(modal.input("担当者"), {
                    target: { value: fields.owner },
                });

            // 入力反映待ち
            await waitFor(() => {
                if (fields.name) {
                    expect(modal.input("案件名")).toHaveValue(
                        fields.name,
                    );
                }
            });
        },
        async clickCreate() {
            fireEvent.click(modal.createButton());
        },
        async clickUpdate() {
            fireEvent.click(modal.updateButton());
        },
        async clickClose() {
            fireEvent.click(modal.cancelButton());
            await waitFor(() => {
                expect(within(page.all).queryByRole("dialog")).not.toBeInTheDocument();
            });
        }
    }
}

export const actionPagination = (page: PageOptions) => {
    const pagination = page.pagination;
    return {
        clickNext: () => {
            fireEvent.click(pagination.next())
        },
        clickPrev: () => {
            fireEvent.click(pagination.prev())
        },
    }
}