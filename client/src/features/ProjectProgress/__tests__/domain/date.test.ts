import { describe, expect, it } from 'vitest';
import {
  calcDiffDays,
  formatDate,
  shiftDate,
  toDate,
  toFirstDateOnMonth,
} from '../../domain/utils/date';

describe('date utils', () => {
  it('calcDiffDays: 日数差を計算', () => {
    expect(calcDiffDays('2024-01-01', '2024-01-04')).toBe(3);
    expect(calcDiffDays('2024-01-10', '2024-01-01')).toBe(-9);
  });

  it('shiftDate: 指定日から日数加算', () => {
    expect(shiftDate('2024-01-01', 2)).toBe('2024-01-03');
    expect(shiftDate('2024-01-31', 1)).toBe('2024-02-01'); // 月跨ぎ
  });

  it('toDate: 日付文字列をタイムスタンプに変換', () => {
    const ts = toDate('2024-01-01');
    expect(typeof ts).toBe('number');
    expect(toDate(undefined)).toBeNull();
  });

  it('formatDate: Date → YYYY-MM-DD に変換', () => {
    const d = new Date('2024-01-05T12:34:56Z');
    expect(formatDate(d)).toBe('2024-01-05');
  });

  it('toFirstDateOnMonth: 月初を返す', () => {
    expect(toFirstDateOnMonth(new Date('2024-03-15'))).toEqual(new Date('2024-03-01'));
    expect(toFirstDateOnMonth(new Date('2024-02-28'))).toEqual(new Date('2024-02-01'));
  });
});
