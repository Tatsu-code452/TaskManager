import {
    InputProps,
    InputRenderer,
} from "@components/Input/InputRendererExtend";
import React, { useId } from "react";
import styles from "./Input.module.css";

export const Input = (props: InputProps) => {
    const id = useId();
    const { type, label, className } = props;
    const Renderer = InputRenderer[type];
    return (
        <div
            className={`${styles.detail_row} ${className ?? ""}`}
            style={{ whiteSpace: "pre-wrap" }}
        >
            {label && (
                <label htmlFor={id} className={styles.detail_label}>
                    {label}
                </label>
            )}
            {Renderer({ ...props, id })}
        </div>
    );
};

export default React.memo(Input);
