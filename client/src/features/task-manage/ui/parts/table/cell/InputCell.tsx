import React, { useEffect, useState } from "react";
import { EditTarget } from "../../../../types/types";
import style from "../table.module.css";

interface InputCellProps {
    editTarget: EditTarget;
    currentValue: number;
    handleChangeCell: (target: EditTarget, newValue: number) => void;
    cancelEdit: () => void;
}

export const InputCell = ({
    editTarget,
    currentValue,
    handleChangeCell,
    cancelEdit,
}: InputCellProps) => {
    const [value, setValue] = useState(String(currentValue ?? ""));

    useEffect(() => {
        if (editTarget.pressedKey && /^[0-9]$/.test(editTarget.pressedKey)) {
            setValue(editTarget.pressedKey);
        }
    }, [editTarget]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab" || e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();

            const num = value === "" ? 0 : Number(value);
            handleChangeCell(editTarget, isNaN(num) ? 0 : num);

            const td = e.currentTarget.closest("td");
            if (!td) return;

            td.dispatchEvent(
                new KeyboardEvent("keydown", {
                    key: e.key,
                    shiftKey: e.shiftKey,
                    bubbles: true,
                }),
            );
        }
    };

    const onBlur = () => {
        cancelEdit();
    };

    return (
        <input
            className={style.input_cell}
            autoFocus
            type="number"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};

export default React.memo(InputCell);
