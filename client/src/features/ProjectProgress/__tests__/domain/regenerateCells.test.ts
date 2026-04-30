import { describe, expect, it, vi } from 'vitest';
import { regenerateCells } from '../../domain/service/regenerateCells';

describe('regenerateCells', () => {
  it('updateApiが日数分呼ばれる', async () => {
    const updateApi = vi.fn().mockResolvedValue(undefined);
    await regenerateCells(updateApi, 'task1', '2024-01-01', '2024-01-04', 12);
    // 1日目〜3日目（3日間）
    expect(updateApi).toHaveBeenCalledTimes(3);
    expect(updateApi).toHaveBeenCalledWith('task1', '2024-01-01', 4);
    expect(updateApi).toHaveBeenCalledWith('task1', '2024-01-02', 4);
    expect(updateApi).toHaveBeenCalledWith('task1', '2024-01-03', 4);
  });
});
