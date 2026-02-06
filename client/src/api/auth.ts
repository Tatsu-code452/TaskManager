import { request } from "./fetchHelper";

export async function login(username: string, password: string): Promise<string> {
  // loginではcsrf付与が必要
  return await request("/login", { method: "POST", body: { username, password } });
}

export async function logout(): Promise<string> {
  // logout は GET /login/logout
  return await request("/login/logout", { method: "GET" });
}

export async function session(): Promise<{ success: boolean; user?: string; csrfToken?: string }> {
  // session APIはcsrfトークンを返す
  return await request("/session", { method: "GET" });
}