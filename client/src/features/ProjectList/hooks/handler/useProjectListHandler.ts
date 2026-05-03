import { Messages, getMessage } from "../../../../hooks/useMessage";
import { ProjectPayload } from "../../../../types/db/project";
import { useProjectApi } from "./useProjectApi";

export const useProjectListHandler = () => {
    const { createProject, updateProject, searchProjects } =
        useProjectApi();

    const handleValidate = (data: ProjectPayload) => {
        const errors = validate(data);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false;
        }
        return true;
    }

    const validate = (data: ProjectPayload): string[] => {
        const required = {
            id: getMessage(Messages.E0001, "ID"),
            name: getMessage(Messages.E0001, "案件名"),
            client: getMessage(Messages.E0001, "顧客名"),
            status: getMessage(Messages.E0001, "ステータス"),
            start_date: getMessage(Messages.E0001, "開始日"),
            end_date: getMessage(Messages.E0001, "終了日"),
            owner: getMessage(Messages.E0001, "担当者"),
        };

        const errors: string[] = [];

        (Object.keys(required) as (keyof ProjectPayload)[]).forEach((key) => {
            const message = required[key];
            if (!message) return;

            const value = data[key];
            if (!value || value.toString().trim() === "") {
                errors.push(message);
            }
        });

        if (data.start_date && data.end_date &&
            data.start_date > data.end_date) {
            errors.push(getMessage(Messages.E0003, "開始日", "終了日"));
        }
        return errors;
    };

    const handleSubmit = async (mode: string, payload: ProjectPayload) => {
        if (mode === "new") {
            await createProject(payload);
        } else if (mode === "edit") {
            await updateProject(payload);
        }
    }


    return {
        handleValidate, handleSubmit, searchProjects,
    }
}