import { request, getCsrfToken } from "./fetchHelper";

export async function login(username: string, password: string): Promise<any> {
  // loginではcsrf付与が必要
  return await request("/login", { method: "POST", body: { username, password } });
}

export async function logout(): Promise<any> {
  // logout は GET /login/logout
  return await request("/login/logout", { method: "GET" });
}

export async function session(): Promise<{ success: boolean; user?: any; csrfToken?: string }> {
  // session APIはcsrfトークンを返す
  return await request("/session", { method: "GET" });
}

export { getCsrfToken };
