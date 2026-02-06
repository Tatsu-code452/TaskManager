import User from "../types/user.interface";
import { request } from "./fetchHelper";

export async function listUsers(): Promise<User[]> {
  const res = await request<{ data: User[] }>("/users", { method: "GET" });
  return res.data;
}

export async function getUser(id: number | string): Promise<User> {
  const res = await request<{ data: User }>(`/users/${id}`, { method: "GET" });
  return res.data;
}

export async function createUser(data: Partial<User>): Promise<User> {
  const res = await request<{ user: User }>("/users", { method: "POST", body: { data } });
  return res.user;
}

export async function updateUser(id: number | string, data: Partial<User>): Promise<User> {
  const res = await request<{ updated: User }>(`/users/${id}`, { method: "PUT", body: { data } });
  return res.updated;
}

export async function removeUser(id: number | string): Promise<User> {
  const res = await request<{ deleted: User }>(`/users/${id}`, { method: "DELETE" });
  return res.deleted;
}
