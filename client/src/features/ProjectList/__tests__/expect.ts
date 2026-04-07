import { ProjectStatus } from "../../../types/db/project";
import { ProjectStatusLabel } from "../types/model";
import { expectDefines } from "./expectDefines";
import { PageOptions } from "./page";
import { defineExpect } from "./test-utils/expect";

export const createExpect = (page: PageOptions) => ({
    search: defineExpect(expectDefines.search, page.search, { ProjectStatus }),
    table: defineExpect(expectDefines.table, page.table, { ProjectStatusLabel }),
    modal: async () => defineExpect(expectDefines.modal, await page.modal),
    pagination: defineExpect(expectDefines.pagination, page.pagination),
    wait: defineExpect(expectDefines.wait),
});


// export const expectWait = () => {
//     return {
//         ...defineExpect(expectDefines["wait"])
//     }
// }

// export const expectSearch = (page: PageOptions) => {
//     const search = page.search;
//     const helpers = { ProjectStatus };
//     return {
//         ...defineExpect(expectDefines["search"], search, helpers)
//     };
// }

// export const expectTable = (page: PageOptions) => {
//     const table = page.table;
//     const helpers = { ProjectStatusLabel };
//     return {
//         ...defineExpect(expectDefines["table"], table, helpers)
//     }
// }

// export const expectPagination = (page: PageOptions) => {
//     const pagination = page.pagination;
//     return {
//         ...defineExpect(expectDefines["pagination"], pagination)
//     }
// }

// export const expectModal = async (page: PageOptions) => {
//     const modal = await page.modal;
//     return {
//         ...defineExpect(expectDefines["modal"], modal)
//     };
// }
