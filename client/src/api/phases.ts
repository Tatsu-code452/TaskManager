import Phase from "../types/phase.interface";
import { request } from "./fetchHelper";

export async function listPhases(): Promise<Phase[]> {
  const res = await request<{ data: Phase[] }>("/phases", { method: "GET" });
  return res.data;
}

export async function getPhase(id: number | string): Promise<Phase> {
  const res = await request<{ data: Phase }>(`/phases/${id}`, { method: "GET" });
  return res.data;
}

export async function createPhase(data: Partial<Phase>): Promise<Phase> {
  const res = await request<{ phase: Phase }>("/phases", { method: "POST", body: { data } });
  return res.phase;
}

export async function updatePhase(id: number | string, data: Partial<Phase>): Promise<any> {
  const res = await request<{ updated: any }>(`/phases/${id}`, { method: "PUT", body: { data } });
  return res.updated;
}

export async function removePhase(id: number | string): Promise<any> {
  const res = await request<{ deleted: any }>(`/phases/${id}`, { method: "DELETE" });
  return res.deleted;
}
