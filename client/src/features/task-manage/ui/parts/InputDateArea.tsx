import React from "react";
import { Button } from "../../../../components/Button";
import styles from "../style.module.css";
import InputDate from "./InputDate";

interface InputDateAreaProps {
    from: string;
    to: string;
    baseDate: string;
    setFrom: (value: string) => void;
    setTo: (value: string) => void;
    setBaseDate: (value: string) => void;
    onClick: () => void;
}

export const InputDateArea = ({
    from,
    to,
    baseDate,
    setFrom,
    setTo,
    setBaseDate,
    onClick,
}: InputDateAreaProps) => {
    return (
        <div className={styles.input_area_wrapper}>
            <InputDate label="表示範囲 From:" value={from} onChange={setFrom} />
            <InputDate label="表示範囲 To:" value={to} onChange={setTo} />
            <InputDate
                label="基準日:"
                value={baseDate}
                onChange={setBaseDate}
            />
            <Button
                children="計画割付"
                type="button"
                variant="primary"
                onClick={onClick}
            />
        </div>
    );
};

export default React.memo(InputDateArea);
