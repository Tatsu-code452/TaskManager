import Category from "../types/category.interface";
import { request } from "./fetchHelper";

export async function listCategories(): Promise<Category[]> {
  const res = await request<{ data: Category[] }>("/categories", { method: "GET" });
  return res.data;
}

export async function getCategory(id: number | string): Promise<Category> {
  const res = await request<{ data: Category }>(`/categories/${id}`, { method: "GET" });
  return res.data;
}

export async function createCategory(data: Partial<Category>): Promise<Category> {
  const res = await request<{ category: Category }>("/categories", { method: "POST", body: { data } });
  return res.category;
}

export async function updateCategory(id: number | string, data: Partial<Category>): Promise<Category> {
  const res = await request<{ updated: Category }>(`/categories/${id}`, { method: "PUT", body: { data } });
  return res.updated;
}

export async function removeCategory(id: number | string): Promise<Category> {
  const res = await request<{ deleted: Category }>(`/categories/${id}`, { method: "DELETE" });
  return res.deleted;
}
