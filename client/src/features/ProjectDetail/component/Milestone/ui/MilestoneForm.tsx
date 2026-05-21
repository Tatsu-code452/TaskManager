import Button from "@components/Button/Button";
import InputSelector from "@components/InputSelector";
import Modal from "@components/Modal/Modal";
import { MilestonePayload, MilestoneStatus } from "@comtypes/db/milestone";
import { InputConfig } from "@comtypes/inputConfig";
import { MilestoneStatusLabel } from "@features/ProjectDetail/component/Milestone/types/milestone";
import { ModalState } from "@hooks/useModal";
import { memo } from "react";
import styles from "./MilestoneForm.module.css";

type Props = {
    state: ModalState<MilestonePayload, string>;
    onChange: <K extends keyof MilestonePayload>(
        key: K,
        value: MilestonePayload[K],
    ) => void;
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

export type MilestoneFormKeys =
    | "title"
    | "status"
    | "start_date"
    | "end_date"
    | "progress"
    | "owner"
    | "description";

const createInputs = (
    form: MilestonePayload,
): Record<MilestoneFormKeys, InputConfig<keyof MilestonePayload>> => ({
    title: { key: "title", label: "タイトル", type: "text", value: form.title },
    status: {
        key: "status",
        label: "ステータス",
        type: "select",
        value: form.status,
        options: Object.values(MilestoneStatus) as MilestoneStatus[],
        labelMap: MilestoneStatusLabel,
    },
    start_date: {
        key: "start_date",
        label: "開始日",
        type: "date",
        value: form.start_date,
    },
    end_date: {
        key: "end_date",
        label: "終了日",
        type: "date",
        value: form.end_date,
    },
    progress: {
        key: "progress",
        label: "進捗率",
        type: "number",
        value: form.progress.toString(),
    },
    owner: { key: "owner", label: "担当者", type: "text", value: form.owner },
    description: {
        key: "description",
        label: "備考",
        type: "textarea",
        value: form.description,
    },
});

export const MilestoneForm = ({
    state,
    onChange,
    onSubmit,
    onClose,
}: Props) => {
    const inputs = createInputs(state.data.form);

    return (
        <Modal title={modeLabel[state.data.mode].title} onClose={onClose}>
            <div className={styles.form_container}>
                {/* 基本情報 */}
                <div className={styles.section_label}>基本情報</div>
                <div className={`${styles.form_grid} ${styles.input_group}`}>
                    <InputSelector input={inputs.title} onChange={onChange} />
                    <InputSelector input={inputs.status} onChange={onChange} />
                </div>

                {/* スケジュール */}
                <div className={styles.section_label}>スケジュール</div>
                <div className={`${styles.form_grid} ${styles.input_group}`}>
                    <InputSelector
                        input={inputs.start_date}
                        onChange={onChange}
                    />
                    <InputSelector
                        input={inputs.end_date}
                        onChange={onChange}
                    />
                </div>

                {/* 進捗 */}
                <div className={styles.section_label}>進捗</div>
                <div className={`${styles.form_grid} ${styles.input_group}`}>
                    <InputSelector
                        input={inputs.progress}
                        onChange={onChange}
                    />
                    <InputSelector input={inputs.owner} onChange={onChange} />
                </div>

                {/* 備考 */}
                <div className={styles.section_label}>備考</div>
                <div className={`${styles.form_full} ${styles.input_group}`}>
                    <InputSelector
                        input={inputs.description}
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className={styles.modal_footer}>
                <Button variant="primary" onClick={onSubmit}>
                    {modeLabel[state.data.mode].submit}
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    キャンセル
                </Button>
            </div>
        </Modal>
    );
};

export default memo(MilestoneForm);
