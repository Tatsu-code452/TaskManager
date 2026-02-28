// src/mock/mockModel.ts
import { TaskApiRequest } from "../../types/api";
import { TaskModel } from "../../types/model";
import { toTaskModel } from "../toTaskModel";
import { fetchTasks } from "./mockApi";

export const mockLoadTaskModels = (params: TaskApiRequest, baseDate: string): TaskModel[] => {
    const apiTasks = fetchTasks(params);
    return apiTasks.map(t => toTaskModel(t, baseDate));
};