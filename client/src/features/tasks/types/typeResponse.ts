import Task from "../../../types/task.interface";

export type SuccessResponse =
    | { type: "list"; tasks: Task[] }
    | { type: "create"; task: Task }
    | { type: "bulkCreate"; tasks: Task[] }
    | { type: "update"; task: Task }
    | { type: "delete" };

export type ErrorResponse = {
    type: "error";
    error: string;
};

export type Response =
    | ({ success: true } & SuccessResponse)
    | ({ success: false } & ErrorResponse);