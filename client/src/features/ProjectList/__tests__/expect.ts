import { ProjectStatus } from "../../../types/db/project";
import { ProjectStatusLabel } from "../types/model";
import { defineExpect } from "./expectUtils";
import { PageOptions } from "./page";

const expectDefines = {
    search: [
        {
            name: "init", type: "search", params: [],
            tests: [
                { type: "haveValue", target: "input", params: ["案件名", ""] },
                { type: "haveValue", target: "input", params: ["顧客名", ""] },
                { type: "haveValue", target: "select", params: ["ステータス", "ProjectStatus.All"] },
                { type: "haveText", target: "selectedOption", params: ["ステータス", ""] },
            ]
        },
        {
            name: "optionLabel", type: "optionLabel", params: [],
            tests: [
                {
                    type: "equal", target: "labels", params: ["ステータス", "計画中",
                        "実行中",
                        "休止",
                        "完工",
                        "アーカイブ済",
                        "",
                    ]
                },
            ]
        }
    ],
    table: [
        {
            name: "searchRow", type: "searchRow", params: ["project", "ProjectStatusLabel"],
            tests: [
                { type: "inDocumentRow", target: "textGet", key: "project.id", params: ["rowByText", "project.id"] },
                { type: "inDocumentRow", target: "textGet", key: "project.id", params: ["rowByText", "project.name"] },
                { type: "inDocumentRow", target: "textGet", key: "project.id", params: ["rowByText", "project.client"] },
                { type: "inDocumentRow", target: "textGet", key: "project.id", params: ["rowByText", "ProjectStatusLabel[project.status]"] },
                { type: "inDocumentRow", target: "textGet", key: "project.id", params: ["rowByText", "${project.start_date} 〜 ${project.end_date}"] },
                { type: "inDocumentRow", target: "textGet", key: "project.id", params: ["rowByText", "project.owner"] },
            ]
        },
        {
            name: "navigate", type: "navigate", params: [],
            tests: [
                { type: "mockCalled", target: "", params: [] },
            ]
        }
    ],
    modal: [
        {
            name: "editModal", type: "modalCheck",
            tests: [
                { type: "inDocument", target: "text", params: ["編集"] },
                { type: "inDocument", target: "button", params: ["updateButton"] }
            ]
        },
        {
            name: "createModal", type: "modalCheck",
            tests: [
                { type: "inDocument", target: "text", params: ["新規作成"] },
                { type: "inDocument", target: "button", params: ["createButton"] }
            ]
        },
    ],
    wait: [
        {
            name: "mockCalled", type: "calledTimes", params: [],
            tests: [
                { type: "calledTimes", target: "", params: [] }
            ]
        },
        {
            name: "noModal", type: "notInDocument", params: ["all"],
            tests: [
                { type: "notInDocument", target: "role", params: ["all", "dialog"] }
            ]
        }
    ],
    pagination: [
        {
            name: "result", type: "paginationCheck", params: ["num"],
            tests: [
                { type: "inDocument", target: "text", params: ["${num} 件の結果"] }
            ]
        },
        {
            name: "page", type: "paginationCheck", params: ["page", "totalPages"],
            tests: [
                { type: "inDocument", target: "textGet", params: ["info", "${page} / ${totalPages}"] }
            ]
        },
        {
            name: "disablePrev", type: "paginationCheck", params: [],
            tests: [
                { type: "disabled", target: "button", params: ["prev"] }
            ]
        },
        {
            name: "disableNext", type: "paginationCheck", params: [],
            tests: [
                { type: "disabled", target: "button", params: ["next"] }
            ]
        }
    ]
} as const

export const expectWait = () => {
    return {
        // async mockCalled(mockFn: Mock, times: number) {
        //     await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(times));
        // },
        // async noModal(page: PageOptions) {
        //     await waitFor(() => {
        //         expect(within(page.all).queryByRole("dialog")).not.toBeInTheDocument();
        //     });
        // },
        ...defineExpect(expectDefines["wait"])
    }
}

export const expectSearch = (page: PageOptions) => {
    const search = page.search;
    const helpers = { ProjectStatus };
    return {
        // init: () => {
        //     expect(search.input("案件名")).toHaveValue("");
        //     expect(search.input("顧客名")).toHaveValue("");

        //     expect(search.select("ステータス")).toHaveValue(ProjectStatus.All);
        //     expect(
        //         search.selectedOption("ステータス"),
        //     ).toHaveTextContent("");
        // },
        // optionLabel: () => {
        //     const options = search.options("ステータス");
        //     const labels = options.map((o) => o.textContent);

        //     expect(labels).toEqual([
        //         "計画中",
        //         "実行中",
        //         "休止",
        //         "完工",
        //         "アーカイブ済",
        //         "",
        //     ]);
        // }
        ...defineExpect(expectDefines["search"], search, helpers)
    };
}

export const expectTable = (page: PageOptions) => {
    const table = page.table;
    const helpers = { ProjectStatusLabel };
    return {
        // async searchRow(project: ProjectRow) {
        //     const row = await table.rowByText(project.id);
        //     const w = within(row);

        //     expect(w.getByText(project.id)).toBeInTheDocument();
        //     expect(w.getByText(project.name)).toBeInTheDocument();
        //     expect(w.getByText(project.client)).toBeInTheDocument();
        //     expect(
        //         w.getByText(ProjectStatusLabel[project.status]),
        //     ).toBeInTheDocument();
        //     expect(
        //         w.getByText(`${project.start_date} 〜 ${project.end_date}`),
        //     ).toBeInTheDocument();
        //     expect(w.getByText(project.owner)).toBeInTheDocument();
        // },
        // navigate: (navigateMock: Mock, url: string) => {
        //     expect(navigateMock).toHaveBeenCalledWith(url);
        // }
        ...defineExpect(expectDefines["table"], table, helpers)
    }
}

export const expectPagination = (page: PageOptions) => {
    const pagination = page.pagination;
    return {
        // result: (num: number) => {
        //     expect(
        //         pagination.text(`${num} 件の結果`),
        //     ).toBeInTheDocument();
        // },
        // page: (page: number, totalPages: number) => {
        //     expect(
        //         within(pagination.info()).getByText(`${page} / ${totalPages}`),
        //     ).toBeInTheDocument();
        // },
        // disablePrev: () => {
        //     expect(pagination.prev()).toBeDisabled();
        // },
        // disableNext: () => {
        //     expect(pagination.next()).toBeDisabled();
        // }
        ...defineExpect(expectDefines["pagination"], pagination)
    }
}

export const expectModal = async (page: PageOptions) => {
    const modal = await page.modal;

    return {
        // editModal: async () => {
        //     expect(modal.text("編集")).toBeInTheDocument();
        //     expect(modal.updateButton()).toBeInTheDocument();
        // },
        // createModal: async () => {
        //     expect(modal.text("新規作成")).toBeInTheDocument();
        //     expect(modal.createButton()).toBeInTheDocument();
        // },
        ...defineExpect(expectDefines["modal"], modal)
    };
}
