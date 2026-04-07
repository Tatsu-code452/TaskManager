import { ProjectStatus } from "../../../types/db/project";
import { ProjectStatusLabel } from "../types/model";

export const helpersMap = {
    search: { ProjectStatus },
    table: { ProjectStatusLabel },
    pagination: {},
    modal: {},
    wait: {},
} as const;

export const expectDefines = {
    search: [
        {
            name: "init",
            tests: [
                { type: "haveValue", method: "input", key: "案件名", expected: "" },
                { type: "haveValue", method: "input", key: "顧客名", expected: "" },
                { type: "haveValue", method: "select", key: "ステータス", expected: "ProjectStatus.All" },
                { type: "haveText", method: "selectedOption", key: "ステータス", expected: "" },
            ]
        },
        {
            name: "optionLabel",
            tests: [
                {
                    type: "equalOptions", method: "options", key: "ステータス",
                    expected: ["計画中",
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
            name: "searchRow", params: ["project"],
            tests: [
                { type: "inDocumentRow", method: "rowByText", key: "project.id", expected: "project.id" },
                { type: "inDocumentRow", method: "rowByText", key: "project.id", expected: "project.name" },
                { type: "inDocumentRow", method: "rowByText", key: "project.id", expected: "project.client" },
                { type: "inDocumentRow", method: "rowByText", key: "project.id", expected: "ProjectStatusLabel[project.status]" },
                { type: "inDocumentRow", method: "rowByText", key: "project.id", expected: "${project.start_date} 〜 ${project.end_date}" },
                { type: "inDocumentRow", method: "rowByText", key: "project.id", expected: "project.owner" },
            ]
        },
        {
            name: "navigate", params: ["mockedFn", "with"],
            tests: [
                { type: "calledWith" },
            ]
        }
    ],
    modal: [
        {
            name: "editModal",
            tests: [
                { type: "inDocument", method: "text", key: "編集" },
                { type: "inDocument", method: "updateButton" }
            ]
        },
        {
            name: "createModal",
            tests: [
                { type: "inDocument", method: "text", key: "新規作成" },
                { type: "inDocument", method: "createButton" }
            ]
        },
    ],
    wait: [
        {
            name: "mockCalled", params: ["mockedFn", "times"],
            tests: [
                { type: "calledTimes" }
            ]
        },
        {
            name: "noModal", params: ["page"],
            tests: [
                { type: "notInDocument", method: "all", key: "dialog" }
            ]
        }
    ],
    pagination: [
        {
            name: "result", params: ["num"],
            tests: [
                { type: "inDocument", method: "area", key: "${num} 件の結果" }
            ]
        },
        {
            name: "page", params: ["page", "totalPages"],
            tests: [
                { type: "inDocument", method: "info", key: "${page} / ${totalPages}" }
            ]
        },
        {
            name: "disablePrev", params: ["pagination"],
            tests: [
                { type: "disabled", method: "prev" }
            ]
        },
        {
            name: "disableNext", params: ["pagination"],
            tests: [
                { type: "disabled", method: "next" }
            ]
        }
    ]
} as const
