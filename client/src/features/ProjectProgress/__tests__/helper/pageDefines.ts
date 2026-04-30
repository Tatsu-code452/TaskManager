import { PageDefines } from "../../../../test-utils/pageUtils/types";

export const pageDefines: Record<string, PageDefines> = {
    page: {
        type: "testId",
        target: "ProjectProgressPage",
    },
    pageInputs: {
        type: "testId",
        target: "range_area",
    },
    table: {
        type: "testId",
        target: "gantt_root",
    },
    tableHeadler: {
        type: "testId",
        target: "table_header",
    },
    tableBody: {
        type: "testId",
        target: "table_body",
    },
} as const;