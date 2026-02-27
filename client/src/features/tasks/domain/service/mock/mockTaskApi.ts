// mockTaskApi.ts
import Task from "../../../../../types/task.interface";
import { mockTasks as _mockTasks, nextId as _nextId } from "./mockTasks";

let nextId = _nextId;
let mockTasks = _mockTasks;

export const mockTaskApi = {
  async listTasks(): Promise<Task[]> {
    return [...mockTasks];
  },

  async createTask(task: Partial<Task>): Promise<Task> {
    const newTask: Task = {
      id: nextId++,
      name: task.name ?? "No Name",
      project_id: task.project_id ?? 1,
      phase_id: task.phase_id ?? 1,
      category_id: task.category_id ?? 1,
      user_id: task.user_id ?? 1,
      planned_start_date: task.planned_start_date ?? null,
      planned_end_date: task.planned_end_date ?? null,
      planned_effort: task.planned_effort ?? 0,
      actual_start_date: task.actual_start_date ?? null,
      actual_end_date: task.actual_end_date ?? null,
      actual_effort: task.actual_effort ?? 0,
      status_id: task.status_id ?? 1,
      progress_rate: task.progress_rate ?? 0,
      priority: task.priority ?? 1,
      pre_task_id: task.pre_task_id ?? null,
      next_task_id: task.next_task_id ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockTasks.push(newTask);
    return newTask;
  },

  async createTasks(tasks: Partial<Task>[]): Promise<Task[]> {
    const created: Task[] = [];
    for (const t of tasks) {
      created.push(await this.createTask(t));
    }
    return created;
  },

  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Task not found");

    mockTasks[index] = {
      ...mockTasks[index],
      ...task,
      updated_at: new Date().toISOString(),
    };

    return mockTasks[index];
  },

  async deleteTask(id: number): Promise<void> {
    mockTasks = mockTasks.filter(t => t.id !== id);
  },
};