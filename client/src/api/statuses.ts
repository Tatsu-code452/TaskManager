import { Status } from "../types/status.interface";
import { request } from "./fetchHelper";

export async function listStatuses(): Promise<Status[]> {
  const res = await request<{ data: Status[] }>("/statuses", { method: "GET" });
  return res.data;
}

export async function getStatus(id: number | string): Promise<Status> {
  const res = await request<{ data: Status }>(`/statuses/${id}`, { method: "GET" });
  return res.data;
}

export async function createStatus(data: Partial<Status>): Promise<Status> {
  const res = await request<{ status: Status }>("/statuses", { method: "POST", body: { data } });
  return res.status;
}

export async function updateStatus(id: number | string, data: Partial<Status>): Promise<any> {
  const res = await request<{ updated: any }>(`/statuses/${id}`, { method: "PUT", body: { data } });
  return res.updated;
}

export async function removeStatus(id: number | string): Promise<any> {
  const res = await request<{ deleted: any }>(`/statuses/${id}`, { method: "DELETE" });
  return res.deleted;
}
