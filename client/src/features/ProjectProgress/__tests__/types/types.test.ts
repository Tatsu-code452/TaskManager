import { describe, expect, it } from 'vitest';
import * as types from '../../types/types';

describe('types', () => {
  it('型定義が存在する', () => {
    expect(typeof types).toBe('object');
  });
});
