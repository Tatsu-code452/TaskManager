/**
 * 安全に JSON.parse する
 */
export const parseJsonSafe = <T = unknown>(
  str: string,
  onError?: (msg: string) => void
): T | undefined => {
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    onError?.(msg);
    return undefined;
  }
};