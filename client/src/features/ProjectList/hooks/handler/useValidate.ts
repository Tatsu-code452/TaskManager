import { ProjectPayload } from "@comtypes/db/project";
import { getMessage, Messages } from "@hooks/useMessage";

const required: Record<string, string> = {
    id: getMessage(Messages.E0001, "ID"),
    name: getMessage(Messages.E0001, "案件名"),
    client: getMessage(Messages.E0001, "顧客名"),
    status: getMessage(Messages.E0001, "ステータス"),
    start_date: getMessage(Messages.E0001, "開始日"),
    end_date: getMessage(Messages.E0001, "終了日"),
    owner: getMessage(Messages.E0001, "担当者"),
};

export const useValidate = () => {

    const handleValidate = (data: ProjectPayload) => {
        const errors = validate(data);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false;
        }
        return true;
    }

    const validateRequired = (
        key: string,
        data: ProjectPayload
    ): string | undefined => {
        const message = required[key];
        if (!message) return undefined;

        const value: string = data[key]?.toString().trim();
        if (value === "") {
            return message;
        }
    }

    const validate = (data: ProjectPayload): string[] => {

        const errors: string[] = [];

        Object.keys(required).forEach((key) => {
            const message = validateRequired(key, data);
            if (message) errors.push(message);
        });

        if (data.start_date && data.end_date &&
            data.start_date > data.end_date) {
            errors.push(getMessage(Messages.E0003, "開始日", "終了日"));
        }
        return errors;
    };

    return {
        handleValidate,
    }
}
