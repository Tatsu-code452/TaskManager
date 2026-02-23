import { request } from "./fetchHelper";

export type ResponseLogin = {
  success: boolean;
  message: string;
}

export async function login(username: string, password: string): Promise<ResponseLogin> {
  return await request("/login", { method: "POST", body: { username, password } });
}

export async function logout(): Promise<string> {
  return await request("/login/logout", { method: "GET" });
}