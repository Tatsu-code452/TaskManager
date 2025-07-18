import { sum } from '../src/common/utility';

describe('sum関数のテスト', () => {
  it('1 + 2 = 3 になること', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
