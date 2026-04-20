import React from "react";
import { GanttParams } from "../../../types/contract";
import { GanttDragController } from "../../../types/uiApi";
import styles from "./styles.module.css";

interface CellDragHandleProps {
    params: GanttParams;
    isStart: boolean; // このセルがバーの開始日か
    isEnd: boolean; // このセルがバーの終了日か
    onPointerDown: GanttDragController["onPointerDown"];
}

export const CellDragHandle = ({
    params,
    isStart,
    isEnd,
    onPointerDown,
}: CellDragHandleProps) => {
    return (
        <>
            {isStart && (
                <div
                    data-edge="start-edge"
                    className={styles.handle_left}
                    onPointerDown={(e) =>
                        onPointerDown(
                            {
                                ...params,
                                mode: "resize",
                                edge: "start",
                            },
                            e,
                        )
                    }
                />
            )}
            {isEnd && (
                <div
                    data-edge="end-edge"
                    className={styles.handle_right}
                    onPointerDown={(e) =>
                        onPointerDown(
                            {
                                ...params,
                                mode: "resize",
                                edge: "end",
                            },
                            e,
                        )
                    }
                />
            )}
        </>
    );
};

export default React.memo(CellDragHandle);
