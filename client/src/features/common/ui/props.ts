export type FormProps<T> = {
    form: T;
    onChange: (key: keyof T, value: unknown) => void;
    onSubmit: () => void;
    onClose?: () => void;
};
