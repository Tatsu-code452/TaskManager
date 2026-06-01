import { Input } from "@components/Input/InputExtend";
import { InputProps } from "@components/Input/InputRendererExtend";
import { memo } from "react";
import styles from "./Section.module.css";

export type InputPropsWithKey = InputProps & { key: string };
export type CustomComponent = {
    key: string;
    render: () => React.ReactNode;
};
export type SectionItem = InputPropsWithKey | CustomComponent;

export type SectionType = {
    title: string;
    items: SectionItem[];
};

type Props = {
    section: SectionType;
};

export const Section = ({ section }: Props) => {
    return (
        <>
            <div className={styles.section_label}>{section.title}</div>
            <div className={`${styles.form_grid} ${styles.input_group}`}>
                {section.items.map((item, index) => {
                    if ("render" in item) {
                        return (
                            <div
                                key={`custom_${item.key}_${index}`}
                                style={{ gridColumn: "1 / 3" }}
                            >
                                {item.render()}
                            </div>
                        );
                    }
                    const { key, ...rest } = item;
                    return <Input key={`section_${key}_${index}`} {...rest} />;
                })}
            </div>
        </>
    );
};

export default memo(Section);
