import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useStateInitializer } from '../../hooks/state/useStateInitializer';

describe('useStateInitializer', () => {
  it('フックが関数として定義されている', () => {
    expect(typeof useStateInitializer).toBe('function');
  });

  it('initDisplayRangeで正しいfrom/toが返る', () => {
    const { result } = renderHook(() => useStateInitializer());
    const range = result.current.initProgressPageState().displayRange;
    expect(range).toHaveProperty('from');
    expect(range).toHaveProperty('to');
    expect(typeof range.from).toBe('string');
    expect(typeof range.to).toBe('string');
  });

  it('initProgressPageStateで初期stateが返る', () => {
    const { result } = renderHook(() => useStateInitializer());
    const state = result.current.initProgressPageState();
    expect(state).toHaveProperty('displayRange');
    expect(state).toHaveProperty('baseDate');
    expect(state).toHaveProperty('tasks');
    expect(Array.isArray(state.tasks)).toBe(true);
  });
});
