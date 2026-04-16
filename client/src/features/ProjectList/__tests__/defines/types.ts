import { fireEvent, waitFor } from "@testing-library/react";
import { createAction } from "../../../../test-utils/action";
import { createExpect } from "../../../../test-utils/expect";
import { createPageOptions } from "../../../../test-utils/page";
import { ProjectRow, ProjectStatus } from "../../../../types/db/project";
import { ProjectStatusLabel } from "../../types/model";
import { actionDefines } from "./actionDefines";
import { expectDefines, } from "./expectDefines";
import { pageDefines } from "./pageDefines";


export type PageOptions = Awaited<ReturnType<typeof createPageOptions<typeof pageDefines>>>;
export type Expect = Awaited<ReturnType<typeof createExpect<PageOptions, typeof expectDefines, typeof expectParamRegistry>>>;
export type Action = ReturnType<typeof createAction<typeof actionDefines, typeof actionParamRegistry>>;


export const helperRegistry = {
    ProjectStatus,
    ProjectStatusLabel,
} as const;

export const expectParamRegistry = {
    project: {} as ProjectRow,
    mockedFn: {} as (...args: unknown[]) => unknown,
    with: {} as string,
    times: {} as number,
    num: {} as number,
    page: {} as number,
    totalPages: {} as number,
    pageObj: {} as PageOptions,
} as const;

export const assignToModal = async (page: PageOptions) => ({
    inputAll: async (fields: Partial<ProjectRow>) => {
        const modalPage = await page.modal();
        if (fields.name)
            fireEvent.input(modalPage.input("案件名"), {
                target: { value: fields.name },
            });

        if (fields.id)
            fireEvent.input(modalPage.input("ID"), {
                target: { value: fields.id },
            });

        if (fields.client)
            fireEvent.input(modalPage.input("顧客名"), {
                target: { value: fields.client },
            });

        if (fields.start_date)
            fireEvent.input(modalPage.date("開始日"), {
                target: { value: fields.start_date },
            });

        if (fields.end_date)
            fireEvent.input(modalPage.date("終了日"), {
                target: { value: fields.end_date },
            });

        if (fields.owner)
            fireEvent.input(modalPage.input("担当者"), {
                target: { value: fields.owner },
            });

        await waitFor(() => {
            if (fields.name) {
                expect(modalPage.input("案件名")).toHaveValue(fields.name);
            }
        });
    }
})

export const actionParamRegistry = {
    items: {} as ProjectRow[],
    total_num: {} as number,
    label: {} as string,
    value: {} as string,
    project: {} as ProjectRow,
} as const;
