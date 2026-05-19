import Button from "@components/Button";
import InputSelectors from "@components/InputSelectors";
import Modal from "@components/Modal/Modal";
import { MilestonePayload, MilestoneStatus } from "@comtypes/db/milestone";
import { InputConfig } from "@comtypes/inputConfig";
import { MilestoneStatusLabel } from "@features/ProjectDetail/component/Milestone/types/milestone";
import { ModalState } from "@hooks/useModal";
import { memo } from "react";
import styles from "./MilestoneUi.module.css";

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

const createInputs = (
    form: MilestonePayload,
): InputConfig<keyof MilestonePayload>[] => {
    return [
        { key: "title", label: "タイトル", type: "text", value: form.title },
        {
            key: "status",
            label: "ステータス",
            type: "select",
            value: form.status,
            options: Object.values(MilestoneStatus) as MilestoneStatus[],
            labelMap: MilestoneStatusLabel,
        },
        {
            key: "start_date",
            label: "開始日",
            type: "date",
            value: form.start_date,
        },
        {
            key: "end_date",
            label: "終了日",
            type: "date",
            value: form.end_date,
        },
        {
            key: "progress",
            label: "進捗率",
            type: "number",
            value: form.progress.toString(),
        },
        { key: "owner", label: "担当者", type: "text", value: form.owner },
        {
            key: "description",
            label: "備考",
            type: "textarea",
            value: form.description,
        },
    ];
};

export const MilestoneForm = ({
    state,
    onChange,
    onSubmit,
    onClose,
}: Props) => {
    return (
        <Modal title={modeLabel[state.data.mode].title} onClose={onClose}>
            <div>
                <InputSelectors
                    inputs={createInputs(state.data.form)}
                    onChange={onChange}
                />
            </div>

            <div className={styles.detail_buttons}>
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
