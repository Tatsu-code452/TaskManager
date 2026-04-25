import { CellPos } from "../../../../components/grid-table/types";
import { createMatrixCellRenderers } from "./cell/MatrixCellRenderers";

const cellRenderer = (pos: CellPos) => {
    const params = paramsFromPos(pos, taskOrder, dates);
    if (!params) return null;

    const renderers = createMatrixCellRenderers({
        params,
        value: getValue(params),
        task,
        baseDate,
        onPointerDown,
    });

    return (
        <MatrixCell
            params={params}
            {...renderers}
            editDispatch={editDispatch}
            editTarget={selectors.editTarget}
            taskOrder={taskOrder}
            dateList={dates}
        />
    );
};
