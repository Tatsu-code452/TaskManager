import React from "react";
import { GanttParams } from "../../../types/contract";
import { GanttDragController } from "../../../types/uiApi";
import styles from "./styles.module.css";

interface CellDragHandleProps {
    params: GanttParams;
    isStart: boolean; // このセルがバーの開始日か
    isEnd: boolean; // このセルがバーの終了日か
    onPointerDown: GanttDragController["onPointerDown"];
    updateCurrentDate: (date: string) => void; // ★ dragData を更新する関数
}

export const CellDragHandle = ({
    params,
    isStart,
    isEnd,
    onPointerDown,
    updateCurrentDate,
}: CellDragHandleProps) => {
    return (
        <>
            {isStart && (
                <div
                    data-edge="start-edge"
                    className={styles.handle_left}
                    onPointerEnter={() => updateCurrentDate(params.date)}
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
                    onPointerEnter={() => updateCurrentDate(params.date)}
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
