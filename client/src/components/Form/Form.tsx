import Button from "@components/Button/Button";
import {
    createFormCreator,
    OnChange,
    Payload,
    SectionDefinitions
} from "@components/Form/FormCreator";
import Modal from "@components/Modal/Modal";
import Section from "@components/Section/Section";
import { ModalState } from "@hooks/useModal";
import { memo } from "react";
import styles from "./Form.module.css";

type Labels = { title: string; submit: string };
const ModeLabel: Record<"new" | "edit", Labels> = {
    new: {
        title: "新規作成",
        submit: "作成",
    },
    edit: {
        title: "編集",
        submit: "更新",
    },
};

type Props = {
    state: ModalState<Payload, string>;
    sectionDefinition: SectionDefinitions;
    onChange: OnChange;
    onSubmit: () => void;
    onClose: () => void;
};

export const Form = ({
    state,
    sectionDefinition,
    onChange,
    onSubmit,
    onClose,
}: Props) => {
    const sections = createFormCreator()(sectionDefinition).build(
        state.data.form,
        onChange,
    );

    return (
        <Modal title={ModeLabel[state.data.mode].title} onClose={onClose}>
            <div className={styles.form_container}>
                {Object.entries(sections).map(([key, section], index) => (
                    <Section
                        key={`section_${key}_${index}`}
                        section={section}
                    />
                ))}
            </div>

            <div className={styles.modal_footer}>
                <Button variant="primary" onClick={onSubmit}>
                    {ModeLabel[state.data.mode].submit}
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    キャンセル
                </Button>
            </div>
        </Modal>
    );
};

export default memo(Form);
