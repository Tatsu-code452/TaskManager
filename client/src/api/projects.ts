import { Project } from "../types/project.interface";
import { request } from "./fetchHelper";

export async function listProjects(): Promise<Project[]> {
  const res = await request<{ data: Project[] }>("/projects", { method: "GET" });
  return res.data;
}

export async function getProject(id: number | string): Promise<Project> {
  const res = await request<{ data: Project }>(`/projects/${id}`, { method: "GET" });
  return res.data;
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const res = await request<{ project: Project }>("/projects", { method: "POST", body: { data } });
  return res.project;
}

export async function updateProject(id: number | string, data: Partial<Project>): Promise<any> {
  const res = await request<{ updated: any }>(`/projects/${id}`, { method: "PUT", body: { data } });
  return res.updated;
}

export async function removeProject(id: number | string): Promise<any> {
  const res = await request<{ deleted: any }>(`/projects/${id}`, { method: "DELETE" });
  return res.deleted;
}
