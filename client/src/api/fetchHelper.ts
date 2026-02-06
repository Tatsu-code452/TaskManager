import { error as notifyError } from "../utils/notify";

// ==============================
// API BASE
// ==============================
function getApiBase(): string {
  const env = (import.meta as unknown as { env: Record<string, string> }).env;
  return env.VITE_API_BASE || "http://localhost:3000/api";
}

export const API_BASE = getApiBase();

// ==============================
// ApiError
// ==============================
export class ApiError extends Error {
  status: number;
  response: unknown;

  constructor(message: string, status = 0, response: unknown = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.response = response;
  }
}

// ==============================
// Types
// ==============================
type RequestOptions = {
  method?: string;
  body?: unknown;
  requireCsrf?: boolean;
  autoNotifyOnError?: boolean;
};

type ErrorResponse = {
  message?: string;
  error?: string;
};

function isErrorResponse(x: unknown): x is ErrorResponse {
  return (
    typeof x === "object" &&
    x !== null &&
    ("message" in x || "error" in x)
  );
}

// ==============================
// CSRF
// ==============================
export async function getCsrfToken(): Promise<string | null> {
  const res = await fetch(`${API_BASE}/session`, { credentials: "include" });
  if (!res.ok) return null;

  const json: unknown = await res.json();
  if (typeof json === "object" && json !== null && "csrfToken" in json) {
    return (json as { csrfToken?: string }).csrfToken ?? null;
  }
  return null;
}

// ==============================
// Header Builder
// ==============================
async function buildHeaders(
  body: unknown,
  requireCsrf: boolean
): Promise<Record<string, string>> {
  const headers: Record<string, string> = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (requireCsrf) {
    const csrf = await getCsrfToken();
    if (csrf) headers["X-CSRF-Token"] = csrf;
  }

  return headers;
}

// ==============================
// Response Parser
// ==============================
function parseJsonSafely(text: string, status: number): unknown {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new ApiError(`Invalid JSON response: ${text}`, status, text);
  }
}

function extractErrorMessage(json: unknown, fallback: string): string {
  if (isErrorResponse(json)) {
    return json.message ?? json.error ?? fallback;
  }
  return fallback;
}

// ==============================
// Main request
// ==============================
export async function request<T>(
  path: string,
  {
    method = "GET",
    body,
    requireCsrf = method !== "GET" && method !== "HEAD",
    autoNotifyOnError = true,
  }: RequestOptions = {}
): Promise<T> {
  const headers = await buildHeaders(body, requireCsrf);

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const json = parseJsonSafely(text, res.status);

  if (!res.ok) {
    const errMsg = extractErrorMessage(json, res.statusText || "Request failed");
    const err = new ApiError(errMsg, res.status, json);
    if (autoNotifyOnError) notifyError(err.message);
    throw err;
  }

  return json as T;
}