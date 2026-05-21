import Button from "@components/Button/Button";
import InputSelectors from "@components/InputSelectors";
import Modal from "@components/Modal/Modal";
import { InputConfig } from "@comtypes/inputConfig";
import { memo } from "react";
import styles from "./Form.module.css";

type Props<K extends string, T extends Record<K, unknown>> = {
    mode: "new" | "edit";
    inputs: InputConfig<K>[];
    onChange: (key: K, value: T[K]) => void;
    onSubmit: () => void;
    onClose: () => void;
};

const modeLabel: Record<"new" | "edit", { title: string; submit: string }> = {
    new: {
        title: "新規作成",
        submit: "作成",
    },
    edit: {
        title: "編集",
        submit: "更新",
    },
};

export const Form = <K extends string, T extends Record<K, object>>({
    mode,
    inputs,
    onChange,
    onSubmit,
    onClose,
}: Props<K, T>) => {
    return (
        <Modal title={modeLabel[mode].title} onClose={onClose}>
            <div>
                <InputSelectors inputs={inputs} onChange={onChange} />
            </div>

            <div className={styles.detail_buttons}>
                <Button variant="primary" onClick={onSubmit}>
                    {modeLabel[mode].submit}
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    キャンセル
                </Button>
            </div>
        </Modal>
    );
};

export default memo(Form);
