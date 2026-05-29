import { Input } from "@components/Input/InputExtend";
import { InputProps } from "@components/Input/InputRendererExtend";
import { memo } from "react";
import styles from "./Section.module.css";

export type InputPropsWithKey = InputProps & { key: string };
export type SectionType = {
    title: string;
    inputs: InputPropsWithKey[];
};

type Props = {
    section: SectionType;
};

export const Section = ({ section }: Props) => {
    return (
        <>
            <div className={styles.section_label}>{section.title}</div>
            <div className={`${styles.form_grid} ${styles.input_group}`}>
                {section.inputs.map(({ key, ...rest }, index) => (
                    <Input key={`section_${key}_${index}`} {...rest} />
                ))}
            </div>
        </>
    );
};

export default memo(Section);
