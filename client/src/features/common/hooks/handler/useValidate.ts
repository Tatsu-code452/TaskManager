import { getMessage, Messages } from "@hooks/useMessage";

export const useValidate = <T extends object>(required: Record<string, string>) => {

    const handleValidate = (data: T) => {
        const errors = validate(data);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false;
        }
        return true;
    }

    const validateRequired = (
        key: string,
        data: T
    ): string | undefined => {
        const message = required[key];
        if (!message) return undefined;

        const value: string = data[key]?.toString().trim();
        if (value === "") {
            return message;
        }
    }

    const validate = (data: T): string[] => {

        const errors: string[] = [];

        Object.keys(required).forEach((key) => {
            const message = validateRequired(key, data);
            if (message) errors.push(message);
        });

        if ("start_date" in data && "end_date" in data &&
            data.start_date > data.end_date) {
            errors.push(getMessage(Messages.E0003, "開始日", "終了日"));
        }
        return errors;
    };

    return {
        handleValidate,
    }
}
