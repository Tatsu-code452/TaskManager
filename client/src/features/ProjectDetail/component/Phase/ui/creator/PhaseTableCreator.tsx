import {
    col,
    createTable,
    TableDefinition,
} from "@components/GridTable/GridTableDefCreatorExtend";
import { PhaseRow } from "@comtypes/db/phase";
import { PhaseStatusLabel } from "@features/ProjectDetail/component/Phase/types/phase";

export const tableCreator = (
    onRemove: (id: string) => void,
    openEdit: (m: PhaseRow) => void,
): TableDefinition => {
    const createCol = col<Partial<PhaseRow>>();
    return createTable()
        .add(createCol.text("No", (d) => d.order.toString()))
        .add(
            createCol.text("名称", (d) => d.name, {
                width: "minmax(min-content, 20rem)",
            }),
        )
        .add(createCol.badge("ステータス", (d) => d.status, PhaseStatusLabel))
        .add(createCol.date("開始日", (d) => d.start_date))
        .add(createCol.date("終了日", (d) => d.end_date))
        .add(
            createCol.texts("Input", (d) => d.inputs, {
                width: "minmax(min-content, 28rem)",
            }),
        )
        .add(
            createCol.texts("Output", (d) => d.outputs, {
                width: "minmax(min-content, 28rem)",
            }),
        )
        .add(createCol.action("", openEdit, "✎", { cellClass: "editBtn" }))
        .add(createCol.action("", (d) => onRemove(d.id), "🗑"))
        .setRowProps({
            onDoubleClick: (e) => {
                const btn = e.currentTarget.querySelector(
                    ":scope .editBtn",
                ) as HTMLElement | null;
                btn?.click();
            },
        })
        .build();
};
