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
  rawText: string;
  url: string;

  constructor(
    message: string,
    status: number,
    response: unknown,
    rawText: string,
    url: string
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.response = response;
    this.rawText = rawText;
    this.url = url;
  }
}

// ==============================
// Types
// ==============================
type RequestOptions = {
  method?: string;
  body?: unknown;
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
let csrfToken: string | null = null;

export async function updateCsrfToken() {
  const res = await fetch(`${ API_BASE }/session`,
    { credentials: "include" }
  );
  const json = await res.json();
  if (res.ok && json !== null) {
    csrfToken = "csrfToken" in json ? json.csrfToken : "";
  }
}

// ==============================
// Response Parser
// ==============================
function parseJsonSafely(text: string, status: number): unknown {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new ApiError(`Invalid JSON response: ${text}`, status, text, text, "");
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
    autoNotifyOnError = false,
  }: RequestOptions = {}
): Promise<T> {
  await updateCsrfToken();

  const url = `${API_BASE}${path}`;

  const headers: Record<string, string> = {
    ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
  };

  const res = await fetch(url, {
    method,
    credentials: "include",
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // レスポンスヘッダからCSRFトークン更新
  const newToken = res.headers.get("x-csrf-token");
  if (newToken) csrfToken = newToken;

  const rawText = await res.text();
  const json = parseJsonSafely(rawText, res.status);

  if (!res.ok) {
    const errMsg = extractErrorMessage(json, res.statusText || "Request failed");
    const err = new ApiError(errMsg, res.status, json, rawText, url);
    if (autoNotifyOnError) notifyError(err.message);
    throw err;
  }

  return json as T;
}
