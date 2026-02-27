import React from "react";
import { TaskRowEditForm } from "../../../types/types";
import styles from "./detail.module.css";

type TaskDetailItemProps =
    | {
          mode: "view";
          label: string;
          value: string | number;
      }
    | {
          mode: "edit";
          editId: keyof TaskRowEditForm;
          label: string;
          value: string | number;
          onChange: (
              key: keyof TaskRowEditForm,
              value: string | number,
          ) => void;
          inputType?: "text" | "number" | "date";
      };

export const TaskDetailItem = (props: TaskDetailItemProps) => {
    const { label, value } = props;

    const valueContent =
        props.mode === "edit" ? (
            <input
                type={props.inputType ?? "text"}
                value={value}
                onChange={(e) => props.onChange(props.editId, e.target.value)}
            />
        ) : (
            <span>{value}</span>
        );

    return (
        <div className={styles.detailItem}>
            <label>{label}</label>
            {valueContent}
        </div>
    );
};

export default React.memo(TaskDetailItem);
