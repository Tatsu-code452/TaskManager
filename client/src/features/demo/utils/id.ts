/**
 * 任意値を number に変換（null/空文字/NaN は NG）
 */
export const toNumberId = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  if (value === "") return null;

  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

/**
 * ID が有効な number かどうか
 */
export const isValidId = (value: unknown): value is number => {
  return toNumberId(value) !== null;
};