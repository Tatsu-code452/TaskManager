import { error as notifyError } from "../utils/notify";

// Vite ではブラウザで `process` が存在しないため `import.meta.env` を使います。
// 環境変数名は `VITE_API_BASE` として .env に定義してください。
const API_BASE = (import.meta as any).env.VITE_API_BASE || "http://localhost:3000/api";

export class ApiError extends Error {
  status: number;
  response: any;
  constructor(message: string, status = 0, response: any = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.response = response;
  }
}

type RequestOptions = {
  method?: string;
  body?: any;
  requireCsrf?: boolean;
  autoNotifyOnError?: boolean; // if true, call notify.error with message
};

// CSRFトークンを取得
export async function getCsrfToken(): Promise<string | null> {
  const res = await fetch(`${API_BASE}/session`, { credentials: "include" });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.csrfToken ?? null;
}

// 汎用リクエストヘルパー
export async function request<T = any>(
  path: string,
  { method = "GET", body, requireCsrf = method !== "GET" && method !== "HEAD", autoNotifyOnError = true }: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {};
  let csrfToken: string | null = null;

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (requireCsrf) {
    csrfToken = await getCsrfToken();
    if (csrfToken) headers["X-CSRF-Token"] = csrfToken;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : {};
  } catch (e) {
    const err = new ApiError(`Invalid JSON response: ${text}`, res.status, text);
    if (autoNotifyOnError) notifyError(err.message);
    throw err;
  }

  if (!res.ok) {
    const errMsg = json?.message || json?.error || res.statusText || "Request failed";
    const err = new ApiError(errMsg, res.status, json);
    if (autoNotifyOnError) notifyError(err.message);
    throw err;
  }

  return json as T;
}

export { API_BASE };
