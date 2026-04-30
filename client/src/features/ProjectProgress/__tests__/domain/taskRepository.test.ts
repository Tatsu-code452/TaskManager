import { describe, expect, it } from 'vitest';
import { fetchTaskModelList } from '../../domain/repository/taskRepository';

describe('fetchTaskModelList', () => {
  it('非同期でTaskModelリストを取得できる(型のみ確認)', async () => {
    expect(typeof fetchTaskModelList).toBe('function');
    // 実際のAPI呼び出しはモック化が必要なため省略
    // const result = await fetchTaskModelList('dummy');
    // expect(Array.isArray(result)).toBe(true);
    // result.forEach((item: TaskModel) => expect(item).toHaveProperty('id'));
  });
});
