// src/mock/mockModel.ts
import { TaskModel } from "../../types/model";
import { toTaskModel } from "../toTaskModel";
import { mockFetchTasks } from "./mockApi";

export const mockLoadTaskModels = (from: string, to: string, baseDate: string): TaskModel[] => {
    const apiTasks = mockFetchTasks(from, to);
    return apiTasks.map(t => toTaskModel(t, baseDate));
};