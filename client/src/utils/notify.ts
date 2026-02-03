export const toErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
};

export function info(message: string) {
  console.info(message);
}

export function success(message: string) {
  console.log(message);
}

export function error(message: string) {
  console.error(message);
  window.alert(`Error: ${message}`);
}
