import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useStateReducer } from '../../hooks/state/useStateReducer';

describe('useStateReducer', () => {
  it('フックが関数として定義されている', () => {
    expect(typeof useStateReducer).toBe('function');
  });

  it('createProgressReducerで各アクションに応じてstateが変化する', () => {
    const { result } = renderHook(() => useStateReducer());
    const initProgressPageState = () => ({ displayRange: { from: 'a', to: 'b' }, baseDate: 'c', tasks: [] });
    const reducer = result.current.createProgressReducer({ initProgressPageState });
    // INIT
    let state = { displayRange: { from: '', to: '' }, baseDate: '', tasks: [1] };
    state = reducer(state, { type: 'INIT' });
    expect(state.tasks).toEqual([]);
    // SET_TASKS
    state = reducer(state, { type: 'SET_TASKS', tasks: [1, 2] });
    expect(state.tasks).toEqual([1, 2]);
    // SET_FROM
    state = reducer(state, { type: 'SET_FROM', from: '2024-01-01' });
    expect(state.displayRange.from).toBe('2024-01-01');
    // SET_TO
    state = reducer(state, { type: 'SET_TO', to: '2024-01-31' });
    expect(state.displayRange.to).toBe('2024-01-31');
    // SET_BASE_DATE
    state = reducer(state, { type: 'SET_BASE_DATE', baseDate: '2024-01-01' });
    expect(state.baseDate).toBe('2024-01-01');
    // default
    const prev = state;
    state = reducer(state, { type: 'UNKNOWN' });
    expect(state).toBe(prev);
  });
});
