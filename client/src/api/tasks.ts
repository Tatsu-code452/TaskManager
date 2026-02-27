import Task from "../types/task.interface";
import { request } from "./fetchHelper";

export async function listTasks(): Promise<Task[]> {
  const res = await request<{ data: Task[] }>("/tasks", { method: "GET" });
  return res.data;
}

export async function getTask(id: number | string): Promise<Task> {
  const res = await request<{ data: Task }>(`/tasks/${id}`, { method: "GET" });
  return res.data;
}

export async function createTask(data: Partial<Task>): Promise<Task> {
  const res = await request<{ task: Task }>("/tasks", { method: "POST", body: { data } });
  return res.task;
}
export async function createTasks(data: Partial<Task>[]): Promise<Task[]> {
  const res = await request<{ tasks: Task[] }>("/tasks", { method: "POST", body: { data } });
  return res.tasks;
}

export async function updateTask(id: number | string, data: Partial<Task>): Promise<Task> {
  const res = await request<{ updated: Task }>(`/tasks/${id}`, { method: "PUT", body: { data } });
  return res.updated;
}

export async function removeTask(id: number | string): Promise<Task> {
  const res = await request<{ deleted: Task }>(`/tasks/${id}`, { method: "DELETE" });
  return res.deleted;
}
