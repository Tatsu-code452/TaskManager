import { isDelayedCell } from "../../../domain/isDelayed";
import { TaskModel } from "../../../types/model";
import { EditTarget } from "../../../types/types";
import styles from "../table.module.css";

interface MatrixCellProps {
    value: number | null;
    task: TaskModel;
    baseDate: string;
    editTarget: EditTarget;
    currentEditTarget: EditTarget;
    handleKeyDownCell: (e) => void;
    handleChangeCell: (target: EditTarget, newValue: number) => Promise<void>;
    startEdit: (editTarget: EditTarget) => void;
    endEdit: () => void;
    onDragMove: (args: {
        taskId: string;
        fromDate: string;
        toDate: string;
        type: string;
    }) => Promise<void>;
    onDragResize: (args: {
        taskId: string;
        toDate: string;
        type: string;
        edge: string;
    }) => Promise<void>;
}

const isEditingTarget = (current: EditTarget, edit: EditTarget) => {
    if (!current) return false;
    if (current.type !== edit.type) return false;

    // actualProgress は日付を見ない
    if (current.type === "actualProgress" || edit.type === "actualProgress") {
        return current.taskIndex === edit.taskIndex;
    }

    return current.taskIndex === edit.taskIndex && current.date === edit.date;
};

const buildStyleList = (
    value: number | null,
    isPlan: boolean,
    isActual: boolean,
    isDelayed: boolean,
    editTarget: EditTarget,
    baseDate: string,
) => {
    const list = [styles.matrix_cell];

    if (editTarget.type === "actualProgress") return list;

    if (value && isPlan) list.push(styles.plan_bar);
    if (value && isActual) list.push(styles.actual_bar);
    if (value && editTarget.date === baseDate) list.push(styles.today);
    if (isDelayed) list.push(styles.delay_bar);

    return list;
};

const setDragData = (
    e: React.DragEvent,
    editTarget: EditTarget,
    extra: Record<string, string> = {},
) => {
    if (editTarget.type === "actualProgress") return;

    e.dataTransfer.setData("type", editTarget.type);
    e.dataTransfer.setData("taskId", editTarget.taskIndex);
    e.dataTransfer.setData("date", editTarget.date);

    Object.entries(extra).forEach(([k, v]) => e.dataTransfer.setData(k, v));
};

const Cell = ({
    isBarStart,
    isBarEnd,
    isEditing,
    editTarget,
    value,
    endEdit,
    handleChangeCell,
}: {
    isBarStart: boolean;
    isBarEnd: boolean;
    isEditing: boolean;
    editTarget: EditTarget;
    value: number | null;
    endEdit: () => void;
    handleChangeCell: (target: EditTarget, newValue: number) => Promise<void>;
}) => (
    <>
        {/* 左端ハンドル */}
        {isBarStart && (
            <div
                className={styles.handle_left}
                draggable
                onDragStart={(e) =>
                    setDragData(e, editTarget, { edge: "start" })
                }
            />
        )}

        {/* 右端ハンドル */}
        {isBarEnd && (
            <div
                className={styles.handle_right}
                draggable
                onDragStart={(e) => setDragData(e, editTarget, { edge: "end" })}
            />
        )}

        {isEditing ? (
            <input
                className={styles.input_cell}
                autoFocus
                defaultValue={value ?? ""}
                onBlur={endEdit}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleChangeCell(
                            editTarget,
                            Number(e.currentTarget.value),
                        );
                    }
                }}
            />
        ) : (
            (value ?? "")
        )}
    </>
);

export const MatrixCell = ({
    value,
    task,
    baseDate,
    editTarget,
    currentEditTarget,
    handleKeyDownCell,
    handleChangeCell,
    startEdit,
    endEdit,
    onDragMove,
    onDragResize,
}: MatrixCellProps) => {
    // -------------------------
    // 判定ロジック
    // -------------------------
    const isEditing = isEditingTarget(currentEditTarget, editTarget);
    const isDelayed = isDelayedCell(task, baseDate);
    const isPlan = editTarget.type === "planCell";
    const isActual = editTarget.type === "actualCell";
    const isBarStart =
        (isPlan && editTarget.date === task.plan.start) ||
        (isActual && editTarget.date === task.actual.start);
    const isBarEnd =
        (isPlan && editTarget.date === task.plan.end) ||
        (isActual && editTarget.date === task.actual.end);

    // -------------------------
    // スタイル構築
    // -------------------------
    const styleList = buildStyleList(
        value,
        isPlan,
        isActual,
        isDelayed,
        editTarget,
        baseDate,
    );

    // -------------------------
    // Drag helpers
    // -------------------------
    const handleDrop = (e) => {
        if (editTarget.type === "actualProgress") return;

        const taskId = e.dataTransfer.getData("taskId");
        const fromDate = e.dataTransfer.getData("date");
        const type = e.dataTransfer.getData("type");
        const edge = e.dataTransfer.getData("edge");
        const toDate = e.currentTarget.dataset.date;

        if (edge) {
            onDragResize({ taskId, toDate, type, edge });
        } else {
            onDragMove({ taskId, fromDate, toDate, type });
        }
    };

    return (
        <td
            className={styleList.join(" ")}
            data-type={editTarget.type}
            data-task-index={editTarget.taskIndex}
            data-date={
                editTarget.type === "actualProgress" ? "" : editTarget.date
            }
            onKeyDown={handleKeyDownCell}
            onClick={() => startEdit(editTarget)}
            draggable={isPlan || isActual}
            onDragStart={(e) => setDragData(e, editTarget)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <Cell
                isBarStart={isBarStart}
                isBarEnd={isBarEnd}
                isEditing={isEditing}
                editTarget={editTarget}
                value={value}
                endEdit={endEdit}
                handleChangeCell={handleChangeCell}
            />
        </td>
    );
};
