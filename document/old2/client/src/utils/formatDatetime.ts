
/**
 * 現在時刻を「YYYY/MM/DD HH:mm:ss」形式で返す
 * @returns 現在日時の文字列
 */
export const formatCurrentDatetime = (): string => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const h = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    return `${y}/${m}/${d} ${h}:${min}:${s}`;
};