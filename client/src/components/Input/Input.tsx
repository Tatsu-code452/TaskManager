import { InputRenderer } from "@components/Input/InputRenderer";
import { InputProps } from "@components/Input/types";
import React, { useId } from "react";
import styles from "./Input.module.css";

export const Input = <T extends string>(props: InputProps<T>) => {
    const id = useId();
    const Renderer = InputRenderer[props.type];

    return (
        <div
            className={`${styles.detail_row} ${props.rowClassName ?? ""}`}
            style={{ whiteSpace: "pre-wrap" }}
        >
            {props.label && (
                <label htmlFor={id} className={styles.detail_label}>
                    {props.label}
                </label>
            )}
            {Renderer(id, props)}
        </div>
    );
};

export default React.memo(Input);
