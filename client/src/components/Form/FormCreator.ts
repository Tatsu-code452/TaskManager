import { InputPropsWithKey, SectionType } from "@components/Section/Section";

export type Payload = Record<string, unknown>;
export type SectionDefinitions = Record<string, SectionDefinition>;
export type OnChange = (key: PayloadKey, v: Payload[PayloadKey]) => void;

type PayloadKey = keyof Payload;
type SectionDefinition = {
    title: string;
    build: (form: Payload, change: OnChange) => InputPropsWithKey[];
};
type SectionTypes = Record<string, SectionType>;
type FormCreator = {
    build: (
        form: Payload,
        change: OnChange,
    ) => SectionTypes;
};

const createSectionTypes = (
    sections: SectionDefinitions,
    form: Payload,
    change: OnChange
): SectionTypes => {
    return Object.entries(sections).reduce(
        (acc, [key, sec]) => {
            acc[key] = {
                title: sec.title,
                inputs: sec.build(form, change),
            }
            return acc;
        }, {} as SectionTypes
    );
}

export const createFormCreator = () => {
    return (sections: SectionDefinitions): FormCreator => ({
        build: (form: Payload, change: OnChange) =>
            createSectionTypes(sections, form, change)
    })
};

export const input = {
    text: (
        key: PayloadKey,
        label: string,
        value: Payload[PayloadKey],
        change: OnChange,
    ): InputPropsWithKey => ({
        key: key as string,
        type: "text",
        label,
        value: value as string,
        onChange: (e) => change(key, e.target.value),
    }),

    textarea: (
        key: PayloadKey,
        label: string,
        value: Payload[PayloadKey],
        change: OnChange,
    ): InputPropsWithKey => ({
        key: key as string,
        type: "textarea",
        label,
        value: value as string,
        onChange: (e) => change(key, e.target.value),
    }),

    select: <Opt extends string>(
        key: PayloadKey,
        label: string,
        value: Payload[PayloadKey],
        options: readonly Opt[],
        labelMap: Record<Opt, string>,
        change: OnChange,
    ): InputPropsWithKey => ({
        key: key as string,
        type: "select",
        label,
        value: value as Opt,
        options,
        labelMap,
        onChange: (e) => change(key, e.target.value),
    }),

    date: (
        key: PayloadKey,
        label: string,
        value: Payload[PayloadKey],
        change: OnChange,
    ): InputPropsWithKey => ({
        key: key as string,
        type: "date",
        label,
        value: value as string,
        onChange: (e) => change(key, e.target.value),
    }),

    number: (
        key: PayloadKey,
        label: string,
        value: Payload[PayloadKey],
        change: OnChange,
    ): InputPropsWithKey => ({
        key: key as string,
        type: "number",
        label,
        value: String(value),
        onChange: (e) => change(key, Number(e.target.value)),
    }),
};
