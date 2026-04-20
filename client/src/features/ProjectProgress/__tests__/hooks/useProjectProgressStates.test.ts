import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useProjectProgressStates } from '../../hooks/state/useProjectProgressStates';
import { EditTarget } from '../../types/types';

const editTarget: EditTarget[] = [
  {
    taskIndex: "T1",
    date: "2025-01-12",
    type: 'planCell'
  },
  {
    taskIndex: "T2",
    date: "2025-01-15",
    type: 'actualCell'
  }
];

describe('useProjectProgressStates', () => {
  it('フックが関数として定義されている', () => {
    expect(typeof useProjectProgressStates).toBe('function');
  });

  it('editDispatch.startEdit で editTarget が変化する', () => {
    const { result } = renderHook(() => useProjectProgressStates());

    act(() => {
      result.current.editDispatch.startEdit(editTarget[0]);
    });
    expect(result.current.selectors.editTarget).toEqual(editTarget[0]);

    act(() => {
      result.current.editDispatch.startEdit(editTarget[1]);
    });
    expect(result.current.selectors.editTarget).toEqual(editTarget[1]);
  });

  it('editDispatch.endEdit で editTarget が null になる', () => {
    const { result } = renderHook(() => useProjectProgressStates());

    act(() => {
      result.current.editDispatch.startEdit(editTarget[0]);
    });
    act(() => {
      result.current.editDispatch.endEdit();
    });

    expect(result.current.selectors.editTarget).toBeNull();
  });

  it('collapseDispatch.togglePhase で collapsedPhases が変化する', () => {
    const { result } = renderHook(() => useProjectProgressStates());

    act(() => {
      result.current.collapseDispatch.togglePhase("p1");
    });

    expect(result.current.selectors.collapsedPhases).toEqual({ p1: true });

    act(() => {
      result.current.collapseDispatch.togglePhase("p1");
    });

    expect(result.current.selectors.collapsedPhases).toEqual({ p1: false });
  });
});
